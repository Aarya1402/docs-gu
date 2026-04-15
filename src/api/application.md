# એપ્લિકેશન API (Application API) {#application-api}

## createApp() {#createapp}

એક એપ્લિકેશન ઇન્સ્ટન્સ બનાવે છે.

- **ટાઇપ (Type)**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **વિગત (Details)**

  પ્રથમ આર્ગ્યુમેન્ટ રૂટ ઘટક છે. બીજા વૈકલ્પિક (optional) આર્ગ્યુમેન્ટ એ રૂટ ઘટકને પાસ કરવાના props છે.

- **ઉદાહરણ (Example)**

  ઇનલાઈન રૂટ ઘટક સાથે:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* રૂટ ઘટક ઓપ્શન્સ */
  })
  ```

  ઇમ્પોર્ટ કરેલા ઘટક સાથે:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **આ પણ જુઓ** [ગાઇડ - Vue એપ્લિકેશન બનાવવી](/guide/essentials/application)

## createSSRApp() {#createssrapp}

[SSR હાઇડ્રેશન (SSR Hydration)](/guide/scaling-up/ssr#client-hydration) મોડમાં એપ્લિકેશન ઇન્સ્ટન્સ બનાવે છે. ઉપયોગ `createApp()` જેવો જ છે.

## app.mount() {#app-mount}

એપ્લિકેશન ઇન્સ્ટન્સને કન્ટેનર એલિમેન્ટમાં માઉન્ટ કરે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **વિગત (Details)**

  આર્ગ્યુમેન્ટ ક્યાં તો વાસ્તવિક DOM એલિમેન્ટ અથવા CSS સિલેક્ટર હોઈ શકે (પ્રથમ મેળ ખાતો એલિમેન્ટ ઉપયોગમાં લેવાશે). રૂટ ઘટક ઇન્સ્ટન્સ રિટર્ન કરે છે.

  જો ઘટક પાસે ટેમ્પ્લેટ અથવા રેન્ડર ફંક્શન ડિફાઇન કરેલું હોય, તો તે કન્ટેનર અંદરના કોઈપણ હાલના DOM નોડ્સને બદલશે. નહીંતર, જો રનટાઇમ કમ્પાઇલર ઉપલબ્ધ હોય, તો કન્ટેનરનો `innerHTML` ટેમ્પ્લેટ તરીકે ઉપયોગ થશે.

  SSR હાઇડ્રેશન મોડમાં, તે કન્ટેનર અંદરના હાલના DOM નોડ્સને હાઇડ્રેટ કરશે. જો [મિસમેચ](/guide/scaling-up/ssr#hydration-mismatch) હોય, તો હાલના DOM નોડ્સને અપેક્ષિત આઉટપુટ સાથે મેળ ખાતા કરવા માટે બદલવામાં આવશે.

  દરેક એપ ઇન્સ્ટન્સ માટે, `mount()` ને ફક્ત એક જ વાર બોલાવી શકાય.

- **ઉદાહરણ (Example)**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  વાસ્તવિક DOM એલિમેન્ટ પર પણ માઉન્ટ કરી શકાય:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

માઉન્ટ કરેલા એપ્લિકેશન ઇન્સ્ટન્સને અનમાઉન્ટ કરે છે, એપ્લિકેશનના ઘટક ટ્રીના તમામ ઘટકો માટે અનમાઉન્ટ લાઇફસાઇકલ હૂક્સ ટ્રિગર કરે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.onUnmount() <sup class="vt-badge" data-text="3.5+" /> {#app-onunmount}

એપ અનમાઉન્ટ થાય ત્યારે બોલાવવા માટે કોલબેક રજિસ્ટર કરે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    onUnmount(callback: () => any): void
  }
  ```

## app.component() {#app-component}

