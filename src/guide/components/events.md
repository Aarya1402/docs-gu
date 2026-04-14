<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // v-model માટેના ડોક્સ આ પેજનો ભાગ હતા. જૂની લિંક્સને રીડાયરેક્ટ કરવાનો પ્રયાસ કરો.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# કમ્પોનન્ટ ઇવેન્ટ્સ (Component Events) {#component-events}

> આ પેજ ધારે છે કે તમે પહેલાથી જ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) વાંચી લીધું છે. જો તમે કમ્પોનન્ટ્સ માટે નવા હોવ તો પહેલા તે વાંચો.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="ફ્રી Vue.js કસ્ટમ ઇવેન્ટ્સ લેસન"/>
</div>

## ઇવેન્ટ્સ મોકલવી અને સાંભળવી (Emitting and Listening to Events) {#emitting-and-listening-to-events}

કમ્પોનન્ટ બિલ્ટ-ઇન `$emit` મેથડનો ઉપયોગ કરીને ટેમ્પલેટ એક્સપ્રેશન્સમાં (દા.ત. `v-on` હેન્ડલરમાં) કસ્ટમ ઇવેન્ટ્સ સીધી રીતે મોકલી (emit) શકે છે:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">મને ક્લિક કરો</button>
```

<div class="options-api">

`$emit()` મેથડ કમ્પોનન્ટ ઇન્સ્ટન્સ પર `this.$emit()` તરીકે પણ ઉપલબ્ધ છે:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

પેરેન્ટ પછી `v-on` નો ઉપયોગ કરીને તેને સાંભળી શકે છે:

```vue-html
<MyComponent @some-event="callback" />
```

કમ્પોનન્ટ ઇવેન્ટ લિસનર્સ પર `.once` મોડિફાયર પણ સપોર્ટેડ છે:

```vue-html
<MyComponent @some-event.once="callback" />
```

કમ્પોનન્ટ્સ અને પ્રોપ્સની જેમ, ઇવેન્ટ નામો આપમેળે કેસ ટ્રાન્સફોર્મેશન પ્રદાન કરે છે. નોંધ કરો કે અમે camelCase ઇવેન્ટ મોકલી છે, પરંતુ પેરેન્ટમાં kebab-cased લિસનરનો ઉપયોગ કરીને તે સાંભળી શકીએ છીએ. [પ્રોપ્સ કેસિંગ](/guide/components/props#prop-name-casing) ની જેમ, અમે ટેમ્પલેટ્સમાં kebab-cased ઇવેન્ટ લિસનર્સનો ઉપયોગ કરવાની ભલામણ કરીએ છીએ.

:::tip
નેટિવ DOM ઇવેન્ટ્સથી વિપરીત, કમ્પોનન્ટ એમિટ કરેલી ઇવેન્ટ્સ બબલ (bubble) થતી **નથી**. તમે ફક્ત ડાયરેક્ટ ચાઇલ્ડ કમ્પોનન્ટ દ્વારા મોકલવામાં આવેલી ઇવેન્ટ્સ જ સાંભળી શકો છો. જો ભાઈ-બહેન (sibling) અથવા ઊંડા નેસ્ટેડ ઘટકો વચ્ચે વાતચીત કરવાની જરૂર હોય, તો બાહ્ય ઇવેન્ટ બસ (external event bus) અથવા [ગ્લોબલ સ્ટેટ મેનેજમેન્ટ સોલ્યુશન](/guide/scaling-up/state-management) નો ઉપયોગ કરો.
:::

## ઇવેન્ટ આર્ગ્યુમેન્ટ્સ (Event Arguments) {#event-arguments}

ઇવેન્ટ સાથે ચોક્કસ વેલ્યુ મોકલવી ક્યારેક ઉપયોગી છે. ઉદાહરણ તરીકે, આપણે ઈચ્છીએ છીએ કે લખાણને કેટલું મોટું કરવું તેનો હવાલો `<BlogPost>` કમ્પોનન્ટ પાસે હોય. તે કિસ્સાઓમાં, અમે આ વેલ્યુ પૂરી પાડવા માટે `$emit` માં વધારાની આર્ગ્યુમેન્ટ્સ પાસ કરી શકીએ છીએ:

```vue-html
<button @click="$emit('increaseBy', 1)">
  ૧ વધારો
