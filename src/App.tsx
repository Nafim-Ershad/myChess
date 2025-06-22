import './App.css';
import Board from './Components/Board';
import MoveList from './Components/MoveList';

function App() {
  return (
    <div className='chess-container'>
      <Board/>
      <MoveList/>
    </div>
  )
}

export default App
