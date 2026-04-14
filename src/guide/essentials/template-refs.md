# ટેમ્પલેટ રિફ્સ (Template Refs) {#template-refs}

જ્યારે Vue નું ડિક્લેરેટિવ રેન્ડરિંગ મોડલ તમારા માટે મોટાભાગના ડાયરેક્ટ DOM ઓપરેશન્સને એબ્સ્ટ્રેક્ટ (abstracts) કરે છે, ત્યાં હજી પણ એવા કિસ્સાઓ હોઈ શકે છે કે જેમાં આપણે અંદરના DOM એલિમેન્ટ્સની ડાયરેક્ટ એક્સેસની જરૂર હોય. આ હાંસલ કરવા માટે, આપણે વિશેષ `ref` એટ્રિબ્યુટનો ઉપયોગ કરી શકીએ છીએ:

```vue-html
<input ref="input">
```

`ref` એ એક વિશેષ એટ્રિબ્યુટ છે, જે `v-for` પ્રકરણમાં ચર્ચા કરાયેલ `key` એટ્રિબ્યુટ જેવું જ છે. તે આપણને માઉન્ટ થયા પછી ચોક્કસ DOM એલિમેન્ટ અથવા ચાઇલ્ડ કમ્પોનન્ટ ઇન્સ્ટન્સનો સીધો સંદર્ભ (direct reference) મેળવવાની મંજૂરી આપે છે. આ ત્યારે ઉપયોગી થઈ શકે છે જ્યારે તમે ઈચ્છતા હોવ કે, ઉદાહરણ તરીકે, પ્રોગ્રામેટિકલી રીતે કમ્પોનન્ટ માઉન્ટ પર ઇનપુટ ફોકસ કરવા માટે, અથવા એલિમેન્ટ પર થર્ડ પાર્ટી લાઇબ્રેરી શરૂ કરવા માટે.

## રિફ્સ (Refs) ને એક્સેસ કરવા {#accessing-the-refs}

<div class="composition-api">

Composition API સાથે સંદર્ભ મેળવવા માટે, આપણે [`useTemplateRef()`](/api/composition-api-helpers#usetemplateref) <sup class="vt-badge" data-text="3.5+" /> હેલ્પરનો ઉપયોગ કરી શકીએ છીએ:

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// પ્રથમ આર્ગ્યુમેન્ટ ટેમ્પલેટમાં રહેલી ref વેલ્યુ સાથે મેળ ખાતી હોવી જોઈએ
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

જ્યારે TypeScript નો ઉપયોગ કરીએ છીએ, ત્યારે Vue ની IDE સપોર્ટ અને `vue-tsc` આપમેળે `input.value` ના પ્રકારનું અનુમાન કરશે કે કયા એલિમેન્ટ અથવા કમ્પોનન્ટ પર મેચિંગ `ref` એટ્રિબ્યુટ વપરાયેલ છે.

<details>
<summary>3.5 પહેલાનો વપરાશ</summary>

3.5 પહેલાંના સંસ્કરણોમાં જ્યાં `useTemplateRef()` રજૂ કરવામાં આવ્યું ન હતું, અમારે એવા નામ સાથે રિફ જાહેર કરવાની જરૂર છે જે ટેમ્પલેટ રિફ એટ્રિબ્યુટની વેલ્યુ સાથે મેળ ખાતું હોય:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// એલિમેન્ટ સંદર્ભ રાખવા માટે રિફ જાહેર કરો
// નામ ટેમ્પલેટ રિફ વેલ્યુ સાથે મેળ ખાતું હોવું જોઈએ
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

જો `<script setup>` નો ઉપયોગ ન કરતા હોવ, તો `setup()` માંથી રિફને પણ પરત (return) કરવાની ખાતરી કરો:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</details>

</div>
<div class="options-api">

પરિણામી રિફ `this.$refs` પર એક્સપોઝ થયેલ છે:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

નોંધ કરો કે તમે કમ્પોનન્ટ માઉન્ટ થયા પછી જ રિફને એક્સેસ કરી શકો છો. જો તમે ટેમ્પલેટ એક્સપ્રેશનમાં <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> ને એક્સેસ કરવાનો પ્રયાસ કરશો, તો પ્રથમ રેન્ડર પર તે <span class="options-api">`undefined`</span><span class="composition-api">`null`</span> હશે. આનું કારણ એ છે કે પ્રથમ રેન્ડર પછી જ એલિમેન્ટ અસ્તિત્વમાં આવે છે!

<div class="composition-api">

જો તમે ટેમ્પલેટ રિફ ના ફેરફારોને વોચ (watch) કરવાનો પ્રયાસ કરી રહ્યાં છો, તો ખાતરી કરો કે જ્યાં રિફની વેલ્યુ `null` હોય તે કેસને ધ્યાનમાં લો:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // હજી માઉન્ટ થયેલ નથી, અથવા એલિમેન્ટ અનમાઉન્ટ કરવામાં આવ્યો હતો (દા.ત. v-if દ્વારા)
  }
})
```

આ પણ જુઓ: [Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />

</div>

## કમ્પોનન્ટ પર રિફ (Ref on Component) {#ref-on-component}

> આ વિભાગ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) ના જ્ઞાનને ધારે છે. તેને છોડી દેવા અને પછીથી પાછા આવવા માટે નિઃસંકોચ રહો.

`ref` નો ઉપયોગ ચાઇલ્ડ કમ્પોનન્ટ પર પણ થઈ શકે છે. આ કિસ્સામાં સંદર્ભ કમ્પોનન્ટ ઇન્સ્ટન્સનો હશે:

<div class="composition-api">

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  // childRef.value એ <Child /> ઇન્સ્ટન્સ ધરાવશે
})
</script>

<template>
  <Child ref="child" />
</template>
```

