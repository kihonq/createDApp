const port = chrome.runtime.connect({
  name: 'createdapp-content',
})

port.onMessage.addListener(receiveMessage)
window.addEventListener('message', sendMessage)
port.onDisconnect.addListener(onDisconnect)

function onDisconnect() {
  window.removeEventListener('message', sendMessage)
}

const messages = []

function sendMessage(e) {
  if (e.data && e.data.source === 'createdapp-hook-init') {
    chrome.runtime.sendMessage(e.data)
  } else if (e.data && e.data.source === 'createdapp-hook') {
    messages.push(e.data)
    port.postMessage(e.data)
  }
}

function receiveMessage(message) {
  if (message.source === 'createdapp-panel') {
    if (message.payload === 'replay') {
      port.postMessage({
        source: 'createdapp-content',
        payload: {
          type: 'REPLAY',
          messages,
        },
      })
      return
    }

    window.postMessage(
      {
        source: 'createdapp-content',
        payload: message,
      },
      '*'
    )
  }
}

const source = ';(' + installHook.toString() + ')()'
if (document instanceof HTMLDocument) {
  const script = document.createElement('script')
  script.textContent = source
  document.documentElement.appendChild(script)
  script.parentNode.removeChild(script)
}

// this function has to be kept inline
function installHook() {
  if (window.hasOwnProperty('__USEDAPP_DEVTOOLS_HOOK__')) {
    return
  }

  const hook = {
    createDApp: false,
    init() {
      this.createDApp = true
      window.postMessage({
        source: 'createdapp-hook-init',
        useDAppDetected: true,
      })
      this.send({ type: 'INIT' })
    },
    send(message) {
      window.postMessage({
        source: 'createdapp-hook',
        timestamp: Date.now(),
        payload: message,
      })
    },
    listen(fn) {
      function onMessage(e) {
        if (e.data && e.data.source === 'createdapp-content') {
          fn(e.data.payload)
        }
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    },
  }

  Object.defineProperty(window, '__USEDAPP_DEVTOOLS_HOOK__', {
    get() {
      return hook
    },
  })
}
