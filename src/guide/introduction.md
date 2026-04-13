---
footer: false
---

# પરિચય {#introduction}

:::info તમે Vue 3 માટે દસ્તાવેજીકરણ વાંચી રહ્યા છો!

- Vue 2 માટે સપોર્ટ **Dec 31, 2023** ના રોજ સમાપ્ત થયો છે. [Vue 2 EOL](https://v2.vuejs.org/eol/) વિશે વધુ જાણો.
- Vue 2 થી અપગ્રેડ કરી રહ્યા છો? [સ્થળાંતર માર્ગદર્શિકા](https://v3-migration.vuejs.org/) તપાસો.
:::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description"><span>VueMastery.com</span> પર વિડિઓ ટ્યુટોરિયલ્સ સાથે Vue શીખો</p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Vue શું છે? {#what-is-vue}

Vue (ઉચ્ચાર /vjuː/, **view** ની જેમ) યુઝર ઇન્ટરફેસ બનાવવા માટેનું જાવાસ્ક્રિપ્ટ ફ્રેમવર્ક છે. તે પ્રમાણભૂત HTML, CSS અને JavaScript પર બનેલ છે અને એક ડિક્લેરેટિવ (declarative), કમ્પોનન્ટ-આધારિત પ્રોગ્રામિંગ મોડેલ પ્રદાન કરે છે જે તમને કોઈપણ જટિલતાના યુઝર ઇન્ટરફેસને અસરકારક રીતે વિકસાવવામાં મદદ કરે છે.

અહીં એક નાનું ઉદાહરણ છે:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    ગણતરી (Count) છે: {{ count }}
  </button>
</div>
```

**પરિણામ (Result)**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    ગણતરી (Count) છે: {{ count }}
  </button>
</div>

ઉપરનું ઉદાહરણ Vue ની બે મુખ્ય લાક્ષણિકતાઓ દર્શાવે છે:

- **ડિક્લેરેટિવ રેન્ડરિંગ (Declarative Rendering)**: Vue પ્રમાણભૂત HTML ને ટેમ્પલેટ સિન્ટેક્સ સાથે વિસ્તારે છે જે આપણને જાવાસ્ક્રિપ્ટ સ્ટેટના આધારે HTML આઉટપુટને ડિક્લેરેટિવ રીતે વર્ણવવાની મંજૂરી આપે છે.

- **રિએક્ટિવિટી (Reactivity)**: Vue જાવાસ્ક્રિપ્ટ સ્ટેટમાં થતા ફેરફારોને આપમેળે ટ્રૅક કરે છે અને જ્યારે ફેરફારો થાય ત્યારે DOM ને અસરકારક રીતે અપડેટ કરે છે.

તમને કદાચ અત્યારે કેટલાક પ્રશ્નો હોઈ શકે છે - ચિંતા ન કરશો. અમે બાકીના દસ્તાવેજોમાં દરેક નાની વિગતને આવરી લઈશું. અત્યારે, કૃપા કરીને આગળ વાંચો જેથી કરીને તમે Vue શું ઓફર કરે છે તેની ઉચ્ચ-સ્તરીય સમજ મેળવી શકો.

:::tip પૂર્વજરૂરિયાતો (Prerequisites)
બાકીનું દસ્તાવેજીકરણ HTML, CSS અને JavaScript ની મૂળભૂત જાણકારી ધારી લે છે. જો તમે ફ્રન્ટએન્ડ ડેવલપમેન્ટમાં તદ્દન નવા છો, તો તમારા પ્રથમ પગલા તરીકે સીધા ફ્રેમવર્ક પર જવું એ શ્રેષ્ઠ વિચાર હોઈ શકે નહીં - મૂળભૂત બાબતોને સમજો અને પછી પાછા આવો! જો જરૂર હોય તો તમે [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) અને [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) માટેના આ અવલોકનો સાથે તમારા જ્ઞાનના સ્તરને ચકાસી શકો છો. અન્ય ફ્રેમવર્ક સાથેનો અગાઉનો અનુભવ મદદ કરે છે, પરંતુ જરૂરી નથી.
:::

## પ્રોગ્રેસિવ ફ્રેમવર્ક {#the-progressive-framework}

Vue એક ફ્રેમવર્ક અને ઇકોસિસ્ટમ છે જે ફ્રન્ટએન્ડ ડેવલપમેન્ટમાં જરૂરી મોટાભાગની સામાન્ય સુવિધાઓને આવરી લે છે. પરંતુ વેબ અત્યંત વૈવિધ્યપુર્ણ છે - આપણે વેબ પર જે વસ્તુઓ બનાવીએ છીએ તે આકાર અને સ્કેલમાં ઘણી અલગ હોઈ શકે છે. તે ધ્યાનમાં રાખીને, Vue ને લવચીક અને ક્રમશઃ સ્વીકારી શકાય તેવું ડિઝાઇન કરવામાં આવ્યું છે. તમારા ઉપયોગના કેસ (use case) ના આધારે, Vue નો ઉપયોગ વિવિધ રીતે કરી શકાય છે:

- બિલ્ડ સ્ટેપ વિના સ્ટેટિક HTML ને બહેતર બનાવવું
- કોઈપણ પૃષ્ઠ પર વેબ કમ્પોનન્ટ્સ તરીકે એમ્બેડ કરવું
- સિંગલ-પેજ એપ્લિકેશન (SPA)
- ફુલસ્ટેક / સર્વર-સાઇડ રેન્ડરિંગ (SSR)
- Jamstack / સ્ટેટિક સાઇટ જનરેશન (SSG)
- ડેસ્કટોપ, મોબાઇલ, WebGL, અને ટર્મિનલને પણ લક્ષ્ય બનાવવું

જો તમને આ ખ્યાલો ડરામણા લાગતા હોય, તો ચિંતા કરશો નહીં! ટ્યુટોરીયલ અને માર્ગદર્શિકા માટે માત્ર મૂળભૂત HTML અને JavaScript જ્ઞાનની જરૂર છે, અને તમે આમાંના કોઈપણમાં નિષ્ણાત થયા વિના તેને અનુસરી શકશો.

જો તમે અનુભવી ડેવલપર છો અને Vue ને તમારા સ્ટેકમાં કેવી રીતે શ્રેષ્ઠ રીતે એકીકૃત કરવું તેમાં રસ ધરાવો છો, અથવા આ શબ્દોનો અર્થ શું છે તે વિશે ઉત્સુક છો, તો અમે તેમના વિશે [Vue નો ઉપયોગ કરવાની રીતો](/guide/extras/ways-of-using-vue) માં વધુ વિગતવાર ચર્ચા કરીએ છીએ.

લવચીકતા હોવા છતાં, Vue કેવી રીતે કાર્ય કરે છે તે વિશેનું મુખ્ય જ્ઞાન આ તમામ ઉપયોગના કેસોમાં સમાન છે. ભલે તમે અત્યારે માત્ર શિખાઉ હોવ, પણ જે જ્ઞાન મેળવશો તે ભવિષ્યમાં વધુ મહત્વાકાંક્ષી લક્ષ્યોને પાર પાડવા માટે ઉપયોગી રહેશે. જો તમે અનુભવી છો, તો તમે જે સમસ્યાઓ હલ કરવાનો પ્રયાસ કરી રહ્યા છો તેના આધારે તમે Vue નો લાભ લેવા માટે શ્રેષ્ઠ માર્ગ પસંદ કરી શકો છો, જ્યારે તમારી ઉત્પાદકતા સમાન જ રહેશે. તેથી જ આપણે Vue ને "The Progressive Framework" કહીએ છીએ: તે એક એવું ફ્રેમવર્ક છે જે તમારી સાથે વધી શકે છે અને તમારી જરૂરિયાતોને અનુરૂપ બની શકે છે.

## સિંગલ-ફાઇલ કમ્પોનન્ટ્સ {#single-file-components}

મોટા ભાગના બિલ્ડ-ટૂલ-સક્ષમ Vue પ્રોજેક્ટ્સમાં, અમે **સિંગલ-ફાઇલ કમ્પોનન્ટ** (જેને `*.vue` ફાઇલો તરીકે પણ ઓળખવામાં આવે છે, ટૂંકમાં **SFC**) નામના HTML જેવા ફાઇલ ફોર્મેટનો ઉપયોગ કરીને Vue ઘટકો લખીએ છીએ. એક Vue SFC, જેમ કે નામ સૂચવે છે, ઘટકના લોજિક (JavaScript), ટેમ્પલેટ (HTML) અને શૈલીઓ (CSS) ને એક જ ફાઇલમાં સમાવે છે. SFC ફોર્મેટમાં લખાયેલ અગાઉનું ઉદાહરણ અહીં છે:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">ગણતરી છે: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">ગણતરી છે: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC એ Vue ની એક વિશિષ્ટ લાક્ષણિકતા છે અને જો તમારો ઉપયોગ કરવાનો કેસ બિલ્ડ સેટઅપની માંગ કરતો હોય તો Vue ઘટકો લખવા માટેની ભલામણ કરેલ રીત છે. તમે તેના સમર્પિત વિભાગમાં [SFC ના કેવી રીતે અને શા માટે](/guide/scaling-up/sfc) વિશે વધુ જાણી શકો છો - પરંતુ અત્યારે, ફક્ત એટલું જાણી લો કે Vue તમારા માટે તમામ બિલ્ડ ટૂલ્સ સેટઅપ સંભાળશે.

## API સ્ટાઇલ {#api-styles}

Vue ઘટકો બે અલગ અલગ API સ્ટાઇલમાં લખી શકાય છે: **Options API** અને **Composition API**.

### Options API {#options-api}

Options API સાથે, અમે `data`, `methods` અને `mounted` જેવા ઓપ્શનના ઓબ્જેક્ટનો ઉપયોગ કરીને ઘટકના લોજિકને વ્યાખ્યાયિત કરીએ છીએ. ઓપ્શન દ્વારા વ્યાખ્યાયિત કરેલી પ્રોપર્ટીઝ ફંક્શન્સની અંદર `this` પર એક્સપોઝ થાય છે, જે ઘટકના ઇન્સ્ટન્સ તરફ નિર્દેશ કરે છે:

```vue
<script>
export default {
  // data() માંથી મળેલી પ્રોપર્ટીઝ રિએક્ટિવ સ્ટેટ બની જાય છે
  // અને તે `this` પર એક્સપોઝ થશે.
  data() {
    return {
      count: 0
    }
  },

  // મેથડ્સ એ ફંક્શન્સ છે જે સ્ટેટમાં ફેરફાર કરે છે અને અપડેટ્સ ટ્રિગર કરે છે.
  // તેમને ટેમ્પલેટ્સમાં ઇવેન્ટ હેન્ડલર્સ તરીકે બાંધી શકાય છે.
  methods: {
    increment() {
      this.count++
    }
  },

  // લાઇફસાઇકલ હૂક્સને ઘટકના જીવનચક્રના વિવિધ તબક્કાઓ પર
  // કૉલ કરવામાં આવે છે.
  // જ્યારે ઘટક માઉન્ટ (Mounted) થશે ત્યારે આ ફંક્શન કૉલ કરવામાં આવશે.
  mounted() {
    console.log(`પ્રારંભિક ગણતરી ${this.count} છે.`)
  }
}
</script>

<template>
  <button @click="increment">ગણતરી છે: {{ count }}</button>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

Composition API સાથે, અમે ઇમ્પોર્ટ કરેલા API ફંક્શન્સનો ઉપયોગ કરીને ઘટકના લોજિકને વ્યાખ્યાયિત કરીએ છીએ. SFCs માં, Composition API નો ઉપયોગ સામાન્ય રીતે [`<script setup>`](/api/sfc-script-setup) સાથે કરવામાં આવે છે. `setup` એટ્રિબ્યુટ એ એક સંકેત છે જે Vue ને કમ્પાઇલ-ટાઇમ ટ્રાન્સફોર્મ્સ કરવા દે છે જે આપણને ઓછા બોઈલરપ્લેટ (boilerplate) સાથે Composition API નો ઉપયોગ કરવાની મંજૂરી આપે છે. ઉદાહરણ તરીકે, `<script setup>` માં જાહેર કરાયેલ ઇમ્પોર્ટ્સ અને ટોપ-લેવલ વેરિએબલ્સ / ફંક્શન્સ ટેમ્પલેટમાં સીધા વાપરી શકાય છે.

અહીં સમાન ઘટક છે, બરાબર સમાન ટેમ્પલેટ સાથે, પરંતુ તેના બદલે Composition API અને `<script setup>` નો ઉપયોગ કરીને:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// ફંક્શન્સ જે સ્ટેટમાં ફેરફાર કરે છે અને અપડેટ્સ ટ્રિગર કરે છે
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`પ્રારંભિક ગણતરી ${count.value} છે.`)
})
</script>

