import './App.css';
import LocationFinder from './components/LocationFinder';
import Forecast from './components/Forecast';

function App() {  

  return (
    <div className='App'>
      <h1 id="title">Local Weather ⛅</h1>
      <h3 id="description">Let&apos;s take a look at today's forecast.</h3>
      <LocationFinder />
      <Forecast />
    </div>
  )
}

export default App
