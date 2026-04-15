# Reactivity API: એડવાન્સ્ડ (Advanced) {#reactivity-api-advanced}

## shallowRef() {#shallowref}

[`ref()`](./reactivity-core#ref) નું Shallow version.

- **ટાઇપ (Type)**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **વિગત (Details)**

  `ref()` થી વિપરીત, shallow ref ની inner value as-is store અને expose થાય છે, અને deeply reactive બનાવાશે નહીં. ફક્ત `.value` access reactive છે.

  `shallowRef()` સામાન્ય રીતે મોટા data structures ના performance optimizations, અથવા external state management systems સાથે integration માટે ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  ```js
  const state = shallowRef({ count: 1 })

  // change trigger નથી કરતું
  state.value.count = 2

  // change trigger કરે છે
  state.value = { count: 2 }
  ```

- **આ પણ જુઓ**
  - [ગાઇડ - મોટા Immutable Structures માટે Reactivity Overhead ઘટાડવો](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [ગાઇડ - External State Systems સાથે Integration](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## triggerRef() {#triggerref}

[Shallow ref](#shallowref) પર depend કરતા effects ને force trigger કરો. shallow ref ની inner value માં deep mutations કર્યા પછી ઉપયોગ થાય.

- **ટાઇપ (Type)**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **ઉદાહરણ (Example)**

  ```js
  const shallow = shallowRef({
    greet: 'Hello, world'
  })

  // પ્રથમ run-through માટે "Hello, world" log કરે
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // ref shallow હોવાથી effect trigger નહીં કરે
  shallow.value.greet = 'Hello, universe'

  // "Hello, universe" log કરે
  triggerRef(shallow)
  ```

## customRef() {#customref}

Dependency tracking અને updates triggering પર explicit control ધરાવતો customized ref create કરે.

- **ટાઇપ (Type)**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **વિગત (Details)**

  `customRef()` factory function ની અપેક્ષા રાખે, જે `track` અને `trigger` functions arguments તરીકે receive કરે અને `get` અને `set` methods ધરાવતો object return કરવો જોઈએ.

  સામાન્ય રીતે, `track()` `get()` અંદર call થવો જોઈએ, અને `trigger()` `set()` અંદર call થવો જોઈએ. જો કે, ક્યારે call થવા જોઈએ, અથવા call થવા જોઈએ કે નહીં તેના પર તમારું સંપૂર્ણ control છે.

- **ઉદાહરણ (Example)**

  Debounced ref create કરવું જે latest set call પછી ચોક્કસ timeout પછી જ value update કરે:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  ઘટકમાં ઉપયોગ:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [Playground માં અજમાવો](https://play.vuejs.org/#eNplUkFugzAQ/MqKC1SiIekxIpEq9QVV1BMXCguhBdsyaxqE/PcuGAhNfYGd3Z0ZDwzeq1K7zqB39OI205UiaJGMOieiapTUBAOYFt/wUxqRYf6OBVgotGzA30X5Bt59tX4iMilaAsIbwelxMfCvWNfSD+Gw3++fEhFHTpLFuCBsVJ0ScgUQjw6Az+VatY5PiroHo3IeaeHANlkrh7Qg1NBL43cILUmlMAfqVSXK40QUOSYmHAZHZO0KVkIZgu65kTnWp8Qb+4kHEXfjaDXkhd7DTTmuNZ7MsGyzDYbz5CgSgbdppOBFqqT4l0eX1gZDYOm057heOBQYRl81coZVg9LQWGr+IlrchYKAdJp9h0C6KkvUT3A6u8V1dq4ASqRgZnVnWg04/QWYNyYzC2rD5Y3/hkDgz8fY/cOT1ZjqizMZzGY3rDPC12KGZYyd3J26M8ny1KKx7c3X25q1c1wrZN3L9LCMWs/+AmeG6xI=)

  :::warning સાવધાનીથી ઉપયોગ કરો
  customRef ઉપયોગ કરતી વખતે, getter ની return value વિશે સાવચેત રહેવું, ખાસ કરીને જ્યારે getter ચાલે ત્યારે દર વખતે new object datatypes generate થાય. આ parent અને child ઘટકો વચ્ચેના relationship ને affect કરે, જ્યાં આવું customRef prop તરીકે pass થયું હોય.

  Parent ઘટકનું render function different reactive state ના changes દ્વારા trigger થઈ શકે. Rerender દરમિયાન, customRef ની value reevaluate થાય, child ઘટકને prop તરીકે new object datatype return કરે. આ prop child ઘટકમાં તેની last value સાથે compare થાય, અને કારણ different છે, child ઘટકમાં customRef ની reactive dependencies trigger થાય. meanwhile, parent ઘટકમાં reactive dependencies run થતા નથી કારણ customRef ના setter ને call કરવામાં આવ્યો ન હતો.

  [Playground માં જુઓ](https://play.vuejs.org/#eNqFVEtP3DAQ/itTS9Vm1ZCt1J6WBZUiDvTQIsoNcwiOkzU4tmU7+9Aq/71jO1mCWuhlN/PyfPP45kAujCk2HSdLsnLMCuPBcd+Zc6pEa7T1cADWOa/bW17nYMPPtvRsDT3UVrcww+DZ0flStybpKSkWQQqPU0IVVUwr58FYvdvDWXgpu6ek1pqSHL0fS0vJw/z0xbN1jUPHY/Ys87Zkzzl4K5qG2zmcnUN2oAqg4T6bQ/wENKNXNk+CxWKsSlmLTSk7XlhedYxnWclYDiK+MkQCoK4wnVtnIiBJuuEJNA2qPof7hzkEoc8DXgg9yzYTBBFgNr4xyY4FbaK2p6qfI0iqFgtgulOe27HyQRy69Dk1JXY9C03JIeQ6wg4xWvJCqFpnlNytOcyC2wzYulQNr0Ao+Mhw0KnTTEttl/CIaIJiMz8NGBHFtYetVrPwa58/IL48Zag4N0ssquNYLYBoW16J0vOkC3VQtVqk7cG9QcHz1kj0QAlgVYkNMFk6d0bJ1pbGYKUkmtD42HmvFfi94WhOEiXwjUnBnlEz9OLTJwy5qCo44D4O7en71SIFjI/F9VuG4jEy/GHQKq5hQrJAKOc4uNVighBF5/cygS0GgOMoK+HQb7+EWvLdMM7weVIJy5kXWi0Rj+xaNRhLKRp1IvB9hxYegA6WJ1xkUe9PcF4e9a+suA3YwYiC5MQ79KlFUzw5rZCZEUtoRWuE5PaXCXmxtuWIkpJSSr39EXXHQcWYNWfP/9A/uV3QUXJjueN2E1ZhtPnSIqGS+er3T77D76Ox1VUn0fsd4y3HfewCxuT2vVMVwp74RbTX8WQI1dy5qx12xI1Fpa1K5AreeEHCCN8q/QXul+LrSC3s4nh93jltkVPDIYt5KJkcIKStCReo4rVQ/CZI6dyEzToCCJu7hAtry/1QH/qXncQB400KJwqPxZHxEyona0xS/E3rt1m9Ld1rZl+uhaxecRtP3EjtgddCyimtXyj9H/Ii3eId7uOGTkyk/wOEbQ9h)

  :::

## shallowReactive() {#shallowreactive}

[`reactive()`](./reactivity-core#reactive) નું Shallow version.

- **ટાઇપ (Type)**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **વિગત (Details)**

  `reactive()` થી વિપરીત, deep conversion નથી: shallow reactive object માટે ફક્ત root-level properties reactive છે. Property values as-is store અને expose થાય - આનો અર્થ ref values ધરાવતી properties **auto unwrap નહીં** થાય.

  :::warning સાવધાનીથી ઉપયોગ કરો
  Shallow data structures ફક્ત ઘટકમાં root level state માટે ઉપયોગ થવા જોઈએ. Deep reactive object અંદર nesting ટાળો કારણ તે inconsistent reactivity behavior ધરાવતું tree create કરે જે સમજવું અને debug કરવું મુશ્કેલ હોઈ શકે.
  :::

- **ઉદાહરણ (Example)**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // state ની પોતાની properties mutate કરવી reactive છે
  state.foo++

  // ...પરંતુ nested objects convert નથી કરતું
  isReactive(state.nested) // false

  // reactive નથી
  state.nested.bar++
  ```

## shallowReadonly() {#shallowreadonly}

[`readonly()`](./reactivity-core#readonly) નું Shallow version.

- **ટાઇપ (Type)**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **વિગત (Details)**

  `readonly()` થી વિપરીત, deep conversion નથી: ફક્ત root-level properties readonly બનાવાય. Property values as-is store અને expose થાય - આનો અર્થ ref values ધરાવતી properties **auto unwrap નહીં** થાય.

  :::warning સાવધાનીથી ઉપયોગ કરો
  Shallow data structures ફક્ત ઘટકમાં root level state માટે ઉપયોગ થવા જોઈએ. Deep reactive object અંદર nesting ટાળો કારણ તે inconsistent reactivity behavior ધરાવતું tree create કરે જે સમજવું અને debug કરવું મુશ્કેલ હોઈ શકે.
  :::

- **ઉદાહરણ (Example)**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // state ની પોતાની properties mutate કરવું fail થશે
  state.foo++

  // ...પરંતુ nested objects પર કામ કરે
  isReadonly(state.nested) // false

  // કામ કરે
  state.nested.bar++
  ```

## toRaw() {#toraw}

Vue-created proxy ના raw, original object return કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **વિગત (Details)**

  `toRaw()` [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](#shallowreactive) અથવા [`shallowReadonly()`](#shallowreadonly) દ્વારા created proxies માંથી original object return કરી શકે.

  આ escape hatch છે જેનો ઉપયોગ proxy access / tracking overhead વિના temporarily read કરવા અથવા changes trigger કર્યા વિના write કરવા થઈ શકે. Original object નો persistent reference રાખવાની ભલામણ **નથી**. સાવધાનીથી ઉપયોગ કરો.

- **ઉદાહરણ (Example)**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw() {#markraw}

Object ને mark કરે છે જેથી તે ક્યારેય proxy માં convert ન થાય. Object પોતે return કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **ઉદાહરણ (Example)**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // અન્ય reactive objects અંદર nested હોય ત્યારે પણ કામ કરે
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning સાવધાનીથી ઉપયોગ કરો
  `markRaw()` અને `shallowReactive()` જેવા shallow APIs default deep reactive/readonly conversion માંથી selectively opt-out કરવાની અને state graph માં raw, non-proxied objects embed કરવાની મંજૂરી આપે. વિવિધ કારણોસર ઉપયોગ કરી શકાય:

  - કેટલાક values reactive ન બનવા જોઈએ, ઉદાહરણ complex 3rd party class instance, અથવા Vue component object.

  - Immutable data sources સાથે મોટી lists render કરતી વખતે proxy conversion skip કરવાથી performance improvements મળે.

  તેઓ advanced માનવામાં આવે કારણ raw opt-out ફક્ત root level પર છે, તેથી જો nested, non-marked raw object reactive object માં set કરો અને ફરીથી access કરો, તો proxied version પાછું મળે. આ **identity hazards** તરફ દોરી શકે - i.e. object identity પર depend કરતી operation perform કરવી પરંતુ same object ના raw અને proxied version બંને ઉપયોગ કરવા:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // `foo` raw તરીકે marked છે, foo.nested નથી.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  Identity hazards સામાન્ય રીતે rare છે. જો કે, identity hazards ને safely avoid કરતા આ APIs ને properly utilize કરવા reactivity system કેવી રીતે કામ કરે તેની solid understanding જરૂરી છે.

  :::

## effectScope() {#effectscope}

Effect scope object create કરે જે તેમાં created reactive effects (i.e. computed અને watchers) capture કરી શકે જેથી આ effects ને together dispose કરી શકાય. આ API ના detailed use cases માટે, તેના corresponding [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md) જુઓ.

- **ટાઇપ (Type)**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // scope inactive હોય તો undefined
    stop(): void
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // scope ના તમામ effects dispose કરવા
  scope.stop()
  ```

## getCurrentScope() {#getcurrentscope}

વર્તમાન active [effect scope](#effectscope) return કરે જો હોય.

- **ટાઇપ (Type)**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose() {#onscopedispose}

વર્તમાન active [effect scope](#effectscope) પર dispose callback register કરે. Associated effect scope stop થાય ત્યારે callback invoke થશે.

Reusable composition functions માં `onUnmounted` ના non-component-coupled replacement તરીકે ઉપયોગ કરી શકાય, કારણ દરેક Vue ઘટકનું `setup()` function effect scope માં invoke થાય.

Active effect scope વિના આ function call થાય તો warning throw થશે. 3.5+ માં, second argument તરીકે `true` pass કરીને warning suppress કરી શકાય.

- **ટાઇપ (Type)**

  ```ts
  function onScopeDispose(fn: () => void, failSilently?: boolean): void
  ```
