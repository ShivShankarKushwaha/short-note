import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Database from './Components/Database';
import LiveClock from './Components/LiveClock';
function App()
{
  return(
    <div className='App'>
      <Database/>
      {/* <LiveClock></LiveClock> */}
    </div>
  )
}
export default App;
