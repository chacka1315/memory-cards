import { useState, useEffect, useMemo } from 'react';
import getImages from '../services/images-data';
import '../styles/cardContainer.css';

export default function CardsContainer({
  updateClickedIds,
  clickedIds,
  updateBestScore,
  bestScore,
  isGameOver,
  isWin,
  inShowHelp,
  updateIsGameOver,
  canPlaySound,
  cardCount,
  cardSize,
}) {
  const [cardsData, setCardsData] = useState([]);
  const [visibleCard, setVisibleCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const clickSound = useMemo(() => new Audio('/click-sound.mp3'), []);
  const gameOverSound = useMemo(() => new Audio('/game-over-sound.mp3'), []);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    getImages(100).then((data) => {
      if (!ignore) {
        setCardsData(data);
        setIsLoading(false);
      }
    });

    return () => (ignore = true);
  }, []);

  useEffect(() => {
    const newVisible = cardsData.slice(0, cardCount);
    setVisibleCard(newVisible);
  }, [cardCount, cardsData]);

  const handleCardClick = (id) => {
    canPlaySound && clickSound.play();
    if (clickedIds.includes(id)) {
      canPlaySound && gameOverSound.play();
      clickedIds.length > bestScore && updateBestScore(clickedIds.length);
      updateIsGameOver();
      return;
    }
    updateClickedIds((prev) => [...prev, id]);
    setVisibleCard(shuffle([...visibleCard]));
  };

  const cardsList = visibleCard.map((cardData) => (
    <Card
      src={cardData.first_src ? cardData.first_src : cardData.second_src}
      name={cardData.name}
      key={cardData.id}
      onClick={() => handleCardClick(cardData.id)}
      cardSize={cardSize}
    />
  ));

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize}px, 1fr))`,
      }}
      className={
        isGameOver || inShowHelp || isWin ? 'container onGameOver' : 'container'
      }
    >
      {cardsList}
      <LoadingButton isLoading={isLoading} />
    </div>
  );
}

function Card({ src, name, onClick, cardSize }) {
  const cardFontSize = name.length > 10 ? 0.1 * cardSize : 0.15 * cardSize;
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ height: cardSize + 30 + 'px', width: cardSize + 'px' }}
    >
      <img src={src} alt={name} style={{ height: 0.8 * cardSize + 'px' }} />
      <p
        style={{
          fontSize: `${cardFontSize}px`,
        }}
      >
        {name}
      </p>
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

function LoadingButton({ isLoading }) {
  return (
    <button
      className={
        isLoading ? 'loadingBtn showLoadingBtn' : 'loadingBtn hideLoadingBtn'
      }
    >
      <i className="fa fa-spinner fa-spin"></i>Loading
    </button>
  );
}
