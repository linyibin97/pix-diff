import React, { useEffect, useRef, useState } from 'react'

export default function useMouseDrag(pos: Position, setPos: (pos: Position) => void) {
  const dragRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (dragRef.current) {
        const startX = e.clientX - pos.x
        const startY = e.clientY - pos.y
        console.log('handleMouseDown', e.clientX, e.clientY, startX, startY, pos.x, pos.y)
        setIsDragging(true)
        setDragPos({ x: pos.x, y: pos.y })

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const newX = moveEvent.clientX - startX
          const newY = moveEvent.clientY - startY
          setDragPos({ x: newX, y: newY })
        }

        const handleMouseUp = (moveEvent: MouseEvent) => {
          console.log('handleMouseUp', moveEvent.clientX, moveEvent.clientY, startX, startY)
          const newX = moveEvent.clientX - startX
          const newY = moveEvent.clientY - startY
          setIsDragging(false)
          setDragPos({ x: newX, y: newY })
          setPos({ x: newX, y: newY, z: pos.z })

          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
    }

    if (dragRef.current) {
      dragRef.current.addEventListener('mousedown', handleMouseDown)
    }

    return () => {
      if (dragRef.current) {
        dragRef.current.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [pos, setPos])

  return { dragRef, isDragging, dragPos }
}