<details>
<summary>3.5 પહેલાનો વપરાશ</summary>

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value એ <Child /> ઇન્સ્ટન્સ ધરાવશે
})
</script>

<template>
  <Child ref="child" />
</template>
```

</details>

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child એ <Child /> ઇન્સ્ટન્સ ધરાવશે
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">જો ચાઇલ્ડ કમ્પોનન્ટ Options API નો ઉપયોગ કરી રહ્યો હોય અથવા `<script setup>` નો ઉપયોગ કરી રહ્યો ન હોય, તો</span><span class="options-api">સંદર્ભિત</span> ઇન્સ્ટન્સ ચાઇલ્ડ કમ્પોનન્ટના `this` સમાન હશે, જેનો અર્થ છે કે પેરેન્ટ કમ્પોનન્ટ પાસે ચાઇલ્ડ કમ્પોનન્ટની દરેક પ્રોપર્ટી અને મેથડની સંપૂર્ણ એક્સેસ હશે. આ પેરેન્ટ અને ચાઇલ્ડ વચ્ચે ચુસ્તપણે જોડાયેલ (tightly coupled) અમલીકરણ વિગતો બનાવવાનું સરળ બનાવે છે, તેથી કમ્પોનન્ટ રિફ્સનો ઉપયોગ ત્યારે જ થવો જોઈએ જ્યારે તેની અત્યંત જરૂર હોય - મોટાભાગના કિસ્સાઓમાં, તમારે પહેલા સ્ટાન્ડર્ડ પ્રોપ્સ અને એમિટ (props and emit) ઇન્ટરફેસનો ઉપયોગ કરીને પેરેન્ટ / ચાઇલ્ડ ઇન્ટરેક્શન્સ અમલી બનાવવાનો પ્રયાસ કરવો જોઈએ.

<div class="composition-api">

અહીં એક અપવાદ એ છે કે `<script setup>` નો ઉપયોગ કરતા ઘટકો **ડિફોલ્ટ રૂપે પ્રાઇવેટ (private)** હોય છે: `<script setup>` નો ઉપયોગ કરીને ચાઇલ્ડ કમ્પોનન્ટનો સંદર્ભ આપતો પેરેન્ટ કમ્પોનન્ટ જ્યાં સુધી ચાઇલ્ડ કમ્પોનન્ટ `defineExpose` મેક્રોનો ઉપયોગ કરીને પબ્લિક ઇન્ટરફેસને એક્સપોઝ કરવાનું પસંદ ન કરે ત્યાં સુધી કંઈપણ એક્સેસ કરી શકશે નહીં:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// કમ્પાઇલર મેક્રોસ, જેમ કે defineExpose, આયાત (import) કરવાની જરૂર નથી
defineExpose({
  a,
  b
})
</script>
```

જ્યારે પેરેન્ટ ટેમ્પલેટ રિફ્સ દ્વારા આ કમ્પોનન્ટનો ઇન્સ્ટન્સ મેળવે છે, ત્યારે પુનઃપ્રાપ્ત કરેલ ઇન્સ્ટન્સ `{ a: number, b: number }` આકારનું હશે (રિફ્સ સામાન્ય ઇન્સ્ટન્સની જેમ જ આપમેળે અનવ્રેપ થાય છે).

નોંધ કરો કે કોઈપણ await ઓપરેશન પહેલાં defineExpose ને કૉલ કરવો આવશ્યક છે. અન્યથા, await ઓપરેશન પછી એક્સપોઝ થયેલ પ્રોપર્ટીઝ અને મેથડ્સ એક્સેસિબલ રહેશે નહીં. 

