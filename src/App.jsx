import { useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import CardsContainer from './components/CardsContainer';

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <DashBoard score={clickedIds.length} bestScore={bestScore} />
      <CardsContainer
        updateClickedIds={setClickedIds}
        clickedIds={clickedIds}
        updateBestScore={setBestScore}
        bestScore={bestScore}
      />
    </>
  );
}

export default App;
