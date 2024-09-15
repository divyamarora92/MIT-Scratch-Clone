import React from 'react';
import './Modal.css';
import dogSprite from '../../assets/dogSprite.svg';
import catSprite from '../../assets/catSprite.svg';
import manSprite from '../../assets/manSprite.svg'
const Modal = ({ isOpen, onClose, onSelectSprite }) => {
  if (!isOpen) return null;

  const spriteOptions = [
    { name: 'Dog', src: dogSprite },
    { name: 'Cat', src: catSprite },
    { name: 'Man', src:  manSprite},
    // Add more sprite options as needed
  ];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Select a Sprite</h2>
        <div className="sprite-options">
          {spriteOptions.map(sprite => (
            <img
              key={sprite.name}
              src={sprite.src}
              alt={sprite.name}
              onClick={() => onSelectSprite(sprite)}
              className="sprite-option"
            />
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default Modal;