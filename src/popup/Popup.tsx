import { useState, useEffect } from 'react'
import { useBearStore } from '../store'
import './Popup.css'

const Popup = () => {
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increase)

  return (
    <div>
      Popup
      <div>
        <span>Bears: {bears}</span>
        <br />
        <button onClick={() => increase(1)}>Increment +</button>
      </div>
    </div>
  )
}

export default Popup
