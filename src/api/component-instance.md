# ઘટક ઇન્સ્ટન્સ (Component Instance) {#component-instance}

:::info
આ page ઘટકના public instance, i.e. `this` પર exposed built-in properties અને methods document કરે છે.

આ page પર listed તમામ properties readonly છે (`$data` માં nested properties સિવાય).
:::

## $data {#data}

[`data`](./options-state#data) ઓપ્શન માંથી return થયેલો object, ઘટક દ્વારા reactive બનાવાયેલ. ઘટક instance તેના data object પરની properties access proxy કરે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

ઘટકના current, resolved props represent કરતો object.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **વિગત (Details)**

  ફક્ત [`props`](./options-state#props) ઓપ્શન દ્વારા declared props સામેલ થશે. ઘટક instance તેના props object પરની properties access proxy કરે.

## $el {#el}

ઘટક instance manage કરી રહ્યો છે તે root DOM node.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $el: any
  }
  ```

- **વિગત (Details)**

  ઘટક [mounted](./options-lifecycle#mounted) થાય ત્યાં સુધી `$el` `undefined` હશે.

  - Single root element ધરાવતા ઘટકો માટે, `$el` તે element ને point કરશે.
  - Text root ધરાવતા ઘટકો માટે, `$el` text node ને point કરશે.
  - Multiple root nodes ધરાવતા ઘટકો માટે, `$el` placeholder DOM node હશે જેનો Vue ઉપયોગ DOM માં ઘટકની position track કરવા કરે (text node, અથવા SSR hydration mode માં comment node).

  :::tip
  Consistency માટે, `$el` પર depend કરવાના બદલે elements ની direct access માટે [template refs](/guide/essentials/template-refs) ઉપયોગ કરવાની ભલામણ છે.
  :::

## $options {#options}

વર્તમાન ઘટક instance instantiate કરવા ઉપયોગ થયેલા resolved component options.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **વિગત (Details)**

  `$options` object વર્તમાન ઘટક માટે resolved options expose કરે અને આ possible sources નું merge result છે:

  - Global mixins
  - Component `extends` base
  - Component mixins

  સામાન્ય રીતે custom component options support કરવા ઉપયોગ થાય:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **આ પણ જુઓ** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## $parent {#parent}

Parent instance, જો current instance ધરાવે. Root instance માટે `null` હશે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

Current component tree નું root component instance. જો current instance ના parents ન હોય તો value itself હશે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

Parent ઘટક દ્વારા pass કરેલ [slots](/guide/components/slots) represent કરતો object.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **વિગત (Details)**

  સામાન્ય રીતે manually [render functions](/guide/extras/render-function) author કરતી વખતે ઉપયોગ થાય, પરંતુ slot present છે કે નહીં detect કરવા પણ ઉપયોગ કરી શકાય.

  દરેક slot `this.$slots` પર function તરીકે expose થાય જે slot ના name ને corresponding key હેઠળ vnodes ની array return કરે. Default slot `this.$slots.default` તરીકે expose થાય.

  જો slot [scoped slot](/guide/components/slots#scoped-slots) હોય, slot functions ને pass થયેલા arguments slot ને slot props તરીકે ઉપલબ્ધ છે.

- **આ પણ જુઓ** [રેન્ડર ફંક્શન્સ - Slots Render કરવા](/guide/extras/render-function#rendering-slots)

## $refs {#refs}

[Template refs](/guide/essentials/template-refs) દ્વારા registered DOM elements અને component instances નો object.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **આ પણ જુઓ**

  - [Template refs](/guide/essentials/template-refs)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## $attrs {#attrs}

ઘટકના fallthrough attributes ધરાવતો object.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **વિગત (Details)**

  [Fallthrough Attributes](/guide/components/attrs) parent ઘટક દ્વારા pass થયેલા attributes અને event handlers છે, પરંતુ child દ્વારા prop અથવા emitted event તરીકે declared નથી.

  ડિફોલ્ટ રૂપે, `$attrs` માં બધું ઘટકના root element પર auto inherited થશે જો single root element હોય. Multiple root nodes ધરાવતા ઘટક માટે behavior disabled છે, અને [`inheritAttrs`](./options-misc#inheritattrs) ઓપ્શન સાથે explicitly disabled કરી શકાય.

- **આ પણ જુઓ**

  - [Fallthrough Attributes](/guide/components/attrs)

## $watch() {#watch}

Watchers create કરવા માટે Imperative API.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **વિગત (Details)**

  પ્રથમ argument watch source છે. તે component property name string, simple dot-delimited path string, અથવા [getter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) હોઈ શકે.

  બીજો argument callback function છે. Callback watched source ની new value અને old value receive કરે.

  - **`immediate`**: watcher creation પર callback immediately trigger કરો. પ્રથમ call પર old value `undefined` હશે.
  - **`deep`**: source object હોય તો deep traversal force કરો, જેથી deep mutations પર callback fire થાય. [Deep Watchers](/guide/essentials/watchers#deep-watchers) જુઓ.
  - **`flush`**: callback ની flush timing adjust કરો. [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) અને [`watchEffect()`](/api/reactivity-core#watcheffect) જુઓ.
  - **`onTrack / onTrigger`**: watcher ની dependencies debug કરો. [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging) જુઓ.

- **ઉદાહરણ (Example)**

  Property name watch કરવું:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Dot-delimited path watch કરવો:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  વધુ complex expressions માટે getter ઉપયોગ કરવું:

  ```js
  this.$watch(
    // દર વખતે expression `this.a + this.b` different
    // result yield કરે, handler call થશે.
    // computed property define કર્યા વિના
    // computed property watch કરવા જેવું.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Watcher stop કરવું:

  ```js
  const unwatch = this.$watch('a', cb)

  // later...
  unwatch()
  ```

- **આ પણ જુઓ**
  - [Options - `watch`](/api/options-state#watch)
  - [ગાઇડ - Watchers](/guide/essentials/watchers)

## $emit() {#emit}

Current instance પર custom event trigger કરો. કોઈપણ additional arguments listener ના callback function ને pass થશે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  export default {
    created() {
      // ફક્ત event
      this.$emit('foo')
      // additional arguments સાથે
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **આ પણ જુઓ**

  - [ઘટક - Events](/guide/components/events)
  - [`emits` ઓપ્શન](./options-state#emits)

## $forceUpdate() {#forceupdate}

ઘટક instance ને re-render કરવા force કરો.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **વિગત (Details)**

  Vue ની fully automatic reactivity system જોતાં આ ભાગ્યે જ જરૂરી હોવું જોઈએ. ફક્ત ત્યારે જ જરૂર પડી શકે જ્યારે advanced reactivity APIs ઉપયોગ કરીને explicitly non-reactive component state create કર્યો હોય.

## $nextTick() {#nexttick}

Global [`nextTick()`](./general#nexttick) નું instance-bound version.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **વિગત (Details)**

  `nextTick()` ના global version થી ફક્ત એ જ ફરક છે કે `this.$nextTick()` ને pass થયેલા callback નો `this` context current component instance સાથે bound હશે.

- **આ પણ જુઓ** [`nextTick()`](./general#nexttick)
