# રેન્ડર ફંક્શન APIs (Render Function APIs) {#render-function-apis}

## h() {#h}

Virtual DOM nodes (vnodes) create કરે છે.

- **ટાઇપ (Type)**

  ```ts
  // full signature
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // props omit કરવા
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > વાંચવાની સરળતા માટે Types simplified છે.

- **વિગત (Details)**

  પ્રથમ argument ક્યાં તો string (native elements માટે) અથવા Vue component definition હોઈ શકે. બીજો argument pass કરવાના props છે, અને ત્રીજો argument children છે.

  Component vnode create કરતી વખતે, children slot functions તરીકે pass થવા જોઈએ. જો ઘટક ફક્ત default slot ની expectation કરે તો single slot function pass કરી શકાય. નહીંતર, slots slot functions ના object તરીકે pass થવા જોઈએ.

  સુવિધા માટે, children slots object ન હોય ત્યારે props argument omit કરી શકાય.

- **ઉદાહરણ (Example)**

  Native elements create કરવા:

  ```js
  import { h } from 'vue'

  // type સિવાય તમામ arguments optional છે
  h('div')
  h('div', { id: 'foo' })

  // props માં attributes અને properties બંને ઉપયોગ કરી શકાય
  // Vue આપમેળે assign કરવાની યોગ્ય રીત pick કરે
  h('div', { class: 'bar', innerHTML: 'hello' })

  // class અને style templates ની જેમ
  // object / array value support ધરાવે
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // event listeners onXxx તરીકે pass થવા જોઈએ
  h('div', { onClick: () => {} })

  // children string હોઈ શકે
  h('div', { id: 'foo' }, 'hello')

  // props ન હોય ત્યારે omit કરી શકાય
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // children array mixed vnodes અને strings ધરાવી શકે
  h('div', ['hello', h('span', 'hello')])
  ```

  ઘટકો create કરવા:

  ```js
  import Foo from './Foo.vue'

  // props pass કરવા
  h(Foo, {
    // some-prop="hello" ના સમકક્ષ
    someProp: 'hello',
    // @update="() => {}" ના સમકક્ષ
    onUpdate: () => {}
  })

  // single default slot pass કરવો
  h(Foo, () => 'default slot')

  // named slots pass કરવા
  // slots object ને props તરીકે treat થતા
  // અટકાવવા `null` આવશ્યક છે
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **આ પણ જુઓ** [ગાઇડ - રેન્ડર ફંક્શન્સ - VNodes Create કરવા](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

ચોક્કસ props માટે special handling સાથે multiple props objects merge કરે.

- **ટાઇપ (Type)**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **વિગત (Details)**

  `mergeProps()` નીચેના props માટે special handling સાથે multiple props objects merge કરવાને support કરે:

  - `class`
  - `style`
  - `onXxx` event listeners - same name ના multiple listeners array માં merge થશે.

  જો merge behavior ની જરૂર ન હોય અને simple overwrites જોઈએ, તો native object spread ઉપયોગ કરી શકાય.

- **ઉદાહરણ (Example)**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

Vnode clone કરે.

- **ટાઇપ (Type)**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **વિગત (Details)**

  Cloned vnode return કરે, original સાથે merge કરવા extra props સાથે optionally.

  Vnodes create થયા પછી immutable માનવા જોઈએ, અને existed vnode ના props mutate ન કરવા. તેના બદલે, different / extra props સાથે clone કરો.

  Vnodes special internal properties ધરાવે, તેથી clone કરવું object spread જેટલું simple નથી. `cloneVNode()` મોટાભાગના internal logic handle કરે.

- **ઉદાહરણ (Example)**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

ચકાસે છે કે value vnode છે કે નહીં.

- **ટાઇપ (Type)**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

Name દ્વારા registered ઘટકને manually resolve કરવા.

- **ટાઇપ (Type)**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **વિગત (Details)**

  **નોંધ: જો તમે ઘટકને directly import કરી શકો તો આની જરૂર નથી.**

  `resolveComponent()` યોગ્ય component context માંથી resolve કરવા <span class="composition-api">`setup()` અથવા</span> render function અંદર call થવો જોઈએ.

  જો ઘટક ન મળે, runtime warning emit થશે, અને name string return થશે.

- **ઉદાહરણ (Example)**

  <div class="composition-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **આ પણ જુઓ** [ગાઇડ - રેન્ડર ફંક્શન્સ - ઘટકો](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

Name દ્વારા registered directive ને manually resolve કરવા.

- **ટાઇપ (Type)**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **વિગત (Details)**

  **નોંધ: જો તમે directive ને directly import કરી શકો તો આની જરૂર નથી.**

  `resolveDirective()` યોગ્ય component context માંથી resolve કરવા <span class="composition-api">`setup()` અથવા</span> render function અંદર call થવો જોઈએ.

  જો directive ન મળે, runtime warning emit થશે, અને function `undefined` return કરે.

- **આ પણ જુઓ** [ગાઇડ - રેન્ડર ફંક્શન્સ - Custom Directives](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

Vnodes ને custom directives add કરવા.

- **ટાઇપ (Type)**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **વિગત (Details)**

  Existed vnode ને custom directives સાથે wrap કરે. બીજો argument custom directives ની array છે. દરેક custom directive `[Directive, value, argument, modifiers]` form માં array તરીકે represent થાય. જરૂર ન હોય તો array ના tailing elements omit કરી શકાય.

- **ઉદાહરણ (Example)**

  ```js
  import { h, withDirectives } from 'vue'

  // custom directive
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **આ પણ જુઓ** [ગાઇડ - રેન્ડર ફંક્શન્સ - Custom Directives](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

Event handler function ને built-in [`v-on` modifiers](/guide/essentials/event-handling#event-modifiers) add કરવા.

- **ટાઇપ (Type)**

  ```ts
  function withModifiers(fn: Function, modifiers: ModifierGuardsKeys[]): Function
  ```

- **ઉદાહરણ (Example)**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // v-on:click.stop.prevent ના સમકક્ષ
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **આ પણ જુઓ** [ગાઇડ - રેન્ડર ફંક્શન્સ - Event Modifiers](/guide/extras/render-function#event-modifiers)
