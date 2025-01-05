import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  Panel
} from 'reactflow';
import { shallow } from 'zustand/shallow';
 
import { useStore } from './store';

import customNodes from "./nodes";

 
const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});
 
export default function App() {
  const [modelInstance, setModelInstance] = useState(null);
  const store = useStore(selector, shallow);

  const exportJSON = useCallback(async () => {
    if (modelInstance) {
      const flow = modelInstance.toObject();
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
  });
 
  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={customNodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      onInit={setModelInstance}
      fitView
    >
      <Panel position="top-right">
        <button onClick={exportJSON}>Export</button>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2 px-8"
        />
      </Panel>

      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}