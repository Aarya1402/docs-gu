# રિએક્ટિવિટી ટ્રાન્સફોર્મ (Reactivity Transform) {#reactivity-transform}

:::danger દૂર કરાયેલ પ્રાયોગિક સુવિધા (Removed Experimental Feature)
Reactivity Transform એક પ્રાયોગિક સુવિધા હતી, અને તેને નવીનતમ ૩.૪ રિલીઝમાં દૂર કરવામાં આવી છે. કૃપા કરીને [અહીંના કારણો](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028) વિશે વાંચો.

જો તમે હજુ પણ તેનો ઉપયોગ કરવા માંગતા હોવ, તો તે હવે [Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html) પ્લગિન દ્વારા ઉપલબ્ધ છે.
:::

:::tip કોમ્પોઝિશન-API-વિશિષ્ટ (Composition-API-specific)
Reactivity Transform એ કોમ્પોઝિશન-API-વિશિષ્ટ સુવિધા છે અને તેને બિલ્ડ સ્ટેપની જરૂર છે.
:::

## રેફ્સ વિરુદ્ધ રિએક્ટિવ વેરિએબલ્સ (Refs vs. Reactive Variables) {#refs-vs-reactive-variables}

કોમ્પોઝિશન API ની રજૂઆત થઈ ત્યારથી, પ્રાથમિક વણઉકેલ્યા પ્રશ્નોમાંનો એક રેફ્સ (refs) વિરુદ્ધ રિએક્ટિવ ઓબ્જેક્ટ્સનો ઉપયોગ છે. રિએક્ટિવ ઓબ્જેક્ટ્સને ડિસ્ટ્રક્ચર (destructuring) કરતી વખતે રિએક્ટિવિટી ગુમાવવી સરળ છે, જ્યારે રેફ્સનો ઉપયોગ કરતી વખતે દરેક જગ્યાએ `.value` નો ઉપયોગ કરવો કંટાળાજનક હોઈ શકે છે. વળી, જો ટાઈપ સિસ્ટમનો ઉપયોગ ન કરતા હોય તો `.value` જોવાનું ચૂકી જવું સરળ છે.

