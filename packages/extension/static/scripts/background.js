const devtoolsPorts = {}
const contentPorts = {}

chrome.runtime.onConnect.addListener((port) => {
  if (port.name.startsWith('createdapp-panel-')) {
    const tabId = parseInt(port.name.substring('createdapp-panel-'.length))
    devtoolsPorts[tabId] = port
    function onMessage(message) {
      if (contentPorts[tabId]) {
        contentPorts[tabId].postMessage(message)
      }
    }
    port.onMessage.addListener(onMessage)
    port.onDisconnect.addListener(() => {
      port.onMessage.removeListener(onMessage)
      delete devtoolsPorts[tabId]
    })
  } else if (port.name === 'createdapp-content') {
    const tabId = port.sender.tab.id
    contentPorts[tabId] = port
    function onMessage(message) {
      if (devtoolsPorts[tabId]) {
        devtoolsPorts[tabId].postMessage(message)
      }
    }
    port.onMessage.addListener(onMessage)
    port.onDisconnect.addListener(() => {
      port.onMessage.removeListener(onMessage)
      delete contentPorts[tabId]
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab && message.useDAppDetected) {
    chrome.browserAction.setIcon({
      tabId: sender.tab.id,
      path: 'icons/icon.svg',
    })
    chrome.browserAction.setPopup({
      tabId: sender.tab.id,
      popup: 'popup/popup.html',
    })
  }
})
