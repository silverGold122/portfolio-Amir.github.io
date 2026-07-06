// Mobile & device detection (раньше всего — для оптимизаций)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
const mobileMq = window.matchMedia('(max-width: 768px)');
const coarseMq = window.matchMedia('(pointer: coarse)');

function isMobileDevice() {
  return mobileMq.matches || coarseMq.matches || !hasFinePointer;
}

function applyDeviceMode() {
  const mobile = isMobileDevice();
  document.documentElement.classList.toggle('is-mobile', mobile);
  document.documentElement.classList.toggle('is-touch', mobile || !hasFinePointer);
}

applyDeviceMode();
function onMediaChange(fn) {
  if (typeof fn !== 'function') return;
  if (mobileMq.addEventListener) mobileMq.addEventListener('change', fn);
  else if (mobileMq.addListener) mobileMq.addListener(fn);
  if (coarseMq.addEventListener) coarseMq.addEventListener('change', fn);
  else if (coarseMq.addListener) coarseMq.addListener(fn);
}
onMediaChange(applyDeviceMode);

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navBackdrop = document.getElementById('navBackdrop');

function setMenuOpen(isOpen) {
  nav.classList.toggle('open', isOpen);
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
  if (navBackdrop) {
    navBackdrop.hidden = !isOpen;
    navBackdrop.classList.toggle('is-visible', isOpen);
    navBackdrop.setAttribute('aria-hidden', String(!isOpen));
  }
  if (isOpen) {
    const firstLink = nav.querySelector('a');
    firstLink?.focus();
  } else {
    menuBtn.focus();
  }
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const willOpen = !nav.classList.contains('open');
    setMenuOpen(willOpen);
    uiSounds?.click();
  });
}

navBackdrop?.addEventListener('click', () => setMenuOpen(false));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) {
    setMenuOpen(false);
  }
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
    uiSounds?.rustle();
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!header || scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTicking = false;
  });
}, { passive: true });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observerNav = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => observerNav.observe(section));

// ===== Constellation technologies =====
const CONSTELLATIONS = [
  {
    id: 'html',
    label: 'HTML5',
    color: '#e44d26',
    points: [[18, 22], [18, 78], [18, 50], [50, 50], [82, 22], [82, 78]],
    sequence: [0, 1, 2, 3, 4, 5],
    skill: {
      title: 'Фундамент каждого сайта',
      text: 'Строю семантическую и доступную разметку — чтобы сайт был понятен и людям, и поисковикам. Правильная структура HTML — основа любого сильного проекта.',
    },
  },
  {
    id: 'css',
    label: 'CSS3',
    color: '#264de4',
    points: [[72, 22], [28, 22], [18, 50], [28, 78], [72, 78], [82, 50]],
    sequence: [0, 1, 2, 3, 4, 5],
    skill: {
      title: 'Дизайн, который оживает',
      text: 'Делаю адаптивные интерфейсы, плавные анимации и продуманные сетки. CSS превращает макет в живой, удобный сайт на любом экране.',
    },
  },
  {
    id: 'js',
    label: 'JavaScript',
    color: '#f7df1e',
    points: [[28, 22], [28, 78], [42, 78], [55, 48], [68, 78], [68, 22]],
    sequence: [0, 1, 2, 3, 4, 5],
    skill: {
      title: 'Интерактив и логика',
      text: 'Пишу чистый JavaScript для динамики, форм и пользовательского опыта. Делаю хорошие сайты на JavaScript — которые не просто красиво выглядят, а по-настоящему работают.',
    },
  },
  {
    id: 'react',
    label: 'React',
    color: '#61dafb',
    points: [[50, 50], [50, 16], [20, 68], [80, 68]],
    sequence: [0, 1, 0, 2, 0, 3],
    skill: {
      title: 'Современные интерфейсы',
      text: 'Собираю быстрые компонентные приложения на React: переиспользуемые блоки, удобная логика и масштабируемая архитектура.',
    },
  },
  {
    id: 'git',
    label: 'Git',
    color: '#f05032',
    points: [[50, 18], [28, 50], [50, 50], [72, 50], [50, 82]],
    sequence: [0, 1, 2, 3, 4],
    skill: {
      title: 'Контроль версий',
      text: 'Веду проекты в Git: фиксирую изменения, работаю с ветками и держу код в порядке — чтобы разработка была предсказуемой и безопасной.',
    },
  },
  {
    id: 'figma',
    label: 'Figma',
    color: '#a259ff',
    points: [[22, 22], [22, 78], [22, 50], [50, 50], [78, 22], [78, 50], [78, 78]],
    sequence: [0, 1, 2, 3, 4, 5, 6],
    skill: {
      title: 'Дизайн до пикселя',
      text: 'Проектирую интерфейсы в Figma: wireframes, UI-kit и прототипы. Сначала продумываю UX — потом переношу идеи в код.',
    },
  },
];

