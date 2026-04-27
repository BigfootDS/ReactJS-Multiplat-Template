// import reactLogo from './assets/react.svg'
// import viteLogo from '/electron-vite.animate.svg'
import './App.css'
import FsAccessDemo from './components/demos/FsAccess';
import OpfscBasicDemo from './components/demos/OpfsBasic';
import ReactStateDemo from './components/demos/ReactState';
import SqliteOpfsDemo from './components/demos/SqliteOpfs';
import StorageInfo from './components/demos/StorageInfo';



function App() {

  
  

  return (
    <>
      <StorageInfo />
      <ReactStateDemo />
      <FsAccessDemo />
      <SqliteOpfsDemo />
      <OpfscBasicDemo />
    </>
  )
}

export default App
