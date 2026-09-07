const STATUS = [
  { label: 'domain', value: 'Machine Learning · Web Development' },
  { label: 'focus', value: 'Machine Learning · Deep Learning' },
  { label: 'interests', value: 'AI · Intelligent systems · Automation' },
]

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
      <div>
        <p className="font-mono-heading text-sm text-signal mb-5">
          hi, i'm
        </p>

        <h1 className="font-mono-heading text-4xl sm:text-5xl leading-tight text-paper mb-6">
          Utkarsh Kumar
        </h1>

        <p className="max-w-prose text-lg text-muted leading-relaxed mb-10">
          I build machine learning systems and full-stack applications.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center rounded border border-signal px-5 py-2.5 font-mono-heading text-sm text-signal hover:bg-signal hover:text-ink transition-colors cursor-pointer"
          >
            See my work
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center rounded border border-line px-5 py-2.5 font-mono-heading text-sm text-paper hover:border-muted transition-colors cursor-pointer"
          >
            Get in touch
          </button>
        </div>
      </div>

      <div className="border border-line rounded-lg p-6 bg-surface/40">
        <div className="flex items-center gap-2 mb-6">
          <div className="relative group">
            <span className="block h-2 w-2 rounded-full bg-signal animate-blink cursor-pointer" />

            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 ml-16 -translate-x-1/2 whitespace-nowrap rounded border border-signal bg-[#0B0C0E] px-3 py-1.5 font-mono-heading text-[10px] text-signal opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              welcoming connections
            </span>
          </div>

          <p className="font-mono-heading text-xs text-muted">
            active
          </p>
        </div>

        <dl className="flex flex-col gap-4">
          {STATUS.map((s) => (
            <div key={s.label}>
              <dt className="font-mono-heading text-xs text-signal-dim mb-1">
                {s.label}
              </dt>

              <dd className="text-sm text-paper">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}