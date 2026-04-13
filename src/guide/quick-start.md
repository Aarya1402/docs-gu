---
footer: false
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# ઝડપી શરૂઆત {#quick-start}

## Vue ને ઓનલાઇન અજમાવો {#try-vue-online}

- Vue નો ઝડપથી અનુભવ મેળવવા માટે, તમે તેને સીધા જ અમારા [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==) માં અજમાવી શકો છો.

- જો તમે કોઈપણ બિલ્ડ સ્ટેપ્સ વિના પ્લેન HTML સેટઅપ પસંદ કરો છો, તો તમે આ [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) નો ઉપયોગ તમારા પ્રારંભિક બિંદુ તરીકે કરી શકો છો.

- જો તમે પહેલાથી જ Node.js અને બિલ્ડ ટૂલ્સના ખ્યાલથી પરિચિત છો, તો તમે [StackBlitz](https://vite.new/vue) પર તમારા બ્રાઉઝરની અંદર જ સંપૂર્ણ બિલ્ડ સેટઅપ અજમાવી શકો છો.

- ભલામણ કરેલ સેટઅપનું વોકથ્રુ મેળવવા માટે, આ ઇન્ટરેક્ટિવ [Scrimba](http://scrimba.com/links/vue-quickstart) ટ્યુટોરીયલ જુઓ જે તમને તમારી પ્રથમ Vue એપ કેવી રીતે ચલાવવી, એડિટ કરવી અને ડિપ્લોય કરવી તે બતાવે છે.

## Vue એપ્લિકેશન બનાવવી {#creating-a-vue-application}

:::tip પૂર્વજરૂરિયાતો (Prerequisites)

- કમાન્ડ લાઇન સાથે પરિચિતતા
- [Node.js](https://nodejs.org/) વર્ઝન `^20.19.0 || >=22.12.0` ઇન્સ્ટોલ કરો
:::

આ વિભાગમાં અમે તમારા લોકલ મશીન પર Vue [સિંગલ પેજ એપ્લિકેશન (SPA)](/guide/extras/ways-of-using-vue#single-page-application-spa) કેવી રીતે બનાવવી તે રજૂ કરીશું. બનાવેલ પ્રોજેક્ટ [Vite](https://vite.dev/) પર આધારિત બિલ્ડ સેટઅપનો ઉપયોગ કરશે અને અમને Vue [સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (SFCs)](/guide/scaling-up/sfc) વાપરવાની મંજૂરી આપશે.

ખાતરી કરો કે તમારી પાસે [Node.js](https://nodejs.org/) નું અદ્યતન સંસ્કરણ ઇન્સ્ટોલ કરેલું છે અને તમારી વર્તમાન વર્કિંગ ડિરેક્ટરી તે છે જ્યાં તમે પ્રોજેક્ટ બનાવવા માંગો છો. તમારી કમાન્ડ લાઇનમાં નીચેનો કમાન્ડ ચલાવો (`$` ચિહ્ન વિના):

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```

```sh [yarn]
# Yarn (v1+) માટે
$ yarn create vue

# Yarn Modern (v2+) માટે
$ yarn create vue@latest
  
# Yarn ^v4.11 માટે
$ yarn dlx create-vue@latest
```

```sh [bun]
$ bun create vue@latest
```
:::

આ કમાન્ડ Vue પ્રોજેક્ટ બનાવવાનું સત્તાવાર સાધન [create-vue](https://github.com/vuejs/create-vue) ઇન્સ્ટોલ અને એક્ઝિક્યુટ કરશે. તમને TypeScript અને ટેસ્ટિંગ સપોર્ટ જેવી ઘણી વૈકલ્પિક સુવિધાઓ માટેના પ્રોમ્પ્ટ્સ રજૂ કરવામાં આવશે:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Nightwatch / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… No / <span style="color:#89DDFF;text-decoration:underline">Yes</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue DevTools 7 extension for debugging? (experimental) <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
71: <span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

જો તમે કોઈ વિકલ્પ વિશે ચોક્કસ ન હોવ, તો અત્યારે એન્ટર દબાવીને ફક્ત `No` પસંદ કરો. એકવાર પ્રોજેક્ટ બની જાય પછી, ડિપેન્ડન્સી ઇન્સ્ટોલ કરવા અને ડેવલપર સર્વર શરૂ કરવા માટેની સૂચનાઓનું પાલન કરો:

::: code-group

```sh-vue [npm]
$ cd {{'<your-project-name>'}}
$ npm install
$ npm run dev
```

```sh-vue [pnpm]
$ cd {{'<your-project-name>'}}
$ pnpm install
$ pnpm run dev
```

```sh-vue [yarn]
$ cd {{'<your-project-name>'}}
$ yarn
$ yarn dev
```

```sh-vue [bun]
$ cd {{'<your-project-name>'}}
$ bun install
$ bun run dev
```

:::


હવે તમારી પ્રથમ Vue પ્રોજેક્ટ તૈયાર છે! નોંધ કરો કે જનરેટ કરેલ પ્રોજેક્ટમાં ઉદાહરણ ઘટકો [Options API](/guide/introduction#options-api) ને બદલે [Composition API](/guide/introduction#composition-api) અને `<script setup>` નો ઉપયોગ કરીને લખવામાં આવ્યા છે. અહીં કેટલીક વધારાની ટિપ્સ છે:

- ભલામણ કરેલ IDE સેટઅપ [Visual Studio Code](https://code.visualstudio.com/) + [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) છે. જો તમે અન્ય એડિટર્સનો ઉપયોગ કરો છો, તો [IDE સપોર્ટ વિભાગ](/guide/scaling-up/tooling#ide-support) તપાસો.
- બેકએન્ડ ફ્રેમવર્ક સાથેના એકીકરણ સહિતની વધુ ટૂલિંગ વિગતોની ચર્ચા [ટૂલિંગ માર્ગદર્શિકા](/guide/scaling-up/tooling) માં કરવામાં આવી છે.
- અંતર્ગત બિલ્ડ ટૂલ Vite વિશે વધુ જાણવા માટે, [Vite docs](https://vite.dev/) તપાસો.
- જો તમે TypeScript નો ઉપયોગ કરવાનું પસંદ કરો છો, તો [TypeScript વપરાશ માર્ગદર્શિકા](typescript/overview) તપાસો.

જ્યારે તમે તમારી એપ્લિકેશનને પ્રોડક્શન (production) માટે તૈયાર હોવ, ત્યારે નીચે મુજબ કરો:

::: code-group

```sh [npm]
$ npm run build
```

```sh [pnpm]
$ pnpm run build
```

```sh [yarn]
$ yarn build
```

```sh [bun]
$ bun run build
```

:::


આ તમારા પ્રોજેક્ટની `./dist` ડિરેક્ટરીમાં તમારી એપ્લિકેશનનું પ્રોડક્શન-રેડી બિલ્ડ બનાવશે. તમારી એપને પ્રોડક્શન પર મોકલવા વિશે વધુ જાણવા માટે [પ્રોડક્શન ડિપ્લોયમેન્ટ માર્ગદર્શિકા](/guide/best-practices/production-deployment) તપાસો.

[આગળના પગલાં >](#next-steps)

## CDN દ્વારા Vue નો ઉપયોગ કરવો {#using-vue-from-cdn}

તમે સ્ક્રિપ્ટ ટેગ દ્વારા સીધા જ CDN થી Vue નો ઉપયોગ કરી શકો છો:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

અહીં આપણે [unpkg](https://unpkg.com/) નો ઉપયોગ કરી રહ્યા છીએ, પરંતુ તમે npm પેકેજો પ્રદાન કરતી કોઈપણ CDN નો ઉપયોગ કરી શકો છો, ઉદાહરણ તરીકે [jsdelivr](https://www.jsdelivr.com/package/npm/vue) અથવા [cdnjs](https://cdnjs.com/libraries/vue). અલબત્્ય, તમે આ ફાઇલને ડાઉનલોડ પણ કરી શકો છો અને તેને જાતે સર્વ કરી શકો છો.

જ્યારે CDN થી Vue નો ઉપયોગ કરવામાં આવે છે, ત્યારે તેમાં કોઈ "બિલ્ડ સ્ટેપ" સામેલ હોતું નથી. આ સેટઅપને ઘણું સરળ બનાવે છે, અને સ્ટેટિક HTML ને બહેતર બનાવવા અથવા બેકએન્ડ ફ્રેમવર્ક સાથે એકીકૃત કરવા માટે યોગ્ય છે. જો કે, તમે સિંગલ-ફાઇલ કમ્પોનન્ટ (SFC) સિન્ટેક્સનો ઉપયોગ કરી શકશો નહીં.

### ગ્લોબલ બિલ્ડનો ઉપયોગ કરવો {#using-the-global-build}

ઉપરની લિંક Vue નું _ગ્લોબલ બિલ્ડ_ લોડ કરે છે, જ્યાં તમામ ટોપ-લેવલ APIs ગ્લોબલ `Vue` ઓબ્જેક્ટ પર પ્રોપર્ટીઝ તરીકે એક્સપોઝ થાય છે. ગ્લોબલ બિલ્ડનો ઉપયોગ કરીને અહીં એક સંપૂર્ણ ઉદાહરણ છે:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'હેલો Vue!'
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('હેલો vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip
સમગ્ર માર્ગદર્શિકામાં Composition API માટેના ઘણા ઉદાહરણો `<script setup>` સિન્ટેક્સનો ઉપયોગ કરશે, જેમાં બિલ્ડ ટૂલ્સની જરૂર હોય છે. જો તમે બિલ્ડ સ્ટેપ વિના Composition API નો ઉપયોગ કરવા માંગતા હોવ, તો [`setup()` ઓપ્શન](/api/composition-api-setup) ના વપરાશનો સંપર્ક કરો.
:::

</div>

### ES મોડ્યુલ બિલ્ડનો ઉપયોગ કરવો {#using-the-es-module-build}

બાકીના દસ્તાવેજોમાં, અમે મુખ્યત્વે [ES મોડ્યુલ્સ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) સિન્ટેક્સનો ઉપયોગ કરીશું. મોટાભાગના આધુનિક બ્રાઉઝર્સ હવે મૂળ રીતે ES મોડ્યુલ્સને સપોર્ટ કરે છે, તેથી આપણે આની જેમ નેટિવ ES મોડ્યુલ્સ દ્વારા CDN થી Vue નો ઉપયોગ કરી શકીએ છીએ:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'હેલો Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('હેલો Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

નોંધ લો કે આપણે `<script type="module">` નો ઉપયોગ કરી રહ્યા છીએ, અને ઇમ્પોર્ટ કરેલ CDN URL તેના બદલે Vue ના **ES મોડ્યુલ્સ બિલ્ડ** તરફ નિર્દેશ કરી રહ્યું છે.

<div class="options-api">

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### Import maps સક્ષમ કરવું {#enabling-import-maps}

ઉપરના ઉદાહરણમાં, અમે સંપૂર્ણ CDN URL પરથી ઇમ્પોર્ટ કરી રહ્યા છીએ, પરંતુ બાકીના દસ્તાવેજોમાં તમે આના જેવો કોડ જોશો:

```js
import { createApp } from 'vue'
```

અમે બ્રાઉઝરને [Import Maps](https://caniuse.com/import-maps) નો ઉપયોગ કરીને `vue` ઇમ્પોર્ટ ક્યાં સ્થિત છે તે શીખવી શકીએ છીએ:

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'હેલો Vue!'
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('હેલો Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

તમે ઇમ્પોર્ટ મેપમાં અન્ય ડિપેન્ડન્સી માટે એન્ટ્રીઓ પણ ઉમેરી શકો છો - પરંતુ ખાતરી કરો કે તેઓ તમે ઉપયોગ કરવા માંગતા હો તે લાઇબ્રેરીના ES મોડ્યુલ્સ વર્ઝન તરફ નિર્દેશ કરે છે.

:::tip Import Maps બ્રાઉઝર સપોર્ટ
Import Maps એ પ્રમાણમાં નવી બ્રાઉઝર સુવિધા છે. તેની [સપોર્ટ રેન્જ](https://caniuse.com/import-maps) ની અંદર બ્રાઉઝરનો ઉપયોગ કરવાની ખાતરી કરો. ખાસ કરીને, તે ફક્ત Safari 16.4+ માં સપોર્ટેડ છે.
:::

:::warning પ્રોડક્શન ઉપયોગ પર નોંધો
અત્યાર સુધીના ઉદાહરણો Vue ના ડેવલપમેન્ટ બિલ્ડનો ઉપયોગ કરી રહ્યા છે - જો તમે પ્રોડક્શનમાં CDN થી Vue નો ઉપયોગ કરવા માંગતા હોવ, તો [પ્રોડક્શન ડિપ્લોયમેન્ટ માર્ગદર્શિકા](/guide/best-practices/production-deployment#without-build-tools) તપાસવાનું ભૂલશો નહીં.

જ્યારે બિલ્ડ સિસ્ટમ વિના Vue નો ઉપયોગ કરવો શક્ય છે, ત્યારે ધ્યાનમાં લેવા જેવો વૈકલ્પિક અભિગમ [`vuejs/petite-vue`](https://github.com/vuejs/petite-vue) નો ઉપયોગ કરવાનો છે જે સંદર્ભમાં વધુ સારી રીતે અનુકૂળ થઈ શકે છે જ્યાં [`jquery/jquery`](https://github.com/jquery/jquery) (ભૂતકાળમાં) અથવા [`alpinejs/alpine`](https://github.com/alpinejs/alpine) (વર્તમાનમાં) ને બદલે વાપરી શકાય છે.
:::

### મોડ્યુલોનું વિભાજન {#splitting-up-the-modules}

જેમ જેમ આપણે માર્ગદર્શિકામાં ઊંડા ઉતરીએ છીએ તેમ, અમારે અમારા કોડને અલગ-અલગ જાવાસ્ક્રિપ્ટ ફાઇલોમાં વિભાજિત કરવાની જરૂર પડી શકે છે જેથી કરીને તેને મેનેજ કરવામાં સરળતા રહે. દાખલા તરીકે:

```html [index.html]
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js [my-component.js]
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>ગણતરી છે: {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js [my-component.js]
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>ગણતરી છે: {{ count }}</div>`
}
```

</div>

જો તમે તમારા બ્રાઉઝરમાં ઉપરની `index.html` સીધી ખોલશો, તો તમને જણાશે કે તે એક ભૂલ (error) ફેંકે છે કારણ કે ES મોડ્યુલ્સ `file://` પ્રોટોકોલ પર કામ કરી શકતા નથી, જે બ્રાઉઝર જ્યારે તમે સ્થાનિક ફાઇલ ખોલો છો ત્યારે ઉપયોગ કરે છે.

સુરક્ષા કારણોસર, ES મોડ્યુલો ફક્ત `http://` પ્રોટોકોલ પર જ કામ કરી શકે છે. અમારા લોકલ મશીન પર ES મોડ્યુલ્સ કામ કરવા માટે, આપણે લોકલ HTTP સર્વર સાથે `http://` પ્રોટોકોલ પર `index.html` સર્વ કરવાની જરૂર છે.

લોકલ HTTP સર્વર શરૂ કરવા માટે, પહેલા ખાતરી કરો કે તમારી પાસે [Node.js](https://nodejs.org/en/) ઇન્સ્ટોલ કરેલ છે, પછી જ્યાં તમારી HTML ફાઇલ છે તે જ ડિરેક્ટરીમાં કમાન્ડ લાઇનથી `npx serve` ચલાવો. તમે અન્ય કોઈપણ HTTP સર્વરનો પણ ઉપયોગ કરી શકો છો જે યોગ્ય MIME પ્રકારો સાથે સ્ટેટિક ફાઇલો પ્રદાન કરી શકે છે.

તમે કદાચ નોંધ્યું હશે કે ઇમ્પોર્ટ કરેલ ઘટકનું ટેમ્પલેટ જાવાસ્ક્રિપ્ટ સ્ટ્રિંગ તરીકે ઇનલાઇન (inlined) છે. જો તમે VS Code નો ઉપયોગ કરી રહ્યાં છો, તો તમે [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) એક્સ્ટેંશન ઇન્સ્ટોલ કરી શકો છો અને તેમના માટે સિન્ટેક્સ હાઇલાઇટિંગ મેળવવા માટે સ્ટ્રિંગ્સની આગળ `/*html*/` કમેન્ટ લગાવી શકો છો.

## આગળના પગલાં {#next-steps}

જો તમે [પરિચય](/guide/introduction) છોડી દીધો હોય, તો અમે બાકીના દસ્તાવેજો પર આગળ વધતા પહેલા તેને વાંચવાની ભારપૂર્વક ભલામણ કરીએ છીએ.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">માર્ગદર્શિકા સાથે ચાલુ રાખો</p>
    <p class="next-steps-caption">માર્ગદર્શિકા તમને ફ્રેમવર્કના દરેક પાસાઓને સંપૂર્ણ વિગતવાર સમજાવે છે.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">ટ્યુટોરીયલ અજમાવી જુઓ</p>
    <p class="next-steps-caption">જેઓ વસ્તુઓ પ્રેક્ટિકલી શીખવાનું પસંદ કરે છે તેમના માટે.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">ઉદાહરણો તપાસો</p>
    <p class="next-steps-caption">મુખ્ય લાક્ષણિકતાઓ અને સામાન્ય UI કાર્યોના ઉદાહરણો એક્સપ્લોર કરો.</p>
  </a>
</div>
