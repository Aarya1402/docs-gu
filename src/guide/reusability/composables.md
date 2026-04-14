# કમ્પોઝેબલ્સ (Composables) {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
આ વિભાગ Composition API ના મૂળભૂત જ્ઞાનને ધારે છે. જો તમે માત્ર Options API સાથે Vue શીખી રહ્યા છો, તો તમે API પ્રેફરન્સ (API Preference) ને Composition API પર સેટ કરી શકો છો (ડાબી સાઇડબારની ટોચ પરના ટૉગલનો ઉપયોગ કરીને) અને [રિએક્ટિવિટીના મૂળભૂત પાસાઓ](/guide/essentials/reactivity-fundamentals) અને [લાઇફસાયકલ હૂક્સ](/guide/essentials/lifecycle) પ્રકરણો ફરીથી વાંચી શકો છો.
:::

## "કમ્પોઝેબલ" શું છે? (What is a "Composable"?) {#what-is-a-composable}

Vue એપ્લિકેશનના સંદર્ભમાં, "કમ્પોઝેબલ" એ એક ફંક્શન છે જે **સ્ટેટફુલ લોજિક (stateful logic)** ને એન્કેપ્સ્યુલેટ કરવા અને તેનો પુનઃઉપયોગ કરવા માટે Vue ના Composition API નો લાભ લે છે.

ફ્રન્ટએન્ડ એપ્લિકેશન બનાવતી વખતે, આપણે ઘણીવાર સામાન્ય કાર્યો માટે લોજિકનો પુનઃઉપયોગ કરવાની જરૂર પડે છે. ઉદાહરણ તરીકે, અમને ઘણી જગ્યાએ તારીખો ફોર્મેટ કરવાની જરૂર પડી શકે છે, તેથી અમે તેના માટે પુનઃઉપયોગી ફંક્શન એક્સટ્રેક્ટ કરીએ છીએ. આ ફોર્મેટર ફંક્શન **સ્ટેટલેસ લોજિક (stateless logic)** ને એન્કેપ્સ્યુલેટ કરે છે: તે કોઈ ઇનપુટ લે છે અને તરત જ અપેક્ષિત આઉટપુટ પરત કરે છે. સ્ટેટલેસ લોજિકનો પુનઃઉપયોગ કરવા માટે ઘણી લાઈબ્રેરીઓ છે - ઉદાહરણ તરીકે [lodash](https://lodash.com/) અને [date-fns](https://date-fns.org/), જેના વિશે તમે કદાચ સાંભળ્યું હશે.

તેનાથી વિપરીત, સ્ટેટફુલ લોજિકમાં સ્ટેટનું સંચાલન કરવામાં આવે છે જે સમય સાથે બદલાય છે. સાદું ઉદાહરણ પેજ પર માઉસની વર્તમાન સ્થિતિને ટ્રેક કરવાનું છે. વાસ્તવિક દુનિયાના દૃશ્યોમાં, તે ટચ જેસ્ચર (touch gestures) અથવા ડેટાબેઝ સાથે કનેક્શન સ્ટેટસ જેવું વધુ જટિલ લોજિક પણ હોઈ શકે છે.

## માઉસ ટ્રેકર ઉદાહરણ (Mouse Tracker Example) {#mouse-tracker-example}

જો આપણે કમ્પોનન્ટની અંદર સીધા Composition API નો ઉપયોગ કરીને માઉસ ટ્રેકિંગ કાર્યક્ષમતાને લાગુ કરવા માંગતા હોઈએ, તો તે આના જેવું દેખાશે:

```vue [MouseComponent.vue]
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>માઉસની સ્થિતિ છે: {{ x }}, {{ y }}</template>
```

પરંતુ જો આપણે બહુવિધ ઘટકોમાં સમાન લોજિકનો પુનઃઉપયોગ કરવા માંગતા હોઈએ તો શું? અમે લોજિકને કમ્પોઝેબલ ફંક્શન તરીકે બાહ્ય ફાઇલમાં એક્સટ્રેક્ટ કરી શકીએ છીએ:

```js [mouse.js]
import { ref, onMounted, onUnmounted } from 'vue'

// પરંપરા મુજબ, કમ્પોઝેબલ ફંક્શનના નામ "use" થી શરૂ થાય છે
export function useMouse() {
  // કમ્પોઝેબલ દ્વારા એન્કેપ્સ્યુલેટેડ અને મેનેજ કરવામાં આવતી સ્ટેટ (state)
  const x = ref(0)
  const y = ref(0)

  // કમ્પોઝેબલ સમય જતાં તેની મેનેજ કરેલી સ્થિતિને અપડેટ કરી શકે છે.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // કમ્પોઝેબલ સાઇડ ઇફેક્ટ્સ ગોઠવવા અને તેને દૂર કરવા માટે 
  // તેના માલિક કમ્પોનન્ટના લાઇફસાયકલમાં પણ હૂક કરી શકે છે.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // મેનેજ કરેલી સ્ટેટને રિટર્ન વેલ્યુ તરીકે એક્સપોઝ કરો
  return { x, y }
}
```

અને આ રીતે તેનો ઘટકોમાં ઉપયોગ કરી શકાય છે:

```vue [MouseComponent.vue]
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>માઉસની સ્થિતિ છે: {{ x }}, {{ y }}</template>
```

<div class="demo">
  માઉસની સ્થિતિ છે: {{ x }}, {{ y }}
</div>

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNkj1rwzAQhv/KocUOGKVzSAIdurVjoQUvJj4XlfgkJNmxMfrvPcmJkkKHLrbu69H7SlrEszFyHFDsxN6drDIeHPrBHGtSvdHWwwKDwzfNHwjQWd1DIbd9jOW3K2qq6aTJxb6pgpl7Dnmg3NS0365YBnLgsTfnxiNHACvUaKe80gTKQeN3sDAIQqjignEhIvKYqMRta1acFVrsKtDEQPLYxuU7cV8Msmg2mdTilIa6gU5p27tYWKKq1c3ENphaPrGFW25+yMXsHWFaFlfiiOSvFIBJjs15QJ5JeWmaL/xYS/Mfpc9YYrPxl52ULOpwhIuiVl9k07Yvsf9VOY+EtizSWfR6xKK6itgkvQ/+fyNs6v4XJXIsPwVL+WprCiL8AEUxw5s=)

