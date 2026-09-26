const STATUS = [
  { label: 'domain', value: 'Machine Learning · Web Development' },
  { label: 'focus', value: 'Machine Learning · Deep Learning' },
  { label: 'interests', value: 'AI · Intelligent systems · Automation' },
]

const NAME = 'Utkarsh Kumar'

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
    <section className="pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-[1.3fr_1fr] gap-14 items-start">
      <div data-stagger data-parallax="0.12">
        <p className="font-serif italic text-lg text-signal mb-4">
          hi, i'm
        </p>

        <h1 aria-label={NAME} data-letters className="font-serif text-5xl sm:text-6xl leading-[1.05] text-paper mb-7">
          {NAME.split(' ').map((w, wi) => (
            <span key={w}>
              <span className="inline-block whitespace-nowrap">
                {[...w].map((ch, ci) => (
                  <span key={ci} aria-hidden="true" data-letter className="letter" style={{ '--i': NAME.indexOf(w) + ci }}>
                    {ch}
                  </span>
                ))}
              </span>
              {wi === 0 && ' '}
            </span>
          ))}
        </h1>

        <p className="max-w-prose text-lg text-muted leading-relaxed mb-10">
          I build machine learning systems and full-stack applications.
        </p>

        <div className="flex flex-wrap gap-4">
          <button data-magnetic type="button"
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center rounded-full bg-signal px-6 py-2.5 font-sans text-sm font-medium text-signal-ink transition-opacity cursor-pointer"
          >
            See my work
          </button>

          <button data-magnetic type="button"
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center rounded-full border border-line px-6 py-2.5 font-sans text-sm text-paper hover:border-muted transition-colors cursor-pointer"
          >
            Get in touch
          </button>
        </div>
      </div>

      <div data-reveal data-tilt="6" data-spot className="border border-line rounded-2xl p-7 bg-surface/60">
        <div className="flex items-center gap-2 mb-7">
          <div className="relative group">
            <span className="block h-2.5 w-2.5 rounded-full bg-signal animate-blink cursor-pointer" />

            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 ml-16 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface2 px-3 py-1.5 font-sans text-[11px] text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              welcoming connections
            </span>
          </div>

          <p className="font-sans text-xs text-muted">
            active
          </p>
        </div>

        <dl className="flex flex-col gap-5">
          {STATUS.map((s) => (
            <div key={s.label}>
              <dt className="font-sans text-xs text-signal-dim mb-1">
                {s.label}
              </dt>

              <dd className="text-sm text-paper leading-relaxed">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
