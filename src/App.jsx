import './App.css'

import Home from './components/Home'
import RandomWord from './components/RandomWord'

import {Routes, Route, Link} from 'react-router-dom'


function App() {

  return (
    <>
      <h1>Ordle The Wordle</h1>
      <Link to="/"><button >Home</button></Link>
      <Link to="/randomword"><button >Random Word</button></Link>
      <Link ><button>Leaderboard</button></Link>
      <Link ><button>Settings</button></Link>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/randomword' element={<RandomWord />}></Route>
      </Routes>
    </>
  )
}

export default App
