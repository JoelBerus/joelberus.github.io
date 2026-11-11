/* La localización de esta web no modifica la de las apps nativas. */
(() => {
  'use strict';
  document.documentElement.classList.replace('no-js', 'js');

  const messages = {
    es: {
      title: 'PocketGame · Proyecto de emulación',
      description: 'PocketGame, un proyecto personal de emulación GB, GBC y GBA. Núcleos C11 e interfaces nativas para iPhone y Android.',
      skip: 'Saltar al contenido', home: 'PocketGame, inicio', navigation: 'Navegación principal',
      navExperience: 'Experiencia', navEngineering: 'Ingeniería', navCompatibility: 'Compatibilidad',
      language: 'Idioma', portfolio: 'Portafolio', automaticLanguage: 'Usar idioma del navegador', openMenu: 'Abrir navegación', closeMenu: 'Cerrar navegación',
      heroOne: 'Emulación.', heroTwo: 'Desde el', heroThree: 'núcleo.',
      heroIntro: 'Un proyecto personal de emulación de Game Boy, Game Boy Color y Game Boy Advance, con núcleos propios e interfaces nativas.',
      explore: 'Explorar el proyecto', architecture: 'Ver arquitectura', projectBy: 'Un proyecto de Joel Bermudez Acosta',
      heroAlt: 'Ilustración conceptual de un teléfono con paisaje pixel art y una cinta lavanda; no es una captura de la app.',
      conceptCaption: 'Visual conceptual · No es una captura de la app',
      systemsOne: 'Tres generaciones.', systemsTwo: 'Dos núcleos propios.',
      experienceOne: 'La partida.', experienceTwo: 'Y lo que la rodea.',
      experienceIntro: 'La emulación es solo una parte. El proyecto también explora cómo organizar la biblioteca, adaptar los controles y conservar el progreso.',
      landscapeAlt: 'Composición conceptual de una pantalla horizontal con paisaje pixel art.',
      visualNote: 'Una dirección visual. No una sesión de juego.',
      experienceCaption: 'Visual conceptual · No es una captura de la app.',
      libraryTitle: 'Biblioteca local', libraryBody: 'Carpetas elegidas en el dispositivo, búsqueda, filtros y favoritos. Los juegos se gestionan como archivos propios.',
      controlsTitle: 'Controles nativos', controlsBody: 'Entrada táctil y mandos físicos, con una interfaz desarrollada para cada plataforma.',
      savesTitle: 'Partidas y momentos', savesBody: 'Guardado atómico, copias de seguridad y estados. El intercambio entre equipos es manual, mediante archivos .pgbm.',
      engineeringOne: 'Lo que hay', engineeringTwo: 'detrás del juego.',
      engineeringIntro: 'Dos núcleos en C11. Dos interfaces nativas. Una separación clara entre emular el hardware y relacionarse con el sistema operativo.',
      architectureLabel: 'Arquitectura del proyecto', coreOwn: 'Núcleos propios',
      separationTitle: 'Responsabilidades separadas', separationBody: 'CPU, memoria, vídeo y audio viven en los núcleos. Las apps conectan entrada, archivos, sonido y renderizado.',
      determinismTitle: 'Un contrato determinista', determinismBody: 'C11 sin E/S, sin estado global mutable y sin reservas de memoria por frame. La sesión controla el ciclo de emulación.',
      filesTitle: 'Archivos, no un servicio', filesBody: 'Las apps no usan red. Compartir una partida utiliza archivos y las herramientas del sistema, sin sincronización automática propia.',
      compatibilityOne: 'Qué implementa.', compatibilityTwo: 'Hasta dónde llega.',
      compatibilityIntro: 'Compatibilidad descrita a partir del código y la configuración de esta copia. Los mínimos de sistema no certifican el funcionamiento de cada juego o dispositivo.',
      minimumConfigured: 'Mínimo configurado', integratedCores: 'Núcleos integrados en el código', nativeImplementation: 'Implementación nativa',
      validationTitle: 'Alcance de la versión móvil',
      validationBody: 'Los mínimos indicados corresponden a la configuración del proyecto. La compatibilidad y el rendimiento dependen del juego y el dispositivo.',
      gbaLimitsTitle: 'Límites de Game Boy Advance', gbaLimitsBody: 'No incluye cable link GBA, sensores, e-Reader ni Wireless Adapter. La emulación de BIOS en alto nivel y algunas aproximaciones de tiempos pueden afectar a determinados juegos.',
      platformLimitsTitle: 'Alcance de las plataformas', platformLimitsBody: 'El target de Apple está configurado para iPhone, no para iPad. El port de TV no forma parte de este repositorio. No se anuncian descargas ni disponibilidad en tiendas.',
      evidenceTitle: 'Sobre las imágenes y las pruebas', evidenceBody: 'Las imágenes marcadas como conceptuales son ilustraciones. Esta revisión verifica la web; no vuelve a ejecutar las pruebas de las apps ni valida dispositivos físicos. No hay una lista de juegos verificados.',
      projectTitle: 'Construir para entender.', projectBody: 'PocketGame es una exploración personal de emulación, desarrollo nativo y trabajo asistido por IA. Este espacio muestra las decisiones, el alcance y los límites del proyecto.',
      backArchitecture: 'Volver a la arquitectura', footerProject: 'Proyecto personal de Joel Bermudez Acosta',
      footerScope: 'Caso de portafolio · Repositorio privado · Sin distribución de juegos', reviewed: 'Revisión',
      trademarks: 'Game Boy, Game Boy Color y Game Boy Advance son marcas de Nintendo. Proyecto independiente, sin afiliación.',
      browserLanguage: 'Idioma del navegador', manualLanguage: 'Idioma elegido', region: 'Formato regional', languageChanged: 'Idioma cambiado a español.'
    },
    en: {
      title: 'PocketGame · An emulation project',
      description: 'PocketGame, a personal GB, GBC and GBA emulation project. C11 cores and native interfaces for iPhone and Android.',
      skip: 'Skip to content', home: 'PocketGame, home', navigation: 'Main navigation',
      navExperience: 'Experience', navEngineering: 'Engineering', navCompatibility: 'Compatibility',
      language: 'Language', portfolio: 'Portfolio', automaticLanguage: 'Use browser language', openMenu: 'Open navigation', closeMenu: 'Close navigation',
      heroOne: 'Emulation.', heroTwo: 'From the', heroThree: 'core.',
      heroIntro: 'A personal Game Boy, Game Boy Color and Game Boy Advance emulation project, with purpose-built cores and native interfaces.',
      explore: 'Explore the project', architecture: 'View architecture', projectBy: 'A project by Joel Bermudez Acosta',
      heroAlt: 'Conceptual illustration of a phone with a pixel-art landscape and a lavender ribbon; not an app screenshot.',
      conceptCaption: 'Concept visual · Not an app screenshot',
      systemsOne: 'Three generations.', systemsTwo: 'Two purpose-built cores.',
      experienceOne: 'The game.', experienceTwo: 'And everything around it.',
      experienceIntro: 'Emulation is only one part. The project also explores how to organize a library, adapt controls and preserve progress.',
      landscapeAlt: 'Conceptual composition of a landscape screen showing pixel art.',
      visualNote: 'A visual direction. Not a gameplay session.',
      experienceCaption: 'Concept visual · Not an app screenshot.',
      libraryTitle: 'Local library', libraryBody: 'Device folders, search, filters and favorites. Games are managed as the user’s own files.',
      controlsTitle: 'Native controls', controlsBody: 'Touch input and physical controllers, with an interface built for each platform.',
      savesTitle: 'Saves and moments', savesBody: 'Atomic saves, backups and save states. Moving progress between devices is a manual process using .pgbm files.',
      engineeringOne: 'What happens', engineeringTwo: 'behind the game.',
      engineeringIntro: 'Two C11 cores. Two native interfaces. A clear boundary between emulating hardware and working with the operating system.',
      architectureLabel: 'Project architecture', coreOwn: 'Purpose-built cores',
      separationTitle: 'Separate responsibilities', separationBody: 'CPU, memory, video and audio live in the cores. The apps connect input, files, sound and rendering.',
      determinismTitle: 'A deterministic contract', determinismBody: 'C11 without I/O, mutable global state or per-frame allocations. The session manages the emulation loop.',
      filesTitle: 'Files, not a service', filesBody: 'The apps do not use networking. Sharing a save relies on files and system tools, without automatic in-app synchronization.',
      compatibilityOne: 'What is implemented.', compatibilityTwo: 'Where it draws the line.',
      compatibilityIntro: 'Compatibility described from this copy’s code and configuration. Minimum system versions do not certify every game or device.',
      minimumConfigured: 'Configured minimum', integratedCores: 'Cores integrated in code', nativeImplementation: 'Native implementation',
      validationTitle: 'Scope of the mobile version',
      validationBody: 'The minimum versions reflect the project configuration. Compatibility and performance depend on the game and device.',
      gbaLimitsTitle: 'Game Boy Advance limitations', gbaLimitsBody: 'GBA link cable, sensors, e-Reader and Wireless Adapter are not included. High-level BIOS emulation and some timing approximations may affect individual games.',
      platformLimitsTitle: 'Platform scope', platformLimitsBody: 'The Apple target is configured for iPhone, not iPad. The TV port is outside this repository. No downloads or app-store availability are announced.',
      evidenceTitle: 'About images and testing', evidenceBody: 'Images marked as conceptual are illustrations. This review checks the website; it does not rerun app tests or validate physical devices. There is no verified game list.',
      projectTitle: 'Building to understand.', projectBody: 'PocketGame is a personal exploration of emulation, native development and AI-assisted work. This space presents the project’s decisions, scope and limitations.',
      backArchitecture: 'Back to the architecture', footerProject: 'A personal project by Joel Bermudez Acosta',
      footerScope: 'Portfolio case · Private repository · No game distribution', reviewed: 'Reviewed',
      trademarks: 'Game Boy, Game Boy Color and Game Boy Advance are Nintendo trademarks. An independent project, with no affiliation.',
      browserLanguage: 'Browser language', manualLanguage: 'Selected language', region: 'Regional format', languageChanged: 'Language changed to English.'
    }
  };

  const storageKey = 'pocketgame.website.language';
  const supported = Object.keys(messages);
  const candidates = [...(navigator.languages || []), navigator.language].filter(Boolean);
  const browserLanguage = candidates.map(value => value.toLowerCase().split('-')[0]).find(value => supported.includes(value)) || 'en';
  let preference = 'auto';
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'auto' || supported.includes(saved)) preference = saved;
  } catch { /* El sitio sigue siendo utilizable sin almacenamiento local. */ }

  const menu = document.querySelector('#main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  let currentLanguage = browserLanguage;

  function setMenu(open, restoreFocus = false) {
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', messages[currentLanguage][open ? 'closeMenu' : 'openMenu']);
    if (restoreFocus) menuToggle.focus();
  }

  function getFormattingLocale(language) {
    for (const candidate of candidates) {
      try {
        const region = new Intl.Locale(candidate).region;
        if (region) return `${language}-${region}`;
      } catch { /* Las preferencias de navegador inválidas no bloquean la página. */ }
    }
    return language;
  }

  function setLanguage(value, announce = false) {
    preference = value;
    currentLanguage = supported.includes(value) ? value : browserLanguage;
    const copy = messages[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      if (copy[element.dataset.i18n] !== undefined) element.textContent = copy[element.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      if (copy[element.dataset.i18nAria] !== undefined) element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === preference));
      button.lang = button.dataset.language === 'auto' ? currentLanguage : button.dataset.language;
    });
    const locale = getFormattingLocale(currentLanguage);
    const date = document.querySelector('#review-date');
    date.textContent = new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}).format(new Date(`${date.dateTime}T12:00:00Z`));
    document.querySelector('#locale-status').textContent = `${preference === 'auto' ? copy.browserLanguage : copy.manualLanguage}: ${currentLanguage.toUpperCase()} · ${copy.region}: ${locale}`;
    setMenu(menuToggle.getAttribute('aria-expanded') === 'true');
    if (announce) document.querySelector('#language-announcement').textContent = copy.languageChanged;
    try { localStorage.setItem(storageKey, preference); } catch { /* La selección actual permanece activa. */ }
  }

  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  const desktop = matchMedia('(min-width: 851px)');
  desktop.addEventListener('change', event => { if (event.matches) setMenu(false); });
  setLanguage(preference);

  // Animaciones finitas y contenido visible incluso si el observador no está disponible.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enter');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .16});
    document.querySelectorAll('.architecture-diagram, .project-close').forEach(element => observer.observe(element));
    reducedMotion.addEventListener('change', event => { if (event.matches) observer.disconnect(); });
  }
})();
