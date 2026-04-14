# વોચર્સ (Watchers) {#watchers}

## મૂળભૂત ઉદાહરણ {#basic-example}

કમ્પ્યુટેડ પ્રોપર્ટીઝ આપણને ડિક્લેરેટિવ રીતે મેળવેલા મૂલ્યો (derived values) ની ગણતરી કરવાની મંજૂરી આપે છે. તેમ છતાં, એવા કિસ્સાઓ છે કે જ્યાં આપણે સ્ટેટ ફેરફારોની પ્રતિક્રિયામાં "સાઇડ ઇફેક્ટ્સ" કરવાની જરૂર હોય છે - ઉદાહરણ તરીકે, DOM ને મ્યુટેટ કરવું (mutating), અથવા અસિંક ઓપરેશનના પરિણામના આધારે સ્ટેટના અન્ય ભાગને બદલવો.

<div class="options-api">

Options API સાથે, જ્યારે પણ રિએક્ટિવ પ્રોપર્ટી બદલાય ત્યારે ફંક્શનને ટ્રિગર કરવા માટે આપણે [`watch` ઓપ્શન](/api/options-state#watch) નો ઉપયોગ કરી શકીએ છીએ:

```js
export default {
  data() {
    return {
      question: '',
      answer: 'પ્રશ્નોમાં સામાન્ય રીતે પ્રશ્નાર્થ ચિન્હ હોય છે. ;-)',
      loading: false
    }
  },
  watch: {
    // જ્યારે પણ પ્રશ્ન (question) બદલાય ત્યારે આ ફંક્શન ચાલશે
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.loading = true
      this.answer = 'વિચારી રહ્યા છીએ...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'ભૂલ! API સુધી પહોંચી શકાયું નથી. ' + error
      } finally {
        this.loading = false
      }
    }
  }
}
```

```vue-html
<p>
  હા/ના પ્રશ્ન પૂછો:
  <input v-model="question" :disabled="loading" />
</p>
<p>{{ answer }}</p>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9VE1v2zAM/SucLnaw1D70lqUbsiKH7rB1W4++aDYdq5ElTx9xgiD/fbT8lXZFAQO2+Mgn8pH0mW2aJjl4ZCu2trkRjfucKTw22jgosOReOjhnCqDgjseL/hvAoPNGjSeAvx6tE1qtIIqWo5Er26Ih088BteCt51KeINfKcaGAT5FQc7NP4NPNYiaQmhdC7VZQcmlxMF+61yUcWu7yajVmkabQVqjwgGZmzSuudmiX4CphofQqD+ZWSAnGqz5y9I4VtmOuS9CyGA9T3QCihGu3RKhc+gJtHH2JFld+EG5Mdug2QYZ4MSKhgBd11OgqXdipEm5PKoer0Jk2kA66wB044/EF1GtOSPRUCbUnryRJosnFnK4zpC5YR7205M9bLhyUSIrGUeVcY1dpekKrdNK6MuWNiKYKXt8V98FElDxbknGxGLCpZMi7VkGMxmjzv0pz1tvO4QPcay8LULoj5RToKoTN40MCEXyEQDJTl0KFmXpNOqsUxudN+TNFzzqdJp8ODutGcod0Alg34QWwsXsaVtIjVXqe9h5bC9V4B4ebWhco7zI24hmDVSEs/yOxIPOQEFnTnjzt2emS83nYFrhcevM6nRJhS+Ys9aoUu6Av7WqoNWO5rhsh0fxownplbBqhjJEmuv0WbN2UDNtDMRXm+zfsz/bY2TL2SH1Ec8CMTZjjhqaxh7e/v+ORvieQqvaSvN8Bf6HV0veSdG5fvSoo7Su/kO1D3f13SKInuz06VHYsahzzfl0yRj+s+3dKn9O9TW7HPrPLP624lFU=)

`watch` ઓપ્શન કી તરીકે બિંદુ-સીમિત પાથ (dot-delimited path) ને પણ સપોર્ટ કરે છે:

```js
export default {
  watch: {
    // નોંધ: ફક્ત સાદા પાથ. એક્સપ્રેશન્સ (Expressions) સપોર્ટેડ નથી.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

Composition API સાથે, જ્યારે પણ રિએક્ટિવ સ્ટેટનો કોઈ ભાગ બદલાય ત્યારે કોલબેક ટ્રિગર કરવા માટે આપણે [`watch` ફંક્શન](/api/reactivity-core#watch) નો ઉપયોગ કરી શકીએ છીએ:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('પ્રશ્નોમાં સામાન્ય રીતે પ્રશ્નાર્થ ચિન્હ હોય છે. ;-)')
const loading = ref(false)

// વોચ (watch) સીધા રિફ પર કામ કરે છે
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'વિચારી રહ્યા છીએ...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'ભૂલ! API સુધી પહોંચી શકાયું નથી. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    હા/ના પ્રશ્ન પૂછો:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9U8Fy0zAQ/ZVFF9tDah96C2mZ0umhHKBAj7oIe52oUSQjyXEyGf87KytyoDC9JPa+p+e3b1cndtd15b5HtmQrV1vZeXDo++6Wa7nrjPVwAovtAgbh6w2M0Fqzg4xOZFxzXRvtPPzq0XlpNNwEbp5lRUKEdgPaVP925jnoXS+UOgKxvJAaxEVjJ+y2hA9XxUVFGdFIvT7LtEI5JIzrqjrbGozdOmikxdqTKqmIQOV6gvOkvQDhjrqGXOOQvCzAqCa9FHBzCyeuAWT7F6uUulZ9gy7PPmZFETmQjJV7oXoke972GJHY+Axkzxupt4FalhRcYHh7TDIQcqA+LTriikFIDy0G59nG+84tq+qITpty8G0lOhmSiedefSaPZ0mnfHFG50VRRkbkj1BPceVorbFzF/+6fQj4O7g3vWpAm6Ao6JzfINw9PZaQwXuYNJJuK/U0z1nxdTLT0M7s8Ec/I3WxquLS0brRi8ddp4RHegNYhR0M/Du3pXFSAJU285osI7aSuus97K92pkF1w1nCOYNlI534qbCh8tkOVasoXkV1+sjplLZ0HGN5Vc1G2IJ5R8Np5XpKlK7J1CJntdl1UqH92k0bzdkyNc8ZRWGGz1MtbMQi1esN1tv/1F/cIdQ4e6LJod0jZzPmhV2jj/DDjy94oOcZpK57Rew3wO/ojOpjJIH2qdcN2f6DN7l9nC47RfTsHg4etUtNpZUeJz5ndPPv32j9Yve6vE6DZuNvu1R2Tg==)

### વોચ સોર્સ પ્રકારો (Watch Source Types) {#watch-source-types}

`watch` ની પ્રથમ આર્ગ્યુમેન્ટ વિવિધ પ્રકારના રિએક્ટિવ "સોર્સ" (sources) હોઈ શકે છે: તે રિફ (કમ્પ્યુટેડ રિફ્સ સહિત), રિએક્ટિવ ઓબ્જેક્ટ, [ગેટર ફંક્શન (getter function)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description), અથવા બહુવિધ સોર્સનો એરે હોઈ શકે છે:

```js
const x = ref(0)
const y = ref(0)

// સિંગલ રિફ (single ref)
watch(x, (newX) => {
  console.log(`x એ ${newX} છે`)
})

// ગેટર (getter)
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`x + y નો સરવાળો: ${sum} છે`)
  }
)

// બહુવિધ સોર્સનો એરે
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x એ ${newX} છે અને y એ ${newY} છે`)
})
```

નોંધ લો કે તમે રિએક્ટિવ ઓબ્જેક્ટની પ્રોપર્ટીને આ રીતે વોચ કરી શકતા નથી:

```js
const obj = reactive({ count: 0 })

