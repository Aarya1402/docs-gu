---
outline: deep
---

# રેન્ડર ફંક્શન અને JSX (Render Functions & JSX) {#render-functions-jsx}

Vue મોટા ભાગના કિસ્સાઓમાં એપ્લિકેશન બનાવવા માટે ટેમ્પલેટનો ઉપયોગ કરવાની ભલામણ કરે છે. જો કે, એવી પરિસ્થિતિઓ હોય છે જ્યાં આપણને JavaScript ની સંપૂર્ણ પ્રોગ્રામેટિક શક્તિની જરૂર હોય છે. ત્યાં જ આપણે **રેન્ડર ફંક્શન (render function)** નો ઉપયોગ કરી શકીએ છીએ.

> જો તમે વર્ચ્યુઅલ DOM અને રેન્ડર ફંક્શન્સના કન્સેપ્ટ માટે નવા હોવ, તો પહેલા [રેન્ડરિંગ મિકેનિઝમ (Rendering Mechanism)](/guide/extras/rendering-mechanism) પ્રકરણ ચોક્કસ વાંચો.

## મૂળભૂત વપરાશ (Basic Usage) {#basic-usage}

### Vnodes બનાવવા (Creating Vnodes) {#creating-vnodes}

Vue vnodes બનાવવા માટે `h()` ફંક્શન પ્રદાન કરે છે:

```js
import { h } from 'vue'

const vnode = h(
  'div', // પ્રકાર (type)
  { id: 'foo', class: 'bar' }, // પ્રોપ્સ (props)
  [
    /* ચિલ્ડ્રન (children) */
  ]
)
```

`h()` એ **hyperscript** માટે ટૂંકું નામ છે - જેનો અર્થ છે "JavaScript જે HTML ઉત્પન્ન કરે છે (hypertext markup language)". આ નામ ઘણા વર્ચ્યુઅલ DOM અમલીકરણો દ્વારા શેર કરેલી પરંપરાઓમાંથી વારસામાં મળ્યું છે. વધુ વર્ણનાત્મક નામ `createVNode()` હોઈ શકે છે, પરંતુ જ્યારે તમારે રેન્ડર ફંક્શનમાં આ ફંક્શનને ઘણી વખત કોલ કરવાનું હોય ત્યારે ટૂંકું નામ મદદ કરે છે.

`h()` ફંક્શન ખૂબ જ લવચીક બનાવવા માટે ડિઝાઇન કરવામાં આવ્યું છે:

```js
// પ્રકાર સિવાયના તમામ આર્ગ્યુમેન્ટ્સ વૈકલ્પિક છે
h('div')
h('div', { id: 'foo' })

// પ્રોપ્સમાં એટ્રિબ્યુટ્સ અને પ્રોપર્ટીઝ બંનેનો ઉપયોગ કરી શકાય છે
// Vue આપમેળે તેને અસાઇન કરવાની સાચી રીત પસંદ કરે છે
h('div', { class: 'bar', innerHTML: 'નમસ્તે' })

// પ્રોપ્સ મોડિફાયર જેમ કે `.prop` અને `.attr` અનુક્રમે
// `.` અને `^` પ્રીફિક્સ સાથે ઉમેરી શકાય છે
h('div', { '.name': 'બીજું-નામ', '^width': '100' })

// ક્લાસ અને સ્ટાઇલ પાસે સમાન ઓબ્જેક્ટ / એરે વેલ્યુ સપોર્ટ છે
// જે ટેમ્પલેટ્સમાં છે
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// ઇવેન્ટ લિસનર્સ (event listeners) onXxx તરીકે પાસ કરવા જોઈએ
h('div', { onClick: () => {} })

// બાળકો (children) એક સ્ટ્રિંગ હોઈ શકે છે
h('div', { id: 'foo' }, 'નમસ્તે')

// જ્યારે કોઈ પ્રોપ્સ ન હોય ત્યારે પ્રોપ્સ છોડી શકાય છે
h('div', 'નમસ્તે')
h('div', [h('span', 'નમસ્તે')])

// ચિલ્ડ્રન એરેમાં મિશ્ર vnodes અને સ્ટ્રિંગ્સ હોઈ શકે છે
h('div', ['નમસ્તે', h('span', 'નમસ્તે')])
```

પરિણામી vnode નીચેનો આકાર ધરાવે છે:

