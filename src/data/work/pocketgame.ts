import shotAndroidControls from '../../assets/work/pocketgame/android-controls-dark.webp';
import shotAndroidLibrary from '../../assets/work/pocketgame/android-library-dark.webp';
import shotAndroidLibraryLight from '../../assets/work/pocketgame/android-library-light.webp';
import shotAndroidMoments from '../../assets/work/pocketgame/android-moments-dark.webp';
import icon from '../../assets/work/pocketgame/icon.svg';
import shotIosHome from '../../assets/work/pocketgame/ios-home-dark.webp';
import shotIosLibrary from '../../assets/work/pocketgame/ios-library-dark.webp';
import shotIosMoments from '../../assets/work/pocketgame/ios-moments-dark.webp';
import shotIosSaveTravel from '../../assets/work/pocketgame/ios-save-travel-dark.webp';
import type { WorkCase } from './types';

/**
 * PocketGame case study. Identity taken from the project's own landing:
 * dark #100d1b, lavender #c59af3, text #f8f5ff, light band #e4d2fb, Manrope.
 */
export const pocketgame: WorkCase = {
  slug: 'pocketgame',
  name: 'PocketGame',
  listedIn: 'projects',
  theme: {
    heroBg: '#100d1b',
    heroText: '#f8f5ff',
    heroMuted: '#c4bcd2',
    heroLine: '#51455f',
    heroButtonBg: '#c59af3',
    heroButtonBgHover: '#d7b6ff',
    heroButtonText: '#1b1029',
    accent: '#c59af3',
    accentHover: '#d7b6ff',
    accentInk: '#1b1029',
    mark: '#c59af3',
    cardBg: '#e4d2fb',
    cardText: '#1b1029',
    bandBg: '#e4d2fb',
    bandText: '#1b1029',
    bandMuted: '#3d2c52',
    displayFont: "'Manrope', var(--font-sans)",
    displayWeight: 800,
  },
  logo: { image: icon, width: 48, height: 48, text: 'PocketGame' },

  cardEyebrow: {
    en: 'Personal project · Emulation',
    es: 'Proyecto personal · Emulación',
  },
  cardSummary: {
    en: 'My own Game Boy, Game Boy Color and Game Boy Advance emulator: two cores in pure C11 under native iOS and Android apps.',
    es: 'Mi propio emulador de Game Boy, Game Boy Color y Game Boy Advance: dos núcleos en C11 puro bajo apps nativas para iOS y Android.',
  },
  cardTags: ['C11', 'SwiftUI', 'Metal', 'Kotlin', 'NDK/JNI'],

  metaDescription: {
    en: 'Case study: PocketGame, a personal Game Boy, Game Boy Color and Game Boy Advance emulator with two C11 cores and native iOS and Android apps.',
    es: 'Caso: PocketGame, un emulador personal de Game Boy, Game Boy Color y Game Boy Advance con dos núcleos en C11 y apps nativas para iOS y Android.',
  },
  pitch: {
    en: 'A handheld emulator built from the core up: two C11 cores, two native apps.',
    es: 'Un emulador portátil hecho desde el núcleo: dos núcleos en C11 y dos apps nativas.',
  },
  meta: [
    {
      label: { en: 'Type', es: 'Tipo' },
      value: {
        en: 'Personal engineering project. Not a commercial release, no store listing.',
        es: 'Proyecto personal de ingeniería. No es un lanzamiento comercial ni está en tiendas.',
      },
    },
    {
      label: { en: 'Platforms', es: 'Plataformas' },
      value: {
        en: 'iOS with SwiftUI and Metal. Android with Kotlin and Compose.',
        es: 'iOS con SwiftUI y Metal. Android con Kotlin y Compose.',
      },
    },
    {
      label: { en: 'Source', es: 'Código' },
      value: {
        en: 'Private repository.',
        es: 'Repositorio privado.',
      },
    },
  ],
  links: [
    {
      label: { en: 'View the PocketGame landing', es: 'Ver la landing de PocketGame' },
      href: 'pocketgame/',
      sitePath: true,
    },
  ],
  heroShots: [
    {
      image: shotIosHome,
      kind: 'phone',
      alt: {
        en: 'PocketGame library on iOS, in dark mode.',
        es: 'Biblioteca de PocketGame en iOS, en modo oscuro.',
      },
    },
    {
      image: shotAndroidLibraryLight,
      kind: 'phone',
      alt: {
        en: 'PocketGame library on Android, in light mode.',
        es: 'Biblioteca de PocketGame en Android, en modo claro.',
      },
    },
  ],

  overview: {
    title: {
      en: 'Emulation, from the core to the app',
      es: 'Emulación, del núcleo a la app',
    },
    paragraphs: {
      en: [
        'PocketGame is my own emulator for Game Boy, Game Boy Color and Game Boy Advance games. It is a personal engineering project: there is no commercial release and no store listing.',
        'Two emulation cores written in pure C11 sit under two native apps. The iOS app is SwiftUI and Metal. The Android app is Kotlin and Compose, and reaches the same cores through the NDK and JNI.',
        'The apps make no network calls and no games are bundled or distributed with them. Users bring their own legally dumped cartridges.',
      ],
      es: [
        'PocketGame es mi propio emulador de juegos de Game Boy, Game Boy Color y Game Boy Advance. Es un proyecto personal de ingeniería: no hay lanzamiento comercial ni ficha en tiendas.',
        'Dos núcleos de emulación escritos en C11 puro viven debajo de dos apps nativas. La de iOS está hecha con SwiftUI y Metal. La de Android, con Kotlin y Compose, y llega a los mismos núcleos mediante NDK y JNI.',
        'Las apps no hacen llamadas de red y no incluyen ni distribuyen juegos. Cada persona usa sus propios cartuchos, volcados legalmente.',
      ],
    },
    points: [
      {
        title: { en: 'Game library', es: 'Biblioteca de juegos' },
        body: {
          en: 'A library for your own games, with custom covers.',
          es: 'Una biblioteca para tus propios juegos, con portadas personalizadas.',
        },
      },
      {
        title: { en: 'Atomic saves', es: 'Guardado atómico' },
        body: {
          en: 'Saves are written atomically and keep five rolling backups.',
          es: 'Las partidas se guardan de forma atómica y conservan cinco copias rotativas.',
        },
      },
      {
        title: { en: 'Moments', es: 'Momentos' },
        body: {
          en: 'Points in a game that you keep and can load again later.',
          es: 'Puntos de la partida que guardas y puedes volver a cargar después.',
        },
      },
      {
        title: { en: 'Save transfer', es: 'Traspaso de partidas' },
        body: {
          en: 'A save travels between iPhone and Android as a package file.',
          es: 'Una partida viaja entre iPhone y Android como un archivo de paquete.',
        },
      },
    ],
  },

  engineering: {
    title: {
      en: 'Deterministic cores, native apps',
      es: 'Núcleos deterministas, apps nativas',
    },
    lead: {
      en: 'The cores are plain C11 with strict rules, and each platform gets an app written in its own toolkit.',
      es: 'Los núcleos son C11 con reglas estrictas, y cada plataforma tiene una app escrita con sus propias herramientas.',
    },
    layers: [
      {
        label: { en: 'Native apps', es: 'Apps nativas' },
        nodes: [
          {
            title: 'iOS',
            detail: { en: 'SwiftUI + Metal', es: 'SwiftUI + Metal' },
          },
          {
            title: 'Android',
            detail: {
              en: 'Kotlin + Compose, cores through NDK/JNI',
              es: 'Kotlin + Compose, núcleos mediante NDK/JNI',
            },
          },
        ],
      },
      {
        label: { en: 'Emulation cores', es: 'Núcleos de emulación' },
        highlight: true,
        nodes: [
          {
            title: 'GB · GBC',
            detail: { en: 'Core in pure C11', es: 'Núcleo en C11 puro' },
          },
          {
            title: 'GBA',
            detail: { en: 'Core in pure C11', es: 'Núcleo en C11 puro' },
          },
        ],
      },
    ],
    metrics: [
      {
        value: '65/65',
        caption: {
          en: 'core tests passing under AddressSanitizer',
          es: 'pruebas del núcleo en verde con AddressSanitizer',
        },
      },
      {
        value: '172',
        caption: { en: 'iOS tests', es: 'pruebas en iOS' },
      },
      {
        value: '712',
        caption: {
          en: 'Android tests: 375 JVM and 337 instrumented',
          es: 'pruebas en Android: 375 de JVM y 337 instrumentadas',
        },
      },
      {
        value: '0',
        caption: {
          en: 'network calls made by the apps',
          es: 'llamadas de red hechas por las apps',
        },
      },
    ],
    facts: [
      {
        title: { en: 'No I/O in the cores', es: 'Núcleos sin E/S' },
        body: {
          en: 'The cores are pure C11 and perform no input or output of their own.',
          es: 'Los núcleos son C11 puro y no hacen entrada ni salida por su cuenta.',
        },
      },
      {
        title: { en: 'No global mutable state', es: 'Sin estado global mutable' },
        body: {
          en: 'Nothing mutable lives at global scope in either core.',
          es: 'Ninguno de los dos núcleos guarda estado mutable en el ámbito global.',
        },
      },
      {
        title: { en: 'No per-frame allocation', es: 'Sin reservas por frame' },
        body: {
          en: 'Emulating a frame allocates no memory.',
          es: 'Emular un frame no reserva memoria.',
        },
      },
      {
        title: { en: 'Deterministic', es: 'Determinista' },
        body: {
          en: 'The same input gives the same result on every run.',
          es: 'La misma entrada da el mismo resultado en cada ejecución.',
        },
      },
      {
        title: { en: 'Offline by design', es: 'Sin conexión por diseño' },
        body: {
          en: 'The apps make no network calls. Moving a save between phones is done with a file.',
          es: 'Las apps no hacen llamadas de red. Pasar una partida de un teléfono a otro se hace con un archivo.',
        },
      },
      {
        title: { en: 'No ROMs in the project', es: 'Sin ROMs en el proyecto' },
        body: {
          en: 'No ROMs are bundled or distributed, and a pre-commit hook blocks them from the repository.',
          es: 'No se incluyen ni se distribuyen ROMs, y un hook de pre-commit impide que entren al repositorio.',
        },
      },
    ],
  },

  gallery: {
    title: { en: 'The apps', es: 'Las apps' },
    lead: {
      en: 'Real screenshots of the iOS and Android apps. The interface is in Spanish.',
      es: 'Capturas reales de las apps de iOS y Android.',
    },
    shots: [
      {
        image: shotIosLibrary,
        kind: 'phone',
        alt: {
          en: 'iOS library: search, filters for GB, GBC and GBA, a continue-playing row and a favorites row.',
          es: 'Biblioteca en iOS: búsqueda, filtros por GB, GBC y GBA, una fila para continuar jugando y otra de favoritos.',
        },
        caption: {
          en: 'iOS: the library, with filters by system.',
          es: 'iOS: la biblioteca, con filtros por consola.',
        },
      },
      {
        image: shotIosSaveTravel,
        kind: 'phone',
        alt: {
          en: 'iOS game detail with a button, in Spanish, to continue where you left off on a Pixel 8.',
          es: 'Detalle de un juego en iOS con el botón «Continuar donde lo dejaste en Pixel 8».',
        },
        caption: {
          en: 'iOS: continuing a save that came from an Android phone.',
          es: 'iOS: continuar una partida que llegó desde un teléfono Android.',
        },
      },
      {
        image: shotIosMoments,
        kind: 'phone',
        alt: {
          en: 'iOS moments sheet: a button to add a moment, tag filters and a list of saved moments with thumbnails.',
          es: 'Hoja de momentos en iOS: botón para crear un momento, filtros por etiqueta y una lista de momentos guardados con miniaturas.',
        },
        caption: {
          en: 'iOS: moments, filtered by tag.',
          es: 'iOS: momentos, filtrados por etiqueta.',
        },
      },
      {
        image: shotAndroidLibrary,
        kind: 'phone',
        alt: {
          en: 'Android library: search, filters by system and a continue-playing row.',
          es: 'Biblioteca en Android: búsqueda, filtros por consola y una fila para continuar jugando.',
        },
        caption: {
          en: 'Android: the same library, in its own toolkit.',
          es: 'Android: la misma biblioteca, con sus propias herramientas.',
        },
      },
      {
        image: shotAndroidMoments,
        kind: 'phone',
        alt: {
          en: 'Android moments screen listing the positions kept before loading a moment, each with a recover action.',
          es: 'Pantalla de momentos en Android con las posiciones guardadas antes de cargar un momento, cada una con la acción «Recuperar».',
        },
        caption: {
          en: 'Android: what was there before loading a moment can be recovered.',
          es: 'Android: lo que había antes de cargar un momento se puede recuperar.',
        },
      },
      {
        image: shotAndroidControls,
        kind: 'phone',
        alt: {
          en: 'Android controls settings: opacity of the on-screen controls, d-pad style and diagonals.',
          es: 'Ajustes de controles en Android: opacidad de los controles en pantalla, estilo de cruceta y diagonales.',
        },
        caption: {
          en: 'Android: settings for the on-screen controls.',
          es: 'Android: ajustes de los controles en pantalla.',
        },
      },
    ],
  },

  stack: [
    {
      label: { en: 'Cores', es: 'Núcleos' },
      items: ['C11', 'AddressSanitizer'],
    },
    {
      label: { en: 'iOS', es: 'iOS' },
      items: ['Swift', 'SwiftUI', 'Metal'],
    },
    {
      label: { en: 'Android', es: 'Android' },
      items: ['Kotlin', 'Jetpack Compose', 'NDK', 'JNI'],
    },
  ],

  note: {
    en: 'Game Boy, Game Boy Color and Game Boy Advance are trademarks of Nintendo. PocketGame is an independent personal project and is not affiliated with, endorsed by or sponsored by Nintendo.',
    es: 'Game Boy, Game Boy Color y Game Boy Advance son marcas de Nintendo. PocketGame es un proyecto personal independiente, sin afiliación, respaldo ni patrocinio de Nintendo.',
  },
};
