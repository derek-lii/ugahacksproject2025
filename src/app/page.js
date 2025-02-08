'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = () => {
    setGameStarted(true);
  }

  return (
    <div className = {styles.page}>
      <main className = {styles.main}>
      {gameStarted ? (
          <div>
            <p>The game has started! Good luck!</p>
            {/* Add more components or layout changes here */}
          </div>
        ) : (
          <div>
            <h1>The Money Game</h1>
           <button className = {styles.start} onClick={handleClick}>Start</button>
          </div>
        )}
      </main>
    </div>
  );
}
