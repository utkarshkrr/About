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
            className="flex items-center justify-between border border-line rounded px-5 py-3 hover:border-muted transition-colors max-w-md cursor-pointer text-left"
          >
            <span className="font-mono-heading text-xs text-muted">
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