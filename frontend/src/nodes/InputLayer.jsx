import { useCallback } from 'react';
import { Handle, useReactFlow } from '@xyflow/react';

 
function InputLayer({ id, data }) {
  const { updateNodeData } = useReactFlow();
 
  return (
    <>
      <div className='w-32 h-40 bg-stone-300 rounded-md border-2 border-stone-900'>
        <div className='size-full flex flex-col space-y-3 text-black text-center p-2'>
          <p className="text-2xl font-bold ">Input</p>
  
          <label>
            <p>Shape</p>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-2/3 p-2"
              placeholder='(x,y,...)'
              type="text"
              value={data.shape}
              onChange={useCallback((evt) => {updateNodeData(id, { shape: evt.target.value })})}
              //onBlur={validateInputShape}
            />
          </label>
          <Handle type="source" position="right" />
        </div>
      </div>
    </>
  );
}

export default InputLayer;