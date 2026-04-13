import fs from 'fs'
import path from 'path'
import {
  defineConfigWithTheme,
  type HeadConfig,
  type Plugin
} from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import llmstxt from 'vitepress-plugin-llms'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Docs',
    activeMatch: `^/(guide|tutorial|examples|api|glossary|error-reference)/`,
    items: [
      { text: 'ઝડપી શરૂઆત', link: '/guide/quick-start' },
      { text: 'માર્ગદર્શિકા', link: '/guide/introduction' },
      { text: 'ટ્યુટોરીયલ', link: '/tutorial/' },
      { text: 'ઉદાહરણો', link: '/examples/' },
      { text: 'API', link: '/api/' },
      // { text: 'Style Guide', link: '/style-guide/' },
      { text: 'શબ્દાવલી', link: '/glossary/' },
      { text: 'ભૂલ સંદર્ભ', link: '/error-reference/' },
      {
        text: 'Vue 2 દસ્તાવેજો',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Vue 2 માંથી સ્થળાંતર',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'પ્લેગ્રાઉન્ડ',
    link: 'https://play.vuejs.org'
  },
  {
    text: 'ઇકોસિસ્ટમ',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'રિસોર્સિસ',
        items: [
          { text: 'થીમ્સ', link: '/ecosystem/themes' },
          { text: 'UI ઘટકો', link: 'https://ui-libs.vercel.app/' },
          {
            text: 'પ્લગિન્સ કલેક્શન',
            link: 'https://www.vue-plugins.org/'
          },
          {
            text: 'પ્રમાણપત્ર',
            link: 'https://certificates.dev/vuejs/?ref=vuejs-nav'
          },
          { text: 'નોકરીઓ', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'ટી-શર્ટ શોપ', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'સત્તાવાર લાયબ્રેરીઝ',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'ટૂલિંગ માર્ગદર્શિકા', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'વિડિયો અભ્યાસક્રમો',
        items: [
          {
            text: 'Vue Mastery',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'મદદ',
        items: [
          {
            text: 'ડિસ્કોર્ડ ચેટ',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub ચર્ચાઓ',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV કોમ્યુનિટી', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'સમાચાર',
        items: [
          { text: 'બ્લોગ', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://x.com/vuejs' },
          { text: 'ઇવેન્ટ્સ', link: 'https://events.vuejs.org/' },
          { text: 'ન્યૂઝલેટર્સ', link: '/ecosystem/newsletters' }
        ]
      }
    ]
  },
  {
    text: 'વિશે',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'ટીમ', link: '/about/team' },
      { text: 'રીલીઝ', link: '/about/releases' },
      {
        text: 'કોમ્યુનિટી તરફથી માર્ગદર્શિકા',
        link: '/about/community-guide'
      },
      { text: 'આચાર સંહિતા', link: '/about/coc' },
      { text: 'ગોપનીયતા નીતિ', link: '/about/privacy' },
      {
        text: 'ડોક્યુમેન્ટરી',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'સપોર્ટ',
    activeMatch: `^/(sponsor|partners)/`,
    items: [
      { text: 'સ્પોન્સર', link: '/sponsor/' },
      { text: 'પાર્ટનર્સ', link: '/partners/' }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'શરૂઆત કરી રહ્યા છીએ',
      items: [
        { text: 'પરિચય', link: '/guide/introduction' },
        {
          text: 'ઝડપી શરૂઆત',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'આવશ્યક બાબતો',
      items: [
        {
          text: 'એપ્લિકેશન બનાવવી',
          link: '/guide/essentials/application'
        },
        {
          text: 'ટેમ્પલેટ સિન્ટેક્સ',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'રિએક્ટિવિટી ફંડામેન્ટલ્સ',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'કમ્પ્યુટેડ પ્રોપર્ટીઝ',
          link: '/guide/essentials/computed'
        },
        {
          text: 'ક્લાસ અને સ્ટાઇલ બાઈન્ડિંગ્સ',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'કંડિશનલ રેન્ડરિંગ',
          link: '/guide/essentials/conditional'
        },
        { text: 'લિસ્ટ રેન્ડરિંગ', link: '/guide/essentials/list' },
        {
          text: 'ઇવેન્ટ હેન્ડલિંગ',
          link: '/guide/essentials/event-handling'
        },
        { text: 'ફોર્મ ઇનપુટ બાઈન્ડિંગ્સ', link: '/guide/essentials/forms' },
        { text: 'વોચર્સ', link: '/guide/essentials/watchers' },
        { text: 'ટેમ્પલેટ રેફ્સ', link: '/guide/essentials/template-refs' },
        {
          text: 'ઘટકોની મૂળભૂત બાબતો',
          link: '/guide/essentials/component-basics'
        },
        {
          text: 'લાઇફસાઇકલ હૂક્સ',
          link: '/guide/essentials/lifecycle'
        }
      ]
    },
    {
      text: 'ઘટકોની ઉંડાણપૂર્વક સમજ',
      items: [
        {
          text: 'રજીસ્ટ્રેશન',
          link: '/guide/components/registration'
        },
        { text: 'પ્રોપ્સ', link: '/guide/components/props' },
        { text: 'ઇવેન્ટ્સ', link: '/guide/components/events' },
        { text: 'ઘટક v-model', link: '/guide/components/v-model' },
        {
          text: 'ફોલથ્રુ એટ્રીબ્યુટ્સ',
          link: '/guide/components/attrs'
        },
        { text: 'સ્લોટ્સ', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'એસિંક ઘટકો',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'પુનઃઉપયોગીતા',
      items: [
        {
          text: 'કમ્પોઝેબલ્સ',
          link: '/guide/reusability/composables'
        },
        {
          text: 'કસ્ટમ ડિરેક્ટિવ્સ',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'પ્લગિન્સ', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'બિલ્ટ-ઇન ઘટકો',
      items: [
        { text: 'ટ્રાન્ઝિશન', link: '/guide/built-ins/transition' },
        {
          text: 'ટ્રાન્ઝિશન ગ્રુપ',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'સ્કેલિંગ અપ',
      items: [
        { text: 'સિંગલ-ફાઇલ કમ્પોનન્ટ્સ', link: '/guide/scaling-up/sfc' },
        { text: 'ટૂલિંગ', link: '/guide/scaling-up/tooling' },
        { text: 'રાઉટિંગ', link: '/guide/scaling-up/routing' },
        {
          text: 'સ્ટેટ મેનેજમેન્ટ',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'ટેસ્ટિંગ', link: '/guide/scaling-up/testing' },
        {
          text: 'સર્વર-સાઇડ રેન્ડરિંગ (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'શ્રેષ્ઠ પદ્ધતિઓ',
      items: [
        {
          text: 'પ્રોડક્શન ડિપ્લોયમેન્ટ',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'પરફોર્મન્સ',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'એક્સેસિબિલિટી',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'સુરક્ષા',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'ઝાંખી', link: '/guide/typescript/overview' },
        {
          text: 'Composition API સાથે TS',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'Options API સાથે TS',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'વધારાના વિષયો',
      items: [
        {
          text: 'Vue નો ઉપયોગ કરવાની રીતો',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'Composition API FAQ',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Reactivity in Depth',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Rendering Mechanism',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Render Functions & JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue and Web Components',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Animation Techniques',
          link: '/guide/extras/animation'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: 'ગ્લોબલ API',
      items: [
        { text: 'એપ્લિકેશન', link: '/api/application' },
        {
          text: 'સામાન્ય',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'રિએક્ટિવિટી: કોર',
          link: '/api/reactivity-core'
        },
        {
          text: 'રિએક્ટિવિટી: યુટિલિટીઝ',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'રિએક્ટિવિટી: એડવાન્સ્ડ',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'લાઇફસાઇકલ હૂક્સ',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'ડિપેન્ડન્સી ઇન્જેક્શન',
          link: '/api/composition-api-dependency-injection'
        },
        {
          text: 'હેલ્પર્સ',
          link: '/api/composition-api-helpers'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Options: સ્ટેટ', link: '/api/options-state' },
        { text: 'Options: રેન્ડરિંગ', link: '/api/options-rendering' },
        {
          text: 'Options: લાઇફસાઇકલ',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: કમ્પોઝિશન',
          link: '/api/options-composition'
        },
        { text: 'Options: મિશ્રિત', link: '/api/options-misc' },
        {
          text: 'કમ્પોનન્ટ ઇન્સ્ટન્સ',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'બિલ્ટ-ઇન્સ',
      items: [
        { text: 'ડિરેક્ટિવ્સ', link: '/api/built-in-directives' },
        { text: 'ઘટકો', link: '/api/built-in-components' },
        {
          text: 'ખાસ એલિમેન્ટ્સ',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'ખાસ એટ્રીબ્યુટ્સ',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'સિંગલ-ફાઇલ કમ્પોનન્ટ',
      items: [
        { text: 'સિન્ટેક્સ સ્પષ્ટીકરણ', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS સુવિધાઓ', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'એડવાન્સ્ડ API',
      items: [
        { text: 'કસ્ટમ એલિમેન્ટ્સ', link: '/api/custom-elements' },
        { text: 'રેન્ડર ફંક્શન', link: '/api/render-function' },
        { text: 'સર્વર-સાઇડ રેન્ડરિંગ', link: '/api/ssr' },
        { text: 'TypeScript યુટિલિટી ટાઇપ્સ', link: '/api/utility-types' },
        { text: 'કસ્ટમ રેન્ડરર', link: '/api/custom-renderer' },
        { text: 'કમ્પાઇલ-ટાઇમ ફ્લેગ્સ', link: '/api/compile-time-flags' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'બેઝિક',
      items: [
        {
          text: 'હેલો વર્લ્ડ',
          link: '/examples/#hello-world'
        },
        {
          text: 'યુઝર ઇનપુટ હેન્ડલિંગ',
          link: '/examples/#handling-input'
        },
        {
          text: 'એટ્રીબ્યુટ બાઈન્ડિંગ્સ',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'કન્ડિશનલ્સ અને લૂપ્સ',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'ફોર્મ બાઈન્ડિંગ્સ',
          link: '/examples/#form-bindings'
        },
        {
          text: 'સિમ્પલ કમ્પોનન્ટ',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'વ્યવહારુ ઉદાહરણો',
      items: [
        {
          text: 'મેાર્કડાઉન એડિટર',
          link: '/examples/#markdown'
        },
        {
          text: 'ડેટા ફેચિંગ',
          link: '/examples/#fetching-data'
        },
        {
          text: 'સોર્ટ અને ફિલ્ટર સાથે ગ્રીડ',
          link: '/examples/#grid'
        },
        {
          text: 'ટ્રી વ્યુ',
          link: '/examples/#tree'
        },
        {
          text: 'SVG ગ્રાફ',
          link: '/examples/#svg'
        },
        {
          text: 'ટ્રાન્ઝિશન સાથે મોડલ',
          link: '/examples/#modal'
        },
        {
          text: 'ટ્રાન્ઝિશન સાથે લિસ્ટ',
          link: '/examples/#list-transition'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: 'કાઉન્ટર',
          link: '/examples/#counter'
        },
        {
          text: 'ટેમ્પરેચર કન્વર્ટર',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'ફ્લાઇટ બુકર',
          link: '/examples/#flight-booker'
        },
        {
          text: 'ટાઈમર',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'સર્કલ ડ્રોઅર',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'સેલ્સ',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'સ્ટાઇલ ગાઇડ',
      items: [
        {
          text: 'ઝાંખી',
          link: '/style-guide/'
        },
        {
          text: 'A - આવશ્યક',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - ભારપૂર્વક ભલામણ કરેલ',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - ભલામણ કરેલ',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - સાવધાની સાથે ઉપયોગ કરો',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8'
    )
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://vuejs.org'
  },

  lang: 'gu-IN',
  title: 'Vue.js',
  description: 'Vue.js - એક પ્રોગ્રેસિવ જાવાસ્ક્રિપ્ટ ફ્રેમવર્ક',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Vue.js - The Progressive JavaScript Framework'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://automation.vuejs.org'
      }
    ],
    inlineScript('restorePreference.js'),
    inlineScript('uwu.js'),
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://media.bitterbrains.com/main.js?from=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,

    localeLinks: [
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
      {
        link: 'https://ja.vuejs.org',
        text: '日本語',
        repo: 'https://github.com/vuejs-translations/docs-ja'
      },
      {
        link: 'https://ua.vuejs.org',
        text: 'Українська',
        repo: 'https://github.com/vuejs-translations/docs-uk'
      },
      {
        link: 'https://fr.vuejs.org',
        text: 'Français',
        repo: 'https://github.com/vuejs-translations/docs-fr'
      },
      {
        link: 'https://ko.vuejs.org',
        text: '한국어',
        repo: 'https://github.com/vuejs-translations/docs-ko'
      },
      {
        link: 'https://pt.vuejs.org',
        text: 'Português',
        repo: 'https://github.com/vuejs-translations/docs-pt'
      },
      {
        link: 'https://bn.vuejs.org',
        text: 'বাংলা',
        repo: 'https://github.com/vuejs-translations/docs-bn'
      },
      {
        link: 'https://it.vuejs.org',
        text: 'Italiano',
        repo: 'https://github.com/vuejs-translations/docs-it'
      },
      {
        link: 'https://fa.vuejs.org',
        text: 'فارسی',
        repo: 'https://github.com/vuejs-translations/docs-fa'
      },
      {
        link: 'https://ru.vuejs.org',
        text: 'Русский',
        repo: 'https://github.com/vuejs-translations/docs-ru'
      },
      {
        link: 'https://cs.vuejs.org',
        text: 'Čeština',
        repo: 'https://github.com/vuejs-translations/docs-cs'
      },
      {
        link: 'https://zh-hk.vuejs.org',
        text: '繁體中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-hk'
      },
      {
        link: 'https://pl.vuejs.org',
        text: 'Polski',
        repo: 'https://github.com/vuejs-translations/docs-pl'
      },
      {
        link: '/translations/',
        text: 'Help Us Translate!',
        isTranslationsDesc: true
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: '10e7a8b13e6aec4007343338ab134e05',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://x.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],

    editLink: {
      repo: 'vuejs/docs',
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin).use(groupIconMdPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    },
    plugins: [
      llmstxt({
        ignoreFiles: [
          'about/team/**/*',
          'about/team.md',
          'about/privacy.md',
          'about/coc.md',
          'developers/**/*',
          'ecosystem/themes.md',
          'examples/**/*',
          'partners/**/*',
          'sponsor/**/*',
          'index.md'
        ],
        customLLMsTxtTemplate: `\
# Vue.js

Vue.js - The Progressive JavaScript Framework

## Table of Contents

{toc}`
      }) as Plugin,
      groupIconVitePlugin({
        customIcon: {
          cypress: 'vscode-icons:file-type-cypress',
          'testing library': 'logos:testing-library'
        }
      }) as Plugin
    ]
  }
})
