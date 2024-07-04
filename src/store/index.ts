import { create } from 'zustand'
import { wrapStore } from 'webext-zustand'

export interface GlobalState {
  show: boolean
  setShow: (show: boolean) => void
  imgSrc: string
  setImgSrc: (imgSrc: string) => void
  pos: Position
  setPos: (pos: Position) => void
  size: Size
  setSize: (size: Size) => void
  scale: number
  setScale: (scale: number) => void
  filter: string
  setFilter: (filter: string) => void
  opacity: number
  setOpacity: (opacity: number) => void
  mixMode: string
  setMixMode: (mixMode: string) => void
  followScroll: boolean
  setFollowScroll: (followScroll: boolean) => void
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  show: false,
  imgSrc: '',
  pos: {
    x: 0,
    y: 0,
    z: 9999,
  },
  size: {
    width: 0,
    height: 0,
  },
  scale: 1,
  filter: '.*',
  opacity: 0.5,
  mixMode: 'normal',
  followScroll: false,
  setShow: (show) => set({ show }),
  setImgSrc: (imgSrc) => set({ imgSrc }),
  setSize: (size) => set({ size }),
  setPos: (pos) => set({ pos }),
  setScale: (scale) => set({ scale }),
  setFilter: (filter) => set({ filter }),
  setOpacity: (opacity) => set({ opacity }),
  setMixMode: (mixMode) => set({ mixMode }),
  setFollowScroll: (followScroll) => set({ followScroll }),
}))

export const storeReadyPromise = wrapStore(useGlobalStore)

export default useGlobalStore
