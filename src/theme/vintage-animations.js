export const initCarriageReturnObserver = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const heading = entry.target;
          heading.classList.add('carriage-return');
          
          setTimeout(() => {
            heading.classList.remove('carriage-return');
          }, 400);
          
          observer.unobserve(heading);
        }
      });
    },
    {
      threshold: [0.5],
      rootMargin: '-50px 0px'
    }
  );

  const headings = document.querySelectorAll('.section-heading');
  headings.forEach((heading) => observer.observe(heading));

  return () => {
    headings.forEach((heading) => observer.unobserve(heading));
  };
};

export const initTypewriterEffect = (element, text, duration = 1200) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = text;
    return;
  }

  const chars = text.split('');
  const delay = duration / chars.length;
  let currentIndex = 0;

  element.textContent = '';
  element.classList.add('typewriter-text');

  const interval = setInterval(() => {
    if (currentIndex < chars.length) {
      element.textContent += chars[currentIndex];
      currentIndex++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        element.classList.remove('typewriter-text');
      }, 750);
    }
  }, delay);

  return () => clearInterval(interval);
};

export const initPaperFeedScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const scrollElements = document.querySelectorAll('.paper-feed-scroll');
  
  const handleScroll = () => {
    const scrolled = window.scrollY;
    scrollElements.forEach((el) => {
      el.style.backgroundPositionY = `${scrolled * 0.1}px`;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
