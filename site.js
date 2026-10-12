// Jijnāsu home: scroll and pointer drive a few CSS variables; no library.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  // statement: split into words, lit as they pass the middle of the screen
  const say = document.querySelector("[data-words]");
  const hot = new Set(["Sanskrit", "know.", "forgotten.", "English", "mantras"]);
  say.innerHTML = say.textContent.trim().split(/\s+/)
    .map(w => `<span class="w${hot.has(w) ? " hot" : ""}">${w}</span>`).join(" ");
  const words = [...say.querySelectorAll(".w")];

  // shelf: the track moves sideways while its section is pinned
  const shelf = document.querySelector(".shelf");
  const track = document.getElementById("track");
  const idx = document.getElementById("idx");
  const wide = () => innerWidth > 820;
  let target = 0, x = 0;

  function onScroll() {
    const y = scrollY, max = document.body.scrollHeight - innerHeight;
    root.style.setProperty("--p", max > 0 ? y / max : 0);
    root.style.setProperty("--sy", y);
    const r = say.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.45)));
    words.forEach((w, i) => w.classList.toggle("on", reduce || i / words.length < t));
    if (wide()) {
      const s = shelf.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, -s.top / (s.height - innerHeight)));
      target = -k * (track.scrollWidth - innerWidth);
      idx.textContent = String(Math.min(6, 1 + Math.round(k * 5))).padStart(2, "0");
    }
  }
  function frame() {              // ease the track toward its target: the fluid part
    x += (target - x) * (reduce ? 1 : 0.09);
    if (wide()) track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    requestAnimationFrame(frame);
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll(); frame();

  // pointer: the hero mark drifts, covers tilt
  addEventListener("pointermove", e => {
    root.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
    root.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
  }, { passive: true });
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.addEventListener("pointermove", e => {
      const b = el.getBoundingClientRect();
      el.style.setProperty("--rx", (((e.clientX - b.left) / b.width - 0.5) * 16).toFixed(1));
      el.style.setProperty("--ry", (((e.clientY - b.top) / b.height - 0.5) * -12).toFixed(1));
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", 0); el.style.setProperty("--ry", 0); });
  });

  // reveal on entry
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.2 });
  document.querySelectorAll(".io").forEach(el => io.observe(el));
})();
