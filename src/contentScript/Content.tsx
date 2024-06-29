import React, { useEffect, useRef, useState } from 'react'
import { useGlobalStore } from '../store'
import useDrag from './hooks/useDrag'

export const Content: React.FC = () => {
  const show = useGlobalStore((state) => state.show)
  const imgSrc = useGlobalStore((state) => state.imgSrc)
  const size = useGlobalStore((state) => state.size)
  const pos = useGlobalStore((state) => state.pos)
  const scale = useGlobalStore((state) => state.scale)
  const filter = useGlobalStore((state) => state.filter)
  const opacity = useGlobalStore((state) => state.opacity)
  const mixMode = useGlobalStore((state) => state.mixMode)
  const followScroll = useGlobalStore((state) => state.followScroll)
  const setPos = useGlobalStore((state) => state.setPos)
  const { dragRef } = useDrag(pos, setPos)

  if (!show || !new RegExp(filter).test(window.location.href)) {
    return null
  }

  return (
    <div
      ref={dragRef}
      style={{
        position: followScroll ? 'absolute' : 'fixed',
        zIndex: pos.z,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        overflow: 'hidden',
        opacity: opacity,
        mixBlendMode: mixMode as any,
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <img src={imgSrc} style={{ width: '100%' }} draggable="false" />
    </div>
  )
}