જો નામ સ્ટ્રિંગ અને ઘટક ડેફિનિશન બંને પાસ કરવામાં આવે તો ગ્લોબલ ઘટક રજિસ્ટર કરે છે, અથવા જો ફક્ત નામ પાસ કરવામાં આવે તો પહેલેથી રજિસ્ટર થયેલો ઘટક મેળવે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // ઓપ્શન્સ ઓબ્જેક્ટ રજિસ્ટર કરો
  app.component('MyComponent', {
    /* ... */
  })

  // રજિસ્ટર થયેલો ઘટક મેળવો
  const MyComponent = app.component('MyComponent')
  ```

- **આ પણ જુઓ** [ઘટક રજિસ્ટ્રેશન (Component Registration)](/guide/components/registration)

## app.directive() {#app-directive}

જો નામ સ્ટ્રિંગ અને ડિરેક્ટિવ ડેફિનિશન બંને પાસ કરવામાં આવે તો ગ્લોબલ કસ્ટમ ડિરેક્ટિવ રજિસ્ટર કરે છે, અથવા જો ફક્ત નામ પાસ કરવામાં આવે તો પહેલેથી રજિસ્ટર થયેલી ડિરેક્ટિવ મેળવે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // રજિસ્ટર કરો (ઓબ્જેક્ટ ડિરેક્ટિવ)
  app.directive('myDirective', {
    /* કસ્ટમ ડિરેક્ટિવ હૂક્સ */
  })

  // રજિસ્ટર કરો (ફંક્શન ડિરેક્ટિવ શોર્ટહેન્ડ)
  app.directive('myDirective', () => {
    /* ... */
  })

  // રજિસ્ટર થયેલી ડિરેક્ટિવ મેળવો
  const myDirective = app.directive('myDirective')
  ```

- **આ પણ જુઓ** [કસ્ટમ ડિરેક્ટિવ્સ](/guide/reusability/custom-directives)

## app.use() {#app-use}

[પ્લગઇન](/guide/reusability/plugins) ઇન્સ્ટોલ કરે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **વિગત (Details)**

  પ્રથમ આર્ગ્યુમેન્ટ તરીકે પ્લગઇન અને વૈકલ્પિક પ્લગઇન ઓપ્શન્સ બીજા આર્ગ્યુમેન્ટ તરીકે અપેક્ષા રાખે છે.

  પ્લગઇન ક્યાં તો `install()` મેથડ ધરાવતો ઓબ્જેક્ટ હોઈ શકે, અથવા ફક્ત ફંક્શન જે `install()` મેથડ તરીકે ઉપયોગ થશે. ઓપ્શન્સ (`app.use()` નો બીજો આર્ગ્યુમેન્ટ) પ્લગઇનની `install()` મેથડને પાસ કરવામાં આવશે.

  જ્યારે `app.use()` એક જ પ્લગઇન પર બહુવિધ વખત બોલાવવામાં આવે, ત્યારે પ્લગઇન ફક્ત એક જ વાર ઇન્સ્ટોલ થશે.

- **ઉદાહરણ (Example)**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **આ પણ જુઓ** [પ્લગઇન્સ](/guide/reusability/plugins)

## app.mixin() {#app-mixin}

ગ્લોબલ mixin લાગુ કરે છે (એપ્લિકેશન સુધી સ્કોપ્ડ). ગ્લોબલ mixin તેના સમાવિષ્ટ ઓપ્શન્સ એપ્લિકેશનમાં દરેક ઘટક ઇન્સ્ટન્સ પર લાગુ કરે છે.

:::warning ભલામણ નથી (Not Recommended)
ઇકોસિસ્ટમ લાઇબ્રેરીઓમાં વ્યાપક ઉપયોગને કારણે, Vue 3 માં Mixins મુખ્યત્વે પછાત સુસંગતતા (backwards compatibility) માટે સપોર્ટેડ છે. એપ્લિકેશન કોડમાં mixins, ખાસ કરીને ગ્લોબલ mixins, નો ઉપયોગ ટાળવો જોઈએ.

લોજિક ફરીથી ઉપયોગ (logic reuse) માટે, [Composables](/guide/reusability/composables) ને પ્રાધાન્ય આપો.
:::

