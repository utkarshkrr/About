import { useState } from 'react'

const LINKS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
]

const SOCIALS = [
  { address: 'https://github.com/utkarshkrr', label: 'github' },
  { address: 'https://www.linkedin.com/in/utkarshkrr', label: 'linkedin' },
]

const BINARY = '01010101 01001011'

export default function Sidebar({ menuOpen, setMenuOpen }) {
  const [binaryGlitch, setBinaryGlitch] = useState(false)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    setMenuOpen(false)
  }

  const visitSocial = (address) => {
    if (!address) return

    window.open(address, '_blank', 'noopener,noreferrer')
  }

  const handleLogoClick = (e) => {
    if (e.detail === 2) {
      e.preventDefault()

      setBinaryGlitch(true)

      setTimeout(() => {
        setBinaryGlitch(false)
      }, 1200)
    } else {
      setMenuOpen(false)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const Logo = ({ mobile = false }) => (
    <button
      type="button"
      onClick={handleLogoClick}
      className={
        mobile
          ? 'font-mono-heading text-sm text-paper cursor-pointer'
          : 'font-mono-heading text-base text-paper block mb-14 cursor-pointer'
      }
      aria-label="Go to top"
    >
      {binaryGlitch ? (
        <span className="text-signal">
          {BINARY}
        </span>
      ) : (
        <>
          <span className="text-paper">utkarsh</span>
          <span className="text-signal">krr</span>
        </>
      )}
    </button>
  )

  return (
    <>
      {/* =========================
          MOBILE TOP BAR
      ========================== */}
      <div
        id="mobile-top-bar"
        className="flex items-center justify-between px-6 py-5 lg:hidden border-b border-line"
      >
        <Logo mobile />

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="relative w-[60px] h-[30px] text-paper text-sm font-mono-heading border border-line rounded overflow-hidden cursor-pointer"
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              menuOpen
                ? 'opacity-0 -translate-y-2'
                : 'opacity-100 translate-y-0'
            }`}
          >
            menu
          </span>

          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              menuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            close
          </span>
        </button>
      </div>

      {/* =========================
          MOBILE CLICK-AWAY
      ========================== */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40"
        />
      )}

      {/* =========================
          MOBILE SIDE DRAWER
      ========================== */}
      <nav
        className={`lg:hidden fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-72 border-l border-line px-10 py-10 transform transition-transform duration-300 ease-in-out ${
          menuOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-5">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToSection(l.id)}
              className="font-mono-heading text-sm hover:text-paper transition-colors w-fit cursor-pointer text-left"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 flex flex-col gap-3">
          {SOCIALS.map((s) => (
            <button
              key={s.address}
              type="button"
              onClick={() => visitSocial(s.address)}
              className="font-mono-heading text-xs text-muted hover:text-signal transition-colors w-fit cursor-pointer text-left"
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* =========================
          DESKTOP FIXED RAIL
      ========================== */}
      <aside
        className="
          hidden lg:flex
          lg:flex-col
          lg:justify-between
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:w-64
          lg:px-10
          lg:py-14
          border-r border-line
          z-50
        "
      >
        <div>
          <Logo />

          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollToSection(l.id)}
                className="font-mono-heading text-sm text-muted hover:text-paper transition-colors w-fit cursor-pointer text-left"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop Social Links */}
        <div className="flex flex-col gap-3">
          {SOCIALS.map((s) => (
            <button
              key={s.address}
              type="button"
              onClick={() => visitSocial(s.address)}
              className="font-mono-heading text-xs text-muted hover:text-signal transition-colors w-fit cursor-pointer text-left"
            >
              {s.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}