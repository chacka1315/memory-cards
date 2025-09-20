import { useState } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <DashBoard score={score} bestScore={bestScore} />
    </>
  );
}

export default App;