- **ટાઇપ (Type)**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide() {#app-provide}

એક વેલ્યુ પ્રદાન કરે છે જે એપ્લિકેશનમાં તમામ વંશજ (descendant) ઘટકોમાં inject કરી શકાય.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **વિગત (Details)**

  પ્રથમ આર્ગ્યુમેન્ટ તરીકે injection key અને બીજા તરીકે પ્રદાન કરેલી વેલ્યુ અપેક્ષા રાખે છે. એપ્લિકેશન ઇન્સ્ટન્સ પોતે જ રિટર્ન કરે છે.

- **ઉદાહરણ (Example)**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  એપ્લિકેશનમાં ઘટક અંદર:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **આ પણ જુઓ**
  - [Provide / Inject](/guide/components/provide-inject)
  - [એપ-લેવલ Provide](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext() {#app-runwithcontext}

- માત્ર 3.3+ માં સપોર્ટેડ

વર્તમાન એપને injection context તરીકે રાખીને કોલબેક ચલાવે છે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **વિગત (Details)**

  કોલબેક ફંક્શનની અપેક્ષા રાખે છે અને કોલબેકને તરત જ ચલાવે છે. કોલબેકના synchronous કોલ દરમિયાન, `inject()` કોલ્સ વર્તમાન એપ દ્વારા પૂરી પાડવામાં આવેલી વેલ્યુમાંથી injections શોધી શકે છે, ભલે હાલમાં કોઈ સક્રિય ઘટક ઇન્સ્ટન્સ ન હોય. કોલબેકની રિટર્ન વેલ્યુ પણ રિટર્ન થશે.

- **ઉદાહરણ (Example)**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

એપ્લિકેશન જે Vue વર્ઝન સાથે બનાવવામાં આવી હતી તે પ્રદાન કરે છે. આ [પ્લગઇન્સ](/guide/reusability/plugins) અંદર ઉપયોગી છે, જ્યાં તમને વિવિધ Vue વર્ઝન પર આધારિત conditional logic ની જરૂર પડી શકે.

- **ટાઇપ (Type)**

  ```ts
  interface App {
    version: string
  }
  ```

- **ઉદાહરણ (Example)**

  પ્લગઇન અંદર વર્ઝન ચકાસણી (version check) કરવી:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
    }
  }
  ```

- **આ પણ જુઓ** [ગ્લોબલ API - version](/api/general#version)

## app.config {#app-config}

દરેક એપ્લિકેશન ઇન્સ્ટન્સ `config` ઓબ્જેક્ટ એક્સપોઝ કરે છે જેમાં તે એપ્લિકેશન માટેના કોન્ફિગરેશન સેટિંગ્સ છે. તમે તમારી એપ્લિકેશન માઉન્ટ કરતા પહેલા તેની પ્રોપર્ટીઝ (નીચે દસ્તાવેજીકૃત) ફેરફાર કરી શકો.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

એપ્લિકેશનની અંદરથી પ્રસાર પામતી (propagating) uncaught errors માટે ગ્લોબલ હેન્ડલર સોંપે છે.

- **ટાઇપ (Type)**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` એ Vue-વિશિષ્ટ error info છે,
      // દા.ત. કયા lifecycle hook માં error ફેંકાયો
      info: string
    ) => void
  }
  ```

- **વિગત (Details)**

  error handler ત્રણ આર્ગ્યુમેન્ટ્સ પ્રાપ્ત કરે છે: error, error ટ્રિગર કરનાર ઘટક ઇન્સ્ટન્સ, અને error સોર્સ ટાઇપ સ્પષ્ટ કરતી માહિતી સ્ટ્રિંગ.

  તે નીચેના સ્ત્રોતોમાંથી errors કેપ્ચર કરી શકે છે:

  - ઘટક રેન્ડર્સ (Component renders)
  - ઇવેન્ટ હેન્ડલર્સ (Event handlers)
  - લાઇફસાઇકલ હૂક્સ (Lifecycle hooks)
  - `setup()` ફંક્શન
  - Watchers
  - કસ્ટમ ડિરેક્ટિવ હૂક્સ (Custom directive hooks)
  - Transition હૂક્સ (Transition hooks)

  :::tip
  પ્રોડક્શનમાં, ૩જો આર્ગ્યુમેન્ટ (`info`) સંપૂર્ણ માહિતી સ્ટ્રિંગ ને બદલે ટૂંકો કોડ હશે. તમે [પ્રોડક્શન Error Code Reference](/error-reference/#runtime-errors) માં code to string mapping શોધી શકો.
  :::

- **ઉદાહરણ (Example)**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // error હેન્ડલ કરો, દા.ત. સર્વિસ ને રિપોર્ટ કરો
  }
  ```

