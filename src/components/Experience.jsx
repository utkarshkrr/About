function SectionLabel({ children }) {
  return (
    <div data-reveal className="flex items-center gap-4 mb-10">
      <span className="font-serif italic text-xl text-signal shrink-0">
        {children}
      </span>
      <span data-reveal="line" className="h-px flex-1 bg-line" />
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

      <div data-draw data-stagger className="border-l border-line pl-4 space-y-8">

        {/* Internship */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-1">
            <p className="text-sm text-paper">
              AICTE Virtual Internship — AWS Cloud
            </p>

            <p className="font-sans text-xs text-signal-dim shrink-0">
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

              <span className="font-sans text-[10px] text-signal border border-signal-dim/40 px-2 py-0.5 rounded-full">
                upcoming
              </span>
            </div>

            <p className="font-sans text-xs text-signal-dim shrink-0">
              Joining soon
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
