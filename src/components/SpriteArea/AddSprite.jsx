import React, { useState } from 'react'
import './SpriteArea.css';
import { useDispatch, useSelector } from 'react-redux';
import { addSprite, selectedSprite } from '../../redux/features/Sprite/spriteSlice';
import spriteImg from '../../assets/addSprite.png';
import Modal from './Modal';

const AddSprite = () => {
  const dispatch=useDispatch();
  const sprites=useSelector((state)=>state.sprite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddSprite=(sprite)=>{
    
    // setIsModalOpen(true)
    dispatch(addSprite((sprite)));
    // dispatch({
    //   type: 'ADD_SPRITE',
    //   payload: {
    //     name: sprite.name,
    //     src: sprite.src,
    //     animations: [],
    //   },
    // });
    setIsModalOpen(false); // Close the modal after adding a sprite
  }
  return (
    <div className='add-sprite-container'>
      <button title='Add Sprite'className='add-sprite-btn' onClick={()=>{
        setIsModalOpen(true)
      }}><img src={spriteImg} alt="spriteImg" srcset=""  /></button>
      <Modal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelectSprite={handleAddSprite} 
      />
      <div className="sprite-container">
        {sprites?.sprites?.map((ele,index)=>{
          return(<button className='sprite-btn' key={index} onClick={()=>{
            dispatch(selectedSprite(ele.id))
          }}>{ele.name}</button>)
        })}
      </div>
    </div>
  )
}

export default AddSprite