```js
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

:::warning નોંધ
સંપૂર્ણ `VNode` ઇન્ટરફેસમાં ઘણી અન્ય આંતરિક પ્રોપર્ટીઝ શામેલ છે, પરંતુ અહીં સૂચિબદ્ધ છે તે સિવાયની અન્ય પ્રોપર્ટીઝ પર આધાર રાખવાનું ટાળવાની ભારપૂર્વક ભલામણ કરવામાં આવે છે. આ આંતરિક પ્રોપર્ટીઝ બદલાવાના કિસ્સામાં અણધારી સમસ્યાઓ ટાળે છે.
:::

### રેન્ડર ફંક્શન્સ જાહેર કરવા (Declaring Render Functions) {#declaring-render-functions}

<div class="composition-api">

કોમ્પોઝિશન (Composition) API સાથે ટેમ્પલેટ્સનો ઉપયોગ કરતી વખતે, `setup()` હૂકની રિટર્ન વેલ્યુ ટેમ્પલેટમાં ડેટા એક્સપોઝ કરવા માટે વપરાય છે. જો કે, રેન્ડર ફંક્શન્સનો ઉપયોગ કરતી વખતે, આપણે સીધા જ રેન્ડર ફંક્શન પરત કરી શકીએ છીએ:

```js
import { ref, h } from 'vue'

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // રેન્ડર ફંક્શન પરત કરો
    return () => h('div', props.msg + count.value)
  }
}
```

રેન્ડર ફંક્શન `setup()` ની અંદર જાહેર કરવામાં આવે છે તેથી તે કુદરતી રીતે પ્રોપ્સ અને તે જ ક્ષેત્રમાં જાહેર કરેલા કોઈપણ રિએક્ટિવ સ્ટેટને એક્સેસ કરી શકે છે.

એક સિંગલ vnode પરત કરવા ઉપરાંત, તમે સ્ટ્રિંગ્સ અથવા એરે પણ પરત કરી શકો છો:

```js
export default {
  setup() {
    return () => 'નમસ્તે દુનિયા!'
  }
}
```

```js
import { h } from 'vue'

export default {
  setup() {
    // બહુવિધ રૂટ નોડ્સ પરત કરવા માટે એરેનો ઉપયોગ કરો
    return () => [
      h('div'),
      h('div'),
      h('div')
    ]
  }
}
```

:::tip
સીધા મૂલ્યો પરત કરવાને બદલે ફંક્શન પરત કરવાની ખાતરી કરો! `setup()` ફંક્શન દરેક ઘટક દીઠ માત્ર એક જ વાર કોલ થાય છે, જ્યારે પરત કરેલ રેન્ડર ફંક્શન ઘણી વખત કોલ થશે.
:::

</div>
<div class="options-api">

અમે `render` ઓપ્શનનો ઉપયોગ કરીને રેન્ડર ફંક્શન્સ જાહેર કરી શકીએ છીએ:

```js
import { h } from 'vue'

export default {
  data() {
    return {
      msg: 'નમસ્તે'
    }
  },
  render() {
    return h('div', this.msg)
  }
}
```

`render()` ફંક્શન `this` દ્વારા ઘટક ઇન્સ્ટન્સને એક્સેસ કરી શકે છે.

એક સિંગલ vnode પરત કરવા ઉપરાંત, તમે સ્ટ્રિંગ્સ અથવા એરે પણ પરત કરી શકો છો:

```js
export default {
  render() {
    return 'નમસ્તે દુનિયા!'
  }
}
```

```js
import { h } from 'vue'

export default {
  render() {
    // બહુવિધ રૂટ નોડ્સ પરત કરવા માટે એરેનો ઉપયોગ કરો
    return [
      h('div'),
      h('div'),
      h('div')
    ]
  }
}
```

</div>

જો રેન્ડર ફંક્શન ઘટકને કોઈ ઇન્સ્ટન્સ સ્ટેટની જરૂર નથી, તો તેને સંક્ષિપ્તતા માટે સીધું ફંક્શન તરીકે પણ જાહેર કરી શકાય છે:

```js
function Hello() {
  return 'નમસ્તે દુનિયા!'
}
```

હા સાચું છે, આ એક માન્ય Vue ઘટક છે! આ સિન્ટેક્સ પર વધુ વિગતો માટે [ફંક્શનલ ઘટકો (Functional Components)](#functional-components) જુઓ.

### Vnodes અનન્ય (Unique) હોવા જોઈએ {#vnodes-must-be-unique}

ઘટક ટ્રીમાંના તમામ vnodes અનન્ય હોવા જોઈએ. તેનો અર્થ એ કે નીચેનું રેન્ડર ફંક્શન અમાન્ય છે:

```js
function render() {
  const p = h('p', 'નમસ્તે')
  return h('div', [
    // અરે - ડુપ્લિકેટ vnodes!
    p,
    p
  ])
}
```

જો તમે ખરેખર સમાન એલિમેન્ટ/ઘટકને ઘણી વખત પુનરાવર્તિત કરવા માંગતા હોવ, તો તમે ફેક્ટરી ફંક્શન (factory function) દ્વારા તેમ કરી શકો છો. ઉદાહરણ તરીકે, નીચેનું રેન્ડર ફંક્શન ૨૦ સમાન પેરેગ્રાફ્સ રેન્ડર કરવાની સાચી રીત છે:

```js
function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'નમસ્તે')
    })
  )
}
```

### `<template>` માં Vnodes નો ઉપયોગ કરવો {#using-vnodes-in-template}

```vue
<script setup>
import { h } from 'vue'