// આ કામ કરશે નહીં કારણ કે આપણે watch() માં નંબર પાસ કરી રહ્યા છીએ
watch(obj.count, (count) => {
  console.log(`ગણતરી (Count) છે: ${count}`)
})
```

તેના બદલે, ગેટરનો ઉપયોગ કરો:

```js
// તેના બદલે, ગેટરનો ઉપયોગ કરો:
watch(
  () => obj.count,
  (count) => {
    console.log(`ગણતરી (Count) છે: ${count}`)
  }
)
```

</div>

## ડીપ વોચર્સ (Deep Watchers) {#deep-watchers}

<div class="options-api">

`watch` ડિફોલ્ટ રૂપે શેલો (shallow) હોય છે: કોલબેક ત્યારે જ ટ્રિગર થશે જ્યારે વોચ કરેલી પ્રોપર્ટીને નવી વેલ્યુ અસાઇન કરવામાં આવી હોય - તે નેસ્ટેડ પ્રોપર્ટી ફેરફારો પર ટ્રિગર થશે નહીં. જો તમે ઇચ્છો છો કે કોલબેક તમામ નેસ્ટેડ મ્યુટેશન પર ફાયર થાય, તો તમારે ઊંડા વોચર (deep watcher) નો ઉપયોગ કરવાની જરૂર છે:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // નોંધ: `newValue` અહીં `oldValue` ની બરાબર હશે
        // નેસ્ટેડ મ્યુટેશન પર જ્યાં સુધી ઓબ્જેક્ટ પોતે
        // બદલવામાં આવ્યો નથી.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

જ્યારે તમે સીધા રિએક્ટિવ ઓબ્જેક્ટ પર `watch()` ને કોલ કરો છો, ત્યારે તે આપમેળે એક ડીપ વોચર (deep watcher) બનાવશે - કોલબેક તમામ નેસ્ટેડ મ્યુટેશન પર ટ્રિગર થશે:

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // નેસ્ટેડ પ્રોપર્ટી મ્યુટેશન પર ટ્રિગર થાય છે
  // નોંધ: `newValue` અહીં `oldValue` ની બરાબર હશે
  // કારણ કે તે બંને એક જ ઓબ્જેક્ટ તરફ નિર્દેશ કરે છે!
})

obj.count++
```

