'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";
import choicesList from "./choices.json";


function Grocery({ label, onGroceryClick }) {
  return <button className="grocery" onClick={onGroceryClick}>{label}</button>;
}

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [nextItem, setNextItem] = useState(null);
  const [score, setScore] = useState(0); 

  return (
    <div className = {styles.page}>
      <main className = {styles.main}>
      {gameStarted ? (
          <div className = "Groceries">
            <div>
              <h2>Current Item: {currentItem?.name} - ${currentItem?.price}</h2>
              <p>Is the next item higher or lower in price?</p>
              <h2>Next Item: {nextItem?.name}</h2>
              <Grocery 
                label="Higher" 
                onGroceryClick={() => handleGroceryClick(true)} 
              />
              <Grocery 
                label="Lower" 
                onGroceryClick={() => handleGroceryClick(false)} 
              />
            </div>
            <div>
              <p>Score: {score}</p>
            </div>
          </div>
        ) : (
          <div>
            <h1>The Money Game</h1>
           <button className = {styles.start} onClick={handleStartClick}>Start</button>
          </div>
        )}
      </main>
    </div>
  );

  function handleStartClick() {
    setGameStarted(true);
    const firstItem = getRandomItem();
    let secondItem = getRandomItem();
    while (firstItem.id === secondItem.id) {
      secondItem = getRandomItem();
    }

    setCurrentItem(firstItem);
    setNextItem(secondItem);
  }

  function handleGroceryClick(isHigher) {
    const correctGuess = (isHigher && nextItem.price > currentItem.price) || (!isHigher && nextItem.price < currentItem.price);
    //TBD: show price of next item, wait, then give an alert
    if (correctGuess) {
      setScore(prevScore => prevScore + 1);
      alert('Correct!');
    } else {
      alert('Wrong! Game Over');
      setGameStarted(false); // End the game
    }

    const newCurrentItem = nextItem;
    let newNextItem = getRandomItem();

    //maybe handle this better - implement check for when no items are left
    while (newCurrentItem.id === newNextItem.id) {
      newNextItem = getRandomItem();
    }

    setCurrentItem(newCurrentItem);
    setNextItem(newNextItem);
  }
  
  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * choicesList.choices.length);
    return choicesList.choices[randomIndex];
  }

}
