# સ્ટેટ મેનેજમેન્ટ (State Management) {#state-management}

## સ્ટેટ મેનેજમેન્ટ શું છે? (What is State Management?) {#what-is-state-management}

તકનીકી રીતે, દરેક Vue કમ્પોનન્ટ ઇન્સ્ટન્સ પહેલેથી જ તેની પોતાની રિએક્ટિવ (reactive) સ્થિતિ "મેનેજ" કરે છે. ઉદાહરણ તરીકે એક સાદો કાઉન્ટર (counter) ઘટક લો:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// સ્ટેટ (state)
const count = ref(0)

// એક્શન્સ (actions)
function increment() {
  count.value++
}
</script>

<!-- વ્યુ (view) -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // સ્ટેટ (state)
  data() {
    return {
      count: 0
    }
  },
  // એક્શન્સ (actions)
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- વ્યુ (view) -->
<template>{{ count }}</template>
```

</div>

તે નીચેના ભાગો સાથેનો સ્વનિર્ભર એકમ છે:

- **સ્ટેટ (state)**, સત્યનો સ્ત્રોત (source of truth) જે આપણી એપ્લિકેશનને ચલાવે છે;
- **વ્યુ (view)**, સ્ટેટનું ડિક્લેરેટિવ મેપિંગ;
- **એક્શન્સ (actions)**, વ્યુમાંથી વપરાશકર્તાના ઇનપુટ્સની પ્રતિક્રિયામાં સ્ટેટ બદલાઈ શકે તેવા સંભવિત માર્ગો.

આ "વન-વે ડેટા ફ્લો" ની વિભાવનાનું એક સરળ પ્રતિનિધિત્વ છે:

<p style="text-align: center">
  <img alt="state flow diagram" src="./images/state-flow.png" width="252px" style="margin: 40px auto">
</p>

જો કે, જ્યારે આપણી પાસે **બહુવિધ ઘટકો હોય જે સામાન્ય સ્ટેટ શેર કરે છે** ત્યારે સરળતા તૂટવા લાગે છે:

૧. બહુવિધ વ્યુ સ્ટેટના સમાન ભાગ પર આધારિત હોઈ શકે છે.
૨. વિવિધ વ્યુ માંની એક્શન્સને સ્ટેટના સમાન ભાગને મ્યુટેટ (mutate) કરવાની જરૂર પડી શકે છે.

પ્રથમ કેસ માટે, એક સંભવિત ઉકેલ એ છે કે શેર કરેલ સ્ટેટને સમાન પૂર્વજ ઘટક (common ancestor component) સુધી "લિફ્ટ (lift)" કરવું અને પછી તેને પ્રોપ્સ (props) તરીકે નીચે પસાર કરવું. જો કે, ઊંડા વંશવેલો (hierarchies) ધરાવતા કમ્પોનન્ટ ટ્રીમાં આ ઝડપથી કંટાળાજનક બની જાય છે, જે બીજી સમસ્યા તરફ દોરી જાય છે જેને [પ્રોપ ડ્રીલિંગ (Prop Drilling)](/guide/components/provide-inject#prop-drilling) તરીકે ઓળખવામાં આવે છે.

બીજા કેસ માટે, આપણે ઘણીવાર ટેમ્પલેટ રેફ્સ (template refs) દ્વારા સીધા પેરેન્ટ / ચાઇલ્ડ ઇન્સ્ટન્સ સુધી પહોંચવા અથવા એમિટેડ ઇવેન્ટ્સ દ્વારા સ્ટેટની બહુવિધ નકલોને મ્યુટેટ અને સિંક્રનાઇઝ કરવાનો પ્રયાસ કરવા જેવા ઉકેલોનો આશરો લઈએ છીએ. આ બંને પેટર્ન બરડ છે અને ઝડપથી જાળવી ન શકાય તેવા કોડ તરફ દોરી જાય છે.

વધુ સરળ અને સીધો ઉકેલ એ છે કે ઘટકોમાંથી શેર કરેલી સ્ટેટ બહાર કાઢી તેને વૈશ્વિક સિંગલટન (global singleton) માં મેનેજ કરવી. આ સાથે, આપણું કમ્પોનન્ટ ટ્રી એક મોટો "વ્યુ" બની જાય છે, અને કોઈપણ ઘટક ટ્રીમાં તેઓ ગમે ત્યાં હોય, સ્ટેટ એક્સેસ કરી શકે છે અથવા એક્શન્સ ટ્રિગર કરી શકે છે!

## રિએક્ટિવિટી (Reactivity) API સાથે સાદું સ્ટેટ મેનેજમેન્ટ {#simple-state-management-with-reactivity-api}

<div class="options-api">

Options API માં, રિએક્ટિવ ડેટા `data()` ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવામાં આવે છે. આંતરિક રીતે, `data()` દ્વારા પરત કરવામાં આવેલ ઓબ્જેક્ટને [`reactive()`](/api/reactivity-core#reactive) ફંક્શન દ્વારા રિએક્ટિવ બનાવવામાં આવે છે, જે સાર્વજનિક API તરીકે પણ ઉપલબ્ધ છે.

</div>

જો તમારી પાસે સ્ટેટનો કોઈ ટુકડો છે જે બહુવિધ ઇન્સ્ટન્સ દ્વારા શેર થવો જોઈએ, તો તમે રિએક્ટિવ ઓબ્જેક્ટ બનાવવા માટે [`reactive()`](/api/reactivity-core#reactive) નો ઉપયોગ કરી શકો છો અને પછી તેને બહુવિધ ઘટકોમાં ઇમ્પોર્ટ કરી શકો છો:

```js [store.js]
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue [ComponentA.vue]
<script setup>
import { store } from './store.js'
</script>

