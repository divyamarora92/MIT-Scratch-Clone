import React, { useState, useEffect } from "react";
import "./SpriteArea.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSprite,
  selectedSprite,
  removeSprite
} from "../../redux/features/Sprite/spriteSlice";
import spriteImg from "../../assets/addSprite.png";
import deleteBtn from "../../assets/deleteBtn.svg";
import Modal from "./Modal";

const AddSprite = () => {
  const dispatch = useDispatch();
  const sprites = useSelector((state) => state.sprite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpriteId, setSelectedSpriteId] = useState(null);

  const handleAddSprite = (sprite) => {
    dispatch(addSprite(sprite));
    setIsModalOpen(false); 
  };

  useEffect(() => {
    if (sprites.sprites.length === 1) {
      const firstSpriteId = sprites.sprites[0].id;
      setSelectedSpriteId(firstSpriteId);
      dispatch(selectedSprite(firstSpriteId));
    }
  }, [sprites.sprites, dispatch]);

  const handleDeleteSprite = (spriteId) => {
    dispatch(removeSprite({ id: spriteId }));
    if (selectedSpriteId === spriteId) {
      setSelectedSpriteId(null);
      dispatch(selectedSprite(null));
    }
  };

  const handleSelectSprite = (spriteId) => {
    setSelectedSpriteId(spriteId);
    dispatch(selectedSprite(spriteId));
  };

  return (
    <div className="add-sprite-container">
      <button
        title="Add Sprite"
        className="add-sprite-btn"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <img src={spriteImg} alt="Add Sprite" />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectSprite={handleAddSprite}
      />
      <div className="sprite-container">
        {sprites?.sprites?.map((ele, index) => {
          return (
            <div key={index} className={`sprite-item ${selectedSpriteId === ele.id ? "addSelected" : ""}`}>
              <button
                className="sprite-btn"
                onClick={() => handleSelectSprite(ele.id)}
              >
                <img src={ele.src} alt="Sprite" />
              </button>
              <button className="delete-btn" onClick={() => handleDeleteSprite(ele.id)}>
                <img src={deleteBtn} alt="Delete" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddSprite;