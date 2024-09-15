import { configureStore } from '@reduxjs/toolkit'
import spriteReducer from './features/Sprite/spriteSlice'
export const store = configureStore({
  reducer: {
    sprite:spriteReducer
  },
})