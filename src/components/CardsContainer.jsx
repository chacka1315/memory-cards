import { useState, useEffect } from 'react';
import getImages from '../services/images-data';

export default function CardsContainer({
  updateClickedIds,
  clickedIds,
  updateBestScore,
  bestScore,
}) {
  const [isGameOver, setIsGameOver] = useState(true);

  const cardsData = getImages(8);

  const handleGameOverClick = () => {
    setIsGameOver(false);
  };

  useEffect(() => {
    if (!isGameOver) return;
    document.addEventListener('click', handleGameOverClick);
    return () => document.removeEventListener('click', handleGameOverClick);
  }, [isGameOver]);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      clickedIds.length > bestScore && updateBestScore(clickedIds.length);
      return;
    }
    updateClickedIds([...clickedIds, id]);
  };

  const cardsList = cardsData.map((cardData) => (
    <Card
      src={cardData.src}
      name={cardData.name}
      key={cardData.id}
      onclick={() => handleCardClick(cardData.id)}
    />
  ));

  return (
    <>
      {cardsList}
      <GameMsg isGameOver={isGameOver} />
    </>
  );
}

function Card({ src, name, onclick }) {
  return (
    <div className="card" onClick={onclick}>
      <img src={src} alt={name} />
      <p>{name}</p>
    </div>
  );
}

function GameMsg({ isGameOver }) {
  return isGameOver ? (
    <div className={isGameOver ? 'showMsg' : 'hideMsg'}>Game Over...</div>
  ) : (
    ''
  );
}