આને રિએક્ટિવ ઓબ્જેક્ટ પરત કરતા ગેટરથી અલગ પાડવું જોઈએ - પછીના કિસ્સામાં, જો ગેટર અલગ ઓબ્જેક્ટ પરત કરે તો જ કોલબેક ફાયર થશે:

```js
watch(
  () => state.someObject,
  () => {
    // માત્ર ત્યારે જ ફાયર થાય છે જ્યારે state.someObject બદલવામાં આવે છે
  }
)
```

જોકે, તમે સ્પષ્ટપણે `deep` ઓપ્શનનો ઉપયોગ કરીને બીજા કેસને ડીપ વોચરમાં દબાણ કરી શકો છો:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // નોંધ: `newValue` અહીં `oldValue` ની બરાબર હશે
    // *સિવાય* કે state.someObject બદલવામાં આવ્યું હોય
  },
  { deep: true }
)
```

</div>

Vue 3.5+ માં, `deep` ઓપ્શન મહત્તમ ટ્રાવર્સલ ડેપ્થ (max traversal depth) સૂચવતો નંબર પણ હોઈ શકે છે - એટલે કે Vue એ ઓબ્જેક્ટની નેસ્ટેડ પ્રોપર્ટીઝને કેટલા સ્તર સુધી પાર કરવી જોઈએ.

:::warning સાવચેતી સાથે ઉપયોગ કરો
ડીપ વોચ માટે વોચ કરેલા ઓબ્જેક્ટમાંની તમામ નેસ્ટેડ પ્રોપર્ટીઝને પાર કરવાની જરૂર પડે છે, અને જ્યારે મોટા ડેટા સ્ટ્રક્ચર્સ પર ઉપયોગ કરવામાં આવે ત્યારે તે મોંઘું (expensive) હોઈ શકે છે. જ્યારે જરૂરી હોય ત્યારે જ તેનો ઉપયોગ કરો અને પર્ફોર્મન્સ અસરોથી સાવચેત રહો.
:::

## ઈગર વોચર્સ (Eager Watchers) {#eager-watchers}

`watch` ડિફોલ્ટ રૂપે લેઝી (lazy) હોય છે: જો સોસ (watched source) ન બદલાય ત્યાં સુધી કોલબેક ને કોલ કરવામાં આવશે નહીં. પરંતુ કેટલાક કિસ્સાઓમાં આપણે ઈચ્છીએ છીએ કે સમાન કોલબેક લોજિક આતુરતાથી (eagerly) ચાલે - ઉદાહરણ તરીકે, આપણે અમુક પ્રારંભિક ડેટા મેળવવા માંગતા હોઈએ, અને પછી જ્યારે પણ સંબંધિત સ્ટેટ બદલાય ત્યારે ડેટા ફરીથી ખેંચવા માંગતા હોઈએ.

<div class="options-api">

આપણે `handler` ફંક્શન અને `immediate: true` ઓપ્શન સાથે ઓબ્જેક્ટનો ઉપયોગ કરીને જાહેર કરીને વોચરના કોલબેકને તરત જ એક્ઝિક્યુટ કરવા દબાણ કરી શકીએ છીએ:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // આ ઘટક બનાવતી વખતે તરત જ ચાલશે.
      },
      // ઈગર કોલબેક એક્ઝિક્યુશન દબાણ કરો
      immediate: true
    }
  }
  // ...
}
```