const vnode = h('button', ['નમસ્તે'])
</script>

<template>
  <!-- <component /> દ્વારા -->
  <component :is="vnode">નમસ્તે</component>

  <!-- અથવા સીધા એલિમેન્ટ તરીકે -->
  <vnode />
  <vnode>નમસ્તે</vnode>
</template>
```

`setup()` માં એક vnode ઓબ્જેક્ટ જાહેર કરવામાં આવ્યો છે, તમે તેને રેન્ડરિંગ માટે સામાન્ય ઘટકની જેમ ઉપયોગ કરી શકો છો.

:::warning
vnode એ પહેલેથી બનાવેલ રેન્ડર આઉટપુટનું પ્રતિનિધિત્વ કરે છે, ઘટક વ્યાખ્યાનું નહીં. `<template>` માં vnode નો ઉપયોગ કરવાથી નવો ઘટક ઇન્સ્ટન્સ બનતો નથી, અને vnode જેમ છે તેમ રેન્ડર થશે.

આ પેટર્નનો કાળજીપૂર્વક ઉપયોગ કરવો જોઈએ અને તે સામાન્ય ઘટકોનો વિકલ્પ નથી.
:::

## JSX / TSX {#jsx-tsx}

[JSX](https://facebook.github.io/jsx/) એ JavaScript માટેનું XML-જેવું એક્સ્ટેન્શન છે જે આપણને આના જેવો કોડ લખવાની મંજૂરી આપે છે:

```jsx
const vnode = <div>નમસ્તે</div>
```

JSX એક્સપ્રેશન્સની અંદર, ડાયનેમિક મૂલ્યો એમ્બેડ કરવા માટે કર્લી બ્રેસીસ `{}` નો ઉપયોગ કરો:

```jsx
const vnode = <div id={dynamicId}>નમસ્તે, {userName}</div>
```

`create-vue` અને Vue CLI બંનેમાં પ્રી-કોન્ફિગર કરેલ JSX સપોર્ટ સાથે પ્રોજેક્ટ સ્કેફોલ્ડ કરવાના વિકલ્પો છે. જો તમે JSX ને મેન્યુઅલી કોન્ફિગર કરી રહ્યા હોવ, તો કૃપા કરીને વિગતો માટે [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next) ના દસ્તાવેજોનો સંદર્ભ લો.

જોકે સૌ પ્રથમ React દ્વારા રજૂ કરવામાં આવ્યું હતું, JSX પાસે વાસ્તવમાં કોઈ વ્યાખ્યાયિત રનટાઇમ સિમેન્ટિક્સ નથી અને તે વિવિધ આઉટપુટ્સમાં કમ્પાઇલ કરી શકાય છે. જો તમે પહેલા JSX સાથે કામ કર્યું હોય, તો નોંધ લો કે **Vue JSX ટ્રાન્સફોર્મ React ના JSX ટ્રાન્સફોર્મ કરતા અલગ છે**, તેથી તમે Vue એપ્લિકેશન્સમાં React ના JSX ટ્રાન્સફોર્મનો ઉપયોગ કરી શકતા નથી. React JSX ના કેટલાક નોંધપાત્ર તફાવતોમાં નીચેનાનો સમાવેશ થાય છે:

- તમે `class` અને `for` જેવા HTML એટ્રિબ્યુટ્સનો ઉપયોગ પ્રોપ્સ તરીકે કરી શકો છો - `className` અથવા `htmlFor` વાપરવાની જરૂર નથી.
- ઘટકોને ચિલ્ડ્રન પાસ કરવું (એટલે કે સ્લોટ્સ) [અલગ રીતે કામ કરે છે](#passing-slots).

Vue ની ટાઇપ ડેફિનેશન (type definition) TSX વપરાશ માટે ટાઇપ ઇન્ફરન્સ પણ પૂરી પાડે છે. TSX નો ઉપયોગ કરતી વખતે, `tsconfig.json` માં `"jsx": "preserve"` નિર્દિષ્ટ કરવાની ખાતરી કરો જેથી TypeScript Vue JSX ટ્રાન્સફોર્મને પ્રોસેસ કરવા માટે JSX સિન્ટેક્સને અકબંધ રાખે.

### JSX ટાઇપ ઇન્ફરન્સ (JSX Type Inference) {#jsx-type-inference}

ટ્રાન્સફોર્મની જેમ જ, Vue ના JSX ને પણ વિવિધ ટાઇપ ડેફિનેશન્સની જરૂર છે.

Vue ૩.૪ થી શરૂ કરીને, Vue હવે વૈશ્વિક `JSX` નેમસ્પેસને ગર્ભિત રીતે રજીસ્ટર કરતું નથી. TypeScript ને Vue ની JSX ટાઇપ ડેફિનેશનનો ઉપયોગ કરવા માટે સૂચના આપવા માટે, તમારા `tsconfig.json` માં નીચેનાનો સમાવેશ કરવાનું સુનિશ્ચિત કરો:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue"
    // ...
  }
}
```