const svgNS = 'http://www.w3.org/2000/svg';

function drawConstellationLine(linesG, from, to) {
  const line = document.createElementNS(svgNS, 'line');
  line.setAttribute('x1', from[0]);
  line.setAttribute('y1', from[1]);
  line.setAttribute('x2', to[0]);
  line.setAttribute('y2', to[1]);
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  line.style.strokeDasharray = len;
  line.style.strokeDashoffset = len;
  linesG.appendChild(line);
  requestAnimationFrame(() => {
    line.style.strokeDashoffset = '0';
  });
}

function resetConstellationCard(card, data) {
  card.classList.remove('is-complete');
  card.querySelectorAll('.constellation-star').forEach(star => {
    star.classList.remove('is-done', 'is-next', 'is-wrong');
    if (parseInt(star.dataset.index, 10) === data.sequence[0]) {
      star.classList.add('is-next');
    }
  });
  card.querySelector('.constellation-lines').innerHTML = '';
  const progress = card.querySelector('.constellation-progress');
  if (progress) progress.textContent = `0/${data.sequence.length}`;
  card._constState.step = 0;
}

function handleConstellationClick(card, data, state, starEl) {
  if (card.classList.contains('is-complete')) return;

  const clickedIdx = parseInt(starEl.dataset.index, 10);
  const expectedIdx = data.sequence[state.step];

  if (clickedIdx !== expectedIdx) {
    starEl.classList.add('is-wrong');
    setTimeout(() => starEl.classList.remove('is-wrong'), 350);
    uiSounds.wrong();
    return;
  }

  starEl.classList.remove('is-next');
  starEl.classList.add('is-done');
  uiSounds.connect();

  if (state.step > 0) {
    const prevIdx = data.sequence[state.step - 1];
    drawConstellationLine(state.linesG, data.points[prevIdx], data.points[expectedIdx]);
  }

  state.step += 1;
  state.progress.textContent = `${state.step}/${data.sequence.length}`;

  if (state.step >= data.sequence.length) {
    card.classList.add('is-complete');
    uiSounds.complete();
    setTimeout(() => showSkillPlanet(data), 450);
    return;
  }

  const nextIdx = data.sequence[state.step];
  const nextStar = state.starsG.querySelector(`[data-index="${nextIdx}"]`);
  if (nextStar) nextStar.classList.add('is-next');
}