<template>A તરફથી: {{ store.count }}</template>
```

```vue [ComponentB.vue]
<script setup>
import { store } from './store.js'
</script>

<template>B તરફથી: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue [ComponentA.vue]
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>A તરફથી: {{ store.count }}</template>
```

```vue [ComponentB.vue]
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>B તરફથી: {{ store.count }}</template>
```

</div>

હવે જ્યારે પણ `store` ઓબ્જેક્ટ મ્યુટેટ થાય છે, ત્યારે `<ComponentA>` અને `<ComponentB>` બંને તેમના વ્યુને આપમેળે અપડેટ કરશે - આપણી પાસે હવે સત્યનો એક જ સ્ત્રોત (single source of truth) છે.

જો કે, આનો અર્થ એ પણ છે કે `store` ને ઇમ્પોર્ટ કરનાર કોઈપણ ઘટક તેને જે રીતે ઈચ્છે તે રીતે મ્યુટેટ (mutate) કરી શકે છે:

```vue-html{2}
<template>
  <button @click="store.count++">
    B તરફથી: {{ store.count }}
  </button>
</template>
```

જ્યારે આ સરળ કિસ્સાઓમાં કાર્ય કરે છે, ત્યારે વૈશ્વિક સ્ટેટ કે જે કોઈપણ ઘટક દ્વારા મનસ્સી રીતે પરિવર્તિત કરી શકાય છે તે લાંબા ગાળે જાળવી શકાય તેવી નથી. સ્ટેટ-મ્યુટેટીંગ લોજિક સ્ટેટની જેમ જ વ્યાપક છે તેની ખાતરી કરવા માટે, સ્ટોર પર એવી મેથડ્સ વ્યાખ્યાયિત કરવાની ભલામણ કરવામાં આવે છે જેના નામ એક્શન્સના ઇરાદાને વ્યક્ત કરે:

```js{5-7} [store.js]
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    B તરફથી: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPVrtRTeJNSqtLGgGBsVbK4ewdwnT9FWWSTFczwmPc+xMhqa4uhl6xklRdOWQQvsbfPrVadNQ7h1dCqpcYaPp3pYFHwQyteXVxKm0tpM0krnm3IgAqUnd3vUFIFUB1Z8bNOkzoVny+wDTuNcZ1gBI/GSQhzqlQX3/5Gng81pA1t33tEo+FF7JX42bYsT1BaONlRguWqZZMU4C261CWMk3EhTK8RQphm8Twse/BscoUsvdqDkTX3kP3nI6aZwcmdQDUcMPJPabX8TQphtCf0RLqd1csxuqQAJTxtYnEUGtIpAH4pn1Ou17FDScOKhT+QNAVM)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNrdU8FqhDAU/JVHLruyi+lZ3FIt9Cu82JilaTWR5CkF8d8bE5O1u1so9FYQzAyTvJnRTKTo+3QcOMlIbpgWPT5WUnS90gjPyr4ll1jAWasOdim9UMum3a20vJWWqxSgkvzTyRt+rocWYVpYFoQm8wRsJh+viHLBcyXtk9No2ALkXd/WyC0CyDfW6RVTOiancQM5ku+x7nUxgUGlOcwxn8Ppu7HJ7udqaqz3SYikOQ5aBgT+OA9slt9kasToFnb5OiAqCU+sFezjVBHvRUimeWdT7JOKrFKAl8VvYatdI6RMDRJhdlPtWdQf5mdQP+SHdtyX/IftlH9pJyS1vcQ2NK8ZivFSiL8BsQmmpMG1s1NU79frYA1k8OD+/I3pUA6+CeNdHg6hmoTMX9pPSnk=)

</div>

:::tip
નોંધ લો કે ક્લિક હેન્ડલર કૌંસ સાથે `store.increment()` નો ઉપયોગ કરે છે - યોગ્ય `this` કોન્ટેક્સ્ટ સાથે મેથડને કૉલ કરવા માટે આ જરૂરી છે કારણ કે તે ઘટક મેથડ નથી.
:::

