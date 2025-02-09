'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";
import choicesList from "./choices.json";


function Grocery({ label, onGroceryClick }) {
  return <button className = {styles.grocery} 
    onClick = {onGroceryClick}> {label} 
    </button>;
}

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [nextItem, setNextItem] = useState(null);
  const [score, setScore] = useState(0); 
  const [revealedPrice, setRevealedPrice] = useState(null);
  const [showPrice, setShowPrice] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  return (
    <div className = {styles.page}>
      <main className = {styles.main}>
      {gameStarted ? (
          <div className = "Groceries">
            <div>
            <h2>{currentItem?.name}</h2>
            <h3>${currentItem?.price}</h3>
            </div>

            <h1 style = {{margin: "100px"}}>Is the bottom item higher or lower in price?</h1>

            <h2>{nextItem?.name}</h2> 
            {showPrice && 
              <h3> ${revealedPrice} </h3>
            }

            {gameEnded && 
              <h2>You lost! Your final score was {score}</h2>  
            }
           <div className = {styles.buttonContainer}>
              <Grocery 
                className = {styles.groceryHigher} 
                label="Higher" 
                onGroceryClick = {() => handleGroceryClick(true)} 
              />
              <Grocery 
                className = {styles.groceryLower} 
                label="Lower" 
                onGroceryClick = {() => handleGroceryClick(false)} 
              />
            </div>
            <h1 style = {{position: "absolute", bottom: "0"}}>Score: {score}</h1>
        </div>
        ) : (
          <div>
            <h1 main>The Grocery Money Game</h1>
            <button className = {styles.start} onClick = {handleStartClick}>Start</button>
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

    setRevealedPrice(nextItem.price); 
    setShowPrice(true);
    if (correctGuess) {
      setScore(prevScore => prevScore + 1);
      setTimeout(() => {
        const newCurrentItem = nextItem;
        let newNextItem = getRandomItem();

        while (newCurrentItem.id === newNextItem.id) {
          newNextItem = getRandomItem();
        }

        setCurrentItem(newCurrentItem);
        setNextItem(newNextItem);
        setShowPrice(false);
      }, 1500); // Adjust delay as needed
    } else {
      setGameEnded(true);
      setTimeout(() => {
        setGameStarted(false);
        setScore(0);
        setGameEnded(false);
        setShowPrice(false);
      }, 3000);
    }
  }
  
  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * choicesList.choices.length);
    return choicesList.choices[randomIndex];
  }

}
