// import reactLogo from './assets/react.svg'
// import viteLogo from '/electron-vite.animate.svg'
import './App.css'
import FsAccessDemo from './components/demos/FsAccess';
import OpfsBasicFileIO from './components/demos/OpfsBasicFileIO';
// import ReactStateDemo from './components/demos/ReactState';
import SqlocalOpfs from './components/demos/SqlocalOpfs';
import DataChecker from './components/demos/DataChecker';



function App() {

  
  

  return (
    <>
      <DataChecker />
      {/* <ReactStateDemo /> */}
      <FsAccessDemo />
      <SqlocalOpfs />
      <OpfsBasicFileIO />
    </>
  )
}

export default App
