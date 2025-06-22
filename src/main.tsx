import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DndContext } from '@dnd-kit/core'

import GameProvider from './Store/Game/GameProvider.tsx'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <DndContext>
        <App />
      </DndContext>
    </GameProvider>
  </StrictMode>,
)
