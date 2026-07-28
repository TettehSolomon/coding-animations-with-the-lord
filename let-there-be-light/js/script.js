/* ======================================================
   Coding Animations with the Lord — Episode 2
   Genesis 1 · "Let There Be Light"

   Behaviour:
   - The sky, stars and sun are driven purely by scroll
     progress (0 → 1), so they react whether the reader
     scrolls by hand or the auto-player is running.
   - The auto-player dwells on each verse just long enough
     to read it, then eases to the next — and yields
     instantly the moment a reader scrolls, taps, or types.
   - As each created thing appears in the text, a small
     "creation badge" pops onto its verse card, and the
     matching day lights up in the bottom dock. Tapping a
     dock day jumps straight to it.
   ====================================================== */

(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;

    /* ---------- The sky's colours, spoken over the seven days ---------- */
    const SKY_STOPS = [
        { p: 0.00, top: [2, 3, 10],       bottom: [5, 7, 15] },       // without form, and void
        { p: 0.12, top: [12, 20, 54],     bottom: [30, 38, 92] },     // let there be light
        { p: 0.26, top: [20, 46, 96],     bottom: [58, 92, 150] },    // firmament
        { p: 0.40, top: [24, 92, 132],    bottom: [70, 190, 172] },   // dry land, seas & green things
        { p: 0.55, top: [64, 128, 182],   bottom: [200, 224, 196] },  // sun, moon & stars
        { p: 0.72, top: [70, 190, 206],   bottom: [214, 240, 222] },  // sea & sky creatures
        { p: 0.88, top: [156, 210, 170],  bottom: [244, 232, 178] },  // very good — teeming earth
        { p: 1.00, top: [255, 216, 152],  bottom: [255, 242, 218] }   // the seventh day — rest
    ];

    const lerp = (a, b, t) => a + (b - a) * t;
    const rgb = (c) => `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;

    function skyAt(progress) {
        for (let i = 0; i < SKY_STOPS.length - 1; i++) {
            const a = SKY_STOPS[i], b = SKY_STOPS[i + 1];
            if (progress <= b.p) {
                const t = (progress - a.p) / (b.p - a.p);
                return {
                    top: a.top.map((v, k) => lerp(v, b.top[k], t)),
                    bottom: a.bottom.map((v, k) => lerp(v, b.bottom[k], t))
                };
            }
        }
        const last = SKY_STOPS[SKY_STOPS.length - 1];
        return { top: last.top, bottom: last.bottom };
    }

    const skyEl = document.querySelector('.sky');
    const starsEl = document.getElementById('stars');
    const sunEl = document.getElementById('sun');
    const progressBar = document.getElementById('progressBar');
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function maxScroll() {
        return document.documentElement.scrollHeight - window.innerHeight;
    }

    function render() {
        const ms = maxScroll();
        const progress = ms > 0 ? Math.min(window.scrollY / ms, 1) : 0;

        const sky = skyAt(progress);
        skyEl.style.setProperty('--sky-top', rgb(sky.top));
        skyEl.style.setProperty('--sky-bottom', rgb(sky.bottom));
        if (themeColorMeta) themeColorMeta.setAttribute('content', rgb(sky.top));

        // Stars appear on Day Four (~0.42) and remain through the rest of the sky.
        const starOpacity = progress < 0.42 ? 0 : Math.min((progress - 0.42) / 0.13, 1) * 0.9;
        starsEl.style.opacity = starOpacity.toFixed(3);

        // The greater light rises to rule the day, then sets toward rest.
        const sunRise = Math.max(0, Math.min((progress - 0.40) / 0.20, 1));
        const sunSet = Math.max(0, Math.min((progress - 0.90) / 0.10, 1));
        sunEl.style.opacity = (sunRise * (1 - sunSet * 0.4)).toFixed(3);
        sunEl.style.transform = `translateY(${(1 - sunRise) * 40 - sunRise * 46}vh)`;

        progressBar.style.width = `${(progress * 100).toFixed(2)}%`;
    }

    /* ---------- He made the stars also ---------- */
    function makeStars() {
        const count = isSmallScreen ? 90 : 150;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'star-dot';
            dot.style.left = `${Math.random() * 100}vw`;
            dot.style.top = `${Math.random() * 100}vh`;
            const scale = Math.random() * 1.6 + 0.5;
            dot.style.width = dot.style.height = `${scale * 2}px`;
            dot.style.animationDelay = `${Math.random() * 3.2}s`;
            dot.style.animationDuration = `${Math.random() * 2.5 + 2.5}s`;
            frag.appendChild(dot);
        }
        starsEl.appendChild(frag);
    }

    /* ---------- Highlight the verse currently centred in view ---------- */
    function observeVerseHighlight() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('highlight',
                    entry.isIntersecting && entry.intersectionRatio > 0.5);
            });
        }, { threshold: [0.4, 0.6], rootMargin: '0px 0px -30% 0px' });
        document.querySelectorAll('.verse').forEach((v) => observer.observe(v));
    }

    // Tap a verse to pin its highlight, independent of scroll position.
    document.querySelectorAll('.verse').forEach((verse) => {
        verse.addEventListener('click', (e) => {
            if (e.target.closest('.creation-badge')) return;
            verse.classList.toggle('pinned');
        });
    });

    /* ---------- Creation badges + the bottom day dock ---------- */
    const dockButtons = Array.from(document.querySelectorAll('.dock-btn'));
    const dawnBurst = document.getElementById('dawnBurst');

    function markDayReached(day) {
        dockButtons.forEach((btn) => {
            const d = Number(btn.dataset.day);
            btn.classList.toggle('reached', d <= day);
            btn.classList.toggle('current', d === day);
        });
    }

    function observeCreationBadges() {
        const badges = document.querySelectorAll('.creation-badge');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('revealed');
                const day = entry.target.dataset.day;
                if (day) markDayReached(Number(day));
                if (entry.target.dataset.effect === 'dawn' && !reduceMotion) {
                    dawnBurst.classList.add('fire');
                }
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.6 });
        badges.forEach((b) => observer.observe(b));
    }

    dockButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            pause();
            const target = document.getElementById(`day-${btn.dataset.day}`);
            if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        });
    });

    /* ---------- Transport: play / pause / restart, stepping verse by verse ---------- */
    const verses = Array.from(document.querySelectorAll('.verse'));
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');

    const TRANSITION_MS = 650;
    const MIN_DWELL = 1900;
    const MAX_DWELL = 4400;
    const WORDS_PER_SECOND = 5.4;

    let currentIndex = 0;
    let playing = false;
    let cancelled = false;

    function dwellFor(verseEl) {
        const words = verseEl.querySelector('.verse-text').textContent.trim().split(/\s+/).length;
        const ms = (words / WORDS_PER_SECOND) * 1000 + 500;
        return Math.min(MAX_DWELL, Math.max(MIN_DWELL, ms));
    }

    function targetScrollFor(el) {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        const target = elTop - (window.innerHeight / 2 - rect.height / 2);
        return Math.min(Math.max(target, 0), maxScroll());
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function scrollToEl(el, duration) {
        return new Promise((resolve) => {
            const startY = window.scrollY;
            const endY = targetScrollFor(el);
            const distance = endY - startY;
            if (Math.abs(distance) < 2) return resolve();
            const start = performance.now();
            function step(now) {
                if (cancelled) return resolve();
                const t = Math.min((now - start) / duration, 1);
                window.scrollTo(0, startY + distance * easeInOutQuad(t));
                if (t < 1) requestAnimationFrame(step);
                else resolve();
            }
            requestAnimationFrame(step);
        });
    }

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function play(fromIndex = currentIndex) {
        cancelled = false;
        playing = true;
        updatePlayButton();
        for (let i = fromIndex; i < verses.length; i++) {
            if (cancelled) return;
            currentIndex = i;
            await scrollToEl(verses[i], TRANSITION_MS);
            if (cancelled) return;
            await wait(dwellFor(verses[i]));
        }
        playing = false;
        updatePlayButton();
    }

    function pause() {
        cancelled = true;
        playing = false;
        updatePlayButton();
    }

    function updatePlayButton() {
        playPauseBtn.textContent = playing ? '⏸' : '▶';
        playPauseBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    }

    function restart() {
        cancelled = true;
        currentIndex = 0;
        window.scrollTo(0, 0);
        requestAnimationFrame(() => play(0));
    }

    ['wheel', 'touchstart', 'keydown'].forEach((evt) =>
        window.addEventListener(evt, () => {
            if (playing) pause();
        }, { passive: true })
    );

    playPauseBtn.addEventListener('click', () => (playing ? pause() : play(currentIndex)));
    restartBtn.addEventListener('click', restart);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { render(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', render);

    window.addEventListener('load', () => {
        makeStars();
        render();
        observeVerseHighlight();
        observeCreationBadges();
        updatePlayButton();

        if (!reduceMotion) play(0);
    });
})();
