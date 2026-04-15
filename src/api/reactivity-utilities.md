# Reactivity API: યુટિલિટીઝ (Utilities) {#reactivity-api-utilities}

## isRef() {#isref}

ચકાસે છે કે value ref object છે કે નહીં.

- **ટાઇપ (Type)**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  નોંધ કરો કે return type [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) છે, જેનો અર્થ `isRef` ને type guard તરીકે ઉપયોગ કરી શકાય:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // foo નો type Ref<unknown> સુધી narrowed છે
    foo.value
  }
  ```

## unref() {#unref}

જો argument ref હોય તો inner value return કરે છે, નહીંતર argument પોતે return કરે. `val = isRef(val) ? val.value : val` માટે sugar function.

- **ટાઇપ (Type)**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **ઉદાહરણ (Example)**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // unwrapped હવે ચોક્કસપણે number છે
  }
  ```

## toRef() {#toref}

Values / refs / getters ને refs માં normalize કરવા ઉપયોગ કરી શકાય (3.3+).

Source reactive object ની property માટે ref બનાવવા માટે પણ ઉપયોગ કરી શકાય. Created ref તેની source property સાથે synced છે: source property ને mutate કરવાથી ref update થશે, અને ઊલટું.

- **ટાઇપ (Type)**

  ```ts
  // normalization signature (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // object property signature
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **ઉદાહરણ (Example)**

  Normalization signature (3.3+):

  ```js
  // existed refs ને as-is return કરે
  toRef(existingRef)

  // readonly ref બનાવે જે .value access પર getter call કરે
  toRef(() => props.foo)

  // non-function values માંથી normal refs બનાવે
  // ref(1) ના સમકક્ષ
  toRef(1)
  ```

  Object property signature:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // two-way ref જે original property સાથે sync થાય
  const fooRef = toRef(state, 'foo')

  // ref ને mutate કરવાથી original update થાય
  fooRef.value++
  console.log(state.foo) // 2

  // original ને mutate કરવાથી ref પણ update થાય
  state.foo++
  console.log(fooRef.value) // 3
  ```

  નોંધ કરો કે આ નીચેનાથી અલગ છે:

  ```js
  const fooRef = ref(state.foo)
  ```

  ઉપરોક્ત ref `state.foo` સાથે sync **નથી**, કારણ કે `ref()` plain number value receive કરે છે.

  `toRef()` ઉપયોગી છે જ્યારે તમે prop નો ref composable function ને pass કરવા માંગો:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // `props.foo` ને ref માં convert કરો, પછી
  // composable ને pass કરો
  useSomeFeature(toRef(props, 'foo'))

  // getter syntax - 3.3+ માં ભલામણ
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  જ્યારે `toRef` component props સાથે ઉપયોગ થાય, ત્યારે props ને mutate કરવા આસપાસના સામાન્ય restrictions હજુ apply થાય. Ref ને નવી value assign કરવાનો પ્રયાસ prop ને directly modify કરવાના સમકક્ષ છે અને allowed નથી. તે scenario માં `get` અને `set` સાથે [`computed`](./reactivity-core#computed) ઉપયોગ કરવાનું વિચારો. વધુ માહિતી માટે [components સાથે `v-model` ઉપયોગ કરવા](/guide/components/v-model) ગાઇડ જુઓ.

  Object property signature ઉપયોગ કરતી વખતે, `toRef()` ઉપયોગી ref return કરશે ભલે source property હાલમાં exist ન કરતી હોય. આ optional properties સાથે કામ કરવાનું શક્ય બનાવે છે, જે [`toRefs`](#torefs) દ્વારા pick up ન થાય.

## toValue() {#tovalue}

- માત્ર 3.3+ માં સપોર્ટેડ

Values / refs / getters ને values માં normalize કરે છે. [unref()](#unref) જેવું જ છે, સિવાય કે તે getters ને પણ normalize કરે. જો argument getter હોય, તો તેને invoke કરવામાં આવશે અને તેની return value return થશે.

[Composables](/guide/reusability/composables.html) માં argument ને normalize કરવા ઉપયોગ કરી શકાય જે value, ref, અથવા getter હોઈ શકે.

- **ટાઇપ (Type)**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **ઉદાહરણ (Example)**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  Composables માં arguments normalize કરવા:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // id changes ને react કરો
    })
  }

  // આ composable નીચેનામાંથી કોઈપણ support કરે:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

Reactive object ને plain object માં convert કરે છે જ્યાં resulting object ની દરેક property original object ની corresponding property ને point કરતું ref છે. દરેક individual ref [`toRef()`](#toref) ઉપયોગ કરીને created છે.

- **ટાઇપ (Type)**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **ઉદાહરણ (Example)**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  stateAsRefs નો Type: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // ref અને original property "linked" છે
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs` composable function માંથી reactive object return કરતી વખતે ઉપયોગી છે જેથી consuming ઘટક reactivity ગુમાવ્યા વિના returned object ને destructure/spread કરી શકે:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...state પર operate કરતું logic

    // return કરતી વખતે refs માં convert કરો
    return toRefs(state)
  }

  // reactivity ગુમાવ્યા વિના destructure કરી શકાય
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` ફક્ત source object પર call time માં enumerable હોય તેવી properties માટે refs generate કરશે. હજુ exist ન કરતી property માટે ref બનાવવા, [`toRef`](#toref) ઉપયોગ કરો.

## isProxy() {#isproxy}

ચકાસે છે કે object [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) અથવા [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) દ્વારા created proxy છે કે નહીં.

- **ટાઇપ (Type)**

  ```ts
  function isProxy(value: any): boolean
  ```

## isReactive() {#isreactive}

ચકાસે છે કે object [`reactive()`](./reactivity-core#reactive) અથવા [`shallowReactive()`](./reactivity-advanced#shallowreactive) દ્વારા created proxy છે કે નહીં.

- **ટાઇપ (Type)**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

ચકાસે છે કે passed value readonly object છે કે નહીં. Readonly object ની properties બદલી શકાય, પરંતુ passed object દ્વારા directly assign ન કરી શકાય.

[`readonly()`](./reactivity-core#readonly) અને [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) દ્વારા created proxies બંને readonly માનવામાં આવે, તેમ જ `set` function વિનાનો [`computed()`](./reactivity-core#computed) ref.

- **ટાઇપ (Type)**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
