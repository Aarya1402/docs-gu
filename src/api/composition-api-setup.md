# Composition API: setup() {#composition-api-setup}

## મૂળભૂત ઉપયોગ (Basic Usage) {#basic-usage}

`setup()` હૂક નીચેના કિસ્સાઓમાં ઘટકોમાં Composition API ઉપયોગ માટેના entry point તરીકે કામ કરે છે:

૧. બિલ્ડ સ્ટેપ વિના Composition API ઉપયોગ કરવો;
૨. Options API ઘટકમાં Composition-API-based code ને integrate કરવો.

:::info નોંધ
જો તમે Single-File Components સાથે Composition API ઉપયોગ કરી રહ્યાં છો, તો વધુ સંક્ષિપ્ત અને ergonomic syntax માટે [`<script setup>`](/api/sfc-script-setup) ની ભારપૂર્વક ભલામણ કરવામાં આવે છે.
:::

અમે [Reactivity APIs](./reactivity-core) ઉપયોગ કરીને reactive state declare કરી શકીએ અને `setup()` માંથી object return કરીને તેમને template ને expose કરી શકીએ. Returned object ની properties ઘટક ઇન્સ્ટન્સ પર પણ ઉપલબ્ધ કરવામાં આવશે (જો અન્ય options ઉપયોગ થતા હોય):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // template અને અન્ય options API hooks ને expose કરો
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

`setup` માંથી return થયેલા [refs](/api/reactivity-core#ref) template માં access કરતી વખતે [automatically shallow unwrapped](/guide/essentials/reactivity-fundamentals#deep-reactivity) થાય છે તેથી તમારે `.value` ઉપયોગ કરવાની જરૂર નથી. `this` પર access કરતી વખતે પણ તેઓ એ જ રીતે unwrap થાય છે.

`setup()` પોતે ઘટક ઇન્સ્ટન્સ access કરતું નથી - `setup()` અંદર `this` ની value `undefined` હશે. તમે Options API માંથી Composition-API-exposed values access કરી શકો, પરંતુ ઊલટું (other way around) નહીં.

`setup()` _synchronously_ object return કરવો જોઈએ. ફક્ત એક જ case જ્યારે `async setup()` ઉપયોગ કરી શકાય તે છે જ્યારે ઘટક [Suspense](../guide/built-ins/suspense) ઘટકનો descendant હોય.

## Props Access કરવા {#accessing-props}

`setup` function માં પ્રથમ આર્ગ્યુમેન્ટ `props` આર્ગ્યુમેન્ટ છે. Standard ઘટકમાં તમે અપેક્ષા રાખતા હોવ તે પ્રમાણે, `setup` function અંદર `props` reactive છે અને નવા props પાસ થાય ત્યારે updated થશે.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

નોંધ કરો કે જો તમે `props` object ને destructure કરો, તો destructured variables reactivity ગુમાવશે. તેથી હંમેશા `props.xxx` ના format માં props access કરવાની ભલામણ કરવામાં આવે છે.

જો તમારે ખરેખર props destructure કરવાની જરૂર હોય, અથવા reactivity જાળવીને prop ને external function માં પાસ કરવાની જરૂર હોય, તો [toRefs()](./reactivity-utilities#torefs) અને [toRef()](/api/reactivity-utilities#toref) utility APIs સાથે કરી શકો:

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // `props` ને refs ના object માં ફેરવો, પછી destructure કરો
    const { title } = toRefs(props)
    // `title` ref છે જે `props.title` ને track કરે છે
    console.log(title.value)

    // અથવા, `props` ની single property ને ref માં ફેરવો
    const title = toRef(props, 'title')
  }
}
```

## Setup Context {#setup-context}

`setup` function ને પાસ કરવામાં આવેલ બીજો આર્ગ્યુમેન્ટ **Setup Context** ઓબ્જેક્ટ છે. Context ઓબ્જેક્ટ અન્ય values expose કરે છે જે `setup` અંદર ઉપયોગી હોઈ શકે:

```js
export default {
  setup(props, context) {
    // Attributes (Non-reactive ઓબ્જેક્ટ, $attrs ના સમકક્ષ)
    console.log(context.attrs)

    // Slots (Non-reactive ઓબ્જેક્ટ, $slots ના સમકક્ષ)
    console.log(context.slots)

    // Events Emit કરો (Function, $emit ના સમકક્ષ)
    console.log(context.emit)

    // Public properties expose કરો (Function)
    console.log(context.expose)
  }
}
```

Context ઓબ્જેક્ટ reactive નથી અને સુરક્ષિત રીતે destructure કરી શકાય:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` અને `slots` stateful ઓબ્જેક્ટ્સ છે જે હંમેશા update થાય છે જ્યારે ઘટક પોતે update થાય. આનો અર્થ એ છે કે તમારે તેમને destructure કરવાનું ટાળવું જોઈએ અને હંમેશા properties ને `attrs.x` અથવા `slots.x` તરીકે reference કરવી. એ પણ નોંધ કરો કે, `props` થી વિપરીત, `attrs` અને `slots` ની properties reactive **નથી**. જો તમે `attrs` અથવા `slots` ના changes પર side effects apply કરવા માંગો, તો `onBeforeUpdate` lifecycle hook અંદર કરવું જોઈએ.

### Public Properties Expose કરવી {#exposing-public-properties}

`expose` એક function છે જેનો ઉપયોગ parent ઘટક દ્વારા [template refs](/guide/essentials/template-refs#ref-on-component) દ્વારા ઘટક ઇન્સ્ટન્સ access કરતી વખતે expose થતી properties ને explicitly limit કરવા માટે થઈ શકે:

```js{5,10}
export default {
  setup(props, { expose }) {
    // instance ને "closed" બનાવો -
    // i.e. parent ને કંઈ expose ન કરો
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // local state ને selectively expose કરો
    expose({ count: publicCount })
  }
}
```

## Render Functions સાથે ઉપયોગ {#usage-with-render-functions}

`setup` [render function](/guide/extras/render-function) પણ return કરી શકે છે જે same scope માં declared reactive state ને directly ઉપયોગ કરી શકે:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

Render function return કરવાથી અન્ય કંઈ return કરવાનું અટકે છે. આંતરિક રીતે તે સમસ્યા ન હોવી જોઈએ, પરંતુ જો આપણે template refs દ્વારા parent component ને આ ઘટકના methods expose કરવા માંગીએ તો સમસ્યારૂપ હોઈ શકે.

આ સમસ્યાને [`expose()`](#exposing-public-properties) બોલાવીને ઉકેલી શકીએ:

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

`increment` method પછી template ref દ્વારા parent component માં ઉપલબ્ધ હશે.
