import React from 'react';

const MotionControls = ({ onDragStart }) => {
  const controls = [
    { type: 'move-steps', value: 10, label: 'Move 10 Steps' },
    { type: 'turn-degrees', value: 15, label: 'Turn 15 Degrees' },
    { type: 'goto', valueX: 100, valueY: 100, label: 'Go to x: 100 y: 100' }
  ];

  return (
    <div>
      {controls.map(control => (
        <div
          key={control.label}
          draggable={true}
          onDragStart={e => onDragStart(e, control)}
          style={{ margin: '5px', padding: '5px', border: '1px solid #ccc', cursor: 'grab' }}
        >
          {control.label}
        </div>
      ))}
    </div>
  );
};

export default MotionControls;