function initConstellations() {
  const grid = document.getElementById('constellationGrid');
  if (!grid) return;

  const lite = isMobileDevice();

  CONSTELLATIONS.forEach(data => {
    const card = document.createElement('article');
    card.className = 'constellation-card reveal';
    card.style.setProperty('--const-color', data.color);

    const progress = document.createElement('span');
    progress.className = 'constellation-progress';
    progress.textContent = `0/${data.sequence.length}`;

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.classList.add('constellation-svg');
    svg.setAttribute('aria-label', `Созвездие ${data.label}`);

    const linesG = document.createElementNS(svgNS, 'g');
    linesG.classList.add('constellation-lines');

    const starsG = document.createElementNS(svgNS, 'g');
    starsG.classList.add('constellation-stars');

    data.points.forEach((pt, i) => {
      const star = document.createElementNS(svgNS, 'circle');
      star.setAttribute('cx', pt[0]);
      star.setAttribute('cy', pt[1]);
      star.setAttribute('r', lite ? '6' : '3.5');
      star.classList.add('constellation-star');
      star.dataset.index = String(i);
      star.setAttribute('role', 'button');
      star.setAttribute('tabindex', '0');
      star.setAttribute('aria-label', `Звезда ${i + 1} созвездия ${data.label}`);
      if (lite) {
        star.setAttribute('stroke', 'transparent');
        star.setAttribute('stroke-width', '20');
      }
      if (i === data.sequence[0]) star.classList.add('is-next');
      starsG.appendChild(star);
    });

    svg.appendChild(linesG);
    svg.appendChild(starsG);

    const label = document.createElement('div');
    label.className = 'constellation-label';
    label.textContent = data.label;

    card.append(progress, svg, label);
    grid.appendChild(card);

    const state = { step: 0, linesG, starsG, progress };
    card._constState = state;

    starsG.querySelectorAll('.constellation-star').forEach(star => {
      const activate = () => handleConstellationClick(card, data, state, star);
      star.addEventListener('click', activate);
      star.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  });

  const resetBtn = document.getElementById('constellationReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      uiSounds.rustle();
      grid.querySelectorAll('.constellation-card').forEach((card, i) => {
        resetConstellationCard(card, CONSTELLATIONS[i]);
      });
    });
  }
}

initConstellations();

// ===== Skill planet reveal =====
const skillPlanetOverlay = document.getElementById('skillPlanetOverlay');
const skillPlanetEl = document.getElementById('skillPlanet');
const skillPlanetClose = document.getElementById('skillPlanetClose');
const skillPlanetTag = document.getElementById('skillPlanetTag');
const skillPlanetTitle = document.getElementById('skillPlanetTitle');
const skillPlanetText = document.getElementById('skillPlanetText');

function showSkillPlanet(data) {
  if (!skillPlanetOverlay || !data.skill) return;

  skillPlanetEl.style.setProperty('--planet-color', data.color);
  skillPlanetTag.textContent = data.label;
  skillPlanetTitle.textContent = data.skill.title;
  skillPlanetText.textContent = data.skill.text;

  skillPlanetOverlay.hidden = false;
  skillPlanetEl.classList.remove('is-arriving');

  requestAnimationFrame(() => {
    skillPlanetOverlay.classList.add('is-visible');
    if (!prefersReducedMotion) {
      skillPlanetEl.classList.add('is-arriving');
    }
  });

  document.body.classList.add('skill-planet-open');
  skillPlanetClose?.focus();
}

function closeSkillPlanet() {
  if (!skillPlanetOverlay) return;

  skillPlanetOverlay.classList.remove('is-visible');
  skillPlanetEl.classList.remove('is-arriving');
  document.body.classList.remove('skill-planet-open');

  window.setTimeout(() => {
    skillPlanetOverlay.hidden = true;
  }, 500);
}

skillPlanetClose?.addEventListener('click', () => {
  uiSounds.click();
  closeSkillPlanet();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && skillPlanetOverlay?.classList.contains('is-visible')) {
    closeSkillPlanet();
  }
});

// ===== Rocket launch on project open =====
const rocketStage = document.getElementById('rocketStage');
const rocketTrail = document.getElementById('rocketTrail');
let rocketBusy = false;

