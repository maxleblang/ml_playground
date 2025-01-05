import React from 'react';
import { useDnD } from './DnDContext';
 
export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="dndnode bg-stone-300 rounded-md border-2 border-stone-900" onDragStart={(event) => onDragStart(event, 'Input')} draggable>
        Input
      </div>
      <div className="dndnode bg-orange-300 rounded-md border-2 border-stone-900" onDragStart={(event) => onDragStart(event, 'Flatten')} draggable>
        Flatten
      </div>
      <div className="dndnode bg-sky-300 rounded-md border-2 border-stone-900" onDragStart={(event) => onDragStart(event, 'Conv2D')} draggable>
        Conv2D
      </div>
      <div className="dndnode bg-sky-300 rounded-md border-2 border-stone-900" onDragStart={(event) => onDragStart(event, 'MaxPool2D')} draggable>
        MaxPool2D
      </div>
    </aside>
  );
};