તમે ફાઇલની ટોચ પર `/* @jsxImportSource vue */` કમેન્ટ ઉમેરીને ફાઇલ દીઠ પણ પસંદ કરી શકો છો.

જો એવો કોડ છે જે વૈશ્વિક `JSX` નેમસ્પેસની હાજરી પર આધાર રાખે છે, તો તમે તમારા પ્રોજેક્ટમાં `vue/jsx` ને સ્પષ્ટપણે ઇમ્પોર્ટ કરીને અથવા રિફરન્સ આપીને ૩.૪ પહેલાની વૈશ્વિક વર્તણૂક જાળવી શકો છો, જે વૈશ્વિક `JSX` નેમસ્પેસની નોંધણી કરે છે.

## રેન્ડર ફંક્શન રેસિપિસ (Render Function Recipes) {#render-function-recipes}

નીચે અમે ટેમ્પલેટ ફીચર્સને તેમના સમકક્ષ રેન્ડર ફંક્શન્સ / JSX તરીકે અમલમાં મૂકવા માટેની કેટલીક સામાન્ય રેસિપિ પૂરી પાડીશું.

### `v-if` {#v-if}

ટેમ્પલેટ:

```vue-html
<div>
  <div v-if="ok">હા (yes)</div>
  <span v-else>ના (no)</span>
</div>
```

સમકક્ષ રેન્ડર ફંક્શન / JSX:

<div class="composition-api">

```js
h('div', [ok.value ? h('div', 'હા') : h('span', 'ના')])
```

```jsx
<div>{ok.value ? <div>હા</div> : <span>ના</span>}</div>
```

</div>
<div class="options-api">

```js
h('div', [this.ok ? h('div', 'હા') : h('span', 'ના')])
```

```jsx
<div>{this.ok ? <div>હા</div> : <span>ના</span>}</div>
```

</div>

### `v-for` {#v-for}

ટેમ્પલેટ:

```vue-html
<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li>
</ul>
```

સમકક્ષ રેન્ડર ફંક્શન / JSX:

<div class="composition-api">

