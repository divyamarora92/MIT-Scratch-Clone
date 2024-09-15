import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DragArea.css';
import { addAnimation, updateAnimation } from '../../redux/features/Sprite/spriteSlice';

const DragArea = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const sprite = useSelector((state) => state.sprite);
  const dispatch = useDispatch();

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ ...item, spriteId: sprite.selectedSprite.id }));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const droppedItem = JSON.parse(data);

    if (!sprite.selectedSprite.animations.find(item => item.id === droppedItem.id)) {
      setDroppedItems([...droppedItems, droppedItem]);
      dispatch(addAnimation({ selectedSpriteId: sprite.selectedSprite.id, droppedItem }));
    }
  };

  const handleInputChange = (id, value) => {
    const updatedItems = droppedItems.map(item => {
      if (item.id === id) {
        return { ...item, value: value };
      }
      return item;
    });

    setDroppedItems(updatedItems);
    dispatch(updateAnimation({ spriteId: sprite.selectedSprite.id, animationId: id, value }));
  };

  useEffect(() => {
    const animations = sprite.selectedSprite?.animations || [];
    setDroppedItems(animations);
  }, [sprite.selectedSprite]);

  return (
    <div className="drag-area" onDragOver={handleDragOver} onDrop={handleDrop}>
      {droppedItems.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(event) => handleDragStart(event, item)}
          className="draggable-item move-motion"
        >
          <p>{item.name}</p>
          {item.name === "Move" && (
            <input
            className="motion-inputs"
              type="text"
              size="2"
              style={{ outline: "none" }}
              value={item.value}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          )}
          {item.name === "Turn" && (
            <input
            className="motion-inputs"
              type="text"
              size="2"
              style={{ outline: "none" }}
              value={item.value}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DragArea;