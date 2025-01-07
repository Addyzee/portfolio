import Main from './components/Main'
import SideNav from './components/SideNav'
import './App.css'
import { useState } from 'react'



function App() {
  const [currentState, setCurrentState] = useState<string>("Home")
  const changeState = (name: string) =>{
    setCurrentState(name)

  }

  return (
    <div className='flex app'>
      <SideNav changeNav={changeState}></SideNav>
      <Main changeState={changeState} currentState={currentState}></Main>
      
    </div>
  )
}

export default App
