import './App.css'

import Home from './components/Home'
import DailyWord from './components/DailyWord'
import RandomWord from './components/RandomWord'
import Leaderboard from './components/Leaderboard'
import Settings from './components/Settings'

import {Routes, Route, Link} from 'react-router-dom'


function App() {
  return (
    <>
      <h1>Ordle The Wordle</h1>
      <Link to="/"><button >Home</button></Link>
      <Link to="/dailyword"><button>Daily Word</button></Link>
      <Link to="/randomword"><button >Random Word</button></Link>
      <Link to='/leaderboard'><button>Leaderboard</button></Link>
      <Link to='/settings'><button>Settings</button></Link>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/dailyword' element={<DailyWord/>}/>
        <Route path='/randomword' element={<RandomWord />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
      </Routes>
    </>
  )
}

export default App
