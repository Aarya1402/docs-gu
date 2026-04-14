# કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ (Components Basics) {#components-basics}

<ScrimbaLink href="https://scrimba.com/links/vue-component-basics" title="ફ્રી Vue.js કમ્પોનન્ટ્સ લેસન" type="scrimba">
  Scrimba પર ઇન્ટરેક્ટિવ વિડિઓ લેસન જુઓ
</ScrimbaLink>

કમ્પોનન્ટ્સ આપણને UI ને સ્વતંત્ર અને પુનઃઉપયોગી ટુકડાઓમાં વિભાજિત કરવાની અને દરેક ટુકડા વિશે અલગથી વિચારવાની મંજૂરી આપે છે. એપ માટે નેસ્ટેડ કમ્પોનન્ટ્સના વૃક્ષ (tree) માં ગોઠવવું સામાન્ય છે:

![કમ્પોનન્ટ એટલે ઘટક વૃક્ષ](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

આ આપણે નેટિવ HTML એલિમેન્ટ્સને કેવી રીતે નેસ્ટ કરીએ છીએ તેના જેવું જ છે, પરંતુ Vue તેનું પોતાનું કમ્પોનન્ટ મોડલ લાગુ કરે છે જે આપણને દરેક કમ્પોનન્ટમાં કસ્ટમ કન્ટેન્ટ અને લોજિકને એન્કેપ્સ્યુલેટ (encapsulate) કરવાની મંજૂરી આપે છે. Vue નેટિવ વેબ કમ્પોનન્ટ્સ (Web Components) સાથે પણ સારી રીતે કામ કરે છે. જો તમે Vue કમ્પોનન્ટ્સ અને નેટિવ વેબ કમ્પોનન્ટ્સ વચ્ચેના સંબંધ વિશે જાણવા માંગતા હો, તો [વધુ અહીં વાંચો](/guide/extras/web-components).

## કમ્પોનન્ટ વ્યાખ્યાયિત કરવું {#defining-a-component}

બિલ્ડ સ્ટેપનો ઉપયોગ કરતી વખતે, અમે સામાન્ય રીતે `.vue` એક્સ્ટેંશનનો ઉપયોગ કરીને સમર્પિત ફાઇલમાં દરેક Vue કમ્પોનન્ટને વ્યાખ્યાયિત કરીએ છીએ - જેને [સિંગલ-ફાઇલ કમ્પોનન્ટ (Single-File Component)](/guide/scaling-up/sfc) (ટૂંકમાં SFC) તરીકે ઓળખવામાં આવે છે:

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
  <button @click="count++">તમે મને {{ count }} વાર ક્લિક કર્યો.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">તમે મને {{ count }} વાર ક્લિક કર્યો.</button>
</template>
```

</div>

બિલ્ડ સ્ટેપનો ઉપયોગ ન કરતી વખતે, Vue કમ્પોનન્ટને Vue-વિશિષ્ટ ઓપ્શન્સ ધરાવતા સાદા JavaScript ઓબ્જેક્ટ તરીકે વ્યાખ્યાયિત કરી શકાય છે:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      તમે મને {{ count }} વાર ક્લિક કર્યો.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      તમે મને {{ count }} વાર ક્લિક કર્યો.
    </button>`
  // in-DOM ટેમ્પલેટને પણ લક્ષ્ય બનાવી શકે છે:
  // template: '#my-template-element'
}
```

</div>

ટેમ્પલેટ અહીં જાવાસ્ક્રિપ્ટ સ્ટ્રિંગ તરીકે ઇનલાઈન કરવામાં આવ્યું છે, જેને Vue ઉડતા-ઉડતા (on the fly) કમ્પાઇલ કરશે. તમે એલિમેન્ટ (સામાન્ય રીતે નેટિવ `<template>` એલિમેન્ટ્સ) તરફ નિર્દેશ કરતા ID સિલેક્ટરનો પણ ઉપયોગ કરી શકો છો - Vue તેના કન્ટેન્ટનો ટેમ્પલેટ સોર્સ તરીકે ઉપયોગ કરશે.

ઉપરનું ઉદાહરણ સિંગલ કમ્પોનન્ટને વ્યાખ્યાયિત કરે છે અને તેને `.js` ફાઇલના ડિફોલ્ટ એક્સપોર્ટ તરીકે એક્સપોર્ટ કરે છે, પરંતુ તમે સમાન ફાઇલમાંથી બહુવિધ કમ્પોનન્ટ્સ એક્સપોર્ટ કરવા માટે નામવાળા એક્સપોર્ટ્સ (named exports) નો ઉપયોગ કરી શકો છો.

## કમ્પોનન્ટનો ઉપયોગ કરવો {#using-a-component}

:::tip
અમે આ માર્ગદર્શિકાના બાકીના ભાગ માટે SFC સિન્ટેક્સનો ઉપયોગ કરીશું - તમે બિલ્ડ સ્ટેપનો ઉપયોગ કરી રહ્યાં છો કે નહીં તેનાથી ધ્યાનમાં લીધા વગર કમ્પોનન્ટ્સ વિશેના ખ્યાલો સમાન છે. [ઉદાહરણો](/examples/) વિભાગ બંને સંજોગોમાં કમ્પોનન્ટનો વપરાશ દર્શાવે છે.
:::

ચાઇલ્ડ કમ્પોનન્ટનો ઉપયોગ કરવા માટે, આપણે તેને પેરેન્ટ કમ્પોનન્ટમાં ઇમ્પોર્ટ કરવાની જરૂર છે. ધારો કે આપણે આપણું કાઉન્ટર કમ્પોનન્ટ `ButtonCounter.vue` નામની ફાઇલની અંદર મૂક્યું છે, તો ઘટક ફાઇલના ડિફોલ્ટ એક્સપોર્ટ તરીકે એક્સપોઝ થશે:

<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>અહીં એક ચાઇલ્ડ કમ્પોનન્ટ છે!</h1>
  <ButtonCounter />
</template>
```

