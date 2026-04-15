# ઓપ્શન્સ: સ્ટેટ (Options: State) {#options-state}

## data {#data}

એક ફંક્શન જે ઘટક ઇન્સ્ટન્સ માટે પ્રારંભિક રિએક્ટિવ સ્ટેટ (reactive state) રિટર્ન કરે છે.

- **Type**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **વિગત (Details)**

  ફંક્શન દ્વારા સાદો JavaScript ઓબ્જેક્ટ રિટર્ન થવાની અપેક્ષા રાખવામાં આવે છે, જેને Vue દ્વારા રિએક્ટિવ બનાવવામાં આવશે. ઇન્સ્ટન્સ બનાવ્યા પછી, રિએક્ટિવ ડેટા ઓબ્જેક્ટને `this.$data` તરીકે એક્સેસ કરી શકાય છે. ઘટક ઇન્સ્ટન્સ ડેટા ઓબ્જેક્ટ પર મળેલી તમામ પ્રોપર્ટીઝને પ્રોક્સી (proxies) પણ કરે છે, તેથી `this.a` એ `this.$data.a` ની સમકક્ષ હશે.

  તમામ ટોપ-લેવલ ડેટા પ્રોપર્ટીઝ રિટર્ન કરાયેલા ડેટા ઓબ્જેક્ટમાં શામેલ હોવી જોઈએ. `this.$data` માં નવી પ્રોપર્ટીઝ ઉમેરવી શક્ય છે, પરંતુ તેની ભલામણ કરવામાં આવતી **નથી**. જો પ્રોપર્ટીની ઈચ્છિત કિંમત હજુ ઉપલબ્ધ ન હોય તો Vue ને ખબર પડે કે પ્રોપર્ટી અસ્તિત્વમાં છે તે સુનિશ્ચિત કરવા માટે પ્લેસહોલ્ડર (placeholder) તરીકે `undefined` અથવા `null` જેવી ખાલી કિંમત શામેલ કરવી જોઈએ.

  `_` અથવા `$` થી શરૂ થતી પ્રોપર્ટીઝ ઘટક ઇન્સ્ટન્સ પર પ્રોક્સી કરવામાં આવશે **નહીં** કારણ કે તે Vue ની ઇન્ટરનલ પ્રોપર્ટીઝ અને API મેથડ્સ સાથે વિરોધાભાસ પેદા કરી શકે છે. તમારે તેમને `this.$data._property` તરીકે એક્સેસ કરવી પડશે.

  બ્રાઉઝર API ઓબ્જેક્ટ્સ અને પ્રોટોટાઇપ પ્રોપર્ટીઝ જેવા તેમના પોતાના સ્ટેટફુલ બિહેવિયર (stateful behavior) ધરાવતા ઓબ્જેક્ટ્સ રિટર્ન કરવાની ભલામણ કરવામાં આવતી **નથી**. રિટર્ન કરેલ ઓબ્જેક્ટ આદર્શ રીતે સાદો ઓબ્જેક્ટ હોવો જોઈએ જે માત્ર ઘટકની સ્થિતિનું પ્રતિનિધિત્વ કરે છે.

- **Example**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  નોંધ કરો કે જો તમે `data` પ્રોપર્ટી સાથે એરો ફંક્શન (arrow function) નો ઉપયોગ કરો છો, તો `this` ઘટકનો ઇન્સ્ટન્સ નહીં હોય, પરંતુ તેમ છતાં તમે ફંક્શનના પ્રથમ આર્ગ્યુમેન્ટ તરીકે ઇન્સ્ટન્સને એક્સેસ કરી શકો છો:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **આ પણ જુઓ** [રિએક્ટિવિટી ઊંડાણમાં (Reactivity in Depth)](/guide/extras/reactivity-in-depth)

## props {#props}

ઘટકના પ્રોપ્સ (props) જાહેર કરો.

- **Type**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown, rawProps: object) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > વાંચવાની સરળતા માટે પ્રકારો (Types) સરળ બનાવવામાં આવ્યા છે.