<template>
  <button @click="increment">ગણતરી છે: {{ count }}</button>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### કયું પસંદ કરવું? {#which-to-choose}

સમાન અંતર્ગત સિસ્ટમ દ્વારા સંચાલિત બંને API સ્ટાઇલ સામાન્ય ઉપયોગના કેસોને આવરી લેવા માટે સંપૂર્ણપણે સક્ષમ છે. વાસ્તવમાં, Options API એ Composition API ની ઉપર જ લાગુ કરવામાં આવ્યું છે! Vue વિશેની મૂળભૂત વિભાવનાઓ અને જ્ઞાન બંને શૈલીઓમાં સમાન છે.

Options API એ "ઘટક ઇન્સ્ટન્સ" (જેમ કે ઉદાહરણમાં `this` જોવા મળે છે) ના ખ્યાલની આસપાસ કેન્દ્રિત છે, જે સામાન્ય રીતે OOP લેન્ગવેજ બેકગ્રાઉન્ડ ધરાવતા વપરાશકર્તાઓ માટે ક્લાસ-આધારિત માનસિક મોડેલ સાથે વધુ સારી રીતે મેળ ખાય છે. તે રિએક્ટિવિટીની વિગતોને દૂર કરીને અને ઓપ્શન ગ્રુપ દ્વારા કોડ ઓર્ગેનાઇઝેશન લાગુ કરીને શિખાઉ માણસો માટે વધુ અનુકુળ છે.

