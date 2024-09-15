import React, { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";

const Sprite = ({ id, initialX, initialY, controls, onMove }) => {
  const spriteRef = useRef(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      controls.forEach(control => {
        if (control.type === 'move-steps') {
          moveSteps(control.value);
        } else if (control.type === 'turn-degrees') {
          turnDegrees(control.value);
        } else if (control.type === 'goto') {
          goTo(control.valueX, control.valueY);
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [controls]);

  const moveSteps = (steps) => {
    setPosition(prevPosition => {
      const rad = (rotation * Math.PI) / 180;
      const newX = prevPosition.x + steps * Math.cos(rad);
      const newY = prevPosition.y + steps * Math.sin(rad);
      const rect = spriteRef.current.getBoundingClientRect();
      onMove(id, { ...rect, left: newX, top: newY });
      return { x: newX, y: newY };
    });
  };

  const turnDegrees = (degrees) => {
    setRotation(prevRotation => prevRotation + degrees);
  };

  const goTo = (x, y) => {
    setPosition({ x, y });
    const rect = spriteRef.current.getBoundingClientRect();
    onMove(id, { ...rect, left: x, top: y });
  };

  return (
    <motion.div
      ref={spriteRef}
      className="sprite"
      animate={{ x: position.x, y: position.y, rotate: rotation }}
      style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', backgroundColor: 'red' }}
    />
  );
};

export default Sprite;