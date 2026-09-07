import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'

const COMMANDS = [
    ['help', 'valid commands'],
    ['whoami', 'current admin'],
    ['status', 'current status'],
    ['version', 'website version'],
    ['pwd', 'current directory'],
    ['ls', 'list directory'],
    ['neofetch', 'system summary'],
    ['clear', 'clear terminal'],
]

const START_TIME = Date.now()

export default function Terminal({ onClose, version }) {
    const [history, setHistory] = useState([
        {
            type: 'output',
            text: (
                <>
                    Welcome to{' '}
                    <a href="/#">
                        <span className="text-paper">
                            utkarsh
                        </span>
                        <span className="text-signal">
                            krr
                        </span>
                    </a>
                </>
            ),
        },
        {
            type: 'output',
            text: <>Type "help" to get started.</>,
        },
    ])

    const [input, setInput] = useState('')

    const inputRef = useRef(null)
    const terminalRef = useRef(null)

    /* =========================
       FOCUS
    ========================== */

    useEffect(() => {
        inputRef.current?.focus()

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown
            )
        }
    }, [onClose])

    /* =========================
       AUTO SCROLL
    ========================== */

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop =
                terminalRef.current.scrollHeight
        }
    }, [history])

    /* =========================
       UPTIME
    ========================== */

    const formatUptime = () => {
        const seconds = Math.floor(
            (Date.now() - START_TIME) / 1000
        )

        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`
        }

        return `${remainingSeconds}s`
    }

    /* =========================
       COMMANDS
    ========================== */

    const runCommand = (command) => {
        const cmd = command.trim().toLowerCase()

        if (!cmd) {
            return
        }

        /* =========================
           HOME
        ========================== */

        if (cmd === 'utkarshkrr') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
            ])

            window.location.href = '/#'

            return
        }

        /* =========================
           CLEAR
        ========================== */

        if (cmd === 'clear') {
            setHistory([])
            return
        }

        /* =========================
           HELP
        ========================== */

        if (cmd === 'help') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'help',
                    items: COMMANDS,
                },
            ])

            return
        }

        /* =========================
           WHOAMI
        ========================== */

        if (cmd === 'whoami') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'output',
                    text: (
                        <a href="/#">
                            <span className="text-paper">
                                utkarsh
                            </span>
                            <span className="text-signal">
                                krr
                            </span>
                        </a>
                    ),
                },
            ])

            return
        }

        /* =========================
           STATUS
        ========================== */

        if (cmd === 'status') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'output',
                    text: 'active · accepting connections',
                },
            ])

            return
        }

        /* =========================
           VERSION
        ========================== */

        if (cmd === 'version') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'output',
                    text: version,
                },
            ])

            return
        }

        /* =========================
           PWD
        ========================== */

        if (cmd === 'pwd') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'output',
                    text: (
                        <>
                            home/
                            <a href="/#">
                                <span className="text-paper">
                                    utkarsh
                                </span>
                                <span className="text-signal">
                                    krr
                                </span>
                            </a>
                        </>
                    ),
                },
            ])

            return
        }

        /* =========================
           LS
        ========================== */

        if (cmd === 'ls') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'ls',
                    items: [
                        'about/',
                        'projects/',
                        'experience/',
                        'contact/',
                        'README.md',
                    ],
                },
            ])

            return
        }

        /* =========================
           NEOFETCH
        ========================== */

        if (cmd === 'neofetch') {
            setHistory((prev) => [
                ...prev,
                {
                    type: 'command',
                    text: command,
                },
                {
                    type: 'neofetch',
                },
            ])

            return
        }

        /* =========================
           UNKNOWN COMMAND
        ========================== */

        setHistory((prev) => [
            ...prev,
            {
                type: 'command',
                text: command,
            },
            {
                type: 'error',
                text: `command not found: ${cmd}`,
            },
            {
                type: 'output',
                text: 'type "help" to see valid commands',
            },
        ])
    }

    /* =========================
       SUBMIT
    ========================== */

    const handleSubmit = (e) => {
        e.preventDefault()

        runCommand(input)

        setInput('')
    }

    /* =========================
       TERMINAL
    ========================== */

    const terminal = (
        <div
            className="
                fixed
                right-5
                bottom-5
                z-[1000000]

                pointer-events-auto

                w-[calc(100vw-2.5rem)]
                max-w-[560px]

                overflow-hidden

                rounded-lg
                border
                border-line

                bg-[#0B0C0E]

                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            "
        >
            {/* =========================
                HEADER
            ========================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between

                    border-b
                    border-line

                    px-4
                    py-3
                "
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-signal" />

                        <span className="h-2 w-2 rounded-full bg-muted" />

                        <span className="h-2 w-2 rounded-full bg-line" />
                    </div>

                    <span className="font-mono-heading text-xs text-paper">
                        <a href="/#">
                            utkarsh
                            <span className="text-signal">
                                krr
                            </span>
                        </a>
                        @:~
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        font-mono-heading
                        text-sm
                        text-muted
                        hover:text-paper
                        transition-colors
                    "
                    aria-label="Close terminal"
                >
                    ×
                </button>
            </div>

            {/* =========================
                BODY
            ========================== */}

            <div
                ref={terminalRef}
                className="
                    h-[360px]
                    overflow-y-auto

                    px-5
                    py-5

                    font-mono-heading
                    text-xs
                    leading-6
                "
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((item, index) => {
                    if (item.type === 'output') {
                        return (
                            <div
                                key={index}
                                className="text-muted"
                            >
                                {item.text}
                            </div>
                        )
                    }

                    if (item.type === 'command') {
                        return (
                            <div
                                key={index}
                                className="mt-3 text-signal"
                            >
                                <span className="mr-2">
                                    $
                                </span>

                                {item.text}
                            </div>
                        )
                    }

                    if (item.type === 'error') {
                        return (
                            <div
                                key={index}
                                className="text-signal"
                            >
                                {item.text}
                            </div>
                        )
                    }

                    if (item.type === 'help') {
                        return (
                            <div
                                key={index}
                                className="mt-1"
                            >
                                {item.items.map(
                                    ([commandName, description]) => (
                                        <div
                                            key={commandName}
                                            className="
                                                grid
                                                grid-cols-[90px_1fr]
                                                gap-4
                                            "
                                        >
                                            <span className="text-muted">
                                                {commandName}
                                            </span>

                                            <span className="text-muted">
                                                {description}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        )
                    }

                    if (item.type === 'ls') {
                        return (
                            <div
                                key={index}
                                className="
                                    mt-1
                                    flex
                                    flex-col
                                "
                            >
                                {item.items.map((file) => (
                                    <span
                                        key={file}
                                        className={
                                            file.endsWith('/')
                                                ? 'text-muted'
                                                : 'text-paper'
                                        }
                                    >
                                        {file}
                                    </span>
                                ))}
                            </div>
                        )
                    }

                    if (item.type === 'neofetch') {
                        return (
                            <div
                                key={index}
                                className="
                                    mt-2
                                    grid
                                    grid-cols-[90px_1fr]
                                    gap-x-4
                                "
                            >
                                <span className="text-signal">
                                    admin
                                </span>

                                <a href="/#">
                                    <span className="text-paper">
                                        utkarsh
                                    </span>

                                    <span className="text-signal">
                                        krr
                                    </span>
                                </a>

                                <span className="text-signal">
                                    host
                                </span>

                                <span className="text-muted">
                                    portfolio
                                </span>

                                <span className="text-signal">
                                    shell
                                </span>

                                <span className="text-muted">
                                    react
                                </span>

                                <span className="text-signal">
                                    theme
                                </span>

                                <span className="text-muted">
                                    dark
                                </span>

                                <span className="text-signal">
                                    accent
                                </span>

                                <span className="text-muted">
                                    #F2A93B
                                </span>

                                <span className="text-signal">
                                    version
                                </span>

                                <span className="text-muted">
                                    {version}
                                </span>

                                <span className="text-signal">
                                    uptime
                                </span>

                                <span className="text-muted">
                                    {formatUptime()}
                                </span>
                            </div>
                        )
                    }

                    return null
                })}

                {/* =========================
                    INPUT
                ========================== */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        flex
                        items-center
                        mt-3
                    "
                >
                    <span className="text-signal mr-2">
                        $
                    </span>

                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        className="
                            flex-1
                            min-w-0
                            bg-transparent
                            text-paper
                            outline-none
                            caret-signal
                            font-mono-heading
                        "
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        aria-label="Terminal command"
                    />
                </form>
            </div>
        </div>
    )

    return createPortal(
        terminal,
        document.body
    )
}