Composition API એ ફંક્શન સ્કોપમાં સીધા રિએક્ટિવ સ્ટેટ વેરિએબલ્સ જાહેર કરવા અને જટિલતાને હેન્ડલ કરવા માટે બહુવિધ ફંક્શન્સમાંથી સ્ટેટને એકસાથે કમ્પોઝ કરવા પર ધ્યાન કેન્દ્રિત કરે છે. તે વધુ મુક્ત-સ્વરૂપ છે અને તેને અસરકારક રીતે ઉપયોગમાં લેવા માટે Vue માં રિએક્ટિવિટી કેવી રીતે કાર્ય કરે છે તેની સમજ હોવી જરૂરી છે. બદલામાં, તેની લવચીકતા લોજિકને ગોઠવવા અને પુનઃઉપયોગ માટે વધુ શક્તિશાળી પેટર્નને સક્ષમ કરે છે.

તમે [Composition API FAQ](/guide/extras/composition-api-faq) માં બે શૈલીઓ વચ્ચેની સરખામણી અને Composition API ના સંભવિત ફાયદાઓ વિશે વધુ જાણી શકો છો.

જો તમે Vue માં નવા છો, તો અહીં અમારી સામાન્ય ભલામણ છે:

- શીખવાના હેતુઓ માટે, એવી શૈલી સાથે જાઓ જે તમને સમજવામાં સરળ લાગે. ફરીથી, મોટા ભાગના મુખ્ય ખ્યાલો બંને શૈલીઓ વચ્ચે સમાન છે. તમે પછીથી હંમેશા બીજી શૈલી શીખી શકો છો.

