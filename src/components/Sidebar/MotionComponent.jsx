import React, { useState } from "react";
import "./MotionComponent.css";
import { useDispatch } from "react-redux";
import { removeAnimation } from "../../redux/features/Sprite/spriteSlice";

const MotionComponent = () => {
  const [steps, setSteps] = useState();
  const [degree, setDegree] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const dispatch = useDispatch();

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const droppedItem = JSON.parse(data);
    dispatch(
      removeAnimation({
        spriteId: droppedItem.spriteId,
        animationId: droppedItem.id,
      })
    );
  };

  const items = [
    { id: 1, name: "Move", value: steps },
    { id: 2, name: "Turn", value: degree },
    { id: 3, name: "Go to", value:{x:x,y:y}},
    { id: 4, name: "Repeat" },
    // Add more items as needed
  ];

  return (
    <div
      className="motion-component"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(event) => handleDragStart(event, item)}
          className="draggable-item move-motion"
        >
          <p>{item.name}</p>
          {item.name === "Move" && (
            <>
              <input
                className="motion-inputs"
                type="text"
                size="2"
                style={{ outline: "none" }}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
              <p>Steps</p>
            </>
          )}

          {item.name === "Turn" && (
            <>
              <input
                className="motion-inputs"
                type="text"
                size="2"
                style={{ outline: "none" }}
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
              <p>Degrees</p>
            </>
          )}
          {item.name === "Go to" && (
            <>
              <input
                className="motion-inputs"
                type="text"
                size="2"
                style={{ outline: "none" }}
                value={x}
                onChange={(e) => setX(e.target.value)}
              />
              <input
                className="motion-inputs"
                type="text"
                size="2"
                style={{ outline: "none" }}
                value={y}
                onChange={(e) => setY(e.target.value)}
              />

            </>
          )

          }
        </div>
      ))}
    </div>
  );
};

export default MotionComponent;
