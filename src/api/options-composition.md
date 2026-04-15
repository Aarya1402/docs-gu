# ઓપ્શન્સ: કમ્પોઝિશન (Options: Composition) {#options-composition}

## provide {#provide}

વંશજ (descendant) ઘટકો દ્વારા inject કરી શકાય તેવી values provide કરો.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **વિગત (Details)**

  `provide` અને [`inject`](#inject) એકસાથે ઉપયોગ થાય છે જેથી પૂર્વજ (ancestor) ઘટક તેના તમામ descendants માટે dependency injector તરીકે કાર્ય કરી શકે, ભલે component hierarchy કેટલી ઊંડી (deep) હોય, જ્યાં સુધી તેઓ સમાન parent chain માં હોય.

  `provide` ઓપ્શન ક્યાં તો object અથવા object return કરતું function હોવું જોઈએ. આ object તેના descendants માં injection માટે ઉપલબ્ધ properties ધરાવે છે. આ object માં keys તરીકે Symbols ઉપયોગ કરી શકો.

- **ઉદાહરણ (Example)**

  મૂળભૂત ઉપયોગ:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  Per-component state provide કરવા function ઉપયોગ કરવું:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  નોંધ કરો કે ઉપરના ઉદાહરણમાં, provide કરેલું `msg` reactive નહીં હોય. વધુ વિગત માટે [Reactivity સાથે કામ કરવું](/guide/components/provide-inject#working-with-reactivity) જુઓ.

- **આ પણ જુઓ** [Provide / Inject](/guide/components/provide-inject)

## inject {#inject}

પૂર્વજ (ancestor) providers માંથી શોધીને વર્તમાન ઘટકમાં inject કરવાની properties declare કરો.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **વિગત (Details)**

  `inject` ઓપ્શન ક્યાં તો હોવું જોઈએ:

  - Strings ની array, અથવા
  - Object જ્યાં keys local binding name છે અને value ક્યાં તો:
    - ઉપલબ્ધ injections માં શોધવા માટેની key (string અથવા Symbol), અથવા
    - Object જ્યાં:
      - `from` property ઉપલબ્ધ injections માં શોધવા માટેની key (string અથવા Symbol) છે, અને
      - `default` property fallback value તરીકે ઉપયોગ થાય. Props default values ની જેમ, multiple component instances વચ્ચે value sharing ટાળવા object types માટે factory function જરૂરી છે.

  Injected property `undefined` હશે જો matching property કે default value provide ન કરવામાં આવ્યા હોય.

  નોંધ કરો કે injected bindings reactive **નથી**. આ ઇરાદાપૂર્વક છે. જો કે, injected value reactive object હોય, તો તે object ની properties reactive રહે છે. વધુ વિગત માટે [Reactivity સાથે કામ કરવું](/guide/components/provide-inject#working-with-reactivity) જુઓ.

- **ઉદાહરણ (Example)**

  મૂળભૂત ઉપયોગ:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  Injected value ને prop માટે default તરીકે ઉપયોગ કરવી:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  Injected value ને data entry તરીકે ઉપયોગ કરવી:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Injections default value સાથે optional હોઈ શકે:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  જો અલગ name ની property માંથી inject કરવાની જરૂર હોય, તો source property દર્શાવવા `from` ઉપયોગ કરો:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Prop defaults ની જેમ, non-primitive values માટે factory function ઉપયોગ કરવું જરૂરી:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **આ પણ જુઓ** [Provide / Inject](/guide/components/provide-inject)

## mixins {#mixins}

વર્તમાન ઘટકમાં mix કરવા માટે option objects ની array.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **વિગત (Details)**

  `mixins` ઓપ્શન mixin objects ની array accept કરે છે. આ mixin objects normal instance objects ની જેમ instance options ધરાવી શકે, અને ચોક્કસ option merging logic ઉપયોગ કરીને eventual options સાથે merge થશે. ઉદાહરણ તરીકે, જો તમારા mixin માં `created` hook હોય અને ઘટક પોતે પણ ધરાવે, તો બંને functions call થશે.

  Mixin hooks જે ક્રમમાં provide કરવામાં આવે છે તે ક્રમમાં call થાય છે, અને ઘટકના પોતાના hooks પહેલા call થાય છે.

  :::warning હવે ભલામણ નથી (No Longer Recommended)
  Vue 2 માં, mixins ઘટક logic ના reusable chunks બનાવવાની primary mechanism હતી. Vue 3 માં mixins supported રહે છે, પરંતુ [Composition API ઉપયોગ કરતા Composable functions](/guide/reusability/composables) હવે ઘટકો વચ્ચે code reuse માટે preferred approach છે.
  :::

- **ઉદાહરણ (Example)**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends {#extends}

Extend કરવા માટે "base class" ઘટક.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **વિગત (Details)**

  એક ઘટકને અન્ય extend કરવાની, તેના component options inherit કરવાની મંજૂરી આપે છે.

  Implementation perspective થી, `extends` `mixins` ની લગભગ identical છે. `extends` દ્વારા specified ઘટકને એવી રીતે treat કરવામાં આવશે જાણે તે પ્રથમ mixin હોય.

  જો કે, `extends` અને `mixins` અલગ intents express કરે છે. `mixins` ઓપ્શનનો ઉપયોગ મુખ્યત્વે functionality ના chunks compose કરવા માટે થાય, જ્યારે `extends` મુખ્યત્વે inheritance સાથે concerned છે.

  `mixins` ની જેમ, કોઈપણ options (`setup()` સિવાય) relevant merge strategy ઉપયોગ કરીને merge થશે.

- **ઉદાહરણ (Example)**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```

  :::warning Composition API માટે ભલામણ નથી
  `extends` Options API માટે ડિઝાઇન થયેલું છે અને `setup()` hook ના merging ને handle કરતું નથી.

  Composition API માં, logic reuse માટે preferred mental model "inheritance" કરતા "compose" છે. જો તમારી પાસે ઘટકમાંથી logic છે જે બીજામાં reuse કરવાની જરૂર છે, તો relevant logic ને [Composable](/guide/reusability/composables#composables) માં extract કરવાનું વિચારો.

  જો તમે હજુ Composition API ઉપયોગ કરીને ઘટકને "extend" કરવા ઇચ્છો, તો extending ઘટકના `setup()` માં base ઘટકના `setup()` ને call કરી શકો:

  ```js
  import Base from './Base.js'
  export default {
    extends: Base,
    setup(props, ctx) {
      return {
        ...Base.setup(props, ctx),
        // local bindings
      }
    }
  }
  ```
  :::
