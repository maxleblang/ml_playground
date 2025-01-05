import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import customNodes from "./nodes";
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
 
const initialNodes = [
  {
    id: '1',
    type: 'Input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];
 
let id = 0;
const getId = () => `dndnode_${id++}`;
 
const Playground = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  // Sends JSON of model architecture to backend
  const exportJSON = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      // TODO: Send the JSON data to the backend!
      console.log(flow)
      const endpoint = "http://localhost:8000/model_json/"
      const request = new Request(endpoint, {
        method: "POST",
        body: JSON.stringify(flow),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await fetch(request);
    }
  }, [rfInstance]);
 
  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={customNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setRfInstance}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Panel position="top-right">
            <button onClick={exportJSON}>Export</button>
            {/* <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2 px-8"
            /> */}
          </Panel>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};
 
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <Playground />
    </DnDProvider>
  </ReactFlowProvider>
);