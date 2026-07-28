/* ======================================================
   Coding Animations with the Lord — Episode 1
   Psalm 51 · "Lord, Have Mercy"

   Behaviour:
   - Auto-plays through the psalm, dwelling on each verse
     just long enough to read it (word-count based), then
     eases the page to the next.
   - Any manual scroll/touch/key instantly hands control
     back to the reader — the animation never fights you.
   - Tapping a verse "pins" its highlight. Tapping the
     transport controls lets you pause/resume or restart
     (restart also releases a small burst of doves).
   ====================================================== */

(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;

    const verses = Array.from(document.querySelectorAll('.verse'));
    const progressBar = document.getElementById('progressBar');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');

    const TRANSITION_MS = 650;
    const MIN_DWELL = 1800;
    const MAX_DWELL = 4200;
    const WORDS_PER_SECOND = 5.2;

    let currentIndex = 0;
    let playing = false;
    let cancelled = false;

    /* ---------- Pacing: enough time to read, not a second more ---------- */
    function dwellFor(verseEl) {
        const words = verseEl.querySelector('.verse-text').textContent.trim().split(/\s+/).length;
        const ms = (words / WORDS_PER_SECOND) * 1000 + 500;
        return Math.min(MAX_DWELL, Math.max(MIN_DWELL, ms));
    }

    function maxScroll() {
        return document.documentElement.scrollHeight - window.innerHeight;
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

    /* ---------- Transport: play / pause / restart ---------- */
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
        burstDoves(8);
        requestAnimationFrame(() => play(0));
    }

    // Any manual scroll/touch/key hands control straight back to the reader.
    ['wheel', 'touchstart', 'keydown'].forEach((evt) =>
        window.addEventListener(evt, () => {
            if (playing) pause();
        }, { passive: true })
    );

    playPauseBtn.addEventListener('click', () => (playing ? pause() : play(currentIndex)));
    restartBtn.addEventListener('click', restart);

    // Tap a verse to pin its highlight, independent of scroll position.
    verses.forEach((verse) => {
        verse.addEventListener('click', () => verse.classList.toggle('pinned'));
    });

    /* ---------- Highlight the verse currently centred in view ---------- */
    function observeVerses() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('highlight',
                    entry.isIntersecting && entry.intersectionRatio > 0.4);
            });
        }, { threshold: [0.35, 0.6], rootMargin: '0px 0px -40% 0px' });
        verses.forEach((v) => observer.observe(v));
    }

    /* ---------- Top progress bar ---------- */
    function updateProgress() {
        const ms = maxScroll();
        const pct = ms > 0 ? (window.scrollY / ms) * 100 : 0;
        progressBar.style.width = `${pct}%`;
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { updateProgress(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);

    /* ---------- Falling doves — lighter touch on phones ---------- */
    function createDove() {
        const dove = document.createElement('div');
        dove.className = 'dove';
        const size = Math.random() * 10 + 16;
        dove.style.fontSize = `${size}px`;
        dove.style.left = `${Math.random() * 100}vw`;
        dove.style.top = '-30px';
        dove.style.animationDuration = `${Math.random() * 5 + 6}s`;
        dove.style.opacity = `${Math.random() * 0.4 + 0.5}`;
        dove.textContent = '🕊️';
        document.body.appendChild(dove);
        setTimeout(() => dove.remove(), 12000);
    }

    function burstDoves(count) {
        if (reduceMotion) return;
        for (let i = 0; i < count; i++) setTimeout(createDove, i * 90);
    }

    window.addEventListener('load', () => {
        updateProgress();
        observeVerses();
        updatePlayButton();

        if (!reduceMotion) {
            setInterval(createDove, isSmallScreen ? 380 : 260);
            play(0);
        }
    });
})();
