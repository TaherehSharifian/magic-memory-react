import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/singleCard/SingleCard";

const cardImages = [
  { src: "img/jhope.jpg", matched: false },
  { src: "img/jimin.jpg", matched: false },
  { src: "img/jin.jpg", matched: false },
  { src: "img/jungkook.jpg", matched: false },
  { src: "img/namjoon.jpg", matched: false },
  { src: "img/suga.jpg", matched: false },
  { src: "img/taehyung.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleCardChoices = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);

      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetTurn(), 1000);
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  // reset cards and increase turn
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // starts automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleCardChoices={handleCardChoices}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
