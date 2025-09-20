import { useState, useEffect } from 'react';
import getImages from '../services/images-data';

export default function CardsContainer({
  updateClickedIds,
  clickedIds,
  updateBestScore,
  bestScore,
  isGameOver,
  updateIsGameOver,
}) {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    let ignore = false;
    getImages(8).then((data) => {
      if (!ignore) {
        setCardsData(data);
      }
      console.log('test');
    });

    return () => (ignore = true);
  }, []);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      clickedIds.length > bestScore && updateBestScore(clickedIds.length);
      updateIsGameOver();
      updateClickedIds([]);
      return;
    }
    updateClickedIds((prev) => [...prev, id]);
  };

  const cardsList = cardsData.map((cardData) => (
    <Card
      src={cardData.first_src ? cardData.first_src : cardData.second_src}
      name={cardData.name}
      key={cardData.id}
      onClick={() => handleCardClick(cardData.id)}
    />
  ));

  return (
    <div className={isGameOver ? 'container onGameOver' : 'container'}>
      {cardsList}
    </div>
  );
}

function Card({ src, name, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={src} alt={name} />
      <p>{name}</p>
    </div>
  );
}
