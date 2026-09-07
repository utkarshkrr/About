export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <div className="font-mono-heading">

          <p className="text-signal text-sm mb-6">
            error 404
          </p>

          <h1 className="text-4xl sm:text-5xl text-paper mb-5">
            page not found<span className="text-signal">.</span>
          </h1>

          <p className="text-muted leading-relaxed max-w-lg mb-8">
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
              rounded
              px-5
              py-2.5
              text-sm
              text-paper
              hover:border-signal
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