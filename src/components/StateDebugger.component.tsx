import cond from 'lodash/fp/cond'
import otherwise from 'lodash/fp/stubTrue'
import React from 'react'
import Draggable from 'react-draggable'

const defaultButton = {
  marginBottom: '1rem',
  backgroundColor: '#6C43E0',
  color: 'white',
  outline: 'none',
  borderRadius: '5px',
  border: 'none',
  padding: '5px',
  minWidth: '30px',
}

interface StateDebuggerProps {
  darkMode?: boolean | 'auto'
  enableTabIndex?: boolean
  hideAnchor?: boolean
  maxWidth?: string | number
  modalTitle?: string
  noBorder?: boolean
  noHelp?: boolean
  noTitle?: boolean
  setState?: (x: any) => void
  state: any
  transparent?: boolean
}

/**
 * StateDebugger is a simple UI tool for debugging state management. In truth it
 * will accept any object, but the purpose to create a convenient dev tool to
 * view state and see state changes in a hovering modal without console.logging
 * the moon. It has a handful of convenient options and by default will
 * automatically detect your operating systems dark/light theme but can be
 * overwritten explicitly. It also has a copy feature that will copy JSON to
 * your clipboard to share. You can click `Paste JSON` with a provided
 * `setState` function to take JSON parsable data and pass it to a setter to
 * see the behavior of the component. Modals are draggable and can be toggled
 * on/off with `ctrl-h`. All buttons and fields on the modals are not tabbable
 * by default this preference can be overwritten with `enableTabIndex` flag.
 *
 * TODO:
 *  - make me pretty with stylesheet
 */
export const StateDebugger: React.FC<StateDebuggerProps> = ({
  children,
  darkMode = 'auto',
  enableTabIndex = false, // false preserves the app's tabIndex behavior
  hideAnchor = false,
  maxWidth,
  modalTitle,
  noBorder,
  noHelp,
  noTitle,
  setState = undefined,
  state,
  transparent,
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

  const [newState, setNewState] = React.useState('')
  const [showPaste, setShowPaste] = React.useState<boolean>(false)
  const [show, setShow] = React.useState<boolean>(true)
  const [zIndex, setZIndex] = React.useState<number>(100)

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

  // --[ Styles ]--------------------------------------------------------------
  const mode =
    darkMode === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : darkMode

  // if darkmode is on, use white text
  const color = mode ? '#fff' : '#000'

  // if darkmode is on, use a soft black
  const backgroundColor = mode ? '#333' : '#fff'

  // visible container
  const DraggableStyles: React.CSSProperties = {
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
    maxWidth: maxWidth ?? '90vw',
    maxHeight: '40rem',
    overflow: 'auto',
  }

  // copy icon-button in top right
  const CopyButtonStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '1px solid gray',
    borderRadius: '5px',
    color: 'gray',
    display: 'flex',
    marginLeft: '2rem',
    padding: '0.5rem',
  }

  const HelpStyles: React.CSSProperties = {
    marginTop: '.5rem',
    textAlign: 'right',
    fontFamily: 'monospace',
    color,
  }

  // --[ JSX Elements ]--------------------------------------------------------
  const Anchor = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
    </div>
  )

  const CopyButton = () => (
    <button
      aria-label="Copy to clipboard"
      className="hover-pointer"
      onClick={copy}
      tabIndex={enableTabIndex ? 0 : -1}
      title="Copy to clipboard"
      style={CopyButtonStyles}
    >
      <svg
        id="icon-copy"
        viewBox="0 0 32 32"
        style={{ width: '1rem', fill: color }}
      >
        <path d="M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z"></path>
      </svg>
    </button>
  )

  const CancelButton = () => (
    <button
      tabIndex={enableTabIndex ? 0 : -1}
      onClick={() => setShowPaste(false)}
      style={defaultButton}
    >
      Cancel
    </button>
  )

  const PasteButton = () => (
    <button
      tabIndex={enableTabIndex ? 0 : -1}
      onClick={() => setShowPaste(true)}
      style={defaultButton}
    >
      Paste JSON
    </button>
  )

  const PasteJson = () =>
    setState && showPaste ? (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea
          tabIndex={enableTabIndex ? 0 : -1}
          style={{
            height: '5rem',
            resize: 'none',
            outline: 'none',
            border: '1px solid black',
            borderRadius: '5px',
            margin: '.5rem 0',
          }}
          onChange={({ target }) => setNewState(target.value)}
        />
        <button
          onClick={() => {
            setState(JSON.parse(newState))
            setShowPaste(false)
          }}
          style={defaultButton}
          tabIndex={enableTabIndex ? 0 : -1}
        >
          Set Data
        </button>
      </div>
    ) : (
      <pre
        style={{
          overflow: 'auto',
          marginBottom: '1.2rem',
        }}
      >
        {state ? JSON.stringify(state, null, 2) : {}}
      </pre>
    )

  const Button = () =>
    cond([
      [() => !setState, () => <div />],
      [() => showPaste, () => <CancelButton />],
      [otherwise, () => <PasteButton />],
    ])(null)

  const ZIndexControls = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontFamily: 'monospace',
      }}
    >
      <Button />
      <div>
        <button
          onClick={() => setZIndex(zIndex + 10)}
          tabIndex={enableTabIndex ? 0 : -1}
          title="Increase z-index"
          style={defaultButton}
        >
          Up
        </button>
        <span style={{ margin: '0 1px' }}>|</span>
        <button
          onClick={() => setZIndex(zIndex - 10)}
          tabIndex={enableTabIndex ? 0 : -1}
          title="Decrease z-index"
          style={defaultButton}
        >
          Down
        </button>
      </div>
    </div>
  )

  const Help = () => (
    <>
      <p style={HelpStyles}>Move: drag</p>
      <p style={HelpStyles}>Hide: {'<C-h>'}</p>
    </>
  )

  return (
    <>
      {hideAnchor ? <Anchor /> : children}
      <Draggable>
        <div style={DraggableStyles}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {!noTitle && <h3>{modalTitle ?? 'Debug State'}</h3>}
            <CopyButton />
          </div>
          <PasteJson />
          <ZIndexControls />
          <Help />
        </div>
      </Draggable>
    </>
  )
}