- **વિગત (Details)**

  Vue માં, તમામ ઘટક પ્રોપ્સ સ્પષ્ટપણે જાહેર કરવાની જરૂર છે. ઘટક પ્રોપ્સ બે સ્વરૂપોમાં જાહેર કરી શકાય છે:

  - સ્ટ્રિંગ્સની એરે (array of strings) નો ઉપયોગ કરીને સરળ સ્વરૂપ
  - ઓબ્જેક્ટનો ઉપયોગ કરીને સંપૂર્ણ સ્વરૂપ જ્યાં દરેક પ્રોપર્ટી કી પ્રોપનું નામ છે, અને કિંમત પ્રોપનો પ્રકાર (એક કન્સ્ટ્રક્ટર ફંક્શન) અથવા એડવાન્સ્ડ ઓપ્શન્સ છે.

  ઓબ્જેક્ટ-આધારિત સિન્ટેક્સ સાથે, દરેક પ્રોપ આગળના વિકલ્પોને વ્યાખ્યાયિત કરી શકે છે:

  - **`type`**: નીચેના માંથી એક નેટિવ કન્સ્ટ્રક્ટર હોઈ શકે છે: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, કોઈપણ કસ્ટમ કન્સ્ટ્રક્ટર ફંક્શન અથવા તેમાંથી કોઈપણ એક એરે. ડેવલપમેન્ટ મોડમાં, Vue તપાસશે કે પ્રોપની કિંમત જાહેર કરેલ પ્રકાર સાથે મેળ ખાય છે કે નહીં, અને જો નહીં થાય તો ચેતવણી (warning) આપશે. વધુ વિગતો માટે [પ્રોપ વેલિડેશન (Prop Validation)](/guide/components/props#prop-validation) જુઓ.

    એ પણ નોંધ લો કે `Boolean` પ્રકાર ધરાવતો પ્રોપ ડેવલપમેન્ટ અને પ્રોડક્શન બંનેમાં તેની વેલ્યુ કાસ્ટિંગ બિહેવિયર (value casting behavior) ને અસર કરે છે. વધુ વિગતો માટે [બુલિયન કાસ્ટિંગ (Boolean Casting)](/guide/components/props#boolean-casting) જુઓ.

  - **`default`**: જ્યારે પેરેન્ટ દ્વારા પ્રોપ પાસ કરવામાં ન આવે અથવા તેની કિંમત `undefined` હોય ત્યારે પ્રોપ માટે ડિફોલ્ટ કિંમત સ્પષ્ટ કરે છે. ઓબ્જેક્ટ અથવા એરે ડિફોલ્ટ્સ ફેક્ટરી ફંક્શનનો ઉપયોગ કરીને રિટર્ન કરવામાં આવવી જોઈએ. ફેક્ટરી ફંક્શન આર્ગ્યુમેન્ટ તરીકે રો પ્રોપ્સ (raw props) ઓબ્જેક્ટ પણ મેળવે છે.

  - **`required`**: જો પ્રોપ જરૂરી (required) હોય તો વ્યાખ્યાયિત કરે છે. નોન-પ્રોડક્શન એન્વાયરમેન્ટમાં, જો આ વેલ્યુ ટ્રુ (truthy) હોય અને પ્રોપ પાસ ન કરવામાં આવે તો કન્સોલ ચેતવણી આપવામાં આવશે.

  - **`validator`**: કસ્ટમ વેલિડેટર ફંક્શન જે પ્રોપ વેલ્યુ અને પ્રોપ્સ ઓબ્જેક્ટને આર્ગ્યુમેન્ટ તરીકે લે છે. ડેવલપમેન્ટ મોડમાં, જો આ ફંક્શન ફોલ્સ (falsy) વેલ્યુ રિટર્ન કરે (એટલે કે વેલિડેશન નિષ્ફળ જાય) તો કન્સોલ ચેતવણી આપવામાં આવશે.

- **Example**

  સરળ જાહેરાત:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  વેલિડેશન સાથે ઓબ્જેક્ટની જાહેરાત (declaration):

  ```js
  export default {
    props: {
      // પ્રકારની તપાસ
      height: Number,
      // પ્રકાર તપાસ વત્તા અન્ય વેલિડેશન
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **આ પણ જુઓ**
  - [ગાઇડ - પ્રોપ્સ (Props)](/guide/components/props)
  - [ગાઇડ - ઘટક પ્રોપ્સ ટાઇપ કરવા (Typing Component Props)](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

## computed {#computed}

ઘટક ઇન્સ્ટન્સ પર એક્સપોઝ કરવા માટે કમ્પ્યુટેડ પ્રોપર્ટીઝ (computed properties) જાહેર કરો.

- **Type**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **વિગત (Details)**

  વિકલ્પ એક ઓબ્જેક્ટ સ્વીકારે છે જ્યાં કી કમ્પ્યુટેડ પ્રોપર્ટીનું નામ છે, અને કિંમત ક્યાં તો કમ્પ્યુટેડ ગેટર (computed getter) છે, અથવા `get` અને `set` મેથડ્સ ધરાવતો ઓબ્જેક્ટ છે (રાઈટેબલ કમ્પ્યુટેડ પ્રોપર્ટીઝ માટે).

  તમામ ગેટર્સ અને સેટર્સનું `this` કોન્ટેક્સ્ટ આપમેળે ઘટક ઇન્સ્ટન્સ સાથે બંધાયેલું હોય છે.

  નોંધ કરો કે જો તમે કમ્પ્યુટેડ પ્રોપર્ટી સાથે એરો ફંક્શનનો ઉપયોગ કરો છો, તો `this` ઘટકના ઇન્સ્ટન્સ તરફ નિર્દેશ કરશે નહીં, પરંતુ તેમ છતાં તમે ફંક્શનના પ્રથમ આર્ગ્યુમેન્ટ તરીકે ઇન્સ્ટન્સને એક્સેસ કરી શકો છો:

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **Example**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // ફક્ત વાંચવા માટે (readonly)
      aDouble() {
        return this.a * 2
      },
      // રાઈટેબલ (writable)
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **આ પણ જુઓ**
  - [ગાઇડ - કમ્પ્યુટેડ પ્રોપર્ટીઝ (Computed Properties)](/guide/essentials/computed)
  - [ગાઇડ - કમ્પ્યુટેડ પ્રોપર્ટીઝ ટાઇપ કરવી (Typing Computed Properties)](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## methods {#methods}

ઘટક ઇન્સ્ટન્સમાં મિક્સ (mix) કરવા માટેની મેથડ્સ જાહેર કરો.

- **Type**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **વિગત (Details)**

  જાહેર કરાયેલ મેથડ્સ સીધી ઘટક ઇન્સ્ટન્સ પર એક્સેસ કરી શકાય છે, અથવા ટેમ્પ્લેટ એક્સપ્રેશન્સમાં ઉપયોગમાં લઈ શકાય છે. તમામ મેથડ્સનું `this` કોન્ટેક્સ્ટ આપમેળે ઘટક ઇન્સ્ટન્સ સાથે બંધાયેલું હોય છે, ભલે તે બીજે ક્યાંક પાસ કરવામાં આવે.

  મેથડ્સ જાહેર કરતી વખતે એરો ફંક્શનનો ઉપયોગ કરવાનું ટાળો, કારણ કે તેમને `this` દ્વારા ઘટક ઇન્સ્ટન્સની ઍક્સેસ હશે નહીં.

- **Example**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **આ પણ જુઓ** [ઇવેન્ટ હેન્ડલિંગ (Event Handling)](/guide/essentials/event-handling)

## watch {#watch}

ડેટા ફેરફાર પર ઇન્વોક (invoke) કરવા માટે વૉચ કોલબેક્સ (watch callbacks) જાહેર કરો.

- **Type**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > વાંચવાની સરળતા માટે પ્રકારો સરળ બનાવવામાં આવ્યા છે.

- **વિગતો (Details)**

  `watch` વિકલ્પ એક ઓબ્જેક્ટની અપેક્ષા રાખે છે જ્યાં કી જોવા માટે રિએક્ટિવ ઘટક ઇન્સ્ટન્સ પ્રોપર્ટીઝ છે (દા.ત. `data` કે `computed` દ્વારા જાહેર કરાયેલ પ્રોપર્ટીઝ) — અને કિંમતો સંબંધિત કોલબેક્સ છે. કોલબેક જોવામાં આવેલા સ્રોતની નવી કિંમત અને જૂની કિંમત મેળવે છે.

  રુટ-લેવલ પ્રોપર્ટી ઉપરાંત, કી એક સરળ ડોટ-ડીલિમિટેડ પાથ (dot-delimited path) પણ હોઈ શકે છે, દા.ત. `a.b.c`. નોંધ કરો કે આ ઉપયોગ જટિલ એક્સપ્રેશન્સને સપોર્ટ કરતું **નથી** - માત્ર ડોટ-ડીલિમિટેડ પાથ સપોર્ટેડ છે. જો તમારે જટિલ ડેટા સ્રોતો જોવાની જરૂર હોય, તો તેના બદલે ઇમ્પેરેટિવ (imperative) [`$watch()`](/api/component-instance#watch) API નો ઉપયોગ કરો.

  કિંમત મેથડના નામની સ્ટ્રિંગ પણ હોઈ શકે છે (`methods` દ્વારા જાહેર કરેલ), અથવા એક ઓબ્જેક્ટ જે વધારાના વિકલ્પો ધરાવે છે. ઓબ્જેક્ટ સિન્ટેક્સનો ઉપયોગ કરતી વખતે, કોલબેકને `handler` ફીલ્ડ હેઠળ જાહેર કરવી જોઈએ. વધારાના વિકલ્પોમાં શામેલ છે:

  - **`immediate`**: વૉચર બનાવતી વખતે તરત જ કોલબેક ટ્રિગર કરો. પ્રથમ કોલ પર જૂની કિંમત `undefined` હશે.
  - **`deep`**: જો સ્રોત ઓબ્જેક્ટ અથવા એરે હોય તો તે ઊંડાણપૂર્વક ટ્રાવર્સલ (traversal) કરવાનું ફોર્સ કરો, જેથી કોલબેક ઊંડા ફેરફારો પર ફાયર થાય. જુઓ [ડીપ વૉચર્સ (Deep Watchers)](/guide/essentials/watchers#deep-watchers).
  - **`flush`**: કોલબેકના ફ્લશ ટાઇમિંગને સમાયોજિત કરો. જુઓ [કોલબેક ફ્લશ ટાઇમિંગ (Callback Flush Timing)](/guide/essentials/watchers#callback-flush-timing) અને [`watchEffect()`](/api/reactivity-core#watcheffect).
  - **`onTrack / onTrigger`**: વૉચરની ડિપેન્ડન્સીઝ ડીબગ કરો. જુઓ [વૉચર ડીબગિંગ (Watcher Debugging)](/guide/extras/reactivity-in-depth#watcher-debugging).

  વૉચ કોલબેક્સ જાહેર કરતી વખતે એરો ફંક્શનનો ઉપયોગ કરવાનું ટાળો કારણ કે તેમને `this` દ્વારા ઘટક ઇન્સ્ટન્સની ઍક્સેસ હશે નહીં.

- **Example**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // ટોપ-લેવલ પ્રોપર્ટી જોવી
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // સ્ટ્રિંગ મેથડ નેમ
      b: 'someMethod',
      // જ્યારે પણ કોઈપણ જોવામાં આવેલ ઓબ્જેક્ટ પ્રોપર્ટીઝ બદલાય ત્યારે કોલબેક કોલ કરવામાં આવશે, ભલે તેમની નેસ્ટેડ ડેપ્થ ગમે તે હોય
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // સિંગલ નેસ્ટેડ પ્રોપર્ટી જોવી:
      'c.d': function (val, oldVal) {
        // કંઈક કામ કરો
      },
      // અવલોકન (observation) શરૂ થયા પછી તરત જ કોલબેક કોલ કરવામાં આવશે
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // તમે કોલબેક્સની એરે પાસ કરી શકો છો, તેઓ એક પછી એક કોલ થશે
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => new: 3, old: 1
    }
  }
  ```

- **આ પણ જુઓ** [વૉચર્સ (Watchers)](/guide/essentials/watchers)

## emits {#emits}

ઘટક દ્વારા એમિટ (emit) કરવામાં આવેલી કસ્ટમ ઇવેન્ટ્સ જાહેર કરો.

- **Type**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **વિગત (Details)**

  એમિટ કરેલી ઇવેન્ટ્સ બે સ્વરૂપોમાં જાહેર કરી શકાય છે:

  - સ્ટ્રિંગ્સની એરેનો ઉપયોગ કરીને સરળ સ્વરૂપ
  - ઓબ્જેક્ટનો ઉપયોગ કરીને સંપૂર્ણ સ્વરૂપ જ્યાં દરેક પ્રોપર્ટી કી ઇવેન્ટનું નામ છે, અને કિંમત ક્યાં તો `null` અથવા વેલિડેટર ફંક્શન છે.

  વેલિડેશન ફંક્શન ઘટકના `$emit` કોલ પર પાસ કરાયેલા વધારાના આર્ગ્યુમેન્ટ્સ મેળવશે. ઉદાહરણ તરીકે, જો `this.$emit('foo', 1)` કોલ કરવામાં આવે, તો `foo` માટે સંબંધિત વેલિડેટર આર્ગ્યુમેન્ટ `1` મેળવશે. વેલિડેટર ફંક્શન ઇવેન્ટ આર્ગ્યુમેન્ટ્સ વેલિડ છે કે નહીં તે દર્શાવવા માટે બુલિયન રિટર્ન કરવું જોઈએ.

  નોંધ લો કે `emits` વિકલ્પ અસર કરે છે કે કઈ ઇવેન્ટ લિસનર્સને નેટિવ DOM ઇવેન્ટ લિસનર્સને બદલે કમ્પોનન્ટ ઇવેન્ટ લિસનર્સ ગણવામાં આવે છે. જાહેર કરાયેલ ઇવેન્ટ્સ માટે લિસનર્સ ઘટકના `$attrs` ઓબ્જેક્ટમાંથી દૂર કરવામાં આવશે, તેથી તે ઘટકના રુટ એલિમેન્ટ પર પાસ કરવામાં આવશે નહીં. વધુ વિગતો માટે [ફોલથ્રુ એટ્રિબ્યુટ્સ (Fallthrough Attributes)](/guide/components/attrs) જુઓ.

- **Example**

  એરે સિન્ટેક્સ:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  ઓબ્જેક્ટ સિન્ટેક્સ:

  ```js
  export default {
    emits: {
      // કોઈ વેલિડેશન નથી
      click: null,

      // વેલિડેશન સાથે
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

- **આ પણ જુઓ**
  - [ગાઇડ - ફોલથ્રુ એટ્રિબ્યુટ્સ (Fallthrough Attributes)](/guide/components/attrs)
  - [ગાઇડ - ઘટક એમિટ્સ ટાઇપ કરવું (Typing Component Emits)](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

જ્યારે ઘટક ઇન્સ્ટન્સ ટેમ્પ્લેટ રેફ્સ દ્વારા પેરેન્ટ દ્વારા એક્સેસ કરવામાં આવે ત્યારે એક્સપોઝ્ડ પબ્લિક પ્રોપર્ટીઝ જાહેર કરો.

- **Type**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **વિગત (Details)**

  ડિફોલ્ટ રૂપે, ઘટક ઇન્સ્ટન્સ જ્યારે `$parent`, `$root`, અથવા ટેમ્પ્લેટ રેફ્સ દ્વારા એક્સેસ કરવામાં આવે ત્યારે પેરેન્ટને તમામ ઇન્સ્ટન્સ પ્રોપર્ટીઝ એક્સપોઝ કરે છે. આ અનિચ્છનીય હોઈ શકે છે, કારણ કે ઘટક મોટે ભાગે ઇન્ટરનલ સ્ટેટ અથવા મેથડ્સ ધરાવે છે જે ટાઇટ માઈગ્રેશન (tight coupling) ટાળવા માટે ખાનગી રાખવી જોઈએ.

  `expose` વિકલ્પ પ્રોપર્ટી નેમ સ્ટ્રિંગ્સની સૂચિની અપેક્ષા રાખે છે. જ્યારે `expose` વપરાય છે, ત્યારે માત્ર સ્પષ્ટપણે સૂચિબદ્ધ પ્રોપર્ટીઝ ઘટકના જાહેર ઇન્સ્ટન્સ પર એક્સપોઝ કરવામાં આવશે.

  `expose` માત્ર યુઝર-ડિફાઇન્ડ પ્રોપર્ટીઝને અસર કરે છે - તે બિલ્ટ-ઇન ઘટક ઇન્સ્ટન્સ પ્રોપર્ટીઝને ફિલ્ટર કરતું નથી.

- **Example**

  ```js
  export default {
    // જાહેર ઇન્સ્ટન્સ પર માત્ર `publicMethod` ઉપલબ્ધ હશે
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
