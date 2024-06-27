import { useEffect } from 'react'
import { useBearStore } from "../store";

export const Content: React.FC = () => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  return (
    <div
      style={{
        position: 'fixed',
        color: 'red',
        fontSize: '24px',
        top: '0',
        zIndex: 99999,
      }}
      onClick={() => {
        increase(1)
      }}
    >
      {bears}
    </div>
  )
}