હેન્ડલર ફંક્શનનું પ્રારંભિક એક્ઝિક્યુશન `created` હૂકની બરાબર પહેલાં થશે. Vue પહેલેથી જ `data`, `computed`, અને `methods` ઓપ્શન્સ પર પ્રક્રિયા કરી ચૂકી હશે, તેથી તે પ્રોપર્ટીઝ પ્રથમ આહ્વાન (invocation) પર ઉપલબ્ધ હશે.

</div>

<div class="composition-api">

આપણે `immediate: true` ઓપ્શન પાસ કરીને વોચરના કોલબેકને તરત જ એક્ઝિક્યુટ કરવા દબાણ કરી શકીએ છીએ:

```js
watch(
  source,
  (newValue, oldValue) => {
    // તરત જ એક્ઝિક્યુટ થાય છે, પછી ફરીથી જ્યારે `source` બદલાય છે
  },
  { immediate: true }
)
```

</div>

## વન્સ વોચર્સ (Once Watchers) {#once-watchers}

- ફક્ત 3.4+ માં સપોર્ટેડ છે

જ્યારે પણ વોચ કરેલ સોર્સ બદલાય ત્યારે વોચરનો કોલબેક એક્ઝિક્યુટ થશે. જો તમે ઈચ્છો છો કે જ્યારે સોર્સ બદલાય ત્યારે કોલબેક માત્ર એક જ વાર ટ્રિગર થાય, તો `once: true` ઓપ્શનનો ઉપયોગ કરો.

<div class="options-api">

```js
export default {
  watch: {
    source: {
      handler(newValue, oldValue) {
        // જ્યારે `source` બદલાય છે, ત્યારે માત્ર એક જ વાર ટ્રિગર થાય છે
      },
      once: true
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(
  source,
  (newValue, oldValue) => {
    // જ્યારે `source` બદલાય છે, ત્યારે માત્ર એક જ વાર ટ્રિગર થાય છે
  },
  { once: true }
)
```

</div>

<div class="composition-api">

## `watchEffect()` \*\* {#watcheffect}

વોચર કોલબેક માટે સોર્સ તરીકે બરાબર એ જ રિએક્ટિવ સ્ટેટનો ઉપયોગ કરવો સામાન્ય છે. ઉદાહરણ તરીકે, નીચેના કોડને ધ્યાનમાં લો, જે જ્યારે પણ `todoId` રિફ બદલાય ત્યારે રિમોટ રિસોર્સ લોડ કરવા માટે વોચરનો ઉપયોગ કરે છે:

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

ખાસ કરીને, નોંધ લો કે વોચર બે વાર `todoId` નો ઉપયોગ કેવી રીતે કરે છે, એકવાર સોર્સ તરીકે અને પછી ફરીથી કોલબેકની અંદર.

