export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <div>

          <p className="font-sans text-signal text-sm mb-6">
            error 404
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl text-paper mb-5">
            page not found<span className="text-signal">.</span>
          </h1>

          <p className="font-sans text-muted leading-relaxed max-w-lg mb-8">
            this page doesn't exist.
            <br />
            but you found something that wasn't supposed to be here.
          </p>

          <a
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
              transition-colors
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
