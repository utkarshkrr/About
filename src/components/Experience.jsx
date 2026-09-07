function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="h-2 w-2 rounded-full bg-signal" />
      <p className="font-mono-heading text-base text-muted">{children}</p>
    </div>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 lg:py-20 border-t border-line scroll-mt-20"
    >
      <SectionLabel>experience</SectionLabel>

      <div className="border-l border-line pl-4 space-y-8">

        {/* Internship */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-1">
            <p className="text-sm text-paper">
              AICTE Virtual Internship — AWS Cloud
            </p>

            <p className="font-mono-heading text-xs text-signal-dim shrink-0">
              Oct – Dec 2024
            </p>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            Worked with core AWS services and cloud architecture concepts as
            part of a structured virtual learning-cum-internship program.
          </p>
        </div>

        {/* Upcoming Full-Time Role */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <p className="text-sm text-paper">
                System Engineer — TCS
              </p>

              <span className="font-mono-heading text-[10px] uppercase tracking-wider text-signal border border-signal/30 px-1.5 py-0.5 rounded">
                upcoming
              </span>
            </div>

            <p className="font-mono-heading text-xs text-signal-dim shrink-0">
              May 2026 · Joining soon
            </p>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            Accepted a full-time System Engineer position at Tata Consultancy Services Limited.
          </p>
        </div>

      </div>
    </section>
  )
}