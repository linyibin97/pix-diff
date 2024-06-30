import React, { useEffect, useRef, useState } from 'react'

export default function useDrag(show: boolean, pos: Position, setPos: (pos: Position) => void) {
  const dragRef = useRef<HTMLDivElement>(null)
  const dragPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (dragRef.current) {
        let startX = pos.x
        let startY = pos.y

        const calcPos = (event: MouseEvent | TouchEvent) => {
          let newX: number, newY: number
          if (event instanceof MouseEvent) {
            newX = event.clientX - startX
            newY = event.clientY - startY
          } else {
            newX = (event.touches?.[0]?.clientX || 0) - startX
            newY = (event.touches?.[0]?.clientY || 0) - startY
          }
          return { newX, newY }
        }

        const { newX, newY } = calcPos(e)
        startX = newX
        startY = newY
        dragPos.current = { x: pos.x, y: pos.y }
        if (dragRef.current) {
          dragRef.current.style.top = `${pos.y}px`
          dragRef.current.style.left = `${pos.x}px`
        }

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
          const { newX, newY } = calcPos(moveEvent)
          dragPos.current = { x: newX, y: newY }
          if (dragRef.current) {
            dragRef.current.style.top = `${newY}px`
            dragRef.current.style.left = `${newX}px`
          }
          moveEvent.preventDefault()
        }

        const handleEnd = () => {
          setPos({ x: dragPos.current.x, y: dragPos.current.y, z: pos.z })

          document.removeEventListener('mousemove', handleMove)
          document.removeEventListener('mouseup', handleEnd)
          document.removeEventListener('touchmove', handleMove)
          document.removeEventListener('touchend', handleEnd)
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleEnd)
        document.addEventListener('touchmove', handleMove)
        document.addEventListener('touchend', handleEnd)
      }
      e.preventDefault()
    }

    if (dragRef.current) {
      dragRef.current.addEventListener('mousedown', handleStart)
      dragRef.current.addEventListener('touchstart', handleStart)
    }

    return () => {
      if (dragRef.current) {
        dragRef.current.removeEventListener('mousedown', handleStart)
        dragRef.current.removeEventListener('touchstart', handleStart)
      }
    }
  }, [show, pos, setPos])

  return { dragRef }
}