[Vue Reactivity Transform](https://github.com/vuejs/core/tree/main/packages/reactivity-transform) એ કમ્પાઇલ-ટાઇમ ટ્રાન્સફોર્મ (compile-time transform) છે જે આપણને આના જેવો કોડ લખવાની મંજૂરી આપે છે:

```vue
<script setup>
let count = $ref(0)

console.log(count)

function increment() {
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

અહીં `$ref()` પદ્ધતિ એ **કમ્પાઇલ-ટાઇમ મેક્રો (compile-time macro)** છે: તે કોઈ વાસ્તવિક પદ્ધતિ નથી જે રનટાઇમ પર કોલ કરવામાં આવશે. તેના બદલે, Vue કમ્પાઇલર પરિણામી `count` વેરિએબલને **રિએક્ટિવ વેરિએબલ (reactive variable)** તરીકે ગણવા માટે તેનો ઉપયોગ સંકેત (hint) તરીકે કરે છે.

રિએક્ટિવ વેરિએબલ્સને સામાન્ય વેરિએબલ્સની જેમ જ એક્સેસ અને ફરીથી અસાઇન કરી શકાય છે, પરંતુ આ ઓપરેશન્સ `.value` સાથે રેફ્સમાં કમ્પાઇલ થાય છે. ઉદાહરણ તરીકે, ઉપરના ઘટકનો `<script>` ભાગ આમાં કમ્પાઇલ થાય છે:

```js{5,8}
import { ref } from 'vue'

let count = ref(0)

console.log(count.value)

function increment() {
  count.value++
}
```

રિએક્ટિવિટી API જે રેફ્સ પરત કરે છે તેમાં `$`-પ્રીફિક્સવાળા મેક્રો સમકક્ષ હશે. આ APIs માં નીચેનાનો સમાવેશ થાય છે:

- [`ref`](/api/reactivity-core#ref) -> `$ref`
- [`computed`](/api/reactivity-core#computed) -> `$computed`
- [`shallowRef`](/api/reactivity-advanced#shallowref) -> `$shallowRef`
- [`customRef`](/api/reactivity-advanced#customref) -> `$customRef`
- [`toRef`](/api/reactivity-utilities#toref) -> `$toRef`

જ્યારે Reactivity Transform સક્ષમ હોય ત્યારે આ મેક્રોસ વૈશ્વિક સ્તરે ઉપલબ્ધ હોય છે અને તેને ઇમ્પોર્ટ કરવાની જરૂર નથી, પરંતુ જો તમે વધુ સ્પષ્ટ થવા માંગતા હોવ તો તમે વૈકલ્પિક રીતે તેમને `vue/macros` માંથી ઇમ્પોર્ટ કરી શકો છો:

```js
import { $ref } from 'vue/macros'

let count = $ref(0)
```

## `$()` સાથે ડિસ્ટ્રક્ચરિંગ (Destructuring with `$()`) {#destructuring-with}

કોમ્પોઝિશન ફંક્શન માટે રેફ્સનો ઓબ્જેક્ટ પરત કરવો અને આ રેફ્સને પુનઃપ્રાપ્ત કરવા માટે ડિસ્ટ્રક્ચરિંગનો ઉપયોગ કરવો સામાન્ય છે. આ હેતુ માટે, રિએક્ટિવિટી ટ્રાન્સફોર્મ **`$()`** મેક્રો પ્રદાન કરે છે:

```js
import { useMouse } from '@vueuse/core'

const { x, y } = $(useMouse())

console.log(x, y)
```

કમ્પાઇલ કરેલ આઉટપુટ:

```js
import { toRef } from 'vue'
import { useMouse } from '@vueuse/core'

const __temp = useMouse(),
  x = toRef(__temp, 'x'),
  y = toRef(__temp, 'y')

console.log(x.value, y.value)
```

નોંધ કરો કે જો `x` પહેલેથી જ રેફ છે, તો `toRef(__temp, 'x')` તેને જેમ છે તેમ પરત કરશે અને કોઈ વધારાનું રેફ બનાવવામાં આવશે નહીં. જો ડિસ્ટ્રક્ચર કરેલી વેલ્યુ રેફ નથી (દા.ત. ફંક્શન), તો તે હજુ પણ કામ કરશે - વેલ્યુ એ રેફમાં વીંટાળવામાં આવશે જેથી બાકીનો કોડ અપેક્ષા મુજબ કાર્ય કરે.

`$()` ડિસ્ટ્રક્ચર રિએક્ટિવ ઓબ્જેક્ટ્સ **અને** રેફ્સ ધરાવતા સાદા ઓબ્જેક્ટ્સ બંને પર કામ કરે છે.

## હયાત રેફ્સને `$()` સાથે રિએક્ટિવ વેરિએબલ્સમાં રૂપાંતરિત કરો (Convert Existing Refs to Reactive Variables with `$()`) {#convert-existing-refs-to-reactive-variables-with}

કેટલાક કિસ્સાઓમાં આપણે એવા ફંક્શન્સ લપેટ્યા હોઈ શકે છે જે રેફ્સ પણ પરત કરે છે. જો કે, Vue કમ્પાઇલર સમય પહેલા જાણી શકશે નહીં કે ફંક્શન રેફ પરત કરવાનું છે. આવા કિસ્સાઓમાં, `$()` મેક્રોનો ઉપયોગ કોઈપણ હયાત રેફ્સને રિએક્ટિવ વેરિએબલ્સમાં રૂપાંતરિત કરવા માટે પણ થઈ શકે છે:

```js
function myCreateRef() {
  return ref(0)
}

let count = $(myCreateRef())
```

## રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચર (Reactive Props Destructure) {#reactive-props-destructure}

`<script setup>` માં વર્તમાન `defineProps()` વપરાશ સાથે બે પીડાદાયક મુદ્દાઓ છે:

૧. `.value` ની જેમ જ, તમારે રિએક્ટિવિટી જાળવી રાખવા માટે હંમેશા પ્રોપ્સને `props.x` તરીકે એક્સેસ કરવાની જરૂર છે. આનો અર્થ એ છે કે તમે `defineProps` ને ડિસ્ટ્રક્ચર કરી શકતા નથી કારણ કે પરિણામી વેરિએબલ્સ રિએક્ટિવ નથી અને અપડેટ થશે નહીં.

૨. જ્યારે [ટાઈપ-ઓન્લી પ્રોપ્સ ડિક્લેરેશન (type-only props declaration)](/api/sfc-script-setup#type-only-props-emit-declarations) નો ઉપયોગ કરવામાં આવે છે, ત્યારે પ્રોપ્સ માટે ડિફોલ્ટ વેલ્યુઝ જાહેર કરવાનો કોઈ સરળ રસ્તો નથી. અમે આ હેતુ માટે `withDefaults()` API રજૂ કર્યું છે, પરંતુ તેનો ઉપયોગ કરવો હજુ પણ કંટાળાજનક છે.

જ્યારે `defineProps` નો ઉપયોગ ડિસ્ટ્રક્ચરિંગ સાથે કરવામાં આવે ત્યારે કમ્પાઇલ-ટાઇમ ટ્રાન્સફોર્મ લાગુ કરીને આપણે આ સમસ્યાઓને ઉકેલી શકીએ છીએ, જે આપણે અગાઉ `$()` સાથે જોયું હતું:

```html
<script setup lang="ts">
  interface Props {
    msg: string
    count?: number
    foo?: string
  }

  const {
    msg,
    // ડિફોલ્ટ વેલ્યુ સાચી રીતે કામ કરે છે
    count = 1,
    // લોકલ એલિયાસિંગ (local aliasing) પણ કામ કરી રહ્યું છે
    // અહીં અમે `props.foo` ને `bar` નામ આપી રહ્યા છીએ
    foo: bar
  } = defineProps<Props>()

  watchEffect(() => {
    // જ્યારે પણ પ્રોપ્સ બદલાશે ત્યારે લોગ થશે
    console.log(msg, count, bar)
  })
</script>
```

ઉપરનું નીચેના રનટાઇમ ડિક્લેરેશન સમકક્ષમાં કમ્પાઇલ કરવામાં આવશે:

```js
export default {
  props: {
    msg: { type: String, required: true },
    count: { type: Number, default: 1 },
    foo: String
  },
  setup(props) {
    watchEffect(() => {
      console.log(props.msg, props.count, props.foo)
    })
  }
}
```

## ફંક્શન બાઉન્ડ્રીઝમાં રિએક્ટિવિટી જાળવી રાખવી (Retaining Reactivity Across Function Boundaries) {#retaining-reactivity-across-function-boundaries}

જ્યારે રિએક્ટિવ વેરિએબલ્સ આપણને દરેક જગ્યાએ `.value` નો ઉપયોગ કરવાથી મુક્ત કરે છે, જ્યારે આપણે ફંક્શન બાઉન્ડ્રીઝમાં રિએક્ટિવ વેરિએબલ્સ પાસ કરીએ છીએ ત્યારે તે "રિએક્ટિવિટી લોસ" ની સમસ્યા ઊભી કરે છે. આ બે કિસ્સાઓમાં થઈ શકે છે:

### ફંક્શનમાં આર્ગ્યુમેન્ટ તરીકે પાસ કરવું {#passing-into-function-as-argument}

ધારો કે કોઈ ફંક્શન આર્ગ્યુમેન્ટ તરીકે એક રેફની અપેક્ષા રાખે છે, દા.ત.:

```ts
function trackChange(x: Ref<number>) {
  watch(x, (x) => {
    console.log('x બદલાયું!')
  })
}

let count = $ref(0)
trackChange(count) // કામ કરશે નહીં!
```

ઉપરનો કેસ અપેક્ષા મુજબ કામ કરશે નહીં કારણ કે તે આમાં કમ્પાઇલ થાય છે:

```ts
let count = ref(0)
trackChange(count.value)
```

અહીં `count.value` નંબર તરીકે પાસ કરવામાં આવ્યું છે, જ્યારે `trackChange` વાસ્તવિક રેફની અપેક્ષા રાખે છે. `count` ને પાસ કરતા પહેલા તેને `$$()` સાથે વીંટાળીને આને ઠીક કરી શકાય છે:

```diff
let count = $ref(0)
- trackChange(count)
+ trackChange($$(count))
```

ઉપરનું આમાં કમ્પાઇલ થાય છે:

```js
import { ref } from 'vue'

let count = ref(0)
trackChange(count)
```

જેમ આપણે જોઈ શકીએ છીએ, `$$()` એક મેક્રો છે જે **એસ્કેપ હિન્ટ (escape hint)** તરીકે કામ કરે છે: `$$()` ની અંદરના રિએક્ટિવ વેરિએબલ્સને `.value` જોડવામાં આવશે નહીં.

### ફંક્શન સ્કોપની અંદર પરત કરવું {#returning-inside-function-scope}

જો પરત કરેલા એક્સપ્રેશનમાં રિએક્ટિવ વેરિએબલ્સનો સીધો ઉપયોગ કરવામાં આવે તો તે રિએક્ટિવિટી ગુમાવી શકે છે:

```ts
function useMouse() {
  let x = $ref(0)
  let y = $ref(0)

  // માઉસમૂવ સાંભળો...

  // કામ કરશે નહીં!
  return {
    x,
    y
  }
}
```

ઉપરનું રિટર્ન સ્ટેટમેન્ટ આમાં કમ્પાઇલ થાય છે:

```ts
return {
  x: x.value,
  y: y.value
}
```

રિએક્ટિવિટી જાળવી રાખવા માટે, આપણે વાસ્તવિક રેફ્સ પરત કરવા જોઈએ, પરત કરતી વખતે વર્તમાન વેલ્યુ નહીં.

ફરીથી, અમે આને ઠીક કરવા માટે `$$()` નો ઉપયોગ કરી શકીએ છીએ. આ કિસ્સામાં, `$$()` નો ઉપયોગ સીધો પરત કરેલા ઓબ્જેક્ટ પર કરી શકાય છે - `$$()` કોલની અંદર રિએક્ટિવ વેરિએબલ્સનો કોઈપણ સંદર્ભ તેમના મૂળ રેફ્સના સંદર્ભને જાળવી રાખશે:

```ts
function useMouse() {
  let x = $ref(0)
  let y = $ref(0)

  // માઉસમૂવ સાંભળો...

  // ઠીક કર્યું
  return $$({
    x,
    y
  })
}
```

### ડિસ્ટ્રક્ચર કરેલ પ્રોપ્સ પર `$$()` નો ઉપયોગ કરવો {#using-on-destructured-props}

`$$()` ડિસ્ટ્રક્ચર કરેલ પ્રોપ્સ પર કામ કરે છે કારણ કે તે પણ રિએક્ટિવ વેરિએબલ્સ છે. કમ્પાઇલર કાર્યક્ષમતા માટે તેને `toRef` સાથે રૂપાંતરિત કરશે:

```ts
const { count } = defineProps<{ count: number }>()

passAsRef($$(count))
```

આમાં કમ્પાઇલ થાય છે:

```js
setup(props) {
  const __props_count = toRef(props, 'count')
  passAsRef(__props_count)
}
```

## TypeScript ઇન્ટિગ્રેશન <sup class="vt-badge ts" /> {#typescript-integration}

Vue આ મેક્રોસ (વૈશ્વિક સ્તરે ઉપલબ્ધ) માટે ટાઇપિંગ પ્રદાન કરે છે અને તમામ ટાઇપ્સ અપેક્ષા મુજબ કાર્ય કરશે. પ્રમાણભૂત TypeScript સિમેન્ટિક્સ સાથે કોઈ અસંગતતા નથી, તેથી સિન્ટેક્સ તમામ અસ્તિત્વમાં રહેલા ટૂલિંગ સાથે કામ કરશે.

આનો અર્થ એ પણ છે કે મેક્રો કોઈપણ ફાઇલોમાં કામ કરી શકે છે જ્યાં માન્ય JS / TS મંજૂરી છે - માત્ર Vue SFC ની અંદર જ નહીં.

મેક્રો વૈશ્વિક સ્તરે ઉપલબ્ધ હોવાથી, તેમના ટાઇપ્સને સ્પષ્ટપણે સંદર્ભિત (દા.ત. `env.d.ts` ફાઇલમાં) કરવાની જરૂર છે:

```ts
/// <reference types="vue/macros-global" />
```

જ્યારે `vue/macros` માંથી મેક્રો સ્પષ્ટપણે ઇમ્પોર્ટ કરવામાં આવે છે, ત્યારે વૈશ્વિક જાહેરાત કર્યા વિના ટાઇપ કામ કરશે.

## સ્પષ્ટ ઓપ્ટ-ઇન (Explicit Opt-in) {#explicit-opt-in}

:::danger હવે કોર (core) માં સમર્થિત નથી
નીચેનું માત્ર Vue વર્ઝન ૩.૩ અને તેનાથી ઓછી આવૃત્તિઓ પર લાગુ થાય છે. Vue core ૩.૪ અને તેનાથી ઉપરની આવૃત્તિઓ અને `@vitejs/plugin-vue` ૫.૦ અને તેનાથી ઉપરની આવૃત્તિઓમાં સપોર્ટ દૂર કરવામાં આવ્યો છે. જો તમે ટ્રાન્સફોર્મનો ઉપયોગ ચાલુ રાખવાનો ઇરાદો ધરાવો છો, તો કૃપા કરીને તેના બદલે [Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html) પર સ્થાનાંતરિત (migrate) કરો.
:::

### Vite {#vite}

- `@vitejs/plugin-vue@>=2.0.0` જરૂરી છે.
- SFC અને js(x)/ts(x) ફાઇલો પર લાગુ થાય છે. ટ્રાન્સફોર્મ લાગુ કરતાં પહેલાં ફાઇલો પર ઝડપી વપરાશ તપાસ કરવામાં આવે છે તેથી મેક્રોનો ઉપયોગ ન કરતી ફાઇલો માટે કોઈ પર્ફોર્મન્સ કોસ્ટ હોવો જોઈએ નહીં.
- નોંધ લો કે `reactivityTransform` હવે `script.refSugar` તરીકે નેસ્ટેડ થવાને બદલે પ્લગિન રૂટ-લેવલ ઓપ્શન છે, કારણ કે તે માત્ર SFC ને અસર કરતું નથી.

```js [vite.config.js]
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```

### `vue-cli` {#vue-cli}

- હાલમાં માત્ર SFC ને અસર કરે છે.
- `vue-loader@>=17.0.0` જરૂરી છે.

```js [vue.config.js]
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true
        }
      })
  }
}
```

### Plain `webpack` + `vue-loader` {#plain-webpack-vue-loader}

- હાલમાં માત્ર SFC ને અસર કરે છે.
- `vue-loader@>=17.0.0` જરૂરી છે.

```js [webpack.config.js]
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true
        }
      }
    ]
  }
}
```
