# ગ્લોબલ API: સામાન્ય (Global API: General) {#global-api-general}

## version {#version}

Vue ના વર્તમાન વર્ઝનને એક્સપોઝ કરે છે.

- **ટાઇપ (Type):** `string`

- **ઉદાહરણ (Example)**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

આગામી DOM અપડેટ ફ્લશ (flush) ની રાહ જોવા માટેની ઉપયોગિતા (utility).

- **ટાઇપ (Type)**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **વિગત (Details)**

  જ્યારે તમે Vue માં રિએક્ટિવ સ્ટેટ બદલો છો, ત્યારે પરિણામી DOM અપડેટ્સ સમકાલિક (synchronously) રીતે લાગુ થતા નથી. તેના બદલે, Vue તેમને "next tick" સુધી બફર કરે છે જેથી ખાતરી કરી શકાય કે તમે ગમે તેટલા સ્ટેટ ફેરફારો કર્યા હોય, દરેક ઘટક માત્ર એક જ વાર અપડેટ થાય.

  `nextTick()` ને DOM અપડેટ્સ પૂર્ણ થવાની રાહ જોવા માટે સ્ટેટ ફેરફાર પછી તરત જ ઉપયોગ કરી શકાય. તમે ક્યાં તો આર્ગ્યુમેન્ટ તરીકે કોલબેક પાસ કરી શકો છો, અથવા રિટર્ન થયેલ Promise ને await કરી શકો છો.

- **ઉદાહરણ (Example)**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM હજુ અપડેટ થયું નથી
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM હવે અપડેટ થયું છે
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM હજુ અપડેટ થયું નથી
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM હવે અપડેટ થયું છે
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **આ પણ જુઓ** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

ટાઇપ ઇન્ફરન્સ (type inference) સાથે Vue ઘટકને ડિફાઇન કરવા માટેનો ટાઇપ હેલ્પર.

