import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import "./AnimationArea.css";
import { swapAnimation } from "../../redux/features/Sprite/spriteSlice";

const AnimationArea = () => {
  const sprites = useSelector((state) => state.sprite.sprites);
  const dispatch = useDispatch();

  const [spriteStates, setSpriteStates] = useState({});

  useEffect(() => {
    const updatedStates = sprites?.reduce(
      (acc, sprite) => {
        const randomPosition = () => ({
          top: Math.random() * 50,
          left: Math.random() * 50,
        });
        if (!acc[sprite.id]) {
          acc[sprite.id] = {
            ...randomPosition(),
            rotation: 0,
          };
        }
        return acc;
      },
      { ...spriteStates }
    );

    setSpriteStates(updatedStates);
  }, [sprites]);

  const handleAnimation = (sprite) => {
    sprite.animations?.forEach((animation, index) => {
      setTimeout(() => {
        if (animation.name === "Move") {
          handleMoveSteps(sprite.id, animation.value);
        } else if (animation.name === "Turn") {
          handleTurnDegrees(sprite.id, animation.value);
        } else if (animation.name === "Go to") {
          handleGoTo(sprite.id, animation.value.x, animation.value.y);
        }
      }, index * 500); // Delay each animation by 500ms
    });
  };

  const handleMoveSteps = (id, steps) => {
    setSpriteStates((prevState) => {
      const newState = { ...prevState };
      const newLeft = newState[id].left + Number(steps);
      newState[id].left = newLeft;
      checkForCollisions(newState);
      return newState;
    });
  };

  const handleTurnDegrees = (id, degrees) => {
    setSpriteStates((prevState) => {
      const newState = { ...prevState };
      newState[id].rotation = (newState[id].rotation + (Number(degrees) % 360));
      checkForCollisions(newState);
      return newState;
    });
  };

  const handleGoTo = (id, x, y) => {
    setSpriteStates((prevState) => {
      const newState = { ...prevState };
      newState[id].left = x;
      newState[id].top = y;
      checkForCollisions(newState);
      return newState;
    });
  };

  const handleRunAllAnimations = () => {
    sprites.forEach((sprite) => {
      handleAnimation(sprite);
    });
  };

  const handleDrag = (e, ui, id) => {
    setSpriteStates((prevState) => {
      const newState = { ...prevState };
      const containerWidth = 1000 - 50; // Container width minus sprite width
      const containerHeight = 500 - 50; // Container height minus sprite height
      newState[id].left = Math.max(0, Math.min(ui.x, containerWidth));
      newState[id].top = Math.max(0, Math.min(ui.y, containerHeight));
      checkForCollisions(newState);
      return newState;
    });
  };

  const handleStop = (e, ui, id) => {
    setSpriteStates((prevState) => {
      const newState = { ...prevState };
      const containerWidth = 1000 - 50; // Container width minus sprite width
      const containerHeight = 500 - 50; // Container height minus sprite height
      newState[id].left = Math.max(0, Math.min(ui.x, containerWidth));
      newState[id].top = Math.max(0, Math.min(ui.y, containerHeight));
      checkForCollisions(newState);
      return newState;
    });
  };

  const checkForCollisions = (newState) => {
    const spriteEntries = Object.entries(newState);
    for (let i = 0; i < spriteEntries.length - 1; i++) {
      for (let j = i + 1; j < spriteEntries.length; j++) {
        const [id1, sprite1] = spriteEntries[i];
        const [id2, sprite2] = spriteEntries[j];

        if (isColliding(sprite1, sprite2)) {
          swapAnimations(id1, id2);
        }
      }
    }
  };

  const isColliding = (sprite1, sprite2) => {
    const size = 50; // Assuming all sprites are 50x50px
    return !(
      sprite1.left + size < sprite2.left ||
      sprite1.left > sprite2.left + size ||
      sprite1.top + size < sprite2.top ||
      sprite1.top > sprite2.top + size
    );
  };

  const swapAnimations = (id1, id2) => {
    dispatch(swapAnimation({ id1, id2 }))
    handleRunAllAnimations();
  };

  return (
    <div className="animation-area-container">
      {sprites.map((sprite) => {
        const style = spriteStates[sprite.id] || {
          top: 0,
          left: 0,
          rotation: 0,
        };

        return (
          <Draggable
            key={sprite.id}
            position={{ x: style.left, y: style.top }}
            onDrag={(e, ui) => handleDrag(e, ui, sprite.id)}
            onStop={(e, ui) => handleStop(e, ui, sprite.id)}
            bounds="parent" // Ensures the sprite stays within the parent container
          >
            <div
              style={{
                position: "absolute",
                top: `${style.top}px`,
                left: `${style.left}px`,
                transition: "transform 0.5s",
                fontSize: "1rem",
                cursor: "move",
                transform: `rotate(${style.rotation}deg) translate(-50%, -50%)`,
              }}
              className="sprite"
            >
              <img src={sprite.src} alt={sprite.name} />
            </div>
          </Draggable>
        );
      })}
      <button className="animation-run-button" onClick={handleRunAllAnimations}>
        Run
      </button>
    </div>
  );
};

export default AnimationArea;