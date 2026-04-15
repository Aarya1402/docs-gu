# પ્રાથમિકતા C નિયમો: ભલામણ કરેલ (Priority C Rules: Recommended) {#priority-c-rules-recommended}

::: warning નોંધ
આ Vue.js સ્ટાઇલ ગાઇડ જૂની છે અને તેની સમીક્ષા કરવાની જરૂર છે. જો તમારી પાસે કોઈ પ્રશ્નો અથવા સૂચનો હોય, તો કૃપા કરીને [ઇશ્યુ ઓપન કરો (open an issue)](https://github.com/vuejs/docs/issues/new).
:::

જ્યાં એકથી વધુ, સરખી રીતે સારા વિકલ્પો અસ્તિત્વમાં હોય, ત્યાં સુસંગતતા સુનિશ્ચિત કરવા માટે મનસ્વી પસંદગી કરી શકાય છે. આ નિયમોમાં, અમે દરેક સ્વીકાર્ય વિકલ્પનું વર્ણન કરીએ છીએ અને ડિફોલ્ટ પસંદગી સૂચવીએ છીએ. તેનો અર્થ એ કે તમે તમારા પોતાના કોડબેઝમાં અલગ પસંદગી કરવા માટે મુક્ત લાગે શકો છો, જ્યાં સુધી તમે સુસંગત હોવ અને તમારી પાસે યોગ્ય કારણ હોય. કૃપા કરીને યોગ્ય કારણ રાખો! સમુદાય ધોરણ (community standard) ને અનુરૂપ થઈને, તમે આ કરી શકશો:

૧. તમે જે સમુદાય કોડનો સામનો કરો છો તેને વધુ સરળતાથી પાર્સ (parse) કરવા માટે તમારા મગજને તાલીમ આપો
૨. મોટાભાગના સમુદાય કોડ ઉદાહરણોને ફેરફાર કર્યા વિના કોપી અને પેસ્ટ કરી શકશો
૩. નવા સભ્યો પહેલેથી જ તમારી મનપસંદ કોડિંગ શૈલીથી ટેવાયેલા હશે, ઓછામાં ઓછું Vue ના સંદર્ભમાં તો ચોક્કસપણે

## કમ્પોનન્ટ/ઇન્સ્ટન્સ ઓપ્શન્સ ક્રમ (Component/instance options order) {#component-instance-options-order}

**ઘટક/ઇન્સ્ટન્સ ઓપ્શન્સ સુસંગત રીતે ક્રમબદ્ધ હોવા જોઈએ.**

ઘટક ઓપ્શન્સ માટે અમે ભલામણ કરેલો ડિફોલ્ટ ક્રમ આ છે. તેઓ શ્રેણીઓમાં વિભાજિત છે, જેથી તમે જાણી શકો કે પ્લગઇન્સમાંથી નવી પ્રોપર્ટીઝ ક્યાં ઉમેરવી.

૧. **ગ્લોબલ અવેરનેસ (Global Awareness)** (ઘટકની બહારના જ્ઞાનની જરૂર છે)

   - `name`

૨. **ટેમ્પ્લેટ કમ્પાઇલર ઓપ્શન્સ (Template Compiler Options)** (ટેમ્પ્લેટ્સ કમ્પાઇલ થવાની રીત બદલે છે)

   - `compilerOptions`

૩. **ટેમ્પ્લેટ ડિપેન્ડન્સીઝ (Template Dependencies)** (ટેમ્પ્લેટમાં ઉપયોગમાં આવતી એસેટ્સ)

   - `components`
   - `directives`

૪. **કમ્પોઝિશન (Composition)** (ઓપ્શન્સમાં પ્રોપર્ટીઝ ભેળવે છે)

   - `extends`
   - `mixins`
   - `provide`/`inject`

૫. **ઇન્ટરફેસ (Interface)** (ઘટકનો ઇન્ટરફેસ)

   - `inheritAttrs`
   - `props`
   - `emits`

૬. **Composition API** (Composition API નો ઉપયોગ કરવાનું પ્રવેશ બિંદુ)

   - `setup`

૭. **લોકલ સ્ટેટ (Local State)** (લોકલ રિએક્ટિવ પ્રોપર્ટીઝ)

   - `data`
   - `computed`

૮. **ઇવેન્ટ્સ (Events)** (રિએક્ટિવ ઇવેન્ટ્સ દ્વારા ટ્રિગર થતા કોલબેક્સ)

   - `watch`
   - લાઇફસાઇકલ ઇવેન્ટ્સ (જે ક્રમમાં તેમને બોલાવવામાં આવે છે)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeUnmount`
     - `unmounted`
     - `errorCaptured`
     - `renderTracked`
     - `renderTriggered`

૯. **નોન-રિએક્ટિવ પ્રોપર્ટીઝ (Non-Reactive Properties)** (રિએક્ટિવિટી સિસ્ટમથી સ્વતંત્ર ઇન્સ્ટન્સ પ્રોપર્ટીઝ)

   - `methods`

૧૦. **રેન્ડરિંગ (Rendering)** (ઘટક આઉટપુટનું ડિક્લેરેટિવ વર્ણન)
    - `template`/`render`

## એલિમેન્ટ એટ્રિબ્યુટ ક્રમ (Element attribute order) {#element-attribute-order}

**એલિમેન્ટ્સ (ઘટકો સહિત) ના એટ્રિબ્યુટ્સ સુસંગત રીતે ક્રમબદ્ધ હોવા જોઈએ.**

ઘટક ઓપ્શન્સ માટે અમે ભલામણ કરેલો ડિફોલ્ટ ક્રમ આ છે. તેઓ શ્રેણીઓમાં વિભાજિત છે, જેથી તમે જાણી શકો કે કસ્ટમ એટ્રિબ્યુટ્સ અને ડિરેક્ટિવ્સ ક્યાં ઉમેરવા.

૧. **ડેફિનિશન (Definition)** (ઘટક ઓપ્શન્સ પ્રદાન કરે છે)

   - `is`

૨. **લિસ્ટ રેન્ડરિંગ (List Rendering)** (એ જ એલિમેન્ટની બહુવિધ વિવિધતાઓ બનાવે છે)

   - `v-for`

૩. **કન્ડિશનલ્સ (Conditionals)** (એલિમેન્ટ રેન્ડર/બતાવવામાં આવે છે કે નહીં)

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

૪. **રેન્ડર મોડિફાયર્સ (Render Modifiers)** (એલિમેન્ટ રેન્ડર થવાની રીત બદલે છે)

   - `v-pre`
   - `v-once`

૫. **ગ્લોબલ અવેરનેસ (Global Awareness)** (ઘટકની બહારના જ્ઞાનની જરૂર છે)

   - `id`

૬. **અનન્ય એટ્રિબ્યુટ્સ (Unique Attributes)** (અનન્ય મૂલ્યો જરૂરી એટ્રિબ્યુટ્સ)

   - `ref`
   - `key`

૭. **ટુ-વે બાઇન્ડિંગ (Two-Way Binding)** (બાઇન્ડિંગ અને ઇવેન્ટ્સનું સંયોજન)

   - `v-model`

૮. **અન્ય એટ્રિબ્યુટ્સ (Other Attributes)** (તમામ અનિર્દિષ્ટ બાઉન્ડ અને અનબાઉન્ડ એટ્રિબ્યુટ્સ)

૯. **ઇવેન્ટ્સ (Events)** (ઘટક ઇવેન્ટ લિસનર્સ)

   - `v-on`

૧૦. **કન્ટેન્ટ (Content)** (એલિમેન્ટના કન્ટેન્ટને ઓવરરાઇડ કરે છે)
    - `v-html`
    - `v-text`

## કમ્પોનન્ટ/ઇન્સ્ટન્સ ઓપ્શન્સમાં ખાલી લાઇન્સ (Empty lines in component/instance options) {#empty-lines-in-component-instance-options}

**તમે મલ્ટી-લાઇન પ્રોપર્ટીઝ વચ્ચે એક ખાલી લાઇન ઉમેરવા માંગો, ખાસ કરીને જો ઓપ્શન્સ સ્ક્રોલિંગ વિના તમારી સ્ક્રીન પર ફિટ ન થતા હોય.**

જ્યારે ઘટકો ભીડવાળા (cramped) અથવા વાંચવામાં મુશ્કેલ લાગવા માંડે, ત્યારે મલ્ટી-લાઇન પ્રોપર્ટીઝ વચ્ચે સ્પેસ ઉમેરવાથી તેમને ફરીથી ઝડપથી જોવાનું (skim) સરળ બની શકે. કેટલાક એડિટર્સમાં, જેમ કે Vim, આ પ્રકારના ફોર્મેટિંગ ઓપ્શન્સ તેમને કીબોર્ડ સાથે નેવિગેટ કરવાનું પણ સરળ બનાવી શકે.

<div class="options-api">

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```js
// સ્પેસ ન હોય તે પણ ઠીક છે, જ્યાં સુધી ઘટક
// વાંચવા અને નેવિગેટ કરવામાં સરળ હોય.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
})
const formattedValue = computed(() => {
  // ...
})
const inputClasses = computed(() => {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```js
defineProps({
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
})

const formattedValue = computed(() => {
  // ...
})

const inputClasses = computed(() => {
  // ...
})
```

</div>

</div>

## સિંગલ-ફાઇલ કમ્પોનન્ટ ટોપ-લેવલ એલિમેન્ટ ક્રમ {#single-file-component-top-level-element-order}

**[સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (Single-File Components)](/guide/scaling-up/sfc) એ હંમેશા `<script>`, `<template>`, અને `<style>` ટેગ્સને સુસંગત ક્રમમાં રાખવા જોઈએ, `<style>` છેલ્લે, કારણ કે અન્ય બેમાંથી ઓછામાં ઓછું એક હંમેશા જરૂરી છે.**

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html [ComponentX.vue]
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```

```vue-html [ComponentA.vue]
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html [ComponentB.vue]
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html [ComponentA.vue]
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html [ComponentB.vue]
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

અથવા (or)

```vue-html  [ComponentA.vue]
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

```vue-html [ComponentB.vue]
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>
