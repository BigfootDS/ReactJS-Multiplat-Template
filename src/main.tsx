import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { migrator } from './utils/database/migrator.ts'

(async () => {
  navigator.storage.persist().then((isPersisted) => {
    if (isPersisted){
      console.log("Data will be persisted!");
    } else {
      console.log("Data might not be persisted!");
    }
  })
  await migrator.migrateToLatest();
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
