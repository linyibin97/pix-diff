import store, { GlobalState } from '../store'
import { STORAGE_KEY } from '../constants/index'

function checkObj(obj: Record<string, any>): boolean {
  for (const [key, value] of Object.entries(obj)) {
    switch (key) {
      case 'show':
        if (typeof value !== 'boolean') return false
        break
      case 'imgSrc':
        if (typeof value !== 'string') return false
        break
      case 'pos':
        if (
          typeof value?.x !== 'number' ||
          typeof value?.y !== 'number' ||
          typeof value?.z !== 'number'
        )
          return false
        break
      case 'size':
        if (typeof value?.width !== 'number' || typeof value?.height !== 'number') return false
        break
      case 'scale':
        if (typeof value !== 'number') return false
        break
      case 'filter':
        if (typeof value !== 'string') return false
        break
      case 'opacity':
        if (typeof value !== 'number') return false
        break
      case 'mixMode':
        if (typeof value !== 'string') return false
        break
      case 'followScroll':
        if (typeof value !== 'boolean') return false
        break
      default:
        return false
    }
  }
  return true
}

chrome.storage.local.get([STORAGE_KEY], (items) => {
  const jsonData = items[STORAGE_KEY]
  if (jsonData) {
    const data: Partial<GlobalState> = JSON.parse(jsonData)
    console.log('data', data, checkObj(data))
    if (checkObj(data)) {
      store.setState(data)
    }
  }
})

// listen state changes
store.subscribe((state) => {
  chrome.storage.local.set({ [STORAGE_KEY]: JSON.stringify(state) })
})

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-show') {
    console.log('commands -> toggle-show')
    store.setState((state) => ({
      show: !state.show,
    }))
  }
})
