# કન્ડિશનલ રેન્ડરિંગ (Conditional Rendering) {#conditional-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="ફ્રી Vue.js કન્ડિશનલ રેન્ડરિંગ લેસન"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="ફ્રી Vue.js કન્ડિશનલ રેન્ડરિંગ લેસન"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if` {#v-if}

`v-if` ડિરેક્ટિવનો ઉપયોગ શરતી રીતે બ્લોકને રેન્ડર કરવા માટે થાય છે. જો ડિરેક્ટિવનું એક્સપ્રેશન સત્ય (truthy value) પરત કરશે તો જ બ્લોક રેન્ડર કરવામાં આવશે.

```vue-html
<h1 v-if="awesome">Vue સરસ છે!</h1>
```

## `v-else` {#v-else}

તમે `v-if` માટે "else block" સૂચવવા માટે `v-else` ડિરેક્ટિવનો ઉપયોગ કરી શકો છો:

```vue-html
<button @click="awesome = !awesome">ટોગલ (Toggle)</button>

<h1 v-if="awesome">Vue સરસ છે!</h1>
<h1 v-else>અરે ના 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">ટોગલ (Toggle)</button>
  <h1 v-if="awesome">Vue સરસ છે!</h1>
  <h1 v-else>અરે ના 😢</h1>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpFjkEOgjAQRa8ydIMulLA1hegJ3LnqBskAjdA27RQXhHu4M/GEHsEiKLv5mfdf/sBOxux7j+zAuCutNAQOyZtcKNkZbQkGsFjBCJXVHcQBjYUSqtTKERR3dLpDyCZmQ9bjViiezKKgCIGwM21BGBIAv3oireBYtrK8ZYKtgmg5BctJ13WLPJnhr0YQb1Lod7JaS4G8eATpfjMinjTphC8wtg7zcwNKw/v5eC1fnvwnsfEDwaha7w==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpFjj0OwjAMha9iMsEAFWuVVnACNqYsoXV/RJpEqVOQqt6DDYkTcgRSWoplWX7y56fXs6O1u84jixlvM1dbSoXGuzWOIMdCekXQCw2QS5LrzbQLckje6VEJglDyhq1pMAZyHidkGG9hhObRYh0EYWOVJAwKgF88kdFwyFSdXRPBZidIYDWvgqVkylIhjyb4ayOIV3votnXxfwrk2SPU7S/PikfVfsRnGFWL6akCbeD9fLzmK4+WSGz4AA5dYQY=)

</div>

`v-else` એલિમેન્ટ તરત જ `v-if` અથવા `v-else-if` એલિમેન્ટ પછી હોવું જોઈએ - અન્યથા તે ઓળખાશે નહીં.

## `v-else-if` {#v-else-if}

`v-else-if` નામ સૂચવે છે તેમ, `v-if` માટે "else if block" તરીકે કામ કરે છે. તેને બહુવિધ વખત સાંકળી (chain) પણ શકાય છે:

```vue-html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  A/B/C નથી
</div>
```

`v-else` ની જેમ, `v-else-if` એલિમેન્ટ પણ તરત જ `v-if` અથવા `v-else-if` એલિમેન્ટ પછી હોવું જોઈએ.

## `<template>` પર `v-if` {#v-if-on-template}

કારણ કે `v-if` એ ડિરેક્ટિવ છે, તેને સિંગલ એલિમેન્ટ સાથે જોડવું પડે છે. પરંતુ જો આપણે એકથી વધુ એલિમેન્ટ્સને ટોગલ (toggle) કરવા માંગતા હોઈએ તો શું? આ કિસ્સામાં આપણે `<template>` એલિમેન્ટ પર `v-if` નો ઉપયોગ કરી શકીએ છીએ, જે એક અદ્રશ્ય રેપર (wrapper) તરીકે કામ કરે છે. અંતિમ રેન્ડર કરેલા પરિણામમાં `<template>` એલિમેન્ટનો સમાવેશ થશે નહીં.

```vue-html
<template v-if="ok">
  <h1>શીર્ષક</h1>
  <p>ફકરો ૧</p>
  <p>ફકરો ૨</p>