આપણા ટેમ્પલેટમાં ઇમ્પોર્ટ કરેલા કમ્પોનન્ટને એક્સપોઝ કરવા માટે, આપણે તેને `components` ઓપ્શન સાથે [રજીસ્ટર](/guide/components/registration) કરવાની જરૂર છે. કમ્પોનન્ટ તે જે કી હેઠળ નોંધાયેલ છે તે ટેગ તરીકે ઉપલબ્ધ થશે.

</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>અહીં એક ચાઇલ્ડ કમ્પોનન્ટ છે!</h1>
  <ButtonCounter />
</template>
```

`<script setup>` સાથે, ઇમ્પોર્ટ કરેલા ઘટકો ટેમ્પલેટ માટે આપમેળે ઉપલબ્ધ થાય છે.

</div>

કમ્પોનન્ટને ગ્લોબલી રજીસ્ટર કરવું પણ શક્ય છે, તેને ઇમ્પોર્ટ કર્યા વગર આપેલ એપના તમામ ઘટકો માટે ઉપલબ્ધ કરાવી શકાય છે. ગ્લોબલ વિરુદ્ધ લોકલ રજીસ્ટ્રેશનના ફાયદા અને ગેરફાયદાની ચર્ચા સમર્પિત [કમ્પોનન્ટ રજીસ્ટ્રેશન](/guide/components/registration) વિભાગમાં કરવામાં આવી છે.

કમ્પોનન્ટ્સનો તમે ઇચ્છો તેટલી વખત પુનઃઉપયોગ કરી શકાય છે:

```vue-html
<h1>અહીં ઘણા ચાઇલ્ડ કમ્પોનન્ટ્સ છે!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVUE1LxDAQ/StjLqusNHotcfHj4l8QcontLBtsJiGdiFL6301SdrEqyEJyeG9m3ps3k3gIoXlPKFqhxi7awDtN1gUfGR4Ts6cnn4gxwj56B5tGrtgyutEEoAk/6lCPe5MGhqmwnc9KhMRjuxCwFi3UrCk/JU/uGTC6MBjGglgdbnfPGBFM/s7QJ3QHO/TfxC+UzD21d72zPItU8uQrrsWvnKsT/ZW2N2wur45BI3KKdETlFlmphZsF58j/RgdQr3UJuO8G273daVFFtlstahngxSeoNezBIUzTYgPzDGwdjk1VkYvMj4jzF0nwsyQ=)

</div>
<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVj91KAzEQhV/lmJsqlY3eSlr8ufEVhNys6ZQGNz8kE0GWfXez2SJUsdCLuZiZM9+ZM4qnGLvPQuJBqGySjYxMXOJWe+tiSIznwhz8SyieKWGfgsOqkyfTGbDSXsmFUG9rw+Ti0DPNHavD/faVEqGv5Xr/BXOwww4mVBNPnvOVklXTtKeO8qKhkj++4lb8+fL/mCMS7TEdAy6BtDfBZ65fVgA2s+L67uZMUEC9N0s8msGaj40W7Xa91qKtgbdQ0Ha0gyOM45E+TWDrKHeNIhfMr0DTN4U0me8=)

</div>

નોંધ લો કે બટનો પર ક્લિક કરતી વખતે, દરેક તેનું પોતાનું, અલગ `count` જાળવી રાખે છે. તેનું કારણ એ છે કે જ્યારે પણ તમે કમ્પોનન્ટનો ઉપયોગ કરો છો, ત્યારે તેનો નવો **ઇન્સ્ટન્સ** બનાવવામાં આવે છે.

SFC માં, નેટિવ HTML એલિમેન્ટ્સથી અલગ પાડવા માટે ચાઇલ્ડ કમ્પોનન્ટ્સ માટે `PascalCase` ટેગ નામોનો ઉપયોગ કરવાની ભલામણ કરવામાં આવે છે. જોકે નેટિવ HTML ટેગ નામો કેસ-ઇનસેન્સિટિવ (case-insensitive) છે, Vue SFC એ કમ્પાઇલ કરેલ ફોર્મેટ છે તેથી અમે તેમાં કેસ-સેન્સિટિવ ટેગ નામોનો ઉપયોગ કરવા સક્ષમ છીએ. અમે ટેગ બંધ કરવા માટે `/>` નો ઉપયોગ કરવા માટે પણ સક્ષમ છીએ.

જો તમે તમારા ટેમ્પલેટ્સ સીધા DOM માં લખી રહ્યા છો (દા.ત. નેટિવ `<template>` એલિમેન્ટના કન્ટેન્ટ તરીકે), તો ટેમ્પલેટ બ્રાઉઝરના નેટિવ HTML પાર્સિંગ વર્તનને આધીન રહેશે. આવા કિસ્સાઓમાં, તમારે કમ્પોનન્ટ્સ માટે `kebab-case` અને સ્પષ્ટ બંધ ટેગ (closing tags) નો ઉપયોગ કરવાની જરૂર પડશે:

```vue-html
<!-- જો આ ટેમ્પલેટ DOM માં લખાયેલ હોય -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

વધુ વિગતો માટે [In-DOM ટેમ્પલેટ પાર્સિંગ સાવચેતીઓ](#in-dom-template-parsing-caveats) જુઓ.

## પ્રોપ્સ (Props) પાસ કરવા {#passing-props}

જો આપણે બ્લોગ બનાવી રહ્યા છીએ, તો આપણને બ્લોગ પોસ્ટનું પ્રતિનિધિત્વ કરતા ઘટકની જરૂર પડશે. આપણે ઇચ્છીએ છીએ કે તમામ બ્લોગ પોસ્ટ સમાન વિઝ્યુઅલ લેઆઉટ શેર કરે, પરંતુ અલગ અલગ કન્ટેન્ટ સાથે. આવો કમ્પોનન્ટ ઉપયોગી થશે નહીં જ્યાં સુધી તમે તેને ડેટા પાસ ન કરી શકો, જેમ કે આપણે જે ચોક્કસ પોસ્ટ પ્રદર્શિત કરવા માંગીએ છીએ તેનું ટાઇટલ અને કન્ટેન્ટ. ત્યાં જ પ્રોપ્સ (props) કામમાં આવે છે.

પ્રોપ્સ એ કસ્ટમ એટ્રિબ્યુટ્સ છે જે તમે કમ્પોનન્ટ પર રજીસ્ટર કરી શકો છો. અમારી બ્લોગ પોસ્ટના ઘટકમાં ટાઇટલ પાસ કરવા માટે, અમે આ કમ્પોનન્ટ સ્વીકારે છે તે પ્રોપ્સની યાદીમાં <span class="options-api">[`props`](/api/options-state#props) ઓપ્શન</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup#defineprops-defineemits) મેક્રો</span> નો ઉપયોગ કરીને તેને જાહેર કરવું જોઈએ:

<div class="options-api">

```vue [BlogPost.vue]
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

જ્યારે પ્રોપ એટ્રિબ્યુટમાં વેલ્યુ પાસ કરવામાં આવે છે, ત્યારે તે તે ઘટક ઇન્સ્ટન્સ પર પ્રોપર્ટી બની જાય છે. તે પ્રોપર્ટીની વેલ્યુ ટેમ્પલેટમાં અને અન્ય કોઈપણ કમ્પોનન્ટ પ્રોપર્ટીની જેમ જ કમ્પોનન્ટના `this` કોન્ટેક્સ્ટ પર એક્સેસિબલ હોય છે.

</div>
<div class="composition-api">

```vue [BlogPost.vue]
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` એ કોમ્પાઈલ-ટાઈમ મેક્રો છે જે ફક્ત `<script setup>` ની અંદર જ ઉપલબ્ધ છે અને તેને સ્પષ્ટ રીતે ઇમ્પોર્ટ કરવાની જરૂર નથી. જાહેર કરેલ પ્રોપ્સ આપમેળે ટેમ્પલેટમાં એક્સપોઝ થાય છે. `defineProps` એક ઓબ્જેક્ટ પણ પરત કરે છે જેમાં ઘટકમાં પાસ કરાયેલા તમામ પ્રોપ્સ હોય છે, જેથી જો જરૂર હોય તો આપણે તેને જાવાસ્ક્રિપ્ટમાં એક્સેસ કરી શકીએ:

```js
const props = defineProps(['title'])
console.log(props.title)
```

આ પણ જુઓ: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

જો તમે `<script setup>` નો ઉપયોગ કરી રહ્યાં નથી, તો પ્રોપ્સને `props` ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવા જોઈએ, અને પ્રોપ્સ ઓબ્જેક્ટ પ્રથમ આર્ગ્યુમેન્ટ તરીકે `setup()` માં પાસ કરવામાં આવશે:

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

કમ્પોનન્ટમાં તમે ઈચ્છો તેટલા પ્રોપ્સ હોઈ શકે છે અને, ડિફોલ્ટ રૂપે, કોઈપણ વેલ્યુ કોઈપણ પ્રોપમાં પાસ કરી શકાય છે.

એકવાર પ્રોપ રજીસ્ટર થઈ જાય, પછી તમે ડેટાને કસ્ટમ એટ્રિબ્યુટ તરીકે પાસ કરી શકો છો, આ રીતે:

```vue-html
<BlogPost title="Vue સાથેની મારી સફર" />
<BlogPost title="Vue સાથે બ્લોગિંગ" />
  <BlogPost title="શા માટે Vue આટલું મજાનું છે" />
```