જો કે અહીં આપણે સ્ટોર તરીકે સિંગલ રિએક્ટિવ ઓબ્જેક્ટનો ઉપયોગ કરી રહ્યા છીએ, તમે અન્ય [રિએક્ટિવિટી APIs](/api/reactivity-core) જેમ કે `ref()` અથવા `computed()` નો ઉપયોગ કરીને બનાવેલ રિએક્ટિવ સ્ટેટ પણ શેર કરી શકો છો, અથવા [Composable](/guide/reusability/composables) માંથી વૈશ્વિક સ્ટેટ પરત કરી શકો છો:

```js
import { ref } from 'vue'

// વૈશ્વિક સ્ટેટ, મોડ્યુલ સ્કોપમાં બનાવેલ છે
const globalCount = ref(1)

export function useCount() {
  // લોકલ સ્ટેટ, પ્રત્યેક ઘટક દીઠ બનાવેલ છે
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Vue ની રિએક્ટિવિટી સિસ્ટમ ઘટક મોડેલ (component model) થી અલગ છે તે હજારો ફ્લેક્સિબલ બનાવે છે.

## SSR સંબંધિત બાબતો (SSR Considerations) {#ssr-considerations}

જો તમે એવી એપ્લિકેશન બનાવી રહ્યા છો જે [સર્વર-સાઇડ રેન્ડરિંગ (SSR)](./ssr) નો લાભ લે છે, તો ઉપરની પેટર્ન સ્ટોરને કારણે બહુવિધ વિનંતીઓ પર શેર કરાયેલ સિંગલટન હોવાથી સમસ્યાઓ તરફ દોરી શકે છે. આ વિશે SSR ગાઇડમાં [વધુ વિગતો](./ssr#cross-request-state-pollution) માં ચર્ચા કરવામાં આવી છે.

## પિનિયા (Pinia) {#pinia}

જ્યારે રજૂ કરેલો સ્ટેટ મેનેજમેન્ટ સોલ્યુશન સરળ પરિસ્થિતિઓમાં પૂરતો રહેશે, ત્યારે મોટા પાયે પ્રોડક્શન એપ્લિકેશન્સમાં ધ્યાનમાં લેવા જેવી ઘણી બધી બાબતો છે:

- ટીમ સહયોગ માટે મજબૂત ફોર્મેટ
- Vue DevTools સાથે સંકલન, જેમાં ટાઈમલાઈન, ઇન-કમ્પોનન્ટ ઇન્સ્પેક્શન અને ટાઇમ-ટ્રાવેલ ડિબગિંગનો સમાવેશ થાય છે
- હોટ મોડ્યુલ રિપ્લેસમેન્ટ (Hot Module Replacement)
- સર્વર-સાઇડ રેન્ડરિંગ સપોર્ટ

[Pinia](https://pinia.vuejs.org) એક સ્ટેટ મેનેજમેન્ટ લાઇબ્રેરી છે જે ઉપરોક્ત તમામનો અમલ કરે છે. તે Vue કોર ટીમ દ્વારા જાળવવામાં આવે છે અને Vue 2 અને Vue 3 બંને સાથે કામ કરે છે.

વર્તમાન વપરાશકર્તાઓ [Vuex](https://vuex.vuejs.org/) થી પરિચિત હોઈ શકે છે, જે Vue માટે અગાઉની સત્તાવાર સ્ટેટ મેનેજમેન્ટ લાઇબ્રેરી હતી. પિનિયા ઇકોસિસ્ટમમાં સમાન ભૂમિકા ભજવે છે, તેથી Vuex હવે મેન્ટેનન્સ મોડમાં છે. તે હજુ પણ કામ કરે છે, પરંતુ હવે તેમાં નવી સુવિધાઓ પ્રાપ્ત થશે નહીં. નવી એપ્લિકેશનો માટે Pinia નો ઉપયોગ કરવાની ભલામણ કરવામાં આવે છે.

પિનિયા એ Vuex 5 માટેની કોર ટીમની ચર્ચાઓમાંથી ઘણા વિચારોનો ઉપયોગ કરીને કરી છે. અંતે, અમને સમજાયું કે Pinia પહેલેથી જ Vuex 5 માં જે જોઈએ છે તે અમલ કરે છે અને તેના બદલે તેને નવી ભલામણ બનાવવાનું નક્કી કર્યું.

Vuex ની તુલનામાં, Pinia ઓછી વિધિ સાથે સરળ API પ્રદાન કરે છે, Composition-API-શૈલીના APIs ઓફર કરે છે અને સૌથી અગત્યનું, જ્યારે TypeScript સાથે ઉપયોગ કરવામાં આવે ત્યારે તેમાં મજબૂત ટાઇપ ઇન્ફરન્સ (type inference) સપોર્ટ હોય છે.
