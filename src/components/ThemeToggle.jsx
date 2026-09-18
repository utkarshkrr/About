import { useEffect, useState } from 'react'

const LIGHT_START = 6
const DARK_START = 18

const getTimeBasedTheme = () => {
  const hour = new Date().getHours()

  return hour >= LIGHT_START && hour < DARK_START
    ? 'light'
    : 'dark'
}

/*
 * Get the next boundary for the selected theme.
 *
 * light -> 18:00
 * dark  -> 06:00
 */
const getNextThemeBoundary = (theme) => {
  const now = new Date()
  const boundary = new Date(now)

  if (theme === 'light') {
    boundary.setHours(DARK_START, 0, 0, 0)

    if (boundary <= now) {
      boundary.setDate(boundary.getDate() + 1)
    }
  } else {
    boundary.setHours(LIGHT_START, 0, 0, 0)

    if (boundary <= now) {
      boundary.setDate(boundary.getDate() + 1)
    }
  }

  return boundary
}

/*
 * Calculate remaining hours, minutes and seconds.
 */
const getRemainingTime = (theme) => {
  const now = new Date()
  const boundary = getNextThemeBoundary(theme)

  const difference = Math.max(
    0,
    boundary.getTime() - now.getTime()
  )

  const totalSeconds = Math.floor(
    difference / 1000
  )

  const hours = Math.floor(
    totalSeconds / 3600
  )

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  )

  const seconds = totalSeconds % 60

  return {
    hours,
    minutes,
    seconds,
  }
}

/*
 * Format:
 *
 * 4h 55m 09s
 * 16h 55m 09s
 * 42m 08s
 * 09s
 */
const formatRemainingTime = (theme) => {
  const {
    hours,
    minutes,
    seconds,
  } = getRemainingTime(theme)

  const paddedMinutes = String(
    minutes
  ).padStart(2, '0')

  const paddedSeconds = String(
    seconds
  ).padStart(2, '0')

  if (hours > 0) {
    return `${hours}h ${paddedMinutes}m ${paddedSeconds}s`
  }

  if (minutes > 0) {
    return `${minutes}m ${paddedSeconds}s`
  }

  return `${paddedSeconds}s`
}

const getInitialTheme = () => {
  try {
    const stored =
      localStorage.getItem('theme')

    if (
      stored === 'light' ||
      stored === 'dark'
    ) {
      return stored
    }
  } catch (e) {
    // localStorage unavailable
  }

  return getTimeBasedTheme()
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    getInitialTheme
  )

  const [remaining, setRemaining] =
    useState(() =>
      formatRemainingTime(
        getInitialTheme()
      )
    )

  /*
   * Tooltip countdown snapshot.
   *
   * This is intentionally separate from
   * the live countdown so the browser
   * tooltip does not refresh every second.
   */
  const [tooltipRemaining, setTooltipRemaining] =
    useState(() =>
      formatRemainingTime(
        getInitialTheme()
      )
    )

  /*
   * Apply theme.
   */
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme
    )
  }, [theme])

  /*
   * Synchronize desktop and mobile
   * ThemeToggle instances.
   */
  useEffect(() => {
    const handleThemeChange = (event) => {
      const nextTheme = event.detail

      if (
        nextTheme !== 'light' &&
        nextTheme !== 'dark'
      ) {
        return
      }

      setTheme(nextTheme)

      setRemaining(
        formatRemainingTime(nextTheme)
      )
    }

    window.addEventListener(
      'theme-change',
      handleThemeChange
    )

    return () => {
      window.removeEventListener(
        'theme-change',
        handleThemeChange
      )
    }
  }, [])

  /*
   * Live countdown.
   *
   * Updates every second.
   */
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()

      const boundary =
        getNextThemeBoundary(theme)

      /*
       * Current theme has reached its
       * natural boundary.
       */
      if (now >= boundary) {
        const automaticTheme =
          getTimeBasedTheme()

        setTheme(automaticTheme)

        setRemaining(
          formatRemainingTime(
            automaticTheme
          )
        )

        try {
          localStorage.removeItem(
            'theme'
          )
        } catch (e) {
          // localStorage unavailable
        }

        document.documentElement.setAttribute(
          'data-theme',
          automaticTheme
        )

        window.dispatchEvent(
          new CustomEvent(
            'theme-change',
            {
              detail: automaticTheme,
            }
          )
        )

        return
      }

      /*
       * Update countdown.
       */
      setRemaining(
        formatRemainingTime(theme)
      )
    }

    updateTimer()

    const interval = setInterval(
      updateTimer,
      1000
    )

    return () =>
      clearInterval(interval)
  }, [theme])

  /*
   * Take a snapshot of the countdown
   * when the user starts hovering.
   */
  const handleMouseEnter = () => {
    setTooltipRemaining(
      formatRemainingTime(theme)
    )
  }

  /*
   * Manual theme switch.
   */
  const toggleTheme = () => {
    const nextTheme =
      theme === 'dark'
        ? 'light'
        : 'dark'

    /*
     * Apply immediately.
     */
    document.documentElement.setAttribute(
      'data-theme',
      nextTheme
    )

    /*
     * Save manual selection.
     */
    try {
      localStorage.setItem(
        'theme',
        nextTheme
      )
    } catch (e) {
      // localStorage unavailable
    }

    /*
     * Update current instance.
     */
    setTheme(nextTheme)

    setRemaining(
      formatRemainingTime(nextTheme)
    )

    /*
     * Update the other ThemeToggle
     * instance as well.
     */
    window.dispatchEvent(
      new CustomEvent(
        'theme-change',
        {
          detail: nextTheme,
        }
      )
    )
  }

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      onMouseEnter={handleMouseEnter}
      aria-label={
        isLight
          ? `Light theme, ${remaining} remaining. Switch to dark theme.`
          : `Dark theme, ${remaining} remaining. Switch to light theme.`
      }
      title={
        isLight
          ? `Light mode · ${tooltipRemaining} until dark`
          : `Dark mode · ${tooltipRemaining} until light`
      }
      className="
        relative
        flex
        items-center
        w-[112px]
        h-8
        shrink-0
        rounded-full
        border
        border-line
        bg-ink
        overflow-hidden
        cursor-pointer
        transition-colors
        duration-300
        hover:border-signal-dim
      "
    >
      {/* =========================
          SLIDING KNOB
      ========================== */}
      <span
        className={`
          absolute
          top-[3px]
          left-[3px]
          h-[24px]
          w-[24px]
          rounded-full
          border
          border-line
          bg-paper
          flex
          items-center
          justify-center
          text-ink
          transition-transform
          duration-300
          ease-out
          z-10
          ${
            isLight
              ? 'translate-x-[80px]'
              : 'translate-x-0'
          }
        `}
      >
        {isLight ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="4"
            />

            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>

      {/* =========================
          COUNTDOWN
      ========================== */}
      <span
        className={`
          absolute
          inset-0
          flex
          items-center
          font-mono
          text-[9px]
          tracking-wide
          text-muted
          font-medium
          pointer-events-none
          transition-all
          duration-300
          ${
            isLight
              ? 'justify-start pl-3 pr-8'
              : 'justify-end pr-3 pl-8'
          }
        `}
      >
        {remaining}
      </span>
    </button>
  )
}