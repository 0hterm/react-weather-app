import './App.css';
import LocationFinder from './components/LocationFinder';
import Forecast from './components/Forecast';

function App() {  

  return (
    <div className='App'>
      <h2>Local Weather ⛅</h2>
      <p>Let&apos;s take a look at today's forecast.</p>
      <LocationFinder />
      <Forecast />

    </div>
  )
}

export default App