સામાન્ય એપમાં, જોકે, તમારા પેરેન્ટ કમ્પોનન્ટમાં પોસ્ટ્સનો એરે હશે:

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'Vue સાથેની મારી સફર' },
        { id: 2, title: 'Vue સાથે બ્લોગિંગ' },
        { id: 3, title: 'શા માટે Vue આટલું મજાનું છે' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'Vue સાથેની મારી સફર' },
  { id: 2, title: 'Vue સાથે બ્લોગિંગ' },
  { id: 3, title: 'શા માટે Vue આટલું મજાનું છે' }
])
```

</div>

પછી `v-for` નો ઉપયોગ કરીને દરેક માટે એક ઘટક રેન્ડર કરવા માંગો છો:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9UU1rhDAU/CtDLrawVfpxklRo74We2kPtQdaoaTUJ8bmtiP+9ia6uC2VBgjOZeXnz3sCejAkPnWAx4+3eSkNJqmRjtCU817p81S2hsLpBEEYL4Q1BqoBUid9Jmosi62rC4Nm9dn4lFLXxTGAt5dG482eeUXZ1vdxbQZ1VCwKM0zr3x4KBATKPcbsDSapFjOClx5d2JtHjR1KFN9fTsfbWcXdy+CZKqcqL+vuT/r3qvQqyRatRdMrpF/nn/DNhd7iPR+v8HCDRmDoj4RHxbfyUDjeFto8p8yEh1Rw2ZV4JxN+iP96FMvest8RTTws/gdmQ8HUr7ikere+yHduu62y//y3NWG38xIOpeODyXcoE8OohGYZ5VhhHHjl83sD4B3XgyGI=)

</div>
<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9kU9PhDAUxL/KpBfWBCH+OZEuid5N9qSHrQezFKhC27RlDSF8d1tYQBP1+N78OpN5HciD1sm54yQj1J6M0A6Wu07nTIpWK+MwwPASI0qjWkQejVbpsVHVQVl30ZJ0WQRHjwFMnpT0gPZLi32w2h2DMEAUGW5iOOEaniF66vGuOiN5j0/hajx7B4zxxt5ubIiphKz+IO828qXugw5hYRXKTnPSSdcrJmk61/VF/eB4q5s3x8Pk6FJjauDO16Uye0ZCBwg5d2EkkED2wfuLlogibMOTbMpf9tMwP8jpeiMfRdM1l8Tk+/F++Y6Cl0Lyg1Ha7o7R5Bn9WwSg9X0+DPMxMI409fPP1PELlVmwdQ==)

</div>

નોંધ કરો કે ડાયનેમિક પ્રોપ વેલ્યુસ પાસ કરવા માટે [`v-bind` સિન્ટેક્સ](/api/built-in-directives#v-bind) (`:title="post.title"`) નો ઉપયોગ કેવી રીતે થાય છે. જ્યારે તમને ખબર હોતી નથી કે તમે કયું ચોક્કસ કન્ટેન્ટ આગળ રેન્ડર કરવા જેઈ રહ્યા છો ત્યારે આ ખાસ કરીને ઉપયોગી છે.

અત્યારે પ્રોપ્સ વિશે તમારે આટલું જ જાણવાની જરૂર છે, પરંતુ એકવાર તમે આ પેજ વાંચવાનું પૂરું કરી લો અને તેના કન્ટેન્ટ સાથે આરામદાયક અનુભવો, પછી અમે [પ્રોપ્સ (Props)](/guide/components/props) પર સંપૂર્ણ માર્ગદર્શિકા વાંચવા માટે પછીથી પાછા આવવાની ભલામણ કરીએ છીએ.

## ઇવેન્ટ્સ સાંભળવી {#listening-to-events}

જેમ જેમ આપણે આપણું `<BlogPost>` કમ્પોનન્ટ વિકસાવીએ છીએ, કેટલીક સુવિધાઓ માટે પેરેન્ટ ને જણાવવાની જરૂર પડી શકે છે. ઉદાહરણ તરીકે, અમે બાકીના પેજને તેના ડિફોલ્ટ કદ પર રાખીને, બ્લોગ પોસ્ટ્સના લખાણને મોટું કરવા માટે એક્સેસિબિલિટી ફીચર (accessibility feature) સમાવવાનું નક્કી કરી શકીએ છીએ.

પેરેન્ટમાં, અમે `postFontSize` <span class="options-api">ડેટા પ્રોપર્ટી</span><span class="composition-api">રિફ</span> ઉમેરીને આ સુવિધાને સપોર્ટ કરી શકીએ છીએ:

<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

જેનો ઉપયોગ તમામ બ્લોગ પોસ્ટ્સના ફોન્ટ સાઈઝને નિયંત્રિત કરવા માટે ટેમ્પલેટમાં થઈ શકે છે:

```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

હવે ચાલો `<BlogPost>` કમ્પોનન્ટના ટેમ્પલેટમાં એક બટન ઉમેરીએ:

```vue{5} [BlogPost.vue]
<!-- <script> ને અવગણીને -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>લખાણ મોટું કરો</button>
  </div>
</template>
```

બટન હજુ સુધી કંઈ કરતું નથી - અમે ઇચ્છીએ છીએ કે બટન પર ક્લિક કરવાથી પેરેન્ટને જાણ કરવામાં આવે કે તેણે બધી પોસ્ટના લખાણને મોટું કરવું જોઈએ. આ સમસ્યાને ઉકેલવા માટે, ઘટકો કસ્ટમ ઇવેન્ટ સિસ્ટમ પ્રદાન કરે છે. પેરેન્ટ `v-on` અથવા `@` સાથે ચાઇલ્ડ કમ્પોનન્ટ ઇન્સ્ટન્સ પર કોઈપણ ઇવેન્ટ સાંભળવાનું પસંદ કરી શકે છે, જેમ આપણે નેટિવ DOM ઇવેન્ટ સાથે કરીશું:

```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

પછી ચાઇલ્ડ કમ્પોનન્ટ બિલ્ટ-ઇન [**`$emit`** મેથડ](/api/component-instance#emit) ને કૉલ કરીને, ઇવેન્ટનું નામ પાસ કરીને પોતાની જાત પર ઇવેન્ટ મોકલી શકે છે:

```vue{5} [BlogPost.vue]
<!-- <script> ને અવગણીને -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">લખાણ મોટું કરો</button>
  </div>
