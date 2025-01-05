import { useCallback } from 'react';
import { Handle } from '@xyflow/react';
 
function Conv2DLayer({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <div className='w-32 h-72 bg-sky-300 rounded-md border-2 border-stone-900'>
        <div className='size-full flex flex-col space-y-3 text-black text-center p-2'>
          <p className="text-2xl font-bold ">
            Conv<span className='bg-gradient-to-r from-yellow-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text'>2D</span>
            </p>
          {/* <p className=""><strong>Name: </strong>{id}</p> */}
  
          <label>
            <p>Filters</p>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2"
              placeholder='n'
              type="text"
              value={data.filters}
              //onChange={setFilters}
            />
          </label>

          <label>
            <p>Kernel</p>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2"
              placeholder='(x,y,...)'
              type="text"
              value={data.kernel}
              //nChange={setKernel}
            />
          </label>
  
          <label>
            <p>Activation</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2"
              value={data.activation} 
              //onChange={setActivation}
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

export default Conv2DLayer;