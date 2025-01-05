import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
 
export const useStore = create((set, get) => ({
  // Starting nodes and edges
  nodes: [
    { type: 'Input',
      id: 'Input0',
      data: {shape: ""},
      position: { x: 0, y: 0 }
    },
    { type: 'Conv2D',
      id: 'Conv2D0',
      data: {filters: "", kernel: "", activation: "relu"},
      position: { x: 200, y: 0 }
    },
    { type: 'MaxPool2D',
      id: 'MaxPool2D0',
      data: {pool_size: ""},
      position: { x: 400, y: 0 }
    },
    { type: 'Flatten',
      id: 'Flatten0',
      data: {},
      position: { x: 600, y: 0 }
    }],
  edges: [],
      
  // Handle when we change nodes
  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Handle when we change an edge between nodes
  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
 
  // Handle when we add an edge between nodes
  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };
 
    set({ edges: [edge, ...get().edges] });
  },
  
  // Handle when the node's data changes
  updateNode(id, data) {
    set({
      nodes: get().nodes.map(node =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    });
  },
}));