</template>
```

`@enlarge-text="postFontSize += 0.1"` લિસનરના કારણે, પેરેન્ટ ઇવેન્ટ પ્રાપ્ત કરશે અને `postFontSize` ની વેલ્યુ અપડેટ કરશે.

<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNUsFOg0AQ/ZUJMaGNbbHqidCmmujNxMRED9IDhYWuhV0CQy0S/t1ZYIEmaiRkw8y8N/vmMZVxl6aLY8EM23ByP+Mprl3Bk1RmCPexjJ5ljhBmMgFzYemEIpiuAHAFOzXQgIVeESNUKutL4gsmMLfbBPStVFTP1Bl46E2mup4xLDKhI4CUsMR+1zFABTywYTkD5BgzG8ynEj4kkVgJnxz38Eqaut5jxvXAUCIiLqI/8TcD/m1fKhTwHHIJYSEIr+HbnqikPkqBL/yLSMs23eDooNexel8pQJaksYeMIgAn4EewcyxjtnKNCsK+zbgpXILJEnW30bCIN7ZTPcd5KDNqoWjARWufa+iyfWBlV13wYJRvJtWVJhiKGyZiL4vYHNkJO8wgaQVXi6UGr51+Ndq5LBqMvhyrH9eYGePtOVu3n3YozWSqFsBsVJmt3SzhzVaYY2nm9l82+7GX5zTGjlTM1SyNmy5SeX+7rqr2r0NdOxbFXWVXIEoBGz/m/oHIF0rB5Pz6KTV6aBOgEo7Vsn51ov4GgAAf2A==)

</div>
<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1Uk1PwkAQ/SuTxqQYgYp6ahaiJngzITHRA/UAZQor7W7TnaK16X93th8UEuHEvPdm5s3bls5Tmo4POTq+I0yYyZTAIOXpLFAySXVGUEKGEVQQZToBl6XukXqO9XahDbXc2OsAO5FlAIEKtWJByqCBqR01WFqiBLnxYTIEkhSjD+5rAV86zxQW8C1pB+88Aaphr73rtXbNVqrtBeV9r/zYFZYHacBoiHLFykB9Xgfq1NmLVvQmf7E1OGFaeE0anAMXhEkarwhtRWIjD+AbKmKcBk4JUdvtn8+6ARcTu87หૉપિલામપોનેન્ટોએલટ-બૉક્સ)

</div>

આપણે વૈકલ્પિક રીતે <span class="options-api">[`emits`](/api/options-state#emits) ઓપ્શન</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup#defineprops-defineemits) મેક્રો</span> નો ઉપયોગ કરીને એમિટ થયેલ ઇવેન્ટ્સ જાહેર કરી શકીએ છીએ:

<div class="options-api">

```vue{4} [BlogPost.vue]
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{3} [BlogPost.vue]
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