```js
h(
  'ul',
  // ધારીએ છીએ કે `items` એરે વેલ્યુ સાથેનો રેફ (ref) છે
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {items.value.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>
<div class="options-api">

```js
h(
  'ul',
  this.items.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {this.items.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>

### `v-on` {#v-on}

જે પ્રોપ્સના નામ `on` થી શરૂ થાય છે અને તે પછી અપરકેસ અક્ષર આવે છે તેને ઇવેન્ટ લિસનર્સ (event listeners) તરીકે ગણવામાં આવે છે. ઉદાહરણ તરીકે, `onClick` એ ટેમ્પલેટ્સમાં `@click` ની સમકક્ષ છે.

```js
h(
  'button',
  {
    onClick(event) {
      /* ... */
    }
  },
  'મને ક્લિક કરો'
)
```

```jsx
<button
  onClick={(event) => {
    /* ... */
  }}
>
  મને ક્લિક કરો
</button>
```

#### ઇવેન્ટ મોડિફાયર્સ (Event Modifiers) {#event-modifiers}

`.passive`, `.capture`, અને `.once` ઇવેન્ટ મોડિફાયર્સ માટે, તેમને camelCase નો ઉપયોગ કરીને ઇવેન્ટના નામ પછી જોડી શકાય છે.

ઉદાહરણ તરીકે:

```js
h('input', {
  onClickCapture() {
    /* capture મોડમાં લિસનર */
  },
  onKeyupOnce() {
    /* માત્ર એક વાર ટ્રિગર થાય છે */
  },
  onMouseoverOnceCapture() {
    /* once + capture */
  }
})
```

```jsx
<input
  onClickCapture={() => {}}
  onKeyupOnce={() => {}}
  onMouseoverOnceCapture={() => {}}
/>
```

અન્ય ઇવેન્ટ અને કી મોડિફાયર્સ માટે, [`withModifiers`](/api/render-function#withmodifiers) હેલ્પરનો ઉપયોગ કરી શકાય છે:

```js
import { withModifiers } from 'vue'

h('div', {
  onClick: withModifiers(() => {}, ['self'])
})
```

```jsx
<div onClick={withModifiers(() => {}, ['self'])} />
```

### ઘટકો (Components) {#components}

ઘટક માટે vnode બનાવવા માટે, `h()` માં પાસ કરેલ પ્રથમ આર્ગ્યુમેન્ટ ઘટક વ્યાખ્યા (component definition) હોવી જોઈએ. આનો અર્થ એ છે કે જ્યારે રેન્ડર ફંક્શન્સનો ઉપયોગ કરવામાં આવે ત્યારે ઘટકોને રજીસ્ટર કરવાની જરૂર નથી - તમે સીધા જ ઇમ્પોર્ટ કરેલ ઘટકોનો ઉપયોગ કરી શકો છો:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return h('div', [h(Foo), h(Bar)])
}
```

```jsx
function render() {
  return (
    <div>
      <Foo />
      <Bar />
    </div>
  )
}
```

જેમ આપણે જોઈ શકીએ છીએ, જ્યાં સુધી તે માન્ય Vue ઘટક છે ત્યાં સુધી `h` કોઈપણ ફાઇલ ફોર્મેટમાંથી ઇમ્પોર્ટ કરાયેલ ઘટકો સાથે કામ કરી શકે છે.

રેન્ડર ફંક્શન્સ સાથે ડાયનેમિક ઘટકો સીધા છે:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return ok.value ? h(Foo) : h(Bar)
}
```

```jsx
function render() {
  return ok.value ? <Foo /> : <Bar />
}
```

જો કોઈ ઘટક નામ દ્વારા રજીસ્ટર થયેલ હોય અને તેને સીધું ઇમ્પોર્ટ કરી શકાતું નથી (ઉદાહરણ તરીકે, લાઇબ્રેરી દ્વારા વૈશ્વિક સ્તરે રજીસ્ટર થયેલ), તો તેને [`resolveComponent()`](/api/render-function#resolvecomponent) હેલ્પરનો ઉપયોગ કરીને પ્રોગ્રામેટિક રીતે ઉકેલી શકાય છે.

### સ્લોટ્સ (Slots) રેન્ડર કરવા {#rendering-slots}

<div class="composition-api">

રેન્ડર ફંક્શન્સમાં, સ્લોટ્સને `setup()` કોન્ટેક્ષમાંથી એક્સેસ કરી શકાય છે. `slots` ઓબ્જેક્ટ પરનો દરેક સ્લોટ એક **ફંક્શન છે જે vnodes નો એરે પરત કરે છે**:

```js
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      // default slot:
      // <div><slot /></div>
      h('div', slots.default()),

      // named slot:
      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        slots.footer({
          text: props.message
        })
      )
    ]
  }
}
```

JSX સમકક્ષ:

```jsx
// default
<div>{slots.default()}</div>

// named
<div>{slots.footer({ text: props.message })}</div>
```

</div>
<div class="options-api">

રેન્ડર ફંક્શન્સમાં, સ્લોટ્સ [`this.$slots`](/api/component-instance#slots) પરથી એક્સેસ કરી શકાય છે:

```js
export default {
  props: ['message'],
  render() {
    return [
      // <div><slot /></div>
      h('div', this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        this.$slots.footer({
          text: this.message
        })
      )
    ]
  }
}
```

JSX સમકક્ષ:

```jsx
// <div><slot /></div>
<div>{this.$slots.default()}</div>

// <div><slot name="footer" :text="message" /></div>
<div>{this.$slots.footer({ text: this.message })}</div>
```

</div>

### સ્લોટ્સ પસાર કરવા (Passing Slots) {#passing-slots}

ઘટકોને બાળકો (children) પસાર કરવા તે એલિમેન્ટ્સને બાળકો પસાર કરવાથી થોડું અલગ રીતે કામ કરે છે. એરેને બદલે, આપણે ક્યાં તો સ્લોટ ફંક્શન અથવા સ્લોટ ફંક્શનનો ઓબ્જેક્ટ પાસ કરવાની જરૂર છે. સ્લોટ ફંક્શન્સ કંઈપણ પરત કરી શકે છે જે સામાન્ય રેન્ડર ફંક્શન પરત કરી શકે છે - જ્યારે ચાઇલ્ડ ઘટકમાં એક્સેસ કરવામાં આવે ત્યારે તે હંમેશા vnodes ના એરેમાં નોર્મલાઇઝ કરવામાં આવશે.

```js
// સિંગલ ડિફોલ્ટ સ્લોટ
h(MyComponent, () => 'નમસ્તે')

// નેમ્ડ સ્લોટ્સ
// નોંધ લો કે `null` જરૂરી છે જેથી
// સ્લોટ્સ ઓબ્જેક્ટને પ્રોપ્સ તરીકે ગણવામાં ન આવે
h(MyComponent, null, {
  default: () => 'ડિફોલ્ટ સ્લોટ',
  foo: () => h('div', 'foo'),
  bar: () => [h('span', 'એક'), h('span', 'બે')]
})
```

JSX સમકક્ષ:

```jsx
// default
<MyComponent>{() => 'નમસ્તે'}</MyComponent>

// named
<MyComponent>{{
  default: () => 'ડિફોલ્ટ સ્લોટ',
  foo: () => <div>foo</div>,
  bar: () => [<span>એક</span>, <span>બે</span>]
}}</MyComponent>
```

ફંક્શન્સ તરીકે સ્લોટ્સ પસાર કરવાથી તેઓ ચાઇલ્ડ ઘટક દ્વારા આળસથી (lazily) બોલાવી શકાય છે. આનાથી સ્લોટની ડિપેન્ડન્સીસ પેરેન્ટને બદલે ચાઇલ્ડ દ્વારા ટ્રેક કરવામાં આવે છે, જેના પરિણામે વધુ સચોટ અને કાર્યક્ષમ અપડેટ્સ મળે છે.

### સ્કોપ્ડ સ્લોટ્સ (Scoped Slots) {#scoped-slots}

પેરેન્ટ ઘટકમાં સ્કોપ્ડ સ્લોટ (scoped slot) રેન્ડર કરવા માટે, ચાઇલ્ડને સ્લોટ પાસ કરવામાં આવે છે. નોંધ લો કે સ્લોટ પાસે હવે પેરામીટર `text` છે. સ્લોટને ચાઇલ્ડ ઘટકમાં કોલ કરવામાં આવશે અને ચાઇલ્ડ ઘટકનો ડેટા પેરેન્ટ ઘટકને પસાર કરવામાં આવશે.

```js
// પેરેન્ટ ઘટક
export default {
  setup() {
    return () => h(MyComp, null, {
      default: ({ text }) => h('p', text)
    })
  }
}
```

`null` પાસ કરવાનું યાદ રાખો જેથી સ્લોટ્સને પ્રોપ્સ તરીકે ગણવામાં ન આવે.

```js
// ચાઇલ્ડ ઘટક
export default {
  setup(props, { slots }) {
    const text = ref('નમસ્તે')
    return () => h('div', null, slots.default({ text: text.value }))
  }
}
```

JSX સમકક્ષ:

```jsx
<MyComponent>{{
  default: ({ text }) => <p>{ text }</p>  
}}</MyComponent>
```

### બિલ્ટ-ઇન ઘટકો {#built-in-components}

[બિલ્ટ-ઇન ઘટકો](/api/built-in-components) જેમ કે `<KeepAlive>`, `<Transition>`, `<TransitionGroup>`, `<Teleport>` અને `<Suspense>` ને રેન્ડર ફંક્શન્સમાં ઉપયોગ કરવા માટે ઇમ્પોર્ટ કરવા આવશ્યક છે:

<div class="composition-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  setup () {
    return () => h(Transition, { mode: 'out-in' }, /* ... */)
  }
}
```

</div>
<div class="options-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  render () {
    return h(Transition, { mode: 'out-in' }, /* ... */)
  }
}
```

</div>

### `v-model` {#v-model}

`v-model` ડાયરેક્ટિવ ટેમ્પલેટ કમ્પાલેશન દરમિયાન `modelValue` અને `onUpdate:modelValue` પ્રોપ્સમાં વિસ્તૃત થાય છે—આપણે આ પ્રોપ્સ જાતે જ પ્રદાન કરવી પડશે:

<div class="composition-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
```

</div>
<div class="options-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h(SomeComponent, {
      modelValue: this.modelValue,
      'onUpdate:modelValue': (value) => this.$emit('update:modelValue', value)
    })
  }
}
```

</div>

### કસ્ટમ ડાયરેક્ટિવ્સ (Custom Directives) {#custom-directives}

[`withDirectives`](/api/render-function#withdirectives) નો ઉપયોગ કરીને vnode પર કસ્ટમ ડાયરેક્ટિવ્સ લાગુ કરી શકાય છે:

```js
import { h, withDirectives } from 'vue'

// એક કસ્ટમ ડાયરેક્ટિવ
const pin = {
  mounted() { /* ... */ },
  updated() { /* ... */ }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```

જો ડાયરેક્ટિવ નામ દ્વારા રજીસ્ટર થયેલ છે અને તેને સીધું ઇમ્પોર્ટ કરી શકાતું નથી, તો તેને [`resolveDirective`](/api/render-function#resolvedirective) હેલ્પરનો ઉપયોગ કરીને ઉકેલી શકાય છે.

### ટેમ્પલેટ રેફ્સ (Template Refs) {#template-refs}

<div class="composition-api">

કોમ્પોઝિશન API સાથે, જ્યારે [`useTemplateRef()`](/api/composition-api-helpers#usetemplateref) <sup class="vt-badge" data-text="3.5+" /> નો ઉપયોગ કરવામાં આવે છે, ત્યારે vnode માં પ્રોપ તરીકે સ્ટ્રિંગ વેલ્યુ પાસ કરીને ટેમ્પલેટ રેફ્સ બનાવવામાં આવે છે:

```js
import { h, useTemplateRef } from 'vue'

export default {
  setup() {
    const divEl = useTemplateRef('my-div')

    // <div ref="my-div">
    return () => h('div', { ref: 'my-div' })
  }
}
```

<details>
<summary>૩.૫ પહેલાનો વપરાશ</summary>

૩.૫ પહેલાની આવૃત્તિઓમાં જ્યાં useTemplateRef() રજૂ કરવામાં આવ્યું ન હતું, ત્યાં vnode માં પ્રોપ તરીકે `ref()` ને જ પાસ કરીને ટેમ્પલેટ રેફ્સ બનાવવામાં આવે છે:

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const divEl = ref()

    // <div ref="divEl">
    return () => h('div', { ref: divEl })
  }
}
```
</details>
</div>
<div class="options-api">

ઓપ્શન્સ API સાથે, vnode પ્રોપ્સમાં સ્ટ્રિંગ તરીકે રેફ નામ પાસ કરીને ટેમ્પલેટ રેફ્સ બનાવવામાં આવે છે:

```js
export default {
  render() {
    // <div ref="divEl">
    return h('div', { ref: 'divEl' })
  }
}
```

</div>

## ફંક્શનલ ઘટકો (Functional Components) {#functional-components}

ફંક્શનલ ઘટકો ઘટકનું વૈકલ્પિક સ્વરૂપ છે જેમાં તેમની પોતાની કોઈ સ્ટેટ હોતી નથી. તેઓ શુદ્ધ ફંક્શન્સની જેમ કાર્ય કરે છે: પ્રોપ્સ ઇન (in), vnodes આઉટ (out). તેઓ ઘટક ઇન્સ્ટન્સ (એટલે ​​કે કોઈ `this` નહીં) બનાવ્યા વિના અને સામાન્ય ઘટક લાઇફસાયકલ હૂક્સ વિના રેન્ડર થાય છે.

ફંક્શનલ ઘટક બનાવવા માટે અમે ઓપ્શન્સ ઓબ્જેક્ટને બદલે સાદા ફંક્શનનો ઉપયોગ કરીએ છીએ. ફંક્શન ખરેખર ઘટક માટેનું `render` ફંક્શન છે.

<div class="composition-api">

ફંક્શનલ ઘટકની સિગ્નેચર `setup()` હૂક જેવી જ છે:

```js
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

</div>
<div class="options-api">

ફંક્શનલ ઘટક માટે કોઈ `this` રિફરન્સ ન હોવાથી, Vue પ્રથમ આર્ગ્યુમેન્ટ તરીકે `props` પાસ કરશે:

```js
function MyComponent(props, context) {
  // ...
}
```

બીજો આર્ગ્યુમેન્ટ, `context`, ત્રણ પ્રોપર્ટીઝ ધરાવે છે: `attrs`, `emit` અને `slots`. આ અનુક્રમે ઇન્સ્ટન્સ પ્રોપર્ટીઝ [`$attrs`](/api/component-instance#attrs), [`$emit`](/api/component-instance#emit) અને [`$slots`](/api/component-instance#slots) ની સમકક્ષ છે.

</div>

ઘટકો માટેના મોટાભાગના સામાન્ય કોન્ફિગરેશન ઓપ્શન્સ ફંક્શનલ ઘટકો માટે ઉપલબ્ધ નથી. જો કે, પ્રોપર્ટીઝ તરીકે ઉમેરીને [`props`](/api/options-state#props) અને [`emits`](/api/options-state#emits) ને વ્યાખ્યાયિત કરવું શક્ય છે:

```js
MyComponent.props = ['value']
MyComponent.emits = ['click']
```

જો `props` ઓપ્શન નિર્દિષ્ટ કરેલ નથી, તો ફંક્શનમાં પસાર થયેલ `props` ઓબ્જેક્ટમાં `attrs` ની જેમ જ તમામ એટ્રિબ્યુટ્સ હશે. જ્યાં સુધી `props` વિકલ્પ નિર્દિષ્ટ ન હોય ત્યાં સુધી પ્રોપ નામો camelCase માં નોર્મલાઇઝ થશે નહીં.

સ્પષ્ટ `props` વાળા ફંક્શનલ ઘટકો માટે, [એટ્રિબ્યુટ ફોલથ્રુ (attribute fallthrough)](/guide/components/attrs) સામાન્ય ઘટકોની જેમ જ કામ કરે છે. જો કે, ફંક્શનલ ઘટકો કે જે તેમના `props` ને સ્પષ્ટપણે નિર્દિષ્ટ કરતા નથી, ડિફોલ્ટ રૂપે માત્ર `class`, `style`, અને `onXxx` ઇવેન્ટ લિસનર્સ `attrs` માંથી વારસામાં મળશે. બંને કિસ્સામાં, એટ્રિબ્યુટ વારસાને અક્ષમ કરવા માટે `inheritAttrs` ને `false` પર સેટ કરી શકાય છે:

```js
MyComponent.inheritAttrs = false
```

ફંક્શનલ ઘટકો સામાન્ય ઘટકોની જેમ જ રજીસ્ટર અને ઉપયોગ કરી શકાય છે. જો તમે `h()` ના પ્રથમ આર્ગ્યુમેન્ટ તરીકે ફંક્શન પાસ કરો છો, તો તેને ફંક્શનલ ઘટક તરીકે ગણવામાં આવશે.

### ફંક્શનલ ઘટકોને ટાઇપ કરવા (Typing Functional Components) {#typing-functional-components}

ફંક્શનલ ઘટકો તેઓ નામવાળા છે કે અનામી છે તેના આધારે ટાઇપ કરી શકાય છે. [Vue - Official extension](https://github.com/vuejs/language-tools) જ્યારે SFC ટેમ્પલેટ્સમાં તેનો ઉપયોગ કરવામાં આવે ત્યારે યોગ્ય રીતે ટાઇપ કરેલા ફંક્શનલ ઘટકોના ટાઇપ ચેકિંગને પણ સપોર્ટ કરે છે.

**નામવાળું ફંક્શનલ ઘટક (Named Functional Component)**

```tsx
import type { SetupContext } from 'vue'
type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

function FComponent(
  props: FComponentProps,
  context: SetupContext<Events>
) {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value: unknown) => typeof value === 'string'
}
```

**અનામી ફંક્શનલ ઘટક (Anonymous Functional Component)**

```tsx
import type { FunctionalComponent } from 'vue'

type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

const FComponent: FunctionalComponent<FComponentProps, Events> = (
  props,
  context
) => {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value) => typeof value === 'string'
}
```
