// import reactLogo from './assets/react.svg'
// import viteLogo from '/electron-vite.animate.svg'
import './App.css'
import FsAccessDemo from './components/demos/FsAccess';
import ReactStateDemo from './components/demos/ReactState';



function App() {

  

  return (
    <>
      <ReactStateDemo />
      <FsAccessDemo />
    </>
  )
}

export default App