function launchRocket(fromRect, onDone) {
  if (!rocketStage || rocketBusy) {
    onDone();
    return;
  }

  rocketBusy = true;
  const ship = rocketStage.querySelector('.rocket-ship');
  rocketStage.hidden = false;
  rocketStage.classList.add('is-active');
  uiSounds.launch();

  const startX = fromRect.left + fromRect.width / 2;
  const startY = fromRect.top + fromRect.height * 0.35;
  const endX = startX + (Math.random() - 0.5) * 80;
  const endY = -100;
  const lite = isMobileDevice();
  const duration = lite ? 850 : 1050;
  const t0 = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(now) {
    const t = Math.min(1, (now - t0) / duration);
    const e = easeOutCubic(t);
    const x = startX + (endX - startX) * e;
    const y = startY + (endY - startY) * e - e * e * 140;
    const rot = -12 + e * 18;

    ship.style.left = `${x}px`;
    ship.style.top = `${y}px`;
    ship.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;

    if (t > 0.05 && Math.random() > (lite ? 0.6 : 0.25) && rocketTrail) {
      const p = document.createElement('div');
      p.className = 'rocket-trail-particle';
      p.style.left = `${x + (Math.random() - 0.5) * 12}px`;
      p.style.top = `${y + 24 + Math.random() * 10}px`;
      rocketTrail.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      rocketStage.classList.remove('is-active');
      rocketStage.hidden = true;
      if (rocketTrail) rocketTrail.innerHTML = '';
      rocketBusy = false;
      onDone();
    }
  }

  requestAnimationFrame(frame);
}

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (prefersReducedMotion || rocketBusy) return;

    e.preventDefault();
    uiSounds.click();
    const href = card.getAttribute('href');
    const target = card.getAttribute('target');
    const rect = card.getBoundingClientRect();

    launchRocket(rect, () => {
      if (target === '_blank') window.open(href, '_blank', 'noopener,noreferrer');
      else window.location.href = href;
    });
  });
});

// Reveal on scroll
const revealElements = document.querySelectorAll(
  '.about-grid, .constellation-card, .process-step, .work-card, .contact-wrapper, .section-header, .section-subtitle'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: isMobileDevice() ? '0px 0px -24px 0px' : '0px 0px -40px 0px' }
);

if (prefersReducedMotion) {
  revealElements.forEach(el => el.classList.add('visible'));
} else {
  revealElements.forEach((el, i) => {
    const group = el.classList.contains('process-step')
      ? i % 5
      : el.classList.contains('constellation-card')
        ? i % 3
        : i % 4;
    el.style.transitionDelay = `${group * 0.08}s`;
    revealObserver.observe(el);
  });
}

const SOUND_KEY = 'portfolio-sounds';

// UI Sounds (Web Audio — без внешних файлов)
const uiSounds = {
  ctx: null,
  enabled: localStorage.getItem(SOUND_KEY) !== 'off',

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  tone(freq, duration, type = 'sine', volume = 0.04, freqEnd = null) {
    if (!this.enabled || prefersReducedMotion) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  },

  click() { this.tone(520, 0.06, 'sine', 0.035); },
  hover() { this.tone(380, 0.04, 'triangle', 0.018); },
  connect() { this.tone(660, 0.12, 'sine', 0.04, 880); },
  wrong() { this.tone(180, 0.15, 'square', 0.025, 120); },
  complete() {
    this.tone(523, 0.1, 'sine', 0.035);
    setTimeout(() => this.tone(659, 0.1, 'sine', 0.035), 80);
    setTimeout(() => this.tone(784, 0.18, 'sine', 0.04), 160);
  },
  launch() {
    this.tone(120, 0.5, 'sawtooth', 0.03, 680);
    setTimeout(() => this.tone(90, 0.35, 'triangle', 0.025, 40), 200);
  },
  rustle() { this.tone(240, 0.08, 'triangle', 0.015, 180); },
};

document.addEventListener('click', () => uiSounds.init(), { once: true });

const soundToggle = document.getElementById('soundToggle');

function setSoundEnabled(enabled) {
  uiSounds.enabled = enabled;
  localStorage.setItem(SOUND_KEY, enabled ? 'on' : 'off');
  if (soundToggle) {
    soundToggle.setAttribute('aria-pressed', String(enabled));
    soundToggle.title = enabled ? 'Выключить звуки интерфейса' : 'Включить звуки интерфейса';
    const icon = soundToggle.querySelector('.sound-toggle-icon');
    if (icon) icon.textContent = enabled ? '🔊' : '🔇';
  }
}

