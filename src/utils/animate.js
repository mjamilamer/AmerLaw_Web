/**
 * Enhanced reveal on scroll with performance optimizations
 */
export function revealOnScroll(selector = ".reveal", options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) {
  // Use requestIdleCallback for better performance if available
  const scheduleWork = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  
  scheduleWork(() => {
    const els = document.querySelectorAll(selector);
    if (els.length === 0) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("show");
        obs.unobserve(e.target);
      });
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.rootMargin || '0px 0px -50px 0px'
    });
    
    els.forEach(el => io.observe(el));
  });
}
  