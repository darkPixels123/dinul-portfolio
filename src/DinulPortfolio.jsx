import { useState, useEffect, useRef } from "react";
import "./style.css";

/* ---------------------------------------------------------------
   DINUL — Video Editor Portfolio
   Sections are data-driven below; edit these arrays to update
   your work, services and process without touching the JSX.
---------------------------------------------------------------- */

/* ---------------------------------------------------------------
   ADDING YOUR VIDEOS:
   - video: a local file from /public (e.g. "/videos/reel.mp4"),
            a YouTube link (watch, shorts or youtu.be),
            or a Vimeo link. The player is picked automatically.
   - thumb: optional thumbnail image shown in the card
            (e.g. "/thumbs/reel.jpg"). Leave null for the gradient.
   The first card has a demo YouTube link so you can test the popup.
---------------------------------------------------------------- */

const WORK = [
  {
    ratio: "r169",
    frame: "f1",
    span: "",
    tc: "16:9 · 12:40",
    title: "Creator documentary — retention-first long-form",
    tag: "YouTube",
    video: "https://www.youtube.com/watch?v=J5Z6kEK4fB0",
    thumb: null,
  },
  {
    ratio: "r169",
    frame: "f2",
    span: "",
    tc: "16:9 · 01:32",
    title: "Product launch film — motion & sound design",
    tag: "Brand",
    video: "https://www.youtube.com/watch?v=x3-g1UnOyvY",
    thumb: null,
  },
  {
    ratio: "r916",
    frame: "f3",
    span: "tall",
    tc: "9:16 · 00:38",
    title: "Hook-driven reel",
    tag: "Short-form",
    video: "https://www.youtube.com/shorts/zgnP3dAQXms",
    thumb: null,
  },
  {
    ratio: "r916",
    frame: "f4",
    span: "tall",
    tc: "9:16 · 00:54",
    title: "Podcast clip system",
    tag: "Short-form",
    video: "https://www.youtube.com/shorts/SFxNUoxzock",
    thumb: null,
  },
  {
    ratio: "r11",
    frame: "f5",
    span: "sq",
    tc: "1:1 · 00:30",
    title: "Paid social ad",
    tag: "Ads",
    video: null,
    thumb: null,
  },
  {
    ratio: "r11",
    frame: "f6",
    span: "sq",
    tc: "1:1 · 01:05",
    title: "SaaS explainer",
    tag: "Motion",
    video: "https://youtube.com/shorts/uFFVn_e6H6s",
    thumb: null,
  },
];

const SERVICES = [
  {
    chip: "9:16",
    title: "Short-form",
    blurb:
      "Reels, TikToks and Shorts engineered around the first two seconds — pattern interrupts, open loops and pacing that earns the rewatch.",
    items: [
      "Hook-first structure & captions",
      "Sound design + trend-aware pacing",
      "Batch systems for consistent posting",
    ],
  },
  {
    chip: "16:9",
    title: "Long-form YouTube",
    blurb:
      "Retention edits that respect the story — clean assembly, tension held across chapters, and a payoff worth staying for.",
    items: [
      "Retention-based restructuring",
      "B-roll, motion graphics & SFX",
      "Thumbnails-to-edit narrative match",
    ],
  },
  {
    chip: "Any",
    title: "Brand & Motion",
    blurb:
      "Launch films, ads and SaaS explainers with intentional motion design — polished, on-brand, and built to convert.",
    items: [
      "Motion graphics & kinetic type",
      "Color grade & audio mix",
      "Deliverables in every format you need",
    ],
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief",
    body: "Goals, audience, references. We agree on what the edit has to do before a single cut.",
  },
  {
    n: "02",
    title: "Assembly",
    body: "Footage logged and selects pulled. The story finds its spine.",
  },
  {
    n: "03",
    title: "Rough cut",
    body: "Structure, pacing and hooks locked. You review; I revise.",
  },
  {
    n: "04",
    title: "Grade & mix",
    body: "Color, sound design, motion graphics and captions layered in.",
  },
  {
    n: "05",
    title: "Delivery",
    body: "Final export in every ratio and platform spec you need.",
  },
];

