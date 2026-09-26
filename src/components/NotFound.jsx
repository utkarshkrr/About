import { useEffect, useRef } from 'react'

const LOADER_DELAY = 1000

export default function NotFound() {
  const contentRef = useRef(null)

  useEffect(() => {
    const elements =
      contentRef.current?.querySelectorAll('[data-404-reveal]')

    if (!elements?.length) return

    const revealTimer = setTimeout(() => {
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        }, index * 140)
      })
    }, LOADER_DELAY)

    return () => clearTimeout(revealTimer)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <div ref={contentRef}>

          <h1
            data-404-reveal
            className="
              font-sans
              text-signal
              sm:text-3xl
              mb-6
              opacity-0
              translate-y-[18px]
              transition-all
              duration-700
              ease-out
            "
          >
            error 404
          </h1>

          <h1
            data-404-reveal
            className="
              font-serif
              text-5xl
              sm:text-6xl
              text-paper
              mb-5
              opacity-0
              translate-y-[18px]
              transition-all
              duration-700
              ease-out
            "
          >
            page not found<a href='/' className="animate-blink text-signal">.</a>
          </h1>

          <p
            data-404-reveal
            className="
              font-sans
              text-muted
              leading-relaxed
              max-w-lg
              mb-8
              opacity-0
              translate-y-[18px]
              transition-all
              duration-700
              ease-out
            "
          >
            this page doesn't exist.
            <br />
            but you found something that wasn't supposed to be here.
          </p>

          <a
            data-404-reveal
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              border
              border-line
              rounded-full
              px-5
              py-2.5
              font-sans
              text-sm
              text-paper
              hover:border-signal-dim
              hover:text-signal
              transition-all
              duration-300
              opacity-0
              translate-y-[18px]
            "
          >
            <span>→</span>
            go home
          </a>

        </div>
      </div>
    </main>
  )
}