- **ટાઇપ (Type)**

  ```ts
  // ઓપ્શન્સ સિન્ટેક્સ
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // ફંક્શન સિન્ટેક્સ (3.3+ જરૂરી)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > વાંચવાની સરળતા માટે ટાઇપ સરળ કરવામાં આવ્યો છે.

- **વિગત (Details)**

  પ્રથમ આર્ગ્યુમેન્ટ ઘટક ઓપ્શન્સ ઓબ્જેક્ટની અપેક્ષા રાખે છે. રિટર્ન વેલ્યુ એ જ ઓપ્શન્સ ઓબ્જેક્ટ હશે, કારણ કે ફંક્શન ફક્ત ટાઇપ ઇન્ફરન્સ માટે રનટાઇમ no-op છે.

  નોંધ કરો કે રિટર્ન ટાઇપ થોડો ખાસ છે: તે એક constructor ટાઇપ હશે જેનો ઇન્સ્ટન્સ ટાઇપ ઓપ્શન્સના આધારે ઇન્ફર થયેલ ઘટક ઇન્સ્ટન્સ ટાઇપ છે. TSX માં રિટર્ન ટાઇપ ટેગ તરીકે ઉપયોગ થાય ત્યારે ટાઇપ ઇન્ફરન્સ માટે આનો ઉપયોગ થાય છે.

  તમે `defineComponent()` ના રિટર્ન ટાઇપમાંથી ઘટકનો ઇન્સ્ટન્સ ટાઇપ (તેના ઓપ્શન્સમાં `this` ના ટાઇપ સમકક્ષ) આ રીતે એક્સ્ટ્રેક્ટ કરી શકો છો:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### ફંક્શન સિગ્નેચર (Function Signature) {#function-signature}

  - માત્ર 3.3+ માં સપોર્ટેડ

  `defineComponent()` નું એક વૈકલ્પિક સિગ્નેચર પણ છે જે Composition API અને [રેન્ડર ફંક્શન્સ અથવા JSX](/guide/extras/render-function.html) સાથે ઉપયોગ માટે છે.

  ઓપ્શન્સ ઓબ્જેક્ટ પાસ કરવાના બદલે, એક ફંક્શનની અપેક્ષા રાખવામાં આવે છે. આ ફંક્શન Composition API [`setup()`](/api/composition-api-setup.html#composition-api-setup) ફંક્શનની જેમ જ કાર્ય કરે છે: તે props અને setup context પ્રાપ્ત કરે છે. રિટર્ન વેલ્યુ રેન્ડર ફંક્શન હોવું જોઈએ - `h()` અને JSX બંને સપોર્ટેડ છે:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // અહીં <script setup> ની જેમ Composition API ઉપયોગ કરો
      const count = ref(0)

      return () => {
        // રેન્ડર ફંક્શન અથવા JSX
        return h('div', count.value)
      }
    },
    // વધારાના ઓપ્શન્સ, દા.ત. props અને emits ડિક્લેર કરો
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  આ સિગ્નેચરનો મુખ્ય ઉપયોગ TypeScript (અને ખાસ કરીને TSX) સાથે છે, કારણ કે તે generics ને સપોર્ટ કરે છે:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // અહીં <script setup> ની જેમ Composition API ઉપયોગ કરો
      const count = ref(0)

      return () => {
        // રેન્ડર ફંક્શન અથવા JSX
        return <div>{count.value}</div>
      }
    },
    // મેન્યુઅલ રનટાઇમ props ડિક્લેરેશન હાલમાં હજુ પણ જરૂરી છે.
    {
      props: ['msg', 'list']
    }
  )
  ```

  ભવિષ્યમાં, અમે Babel પ્લગઇન પ્રદાન કરવાની યોજના ઘડીએ છીએ જે આપમેળે રનટાઇમ props ને ઇન્ફર અને ઇન્જેક્ટ કરે (જેમ SFC માં `defineProps` માટે) જેથી રનટાઇમ props ડિક્લેરેશન ને છોડી શકાય.

  ### webpack ટ્રીશેકિંગ (Treeshaking) વિશે નોંધ {#note-on-webpack-treeshaking}

  કારણ કે `defineComponent()` એક ફંક્શન કોલ છે, તે કેટલાક બિલ્ડ ટૂલ્સ, દા.ત. webpack ને સાઇડ-ઇફેક્ટ્સ ઉત્પન્ન કરતું દેખાઈ શકે. આ ઘટકને ટ્રી-શેક (tree-shaken) થવાથી અટકાવશે ભલે ઘટક ક્યારેય ઉપયોગમાં ન આવ્યો હોય.

  webpack ને જણાવવા કે આ ફંક્શન કોલ ટ્રી-શેક થવા માટે સુરક્ષિત છે, તમે ફંક્શન કોલ પહેલા `/*#__PURE__*/` ટિપ્પણી નોટેશન ઉમેરી શકો:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  નોંધ કરો કે જો તમે Vite ઉપયોગ કરી રહ્યાં છો તો આ જરૂરી નથી, કારણ કે Rollup (Vite દ્વારા ઉપયોગમાં લેવાતું અંતર્ગત પ્રોડક્શન બંડલર) એટલું સ્માર્ટ છે કે તે મેન્યુઅલ એનોટેશન્સ વિના નક્કી કરી લે છે કે `defineComponent()` ખરેખર side-effect-free છે.

- **આ પણ જુઓ** [ગાઇડ - TypeScript સાથે Vue નો ઉપયોગ](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

એક એસિંક ઘટક ડિફાઇન કરે છે જે ફક્ત રેન્ડર થાય ત્યારે જ lazy load થાય છે. આર્ગ્યુમેન્ટ ક્યાં તો લોડર ફંક્શન હોઈ શકે, અથવા લોડિંગ વર્તણૂકના વધુ અદ્યતન (advanced) નિયંત્રણ માટે ઓપ્શન્સ ઓબ્જેક્ટ.

- **ટાઇપ (Type)**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **આ પણ જુઓ** [ગાઇડ - એસિંક કમ્પોનન્ટ્સ](/guide/components/async)