આ ઘટક જે બધી ઇવેન્ટ્સ મોકલે છે તેને દસ્તાવેજ (documents) કરે છે અને વૈકલ્પિક રીતે [તેમને વેલિડેટ કરે છે](/guide/components/events#events-validation). તે Vue ને ચાઇલ્ડ કમ્પોનન્ટના રૂટ એલિમેન્ટ પર નેટિવ લિસનર્સ તરીકે સ્પષ્ટપણે લાગુ કરવાનું ટાળવાની પણ મંજૂરી આપે છે.

<div class="composition-api">

`defineProps` ની જેમ જ, `defineEmits` ફક્ત `<script setup>` માં જ વાપરી શકાય છે અને તેને ઇમ્પોર્ટ કરવાની જરૂર નથી. તે એક `emit` ફંક્શન પરત કરે છે જે `$emit` મેથડ ની સમકક્ષ છે. તેનો ઉપયોગ કમ્પોનન્ટના `<script setup>` વિભાગમાં ઇવેન્ટ્સ મોકલવા માટે થઈ શકે છે, જ્યાં `$emit` સીધી રીતે એક્સેસિબલ નથી:

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

આ પણ જુઓ: [Typing Component Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

જો તમે `<script setup>` નો ઉપયોગ કરી રહ્યાં નથી, તો તમે `emits` ઓપ્શનનો ઉપયોગ કરીને એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરી શકો છો. તમે સેટઅપ કોન્ટેક્સ્ટની પ્રોપર્ટી તરીકે `emit` ફંક્શનને એક્સેસ કરી શકો છો (બીજી આર્ગ્યુમેન્ટ તરીકે `setup()` માં પાસ કરેલ છે):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

કસ્ટમ કમ્પોનન્ટ ઇવેન્ટ્સ વિશે અત્યારે તમારે આટલું જ જાણવાની જરૂર છે, પરંતુ એકવાર તમે આ પેજ વાંચવાનું પૂરું કરી લો અને તેના કન્ટેન્ટ સાથે આરામદાયક અનુભવો, પછી અમે [કસ્ટમ ઇવેન્ટ્સ](/guide/components/events) પર સંપૂર્ણ માર્ગદર્શિકા વાંચવા માટે પછીથી પાછા આવવાની ભલામણ કરીએ છીએ.

## સ્લોટ્સ (Slots) સાથે કન્ટેન્ટ ડિસ્ટ્રિબ્યુશન {#content-distribution-with-slots}

બરાબર HTML એલિમેન્ટ્સની જેમ, કમ્પોનન્ટમાં કન્ટેન્ટ પાસ કરવામાં સક્ષમ હોવું ઘણીવાર ઉપયોગી છે, આ રીતે:

```vue-html
<AlertBox>
  કંઈક ખરાબ થયું.
</AlertBox>
```

જે આના જેવું કંઈક રેન્ડર કરી શકે છે:

:::danger ડેમો હેતુઓ માટે આ એક ભૂલ છે
કંઈક ખરાબ થયું.
:::

આ Vue ના કસ્ટમ `<slot>` એલિમેન્ટનો ઉપયોગ કરીને પ્રાપ્ત કરી શકાય છે:

```vue{4} [AlertBox.vue]
<template>
  <div class="alert-box">
    <strong>ડેમો હેતુઓ માટે આ એક ભૂલ છે</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

જેમ તમે ઉપર જોશો, અમે `<slot>` નો ઉપયોગ પ્લેસહોલ્ડર (placeholder) તરીકે કરીએ છીએ જ્યાં અમે કન્ટેન્ટ રાખવા માંગીએ છીએ – અને બસ. અમે કરી દીધું!

<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVUcFOwzAM/RUTDruwFhCaUCmThsQXcO0lbbKtIo0jx52Kpv07TreWouTynl+en52z2oWQnXqrClXGhtrA28q3XUBi2DlL/IED7Ak7WGX5RKQHq8oDVN4Oo9TYve4dwzmxDcp7bz3HAs5/LpfKyy3zuY0Atl1wmm1CXE5SQeLNX9hZPrb+ALU2cNQhWG9NNkrnLKIt89lGPahlyDTVogVAadoTNE7H+F4pnZTrGodKjUUpRyb0h+0nEdKdRL3CW7GmfNY5ZLiiMhfP/ynG0SL/OAuxwWCNMNncbVqSQyrgfrPZvCVcIxkrxFMYIKJrDZA1i8qatGl72ehLGEY6aGNkNwU8P96YWjffB8Lem/Xkvn9NR6qy+fRd14FSgopvmtQmzTT9Toq9VZdfIpa5jQ==)

</div>
<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVUEtOwzAQvcpgFt3QBBCqUAiRisQJ2GbjxG4a4Xis8aQKqnp37PyUyqv3mZn3fBVH55JLr0Umcl9T6xi85t4VpW07h8RwNJr4Cwc4EXawS9KFiGO70ubpNBcmAmDdOSNZR8T5Yg0IoOQf7DSfW9tAJRWcpXPaapWM1nVt8ObpukY8ie29GHNzAiBX7QVqI73/LIWMzn2FQylGMcieCW1TfBMhPYSoE5zFitLVZ5BhQnkadt6nGKt5/jMafI1Oq8Ak6zW4xrEaDVIGj4fD4SPiCknpQLy4ATyaVgFptVH2JFXb+wze3DDSTioV/iaD1+eZqWT92xD2Vu2X7af3+IJ6G7/UToVigpJnTzwTO42eWDnELsTtH/wUqH4=)

</div>

સ્લોટ્સ વિશે અત્યારે તમારે આટલું જ જાણવાની જરૂર છે, પરંતુ એકવાર તમે આ પેજ વાંચવાનું પૂરું કરી લો અને તેના કન્ટેન્ટ સાથે આરામદાયક અનુભવો, પછી અમે [સ્લોટ્સ (Slots)](/guide/components/slots) પર સંપૂર્ણ માર્ગદર્શિકા વાંચવા માટે પછીથી પાછા આવવાની ભલામણ કરીએ છીએ.

## ડાયનેમિક કમ્પોનન્ટ્સ (Dynamic Components) {#dynamic-components}

કેટલીકવાર, ઘટકો વચ્ચે ડાયનેમિકલી સ્વિચ કરવું ઉપયોગી છે, જેમ કે ટેબ્ડ ઇન્ટરફેસ (tabbed interface) માં:

<div class="options-api">

[Playground માં ઉદાહરણ ખોલો](https://play.vuejs.org/#eNqNVE2PmzAQ/Ssj9kArLSHbrXpwk1X31mMPvS17cIxJrICNbJMmivLfO/7AEG2jRiDkefP85sNmztlr3y8OA89ItjJMi96+VFJ0vdIWfqqOQ6NVB/midIYj5sn9Sxlrkt9b14RXzXbiMElEO5IAKsmPnljzhg6thbNDmcLdkktrSADAJ/IYlj5MXEc9Z1w8VFNLP30ed2luBy1HC4UHrVH2N90QyJ1kHnUALN1gtLeIQu6juEUMkb8H5sXHqiS+qzK1Cw3Lu76llqMFsKrFAVhLjVlXWc07VWUeR89msFbhhhAWDkWjNJIwPgjp06iy5CV7fgrOOTgKv+XoKIIgpnoGyiymSmZ1wnq9dqJweZ8p/GCtYHtUmBMdLXFitgDnc9ju68b0yxDO1WzRTEcFRLiUJsEqSw3wwi+rMpFDj0psEq5W5ax1aBp7at1y4foWzq5R0hYN7UR7ImCoNIXhWjTfnW+jdM01gaf+CEa1ooYHzvnMVWhaiwEP90t/9HBP61rILQJL3POMHw93VG+FLKzqUYx3c2yjsOaOwNeRO2B8zKHlzBKQWJNH1YHrplV/iiMBOliFILYNK5mOKdSTMviGCTyNojFdTKBoeWNT3s8f/Vpsd7cIV61gjHkXnotR6OqVkJbrQKdsv9VqkDWBh2bpnn8VXaDcHPexE4wFzsojO9eDUOSVPF+65wN/EW7sHRsi5XuFqaexn+EH9Xcpe8zG2eWG3O0/NVzUaeJMk+jGhUXlNPXulw5j8w7t2bi8X32cuf/Vv/wF/SL98A==)

</div>
<div class="composition-api">

[Playground માં ઉદાહરણ ખોલો](https://play.vuejs.org/#eNqNVMGOmzAQ/ZURe2BXCiHbrXpwk1X31mMPvS1V5RiTWAEb2SZNhPLvHdvggLZRE6TIM/P8/N5gpk/e2nZ57HhCkrVhWrQWDLdd+1pI0bRKW/iuGg6VVg2ky9wFDp7G8g9lrIl1H80Bb5rtxfFKMcRzUA+aV3AZQKEEhWRKGgus05pL+5NuYeNwj6mTkT4VckRYujVY63GT17twC6/Fr4YjC3kp5DoPNtEgBpY3bU0txwhgXYojsJoasymSkjeqSHweK9vOWoUbXIC/Y1YpjaDH3wt39hMI6TUUSYSQAz8jArPT5Mj+nmIhC6zpAu1TZlEhmXndbBwpXH5NGL6xWrADMsyaMj1lkAzQ92E7mvYe8nCcM24xZApbL5ECiHCSnP73KyseGnvh6V/XedwS2pVjv3C1ziddxNDYc+2WS9fC8E4qJW1W0UbUZwKGSpMZrkX11dW2SpdcE3huT2BULUp44JxPSpmmpegMgU/tyadbWpZC7jCxwj0v+OfTDdU7ITOrWiTjzTS3Vei8IfB5xHZ4PmqoObMEJHryWXXkuqrVn+xEgHZWYRKbh06uLyv4iQq+oIDnkXSQiwKymlc26n75WNdit78FmLWCMeZL+GKMwlKrhLRcBzhlh51WnSwJPFQr9/zLdIZ007w/O6bR4MQe2bseBJMzer5yzwf8MtzbOzYMkNsOY0+HfoZv1d+lZJGMg8fNqdsfbbio4b77uRVv7I0Li8xxZN1PHWbeHdyTWXc/+zgw/8t/+QsROe9h)

</div>

ઉપરોક્ત વિશેષ `is` એટ્રિબ્યુટ સાથે Vue ના `<component>` એલિમેન્ટ દ્વારા શક્ય બન્યું છે:

<div class="options-api">

```vue-html
<!-- જ્યારે currentTab બદલાય ત્યારે ઘટક બદલાય છે -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- જ્યારે currentTab બદલાય ત્યારે ઘટક બદલાય છે -->
<component :is="tabs[currentTab]"></component>
```

</div>

ઉપરના ઉદાહરણમાં, `:is` ને પાસ કરાયેલ વેલ્યુ કાં તો આ હોઈ શકે છે:

- નોંધાયેલ કમ્પોનન્ટનું નામ સ્ટ્રિંગ, અથવા
- વાસ્તવિક ઇમ્પોર્ટ કરેલ કમ્પોનન્ટ ઓબ્જેક્ટ

તમે રેગ્યુલર HTML એલિમેન્ટ્સ બનાવવા માટે `is` એટ્રિબ્યુટનો પણ ઉપયોગ કરી શકો છો.

`<component :is="...">` સાથે બહુવિધ ઘટકો વચ્ચે સ્વિચ કરતી વખતે, ઘટક જ્યારે સ્વિચ કરવામાં આવે ત્યારે તે અનમાઉન્ટ થઈ જશે. અમે બિલ્ટ-ઇન [`<KeepAlive>` કમ્પોનન્ટ](/guide/built-ins/keep-alive) વડે નિષ્ક્રિય ઘટકોને "જીવંત (alive)" રહેવા માટે દબાણ કરી શકીએ છીએ.

## in-DOM ટેમ્પલેટ પાર્સિંગ સાવચેતીઓ {#in-dom-template-parsing-caveats}

જો તમે તમારા Vue ટેમ્પલેટ સીધા DOM માં લખી રહ્યા છો, તો Vue એ DOM માંથી ટેમ્પલેટ સ્ટ્રિંગ મેળવવી પડશે. આ બ્રાઉઝર્સના નેટિવ HTML પાર્સિંગ વર્તનને કારણે કેટલીક સાવચેતીઓ દોરે છે.

:::tip
તે નોંધવું જોઈએ કે નીચે ચર્ચા કરવામાં આવેલ મર્યાદાઓ ત્યારે જ લાગુ થાય છે જો તમે તમારા ટેમ્પલેટ સીધા DOM માં લખી રહ્યા હોવ. જો તમે નીચેના સ્ત્રોતોમાંથી સ્ટ્રિંગ ટેમ્પલેટ્સનો ઉપયોગ કરી રહ્યાં હોવ તો તે લાગુ પડતી નથી:

- સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (SFC)
- ઇનલાઈન ટેમ્પલેટ સ્ટ્રિંગ્સ (દા.ત. `template: '...'`)
- `<script type="text/x-template">`
  :::

### કેસ ઇનસેન્સિટિવિટી (Case Insensitivity) {#case-insensitivity}

HTML ટેગ્સ અને એટ્રિબ્યુટ નામો કેસ-ઇનસેન્સિટિવ છે, તેથી બ્રાઉઝર્સ કોઈપણ અપરકેસ અક્ષરોને લોઅરકેસ તરીકે અર્થઘટન કરશે. તેનો અર્થ એ કે જ્યારે તમે in-DOM ટેમ્પલેટ્સનો ઉપયોગ કરી રહ્યાં હોવ, ત્યારે PascalCase કમ્પોનન્ટ નામો અને camelCased પ્રોપ નામો અથવા `v-on` ઇવેન્ટ નામો બધાએ તેમના kebab-cased (હાઇફન-સીમિત) સમકક્ષોનો ઉપયોગ કરવાની જરૂર છે:

```js
// JavaScript માં camelCase
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- HTML માં kebab-case -->
<blog-post post-title="હેલો!" @update-post="onUpdatePost"></blog-post>
```

### સ્વયં બંધ થતા ટેગ (Self Closing Tags) {#self-closing-tags}

અમે અગાઉના કોડ નમૂનાઓમાં ઘટકો માટે સ્વયં-બંધ (self-closing) ટેગનો ઉપયોગ કરી રહ્યા છીએ:

```vue-html
<MyComponent />
```

આનું કારણ એ છે કે Vue નું ટેમ્પલેટ પાર્સર તેના પ્રકારને ધ્યાનમાં લીધા વગર કોઈપણ ટેગને સમાપ્ત કરવાના સંકેત તરીકે `/>` ને માન આપે છે.

જોકે, in-DOM ટેમ્પલેટ્સમાં, આપણે હંમેશા સ્પષ્ટ સમાપ્તિ ટેગ (explicit closing tags) નો સમાવેશ કરવો જોઈએ:

```vue-html
<my-component></my-component>
```

આનું કારણ એ છે કે HTML સ્પેક ફક્ત [થોડા વિશિષ્ટ એલિમેન્ટ્સ](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) ને ક્લોઝિંગ ટેગ્સ છોડવાની મંજૂરી આપે છે, જે સૌથી સામાન્ય `<input>` અને `<img>` છે. અન્ય તમામ એલિમેન્ટ્સ માટે, જો તમે ક્લોઝિંગ ટેગ છોડી દો છો, તો નેટિવ HTML પાર્સર વિચારશે કે તમે ઓપનિંગ ટેગ ક્યારેય સમાપ્ત કર્યો નથી. ઉદાહરણ તરીકે, નીચેનું સ્નિપેટ:

```vue-html
<my-component /> <!-- અમે અહીં ટેગ બંધ કરવાનો ઈરાદો રાખીએ છીએ... -->
<span>હેલો</span>
```

આ રીતે પાર્સ કરવામાં આવશે:

```vue-html
<my-component>
  <span>હેલો</span>
</my-component> <!-- પરંતુ બ્રાઉઝર તેને અહીં બંધ કરશે. -->
```

### એલિમેન્ટ પ્લેસમેન્ટ પ્રતિબંધો (Element Placement Restrictions) {#element-placement-restrictions}

કેટલાક HTML એલિમેન્ટ્સ, જેમ કે `<ul>`, `<ol>`, `<table>` અને `<select>` ની અંદર કયા એલિમેન્ટ્સ દેખાઈ શકે છે તેના પર પ્રતિબંધો છે, અને કેટલાક એલિમેન્ટ્સ જેમ કે `<li>`, `<tr>`, અને `<option>` ફક્ત અમુક અન્ય એલિમેન્ટ્સની અંદર જ દેખાઈ શકે છે.

જ્યારે આવા પ્રતિબંધો ધરાવતા એલિમેન્ટ્સ સાથે કમ્પોનન્ટ્સનો ઉપયોગ કરવામાં આવે ત્યારે આ સમસ્યાઓ તરફ દોરી જશે. ઉદાહરણ તરીકે:

```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

કસ્ટમ કમ્પોનન્ટ `<blog-post-row>` અમાન્ય કન્ટેન્ટ તરીકે બહાર આવશે, જે અંતિમ રેન્ડર આઉટપુટમાં ભૂલો પેદા કરશે. અમે ઉકેલ તરીકે વિશેષ [`is` એટ્રિબ્યુટ](/api/built-in-special-attributes#is) નો ઉપયોગ કરી શકીએ છીએ:

```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
જ્યારે નેટિવ HTML એલિમેન્ટ્સ પર ઉપયોગ કરવામાં આવે છે, ત્યારે Vue કમ્પોનન્ટ તરીકે અર્થઘટન કરવા માટે `is` ના મૂલ્યને `vue:` સાથે પ્રીફિક્સ કરવું આવશ્યક છે. નેટિવ [કસ્ટમાઇઝ્ડ બિલ્ટ-ઇન એલિમેન્ટ્સ](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) સાથે મૂંઝવણ ટાળવા માટે આ જરૂરી છે.
:::

ઇન-DOM ટેમ્પલેટ પાર્સિંગ સાવચેતીઓ વિશે અત્યારે તમારે આટલું જ જાણવાની જરૂર છે - અને ખરેખર, Vue ના _બેઝિક્સ_ નો અંત. અભિનંદન! હજી ઘણું શીખવાનું બાકી છે, પરંતુ પ્રથમ, અમે ભલામણ કરીએ છીએ કે તમે જાતે Vue સાથે રમવા માટે વિરામ લો - કંઈક મજાનું બનાવો, અથવા જો તમે પહેલેથી જોયા નથી તો કેટલાક [ઉદાહરણો](/examples/) તપાસો.

એકવાર તમે હમણાં જ મેળવેલા જ્ઞાન સાથે આરામદાયક અનુભવો, પછી ઘટકો વિશે વધુ ઊંડાણપૂર્વક જાણવા માટે માર્ગદર્શિકા સાથે આગળ વધો.
