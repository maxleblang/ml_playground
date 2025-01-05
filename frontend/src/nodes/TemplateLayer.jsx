import React from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
 
import { useStore } from '../store';
 
const selector = (id) => (store) => ({
  setInputShape: (e) => store.updateNode(id, { shape: e.target.value }),
  validateInputShape: (e) => {
    // TODO: Validate the format of the input shape string
    console.log(e.target.value)
  },
  setActivation: (e) => store.updateNode(id, { type: e.target.value }),
});
 
export default function TemplateLayer({ id, data }) {
  const { setInputShape, validateInputShape, setActivation } = useStore(selector(id), shallow);
 
  return (
    <>
      <div className='w-32 h-64 bg-white rounded-md border-2 border-stone-400'>
        <div className='size-full flex flex-col space-y-3 text-black text-center p-2'>
          <p className="text-2xl font-bold ">Input</p>
          <p className=""><strong>Name: </strong>{id}</p>
  
          <label>
            <p>Shape: </p>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2"
              placeholder='(2,...)'
              type="text"
              value={data.shape}
              onChange={setInputShape}
              onBlur={validateInputShape}
            />
          </label>
  
          <label>
            <p>Activation</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
              value={data.activation} 
              onChange={setActivation}
            >
              <option value="sigmoid">Sigmoid</option>
              <option value="relu">ReLU</option>
            </select>
          </label>
          <Handle type="target" position="left" />
          <Handle type="source" position="right" />
        </div>
      </div>
    </>
  );
}