જેમ આપણે જોઈ શકીએ છીએ, કોર લોજિક સમાન રહે છે - અમારે જે કરવાનું હતું તે તેને બાહ્ય ફંક્શનમાં ખસેડવાનું હતું અને સ્ટેટ પરત કરવાની હતી જે એક્સપોઝ થવી જોઈએ. કમ્પોનન્ટની અંદરની જેમ જ, તમે કમ્પોઝેબલ્સમાં [Composition API ફંક્શન્સ](/api/#composition-api) ની સંપૂર્ણ શ્રેણીનો ઉપયોગ કરી શકો છો. સમાન `useMouse()` કાર્યક્ષમતા હવે કોઈપણ કમ્પોનન્ટમાં વાપરી શકાય છે.

કમ્પોઝેબલ્સ વિશે વધુ સારી વાત એ છે કે તમે તેને નેસ્ટ (nest) પણ કરી શકો છો: એક કમ્પોઝેબલ ફંક્શન એક અથવા વધુ અન્ય કમ્પોઝેબલ ફંક્શન્સને કૉલ કરી શકે છે. આ આપણને નાના, અલગ યુનિટ્સનો ઉપયોગ કરીને જટિલ લોજિક કમ્પોઝ કરવામાં સક્ષમ બનાવે છે, જેવી રીતે આપણે કમ્પોનન્ટ્સનો ઉપયોગ કરીને સંપૂર્ણ એપ્લિકેશન બનાવીએ છીએ. હકીકતમાં, આ જ કારણ છે કે અમે API ના સંગ્રહને કcallલ કરવાનું નક્કી કર્યું જે આ પેટર્નને Composition API ને શક્ય બનાવે છે.

ઉદાહરણ તરીકે, અમે DOM ઇવેન્ટ લિસનરને ઉમેરવા અને દૂર કરવાના લોજિકને તેના પોતાના કમ્પોઝેબલમાં એક્સટ્રેક્ટ કરી શકીએ છીએ:

```js [event.js]
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // જો તમે ઇચ્છો તો, તમે આને સિલેક્ટર સ્ટ્રિંગ્સને
  // ટાર્ગેટ તરીકે સપોર્ટ કરતું પણ બનાવી શકો છો
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

અને હવે અમારું `useMouse()` કમ્પોઝેબલ સરળ રીતે આ બનશે:

```js{2,8-11} [mouse.js]
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
કૉલ કરતો દરેક ઘટક ઇન્સ્ટન્સ `useMouse()` તેની પોતાની `x` અને `y` સ્ટેટની નકલો બનાવશે જેથી તેઓ એકબીજા સાથે દખલ ન કરે. જો તમે ઘટકો વચ્ચે શેર કરેલ સ્ટેટ (shared state) મેનેજ કરવા માંગતા હો, તો [સ્ટેટ મેનેજમેન્ટ](/guide/scaling-up/state-management) પ્રકરણ વાંચો.
:::

## એસિંક સ્ટેટ ઉદાહરણ (Async State Example) {#async-state-example}

`useMouse()` કમ્પોઝેબલ કોઈ આર્ગ્યુમેન્ટ લેતું નથી, તેથી ચાલો બીજા ઉદાહરણ પર નજર કરીએ જે તેનો ઉપયોગ કરે છે. એસિંક ડેટા ફેચિંગ (fetching) કરતી વખતે, અમારે ઘણીવાર વિવિધ પરિસ્થિતિઓ (states) ને હેન્ડલ કરવાની જરૂર હોય છે: લોડિંગ, સક્સેસ અને એરર:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">અરેરે! એરર આવી: {{ error.message }}</div>
  <div v-else-if="data">
    ડેટા લોડ થયો:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>લોડ થઈ રહ્યું છે...</div>
</template>
```

ડેટા મેળવવાની જરૂર હોય તેવા દરેક ઘટકમાં આ પેટર્નનું પુનરાવર્તન કરવું કંટાળાજનક હશે. ચાલો તેને કમ્પોઝેબલમાં એક્સટ્રેક્ટ કરીએ:

```js [fetch.js]
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

હવે આપણા ઘટકમાં આપણે આ કરી શકીએ છીએ:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

### રિએક્ટિવ સ્ટેટ સ્વીકારવું {#accepting-reactive-state}

`useFetch()` ઇનપુટ તરીકે સ્ટેટિક URL સ્ટ્રિંગ લે છે - તેથી તે માત્ર એક જ વાર ફેચ કરે છે અને પછી પૂરું થઈ જાય છે. જો આપણે ઈચ્છીએ કે જ્યારે પણ URL બદલાય ત્યારે તે ફરીથી ફેચ થાય તો શું? આ હાંસલ કરવા માટે, આપણે કમ્પોઝેબલ ફંક્શનમાં રિએક્ટિવ સ્ટેટ પાસ કરવાની જરૂર છે, અને કમ્પોઝેબલને વોચર્સ બનાવવા દેવા જોઈએ જે પાસ કરેલી સ્ટેટનો ઉપયોગ કરીને ક્રિયાઓ કરે છે.

ઉદાહરણ તરીકે, `useFetch()` એ રિફ (ref) સ્વીકારવા માટે સક્ષમ હોવું જોઈએ:

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// આનાથી ફરીથી ડેટા મેળવવો (re-fetch) જોઈએ
url.value = '/new-url'
```

અથવા, [ગેટર ફંક્શન](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) સ્વીકારો:

```js
// જ્યારે props.id બદલાય ત્યારે ફરીથી ફેચ કરો
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

અમે [`watchEffect()`](/api/reactivity-core.html#watcheffect) અને [`toValue()`](/api/reactivity-utilities.html#tovalue) APIs સાથે અમારા હાલના પ્રલીકરણ (implementation) ને રિફેક્ટર કરી શકીએ છીએ:

```js{7,12} [fetch.js]
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // ડેટા મેળવતા પહેલા સ્ટેટ રિસેટ કરો..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

`toValue()` એ ૩.૩ માં ઉમેરવામાં આવેલ API છે. તે રિફ્સ અથવા ગેટર્સને મૂલ્યોમાં સામાન્ય (normalize) કરવા માટે રચાયેલ છે. જો આર્ગ્યુમેન્ટ રિફ હોય, તો તે રિફની વેલ્યુ પરત કરે છે; જો આર્ગ્યુમેન્ટ ફંક્શન હોય, તો તે ફંક્શનને કૉલ કરશે અને તેની રિટર્ન વેલ્યુ પરત કરશે. અન્યથા, તે આર્ગ્યુમેન્ટને છે તેમ જ પરત કરે છે. તે [`unref()`](/api/reactivity-utilities.html#unref) ની જેમ જ કામ કરે છે, પરંતુ ફંક્શન્સ માટે વિશેષ ટ્રીટમેન્ટ સાથે.

નોંધ કરો કે `toValue(url)` એ `watchEffect` કોલબેકની **અંદર** કૉલ કરવામાં આવે છે. આ સુનિશ્ચિત કરે છે કે `toValue()` નોર્મલાઇઝેશન દરમિયાન એક્સેસ કરાયેલ કોઈપણ રિએક્ટિવ ડિપેન્ડન્સીસ વોચર દ્વારા ટ્રૅક કરવામાં આવે છે.

`useFetch()` નું આ વર્ઝન હવે સ્ટેટિક URL સ્ટ્રિંગ્સ, રિફ્સ અને ગેટર્સ સ્વીકારે છે, જે તેને વધુ લવચીક બનાવે છે. વોચ ઇફેક્ટ તાત્કાલિક ચાલશે, અને `toValue(url)` દરમિયાન એક્સેસ કરાયેલ કોઈપણ ડિપેન્ડન્સીસ ને ટ્રૅક કરશે. જો કોઈ ડિપેન્ડન્સીસ ટ્રૅક કરવામાં આવતી નથી (દા.ત. યુઆરએલ પહેલેથી જ સ્ટ્રિંગ છે), તો ઇફેક્ટ ફક્ત એક જ વાર ચાલે છે; અન્યથા, જ્યારે પણ ટ્રૅક કરેલી ડિપેન્ડન્સી બદલાશે ત્યારે તે ફરીથી ચાલશે.

ડેમો હેતુઓ માટે આર્ટિફિશિયલ વિલંબ અને રેન્ડમાઇઝ્ડ એરર સાથેનું [`useFetch()` નું અપડેટેડ વર્ઝન](https://play.vuejs.org/#eNp9Vdtu20YQ/ZUpUUA0qpAOjલૂક-ઇન-વોચર્સ-એડ્રીએન્ટ) અહીં છે.

## પરંપરાઓ અને શ્રેષ્ઠ પદ્ધતિઓ (Conventions and Best Practices) {#conventions-and-best-practices}

### નામકરણ (Naming) {#naming}

કમ્પોઝેબલ ફંક્શનના નામ camelCase નામો સાથે રાખવાની પરંપરા છે જે "use" થી શરૂ થાય છે.

### ઇનપુટ આર્ગ્યુમેન્ટ્સ (Input Arguments) {#input-arguments}

કમ્પોઝેબલ રિફ અથવા ગેટર આર્ગ્યુમેન્ટ્સ સ્વીકારી શકે છે ભલે તે રિએક્ટિવિટી માટે તેમના પર આધાર રાખતું ન હોય. જો તમે કમ્પોઝેબલ લખી રહ્યા છો જે અન્ય ડેવલપર્સ દ્વારા ઉપયોગમાં લેવાયેલ હોઈ શકે છે, તો ઇનપુટ આર્ગ્યુમેન્ટ્સ રો ડેટા (raw values) ને બદલે રિફ્સ અથવા ગેટર્સ હોવાના કિસ્સામાં હેન્ડલ કરવું સારો વિચાર છે. આ હેતુ માટે [`toValue()`](/api/reactivity-utilities#tovalue) યુટિલિટી ફંક્શન કામમાં આવશે:

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // જો maybeRefOrGetter એ રિફ અથવા ગેટર છે,
  // તો તેની નોર્મલાઇઝ્ડ વેલ્યુ પરત કરવામાં આવશે.
  // અન્યથા, તે છે તેમ જ પરત કરવામાં આવે છે.
  const value = toValue(maybeRefOrGetter)
}
```

જો ઇનપુટ રિફ અથવા ગેટર હોય ત્યારે તમારા કમ્પોઝેબલ રિએક્ટિવ ઇફેક્ટ્સ બનાવે છે, તો ખાતરી કરો કે કાં તો `watch()` સાથે રિફ / ગેટરને સ્પષ્ટપણે વોચ કરો અથવા `watchEffect()` ની અંદર `toValue()` ને કૉલ કરો જેથી તે યોગ્ય રીતે ટ્રેક થાય.

[અગાઉ ચર્ચા કરેલ useFetch() અમલીકરણ](#accepting-reactive-state) કમ્પોઝેબલનું કોંક્રિટ ઉદાહરણ પૂરું પાડે છે જે ઇનપુટ આર્ગ્યુમેન્ટ તરીકે રિફ્સ, ગેટર્સ અને પ્લેન વેલ્યુસ સ્વીકારે છે.

### રિટર્નિંગ વેલ્યુસ (Return Values) {#return-values}

તમે કદાચ નોંધ્યું હશે કે અમે કમ્પોઝેબલ્સમાં `reactive()` ને બદલે ખાસ કરીને `ref()` નો ઉપયોગ કરી રહ્યા છીએ. કમ્પોઝેબલ્સ માટે ભલામણ કરેલ કન્વેન્શન હંમેશા બહુવિધ રિફ્સ ધરાવતા સાદા, નોન-રિએક્ટિવ ઓબ્જેક્ટને પરત કરવા માટેની છે. આ તે રિએક્ટિવિટી જાળવી રાખતી વખતે કમ્પોનન્ટ્સમાં ડિસ્ટ્રક્ચર (destructured) કરવાની મંજૂરી આપે છે:

```js
// x અને y એ રિફ્સ છે
const { x, y } = useMouse()
```

કમ્પોઝેબલમાંથી રિએક્ટિવ ઓબ્જેક્ટ પરત કરવાથી આવા ડિસ્ટ્રક્ચર્સ કમ્પોઝેબલની અંદર સ્ટેટ સાથે રિએક્ટિવિટી કનેક્શન ગુમાવે છે, જ્યારે રિફ્સ તે કનેક્શન જાળવી રાખશે.

જો તમે કમ્પોઝેબલ્સમાંથી પરત કરેલ સ્ટેટનો ઓબ્જેક્ટ પ્રોપર્ટીઝ તરીકે ઉપયોગ કરવાનું પસંદ કરો છો, તો તમે પરત કરેલા ઓબ્જેક્ટને `reactive()` સાથે લપેટી શકો છો જેથી રિફ્સ અનરેપ (unwrapped) થઈ જાય. ઉદાહરણ તરીકે:

```js
const mouse = reactive(useMouse())
// mouse.x મૂળ રિફ સાથે જોડાયેલ છે
console.log(mouse.x)
```

```vue-html
માઉસની સ્થિતિ છે: {{ mouse.x }}, {{ mouse.y }}
```

### સાઇડ ઇફેક્ટ્સ (Side Effects) {#side-effects}

કમ્પોઝેબલ્સમાં સાઇડ ઇફેક્ટ્સ (દા.ત. DOM ઇવેન્ટ લિસનર્સ ઉમેરવા અથવા ડેટા ફેચિંગ) કરવા ઠીક છે, પરંતુ નીચેના નિયમો પર ધ્યાન આપો:

- જો તમે એવી એપ્લિકેશન પર કામ કરી રહ્યાં હોવ કે જે [સર્વર-સાઇડ રેન્ડરિંગ (SSR)](/guide/scaling-up/ssr) નો ઉપયોગ કરે છે, તો પોસ્ટ-માઉન્ટ (post-mount) લાઇફસાયકલ હૂક્સમાં DOM-વિશિષ્ટ સાઇડ ઇફેક્ટ્સ કરવાનું સુનિશ્ચિત કરો, દા.ત. `onMounted()`. આ હૂક્સ ફક્ત બ્રાઉઝરમાં જ કૉલ કરવામાં આવે છે, તેથી તમે ખાતરી કરી શકો છો કે તેમની અંદરના કોડ પાસે DOM ની એક્સેસ છે.

- `onUnmounted()` માં સાઇડ ઇફેક્ટ્સ ક્લીન કરવાનું યાદ રાખો. ઉદાહરણ તરીકે, જો કમ્પોઝેબલ DOM ઇવેન્ટ લિસનર સેટ કરે છે, તો તે `onUnmounted()` માં તે લિસનરને દૂર કરવું જોઈએ જે આપણે `useMouse()` ઉદાહરણમાં જોયું છે. કમ્પોઝેબલનો ઉપયોગ કરવો સારો વિચાર હોઈ શકે છે જે આપમેળે તમારા માટે આ કરે છે, જેમ કે `useEventListener()` ઉદાહરણ.

### વપરાશ પ્રતિબંધો (Usage Restrictions) {#usage-restrictions}

કમ્પોઝેબલ્સ ફક્ત `<script setup>` અથવા `setup()` હૂકમાં જ કૉલ કરવા જોઈએ. તેઓ આ સંદર્ભોમાં **સિંક્રનસ (synchronously)** રીતે કૉલ કરવા જોઈએ. કેટલાક કિસ્સાઓમાં, તમે તેમને `onMounted()` જેવા લાઇફસાયકલ હૂક્સમાં પણ કૉલ કરી શકો છો.

આ પ્રતિબંધો મહત્વપૂર્ણ છે કારણ કે આ એવા સંદર્ભો છે જ્યાં Vue વર્તમાન સક્રિય ઘટક ઇન્સ્ટન્સ નક્કી કરવામાં સક્ષમ છે. સક્રિય ઘટક ઇન્સ્ટન્સની એક્સેસ આવશ્યક છે જેથી કરીને:

૧. લાઇફસાયકલ હૂક્સ તેમાં રજીસ્ટર કરી શકાય.

૨. વોચર્સને તેની સાથે લિંક કરી શકાય છે, જેથી જ્યારે મેમરી લિક અટકાવવા માટે ઇન્સ્ટન્સ અનમાઉન્ટ કરવામાં આવે ત્યારે તેનો નિકાલ કરી શકાય.

:::tip
`<script setup>` એ એકમાત્ર એવી જગ્યા છે જ્યાં તમે `await` નો ઉપયોગ કર્યા **પછી** પણ કમ્પોઝેબલ્સને કૉલ કરી શકો છો. એસિંક ઓપરેશન પછી કમ્પાઇલર આપમેળે તમારા માટે એક્ટિવ ઇન્સ્ટન્સ કોન્ટેક્સ્ટને પુનઃસ્થાપિત કરે છે.
:::

## કોડ ઓર્ગેનાઈઝેશન માટે કમ્પોઝેબલ્સનો ઉપયોગ {#extracting-composables-for-code-organization}

કમ્પોઝેબલ્સને માત્ર પુનઃઉપયોગ માટે જ નહીં, પણ કોડ ઓર્ગેનાઈઝેશન માટે પણ એક્સટ્રેક્ટ કરી શકાય છે. જેમ જેમ તમારા ઘટકોની જટિલતા વધે છે તેમ, તમે એવા ઘટકો સાથે સમાપ્ત થઈ શકો છો જે નેવિગેટ કરવા અને સમજવા માટે ખૂબ મોટા છે. Composition API તમને લોજિકલ ચિંતાઓના આધારે તમારા ઘટક કોડને નાના ફંક્શન્સમાં ગોઠવવાની સંપૂર્ણ લવચીકતા આપે છે:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

અમુક અંશે, તમે આ એક્સટ્રેક્ટ કરેલા કમ્પોઝેબલ્સને કમ્પોનન્ટ-સ્કોપ્ડ સર્વિસ તરીકે વિચારી શકો છો જે એકબીજા સાથે વાત કરી શકે છે.

## Options API માં કમ્પોઝેબલ્સનો ઉપયોગ કરવો {#using-composables-in-options-api}

જો તમે Options API નો ઉપયોગ કરી રહ્યાં છો, તો કમ્પોઝેબલ્સને `setup()` ની અંદર કૉલ કરવા જ જોઈએ, અને પરત કરેલા બાઈન્ડિંગ્સને `setup()` માંથી પરત કરવા જ જોઈએ જેથી કરીને તે `this` અને ટેમ્પલેટમાં એક્સપોઝ થાય:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() એક્સપોઝ કરેલી પ્રોપર્ટીઝને `this` પર એક્સેસ કરી શકાય છે
    console.log(this.x)
  }
  // ...અન્ય ઓપ્શન્સ
}
```

## અન્ય તકનીકો સાથે સરખામણી {#comparisons-with-other-techniques}

### મિક્સિન્સ (Mixins) વિરુદ્ધ {#vs-mixins}

Vue 2 માંથી આવતા યુઝર્સ [મિક્સિન્સ (mixins)](/api/options-composition#mixins) ઓપ્શનથી પરિચિત હોઈ શકે છે, જે આપણને કમ્પોનન્ટ લોજિકને પુનઃઉપયોગી એકમોમાં એક્સટ્રેક્ટ કરવાની મંજૂરી આપે છે. મિક્સિન્સની ત્રણ પ્રાથમિક ખામીઓ છે:

૧. **પ્રોપર્ટીઝનો અસ્પષ્ટ સ્ત્રોત**: ઘણા મિક્સિન્સનો ઉપયોગ કરતી વખતે, તે અસ્પષ્ટ બની જાય છે કે કઈ ઇન્સ્ટન્સ પ્રોપર્ટી કયા મિક્સિન દ્વારા ઇન્જેક્ટ કરવામાં આવી છે, જે અમલીકરણને ટ્રેસ કરવાનું અને ઘટકના વર્તનને સમજવાનું મુશ્કેલ બનાવે છે. આ જ કારણ છે કે અમે કમ્પોઝેબલ્સ માટે રિફ્સ + ડિસ્ટ્રક્ચર પેટર્નનો ઉપયોગ કરવાની ભલામણ કરીએ છીએ: તે ઘટકોમાં પ્રોપર્ટીના સ્ત્રોતને સ્પષ્ટ બનાવે છે.

૨. **નેમસ્પેસ અથડામણ (Namespace collisions)**: વિવિધ લેખકોના બહુવિધ મિક્સિન્સ સંભવિતપણે સમાન પ્રોપર્ટી કી રજીસ્ટર કરી શકે છે, જે નેમસ્પેસ અથડામણનું કારણ બને છે. કમ્પોઝેબલ્સ સાથે, જો વિવિધ કમ્પોઝેબલ્સમાંથી વિરોધાભાસી કીઓ હોય તો તમે ડિસ્ટ્રક્ચર કરેલા વેરીએબલ્સનું નામ બદલી શકો છો.

૩. **ગૌણ ક્રોસ-મિક્સિન કમ્યુનિકેશન**: બહુવિધ મિક્સિન્સ કે જેણે એકબીજા સાથે સંપર્ક કરવાની જરૂર હોય છે તેઓએ શેર કરેલ પ્રોપર્ટી કી પર આધાર રાખવો પડે છે, જે તેમને ગૌણ રીતે જોડે છે. કમ્પોઝેબલ્સ સાથે, એક કમ્પોઝેબલમાંથી પરત કરવામાં આવેલી વેલ્યુસ અન્ય માં આર્ગ્યુમેન્ટ્સ તરીકે પાસ કરી શકાય છે, બિલકુલ સામાન્ય ફંક્શન્સની જેમ.

ઉપરોક્ત કારણોસર, અમે હવે Vue 3 માં મિક્સિન્સનો ઉપયોગ કરવાની ભલામણ કરતા નથી. આ સુવિધાને માત્ર માઈગ્રેશન અને પરિચિતતાના કારણોસર રાખવામાં આવી છે.

### રેન્ડરલેસ કમ્પોનન્ટ્સ (Renderless Components) વિરુદ્ધ {#vs-renderless-components}

કમ્પોનન્ટ સ્લોટ્સ પ્રકરણમાં, અમે સ્કોપ્ડ સ્લોટ્સ પર આધારિત [રેન્ડરલેસ કમ્પોનન્ટ (Renderless Component)](/guide/components/slots#renderless-components) પેટર્ન વિશે ચર્ચા કરી. અમે રેન્ડરલેસ કમ્પોનન્ટ્સનો ઉપયોગ કરીને સમાન માઉસ ટ્રેકિંગ ડેમો પણ લાગુ કર્યો.

રેન્ડરલેસ કમ્પોનન્ટ્સ પર કમ્પોઝેબલ્સનો મુખ્ય ફાયદો એ છે કે કમ્પોઝેબલ્સમાં વધારાના ઘટક ઇન્સ્ટન્સ ઓવરહેડ થતો નથી. જ્યારે સમગ્ર એપ્લિકેશનમાં ઉપયોગ કરવામાં આવે છે, ત્યારે રેન્ડરલેસ કમ્પોનન્ટ પેટર્ન દ્વારા બનાવવામાં આવેલા વધારાના ઘટક ઇન્સ્ટન્સની માત્રા નોંધપાત્ર પરફોર્મન્સ ઓવરહેડ બની શકે છે.

ભલામણ એ છે કે શુદ્ધ લોજિકનો પુનઃઉપયોગ કરતી વખતે કમ્પોઝેબલ્સનો ઉપયોગ કરવો અને લોજિક અને વિઝ્યુઅલ લેઆઉટ બંનેનો પુનઃઉપયોગ કરતી વખતે કમ્પોનન્ટ્સનો ઉપયોગ કરવો.

### React Hooks વિરુદ્ધ {#vs-react-hooks}

જો તમારી પાસે React નો અનુભવ છે, તો તમે નોંધ્યું હશે કે આ કસ્ટમ React હુક્સ જેવું જ દેખાય છે. Composition API અંશતઃ React હુક્સ દ્વારા પ્રેરિત હતું, અને Vue કમ્પોઝેબલ્સ ખરેખર લોજિક કમ્પોઝિશન ક્ષમતાઓના સંદર્ભમાં React હુક્સ જેવા જ છે. જો કે, Vue કમ્પોઝેબલ્સ Vue ની ફાઇન-ગ્રેઇન્ડ રિએક્ટિવિટી સિસ્ટમ પર આધારિત છે, જે React હુક્સના એક્ઝેક્યુશન મોડલથી મૂળભૂત રીતે અલગ છે. આની ચર્ચા [Composition API FAQ](/guide/extras/composition-api-faq#comparison-with-react-hooks) માં વધુ વિગતવાર કરવામાં આવી છે.

## વધુ વાંચન {#further-reading}

- [રિએક્ટિવિટી ઊંડાણમાં (Reactivity In Depth)](/guide/extras/reactivity-in-depth): Vue ની રિએક્ટિવિટી સિસ્ટમ કેવી રીતે કાર્ય કરે છે તેની લો-લેવલ સમજણ માટે.
- [સ્ટેટ મેનેજમેન્ટ (State Management)](/guide/scaling-up/state-management): બહુવિધ ઘટકો દ્વારા શેર કરાયેલ સ્ટેટ ને મેનેજ કરવાની પેટર્ન માટે.
- [કમ્પોઝેબલ્સનું પરીક્ષણ (Testing Composables)](/guide/scaling-up/testing#testing-composables): કમ્પોઝેબલ્સના યુનિટ ટેસ્ટિંગ પર ટિપ્સ.
- [VueUse](https://vueuse.org/): Vue કમ્પોઝેબલ્સનો સતત વધતો જતો સંગ્રહ. સોર્સ કોડ પણ શીખવા માટેનું એક ઉત્તમ રિસોર્સ છે.
