import React from 'react'
import Draggable from 'react-draggable'

interface DebugStateProps {
  noBorder?: boolean
  noHelp?: boolean
  noTitle?: boolean
  state: any
  transparent?: boolean
  windowName?: string
  darkMode?: boolean | 'auto'
  maxWidth?: string | number
}
export const DebugState: React.FC<DebugStateProps> = ({
  children,
  darkMode = 'auto',
  state,
  noBorder,
  noHelp,
  noTitle,
  transparent,
  windowName,
  maxWidth,
}) => {
  const copy = async () => {
    const text = JSON.stringify(state, null, 2)
    await navigator.clipboard.writeText(text)
    alert('Copied to clipboard')
  }

  React.useEffect(() => {
    console.log('-----------------------------')
    console.log('--[ State Debugger Active ]--')
    console.table({
      'Move Window': 'click and drag',
      'Show/Hide Windows': 'Press (ctl-h) to show/hide',
      'Adjust Vertical Position': 'Adjust z-index with up/down buttons',
      'Copy Data to Clipboard': 'User copy button to data to clipboard',
    })
  }, [])

  const [show, setShow] = React.useState(true)
  const [zIndex, setZIndex] = React.useState(100)

  React.useEffect(() => {
    //add ctrl-h key listener
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault()
        setShow(!show)
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  })

  // const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const mode =
    darkMode === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : darkMode
  const color = mode ? '#fff' : '#000'
  const backgroundColor = mode ? '#000' : '#fff'

  return (
    <>
      <div>
        <div
          style={{
            display: noHelp ? 'none' : 'block',
            fontSize: '8px',
            fontFamily: 'monospace',
          }}
        >
          <p>Debug State is Active</p>
          <p>Press `ctrl+h` to hide/show debugger</p>
        </div>
        <div>{children}</div>
        <Draggable>
          <div
            style={{
              zIndex,
              display: show ? 'block' : 'none',
              color,
              border: noBorder ? 'none' : '1px solid black',
              borderRadius: '5px',
              position: 'fixed',
              top: '0',
              right: '0',
              padding: '10px 20px',
              backgroundColor: transparent ? 'transparent' : backgroundColor,
              cursor: 'default',
              maxWidth: maxWidth ?? '90vh',
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {!noTitle && <h3>{windowName ?? 'Debug State'}</h3>}
                <button
                  aria-label="Copy to clipboard"
                  className="hover-pointer"
                  onClick={copy}
                  tabIndex={0}
                  title="Copy to clipboard"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    color: 'gray',
                    display: 'flex',
                    marginLeft: '2rem',
                    padding: '0.5rem',
                  }}
                >
                  <svg
                    id="icon-copy"
                    viewBox="0 0 32 32"
                    style={{ width: '1rem', fill: color }}
                  >
                    <path d="M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z"></path>
                  </svg>
                </button>
              </div>
              <pre
                style={{
                  overflow: 'auto',
                  marginBottom: '1.2rem',
                }}
              >
                {JSON.stringify(state, null, 2)}
              </pre>
              <div
                style={{
                  fontSize: '12px',
                  textAlign: 'right',
                  fontFamily: 'monospace',
                }}
              >
                <button
                  style={{ padding: '2px 3px' }}
                  onClick={() => setZIndex(zIndex + 1)}
                >
                  Up
                </button>
                <span style={{ margin: '0 1px' }}>|</span>
                <button
                  style={{ padding: '2px 3px' }}
                  onClick={() => setZIndex(zIndex - 1)}
                >
                  Down
                </button>
              </div>
              <p
                style={{
                  marginTop: '.5rem',
                  textAlign: 'right',
                  fontFamily: 'monospace',
                  color: 'gray',
                }}
              >
                Draggable
              </p>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  )
}
