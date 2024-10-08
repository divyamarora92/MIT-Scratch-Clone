import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import DragArea from "./components/DragArea/DragArea";
import AnimationArea from "./components/SpriteArea/AnimationArea";
import AddSprite from "./components/SpriteArea/AddSprite";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="app-container">
        <div className="motion-area">
          <Sidebar />
          <DragArea />
        </div>
        <div className="sprite-area">
          <AnimationArea />
          <AddSprite />
        </div>
      </div>
    </div>
  );
};

export default App;
