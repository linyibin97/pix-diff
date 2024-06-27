import React from 'react'
import ReactDOM from 'react-dom/client'
import { Content } from './Content'
import { storeReadyPromise } from '../store'

const appId = 'chrome-ext-pix-diff-app'

storeReadyPromise.then(() => {
  let el = document.getElementById(appId)
  if (!el) {
    el = document.createElement('div')
    el.id = appId
    document.body.append(el)
  }

  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <Content />
    </React.StrictMode>,
  )
})
