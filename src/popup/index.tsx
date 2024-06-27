import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup'
import './index.css'
import { storeReadyPromise } from '../store'

storeReadyPromise.then(() => {
  console.log('bearStoreReady')
  ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
  )
})
