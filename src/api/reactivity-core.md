# રિએક્ટિવિટી API: મુખ્ય (Core) {#reactivity-api-core}

:::info આ પણ જુઓ
રિએક્ટિવિટી APIs ને વધુ સારી રીતે સમજવા માટે, માર્ગદર્શિકામાં નીચેના પ્રકરણો વાંચવાની ભલામણ કરવામાં આવે છે:

- [રિએક્ટિવિટી ફંડામેન્ટલ્સ](/guide/essentials/reactivity-fundamentals) (API પ્રેફરન્સ Composition API પર સેટ કરીને)
- [રિએક્ટિવિટી ઊંડાણમાં](/guide/extras/reactivity-in-depth)
  :::

## ref() {#ref}

આંતરિક વેલ્યુ લે છે અને રિએક્ટિવ અને મ્યુટેબલ (mutable) રેફ ઓબ્જેક્ટ પરત કરે છે, જેમાં સિંગલ પ્રોપર્ટી `.value` હોય છે જે આંતરિક વેલ્યુ તરફ નિર્દેશ કરે છે.

- **પ્રકાર (Type)**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **વિગતો (Details)**

  રેફ ઓબ્જેક્ટ મ્યુટેબલ છે - એટલે કે તમે `.value` ને નવી વેલ્યુઝ અસાઇન કરી શકો છો. તે રિએક્ટિવ પણ છે - એટલે કે `.value` પરના કોઈપણ રીડ (read) ઓપરેશન્સને ટ્રેક કરવામાં આવે છે, અને રાઈટ (write) ઓપરેશન્સ તેનાથી જોડાયેલ ઇફેક્ટ્સને ટ્રિગર કરશે.

  જો કોઈ ઓબ્જેક્ટ રેફની વેલ્યુ તરીકે અસાઇન કરવામાં આવે છે, તો તે ઓબ્જેક્ટ [reactive()](#reactive) દ્વારા ડીપલી રિએક્ટિવ બનાવવામાં આવે છે. આનો અર્થ એ પણ છે કે જો ઓબ્જેક્ટમાં નેસ્ટેડ (nested) રેફ્સ હોય, તો તે ડીપલી અનરેપ્ડ (unwrapped) થઈ જશે.

  ડીપ કન્વર્ઝન (deep conversion) ટાળવા માટે, તેના બદલે [`shallowRef()`](./reactivity-advanced#shallowref) નો ઉપયોગ કરો.

- **ઉદાહરણ (Example)**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **આ પણ જુઓ**
  - [માર્ગદર્શિકા - `ref()` સાથે રિએક્ટિવિટીના પાયાના સિદ્ધાંતો](/guide/essentials/reactivity-fundamentals#ref)
  - [માર્ગદર્શિકા - `ref()` ટાઇપિંગ](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

## computed() {#computed}

એક [ગેટર ફંક્શન (getter function)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) લે છે અને ગેટરમાંથી મળેલી વેલ્યુ માટે રીડ-ઓન્લી (readonly) રિએક્ટિવ [ref](#ref) ઓબ્જેક્ટ પરત કરે છે. તે રાઈટેબલ (writable) રેફ ઓબ્જેક્ટ બનાવવા માટે `get` અને `set` ફંક્શન્સ સાથેનો ઓબ્જેક્ટ પણ લઈ શકે છે.

- **પ્રકાર (Type)**

  ```ts
  // read-only
  function computed<T>(
    getter: (oldValue: T | undefined) => T,
    // નીચે "Computed Debugging" લિંક જુઓ
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // writable
  function computed<T>(
    options: {
      get: (oldValue: T | undefined) => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **ઉદાહરણ (Example)**

  રીડ-ઓન્લી (readonly) કમ્પ્યુટેડ રેફ બનાવવું:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error (ભૂલ)
  ```

  રાઈટેબલ (writable) કમ્પ્યુટેડ રેફ બનાવવું:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  ડીબગીંગ (Debugging):

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **આ પણ જુઓ**
  - [માર્ગદર્શિકા - કમ્પ્યુટેડ પ્રોપર્ટીઝ](/guide/essentials/computed)
  - [માર્ગદર્શિકા - કમ્પ્યુટેડ ડીબગીંગ](/guide/extras/reactivity-in-depth#computed-debugging)
  - [માર્ગદર્શિકા - `computed()` ટાઇપિંગ](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />
  - [માર્ગદર્શિકા - પર્ફોર્મન્સ - કમ્પ્યુટેડ સ્ટેબિલિટી](/guide/best-practices/performance#computed-stability)

## reactive() {#reactive}

ઓબ્જેક્ટનો રિએક્ટિવ પ્રોક્સી (proxy) પરત કરે છે.

- **પ્રકાર (Type)**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **વિગતો (Details)**

  રિએક્ટિવ કન્વર્ઝન "ડીપ" છે: તે તમામ નેસ્ટેડ પ્રોપર્ટીઝને અસર કરે છે. રિએક્ટિવ ઓબ્જેક્ટ રિએક્ટિવિટી જાળવી રાખતી વખતે [refs](#ref) હોય તેવી કોઈપણ પ્રોપર્ટીઝને પણ ડીપલી અનરેપ્ડ કરે છે.

  એ પણ નોંધ લેવી જોઈએ કે જ્યારે રેફને રિએક્ટિવ એરેના એલિમેન્ટ અથવા `Map` જેવા નેટિવ કલેક્શન ટાઇપ તરીકે એક્સેસ કરવામાં આવે છે ત્યારે કોઈ રેફ અનરેપિંગ કરવામાં આવતું નથી.

  ડીપ કન્વર્ઝન ટાળવા માટે અને માત્ર રૂટ લેવલ પર રિએક્ટિવિટી જાળવી રાખવા માટે, તેના બદલે [shallowReactive()](./reactivity-advanced#shallowreactive) નો ઉપયોગ કરો.

  પરત કરેલ ઓબ્જેક્ટ અને તેના નેસ્ટેડ ઓબ્જેક્ટ્સ [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) સાથે લપેટાયેલા (wrapped) હોય છે અને મૂળ ઓબ્જેક્ટ્સની બરાબર **નથી**. ફક્ત રિએક્ટિવ પ્રોક્સી સાથે કામ કરવાની અને મૂળ ઓબ્જેક્ટ પર આધાર રાખવાનું ટાળવાની ભલામણ કરવામાં આવે છે.

- **ઉદાહરણ (Example)**

  રિએક્ટિવ ઓબ્જેક્ટ બનાવવું:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  રેફ અનરેપિંગ (Ref unwrapping):

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // રેફ અનરેપ્ડ થઈ જશે
  console.log(obj.count === count.value) // true

  // તે `obj.count` ને અપડેટ કરશે
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // તે `count` રેફને પણ અપડેટ કરશે
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  નોંધ કરો કે જ્યારે એરે અથવા કલેક્શન એલિમેન્ટ્સ તરીકે એક્સેસ કરવામાં આવે ત્યારે રેફ્સ અનરેપ્ડ થતા **નથી**:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // અહીં .value ની જરૂર છે
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // અહીં .value ની જરૂર છે
  console.log(map.get('count').value)
  ```

  જ્યારે [ref](#ref) ને `reactive` પ્રોપર્ટીમાં અસાઇન કરવામાં આવે છે, ત્યારે તે રેફ પણ આપમેળે અનરેપ્ડ થઈ જશે:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **આ પણ જુઓ**
  - [માર્ગદર્શિકા - રિએક્ટિવિટીના પાયાના સિદ્ધાંતો](/guide/essentials/reactivity-fundamentals)
  - [માર્ગદર્શિકા - `reactive()` ટાઇપિંગ](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## readonly() {#readonly}

કોઈ ઓબ્જેક્ટ (રિએક્ટિવ અથવા સાદો) અથવા [ref](#ref) લે છે અને મૂળનો રીડ-ઓન્લી પ્રોક્સી પરત કરે છે.

- **પ્રકાર (Type)**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **વિગતો (Details)**

  રીડ-ઓન્લી (readonly) પ્રોક્સી ડીપ હોય છે: કોઈપણ એક્સેસ કરેલ નેસ્ટેડ પ્રોપર્ટી પણ રીડ-ઓન્લી હશે. તેમાં `reactive()` જેવું જ રેફ-અનરેપિંગ વર્તન પણ છે, સિવાય કે અનરેપ્ડ વેલ્યુઝને પણ રીડ-ઓન્લી બનાવવામાં આવશે.

  ડીપ કન્વર્ઝન ટાળવા માટે, તેના બદલે [shallowReadonly()](./reactivity-advanced#shallowreadonly) નો ઉપયોગ કરો.

- **ઉદાહરણ (Example)**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // રિએક્ટિવિટી ટ્રેકિંગ માટે કામ કરે છે
    console.log(copy.count)
  })

  // મૂળમાં ફેરફાર કરવાથી કોપી પર આધાર રાખતા વોચર્સ ટ્રિગર થશે
  original.count++

  // કોપીમાં ફેરફાર કરવાનો પ્રયાસ નિષ્ફળ જશે અને પરિણામે ચેતવણી (warning) આવશે
  copy.count++ // warning!
  ```

## watchEffect() {#watcheffect}

ફંક્શનને તરત જ ચલાવે છે જ્યારે તેની ડિપેન્ડન્સીસને રિએક્ટિવિટીથી ટ્રેક કરે છે અને જ્યારે પણ ડિપેન્ડન્સીસ બદલાય છે ત્યારે તેને ફરીથી ચલાવે છે.

- **પ્રકાર (Type)**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): WatchHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // ડિફોલ્ટ: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  interface WatchHandle {
    (): void // કૉલ કરી શકાય તેવું, `stop` જેવું જ
    pause: () => void
    resume: () => void
    stop: () => void
  }
  ```

- **વિગતો (Details)**

  પ્રથમ આર્ગ્યુમેન્ટ ચલાવવાનું ઇફેક્ટ (effect) ફંક્શન છે. ઇફેક્ટ ફંક્શન એક ફંક્શન મેળવે છે જેનો ઉપયોગ ક્લીનઅપ કોલબેક (cleanup callback) રજીસ્ટર કરવા માટે થઈ શકે છે. ક્લીનઅપ કોલબેક આગલી વખતે ઇફેક્ટ ફરીથી ચલાવવામાં આવે તે પહેલાં તરત જ બોલાવવામાં આવશે, અને તેનો ઉપયોગ અમાન્ય સાઇડ ઇફેક્ટ્સને સાફ કરવા માટે થઈ શકે છે, દા.ત. પેન્ડિંગ અસિંક રિક્વેસ્ટ (નીચે ઉદાહરણ જુઓ).

  બીજી આર્ગ્યુમેન્ટ એ વૈકલ્પિક ઓપ્શન્સ ઓબ્જેક્ટ છે જેનો ઉપયોગ ઇફેક્ટના ફ્લશ ટાઇમિંગ (flush timing) ને સમાયોજિત કરવા અથવા ઇફેક્ટની ડિપેન્ડન્સીસને ડીબગ કરવા માટે થઈ શકે છે.

  ડિફોલ્ટ રૂપે, વોચર્સ ઘટક રેન્ડરિંગના બરાબર પહેલા ચાલશે. `flush: 'post'` સેટ કરવાથી ઘટક રેન્ડરિંગ પછી વોચર મોકૂફ રહેશે. વધુ માહિતી માટે [કોલબેક ફ્લશ ટાઇમિંગ](/guide/essentials/watchers#callback-flush-timing) જુઓ. દુર્લભ કિસ્સાઓમાં, જ્યારે રિએક્ટિવ ડિપેન્ડન્સી બદલાય ત્યારે તરત જ વોચર ટ્રિગર કરવું જરૂરી હોઈ શકે છે, દા.ત. કેશ (cache) ને અમાન્ય કરવા માટે. આ `flush: 'sync'` નો ઉપયોગ કરીને પ્રાપ્ત કરી શકાય છે. જો કે, આ સેટિંગનો ઉપયોગ સાવધાની સાથે થવો જોઈએ, કારણ કે જો એક જ સમયે અનેક પ્રોપર્ટીઝ અપડેટ કરવામાં આવી રહી હોય તો તે પર્ફોર્મન્સ અને ડેટા સુસંગતતાની સમસ્યાઓ તરફ દોરી શકે છે.

  પરત કરવામાં આવેલી વેલ્યુ એ હેન્ડલ ફંક્શન છે જેને ઇફેક્ટ ફરીથી ચાલતી અટકાવવા માટે કોલ કરી શકાય છે.

- **ઉદાહરણ (Example)**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  વોચરને રોકવું (Stopping the watcher):

  ```js
  const stop = watchEffect(() => {})

  // જ્યારે વોચરની હવે જરૂર ન હોય:
  stop()
  ```

  વોચરને વિરામ (pause) આપવો / પુનઃપ્રારંભ (resume) કરવો: <sup class="vt-badge" data-text="3.5+" />

  ```js
  const { stop, pause, resume } = watchEffect(() => {})

  // કામચલાઉ રીતે વોચરને વિરામ આપો
  pause()

  // પછીથી પુનઃપ્રારંભ કરો
  resume()

  // રોકો
  stop()
  ```

  સાઇડ ઇફેક્ટ ક્લીનઅપ (Side effect cleanup):

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // જો `id` બદલાય તો `cancel` ને કોલ કરવામાં આવશે,
    // જો પાછલી વિનંતી હજુ સુધી પૂર્ણ થઈ ન હોય તો તેને રદ કરશે
    onCleanup(cancel)
    data.value = await response
  })
  ```

  ૩.૫+ માં સાઇડ ઇફેક્ટ ક્લીનઅપ:

  ```js
  import { onWatcherCleanup } from 'vue'

  watchEffect(async () => {
    const { response, cancel } = doAsyncWork(newId)
    // જો `id` બદલાય તો `cancel` ને કોલ કરવામાં આવશે,
    // જો પાછલી વિનંતી હજુ સુધી પૂર્ણ થઈ ન હોય તો તેને રદ કરશે
    onWatcherCleanup(cancel)
    data.value = await response
  })
  ```

  ઓપ્શન્સ (Options):

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **આ પણ જુઓ**
  - [માર્ગદર્શિકા - વોચર્સ](/guide/essentials/watchers#watcheffect)
  - [માર્ગદર્શિકા - વોચર ડીબગીંગ](/guide/extras/reactivity-in-depth#watcher-debugging)

## watchPostEffect() {#watchposteffect}

`flush: 'post'` ઓપ્શન સાથે [`watchEffect()`](#watcheffect) નું ઉપનામ (Alias).

## watchSyncEffect() {#watchsynceffect}

`flush: 'sync'` ઓપ્શન સાથે [`watchEffect()`](#watcheffect) નું ઉપનામ (Alias).

## watch() {#watch}

એક અથવા વધુ રિએક્ટિવ ડેટા સોર્સને મોનિટર કરે છે અને જ્યારે સોર્સ બદલાય ત્યારે કોલબેક ફંક્શનને બોલાવે છે.

- **પ્રકાર (Type)**

  ```ts
  // સિંગલ સોર્સ મોનિટરિંગ
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): WatchHandle

  // મલ્ટિપલ સોર્સ મોનિટરિંગ
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): WatchHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | (T extends object ? T : never) // reactive object

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // ડિફોલ્ટ: false
    deep?: boolean | number // ડિફોલ્ટ: false
    flush?: 'pre' | 'post' | 'sync' // ડિફોલ્ટ: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
    once?: boolean // ડિફોલ્ટ: false (3.4+)
  }

  interface WatchHandle {
    (): void // કોલ કરી શકાય તેવું, `stop` જેવું જ
    pause: () => void
    resume: () => void
    stop: () => void
  }
  ```

  > વાંચવાની સરળતા માટે પ્રકારો (Types) સરળ બનાવવામાં આવ્યા છે.

- **વિગતો (Details)**

  `watch()` ડિફોલ્ટ રૂપે લેઝી (lazy) છે - એટલે કે જ્યારે મોનિટર કરેલ સોર્સ બદલાય ત્યારે જ કોલબેક બોલાવવામાં આવે છે.

  પ્રથમ આર્ગ્યુમેન્ટ વોચરનું **સોર્સ (source)** છે. સોર્સ નીચેનામાંથી એક હોઈ શકે છે:

  - ગેટર ફંક્શન કે જે વેલ્યુ પરત કરે છે
  - એક રેફ (ref)
  - એક રિએક્ટિવ ઓબ્જેક્ટ
  - ...અથવા ઉપરનાનો એક એરે.

  બીજી આર્ગ્યુમેન્ટ એ કોલબેક છે જે સોર્સ બદલાય ત્યારે બોલાવવામાં આવશે. કોલબેક ત્રણ આર્ગ્યુમેન્ટ્સ મેળવે છે: નવી વેલ્યુ, જૂની વેલ્યુ, અને સાઇડ ઇફેક્ટ ક્લીનઅપ કોલબેક રજીસ્ટર કરવા માટેનું ફંક્શન. ક્લીનઅપ કોલબેક આગલી વખતે ઇફેક્ટ ફરીથી ચલાવવામાં આવે તે પહેલાં તરત જ બોલાવવામાં આવશે, અને તેનો ઉપયોગ અમાન્ય સાઇડ ઇફેક્ટ્સને સાફ કરવા માટે થઈ શકે છે, દા.ત. પેન્ડિંગ અસિંક રિક્વેસ્ટ.

  જ્યારે મલ્ટિપલ સોર્સને મોનિટર કરવામાં આવે છે, ત્યારે કોલબેક સોર્સ એરેને અનુરૂપ નવી / જૂની વેલ્યુઝ ધરાવતા બે એરે મેળવે છે.

  ત્રીજી આર્ગ્યુમેન્ટ એક ઓપ્શન્સ ઓબ્જેક્ટ છે જે નીચેના ઓપ્શન્સને સપોર્ટ કરે છે:

  - **`immediate`**: વોચર બનાવતી વખતે તરત જ કોલબેક ટ્રિગર કરો. પ્રથમ કોલ પર જૂની વેલ્યુ `undefined` હશે.
  - **`deep`**: જો સોર્સ ઓબ્જેક્ટ હોય તો તેનું ડીપ ટ્રાવર્સલ (deep traversal) ફરજિયાત કરો, જેથી કોલબેક ડીપ મ્યુટેશન્સ પર ફાયર થાય. ૩.૫+ માં, આ મહત્તમ ટ્રાવર્સલ ઊંડાઈ દર્શાવતી સંખ્યા પણ હોઈ શકે છે. જુઓ [ડીપ વોચર્સ](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: કોલબેકના ફ્લશ ટાઇમિંગને એડજસ્ટ કરો. જુઓ [કોલબેક ફ્લશ ટાઇમિંગ](/guide/essentials/watchers#callback-flush-timing) અને [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: વોચરની ડિપેન્ડન્સીસને ડીબગ કરો. જુઓ [વોચર ડીબગીંગ](/guide/extras/reactivity-in-depth#watcher-debugging).
  - **`once`**: (૩.૪+) કોલબેક માત્ર એક જ વાર ચલાવો. પ્રથમ કોલબેક રન પછી વોચર આપમેળે બંધ થઈ જાય છે.

  [`watchEffect()`](#watcheffect) ની સરખામણીમાં, `watch()` અમને આની મંજૂરી આપે છે:

  - સાઇડ ઇફેક્ટ લેઝી રીતે (lazily) કરવી;
  - કઈ સ્ટેટે વોચરને ફરીથી ચલાવવા માટે ટ્રિગર કરવું જોઈએ તે વિશે વધુ ચોક્કસ રહો;
  - મોનિટર કરેલ સ્ટેટની પાછલી અને વર્તમાન બંને વેલ્યુ એક્સેસ કરો.

- **ઉદાહરણ (Example)**

  ગેટરને મોનિટર કરવું:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  રેફને મોનિટર કરવો:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  જ્યારે મલ્ટિપલ સોર્સને મોનિટર કરવામાં આવે છે, ત્યારે કોલબેક સોર્સ એરેને અનુરૂપ નવી / જૂની વેલ્યુઝ ધરાવતા એરે મેળવે છે:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  ગેટર સોર્સનો ઉપયોગ કરતી વખતે, જો ગેટરની વેલ્યુ બદલાય તો જ વોચર ફાયર થાય છે. જો તમે ઈચ્છો છો કે કોલબેક ડીપ મ્યુટેશન્સ પર પણ ફાયર થાય, તો તમારે `{ deep: true }` સાથે વોચરને સ્પષ્ટપણે ડીપ મોડમાં લાવવાની જરૂર છે. નોંધ લો કે ડીપ મોડમાં, જો કોલબેક ડીપ મ્યુટેશન દ્વારા ટ્રિગર કરવામાં આવ્યું હોય તો નવી વેલ્યુ અને જૂની વેલ્યુ સમાન ઓબ્જેક્ટ હશે:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  જ્યારે રિએક્ટિવ ઓબ્જેક્ટને સીધું મોનિટર કરવામાં આવે છે, ત્યારે વોચર આપમેળે ડીપ મોડમાં હોય છે:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* સ્ટેટમાં ડીપ મ્યુટેશન પર ટ્રિગર થાય છે */
  })
  ```

  `watch()` એ [`watchEffect()`](#watcheffect) સાથે સમાન ફ્લશ ટાઇમિંગ અને ડીબગીંગ ઓપ્શન્સ શેર કરે છે:

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  વોચરને રોકવું (Stopping the watcher):

  ```js
  const stop = watch(source, callback)

  // જ્યારે વોચરની હવે જરૂર ન હોય:
  stop()
  ```

  વોચરને વિરામ (pause) આપવો / પુનઃપ્રારંભ (resume) કરવો: <sup class="vt-badge" data-text="3.5+" />

  ```js
  const { stop, pause, resume } = watch(() => {})

  // કામચલાઉ રીતે વોચરને વિરામ આપો
  pause()

  // પછીથી પુનઃપ્રારંભ કરો
  resume()

  // રોકો
  stop()
  ```

  સાઇડ ઇફેક્ટ ક્લીનઅપ (Side effect cleanup):

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // જો `id` બદલાય તો `cancel` ને કોલ કરવામાં આવશે,
    // જો પાછલી વિનંતી હજુ સુધી પૂર્ણ થઈ ન હોય તો તેને રદ કરશે
    onCleanup(cancel)
    data.value = await response
  })
  ```

  ૩.૫+ માં સાઇડ ઇફેક્ટ ક્લીનઅપ:

  ```js
  import { onWatcherCleanup } from 'vue'

  watch(id, async (newId) => {
    const { response, cancel } = doAsyncWork(newId)
    onWatcherCleanup(cancel)
    data.value = await response
  })
  ```

- **આ પણ જુઓ**

  - [માર્ગદર્શિકા - વોચર્સ](/guide/essentials/watchers)
  - [માર્ગદર્શિકા - વોચર ડીબગીંગ](/guide/extras/reactivity-in-depth#watcher-debugging)

## onWatcherCleanup() <sup class="vt-badge" data-text="3.5+" /> {#onwatchercleanup}

જ્યારે વર્તમાન વૉચર ફરીથી ચલાવવામાં આવશે ત્યારે એક્ઝિક્યુટ કરવા માટે ક્લીનઅપ ફંક્શન રજીસ્ટર કરો. ફક્ત `watchEffect` ઇફેક્ટ ફંક્શન અથવા `watch` કોલબેક ફંક્શનના સિંક્રોનસ એક્ઝિક્યુશન દરમિયાન જ કોલ કરી શકાય છે (એટલે કે તેને અસિંક ફંક્શનમાં `await` સ્ટેટમેન્ટ પછી કોલ કરી શકાતું નથી.)

- **પ્રકાર (Type)**

  ```ts
  function onWatcherCleanup(
    cleanupFn: () => void,
    failSilently?: boolean
  ): void
  ```

- **ઉદાહરણ (Example)**

  ```ts
  import { watch, onWatcherCleanup } from 'vue'

  watch(id, (newId) => {
    const { response, cancel } = doAsyncWork(newId)
    // જો `id` બદલાય તો `cancel` ને કોલ કરવામાં આવશે,
    // જો પાછલી વિનંતી હજુ સુધી પૂર્ણ થઈ ન હોય તો તેને રદ કરશે
    onWatcherCleanup(cancel)
  })
  ```
