import { createSlice,current} from '@reduxjs/toolkit';

const initialState = {
  sprites: [],
  nextSpriteId: 1,
  selectedSprite: {},
};

export const spriteSlice = createSlice({
  name: 'sprites',
  initialState,
  reducers: {
    addSprite: (state, action) => {
      const newSprite = {
        id: state.nextSpriteId,
        name: action.payload.name,
        animations: [],
        src: action.payload.src,
      };

      state.sprites.push(newSprite);
      state.nextSpriteId += 1;
    },
    removeSprite: (state, action) => {
      state.sprites = state.sprites.filter(sprite => sprite.id !== action.payload.id);
      if (state.selectedSprite.id === action.payload.id) {
        state.selectedSprite = {};
      }
    },
    selectedSprite: (state, action) => {
      const spriteId = action.payload;
      let sprite = state.sprites.find(sprite => sprite.id === spriteId);
      state.selectedSprite = { ...sprite };
    },
    addAnimation: (state, action) => {
      const { selectedSpriteId, droppedItem } = action.payload;
      let sprite = state.sprites.find(sprite => sprite.id === selectedSpriteId);

      if (sprite) {
        sprite.animations.push(droppedItem);
        state.selectedSprite = { ...state.selectedSprite, animations: [...state.selectedSprite.animations, droppedItem] };
      }
    },
    updateAnimation: (state, action) => {
      const { spriteId, animationId, value } = action.payload;
      const spriteIndex = state.sprites.findIndex(sprite => sprite.id === spriteId);
      if (spriteIndex !== -1) {
        const animationIndex = state.sprites[spriteIndex].animations.findIndex(animation => animation.id === animationId);
        if (animationIndex !== -1) {
          state.sprites[spriteIndex].animations[animationIndex] = {
            ...state.sprites[spriteIndex].animations[animationIndex],
            value,
          };
          if (state.selectedSprite.id === spriteId) {
            state.selectedSprite = {
              ...state.selectedSprite,
              animations: state.sprites[spriteIndex].animations,
            };
          }
        }
      }
    },
    removeAnimation: (state, action) => {
      const { spriteId, animationId } = action.payload;
      const spriteIndex = state.sprites.findIndex(sprite => sprite.id === spriteId);
      if (spriteIndex !== -1) {
        state.sprites[spriteIndex].animations = state.sprites[spriteIndex].animations.filter(animation => animation.id !== animationId);
        if (state.selectedSprite.id === spriteId) {
          state.selectedSprite = {
            ...state.selectedSprite,
            animations: state.selectedSprite.animations.filter(animation => animation.id !== animationId),
          };
        }
      }
    },
    swapAnimation: (state, action) => {
      
      const { id1, id2 } = action.payload;
      
      const sprite1 = state.sprites.filter(sprite => sprite.id === id1);
      const sprite2 = state.sprites.filter(sprite => sprite.id === id2);

      if (sprite1 && sprite2) {
        const temp = sprite1.animations;
        sprite1.animations = sprite2.animations;
        sprite2.animations = temp;
      }
    },
  },
});

export const { addSprite, selectedSprite, addAnimation, updateAnimation, removeAnimation,removeSprite ,swapAnimation} = spriteSlice.actions;

export default spriteSlice.reducer;