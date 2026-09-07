import { useEffect, useState } from 'react'

export default function LoadingScreen() {
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        // Disable page scrolling while loading
        document.body.style.overflow = 'hidden'

        const word = 'krr'
        let index = 0

        const typing = setInterval(() => {
            index++
            setText(word.slice(0, index))

            if (index === word.length) {
                clearInterval(typing)

                // Small pause after typing finishes
                setTimeout(() => {
                    // Enable scrolling
                    document.body.style.overflow = ''

                    setFadeOut(true)

                    // Remove loader after fade
                    setTimeout(() => {
                        setVisible(false)
                    }, 500)
                }, 400)
            }
        }, 150)

        return () => {
            clearInterval(typing)
            document.body.style.overflow = ''
        }
    }, [])

    if (!visible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '99vw',
                height: '100vh',
                zIndex: 999999,


                backgroundColor: '#0b0c0ead',
                backdropFilter: 'blur(15px)',
                backgroundImage:
                    'radial-gradient(circle, #1B1C1F 1px, transparent 1px)',
                backgroundSize: '28px 28px',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                // Fade out
                opacity: fadeOut ? 0 : 1,
                transition: 'opacity 0.5s ease',
            }}
        >
            <div
                style={{
                    fontFamily: 'monospace',
                    fontSize: '28px',
                    letterSpacing: '-0.5px',
                }}
            >
                <span style={{ color: '#F5F5F5' }}>
                    utkarsh
                </span>

                <span style={{ color: '#F2A93B' }}>
                    {text}
                </span>

                <span
                    style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '28px',
                        background: '#F2A93B',
                        marginLeft: '5px',
                        verticalAlign: 'middle',
                        animation: 'blink 0.8s infinite',
                    }}
                />
            </div>

            <style>
                {`
                    @keyframes blink {
                        0%, 50% {
                            opacity: 1;
                        }

                        51%, 100% {
                            opacity: 0;
                        }
                    }
                `}
            </style>
        </div>
    )
}