const TESTIMONIALS = [
  {
    tc: "00:02:14:06",
    quote:
      "Dinul restructured a 40-minute interview into a 12-minute cut that doubled our average watch time. He edits like he can see the retention graph.",
    name: "Sample Client",
    role: "Creator · 250K subscribers",
  },
  {
    tc: "00:00:41:18",
    quote:
      "Our launch film came back polished on the first pass — motion, sound, grade, everything. The only revision note we sent was 'ship it'.",
    name: "Sample Client",
    role: "Founder, Brand Studio",
  },
  {
    tc: "00:00:07:12",
    quote:
      "The hooks he cuts stop thumbs mid-scroll. Our reels went from a few thousand views to consistently six figures.",
    name: "Sample Client",
    role: "Marketing Lead, D2C Brand",
  },
];

const MARQUEE = [
  "Reels / TikTok / Shorts",
  "Long-form YouTube",
  "Brand & SaaS Motion",
  "Podcast Clips",
  "Ads & Promos",
  "Documentary Cuts",
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
];

import myimage from "./assets/Profile Images/myImage.jpg";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Turn a YouTube / Vimeo link into an embeddable player URL.
   Returns null for local files, which use the native <video> tag. */
const toEmbed = (url) => {
  if (!url) return null;
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
};

export default function DinulPortfolio() {
  /* ---------- theme: night / day grade ---------- */
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => setTheme(e.matches ? "light" : "dark");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ---------- video lightbox ---------- */
  const [activeWork, setActiveWork] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!activeWork) return;
    // lock the page behind the popup; the wheel lerp checks this class too
    document.body.classList.add("vmodal-open");
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setActiveWork(null);
    addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("vmodal-open");
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [activeWork]);

  /* ---------- live timecode (24fps) ---------- */
  const tcRef = useRef(null);
  const footTcRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const start = performance.now();
    const pad = (n) => String(n).padStart(2, "0");
    let raf;
    const tick = (now) => {
      const s = (now - start) / 1000;
      const str = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(Math.floor((s % 1) * 24))}`;
      if (tcRef.current) tcRef.current.textContent = str;
      if (footTcRef.current) footTcRef.current.textContent = "REC · " + str;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------- scroll playhead ---------- */
  const fillRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (fillRef.current) fillRef.current.style.width = p * 100 + "%";
      if (markerRef.current)
        markerRef.current.style.left = `calc(${p * 100}% - 1px)`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- reveal on scroll ---------- */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---------- custom cursor: REC dot + focus ring ---------- */
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glyphRef = useRef(null);

  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches)
      return;
    const root = document.documentElement;
    root.classList.add("cursor-on");
    const dot = dotRef.current,
      ring = ringRef.current,
      glyph = glyphRef.current;

    let mx = innerWidth / 2,
      my = innerHeight / 2; // mouse position
    let rx = mx,
      ry = my; // ring position (lags behind)
    let ringScale = 1;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      root.classList.add("cursor-visible");
    };

    // the ring chases the dot — a playhead catching up to the cut
    const follow = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${ringScale})`;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    // context-aware states
    const onOver = (e) => {
      const t = e.target;
      // inside the video popup, native cursor takes over (player controls need it)
      root.classList.toggle("cursor-native", !!t.closest(".vmodal"));
      if (t.closest(".thumb")) {
        ring.className = "is-play";
        glyph.textContent = "▶";
        dot.classList.add("is-hidden");
      } else if (t.closest(".tst")) {
        ring.className = "is-play";
        glyph.textContent = "❚❚"; // carousel eases off so the note can be read
        dot.classList.add("is-hidden");
      } else if (t.closest(".btn, .avail, .theme-btn")) {
        ring.className = "is-play";
        glyph.textContent = "→";
        dot.classList.add("is-hidden");
      } else if (t.closest("a, button")) {
        ring.className = "is-link";
        dot.classList.remove("is-hidden");
      } else {
        ring.className = "";
        dot.classList.remove("is-hidden");
      }
    };

    const onDown = () => {
      ringScale = 0.82;
      dot.classList.add("is-down");
    };
    const onUp = () => {
      ringScale = 1;
      dot.classList.remove("is-down");
    };
    const onLeave = () => root.classList.remove("cursor-visible");
    const onEnter = () => root.classList.add("cursor-visible");

    addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    addEventListener("mousedown", onDown);
    addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      root.classList.remove("cursor-on", "cursor-visible", "cursor-native");
    };
  }, []);

  /* ---------- testimonial carousel: infinite drift, slows on hover ---------- */
  const tstViewRef = useRef(null);
  const tstTrackRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return; // falls back to a swipeable row
    const view = tstViewRef.current;
    const track = tstTrackRef.current;
    if (!view || !track) return;

    const BASE = 0.6,
      SLOW = 0.08; // px per frame
    let offset = 0,
      speed = BASE,
      targetSpeed = BASE,
      period = 0,
      raf;

    // period = exact width of one copy of the list (content is rendered twice)
    const measure = () => {
      const n = track.children.length / 2;
      period = n
        ? track.children[n].offsetLeft - track.children[0].offsetLeft
        : 0;
    };
    measure();

    const slow = () => {
      targetSpeed = SLOW;
    };
    const resume = () => {
      targetSpeed = BASE;
    };

    const step = () => {
      speed += (targetSpeed - speed) * 0.06; // ease between speeds, no jolt
      offset -= speed;
      if (period && -offset >= period) offset += period; // seamless wrap
      track.style.transform = `translate3d(${offset}px,0,0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    view.addEventListener("mouseenter", slow);
    view.addEventListener("mouseleave", resume);
    addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      view.removeEventListener("mouseenter", slow);
      view.removeEventListener("mouseleave", resume);
      removeEventListener("resize", measure);
    };
  }, []);

  /* ---------- smooth inertia scroll + parallax ---------- */
  const heroTitleRef = useRef(null);
  const heroMetaRef = useRef(null);
  const heroSubRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;

    const plxFrames = [...document.querySelectorAll('[data-plx="frame"]')];

    const updateParallax = () => {
      const vh = innerHeight;

      // inner frames drift against scroll — footage moving inside the clip
      for (const el of plxFrames) {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -0.7 … 0.7 while visible
        const shift = Math.max(-10, Math.min(10, p * -13)); // stay within the -12% bleed
        el.style.transform = `translateY(${shift}%)`;
      }

      // hero drifts up and fades as you scroll past it
      const y = window.scrollY;
      if (y < vh * 1.1 && heroTitleRef.current) {
        const f = Math.min(1, y / (vh * 0.85));
        heroTitleRef.current.style.transform = `translateY(${y * 0.22}px)`;
        heroTitleRef.current.style.opacity = String(1 - f * 0.85);
        heroMetaRef.current.style.opacity = String(1 - f);
        heroSubRef.current.style.transform = `translateY(${y * 0.1}px)`;
        heroSubRef.current.style.opacity = String(1 - f);
      }
    };

    // wheel smoothing: lerp toward the target scroll position (mouse/trackpad only;
    // keyboard, touch and scrollbar keep native behaviour and just resync)
    const finePtr = window.matchMedia("(pointer: fine)").matches;
    let target = window.scrollY,
      current = window.scrollY;
    let lerping = false,
      selfScroll = false,
      raf;
    const maxScroll = () => document.documentElement.scrollHeight - innerHeight;
    const clampT = (v) => Math.max(0, Math.min(maxScroll(), v));

    const onWheel = (e) => {
      if (document.body.classList.contains("vmodal-open")) return; // popup owns the wheel
      if (e.ctrlKey) return; // don't hijack pinch-zoom
      e.preventDefault();
      // normalize deltas: 0 = pixels, 1 = lines (Firefox), 2 = pages
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1;
      target = clampT(target + e.deltaY * unit);
      lerping = true;
    };

    const onScroll = () => {
      if (selfScroll) {
        selfScroll = false;
        return;
      }
      if (!lerping) {
        current = target = window.scrollY;
      }
    };

    // anchor links ride the same glide so the feel stays consistent
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      if (finePtr) {
        target = clampT(el.getBoundingClientRect().top + window.scrollY - 64);
        lerping = true;
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const frame = () => {
      if (lerping) {
        current += (target - current) * 0.1;
        if (Math.abs(target - current) < 0.5) {
          current = target;
          lerping = false;
        }
        selfScroll = true;
        window.scrollTo({ top: current, behavior: "instant" });
      }
      updateParallax();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    if (finePtr) addEventListener("wheel", onWheel, { passive: false });
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    updateParallax();

    return () => {
      cancelAnimationFrame(raf);
      if (finePtr) removeEventListener("wheel", onWheel);
      removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const day = theme === "light";

  return (
    <>
      <div id="playhead-track" aria-hidden="true">
        <div id="playhead-fill" ref={fillRef} />
        <div id="playhead-marker" ref={markerRef} />
      </div>

      <div id="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cg" ref={glyphRef}>
          ▶
        </span>
      </div>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />

      <nav>
        <div className="nav-in">
          <a
            className="logo"
            href="#top"
            style={{ display: "inline-flex", gap: "7px", alignItems: "center" }}
          >
            DINUL<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
            <a href="#testimonials">Notes</a>
          </div>
          <div className="nav-right">
            <a className="avail" href="#contact">
              <span className="rec-dot" aria-hidden="true" />
              Open for projects
            </a>
            <button
              className="theme-btn"
              aria-pressed={day}
              aria-label={day ? "Switch to night grade" : "Switch to day grade"}
              onClick={() => setTheme(day ? "dark" : "light")}
            >
              <span className="glyph" aria-hidden="true">
                {day ? "☀" : "☾"}
              </span>
              <span className="txt">{day ? "Day" : "Night"}</span>
            </button>
          </div>
        </div>
      </nav>

      <header id="top" className="wrap">
        <div className="hero-meta" ref={heroMetaRef}>
          <span className="label">Video Editor — All Formats</span>
          <span className="hero-tc">
            TC <b ref={tcRef}>00:00:00:00</b> · 24 FPS
          </span>
        </div>
        <h1 aria-label="Hook. Hold. Payoff." ref={heroTitleRef}>
          <span className="line">
            <span>
              Hook<span className="dot">.</span>
            </span>
          </span>
          <span className="line">
            <span>
              Hold<span className="dot">.</span>
            </span>
          </span>
          <span className="line">
            <span>
              Payoff<span className="dot">.</span>
            </span>
          </span>
        </h1>
        <div className="hero-sub" ref={heroSubRef}>
          <p>
            I'm <strong>Dinul</strong> — a video editor cutting short-form,
            long-form and brand motion. Every edit is built on one job:{" "}
            <strong>keep people watching until the payoff lands.</strong>
          </p>
          <a className="btn" href="#work">
            View the work ↓
          </a>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <section id="work" className="wrap">
        <div className="sec-head reveal">
          <h2>Selected Cuts</h2>
          <span className="label">Shown at native aspect ratio</span>
        </div>

        {/*
          HOW TO ADD YOUR VIDEOS:
          Replace the <div className={`frame ...`}> inside each thumb with either:
            <video src="your-clip.mp4" muted loop playsInline
                   style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
          or a YouTube/Vimeo iframe. Keep data-plx="frame" on it to keep the parallax.
        */}
        <div className="work-grid">
          {WORK.map((w) => (
            <article className={`card reveal ${w.span}`} key={w.title}>
              <button
                type="button"
                className={`thumb ${w.ratio}`}
                aria-label={`Play: ${w.title}`}
                onClick={() => w.video && setActiveWork(w)}
              >
                <div className={`frame ${w.frame}`} data-plx="frame">
                  {w.thumb && (
                    <img src={w.thumb} alt="" className="thumb-img" />
                  )}
                </div>
                <span className="tc-corner">{w.tc}</span>
                <span className="play">
                  <div>▶</div>
                </span>
              </button>
              <div className="card-meta">
                <h3>{w.title}</h3>
                <span className="tag">{w.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>What I Cut</h2>
            <span className="label">Three lanes, one standard</span>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <div className="svc reveal" key={s.title}>
                <span className="ratio-chip">{s.chip}</span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="wrap">
        <div className="sec-head reveal">
          <h2>The Cut, Start to Finish</h2>
          <span className="label">Sequence 01 — five clips</span>
        </div>
        <div
          className="timeline reveal"
          role="list"
          aria-label="Editing process, five steps"
        >
          <div className="tl-ruler" aria-hidden="true">
            <span>00:00</span>
            <span>00:12</span>
            <span>00:24</span>
            <span>00:36</span>
            <span>00:48</span>
          </div>
          <div className="tl-track">
            {PROCESS.map((step) => (
              <div className="clip" role="listitem" key={step.n}>
                <span className="n">{step.n}</span>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          <div className="tl-label" aria-hidden="true">
            V1 · A1 · A2 — DINUL_MASTER.prproj
          </div>
        </div>
      </section>

      <section id="about" className="wrap">
        <div className="about-grid">
          <div className="portrait reveal">
            <div className="frame f-port" data-plx="frame">
              <img src={myimage} alt="Dinul" className="portrait-img" />
            </div>
          </div>
          <div className="about-copy reveal">
            <span className="label about-label">About</span>
            <p>
              Good edits aren't decoration — they're{" "}
              <strong>storytelling under a clock.</strong> I study why people
              keep watching: the hook that stops the scroll, the open loops that
              hold them, the payoff that makes them share.
            </p>
            <p>
              I bring that lens to everything from a 30-second reel to a
              20-minute documentary, working across{" "}
              <strong>Premiere Pro, After Effects and DaVinci Resolve.</strong>
            </p>
            <div className="about-stats">
              <div className="stat">
                <b>3</b>
                <span>Formats mastered</span>
              </div>
              <div className="stat">
                <b>48h</b>
                <span>Avg. first cut</span>
              </div>
              <div className="stat">
                <b>∞</b>
                <span>Attention to detail</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="wrap">
        <div className="sec-head reveal">
          <h2>Client Notes</h2>
          <span className="label">Every revision approved</span>
        </div>
        <div className="tst-carousel reveal" ref={tstViewRef}>
          <div className="tst-track" ref={tstTrackRef}>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure
                className="tst"
                key={i}
                aria-hidden={i >= TESTIMONIALS.length || undefined}
              >
                <div className="tst-top">
                  <span className="tst-tc">▶ {t.tc}</span>
                  <span className="tst-ok">✓ Approved</span>
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="wrap reveal">
          <span className="label">One spot opening this month</span>
          <h2>
            Let's cut
            <br />
            something<span className="dot">.</span>
          </h2>
          <p>
            Tell me what you're making and where it needs to live. I'll reply
            within 24 hours with ideas, timeline and a quote.
          </p>
          <div className="cta-row">
            <a className="btn" href="mailto:hello@dinul.com">
              hello@dinul.com
            </a>
            <a className="btn ghost" href="#" aria-label="Book a call">
              Book a call ↗
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} Dinul — Video Editor</span>
          <span className="foot-links">
            <a href="https://www.instagram.com/dinul.visuals/">Instagram</a>
            <a href="https://www.youtube.com/@dinulvisuals">YouTube</a>
            <a href="https://x.com/DinulP39785">X / Twitter</a>
          </span>
          <span ref={footTcRef}>REC · 00:00:00:00</span>
        </div>
      </footer>

      {activeWork && (
        <div
          className="vmodal"
          role="dialog"
          aria-modal="true"
          aria-label={activeWork.title}
          onClick={(e) => e.target === e.currentTarget && setActiveWork(null)}
        >
          <div className="vmodal-inner">
            <div className={`vmodal-box ${activeWork.ratio}`}>
              <button
                ref={closeBtnRef}
                type="button"
                className="vmodal-close"
                aria-label="Close video"
                onClick={() => setActiveWork(null)}
              >
                ✕
              </button>
              {toEmbed(activeWork.video) ? (
                <iframe
                  src={toEmbed(activeWork.video)}
                  title={activeWork.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={activeWork.video} controls autoPlay playsInline />
              )}
            </div>
            <div className="vmodal-meta">
              <span>{activeWork.title}</span>
              <span className="tag">{activeWork.tag}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
