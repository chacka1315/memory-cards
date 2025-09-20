import { useState, useEffect } from 'react';
import getImages from '../services/images-data';
import '../styles/cardContainer.css';

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

  useEffect(() => {}, []);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      clickedIds.length > bestScore && updateBestScore(clickedIds.length);
      updateIsGameOver();
      return;
    }
    updateClickedIds((prev) => [...prev, id]);
    setCardsData(shuffle(cardsData));
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

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