આને [`watchEffect()`](/api/reactivity-core#watcheffect) સાથે સરળ બનાવી શકાય છે. `watchEffect()` અમને કોલબેકની રિએક્ટિવ ડિપેન્ડન્સીને આપમેળે ટ્રૅક કરવાની મંજૂરી આપે છે. ઉપરના વોચરને આ રીતે ફરીથી લખી શકાય છે:

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

અહીં, કોલબેક તરત જ ચાલશે, `immediate: true` સ્પષ્ટ કરવાની જરૂર નથી. તેના એક્ઝિક્યુશન દરમિયાન, તે આપમેળે ડિપેન્ડન્સી તરીકે `todoId.value` ને ટ્રૅક કરશે (કમ્પ્યુટેડ પ્રોપર્ટીઝની જેમ). જ્યારે પણ `todoId.value` બદલાય છે, ત્યારે કોલબેક ફરીથી ચલાવવામાં આવશે. `watchEffect()` સાથે, અમારે હવે સોર્સ વેલ્યુ તરીકે `todoId` ને સ્પષ્ટપણે પાસ કરવાની જરૂર નથી.

તમે `watchEffect()` અને રિએક્ટિવ ડેટા-ફેચિંગના [આ ઉદાહરણને](/examples/#fetching-data) અજમાવી શકો છો.

આના જેવા ઉદાહરણો માટે, ફક્ત એક જ ડિપેન્ડન્સી સાથે, `watchEffect()` નો લાભ પ્રમાણમાં ઓછો છે. પરંતુ વોચર્સ કે જેમાં બહુવિધ ડિપેન્ડન્સી હોય છે, `watchEffect()` નો ઉપયોગ મેન્યુઅલી ડિપેન્ડન્સી લિસ્ટ જાળવવાની જરૂરિયાત ને દૂર કરે છે. વધુમાં, જો તમારે નેસ્ટેડ ડેટા સ્ટ્રક્ચરમાં ઘણી બધી પ્રોપર્ટીઝ જોવાની જરૂર હોય, તો `watchEffect()` ડીપ વોચર કરતાં વધુ કાર્યક્ષમ સાબિત થઈ શકે છે, કારણ કે તે ફક્ત તે જ પ્રોપર્ટીઝને ટ્રૅક કરશે જે કોલબેકમાં વપરાય છે, તેના બદલે રિકર્સિવલી (recursively) તે બધાને ટ્રૅક કરવાને બદલે.

:::tip
`watchEffect` ફક્ત તેના **સિંક્રનસ (synchronous)** એક્ઝિક્યુશન દરમિયાન જ ડિપેન્ડન્સીની ટ્રૅક કરે છે. જ્યારે તેનો ઉપયોગ અસિંક કોલબેક સાથે કરવામાં આવે છે, ત્યારે ફક્ત પ્રથમ `await` ટીક પહેલાં એક્સેસ કરાયેલી પ્રોપર્ટીઝ જ ટ્રેક કરવામાં આવશે.
:::

### `watch` વિરુદ્ધ `watchEffect` {#watch-vs-watcheffect}

`watch` અને `watchEffect` બંને આપણને રિએક્ટિવ રીતે સાઇડ ઇફેક્ટ્સ કરવા દે છે. તેમનો મુખ્ય તફાવત એ છે કે તેઓ તેમની રિએક્ટિવ ડિપેન્ડન્સીની ટ્રૅક કરે છે:

- `watch` ફક્ત સ્પષ્ટ રીતે વોચ કરેલા સોર્સને જ ટ્રૅક કરે છે. તે કોલબેકની અંદર એક્સેસ કરાયેલ કોઈપણ વસ્તુને ટ્રૅક કરશે નહીં. વધુમાં, કોલબેક ત્યારે જ ટ્રિગર થાય છે જ્યારે સોસ ખરેખર બદલાયો હોય. `watch` સાઇડ ઇફેક્ટ થી ડિપેન્ડન્સી ટ્રેકિંગને અલગ કરે છે, જે કોલબેક ક્યારે ફાયર થવો જોઈએ તેના પર આપણને વધુ ચોક્કસ નિયંત્રણ આપે છે.

- `watchEffect`, બીજી તરફ, ડિપેન્ડન્સી ટ્રેકિંગ અને સાઇડ ઇફેક્ટને એક તબક્કામાં જોડે છે. તે તેના સિંક્રનસ એક્ઝિક્યુશન દરમિયાન એક્સેસ કરાયેલ દરેક રિએક્ટિવ પ્રોપર્ટીને આપમેળે ટ્રૅક કરે છે. આ વધુ અનુકૂળ છે અને સામાન્ય રીતે ટૂંકા કોડમાં પરિણમે છે, પરંતુ તેની રિએક્ટિવ ડિપેન્ડન્સીને ઓછી સ્પષ્ટ બનાવે છે.

</div>

## સાઇડ ઇફેક્ટ ક્લીનઅપ (Side Effect Cleanup) {#side-effect-cleanup}

કેટલીકવાર આપણે વોચરમાં સાઇડ ઇફેક્ટ્સ શરુ કરી શકીએ છીએ, દા.ત. અસિંક્રોનસ વિનંતીઓ:

<div class="composition-api">

```js
watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // કોલબેક લોજિક
  })
})
```

</div>
<div class="options-api">

```js
export default {
  watch: {
    id(newId) {
      fetch(`/api/${newId}`).then(() => {
        // કોલબેક લોજિક
      })
    }
  }
}
```

</div>

પરંતુ જો વિનંતી પૂર્ણ થાય તે પહેલાં `id` બદલાય તો શું? જ્યારે અગાઉની વિનંતી પૂર્ણ થાય છે, ત્યારે તે હજુ પણ ID વેલ્યુ સાથે કોલબેક ને ફાયર કરશે જે પહેલેથી જ જૂની (stale) છે. આદર્શ રીતે, જ્યારે `id` નવી વેલ્યુમાં બદલાય ત્યારે આપણે જૂની વિનંતીને રદ કરવા સક્ષમ બનવા માંગીએ છીએ.

ક્લીનઅપ ફંક્શન રજીસ્ટર કરવા માટે આપણે [`onWatcherCleanup()`](/api/reactivity-core#onwatchercleanup) <sup class="vt-badge" data-text="3.5+" /> API નો ઉપયોગ કરી શકીએ છીએ જેને જ્યારે વોચર અમાન્ય થાય અને ફરીથી ચલાવવા માટે હોય ત્યારે કોલ કરવામાં આવશે:

<div class="composition-api">

```js {10-13}
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // કોલબેક લોજિક
  })

  onWatcherCleanup(() => {
    // જૂની વિનંતી અટકાવો (abort stale request)
    controller.abort()
  })
})
```

</div>
<div class="options-api">

```js {12-15}
import { onWatcherCleanup } from 'vue'

export default {
  watch: {
    id(newId) {
      const controller = new AbortController()

      fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
        // કોલબેક લોજિક
      })

      onWatcherCleanup(() => {
        // જૂની વિનંતી અટકાવો (abort stale request)
        controller.abort()
      })
    }
  }
}
```

</div>

નોંધ લો કે `onWatcherCleanup` ફક્ત Vue 3.5+ માં સપોર્ટેડ છે અને તેને `watchEffect` ઇફેક્ટ ફંક્શન અથવા `watch` કોલબેક ફંક્શનના સિંક્રનસ એક્ઝિક્યુશન દરમિયાન કૉલ કરવો આવશ્યક છે: તમે તેને અસિંક ફંક્શનમાં `await` સ્ટેટમેન્ટ પછી કૉલ કરી શકતા નથી.

વૈકલ્પિક રીતે, `onCleanup` ફંક્શન પણ વોચર કોલબેક્સમાં ત્રીજા આર્ગ્યુમેન્ટ તરીકે પાસ કરવામાં આવે છે<span class="composition-api">, અને `watchEffect` ઇફેક્ટ ફંક્શનમાં પ્રથમ આર્ગ્યુમેન્ટ તરીકે પાસ કરવામાં આવે છે</span>:

<div class="composition-api">

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // ક્લીનઅપ લોજિક
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // ક્લીનઅપ લોજિક
  })
})
```

</div>
<div class="options-api">

```js
export default {
  watch: {
    id(newId, oldId, onCleanup) {
      // ...
      onCleanup(() => {
        // ક્લીનઅપ લોજિક
      })
    }
  }
}
```

</div>

ફંક્શન આર્ગ્યુમેન્ટ દ્વારા પાસ કરાયેલ `onCleanup` વોચર ઇન્સ્ટન્સ સાથે જોડાયેલું છે તેથી તે `onWatcherCleanup` ના સિંક્રનસ અવરોધને આધીન નથી.

## કોલબેક ફ્લશ ટાઈમિંગ (Callback Flush Timing) {#callback-flush-timing}

જ્યારે તમે રિએક્ટિવ સ્ટેટ ને મ્યુટેટ કરો છો, ત્યારે તે તમારા દ્વારા બનાવેલ Vue કમ્પોનન્ટ અપડેટ્સ અને વોચર કોલબેક્સ બંનેને ટ્રિગર કરી શકે છે.

કમ્પોનન્ટ અપડેટ્સની જેમ, ડુપ્લિકેટ આહ્વાન (invocations) ટાળવા માટે યુઝર દ્વારા બનાવેલા વોચર કોલબેક્સ બેચ કરવામાં આવે છે. ઉદાહરણ તરીકે, જો આપણે વોચ કરવામાં આવતા એરેમાં સિંક્રનસ રીતે હજાર આઇટમ્સને પુશ કરીએ તો અમે કદાચ ઈચ્છતા નથી કે વોચર હજાર વાર ફાયર થાય.

ડિફોલ્ટ રૂપે, વોચરનો કોલબેક પેરેન્ટ કમ્પોનન્ટ અપડેટ્સ (જો કોઈ હોય તો) **પછી** અને ઓનર (owner) કમ્પોનન્ટના DOM અપડેટ્સ **પહેલાં** કોલ કરવામાં આવે છે. આનો અર્થ એ છે કે જો તમે વોચર કોલબેકની અંદર ઓનર કમ્પોનન્ટના પોતાના DOM ને એક્સેસ કરવાનો પ્રયાસ કરો છો, તો DOM પ્રી-અપડેટ સ્ટેટમાં હશે.

### પોસ્ટ વોચર્સ (Post Watchers) {#post-watchers}

જો તમે Vue એ તેને અપડેટ કર્યા **પછી** વોચર કોલબેકમાં ઓનર કમ્પોનન્ટના DOM ને એક્સેસ કરવા માંગતા હો, તો તમારે `flush: 'post'` ઓપ્શન સ્પષ્ટ કરવાની જરૂર છે:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

પોસ્ટ-ફ્લશ (Post-flush) `watchEffect()` પાસે એક સગવડતા એલિયાસ (alias) પણ છે, `watchPostEffect()`:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* Vue અપડેટ પછી એક્ઝિક્યુટ થાય છે */
})
```