- પ્રોડક્શન ઉપયોગ માટે:

  - જો તમે બિલ્ડ ટૂલ્સનો ઉપયોગ કરી રહ્યાં નથી અથવા ઓછી જટિલતાવાળા દ્રશ્યોમાં મુખ્યત્વે Vue નો ઉપયોગ કરવાની યોજના ઘડી રહ્યા છો, તો Options API સાથે જાઓ.

  - જો તમે Vue સાથે સંપૂર્ણ એપ્લિકેશન બનાવવાની યોજના ઘડી રહ્યા હોવ તો Composition API + સિંગલ-ફાઇલ કમ્પોનન્ટ્સ સાથે જાઓ.

તમારે શીખવાના તબક્કા દરમિયાન માત્ર એક જ શૈલીને વળગી રહેવાની જરૂર નથી. બાકીનું દસ્તાવેજીકરણ જ્યાં લાગુ પડતું હોય ત્યાં બંને શૈલીમાં કોડ નમૂનાઓ પ્રદાન કરશે, અને તમે ડાબી સાઇડબારની ટોચ પર **API Preference સ્વિચ** નો ઉપયોગ કરીને કોઈપણ સમયે તેમની વચ્ચે બદલી શકો છો.

## હજુ પણ પ્રશ્નો છે? {#still-got-questions}

અમારા [FAQ](/about/faq) તપાસો.

## તમારો લર્નિંગ પાથ પસંદ કરો {#pick-your-learning-path}

વિવિધ ડેવલપર્સની શીખવાની શૈલીઓ અલગ-અલગ હોય છે. તમારી પસંદગીને અનુરૂપ લર્નિંગ પાથ પસંદ કરવા માટે નિઃસંકોચ રહો - જો કે અમે શક્ય હોય તો બધી જ સામગ્રી જોવાની ભલામણ કરીએ છીએ!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">ટ્યુટોરીયલ અજમાવી જુઓ</p>
    <p class="next-steps-caption">જેઓ વસ્તુઓ પ્રેક્ટિકલી શીખવાનું પસંદ કરે છે તેમના માટે.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">માર્ગદર્શિકા વાંચો</p>
    <p class="next-steps-caption">માર્ગદર્શિકા તમને ફ્રેમવર્કના દરેક પાસાઓને સંપૂર્ણ વિગતવાર સમજાવે છે.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">ઉદાહરણો તપાસો</p>
    <p class="next-steps-caption">મુખ્ય લાક્ષણિકતાઓ અને સામાન્ય UI કાર્યોના ઉદાહરણો એક્સપ્લોર કરો.</p>
  </a>
</div>
