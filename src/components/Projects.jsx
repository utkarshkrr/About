function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="h-2 w-2 rounded-full bg-signal" />
      <p className="font-mono-heading text-base text-muted">{children}</p>
    </div>
  )
}

const PROJECTS = [
  {
    name: 'AI-based healthcare system — Healthify',
    period: 'Apr 2026',
    featured: 'true',
    description:
      'A full-stack healthcare platform integrating AI diagnostics, medical recommendations, and appointment booking. Built an AI-powered multi-disease detection module using CNN and SVM models to predict brain tumours, diabetes, and Parkinson’s from clinical and MRI data, and contributed to the dashboard and UI for the prediction workflows.',
    highlight: '81.8% accuracy on MRI-based brain tumour detection',
    stack: ['PyTorch', 'CNN', 'SVM', 'MERN', 'Flask'],
    address: 'https://github.com/utkarshkrr/Healthify',
  },
  {
    name: 'TrendX — social media trend aggregator',
    period: 'Dec 2025',
    featured: 'false',
    description:
      'Coordinated development across a six-person team using Agile methodology. Led testing and QA, contributed to the UI module and backend-frontend integration, and documented the system architecture and testing workflow.',
    stack: ['Agile', 'QA', 'Full-stack'],
    address: '/trendX',
  },
  {
    name: 'E-commerce web platform',
    period: 'Jan 2025',
    featured: 'false',
    description:
      'A full-stack MERN application with JWT-based authentication and an admin dashboard for managing an inventory of 100+ products.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    address: 'https://github.com/utkarshkrr/ElectroMart',
  },
]

export default function Projects() {
  const visitRepository = (address) => {
    window.open(address, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="projects"
      className="py-16 lg:py-20 border-t border-line scroll-mt-20"
    >
      <SectionLabel>projects</SectionLabel>

      <div className="flex flex-col gap-6">
        {PROJECTS.map((p) => {
          const isFeatured = p.featured === 'true'

          return (
            <div
              key={p.name}
              className={
                isFeatured
                  ? 'relative border border-signal/30 rounded-lg px-6 pt-10 pb-6 hover:border-signal'
                  : 'border border-line rounded-lg p-6 hover:border-muted transition-colors'
              }
            >
              {/* Featured tag */}
              {isFeatured && (
                <span className="absolute top-0 left-6 inline-flex items-center bg-signal/80 text-black px-3 py-1 rounded-b font-mono-heading text-xs">
                  featured
                </span>
              )}

              {/* Project name + date */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-mono-heading text-lg text-paper min-w-0">
                  {p.name}
                </h3>

                <p className="font-mono-heading text-xs text-muted shrink-0">
                  {p.period}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed mb-3">
                {p.description}
              </p>

              {/* Featured highlight */}
              {isFeatured && p.highlight && (
                <p className="text-sm  mb-4">
                  {p.highlight}
                </p>
              )}

              {/* Stack + Repository */}
              <div className="flex items-end justify-between gap-6 mt-4">
                <ul className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="font-mono-heading text-xs text-signal-dim border border-line rounded px-2 py-1"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => visitRepository(p.address)}
                  className="inline-flex items-center rounded border border-line px-4 py-2 font-mono-heading text-sm text-muted hover:border-signal-dim hover:text-signal-dim transition-colors shrink-0 cursor-pointer"
                >
                  → visit repo
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}