</div>

### સિંક વોચર્સ (Sync Watchers) {#sync-watchers}

કોઈપણ Vue-સંચાલિત અપડેટ્સ પહેલાં, સિંક્રનસ રીતે ફાયર થતું વોચર બનાવવું પણ શક્ય છે:

<div class="options-api">

```js{6}
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'sync'
    }
  }
}
```

</div>

<div class="composition-api">

```js{2,6}
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})
```

સિંક (Sync) `watchEffect()` પાસે પણ સગવડતા એલિયાસ છે, `watchSyncEffect()`:

```js
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* રિએક્ટિવ ડેટા ફેરફાર પર સિંક્રનસ રીતે એક્ઝિક્યુટ થાય છે */
})
```

</div>

:::warning સાવચેતી સાથે ઉપયોગ કરો
સિંક વોચર્સ પાસે બેચિંગ હોતું નથી અને જ્યારે પણ રિએક્ટિવ મ્યુટેશન જોવા મળે ત્યારે ટ્રિગર થાય છે. સાદા બુલિયન વેલ્યુસ જોવા માટે તેનો ઉપયોગ કરવો ઠીક છે, પરંતુ ડેટા સોર્સ પર તેનો ઉપયોગ કરવાનું ટાળો જે ઘણીવાર સિંક્રનસ રીતે મ્યુટેટ થઈ શકે છે, જેમ કે એરે.
:::

