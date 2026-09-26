/*
 * Motion engine. Everything is driven by data-* attributes, so the
 * components stay almost untouched:
 *
 *  data-stagger   children reveal one after another on scroll
 *  data-reveal    element rises in when scrolled into view
 *  data-count     numbers inside count up when scrolled into view
 *  data-fill      left rail fills once revealed
 *  data-draw      left rail draws with scroll progress
 *  data-spot      cursor spotlight + border glow
 *  data-tilt="n"  3D tilt toward the cursor (n = max degrees)
 *  data-magnetic  pulled toward the cursor
 *  data-prox      children swell / light up near the cursor
 *  data-letter    hero letters that shy away from the cursor
 *  data-parallax  drifts at a fraction of scroll speed
 *  data-skew      leans slightly with scroll velocity
 *  data-nav       scroll-spy link
 */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const $$ = (s) => [...document.querySelectorAll(s)]

export function initMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
  const undo = []
  const on = (t, ev, fn, o) => {
    t.addEventListener(ev, fn, o)
    undo.push(() => t.removeEventListener(ev, fn, o))
  }

  /* ---------- reveal, stagger, count-up ---------- */
  $$('[data-stagger]').forEach((box) =>
    [...box.children].forEach((c, i) => {
      if (c.hasAttribute('data-letters')) return
      c.setAttribute('data-reveal', '')
      c.style.setProperty('--i', i)
    })
  )

  const count = (el) => {
    const node = el.firstChild
    const text = node.nodeValue
    const t0 = performance.now()
    const step = (t) => {
      const k = clamp((t - t0) / 1300, 0, 1)
      const e = 1 - (1 - k) ** 3
      node.nodeValue = text.replace(/\d+(\.\d+)?/g, (m) =>
        (parseFloat(m) * e).toFixed((m.split('.')[1] || '').length)
      )
      if (k < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        en.target.classList.add('in')
        if (en.target.hasAttribute('data-count')) count(en.target)
        io.unobserve(en.target)
      }),
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )
  const start = () =>
    $$('[data-reveal],[data-count]').forEach((el) => io.observe(el))

  // wait for the loading screen to finish
  if (document.documentElement.dataset.ready) start()
  else on(window, 'app-ready', start, { once: true })
  undo.push(() => io.disconnect())

  /* ---------- injected layers ---------- */
  const bar = document.createElement('div')
  bar.className = 'scroll-bar'
  document.body.appendChild(bar)

  let ring = null
  if (fine) {
    ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(ring)
    on(document, 'pointerover', (e) =>
      ring.classList.toggle('hot', !!e.target.closest?.('a,button'))
    )
  }
  undo.push(() => [bar, ring].forEach((n) => n?.remove()))

  let W, H
  const size = () => {
    W = innerWidth
    H = innerHeight
  }
  size()
  on(window, 'resize', size)

  /* ---------- pointer ---------- */
  let tx = -999, ty = -999, mx = -999, my = -999
  on(
    window,
    'pointermove',
    (e) => {
      tx = e.clientX
      ty = e.clientY
      if (mx === -999) {
        mx = tx
        my = ty
      }
      if (ring) ring.style.opacity = 1
    },
    { passive: true }
  )
  on(document.documentElement, 'mouseleave', () => {
    tx = ty = -999
    if (ring) ring.style.opacity = 0
  })

  /* ---------- cached targets ---------- */
  const letters = $$('[data-letter]')
  const magnets = $$('[data-magnetic]')
  const pills = $$('[data-prox] > *')
  const spots = $$('[data-spot]')
  const draws = $$('[data-draw]')
  const drift = $$('[data-parallax]')
  const navs = $$('[data-nav]')
  const sections = navs
    .map((n) => document.getElementById(n.dataset.nav))
    .filter(Boolean)
  const skewEl = document.querySelector('[data-skew]')

  /* ---------- frame loop ---------- */
  let sy = scrollY, vel = 0, skew = 0, active = '', raf

  const tick = () => {
    raf = requestAnimationFrame(tick)

    mx = lerp(mx, tx, 0.14)
    my = lerp(my, ty, 0.14)
    const y = scrollY
    vel = lerp(vel, y - sy, 0.12)
    sy = y

    /* scroll progress + velocity lean */
    bar.style.transform = `scaleX(${y / Math.max(1, document.documentElement.scrollHeight - H)})`
    skew = lerp(skew, clamp(vel * 0.05, -0.8, 0.8), 0.2)
    if (skewEl)
      skewEl.style.transform = Math.abs(skew) > 0.02 ? `skewY(${skew}deg)` : ''

    /* hero drift + fade */
    if (y < 1000)
      drift.forEach((el) => {
        el.style.transform = `translateY(${-y * el.dataset.parallax}px)`
        el.style.opacity = clamp(1 - y / 700, 0.15, 1)
      })

    /* rails that draw with scroll */
    draws.forEach((el) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--p', clamp((H * 0.7 - r.top) / r.height, 0, 1).toFixed(3))
    })

    /* scroll-spy */
    let cur = ''
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < H * 0.4) cur = s.id
    })
    if (cur !== active) {
      active = cur
      navs.forEach((n) => n.toggleAttribute('data-active', n.dataset.nav === cur))
    }

    if (!fine) return

    /* cursor ring */
    ring.style.transform = `translate(${mx}px,${my}px)`

    /* hero letters shy away and light up */
    if (y < H)
      letters.forEach((el) => {
        const r = el.getBoundingClientRect()
        const dx = r.left + r.width / 2 - mx
        const dy = r.top + r.height / 2 - my
        const d = Math.hypot(dx, dy) || 1
        const f = Math.max(0, 1 - d / 150)
        el.style.translate = `${(dx / d) * f * 16}px ${(dy / d) * f * 16}px`
        el.style.setProperty('--near', f.toFixed(2))
      })

    /* magnetic buttons */
    let best = null, bestD = Infinity, bx = 0, by = 0
    magnets.forEach((el) => {
      const r = el.getBoundingClientRect()
      const dx = tx - (r.left + r.width / 2)
      const dy = ty - (r.top + r.height / 2)
      // distance from the cursor to the button's edge (0 when over it)
      const d = Math.hypot(
        Math.max(Math.abs(dx) - r.width / 2, 0),
        Math.max(Math.abs(dy) - r.height / 2, 0)
      )
      if (d < 24 && d < bestD) {
        best = el
        bestD = d
        bx = dx
        by = dy
      }
    })
    magnets.forEach((el) => {
      el.style.translate = el === best ? `${bx * 0.28}px ${by * 0.4}px` : ''
    })

    /* pills swell near the cursor */
    pills.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > H) return
      const d = Math.hypot(
        tx - (r.left + r.width / 2),
        ty - (r.top + r.height / 2)
      )
      const f = Math.max(0, 1 - d / 110)
      el.style.scale = 1 + f * 0.14
      el.style.setProperty('--near', f.toFixed(2))
    })

    /* spotlight + tilt on cards */
    spots.forEach((el) => {
      const r = el.getBoundingClientRect()
      const inside = tx >= r.left && tx <= r.right && ty >= r.top && ty <= r.bottom
      if (inside) {
        el.style.setProperty('--sx', `${tx - r.left}px`)
        el.style.setProperty('--sy', `${ty - r.top}px`)
      }
      el.toggleAttribute('data-hot', inside)
      if (el.dataset.tilt !== undefined) {
        const m = +el.dataset.tilt || 4
        el.style.transform = inside
          ? `perspective(900px) rotateX(${(0.5 - (ty - r.top) / r.height) * m}deg) rotateY(${((tx - r.left) / r.width - 0.5) * m * 2}deg)`
          : ''
      }
    })
  }
  tick()
  undo.push(() => cancelAnimationFrame(raf))

  return () => undo.forEach((fn) => fn())
}
