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
                    document.documentElement.dataset.ready = '1'
                    window.dispatchEvent(new Event('app-ready'))

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
            className="fixed inset-0 flex items-center justify-center"
            style={{
                width: '99vw',
                height: '100vh',
                zIndex: 999999,

                backgroundColor: 'rgb(var(--color-bg) / 0.94)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',

                // Fade out
                opacity: fadeOut ? 0 : 1,
                transition: 'opacity 0.5s ease',
            }}
        >
            <div
                style={{
                    fontFamily: '"JetBrains Mono", ui-sans-serif, system-ui, sans-serif',
                    fontSize: '28px',
                    letterSpacing: '-0.5px',
                }}
            >
                <span style={{ color: 'rgb(var(--color-text))' }}>
                    utkarsh
                </span>

                <span style={{ color: 'rgb(var(--color-accent))' }}>
                    {text}
                </span>

                <span
                    style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '28px',
                        background: 'rgb(var(--color-accent))',
                        marginLeft: '5px',
                        verticalAlign: 'middle',
                        animation: 'loader-blink 0.8s infinite',
                    }}
                />
            </div>

            <style>
                {`
                    @keyframes loader-blink {
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
