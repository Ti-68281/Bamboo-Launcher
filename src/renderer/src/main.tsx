import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createMockApi } from './mock'
import './styles/global.css'
import './styles/pages.css'

if (!window.bamboo) {
  if (import.meta.env.DEV) {
    // Browser preview / screenshots: run against representative local data.
    window.bamboo = createMockApi()
  } else {
    const fail = async () => {
      throw new Error('Bamboo preload bridge failed to load. 请重新启动启动器。')
    }
    window.bamboo = new Proxy(
      { onEvent: () => () => undefined },
      {
        get(target, property) {
          if (property === 'onEvent') return target.onEvent
          return fail
        },
      },
    ) as unknown as typeof window.bamboo
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
