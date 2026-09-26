import { useEffect, useRef, useState } from 'react'
import { flushSync, createPortal } from 'react-dom'

const LIGHT_START = 6
const DARK_START = 18

const MODAL_MANUAL_DISMISS_MS = 1500
const MODAL_AUTO_DISMISS_MS = 2500

const getTimeBasedTheme = () => {
  const hour = new Date().getHours()

  return hour >= LIGHT_START && hour < DARK_START
    ? 'light'
    : 'dark'
}

/*
 * Get the next boundary for the selected theme.
 *
 * light -> DARK_START
 * dark  -> LIGHT_START
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
 * Calculate remaining hours, minutes and seconds
 * until the given boundary.
 */
const getRemainingTime = (boundary) => {
  const now = new Date()

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
const formatRemainingTime = (boundary) => {
  const {
    hours,
    minutes,
    seconds,
  } = getRemainingTime(boundary)

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
  return getTimeBasedTheme()
}

/*
 * Modal shown whenever the theme changes, whether the user
 * clicked the toggle or the clock crossed a boundary
 * (LIGHT_START / DARK_START). Backdrop + centered card so it
 * can't be missed; click anywhere, or wait, to dismiss.
 *
 * Colors are set inline using the site's own CSS custom
 * properties (--color-bg / --color-surface / --color-border /
 * --color-text / --color-muted / --color-accent), the same
 * `rgb(var(--x) / alpha)` pattern used in index.css.
 *
 * Rendered through a portal directly into document.body so
 * that `position: fixed` resolves against the real viewport
 * even when ThemeToggle itself is mounted inside a mobile
 * sidebar/drawer that has a `transform` (or `filter` /
 * `will-change` / `contain`) applied to it for its slide
 * animation — any of those properties creates a new CSS
 * containing block, which would otherwise clip a `fixed`
 * descendant to the sidebar's box instead of the screen.
 */
function ThemeChangeModal({ info, onDismiss }) {
  if (!info) return null

  const { theme, auto } = info
  const label =
    theme === 'light'
      ? 'Light'
      : 'Dark'

  const boundaryHour =
    theme === 'light'
      ? LIGHT_START
      : DARK_START

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      onClick={onDismiss}
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        cursor-pointer
        theme-modal-backdrop
      "
      style={{
        backgroundColor:
          'rgb(var(--color-bg) / 0.72)',
        backdropFilter:
          'blur(6px)',
        WebkitBackdropFilter:
          'blur(6px)',
      }}
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-3
          rounded-2xl
          px-12
          py-9
          theme-modal-card
        "
        style={{
          backgroundColor:
            'rgb(var(--color-surface) / 0.98)',
          border:
            '1px solid rgb(var(--color-border))',
          boxShadow:
            '0 20px 60px rgb(0 0 0 / 0.35), 0 0 0 1px rgb(var(--color-accent) / 0.15)',
          color:
            'rgb(var(--color-text))',
        }}
      >
        <span
          className="
            flex
            items-center
            justify-center
            w-16
            h-16
            rounded-full
            text-3xl
            leading-none
          "
          style={{
            backgroundColor:
              'rgb(var(--color-accent) / 0.16)',
            color:
              'rgb(var(--color-accent))',
          }}
        >
          {theme === 'light'
            ? '☀'
            : '☾'}
        </span>

        <span
          className="
            text-xl
            font-semibold
            tracking-wide
          "
        >
          {label} mode
        </span>

        <span
          className="
            text-xs
            font-mono
            tracking-wide
          "
          style={{
            color:
              'rgb(var(--color-muted))',
          }}
        >
          {auto ? (
            <>
              Switched automatically ·{' '}
              {boundaryHour}:00
              <br />
              <br />
              Auto-switches every 12 hours
            </>
          ) : (
            'Switched manually'
          )}
        </span>
      </div>

      <style>{`
        @keyframes themeModalFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes themeModalPopIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(8px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .theme-modal-backdrop {
          animation:
            themeModalFadeIn
            180ms
            ease-out;
        }

        .theme-modal-card {
          width:
            min(
              560px,
              calc(100vw - 48px)
            );

          min-height: 150px;

          padding:
            28px 30px;

          gap: 22px;

          animation:
            themeModalPopIn
            220ms
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );
        }

        .theme-modal-card > span:first-child {
          width: 56px;
          height: 56px;
          font-size: 2rem;
        }

        @media (max-width: 640px) {
          .theme-modal-card {
            width:
              min(
                430px,
                calc(100vw - 32px)
              );

            min-height: 130px;

            padding: 22px;

            gap: 16px;
          }

          .theme-modal-card > span:first-child {
            width: 48px;
            height: 48px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .theme-modal-backdrop,
          .theme-modal-card {
            animation: none;
          }
        }
      `}</style>
    </div>,
    document.body
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    getInitialTheme
  )

  /*
   * The boundary is frozen for the current theme and only
   * recomputed when we actually enter a (new) theme, rather
   * than being recalculated from scratch every second.
   */
  const boundaryRef = useRef(
    getNextThemeBoundary(
      getInitialTheme()
    )
  )

  const [remaining, setRemaining] =
    useState(() =>
      formatRemainingTime(
        boundaryRef.current
      )
    )

  /*
   * Tooltip countdown snapshot.
   *
   * This is intentionally separate from
   * the live countdown so the browser
   * tooltip does not refresh every second.
   */
  const [
    tooltipRemaining,
    setTooltipRemaining,
  ] = useState(() =>
    formatRemainingTime(
      boundaryRef.current
    )
  )

  /*
   * Change-notification modal.
   * { theme: 'light' | 'dark', auto: boolean } | null
   */
  const [
    changeInfo,
    setChangeInfo,
  ] = useState(null)

  const modalTimerRef =
    useRef(null)

  /*
   * Last "now" seen by the countdown tick.
   * Used to detect the clock moving backward
   * (system clock change, DST fallback, a
   * DevTools Date override, waking from sleep
   * with a skewed clock) so the frozen
   * boundaryRef can be self-corrected instead
   * of silently going stale.
   */
  const lastNowRef = useRef(new Date())

  /*
   * Manual = 1.5 seconds
   * Automatic = 2.5 seconds
   */
  const announceChange = (
    nextTheme,
    auto
  ) => {
    if (modalTimerRef.current) {
      clearTimeout(
        modalTimerRef.current
      )
    }

    setChangeInfo({
      theme: nextTheme,
      auto,
    })

    modalTimerRef.current =
      setTimeout(
        () => {
          setChangeInfo(null)
          modalTimerRef.current =
            null
        },
        auto
          ? MODAL_AUTO_DISMISS_MS
          : MODAL_MANUAL_DISMISS_MS
      )
  }

  useEffect(() => {
    return () => {
      if (modalTimerRef.current) {
        clearTimeout(
          modalTimerRef.current
        )
      }
    }
  }, [])

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
    const handleThemeChange = (
      event
    ) => {
      const detail =
        event.detail

      const nextTheme =
        typeof detail === 'string'
          ? detail
          : detail?.theme

      const auto =
        typeof detail === 'object'
          ? Boolean(detail.auto)
          : false

      if (
        nextTheme !== 'light' &&
        nextTheme !== 'dark'
      ) {
        return
      }

      boundaryRef.current =
        getNextThemeBoundary(
          nextTheme
        )

      setTheme(nextTheme)

      setRemaining(
        formatRemainingTime(
          boundaryRef.current
        )
      )

      /*
       * Show the modal for synchronized
       * theme changes too.
       */
      announceChange(
        nextTheme,
        auto
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
   * Updates every second. Compares `now`
   * against the frozen boundaryRef.
   */
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()

      /*
       * If "now" is earlier than the last tick's
       * "now", the clock has jumped backward.
       * The frozen boundaryRef was computed
       * against the old, later clock reading, so
       * it can be pointing at a boundary a full
       * cycle away from where we actually are.
       * Re-derive it from the theme we're
       * currently showing + the new "now" so the
       * countdown (and the eventual auto-switch)
       * realign instead of staying stuck.
       */
      if (
        now <
        lastNowRef.current
      ) {
        boundaryRef.current =
          getNextThemeBoundary(
            theme
          )
      }

      lastNowRef.current = now

      /*
       * Current theme has reached
       * its natural boundary.
       */
      if (
        now >=
        boundaryRef.current
      ) {
        const automaticTheme =
          getTimeBasedTheme()

        boundaryRef.current =
          getNextThemeBoundary(
            automaticTheme
          )

        setTheme(
          automaticTheme
        )

        setRemaining(
          formatRemainingTime(
            boundaryRef.current
          )
        )

        document.documentElement.setAttribute(
          'data-theme',
          automaticTheme
        )

        window.dispatchEvent(
          new CustomEvent(
            'theme-change',
            {
              detail: {
                theme:
                  automaticTheme,
                auto: true,
              },
            }
          )
        )

        return
      }

      /*
       * Update countdown.
       */
      setRemaining(
        formatRemainingTime(
          boundaryRef.current
        )
      )
    }

    updateTimer()

    const interval =
      setInterval(
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
      formatRemainingTime(
        boundaryRef.current
      )
    )
  }

  /*
   * Manual theme switch.
   */
  const toggleTheme = (e) => {
    const nextTheme =
      theme === 'dark'
        ? 'light'
        : 'dark'

    const root =
      document.documentElement

    /*
     * Everything that changes
     * with the theme.
     */
    const commit = () => {
      root.setAttribute(
        'data-theme',
        nextTheme
      )

      boundaryRef.current =
        getNextThemeBoundary(
          nextTheme
        )

      setTheme(nextTheme)

      setRemaining(
        formatRemainingTime(
          boundaryRef.current
        )
      )

      /*
       * Update the other
       * ThemeToggle instance.
       *
       * This is intentionally
       * marked auto:false.
       */
      window.dispatchEvent(
        new CustomEvent(
          'theme-change',
          {
            detail: {
              theme: nextTheme,
              auto: false,
            },
          }
        )
      )

      /*
       * Show the manual modal.
       * It will dismiss after 1.5s.
       */
      announceChange(
        nextTheme,
        false
      )
    }

    const box =
      e?.currentTarget
        ?.getBoundingClientRect()

    if (
      box &&
      document.startViewTransition &&
      !matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      const x =
        box.left +
        box.width / 2

      const y =
        box.top +
        box.height / 2

      const radius =
        Math.hypot(
          Math.max(
            x,
            innerWidth - x
          ),
          Math.max(
            y,
            innerHeight - y
          )
        )

      root.classList.add(
        'theme-switching'
      )

      const vt =
        document.startViewTransition(
          () =>
            flushSync(commit)
        )

      vt.ready.then(() =>
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 750,
            easing:
              'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement:
              '::view-transition-new(root)',
          }
        )
      )

      vt.finished.finally(() =>
        root.classList.remove(
          'theme-switching'
        )
      )
    } else {
      commit()
    }
  }

  const isLight =
    theme === 'light'

  return (
    <>
      <button
        data-theme-toggle
        type="button"
        onClick={toggleTheme}
        onMouseEnter={
          handleMouseEnter
        }
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
          style={{
            backgroundColor: 'rgb(var(--color-accent) / 0.16)',
            color: 'rgb(var(--color-accent))',
          }}
          className={`
            absolute
            top-[3px]
            left-[3px]
            h-[24px]
            w-[24px]
            rounded-full
            border
            border-line
            flex
            items-center
            justify-center
            text-ink
            transition-transform
            duration-300
            ease-out
            z-10
            ${isLight
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
            ${isLight
              ? 'justify-start pl-3 pr-8'
              : 'justify-end pr-3 pl-8'
            }
          `}
        >
          {remaining}
        </span>
      </button>

      <ThemeChangeModal
        info={changeInfo}
        onDismiss={() => {
          if (
            modalTimerRef.current
          ) {
            clearTimeout(
              modalTimerRef.current
            )

            modalTimerRef.current =
              null
          }

          setChangeInfo(null)
        }}
      />
    </>
  )
}