- **ડિફોલ્ટ (Default)**

  ડિફોલ્ટ error handler ડેવલપમેન્ટ દરમિયાન errors ફરીથી ફેંકશે અને પ્રોડક્શન દરમિયાન errors લોગ કરશે.
  તમે [throwUnhandledErrorInProduction](#app-config-throwunhandlederrorinproduction) પ્રોપર્ટી ઉપયોગ કરીને આ કોન્ફિગર કરી શકો.

## app.config.warnHandler {#app-config-warnhandler}

Vue ની રનટાઇમ ચેતવણીઓ (warnings) માટે કસ્ટમ હેન્ડલર સોંપે છે.

- **ટાઇપ (Type)**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **વિગત (Details)**

  warning handler પ્રથમ આર્ગ્યુમેન્ટ તરીકે ચેતવણી સંદેશ, બીજા આર્ગ્યુમેન્ટ તરીકે સ્રોત ઘટક ઇન્સ્ટન્સ, અને ત્રીજા તરીકે ઘટક trace સ્ટ્રિંગ પ્રાપ્ત કરે છે.

  કન્સોલ વર્બોસિટી (verbosity) ઘટાડવા માટે ચોક્કસ ચેતવણીઓ ફિલ્ટર કરવા માટે તેનો ઉપયોગ કરી શકાય. તમામ Vue ચેતવણીઓ ડેવલપમેન્ટ દરમિયાન ધ્યાન આપવા જોઈએ, તેથી આ ફક્ત debug sessions દરમિયાન ભલામણ કરવામાં આવે છે જ્યારે ઘણી ચેતવણીઓ વચ્ચે ચોક્કસ ચેતવણીઓ પર ધ્યાન કેન્દ્રિત કરવાનું હોય, અને debugging પૂર્ણ થાય પછી દૂર કરવી જોઈએ.

  :::tip
  ચેતવણીઓ ફક્ત ડેવલપમેન્ટ દરમિયાન જ કામ કરે છે, તેથી આ config પ્રોડક્શન મોડમાં અવગણવામાં આવે છે.
  :::

- **ઉદાહરણ (Example)**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` એ ઘટક hierarchy trace છે
  }
  ```

## app.config.performance {#app-config-performance}

બ્રાઉઝર devtool performance/timeline પેનલમાં ઘટક init, compile, render અને patch performance tracing ને સક્ષમ કરવા માટે આને `true` પર સેટ કરો. ફક્ત ડેવલપમેન્ટ મોડમાં અને [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API ને સપોર્ટ કરતા બ્રાઉઝર્સમાં જ કામ કરે છે.

- **ટાઇપ (Type):** `boolean`

- **આ પણ જુઓ** [ગાઇડ - પરફોર્મન્સ](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

રનટાઇમ કમ્પાઇલર ઓપ્શન્સ કોન્ફિગર કરો. આ ઓબ્જેક્ટ પર સેટ કરેલી વેલ્યુ ઇન-બ્રાઉઝર ટેમ્પ્લેટ કમ્પાઇલરને પાસ કરવામાં આવશે અને કોન્ફિગર કરેલી એપમાં દરેક ઘટકને અસર કરશે. નોંધ કરો કે તમે [`compilerOptions` ઓપ્શન](/api/options-rendering#compileroptions) ઉપયોગ કરીને દરેક-ઘટક આધારે આ ઓપ્શન્સ ઓવરરાઇડ પણ કરી શકો.

::: warning મહત્વપૂર્ણ (Important)
આ config ઓપ્શન ફક્ત ત્યારે જ માન્ય છે જ્યારે ફુલ બિલ્ડ (i.e. standalone `vue.js` જે બ્રાઉઝરમાં ટેમ્પ્લેટ્સ કમ્પાઇલ કરી શકે) ઉપયોગ કરો. જો તમે બિલ્ડ સેટઅપ સાથે runtime-only બિલ્ડ ઉપયોગ કરી રહ્યાં છો, તો compiler ઓપ્શન્સ `@vue/compiler-dom` ને બિલ્ડ ટૂલ configurations દ્વારા પાસ કરવા જોઈએ.

- `vue-loader` માટે: [`compilerOptions` loader ઓપ્શન દ્વારા પાસ કરો](https://vue-loader.vuejs.org/options.html#compileroptions). [`vue-cli` માં કેવી રીતે કોન્ફિગર કરવું](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) પણ જુઓ.

- `vite` માટે: [`@vitejs/plugin-vue` ઓપ્શન્સ દ્વારા પાસ કરો](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

નેટિવ કસ્ટમ એલિમેન્ટ્સ ઓળખવા માટે ચેક મેથડ સ્પષ્ટ કરે છે.

- **ટાઇપ (Type):** `(tag: string) => boolean`

- **વિગત (Details)**

  જો ટેગને નેટિવ કસ્ટમ એલિમેન્ટ તરીકે ગણવો જોઈએ તો `true` રિટર્ન કરવું જોઈએ. મેળ ખાતા ટેગ માટે, Vue તેને Vue ઘટક તરીકે રિઝોલ્વ કરવાનો પ્રયાસ કરવાના બદલે નેટિવ એલિમેન્ટ તરીકે રેન્ડર કરશે.

  નેટિવ HTML અને SVG ટેગ્સને આ ફંક્શનમાં મેળ ખાવાની જરૂર નથી - Vue નો parser તેમને આપમેળે ઓળખે છે.

- **ઉદાહરણ (Example)**

  ```js
  // 'ion-' થી શરૂ થતા તમામ ટેગ્સને કસ્ટમ એલિમેન્ટ તરીકે ગણો
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **આ પણ જુઓ** [Vue અને Web Components](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

ટેમ્પ્લેટ whitespace હેન્ડલિંગ વર્તણૂક ગોઠવે છે.

- **ટાઇપ (Type):** `'condense' | 'preserve'`

- **ડિફોલ્ટ (Default):** `'condense'`

- **વિગત (Details)**

  Vue વધુ કાર્યક્ષમ (efficient) compiled આઉટપુટ ઉત્પન્ન કરવા માટે ટેમ્પ્લેટ્સમાં whitespace chars ને દૂર / condense કરે છે. ડિફોલ્ટ વ્યૂહરચના "condense" છે, જેમાં નીચેની વર્તણૂક છે:

  ૧. એલિમેન્ટ અંદર શરૂઆતના / અંતના whitespace chars ને એક સ્પેસમાં condense કરવામાં આવે છે.
  ૨. newlines ધરાવતા એલિમેન્ટ્સ વચ્ચેના whitespace chars દૂર કરવામાં આવે છે.
  ૩. text nodes માં consecutive whitespace chars ને એક સ્પેસમાં condense કરવામાં આવે છે.

  આ ઓપ્શનને `'preserve'` પર સેટ કરવાથી (૨) અને (૩) અક્ષમ (disable) થશે.

- **ઉદાહરણ (Example)**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

ટેમ્પ્લેટમાં text interpolation માટે ઉપયોગમાં લેવાતા delimiters ગોઠવે છે.

- **ટાઇપ (Type):** `[string, string]`

- **ડિફોલ્ટ (Default):** `{{ "['\\u007b\\u007b', '\\u007d\\u007d']" }}`

- **વિગત (Details)**

  આ સામાન્ય રીતે mustache syntax નો ઉપયોગ કરતા server-side frameworks સાથે ટકરાવ ટાળવા માટે ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  ```js
  // Delimiters ને ES6 template string style માં બદલ્યા
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

ટેમ્પ્લેટ્સમાં HTML comments ની ગણતરી ગોઠવે છે.

- **ટાઇપ (Type):** `boolean`

- **ડિફોલ્ટ (Default):** `false`

- **વિગત (Details)**

  ડિફોલ્ટ રૂપે, Vue પ્રોડક્શનમાં comments દૂર કરશે. આ ઓપ્શનને `true` પર સેટ કરવાથી Vue ને પ્રોડક્શનમાં પણ comments જાળવી રાખવાની ફરજ પાડશે. ડેવલપમેન્ટ દરમિયાન comments હંમેશા જાળવવામાં આવે છે. આ ઓપ્શન સામાન્ય રીતે ત્યારે ઉપયોગ થાય છે જ્યારે Vue ને HTML comments પર આધાર રાખતી અન્ય લાઇબ્રેરીઓ સાથે ઉપયોગ કરવામાં આવે.

- **ઉદાહરણ (Example)**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

એક ઓબ્જેક્ટ જેનો ઉપયોગ ગ્લોબલ પ્રોપર્ટીઝ રજિસ્ટર કરવા માટે થઈ શકે છે જે એપ્લિકેશન અંદર કોઈપણ ઘટક ઇન્સ્ટન્સ પર એક્સેસ કરી શકાય.

- **ટાઇપ (Type)**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **વિગત (Details)**

  આ Vue 2 ના `Vue.prototype` નું રિપ્લેસમેન્ટ છે જે Vue 3 માં હવે હાજર નથી. કોઈપણ ગ્લોબલ વસ્તુની જેમ, આનો ઉપયોગ ઓછો (sparingly) કરવો જોઈએ.

  જો ગ્લોબલ પ્રોપર્ટી ઘટકની પોતાની પ્રોપર્ટી સાથે ટકરાય, તો ઘટકની પોતાની પ્રોપર્ટી વધુ ઉચ્ચ પ્રાથમિકતા ધરાવશે.

- **ઉપયોગ (Usage)**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```

  આ `msg` ને એપ્લિકેશનમાં કોઈપણ ઘટક ટેમ્પ્લેટ અંદર, અને કોઈપણ ઘટક ઇન્સ્ટન્સના `this` પર ઉપલબ્ધ બનાવે છે:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

- **આ પણ જુઓ** [ગાઇડ - ગ્લોબલ પ્રોપર્ટીઝ ઓગમેન્ટ કરવી](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

કસ્ટમ ઘટક ઓપ્શન્સ માટે merging strategies ડિફાઇન કરવા માટેનો ઓબ્જેક્ટ.

- **ટાઇપ (Type)**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **વિગત (Details)**

  કેટલાક plugins / libraries કસ્ટમ ઘટક ઓપ્શન્સ માટે સપોર્ટ ઉમેરે છે (ગ્લોબલ mixins ઇન્જેક્ટ કરીને). જ્યારે સમાન ઓપ્શનને બહુવિધ સ્ત્રોતોમાંથી "merge" કરવાની જરૂર પડે (દા.ત. mixins અથવા ઘટક inheritance), ત્યારે આ ઓપ્શન્સ માટે ખાસ merging logic ની જરૂર પડી શકે.

  `app.config.optionMergeStrategies` ઓબ્જેક્ટ પર ઓપ્શનના નામના key ઉપયોગ કરીને કસ્ટમ ઓપ્શન માટે merge strategy ફંક્શન રજિસ્ટર કરી શકાય.

  merge strategy ફંક્શન અનુક્રમે પ્રથમ અને બીજા આર્ગ્યુમેન્ટ્સ તરીકે parent અને child instances પર ડિફાઇન કરેલ તે ઓપ્શનની વેલ્યુ પ્રાપ્ત કરે છે.

- **ઉદાહરણ (Example)**

  ```js
  const app = createApp({
    // પોતાનો ઓપ્શન
    msg: 'Vue',
    // mixin તરફથી ઓપ્શન
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // this.$options પર merged ઓપ્શન્સ એક્સપોઝ થાય છે
      console.log(this.$options.msg)
    }
  })

  // `msg` માટે કસ્ટમ merge strategy ડિફાઇન કરો
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // 'Hello Vue' લોગ કરે છે
  ```

- **આ પણ જુઓ** [ઘટક ઇન્સ્ટન્સ - `$options`](/api/component-instance#options)

## app.config.idPrefix <sup class="vt-badge" data-text="3.5+" /> {#app-config-idprefix}

આ એપ્લિકેશનમાં [useId()](/api/composition-api-helpers.html#useid) દ્વારા જનરેટ થયેલા તમામ IDs માટે prefix કોન્ફિગર કરો.

- **ટાઇપ (Type):** `string`

- **ડિફોલ્ટ (Default):** `undefined`

- **ઉદાહરણ (Example)**

  ```js
  app.config.idPrefix = 'myApp'
  ```

  ```js
  // ઘટકમાં:
  const id1 = useId() // 'myApp:0'
  const id2 = useId() // 'myApp:1'
  ```

## app.config.throwUnhandledErrorInProduction <sup class="vt-badge" data-text="3.5+" /> {#app-config-throwunhandlederrorinproduction}

પ્રોડક્શન મોડમાં unhandled errors ને ફેંકવાની ફરજ પાડે છે.

- **ટાઇપ (Type):** `boolean`

- **ડિફોલ્ટ (Default):** `false`

- **વિગત (Details)**

  ડિફોલ્ટ રૂપે, Vue એપ્લિકેશન અંદર ફેંકાયેલા પરંતુ સ્પષ્ટ રીતે handle ન થયેલા errors ડેવલપમેન્ટ અને પ્રોડક્શન modes વચ્ચે અલગ વર્તણૂક ધરાવે છે:

  - ડેવલપમેન્ટમાં, error ફેંકાય છે અને સંભવિત રૂપે એપ્લિકેશનને ક્રેશ કરી શકે. આ error ને વધુ સ્પષ્ટ બનાવવા માટે છે જેથી ડેવલપમેન્ટ દરમિયાન તે ધ્યાનમાં આવી શકે અને સુધારી શકાય.

  - પ્રોડક્શનમાં, error ફક્ત console માં લોગ થશે જેથી end users પર અસર ઓછી થાય. જો કે, આ પ્રોડક્શનમાં જ થતી errors ને error monitoring services દ્વારા પકડાતા અટકાવી શકે.

  `app.config.throwUnhandledErrorInProduction` ને `true` પર સેટ કરવાથી, unhandled errors પ્રોડક્શન મોડમાં પણ ફેંકાશે.