</template>
```

`v-else` અને `v-else-if` નો ઉપયોગ પણ `<template>` પર થઈ શકે છે.

## `v-show` {#v-show}

શરતી રીતે એલિમેન્ટ પ્રદર્શિત કરવા માટેનો બીજો વિકલ્પ `v-show` ડિરેક્ટિવ છે. વપરાશ મોટે ભાગે સમાન છે:

```vue-html
<h1 v-show="ok">નમસ્તે!</h1>
```

તફાવત એ છે કે `v-show` ધરાવતું એલિમેન્ટ હંમેશા રેન્ડર થશે અને DOM માં રહેશે; `v-show` એલિમેન્ટની ફક્ત `display` CSS પ્રોપર્ટીને ટોગલ કરે છે.

`v-show` એ `<template>` એલિમેન્ટને સપોર્ટ કરતું નથી, કે તે `v-else` સાથે કામ કરતું નથી.

## `v-if` વિરુદ્ધ `v-show` {#v-if-vs-v-show}

`v-if` એ "સાચું" કન્ડિશનલ રેન્ડરિંગ છે કારણ કે તે સુનિશ્ચિત કરે છે કે ટોગલ્સ દરમિયાન કન્ડિશનલ બ્લોકની અંદરના ઇવેન્ટ લિસનર્સ અને ચાઇલ્ડ કમ્પોનન્ટ્સ યોગ્ય રીતે નાશ પામે છે અને ફરીથી બનાવવામાં આવે છે.

`v-if` પણ **આળસુ (lazy)** છે: જો પ્રારંભિક રેન્ડર પર સ્થિતિ ખોટી (false) હોય, તો તે કંઈપણ કરશે નહીં - જ્યાં સુધી સ્થિતિ પ્રથમ વખત સાચી (true) ન થાય ત્યાં સુધી કન્ડિશનલ બ્લોક રેન્ડર કરવામાં આવશે નહીં.

સરખામણીમાં, `v-show` ઘણું સરળ છે - CSS-આધારિત ટોગલિંગ સાથે, પ્રારંભિક સ્થિતિને ધ્યાનમાં લીધા વિના એલિમેન્ટ હંમેશા રેન્ડર થાય છે.

સામાન્ય રીતે કહીએ તો, `v-if` માં ટોગલ ખર્ચ (toggle cost) વધારે હોય છે જ્યારે `v-show` માં પ્રારંભિક રેન્ડર ખર્ચ વધારે હોય છે. તેથી જો તમારે કોઈ વસ્તુને વારંવાર ટોગલ કરવાની જરૂર હોય તો `v-show` પસંદ કરો અને જો શરત રનટાઇમ પર બદલાવાની શક્યતા ઓછી હોય તો `v-if` પસંદ કરો.

## `v-for` સાથે `v-if` {#v-if-with-v-for}

જ્યારે `v-if` અને `v-for` બંને એક જ એલિમેન્ટ પર વપરાય છે, ત્યારે `v-if`નું મૂલ્યાંકન પહેલા કરવામાં આવશે. વિગતો માટે [લિસ્ટ રેન્ડરિંગ માર્ગદર્શિકા](list#v-for-with-v-if) જુઓ.

::: warning નોંધ
ઇમ્પલિસિટ પ્રેસિડેન્સ (implicit precedence) ને કારણે એક જ એલિમેન્ટ પર `v-if` અને `v-for` નો ઉપયોગ કરવાની ભલામણ કરવામાં આવતી **નથી**. વિગતો માટે [લિસ્ટ રેન્ડરિંગ માર્ગદર્શિકા](list#v-for-with-v-if) નો સંદર્ભ લો.
:::