<div class="options-api">

## `this.$watch()` \* {#this-watch}

[`$watch()` ઇન્સ્ટન્સ મેથડ](/api/component-instance#watch) નો ઉપયોગ કરીને અનિવાર્યપણે (imperatively) વોચર્સ બનાવવાનું પણ શક્ય છે:

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

આ ત્યારે ઉપયોગી થાય છે જ્યારે તમારે શરતી રીતે વોચર સેટ કરવાની જરૂર હોય, અથવા ફક્ત યુઝર ઇન્ટરેક્શનના પ્રતિભાવમાં કંઈક જોવાની જરૂર હોય. તે તમને વોચરને વહેલા રોકવાની પણ મંજૂરી આપે છે.

</div>

## વોચરને રોકવું (Stopping a Watcher) {#stopping-a-watcher}

<div class="options-api">

`watch` ઓપ્શન અથવા `$watch()` ઇન્સ્ટન્સ મેથડનો ઉપયોગ કરીને જાહેર કરાયેલ વોચર્સ જ્યારે ઓનર કમ્પોનન્ટ અનમાઉન્ટ થાય ત્યારે આપમેળે બંધ થઈ જાય છે, તેથી મોટાભાગના કિસ્સાઓમાં તમારે તમારી જાતે વોચરને રોકવા વિશે ચિંતા કરવાની જરૂર નથી.

દુર્લભ કિસ્સામાં જ્યાં તમારે ઓનર કમ્પોનન્ટ અનમાઉન્ટ થાય તે પહેલાં વોચરને રોકવાની જરૂર હોય, `$watch()` API તેના માટે ફંક્શન પરત કરે છે:

```js
const unwatch = this.$watch('foo', callback)

// ...જ્યારે વોચરની હવે જરૂર ન હોય:
unwatch()
```

</div>

<div class="composition-api">

`setup()` અથવા `<script setup>` ની અંદર સિંક્રનસ રીતે જાહેર કરાયેલ વોચર્સ ઓનર કમ્પોનન્ટ ઇન્સ્ટન્સ સાથે જોડાયેલા હોય છે, અને જ્યારે ઓનર કમ્પોનન્ટ અનમાઉન્ટ કરવામાં આવે ત્યારે આપમેળે બંધ થઈ જશે. મોટાભાગના કિસ્સાઓમાં, તમારે તમારી જાતે વોચરને રોકવા વિશે ચિંતા કરવાની જરૂર નથી.

અહીં મુખ્ય વાત એ છે કે વોચર **સિંક્રનસ (synchronously)** રીતે બનાવવો જોઈએ: જો વોચર અસિંક કોલબેકમાં બનાવવામાં આવ્યો હોય, તો તે ઓનર કમ્પોનન્ટ સાથે બંધાયેલ રહેશે નહીં અને મેમરી લીક (memory leaks) ટાળવા માટે મેન્યુઅલી રોકવો આવશ્યક છે. અહીં એક ઉદાહરણ છે:

```vue
<script setup>
import { watchEffect } from 'vue'

// આ એક આપમેળે બંધ થઈ જશે
watchEffect(() => {})

// ...આ એક થશે નહીં!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

વોચરને મેન્યુઅલી રોકવા માટે, રિટર્ન કરેલા હેન્ડલ ફંક્શનનો ઉપયોગ કરો. આ `watch` અને `watchEffect` બંને માટે કામ કરે છે:

```js
const unwatch = watchEffect(() => {})

// ...પછીથી, જ્યારે હવે જરૂર ન હોય
unwatch()
```

નોંધ કરો કે તમારે અસિંક્રનસ રીતે વોચર્સ બનાવવાની જરૂર હોય તેવા બહુ ઓછા કિસ્સાઓ હોવા જોઈએ, અને જ્યારે પણ શક્ય હોય ત્યારે સિંક્રનસ બનાવટને પ્રાધાન્ય આપવું જોઈએ. જો તમારે અમુક અસિંક ડેટાની રાહ જોવાની જરૂર હોય, તો તમે તેના બદલે તમારા વોચ લોજિકને શરતી બનાવી શકો છો:

```js
// અસિંક્રનસ રીતે લોડ થવાનો ડેટા
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // જ્યારે ડેટા લોડ થાય ત્યારે કંઈક કરો
  }
})
```

</div>
