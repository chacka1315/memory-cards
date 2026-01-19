import { useEffect, useMemo } from 'react';
import '../styles/cardContainer.css';
import type { CardProps } from '../types/CardsContainerTypes';
import { useQuery } from '@tanstack/react-query';
import { cardsOptions } from '../queryOptions';
import useStore from '../store/store';
import { useShallow } from 'zustand/react/shallow';

export default function CardsContainer() {
  const clickSound = useMemo(() => new Audio('/click-sound.mp3'), []);
  const gameOverSound = useMemo(() => new Audio('/game-over-sound.mp3'), []);

  const {
    isGameOver,
    canPlaySound,
    cardCount,
    cardSize,
    setVisibleCards,
    visibleCards,
    clickedIds,
    setBestScore,
    bestScore,
    setGameOver,
    addClickedId,
    inShowHelp,
  } = useStore(
    useShallow((s) => ({
      isGameOver: s.isGameOver,
      canPlaySound: s.canPlaySound,
      cardCount: s.cardCount,
      cardSize: s.cardSize,
      addClickedId: s.addClickedId,
      setVisibleCards: s.setVisibleCards,
      visibleCards: s.visibleCards,
      clickedIds: s.clickedIds,
      setBestScore: s.setBestScore,
      bestScore: s.bestScore,
      setGameOver: s.setGameOver,
      inShowHelp: s.inShowHelp,
    }))
  );

  const { data: cardsData, isLoading } = useQuery({
    ...cardsOptions(100),
  });

  useEffect(() => {
    if (cardsData) {
      const newVisible = cardsData.slice(0, cardCount);
      setVisibleCards(newVisible);
    }
  }, [cardCount, cardsData]);

  const handleCardClick = (id: number) => {
    clickSound.currentTime = 0;
    canPlaySound && clickSound.play();
    if (clickedIds.includes(id)) {
      canPlaySound && gameOverSound.play();
      clickedIds.length > bestScore && setBestScore(clickedIds.length);
      setGameOver(true);
      return;
    }
    addClickedId(id);
    setVisibleCards(shuffle([...visibleCards]));
  };

  const isWin = clickedIds.length === cardCount;

  const cardsList = visibleCards.map((cardData) => (
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

function Card({ src, name, onClick, cardSize }: CardProps) {
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

function shuffle(array: any[]) {
  let currentIndex = array.length;
  let randomIndex: number;

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

function LoadingButton({ isLoading }: { isLoading: boolean }) {
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
