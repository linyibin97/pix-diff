import store from '../store'

// listen state changes
store.subscribe((state) => {
  console.log('bg:', state)
  // TODO: save in storage
  // chrome.storage.local.set({ [STORAGE_KEY]: JSON.stringify(state) })
})

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-show') {
    console.log('commands -> toggle-show')
    store.setState((state) => ({
      show: !state.show,
    }))
  }
})
