function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="h-2 w-2 rounded-full bg-signal" />
      <p className="font-mono-heading text-base text-muted">
        {children}
      </p>
    </div>
  )
}

const RESUME_ADDRESS =
  'https://drive.google.com/drive/folders/1kOvaMaONk6sYmAiNB5DxxlDlyiZVFRoE'

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    place: 'Kalinga Institute of Industrial Technology (KIIT)',
    period: '2022 – 2026',
    detail: 'CGPA 9.10 / 10.00',
  },
  {
    degree: 'Higher Secondary',
    place: 'Mithila Institute of Technology',
    period: '2019 – 2021',
    detail: 'GPA 3.43 / 4.00',
  },
]

const CERTIFICATIONS = [
  {
    name: 'AWS Cloud Foundations & Architecting',
    period: '2024',
  },
  {
    name: 'IBM Data Science Professional Certificate',
    period: '2025',
  },
]

export default function About() {
  const viewResume = () => {
    window.open(RESUME_ADDRESS, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="about"
      className="py-16 lg:py-20 border-t border-line scroll-mt-20"
    >
      <SectionLabel>about</SectionLabel>

      <p className="max-w-prose text-base text-paper leading-relaxed mb-14">
        I'm a computer science graduate with hands-on experience across
        machine learning and full-stack development. My work spans training
        deep learning models, building MERN applications, and working with
        AWS services, with a particular interest in applying AI to solve
        practical, real-world problems.
      </p>

      <div className="grid sm:grid-cols-2 gap-12">
        <div>
          <h3 className="font-mono-heading text-xs text-muted mb-5">
            education
          </h3>

          <ul className="flex flex-col gap-5">
            {EDUCATION.map((e) => (
              <li
                key={e.degree}
                className="border-l border-line pl-4"
              >
                <p className="text-sm text-paper">
                  {e.degree}
                </p>

                <p className="text-sm text-muted">
                  {e.place}
                </p>

                <div className="flex items-center gap-3 mt-1">
                  <p className="font-mono-heading text-xs text-signal-dim">
                    {e.period}
                  </p>

                  <p className="font-mono-heading text-xs text-muted">
                    {e.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={viewResume}
            className="inline-flex items-center rounded border border-line px-5 py-2.5 mt-6 font-mono-heading text-sm text-muted hover:border-signal hover:text-signal transition-colors cursor-pointer"
          >
            → view resume
          </button>
        </div>

        <div>
          <h3 className="font-mono-heading text-xs text-muted mb-5">
            certifications
          </h3>

          <ul className="flex flex-col gap-5">
            {CERTIFICATIONS.map((c) => (
              <li
                key={c.name}
                className="border-l border-line pl-4"
              >
                <p className="text-sm text-paper">
                  {c.name}
                </p>

                <p className="font-mono-heading text-xs text-signal-dim mt-1">
                  {c.period}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="font-mono-heading text-xs text-muted mb-5 mt-10">
            languages
          </h3>

          <p className="text-sm text-muted">
            English, Hindi, Nepali, Maithili
          </p>
        </div>
      </div>
    </section>
  )
}