આ પણ જુઓ: [Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

ચાઇલ્ડ ઇન્સ્ટન્સની એક્સેસને મર્યાદિત કરવા માટે `expose` ઓપ્શનનો ઉપયોગ કરી શકાય છે:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

ઉપરના ઉદાહરણમાં, ટેમ્પલેટ રિફ દ્વારા આ કમ્પોનન્ટનો સંદર્ભ આપતો પેરેન્ટ ફક્ત `publicData` અને `publicMethod` ને એક્સેસ કરી શકશે.

</div>

## `v-for` ની અંદર રિફ્સ {#refs-inside-v-for}

> v3.5 અથવા તેનાથી ઉપરનું સંસ્કરણ જરૂરી છે

<div class="composition-api">

જ્યારે `ref` નો ઉપયોગ `v-for` ની અંદર કરવામાં આવે છે, ત્યારે સંબંધિત રિફમાં એક એરે વેલ્યુ હોવી જોઈએ, જે માઉન્ટ થયા પછી એલિમેન્ટ્સ સાથે ભરાઈ જશે:

```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = useTemplateRef('items')

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9UsluwjAQ/ZWRLwQpDepyQoDUIg6t1EWUW91DFAZq6tiWF4oU5d87dtgqVRyyzLw3b+aN3bB7Y4ptQDZkI1dZYTw49MFMuBK10dZDAxZXOQSHC6yNLD3OY6zVsw7K4xJaWFldQ49UelxxVWnlPEhBr3GszT6uc7jJ4fazf4KFx5p0HFH+Kme9CLle4h6bZFkfxhNouAIoJVqfHQSKbSkDFnVpMhEpovC481NNVcr3SaWlZzTovJErCqgydaMIYBRk+tKfFLC9Wmk75iyqg1DJBWfRxT7pONvTAZom2YC23QsMpOg0B0l0NDh2YjnzjpyvxLrYOK1o3ckLZ5WujSBHr8YL2gxnw85lxEop9c9TynkbMD/kqy+svv/Jb9wu5jh7s+jQbpGzI+ZLu0byEuHZ+wvt6Ays9TJIYl8A5+i0DHHGjvYQ1JLGPuOlaR/TpRFqvXCzHR2BO5iKg0Zmm/ic0W2ZXrB+Gve2uEt1dJKs/QXbwePE)

<details>
<summary>3.5 પહેલાનો વપરાશ</summary>

3.5 પહેલાંના સંસ્કરણોમાં જ્યાં `useTemplateRef()` રજૂ કરવામાં આવ્યું ન હતું, અમારે એવા નામ સાથે રિફ જાહેર કરવાની જરૂર છે જે ટેમ્પલેટ રિફ એટ્રિબ્યુટની વેલ્યુ સાથે મેળ ખાતી હોય. રિફમાં એરે મૂલ્ય પણ હોવું જોઈએ:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

</details>

</div>
<div class="options-api">

જ્યારે `ref` નો ઉપયોગ `v-for` ની અંદર કરવામાં આવે છે, ત્યારે પરિણામી રિફ વેલ્યુ એક એરે હશે જેમાં સંબંધિત એલિમેન્ટ્સ હશે:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpFjk0KwjAQha/yCC4Uaou6kyp4DuOi2KkGYhKSiQildzdNa4WQmTc/37xeXJwr35HEUdTh7pXjszT0cdYzWuqaqBm9NEDbcLPeTDngiaM3PwVoFfiI667AvsDhNpWHMQzF+L9sNEztH3C3JlhNpbaPNT9VKFeeulAqplfY5D1p0qurxVQSqel0w5QUUEedY8q0wnvbWX+SYgRAmWxIiuSzm4tBinkc6HvkuSE7TIBKq4lZZWhdLZfE8AWp4l3T)

</div>

એ નોંધવું જોઈએ કે રિફ એરે સોર્સ એરે સમાન ક્રમની ગેરંટી આપતું **નથી**.

## ફંક્શન રિફ્સ (Function Refs) {#function-refs}

સ્ટ્રિંગ કીને બદલે, `ref` એટ્રિબ્યુટને ફંક્શન સાથે પણ બાંધી શકાય છે, જે દરેક કમ્પોનન્ટ અપડેટ પર કૉલ કરવામાં આવશે અને તમને એલિમેન્ટ રેફરન્સ ક્યાં સ્ટોર કરવો તે અંગે સંપૂર્ણ લવચીકતા આપશે. ફંક્શન પ્રથમ આર્ગ્યુમેન્ટ તરીકે એલિમેન્ટ રેફરન્સ મેળવે છે:

```vue-html
<input :ref="(el) => { /* el ને પ્રોપર્ટી અથવા ref અસાઇન કરો */ }">
```

નોંધ કરો કે આપણે ડાયનેમિક `:ref` બાઈન્ડિંગનો ઉપયોગ કરી રહ્યા છીએ જેથી કરીને આપણે તેને રિફ નેમ સ્ટ્રિંગને બદલે ફંક્શન પાસ કરી શકીએ. જ્યારે એલિમેન્ટ અનમાઉન્ટ કરવામાં આવે છે, ત્યારે આર્ગ્યુમેન્ટ `null` હશે. તમે, અલબત્ત, ઇનલાઇન ફંક્શનને બદલે મેથડ નો ઉપયોગ કરી શકો છો.
