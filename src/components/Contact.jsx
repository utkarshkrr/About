function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-serif italic text-xl text-signal shrink-0">
        {children}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

const LINKS = [
  {
    label: 'Email',
    value: 'utkarshkr055@gmail.com',
    address: 'mailto:utkarshkr055@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'utkarshkrr',
    address: 'https://www.github.com/utkarshkrr',
  },
  {
    label: 'LinkedIn',
    value: 'utkarshkrr',
    address: 'https://www.linkedin.com/in/utkarshkrr',
  },
]

export default function Contact() {
  const visitLink = (address) => {
    if (!address) return

    if (address.startsWith('mailto:')) {
      window.location.href = address
      return
    }

    window.open(address, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contact"
      className="py-16 lg:py-20 border-t border-line scroll-mt-20"
    >
      <SectionLabel>contact</SectionLabel>

      <p className="max-w-prose text-base text-paper leading-relaxed mb-10">
        Interested in building things across machine learning and full-stack development.
        <br/>
        The fastest way to reach me is by email.
      </p>

      <div className="flex flex-col gap-4 mb-10">
        {LINKS.map((l) => (
          <button
            key={l.label}
            type="button"
            onClick={() => visitLink(l.address)}
            className="flex items-center justify-between border border-line rounded-xl px-5 py-3.5 hover:border-signal-dim transition-colors max-w-md cursor-pointer text-left"
          >
            <span className="font-sans text-xs text-muted">
              {l.label}
            </span>

            <span className="text-sm">
              {l.value === 'utkarshkrr' ? (
                <>
                  <span className="text-paper">utkarsh</span>
                  <span className="text-signal">krr</span>
                </>
              ) : (
                <span className="text-signal">{l.value}</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
