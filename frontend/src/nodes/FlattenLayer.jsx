import { Handle } from '@xyflow/react';

function FlattenLayer() {
  return (
    <>
      <div className='w-16 h-32 bg-orange-300 rounded-md border-2 border-stone-900'>
        <div className='size-full flex flex-col text-black text-center py-9'>
          <p className="text-2xl font-bold rotate-90">
            Flatten
          </p>
  
          <Handle type="target" position="left" />
          <Handle type="source" position="right" />
        </div>
      </div>
    </>
  );
}

export default FlattenLayer;