</button>
```

પછી, જ્યારે આપણે પેરેન્ટમાં ઇવેન્ટ સાંભળીએ છીએ, ત્યારે અમે લિસનર તરીકે ઇનલાઇન એરો ફંક્શનનો ઉપયોગ કરી શકીએ છીએ, જે અમને ઇવેન્ટ આર્ગ્યુમેન્ટને એક્સેસ કરવાની મંજૂરી આપે છે:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

અથવા, જો ઇવેન્ટ હેન્ડલર મેથડ હોય:

```vue-html
<MyButton @increase-by="increaseCount" />
```

પછી વેલ્યુ તે મેથડના પ્રથમ પેરામીટર તરીકે પસાર થશે:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
ઇવેન્ટના નામ પછી `$emit()` માં પાસ કરેલી બધી વધારાની આર્ગ્યુમેન્ટ્સ લિસનરને ફોરવર્ડ કરવામાં આવશે. ઉદાહરણ તરીકે, `$emit('foo', 1, 2, 3)` સાથે લિસનર ફંક્શન ત્રણ આર્ગ્યુમેન્ટ્સ મેળવશે.
:::

## એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરવી {#declaring-emitted-events}

કમ્પોનન્ટ <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) મેક્રો</span><span class="options-api">[`emits`](/api/options-state#emits) ઓપ્શન</span> નો ઉપયોગ કરીને તે જે ઇવેન્ટ્સ મોકલશે તે સ્પષ્ટપણે જાહેર કરી શકે છે:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

અમે `<template>` માં જે `$emit` મેથડનો ઉપયોગ કર્યો છે તે કમ્પોનન્ટના `<script setup>` વિભાગમાં એક્સેસિબલ નથી, પરંતુ `defineEmits()` તેના બદલે આપણે જેનો ઉપયોગ કરી શકીએ તેવું સમકક્ષ ફંક્શન પરત કરે છે:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

`defineEmits()` મેક્રોનો ઉપયોગ ફંક્શનની અંદર કરી શકાતો **નથી**, તેને ઉપરના ઉદાહરણની જેમ સીધા જ `<script setup>` માં મૂકવો જોઈએ.

જો તમે `<script setup>` ને બદલે એક્સપ્લીસિટ `setup` ફંક્શનનો ઉપયોગ કરી રહ્યાં હોવ, તો ઇવેન્ટ્સ [`emits`](/api/options-state#emits) ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવી જોઈએ, અને `emit` ફંક્શન `setup()` કોન્ટેક્સ્ટ પર એક્સપોઝ થાય છે:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

`setup()` કોન્ટેક્સ્ટની અન્ય પ્રોપર્ટીઝની જેમ, `emit` ને સુરક્ષિત રીતે ડિસ્ટ્રક્ચર કરી શકાય છે:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

`emits` ઓપ્શન અને `defineEmits()` મેક્રો ઓબ્જેક્ટ સિન્ટેક્સને પણ સપોર્ટ કરે છે. જો TypeScript નો ઉપયોગ કરતા હોવ તો તમે આર્ગ્યુમેન્ટ્સ ટાઇપ કરી શકો છો, જે અમને એમિટ કરેલી ઇવેન્ટ્સના પેલોડ (payload) નું રનટાઇમ વેલિડેશન કરવાની મંજૂરી આપે છે:

<div class="composition-api">

```vue
<script setup lang="ts">
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // વેલિડેશન પાસ / ફેલ સૂચવવા માટે
    // `true` અથવા `false` રિટર્ન કરો
  }
})
</script>
```

જો તમે `<script setup>` સાથે TypeScript નો ઉપયોગ કરી રહ્યાં છો, તો શુદ્ધ ટાઇપ એનોટેશન્સ (pure type annotations) નો ઉપયોગ કરીને પણ એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરવી શક્ય છે:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

વધુ વિગતો: [Typing Component Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload: { email: string, password: string }) {
      // વેલિડેશન પાસ / ફેલ સૂચવવા માટે
      // `true` અથવા `false` રિટર્ન કરો
    }
  }
}
```

આ પણ જુઓ: [Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

ભલે વૈકલ્પિક હોય, પણ ઘટકે કેવી રીતે કામ કરવું જોઈએ તેને વધુ સારી રીતે દસ્તાવેજ (document) કરવા માટે તમામ એમિટ કરેલી ઇવેન્ટ્સ વ્યાખ્યાયિત કરવાની ભલામણ કરવામાં આવે છે. તે Vue ને [Fallthrough Attributes](/guide/components/attrs#v-on-listener-inheritance) માંથી જાણીતા લિસનર્સને બાકાત રાખવાની પણ મંજૂરી આપે છે, જે થર્ડ પાર્ટી કોડ દ્વારા મેન્યુઅલી મોકલેલી DOM ઇવેન્ટ્સના કારણે થતી અસરોને ટાળે છે.

:::tip
જો નેટિવ ઇવેન્ટ (દા.ત. `click`) `emits` ઓપ્શનમાં વ્યાખ્યાયિત કરેલ હોય, તો લિસનર હવે માત્ર કમ્પોનન્ટ-એમિટ કરેલી `click` ઇવેન્ટ્સ જ સાંભળશે અને નેટિવ `click` ઇવેન્ટ્સ માટે પ્રતિસાદ આપશે નહીં.
:::

## ઇવેન્ટ્સ વેલિડેશન (Events Validation) {#events-validation}

પ્રોપ ટાઇપ વેલિડેશનની જેમ જ, એમિટ કરેલી ઇવેન્ટ ને વેલિડેટ કરી શકાય છે જો તેને એરે સિન્ટેક્સ ને બદલે ઓબ્જેક્ટ સિન્ટેક્સ સાથે વ્યાખ્યાયિત કરવામાં આવી હોય.

વેલિડેશન ઉમેરવા માટે, ઇવેન્ટને એક ફંક્શન અસાઇન કરવામાં આવે છે જે <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> કોલમાં પાસ કરેલી આર્ગ્યુમેન્ટ્સ મેળવે છે અને ઇવેન્ટ માન્ય છે કે નહીં તે સૂચવવા માટે બુલિયન પરત કરે છે.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // કોઈ વેલિડેશન નથી
  click: null,

  // submit ઇવેન્ટ વેલિડેટ કરો
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('અમાન્ય સબમિટ ઇવેન્ટ પેલોડ!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // કોઈ વેલિડેશન નથી
    click: null,

    // submit ઇવેન્ટ વેલિડેટ કરો
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('અમાન્ય સબમિટ ઇવેન્ટ પેલોડ!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
