import { useState } from 'react'
import Terminal from './Terminal'

const VERSION = 'v26.9.4'

export default function Footer() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <>
      <footer className="py-10 border-t border-line flex items-center justify-between">
        <p className="font-mono-heading text-xs text-muted">
          © {new Date().getFullYear()}{' '}
          <a href="#">
            <span className="text-paper">utkarsh</span>
            <span className="text-signal">krr</span>
          </a>{' '}
          · Utkarsh Kumar
        </p>

        <button
          onClick={() => setTerminalOpen(true)}
          className="font-mono-heading text-xs text-muted hover:text-paper transition-colors cursor-pointer hover:underline animate-blink"
          aria-label="Open terminal"
        >
          {VERSION.split('.').map((part, index) => (
            <span key={index}>
              {index > 0 && (
                <span className="text-signal text-base">.</span>
              )}
              {part}
            </span>
          ))}
        </button>
      </footer>

      {terminalOpen && (
        <Terminal
          version={VERSION}
          onClose={() => setTerminalOpen(false)}
        />
      )}
    </>
  )
}