if (soundToggle) {
  setSoundEnabled(uiSounds.enabled);
  soundToggle.addEventListener('click', () => {
    setSoundEnabled(!uiSounds.enabled);
    if (uiSounds.enabled) uiSounds.click();
  });
}

document.querySelectorAll('.btn, .contact-card, .constellation-reset').forEach(el => {
  el.addEventListener('click', () => uiSounds.click());
});

// Hero parallax (desktop)
const hero = document.querySelector('.hero');
const parallaxLayers = document.querySelectorAll('[data-parallax]');

if (hero && hasFinePointer && !prefersReducedMotion) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    targetX = (e.clientX - rect.left) / rect.width - 0.5;
    targetY = (e.clientY - rect.top) / rect.height - 0.5;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animateParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallax) || 0.5;
      const moveX = currentX * speed * 50;
      const moveY = currentY * speed * 40;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    requestAnimationFrame(animateParallax);
  }

  animateParallax();
}

// Mouse light + cursor glow
const cursorGlow = document.querySelector('.cursor-glow');
const mouseLight = document.getElementById('mouseLight');

if (hasFinePointer && !prefersReducedMotion) {
  let glowX = 0;
  let glowY = 0;
  let glowTargetX = window.innerWidth / 2;
  let glowTargetY = window.innerHeight / 2;

  document.addEventListener('mousemove', e => {
    glowTargetX = e.clientX;
    glowTargetY = e.clientY;
    document.body.classList.add('is-mouse-active');
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('is-mouse-active');
  });

  function animateGlow() {
    glowX += (glowTargetX - glowX) * 0.12;
    glowY += (glowTargetY - glowY) * 0.12;
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

// Work video previews — загрузка при появлении в viewport
document.querySelectorAll('.work-video-wrap').forEach(wrap => {
  const video = wrap.querySelector('.work-video');
  if (!video) return;

  let loading = false;

  const showVideo = () => {
    wrap.classList.add('has-video');
    video.play().catch(() => wrap.classList.remove('has-video'));
  };

  const saveData = navigator.connection?.saveData;
  const skipVideoAutoload = prefersReducedData || saveData;

  const startLoad = () => {
    if (loading || skipVideoAutoload) return;
    loading = true;
    video.preload = 'auto';
    video.load();
  };

  video.addEventListener('loadeddata', showVideo, { once: true });
  video.addEventListener('error', () => {
    loading = false;
    wrap.classList.remove('has-video');
  });

  const videoObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startLoad();
        } else if (isMobileDevice() && !entry.isIntersecting) {
          video.pause();
        }
      });
    },
    { rootMargin: '80px', threshold: 0.12 }
  );

  videoObserver.observe(wrap);

  if (video.readyState >= 2) {
    showVideo();
  }
});

// Cosmos — random background каждый перезагруз
const cosmosLayer = document.getElementById('cosmosLayer');
const LIGHT_THEME_KEY = 'portfolio-light-theme';

const CODE_LINES = [
  'const app = () => {}',
  'import React from',
  '<div className=',
  'npm run dev',
  'git push origin',
  'async function',
  'return null;',
  '{ children }',
  'export default',
  'padding: 1rem',
  '@media (max',
  'fetch(url)',
  'useState(0)',
  '=> render()',
  'console.log(',
  'type Props =',
];

