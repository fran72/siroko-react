import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Countdown from 'react-countdown';

const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
  let formattedMinutes = String(minutes);
  let formattedSeconds = String(seconds);
  if (minutes < 10) { formattedMinutes = '0' + String(minutes); }
  if (seconds < 10) { formattedSeconds = '0' + String(seconds); }
  
  if (completed) {
    // Render a completed state
    return <span> Time is out...click to reload </span>;
  } else {
    // Render a countdown
    return <span className='counter'>{formattedMinutes}:{formattedSeconds}</span>;
  }
};

function App() {
  const [count, setCount] = useState(0)
  const fun = () => setCount((count) => count + 1);

  const minum =  1111;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Countdown date={Date.now() + 66000} renderer={renderer} />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fun}>
          count is {count} - {minum}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
