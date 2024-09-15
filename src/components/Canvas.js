import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sprite from './Sprite';
import MotionControls from './MotionControls';

export const Canvas = () => {
  const [sprites, setSprites] = useState([]);
  const [activeControl, setActiveControl] = useState(null);

  const addSprite = () => {
    const newSprite = {
      id: uuidv4(),
      controls: [],
      initialX: Math.random() * 400,
      initialY: Math.random() * 400,
    };
    setSprites([...sprites, newSprite]);
  };

  const handleMove = (id, rect) => {
    const updatedSprites = sprites.map(sprite => {
      if (sprite.id === id) return { ...sprite, rect };
      return sprite;
    });

    updatedSprites.forEach((sprite1, index1) => {
      updatedSprites.forEach((sprite2, index2) => {
        if (
          index1 !== index2 &&
          sprite1.rect &&
          sprite2.rect &&
          isColliding(sprite1.rect, sprite2.rect)
        ) {
          handleCollision(sprite1.id, sprite2.id);
        }
      });
    });

    setSprites(updatedSprites);
  };

  const handleCollision = (id1, id2) => {
    const sprite1 = sprites.find(s => s.id === id1);
    const sprite2 = sprites.find(s => s.id === id2);

    setSprites(sprites.map(sprite => {
      if (sprite.id === id1) {
        return { ...sprite, controls: sprite2.controls };
      }
      if (sprite.id === id2) {
        return { ...sprite, controls: sprite1.controls };
      }
      return sprite;
    }));
  };

  const isColliding = (rect1, rect2) => {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };

  const onControlDragStart = (e, control) => {
    setActiveControl(control);
  };

  const onSpriteDrop = (e, spriteId) => {
    setSprites(sprites.map(sprite => {
      if (sprite.id === spriteId && activeControl) {
        return {
          ...sprite,
          controls: [...sprite.controls, activeControl],
        };
      }
      return sprite;
    }));
    setActiveControl(null);
  };

  return (
    <div>
      <MotionControls onDragStart={onControlDragStart} />
      <button onClick={addSprite}>Add Sprite</button>
      <div className="canvas" style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black' }}>
        {sprites.map(sprite => (
          <div
            key={sprite.id}
            onDrop={e => onSpriteDrop(e, sprite.id)}
            onDragOver={(e) => e.preventDefault()}
          >
            <Sprite
              id={sprite.id}
              initialX={sprite.initialX}
              initialY={sprite.initialY}
              controls={sprite.controls}
              onMove={handleMove}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Canvas;