const PLANET_GRADIENTS = [
  'radial-gradient(circle at 35% 30%, rgba(108,92,231,0.9), rgba(45,27,105,0.6))',
  'radial-gradient(circle at 35% 30%, rgba(0,206,201,0.85), rgba(14,74,74,0.5))',
  'radial-gradient(circle at 35% 30%, rgba(255,107,107,0.7), rgba(74,21,32,0.45))',
  'radial-gradient(circle at 35% 30%, rgba(255,217,61,0.65), rgba(92,74,16,0.4))',
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function initCosmos() {
  if (!cosmosLayer) return;

  if (localStorage.getItem(LIGHT_THEME_KEY) === 'on') {
    cosmosLayer.hidden = true;
    return;
  }

  cosmosLayer.hidden = false;
  cosmosLayer.innerHTML = '';

  const lite = isMobileDevice();

  function randPos(margin = 8) {
    return rand(margin, 100 - margin);
  }

  function randPosAvoidCenter(margin = 8) {
    let x;
    let y;
    let attempts = 0;
    do {
      x = randPos(margin);
      y = randPos(margin);
      attempts += 1;
    } while (
      attempts < 12
      && x > 32 && x < 68
      && y > 28 && y < 62
    );
    return { x, y };
  }

  const starCount = Math.floor(rand(lite ? 20 : 48, lite ? 32 : 72));
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'cosmos-star';
    const size = rand(1, 3);
    star.style.left = `${rand(1, 99)}%`;
    star.style.top = `${rand(1, 99)}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty('--dur', `${rand(2.5, 6)}s`);
    star.style.setProperty('--delay', `${rand(0, 6)}s`);
    star.style.setProperty('--o1', String(rand(0.12, 0.28)));
    star.style.setProperty('--o2', String(rand(0.35, 0.65)));
    cosmosLayer.appendChild(star);
  }

  const novaCount = Math.floor(rand(lite ? 2 : 4, lite ? 3 : 7));
  for (let i = 0; i < novaCount; i++) {
    const nova = document.createElement('div');
    nova.className = 'cosmos-supernova';
    const size = rand(55, 100);
    nova.style.left = `${rand(6, 94)}%`;
    nova.style.top = `${rand(6, 94)}%`;
    nova.style.setProperty('--size', `${size}px`);
    nova.style.setProperty('--dur', `${rand(4, 9)}s`);
    nova.style.setProperty('--delay', `${rand(0, 7)}s`);
    nova.innerHTML = '<div class="cosmos-supernova-ring"></div><div class="cosmos-supernova-core"></div>';
    cosmosLayer.appendChild(nova);
  }

  const planetCount = Math.floor(rand(lite ? 3 : 5, lite ? 4 : 8));
  for (let i = 0; i < planetCount; i++) {
    const planet = document.createElement('div');
    planet.className = 'cosmos-planet';
    const size = rand(lite ? 28 : 32, lite ? 60 : 95);
    planet.style.left = `${randPos()}%`;
    planet.style.top = `${randPos()}%`;
    planet.style.width = `${size}px`;
    planet.style.height = `${size}px`;
    planet.style.background = pick(PLANET_GRADIENTS);
    planet.style.setProperty('--blur', `${rand(lite ? 3 : 4, lite ? 6 : 10)}px`);
    planet.style.setProperty('--opacity', String(rand(0.22, 0.42)));
    planet.style.setProperty('--dur', `${rand(18, 36)}s`);
    planet.style.setProperty('--delay', `${rand(0, 10)}s`);
    planet.style.setProperty('--dx', `${rand(-20, 20)}px`);
    planet.style.setProperty('--dy', `${rand(-16, 16)}px`);
    cosmosLayer.appendChild(planet);
  }

  function addBlackHole() {
    const bhPos = randPosAvoidCenter();
    const bhX = bhPos.x;
    const bhY = bhPos.y;
    const bhSize = rand(70, 130);
    const bh = document.createElement('div');
    bh.className = 'cosmos-blackhole';
    bh.style.left = `${bhX}%`;
    bh.style.top = `${bhY}%`;
    bh.style.setProperty('--size', `${bhSize}px`);
    bh.innerHTML = `
      <div class="cosmos-blackhole-glow"></div>
      <div class="cosmos-blackhole-ring"></div>
      <div class="cosmos-blackhole-core"></div>
    `;
    cosmosLayer.appendChild(bh);

    const suckCount = Math.floor(rand(lite ? 4 : 8, lite ? 6 : 13));
    for (let i = 0; i < suckCount; i++) {
      const code = document.createElement('span');
      code.className = 'cosmos-code cosmos-code--suck';
      code.textContent = pick(CODE_LINES);
      const angle = rand(0, Math.PI * 2);
      const dist = rand(35, 100);
      code.style.left = `${bhX}%`;
      code.style.top = `${bhY}%`;
      code.style.setProperty('--sx', `${Math.cos(angle) * dist}px`);
      code.style.setProperty('--sy', `${Math.sin(angle) * dist}px`);
      code.style.setProperty('--dur', `${rand(2, 5)}s`);
      code.style.setProperty('--delay', `${rand(0, 5)}s`);
      code.style.setProperty('--fs', `${rand(0.42, 0.6)}rem`);
      cosmosLayer.appendChild(code);
    }
  }

  addBlackHole();
  if (!lite && Math.random() > 0.25) addBlackHole();

  function addComet(delayExtra = 0) {
    const comet = document.createElement('div');
    comet.className = 'cosmos-comet';
    const head = document.createElement('div');
    head.className = 'cosmos-comet-head';
    const tail = document.createElement('div');
    tail.className = 'cosmos-comet-tail';
    const lineCount = Math.floor(rand(4, 7));
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('span');
      line.textContent = pick(CODE_LINES);
      tail.appendChild(line);
    }
    comet.appendChild(head);
    comet.appendChild(tail);
    comet.style.setProperty('--startY', `${rand(8, 72)}vh`);
    comet.style.setProperty('--endY', `${rand(18, 82)}vh`);
    comet.style.setProperty('--angle', `${rand(-16, -6)}deg`);
    comet.style.setProperty('--dur', `${rand(16, 26)}s`);
    comet.style.setProperty('--delay', `${rand(0, 8) + delayExtra}s`);
    cosmosLayer.appendChild(comet);
  }

  addComet();
  if (!lite) {
    addComet(rand(4, 10));
    if (Math.random() > 0.2) addComet(rand(8, 16));
  }

  if (!prefersReducedMotion && !lite) {
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        cosmosLayer.style.transform = `translate3d(0, ${window.scrollY * 0.025}px, 0)`;
        scrollTicking = false;
      });
    }, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('is-paused', document.hidden);
  });
}

initCosmos();

// Light theme toggle
const skyToggle = document.getElementById('skyToggle');
const htmlEl = document.documentElement;

let lightThemeEnabled = localStorage.getItem(LIGHT_THEME_KEY) === 'on';

function setLightTheme(enabled) {
  lightThemeEnabled = enabled;
  localStorage.setItem(LIGHT_THEME_KEY, enabled ? 'on' : 'off');
  htmlEl.classList.toggle('light-theme', enabled);
  htmlEl.classList.toggle('is-day', enabled);

  if (cosmosLayer) {
    if (enabled) {
      cosmosLayer.hidden = true;
    } else if (!cosmosLayer.childElementCount) {
      initCosmos();
    } else {
      cosmosLayer.hidden = false;
    }
  }

  if (skyToggle) {
    skyToggle.setAttribute('aria-pressed', String(enabled));
    skyToggle.title = enabled ? 'Выключить светлую тему' : 'Включить светлую тему';
  }

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', enabled ? '#ffffff' : '#0a0a0f');
}

if (skyToggle) {
  setLightTheme(lightThemeEnabled);
  skyToggle.addEventListener('click', () => {
    uiSounds.click();
    setLightTheme(!lightThemeEnabled);
  });
} else {
  setLightTheme(lightThemeEnabled);
}

// WhatsApp — номер собирается только по клику
const waBtn = document.getElementById('wa-btn');

if (waBtn) {
  waBtn.addEventListener('click', () => {
    const p1 = '777';
    const p2 = '605';
    const p3 = '94973';
    const phone = p1 + p2 + p3;
    const text = encodeURIComponent('Привет! Хочу обсудить проект.');
    window.open(
      `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`,
      '_blank',
      'noopener,noreferrer'
    );
  });
}
