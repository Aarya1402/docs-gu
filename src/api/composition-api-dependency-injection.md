# Composition API: <br>ડિપેન્ડન્સી ઇન્જેક્શન (Dependency Injection) {#composition-api-dependency-injection}

## provide() {#provide}

એક વેલ્યુ પ્રદાન કરે છે જે વંશજ (descendant) ઘટકો દ્વારા inject કરી શકાય.

- **ટાઇપ (Type)**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **વિગત (Details)**

  `provide()` બે આર્ગ્યુમેન્ટ્સ લે છે: key, જે string અથવા symbol હોઈ શકે, અને inject કરવાની વેલ્યુ.

  TypeScript ઉપયોગ કરતી વખતે, key `InjectionKey` તરીકે cast થયેલું symbol હોઈ શકે - Vue દ્વારા પ્રદાન કરાયેલ utility type જે `Symbol` ને extend કરે છે, જેનો ઉપયોગ `provide()` અને `inject()` વચ્ચે value type sync કરવા માટે થઈ શકે.

  lifecycle hook registration APIs ની જેમ, `provide()` ને ઘટકના `setup()` phase દરમિયાન synchronously બોલાવવું આવશ્યક છે.

- **ઉદાહરણ (Example)**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // static value provide કરો
  provide('path', '/project/')

  // reactive value provide કરો
  const count = ref(0)
  provide('count', count)

  // Symbol keys સાથે provide કરો
  provide(countSymbol, count)
  </script>
  ```

- **આ પણ જુઓ**
  - [ગાઇડ - Provide / Inject](/guide/components/provide-inject)
  - [ગાઇડ - Provide / Inject ટાઇપ કરવું](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

પૂર્વજ (ancestor) ઘટક અથવા એપ્લિકેશન (`app.provide()` દ્વારા) દ્વારા provide કરેલી વેલ્યુ inject કરે છે.

- **ટાઇપ (Type)**

  ```ts
  // default value વિના
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // default value સાથે
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // factory સાથે
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **વિગત (Details)**

  પ્રથમ આર્ગ્યુમેન્ટ injection key છે. Vue parent chain ઉપર ચાલશે અને matching key સાથે provide કરેલી value શોધશે. જો parent chain માં બહુવિધ ઘટકો સમાન key provide કરે, તો injecting ઘટકની સૌથી નજીકનો "shadow" (છાયો) ઊંચે ચેઇનમાં રહેલાઓને કરશે અને તેની value ઉપયોગ થશે. જો matching key સાથે કોઈ value ન મળે, તો `inject()` `undefined` રિટર્ન કરે છે સિવાય કે default value provide કરવામાં આવી હોય.

  બીજો આર્ગ્યુમેન્ટ વૈકલ્પિક છે અને default value છે જે matching value ન મળે ત્યારે ઉપયોગ થશે.

  બીજો આર્ગ્યુમેન્ટ factory function પણ હોઈ શકે જે બનાવવામાં ખર્ચાળ values રિટર્ન કરે. આ કિસ્સામાં, ત્રીજા આર્ગ્યુમેન્ટ તરીકે `true` પાસ કરવું આવશ્યક છે જે દર્શાવે કે function ને value ના બદલે factory તરીકે ઉપયોગ કરવો.

  lifecycle hook registration APIs ની જેમ, `inject()` ને ઘટકના `setup()` phase દરમિયાન synchronously બોલાવવું આવશ્યક છે.

  TypeScript ઉપયોગ કરતી વખતે, key `InjectionKey` type ની હોઈ શકે - Vue દ્વારા provide કરાયેલ utility type જે `Symbol` ને extend કરે છે, જેનો ઉપયોગ `provide()` અને `inject()` વચ્ચે value type sync કરવા માટે થઈ શકે.

- **ઉદાહરણ (Example)**

  ધારો કે parent ઘટકે અગાઉના `provide()` ઉદાહરણમાં બતાવ્યા મુજબ values provide કરી છે:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // default વિના static value inject કરો
  const path = inject('path')

  // reactive value inject કરો
  const count = inject('count')

  // Symbol keys સાથે inject કરો
  const count2 = inject(countSymbol)

  // default value સાથે inject કરો
  const bar = inject('path', '/default-path')

  // function default value સાથે inject કરો
  const fn = inject('function', () => {})

  // default value factory સાથે inject કરો
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```
  
- **આ પણ જુઓ**
  - [ગાઇડ - Provide / Inject](/guide/components/provide-inject)
  - [ગાઇડ - Provide / Inject ટાઇપ કરવું](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## hasInjectionContext() {#has-injection-context}

- માત્ર 3.3+ માં સપોર્ટેડ

જો [inject()](#inject) ને ખોટી જગ્યાએ (દા.ત. `setup()` ની બહાર) બોલાવવા વિશે warning વિના ઉપયોગ કરી શકાય તો true રિટર્ન કરે છે. આ method એવી libraries માટે ડિઝાઇન કરવામાં આવી છે જે end user ને warning ટ્રિગર કર્યા વિના આંતરિક રીતે `inject()` ઉપયોગ કરવા માંગે.

- **ટાઇપ (Type)**

  ```ts
  function hasInjectionContext(): boolean
  ```
