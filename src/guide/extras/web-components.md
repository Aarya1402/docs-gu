# Vue અને વેબ ઘટકો (Web Components) {#vue-and-web-components}

[વેબ ઘટકો (Web Components)](https://developer.mozilla.org/en-US/docs/Web/Web_Components) એ વેબ નેટિવ APIs ના સમૂહ માટે વપરાતો શબ્દ છે જે ડેવલપર્સને રીયુઝેબલ કસ્ટમ એલિમેન્ટ્સ (custom elements) બનાવવાની મંજૂરી આપે છે.

અમે Vue અને વેબ ઘટકોને પ્રાથમિક રીતે પૂરક ટેકનોલોજી માનીએ છીએ. Vue પાસે કસ્ટમ એલિમેન્ટ્સના વપરાશ અને નિર્માણ બંને માટે ઉત્તમ સપોર્ટ છે. તમે તમારી હયાત Vue એપ્લિકેશનમાં કસ્ટમ એલિમેન્ટ્સને એકીકૃત કરી રહ્યા હોવ અથવા કસ્ટમ એલિમેન્ટ્સ બનાવવા અને વિતરિત (distribute) કરવા માટે Vue નો ઉપયોગ કરી રહ્યા હોવ, તમે યોગ્ય સ્થાને છો.

## Vue માં કસ્ટમ એલિમેન્ટ્સનો ઉપયોગ કરવો (Using Custom Elements in Vue) {#using-custom-elements-in-vue}

Vue [Custom Elements Everywhere ટેસ્ટમાં પૂરા ૧૦૦% સ્કોર ધરાવે છે](https://custom-elements-everywhere.com/libraries/vue/results/results.html). Vue એપ્લિકેશનની અંદર કસ્ટમ એલિમેન્ટ્સનો વપરાશ મોટે ભાગે નેટિવ HTML એલિમેન્ટ્સના ઉપયોગ જેવો જ હોય છે, જેમાં કેટલીક બાબતો ધ્યાનમાં રાખવાની હોય છે:

### ઘટક રિઝોલ્યુશન (Component Resolution) છોડી દેવું {#skipping-component-resolution}

ડિફોલ્ટ રૂપે, Vue નોન-નેટિવ HTML ટેગને કસ્ટમ એલિમેન્ટ તરીકે રેન્ડર કરતા પહેલા તેને રજીસ્ટર્ડ Vue ઘટક તરીકે ઉકેલવાનો (resolve) પ્રયાસ કરશે. આના કારણે ડેવલપમેન્ટ દરમિયાન Vue "failed to resolve component" ની ચેતવણી આપશે. Vue ને જણાવવા માટે કે અમુક એલિમેન્ટ્સને કસ્ટમ એલિમેન્ટ્સ તરીકે ગણવા જોઈએ અને ઘટક રિઝોલ્યુશન છોડી દેવું જોઈએ, આપણે [`compilerOptions.isCustomElement` ઓપ્શન](/api/application#app-config-compileroptions) સ્પષ્ટ કરી શકીએ છીએ.

જો તમે બિલ્ડ સેટઅપ સાથે Vue નો ઉપયોગ કરી રહ્યાં છો, તો ઓપ્શન બિલ્ડ કોન્ફિગરેશન દ્વારા પાસ કરવો જોઈએ કારણ કે તે કમ્પાઇલ-ટાઇમ ઓપ્શન છે.

#### બ્રાઉઝરની અંદરના કોન્ફિગરેશનનું ઉદાહરણ (Example In-Browser Config) {#example-in-browser-config}

```js
// જો બ્રાઉઝરની અંદર કમ્પાઈલેશનનો ઉપયોગ કરી રહ્યા હોવ તો જ કામ કરે છે.
// જો બિલ્ડ ટૂલ્સનો ઉપયોગ કરી રહ્યા હોવ, તો નીચેના કોન્ફિગ ઉદાહરણો જુઓ.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### Vite કોન્ફિગરેશનનું ઉદાહરણ (Example Vite Config) {#example-vite-config}

```js [vite.config.js]
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // ડેશ (dash) ધરાવતા તમામ ટેગ્સને કસ્ટમ એલિમેન્ટ્સ તરીકે ગણો
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### Vue CLI કોન્ફિગરેશનનું ઉદાહરણ (Example Vue CLI Config) {#example-vue-cli-config}

```js [vue.config.js]
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // ion- થી શરૂ થતા કોઈપણ ટેગને કસ્ટમ એલિમેન્ટ તરીકે ગણો
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }))
  }
}
```

### DOM પ્રોપર્ટીઝ પસાર કરવી (Passing DOM Properties) {#passing-dom-properties}

DOM એટ્રિબ્યુટ્સ માત્ર સ્ટ્રિંગ હોઈ શકે છે, તેથી આપણે કસ્ટમ એલિમેન્ટ્સને DOM પ્રોપર્ટીઝ તરીકે જટિલ ડેટા પાસ કરવાની જરૂર છે. જ્યારે કસ્ટમ એલિમેન્ટ પર પ્રોપ્સ સેટ કરીએ છીએ, ત્યારે Vue 3 સોય `in` ઓપરેટરનો ઉપયોગ કરીને DOM-પ્રોપર્ટીની હાજરી આપમેળે તપાસે છે અને જો કી (key) હાજર હોય તો વેલ્યુને DOM પ્રોપર્ટી તરીકે સેટ કરવાનું પસંદ કરશે. આનો અર્થ એ છે કે, મોટા ભાગના કિસ્સાઓમાં, જો કસ્ટમ એલિમેન્ટ [ભલામણ કરેલ શ્રેષ્ઠ પ્રેક્ટિસિસ](https://web.dev/custom-elements-best-practices/) ને અનુસરે છે, તો તમારે આ વિશે વિચારવાની જરૂર રહેશે નહીં.

જો કે, એવા દુર્લભ કિસ્સાઓ હોઈ શકે છે કે જ્યાં ડેટાને DOM પ્રોપર્ટી તરીકે પસાર કરવો આવશ્યક છે, પરંતુ કસ્ટમ એલિમેન્ટ પ્રોપર્ટીને યોગ્ય રીતે વ્યાખ્યાયિત/દર્શાવતું (reflect) નથી (જેના કારણે `in` ચેક નિષ્ફળ જાય છે). આ કિસ્સામાં, તમે `.prop` મોડિફાયરનો ઉપયોગ કરીને `v-bind` બાઇન્ડિંગને DOM પ્રોપર્ટી તરીકે સેટ કરવા માટે દબાણ (force) કરી શકો છો:

```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- ટૂંકું નામ (shorthand equivalent) -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## Vue સાથે કસ્ટમ એલિમેન્ટ્સ બનાવવા (Building Custom Elements with Vue) {#building-custom-elements-with-vue}

કસ્ટમ એલિમેન્ટ્સનો પ્રાથમિક ફાયદો એ છે કે તેનો ઉપયોગ કોઈપણ ફ્રેમવર્ક સાથે અથવા ફ્રેમવર્ક વિના પણ કરી શકાય છે. આ તેમને ઘટકોના વિતરણ માટે આદર્શ બનાવે છે જ્યાં અંતિમ ગ્રાહક સમાન ફ્રન્ટએન્ડ ટેકનોલોજીનો ઉપયોગ કરી રહ્યો ન હોય, અથવા જ્યારે તમે તેનો ઉપયોગ કરતા ઘટકોની આંતરિક વિગતોથી અંતિમ એપ્લિકેશનને અલગ રાખવા માંગતા હોવ.

### defineCustomElement {#definecustomelement}

Vue [`defineCustomElement`](/api/custom-elements#definecustomelement) પદ્ધતિ દ્વારા બરાબર એ જ Vue ઘટક APIs નો ઉપયોગ કરીને કસ્ટમ એલિમેન્ટ્સ બનાવવાનું સમર્થન આપે છે. આ પદ્ધતિ [`defineComponent`](/api/general#definecomponent) જેવા જ આર્ગ્યુમેન્ટ્સ સ્વીકારે છે, પરંતુ તેના બદલે એક કસ્ટમ એલિમેન્ટ કન્સ્ટ્રક્ટર (constructor) પરત કરે છે જે `HTMLElement` ને એક્સટેન્ડ કરે છે:

```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // અહીં સામાન્ય Vue ઘટક વિકલ્પો (options)
  props: {},
  emits: {},
  template: `...`,

  // માત્ર defineCustomElement માટે: શેડો રૂટ (shadow root) માં ઇન્જેક્ટ કરવા માટે CSS
  styles: [`/* ઇનલાઇન સીએસએસ */`]
})

// કસ્ટમ એલિમેન્ટ રજીસ્ટર કરો.
// રજીસ્ટ્રેશન પછી, પેજ પરના તમામ `<my-vue-element>` ટેગ્સ
// અપગ્રેડ કરવામાં આવશે.
customElements.define('my-vue-element', MyVueElement)

// તમે પ્રોગ્રામેટિકલી એલિમેન્ટને ઇન્સ્ટન્શિએટ (instantiate) પણ કરી શકો છો:
// (રજીસ્ટ્રેશન પછી જ કરી શકાય છે)
document.body.appendChild(
  new MyVueElement({
    // પ્રારંભિક પ્રોપ્સ (વૈકલ્પિક)
  })
)
```

#### લાઇફસાયકલ (Lifecycle) {#lifecycle}

- જ્યારે એલિમેન્ટનું [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) પહેલીવાર કોલ કરવામાં આવે ત્યારે Vue કસ્ટમ એલિમેન્ટ તેના શેડો રૂટ (shadow root) ની અંદર આંતરિક Vue ઘટક ઇન્સ્ટન્સ માઉન્ટ કરશે.

- જ્યારે એલિમેન્ટનું `disconnectedCallback` બોલાવવામાં આવે છે, ત્યારે Vue એક માઇક્રોટાસ્ક (microtask) ટિક પછી તપાસ કરશે કે એલિમેન્ટ ડોક્યુમેન્ટમાંથી અલગ (detached) છે કે કેમ.

  - જો એલિમેન્ટ હજુ પણ ડોક્યુમેન્ટમાં છે, તો તે એક મૂવ (move) છે અને ઘટક ઇન્સ્ટન્સ સાચવી રાખવામાં આવશે;

  - જો એલિમેન્ટ ડોક્યુમેન્ટથી અલગ થઈ ગયું હોય, તો તે રિમૂવલ (removal) છે અને ઘટક ઇન્સ્ટન્સ અનમાઉન્ટ થશે.

#### પ્રોપ્સ (Props) {#props}

- `props` ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવામાં આવેલી તમામ પ્રોપ્સ કસ્ટમ એલિમેન્ટ પર પ્રોપર્ટીઝ તરીકે વ્યાખ્યાયિત કરવામાં આવશે. Vue આપમેળે એટ્રિબ્યુટ્સ / પ્રોપર્ટીઝ વચ્ચે રિફ્લેક્શન (reflection) હેન્ડલ કરશે જ્યાં તે યોગ્ય હશે.

  - એટ્રિબ્યુટ્સ હંમેશા સંબંધિત પ્રોપર્ટીઝમાં પ્રતિબિંબિત (reflect) થાય છે.

  - પ્રિમિટિવ વેલ્યુઝ (`string`, `boolean` અથવા `number`) સાથેની પ્રોપર્ટીઝ એટ્રિબ્યુટ્સ તરીકે પ્રતિબિંબિત થાય છે.

- Vue આપમેળે `Boolean` અથવા `Number` ટાઇપ્સ સાથે જાહેર કરેલ પ્રોપ્સને ઇચ્છિત ટાઇપમાં કાસ્ટ (cast) કરે છે જ્યારે તેઓ એટ્રિબ્યુટ્સ (જે હંમેશા સ્ટ્રિંગ હોય છે) તરીકે સેટ કરવામાં આવે છે. ઉદાહરણ તરીકે, નીચેની પ્રોપ્સ જાહેરાત આપેલ છે:

  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  અને કસ્ટમ એલિમેન્ટનો વપરાશ:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  ઘટકમાં, `selected` ને `true` (boolean) માં અને `index` ને `1` (number) માં કાસ્ટ કરવામાં આવશે.

#### ઇવેન્ટ્સ (Events) {#events}

`this.$emit` અથવા સેટઅપ `emit` દ્વારા બહાર ફેંકાયેલી (emitted) ઇવેન્ટ્સ કસ્ટમ એલિમેન્ટ પર નેટિવ [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) તરીકે મોકલવામાં આવે છે. વધારાના ઇવેન્ટ આર્ગ્યુમેન્ટ્સ (payload) CustomEvent ઓબ્જેક્ટ પર તેની `detail` પ્રોપર્ટી તરીકે એરે તરીકે એક્સપોઝ થશે.

#### સ્લોટ્સ (Slots) {#slots}

ઘટકની અંદર, સ્લોટ્સને હંમેશની જેમ `<slot/>` એલિમેન્ટનો ઉપયોગ કરીને રેન્ડર કરી શકાય છે. જો કે, પરિણામી એલિમેન્ટનો વપરાશ કરતી વખતે, તે માત્ર [નેટિવ સ્લોટ્સ સિન્ટેક્સ (native slots syntax)](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) જ સ્વીકારે છે:

- [સ્કોપ્ડ સ્લોટ્સ (Scoped slots)](/guide/components/slots#scoped-slots) સમર્થિત નથી.

- જ્યારે નેમ્ડ (named) સ્લોટ્સ પાસ કરો ત્યારે `v-slot` ડાયરેક્ટિવને બદલે `slot` એટ્રિબ્યુટનો ઉપયોગ કરો:

  ```vue-html
  <my-element>
    <div slot="named">નમસ્તે</div>
  </my-element>
  ```

#### પ્રોવાઇડ / ઇન્જેક્ટ (Provide / Inject) {#provide-inject}

[Provide / Inject API](/guide/components/provide-inject#provide-inject) અને તેના [કોમ્પોઝિશન API સમકક્ષ](/api/composition-api-dependency-injection#provide) પણ Vue-વ્યાખ્યાયિત કસ્ટમ એલિમેન્ટ્સ વચ્ચે કામ કરે છે. જો કે, નોંધ કરો કે આ **માત્ર કસ્ટમ એલિમેન્ટ્સ વચ્ચે જ** કામ કરે છે. એટલે કે Vue-વ્યાખ્યાયિત કસ્ટમ એલિમેન્ટ એ નોન-કસ્ટમ-એલિમેન્ટ Vue ઘટક દ્વારા પૂરી પાડવામાં આવેલ પ્રોપર્ટીઝને ઇન્જેક્ટ કરી શકશે નહીં.

#### એપ લેવલ કોન્ફિગ (App Level Config) <sup class="vt-badge" data-text="3.5+" /> {#app-level-config}

તમે `configureApp` ઓપ્શનનો ઉપયોગ કરીને Vue કસ્ટમ એલિમેન્ટના એપ ઇન્સ્ટન્સને કોન્ફિગર કરી શકો છો:

```js
defineCustomElement(MyComponent, {
  configureApp(app) {
    app.config.errorHandler = (err) => {
      /* ... */
    }
  }
})
```

### SFC કસ્ટમ એલિમેન્ટ તરીકે (SFC as Custom Element) {#sfc-as-custom-element}

`defineCustomElement` Vue સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (SFCs) સાથે પણ કામ કરે છે. જો કે, ડિફોલ્ટ ટૂલિંગ સેટઅપ સાથે, SFCs ની અંદરનું `<style>` હજુ પણ પ્રોડક્શન બિલ્ડ દરમિયાન એક્સટ્રેક્ટ કરવામાં આવશે અને સિંગલ CSS ફાઇલમાં મર્જ કરવામાં આવશે. જ્યારે SFC નો કસ્ટમ એલિમેન્ટ તરીકે ઉપયોગ કરવામાં આવે છે, ત્યારે ઘણીવાર કસ્ટમ એલિમેન્ટના શેડો રૂટ (shadow root) માં `<style>` ટેગ્સને ઇન્જેક્ટ કરવા ઇચ્છનીય હોય છે.

ઓફિશિયલ SFC ટૂલિંગ્સ "કસ્ટમ એલિમેન્ટ મોડ" માં SFCs ને ઇમ્પોર્ટ કરવાનું સમર્થન આપે છે (`@vitejs/plugin-vue@^1.4.0` અથવા `vue-loader@^16.5.0` જરૂરી છે). કસ્ટમ એલિમેન્ટ મોડમાં લોડ થયેલ SFC તેના `<style>` ટેગ્સને CSS ની સ્ટ્રિંગ તરીકે ઇનલાઇન કરે છે અને તેમને ઘટકના `styles` ઓપ્શન હેઠળ એક્સપોઝ કરે છે. આ `defineCustomElement` દ્વારા ઉપાડવામાં આવશે અને જ્યારે ઇન્સ્ટન્શિએટ કરવામાં આવશે ત્યારે એલિમેન્ટના શેડો રૂટમાં ઇન્જેક્ટ કરવામાં આવશે.

આ મોડમાં ઓપ્ટ-ઇન કરવા માટે, તમારી કમ્પોનન્ટ ફાઇલના નામનો અંત `.ce.vue` સાથે કરો:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* ઇનલાઇન સીએસએસ */"]

// કસ્ટમ એલિમેન્ટ કન્સ્ટ્રક્ટરમાં રૂપાંતરિત કરો
const ExampleElement = defineCustomElement(Example)

// રજીસ્ટર કરો
customElements.define('my-example', ExampleElement)
```

જો તમે કસ્ટમ એલિમેન્ટ મોડમાં કઈ ફાઇલો ઇમ્પોર્ટ કરવી જોઈએ તે કસ્ટમાઇઝ કરવા માંગતા હોવ (ઉદાહરણ તરીકે, _તમામ_ SFCs ને કસ્ટમ એલિમેન્ટ્સ તરીકે ગણવા), તો તમે સંબંધિત બિલ્ડ પ્લગિન્સમાં `customElement` વિકલ્પ પાસ કરી શકો છો:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### Vue કસ્ટમ એલિમેન્ટ્સ લાઇબ્રેરી માટે ટિપ્સ {#tips-for-a-vue-custom-elements-library}

જ્યારે Vue સાથે કસ્ટમ એલિમેન્ટ્સ બનાવવામાં આવે છે, ત્યારે એલિમેન્ટ્સ Vue ના રનટાઇમ પર આધાર રાખશે. કેટલી સુવિધાઓનો ઉપયોગ કરવામાં આવી રહ્યો છે તેના આધારે ~૧૬kb બેઝલાઇન સાઈઝ કિંમત છે. આનો અર્થ એ છે કે જો તમે એક જ કસ્ટમ એલિમેન્ટ મોકલી રહ્યા હોવ તો Vue નો ઉપયોગ કરવો આદર્શ નથી - તમે વેનીલા JavaScript, [petite-vue](https://github.com/vuejs/petite-vue), અથવા નાના રનટાઇમ કદમાં વિશેષતા ધરાવતા ફ્રેમવર્કનો ઉપયોગ કરી શકો છો. જો કે, જો તમે જટિલ લોજિક સાથે કસ્ટમ એલિમેન્ટ્સનો સંગ્રહ મોકલી રહ્યાં હોવ તો બેઝ સાઈઝ ન્યાયી છે, કારણ કે Vue દરેક ઘટકને ઘણા ઓછા કોડ સાથે લખવાની મંજૂરી આપશે. તમે જેટલા વધુ એલિમેન્ટ્સ એકસાથે મોકલો છો, તેટલો વધુ ફાયદો થશે.

જો કસ્ટમ એલિમેન્ટ્સનો ઉપયોગ એવી એપ્લિકેશનમાં કરવામાં આવશે જે Vue નો ઉપયોગ પણ કરી રહી છે, તો તમે બિલ્ટ બંડલમાંથી Vue ને એક્સટર્નલાઇઝ કરવાનું પસંદ કરી શકો છો જેથી એલિમેન્ટ્સ હોસ્ટ એપ્લિકેશનમાંથી Vue ની સમાન કોપીનો ઉપયોગ કરતા હશે.

વ્યક્તિગત એલિમેન્ટ કન્સ્ટ્રક્ટર્સને એક્સપોર્ટ કરવાની ભલામણ કરવામાં આવે છે જેથી તમારા વપરાશકર્તાઓને તેમની જરૂરિયાત મુજબ ઇમ્પોર્ટ કરવાની અને ઇચ્છિત ટેગ નામો સાથે રજીસ્ટર કરવાની સુગમતા મળે. તમે તમામ ઘટકોને આપમેળે રજીસ્ટર કરવા માટે એક સુવિધાજનક ફંક્શન પણ એક્સપોર્ટ કરી શકો છો. અહીં Vue કસ્ટમ એલિમેન્ટ લાઇબ્રેરીનું ઉદાહરણ એન્ટ્રી પોઇન્ટ છે:

```js [elements.js]

import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// વ્યક્તિગત ઘટકો એક્સપોર્ટ કરો
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

ગ્રાહક Vue ફાઇલમાં એલિમેન્ટ્સનો ઉપયોગ કરી શકે છે:

```vue
<script setup>
import { register } from 'path/to/elements.js'
register()
</script>

<template>
  <my-foo ...>
    <my-bar ...></my-bar>
  </my-foo>
</template>
```

અથવા અન્ય કોઈપણ ફ્રેમવર્ક જેમ કે JSX વાળામાં, અને કસ્ટમ નામો સાથે:

```jsx
import { MyFoo, MyBar } from 'path/to/elements.js'

customElements.define('some-foo', MyFoo)
customElements.define('some-bar', MyBar)

export function MyComponent() {
  return <>
    <some-foo ... >
      <some-bar ... ></some-bar>
    </some-foo>
  </>
}
```

### Vue-આધારિત વેબ ઘટકો અને TypeScript {#web-components-and-typescript}

જ્યારે Vue SFC ટેમ્પલેટ્સ લખો છો, ત્યારે તમે તમારા Vue ઘટકોને [ટાઇપ ચેક (type check)](/guide/scaling-up/tooling.html#typescript) કરવા માંગી શકો છો, જેમાં કસ્ટમ એલિમેન્ટ્સ તરીકે વ્યાખ્યાયિત ઘટકોનો પણ સમાવેશ થાય છે.

બ્રાઉઝર્સમાં તેમના બિલ્ટ-ઇન APIs નો ઉપયોગ કરીને કસ્ટમ એલિમેન્ટ પ્રાદેશિક રીતે રજીસ્ટર કરવામાં આવે છે, અને ડિફોલ્ટ રૂપે જ્યારે Vue ટેમ્પલેટ્સમાં ઉપયોગમાં લેવાય છે ત્યારે તેમની પાસે ટાઇપ ઇન્ફરન્સ હોતી નથી. કસ્ટમ એલિમેન્ટ તરીકે રજીસ્ટર થયેલ Vue ઘટકો માટે ટાઇપ સપોર્ટ પૂરો પાડવા માટે, અમે Vue ટેમ્પલેટ્સમાં ટાઇપ ચેકિંગ માટે [`GlobalComponents` ઇન્ટરફેસ](https://github.com/vuejs/language-tools/wiki/Global-Component-Types) ને વધારીને (augmenting) ગ્લોબલ કમ્પોનન્ટ ટાઇપિંગ રજીસ્ટર કરી શકીએ છીએ (JSX વપરાશકર્તાઓ તેના બદલે [JSX.IntrinsicElements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) ટાઇપ ને વધારી શકે છે, જે અહીં બતાવવામાં આવ્યું નથી).

Vue સાથે બનાવેલા કસ્ટમ એલિમેન્ટ માટે ટાઇપ કેવી રીતે વ્યાખ્યાયિત કરવી તે અહીં છે:

```typescript
import { defineCustomElement } from 'vue'

// Vue ઘટક ઇમ્પોર્ટ કરો.
import SomeComponent from './src/components/SomeComponent.ce.vue'

// Vue ઘટકને કસ્ટમ એલિમેન્ટ ક્લાસમાં ફેરવો.
export const SomeElement = defineCustomElement(SomeComponent)

// બ્રાઉઝર સાથે એલિમેન્ટ ક્લાસ રજીસ્ટર કરવાનું યાદ રાખો.
customElements.define('some-element', SomeElement)

// Vue ના GlobalComponents ટાઇપમાં નવો એલિમેન્ટ ટાઇપ ઉમેરો.
declare module 'vue' {
  interface GlobalComponents {
    // અહીં Vue ઘટક ટાઇપ પાસ કરવાની ખાતરી કરો
    // (SomeComponent, *નહીં* કે SomeElement).
    // કસ્ટમ એલિમેન્ટ્સના નામમાં હાઇફન (hyphen) જરૂરી છે,
    // તેથી અહીં હાઇફનવાળા એલિમેન્ટ નામનો ઉપયોગ કરો.
    'some-element': typeof SomeComponent
  }
}
```

## નોન-Vue વેબ ઘટકો અને TypeScript {#non-vue-web-components-and-typescript}

કસ્ટમ એલિમેન્ટ્સ કે જે Vue દ્વારા બનાવવામાં આવ્યા નથી તેના SFC ટેમ્પલેટ્સમાં ટાઇપ ચેકિંગ સક્ષમ કરવાની ભલામણ કરેલ રીત અહીં છે.

:::tip નોંધ
આ અભિગમ તેને કરવાની એક સંભવિત રીત છે, પરંતુ કસ્ટમ એલિમેન્ટ્સ બનાવવા માટે ઉપયોગમાં લેવાતા ફ્રેમવર્કના આધારે તે બદલાઈ શકે છે.
:::

ધારો કે આપણી પાસે વ્યાખ્યાયિત કેટલીક JS પ્રોપર્ટીઝ અને ઇવેન્ટ્સ સાથે કસ્ટમ એલિમેન્ટ છે, અને તે `some-lib` નામની લાઇબ્રેરીમાં મોકલવામાં આવે છે:

```ts [some-lib/src/SomeElement.ts]
// ટાઇપ કરેલ JS પ્રોપર્ટીઝ સાથે ક્લાસ વ્યાખ્યાયિત કરો.
export class SomeElement extends HTMLElement {
  foo: number = 123
  bar: string = 'blah'

  lorem: boolean = false

  // આ મેથડ ટેમ્પલેટ ટાઇપ્સમાં એક્સપોઝ થવી જોઈએ નહીં.
  someMethod() {
    /* ... */
  }

  // ... અમલીકરણ વિગતો અવગણવામાં આવી છે ...
  // ... ધારો કે એલિમેન્ટ "apple-fell" નામની ઇવેન્ટ્સ મોકલે છે ...
}

customElements.define('some-element', SomeElement)

// SomeElement ની પ્રોપર્ટીઝની આ એક સૂચિ છે જે ફ્રેમવર્ક ટેમ્પલેટ્સમાં
// ટાઇપ ચેકિંગ માટે પસંદ કરવામાં આવશે. અન્ય કોઈ પ્રોપર્ટી એક્સપોઝ થશે નહીં.
export type SomeElementAttributes = 'foo' | 'bar'

// SomeElement જે ઇવેન્ટ ટાઇપ્સ મોકલે છે તેને વ્યાખ્યાયિત કરો.
export type SomeElementEvents = {
  'apple-fell': AppleFellEvent
}

export class AppleFellEvent extends Event {
  /* ... વિગતો અવગણવામાં આવી છે ... */
}
```

અમલીકરણની વિગતો અવગણવામાં આવી છે, પરંતુ મહત્વનો ભાગ એ છે કે આપણી પાસે બે બાબતો માટે ટાઇપ ડેફિનેશન્સ છે: પ્રોપ ટાઇપ્સ અને ઇવેન્ટ ટાઇપ્સ.

ચાલો Vue માં કસ્ટમ એલિમેન્ટ ટાઇપ ડેફિનેશન્સને સરળતાથી રજીસ્ટર કરવા માટે એક ટાઇપ હેલ્પર (type helper) બનાવીએ:

```ts [some-lib/src/DefineCustomElement.ts]
// આપણે દરેક એલિમેન્ટ દીઠ આ ટાઇપ હેલ્પરનો ફરીથી ઉપયોગ કરી શકીએ છીએ.
type DefineCustomElement<
  ElementType extends HTMLElement,
  Events extends EventMap = {},
  SelectedAttributes extends keyof ElementType = keyof ElementType
> = new () => ElementType & {
  // ટેમ્પલેટ ટાઇપ ચેકિંગમાં એક્સપોઝ થતી પ્રોપર્ટીઝને વ્યાખ્યાયિત કરવા માટે $props નો ઉપયોગ કરો.
  // Vue ખાસ કરીને `$props` ટાઇપ પરથી પ્રોપ વ્યાખ્યાઓ વાંચે છે.
  // નોંધો કે અમે ગ્લોબલ HTML પ્રોપ્સ અને Vue ના વિશિષ્ટ પ્રોપ્સ સાથે એલિમેન્ટના પ્રોપ્સને જોડીએ છીએ.
  /** @deprecated કસ્ટમ એલિમેન્ટ રેફ પર $props પ્રોપર્ટીનો ઉપયોગ કરશો નહીં,
    આ માત્ર ટેમ્પલેટ પ્રોપ ટાઇપ્સ માટે છે. */
  $props: HTMLAttributes &
    Partial<Pick<ElementType, SelectedAttributes>> &
    PublicProps

  // ઇવેન્ટ ટાઇપ્સને ખાસ વ્યાખ્યાયિત કરવા માટે $emit નો ઉપયોગ કરો.
  // Vue ખાસ કરીને `$emit` ટાઇપ પરથી ઇવેન્ટ ટાઇપ્સ વાંચે છે.
  // નોંધ કરો કે `$emit` ચોક્કસ ફોર્મેટની અપેક્ષા રાખે છે જેમાં આપણે `Events` ને મેપ કરીએ છીએ.
  /** @deprecated કસ્ટમ એલિમેન્ટ રેફ પર $emit પ્રોપર્ટીનો ઉપયોગ કરશો નહીં,
    આ માત્ર ટેમ્પલેટ પ્રોપ ટાઇપ્સ માટે છે. */
  $emit: VueEmit<Events>
}

type EventMap = {
  [event: string]: Event
}

// આ એક EventMap ને તે ફોર્મેટમાં મેપ કરે છે જેની Vue ના $emit ટાઇપ અપેક્ષા રાખે છે.
type VueEmit<T extends EventMap> = EmitFn<{
  [K in keyof T]: (event: T[K]) => void
}>
```

:::tip નોંધ
અમે `$props` અને `$emit` ને ડેપ્રિકેટેડ (deprecated) તરીકે માર્ક કર્યા છે જેથી જ્યારે અમે કસ્ટમ એલિમેન્ટનો `ref` મેળવીએ ત્યારે અમે આ પ્રોપર્ટીઝનો ઉપયોગ કરવા લલચાઈએ નહીં, કારણ કે જ્યારે કસ્ટમ એલિમેન્ટ્સની વાત આવે ત્યારે આ પ્રોપર્ટીઝ માત્ર ટાઇપ ચેકિંગના હેતુ માટે જ હોય છે. આ પ્રોપર્ટીઝ વાસ્તવમાં કસ્ટમ એલિમેન્ટ ઇન્સ્ટન્સ પર અસ્તિત્વમાં હોતી નથી.
:::

ટાઇપ હેલ્પરનો ઉપયોગ કરીને આપણે હવે JS પ્રોપર્ટીઝ પસંદ કરી શકીએ છીએ જે Vue ટેમ્પલેટ્સમાં ટાઇપ ચેકિંગ માટે એક્સપોઝ થવી જોઈએ:

```ts [some-lib/src/SomeElement.vue.ts]
import {
  SomeElement,
  SomeElementAttributes,
  SomeElementEvents
} from './SomeElement.js'
import type { Component } from 'vue'
import type { DefineCustomElement } from './DefineCustomElement'

// Vue ના GlobalComponents ટાઇપમાં નવો એલિમેન્ટ ટાઇપ ઉમેરો.
declare module 'vue' {
  interface GlobalComponents {
    'some-element': DefineCustomElement<
      SomeElement,
      SomeElementAttributes,
      SomeElementEvents
    >
  }
}
```

ધારો કે `some-lib` તેની સોર્સ TypeScript ફાઇલોને `dist/` ફોલ્ડરમાં બિલ્ડ કરે છે. `some-lib` નો વપરાશકર્તા પછી `SomeElement` ને ઇમ્પોર્ટ કરી શકે છે અને તેને Vue SFC માં આ રીતે વાપરી શકે છે:

```vue [SomeElementImpl.vue]
<script setup lang="ts">
// આ બ્રાઉઝર સાથે એલિમેન્ટ બનાવશે અને રજીસ્ટર કરશે.
import 'some-lib/dist/SomeElement.js'

// જે વપરાશકર્તા TypeScript અને Vue નો ઉપયોગ કરી રહ્યો છે તેણે વધુમાં Vue-વિશિષ્ટ ટાઇપ ડેફિનેશન
// ઇમ્પોર્ટ કરવી જોઈએ (અન્ય ફ્રેમવર્કના વપરાશકર્તાઓ અન્ય ફ્રેમવર્ક-વિશિષ્ટ ટાઇપ ડેફિનેશન્સ ઇમ્પોર્ટ કરી શકે છે).
import type {} from 'some-lib/dist/SomeElement.vue.js'

import { useTemplateRef, onMounted } from 'vue'

const el = useTemplateRef('el')

onMounted(() => {
  console.log(
    el.value!.foo,
    el.value!.bar,
    el.value!.lorem,
    el.value!.someMethod()
  )

  // આ પ્રોપ્સનો ઉપયોગ કરશો નહીં, તેઓ `undefined` છે
  // IDE તેમને ક્રોસ આઉટ (strike-through) બતાવશે
  el.$props
  el.$emit
})
</script>

<template>
  <!-- હવે આપણે ટાઇપ ચેકિંગ સાથે એલિમેન્ટનો ઉપયોગ કરી શકીએ છીએ: -->
  <some-element
    ref="el"
    :foo="456"
    :blah="'hello'"
    @apple-fell="
      (event) => {
        // `event` નો પ્રકાર અહીં `AppleFellEvent` હોવાનું અનુમાન કરવામાં આવે છે
      }
    "
  ></some-element>
</template>
```

જો એલિમેન્ટ પાસે ટાઇપ ડેફિનેશન્સ નથી, તો પ્રોપર્ટીઝ અને ઇવેન્ટ્સના ટાઇપ્સ વધુ મેન્યુઅલ રીતે વ્યાખ્યાયિત કરી શકાય છે:

```vue [SomeElementImpl.vue]
<script setup lang="ts">
// ધારો કે `some-lib` ટાઇપ ડેફિનેશન્સ વગરનું સાદું JS છે, અને TypeScript
// ટાઇપ્સનું અનુમાન કરી શકતું નથી:
import { SomeElement } from 'some-lib'

// આપણે પહેલાની જેમ જ ટાઇપ હેલ્પરનો ઉપયોગ કરીશું.
import { DefineCustomElement } from './DefineCustomElement'

type SomeElementProps = { foo?: number; bar?: string }
type SomeElementEvents = { 'apple-fell': AppleFellEvent }
interface AppleFellEvent extends Event {
  /* ... */
}

// Vue ના GlobalComponents ટાઇપમાં નવો એલિમેન્ટ ટાઇપ ઉમેરો.
declare module 'vue' {
  interface GlobalComponents {
    'some-element': DefineCustomElement<
      SomeElementProps,
      SomeElementEvents
    >
  }
}

// ... પહેલાની જેમ જ, એલિમેન્ટના રિફરન્સનો ઉપયોગ કરો ...
</script>

<template>
  <!-- ... પહેલાની જેમ જ, ટેમ્પલેટમાં એલિમેન્ટનો ઉપયોગ કરો ... -->
</template>
```

કસ્ટમ એલિમેન્ટ લેખકોએ તેમની લાઇબ્રેરીઓમાંથી ફ્રેમવર્ક-વિશિષ્ટ કસ્ટમ એલિમેન્ટ ટાઇપ ડેફિનેશન્સ આપમેળે એક્સપોર્ટ કરવી જોઈએ નહીં, ઉદાહરણ તરીકે તેમણે તેને `index.ts` ફાઇલમાંથી એક્સપોર્ટ કરવી જોઈએ નહીં જે બાકીની લાઇબ્રેરીને પણ એક્સપોર્ટ કરે છે, અન્યથા વપરાશકર્તાઓ પાસે અનપેક્ષિત મોડ્યુલ ઓગમેન્ટેશન (module augmentation) ભૂલો આવશે. વપરાશકર્તાઓએ તેમને જોઈતી ફ્રેમવર્ક-વિશિષ્ટ ટાઇપ ડેફિનેશન ફાઇલ ઇમ્પોર્ટ કરવી જોઈએ.

## વેબ ઘટકો વિરુદ્ધ Vue ઘટકો (Web Components vs. Vue Components) {#web-components-vs-vue-components}

કેટલાક ડેવલપર્સ માને છે કે ફ્રેમવર્ક-પ્રોપ્રાઇટરી ઘટક મોડલ્સ ટાળવા જોઈએ, અને માત્ર કસ્ટમ એલિમેન્ટ્સનો ઉપયોગ કરવાથી એપ્લિકેશન "ફ્યુચર-પ્રૂફ" બને છે. અહીં અમે સમજાવવાનો પ્રયત્ન કરીશું કે શા માટે અમે માનીએ છીએ કે આ સમસ્યા માટે ખૂબ જ સરળ અભિગમ છે.

કસ્ટમ એલિમેન્ટ્સ અને Vue ઘટકો વચ્ચે ખરેખર અમુક સ્તરનું ફીચર ઓવરલેપ છે: તે બંને અમને ડેટા પાસિંગ, ઇવેન્ટ એમિટીંગ અને લાઇફસાયકલ મેનેજમેન્ટ સાથે રીયુઝેબલ ઘટકો વ્યાખ્યાયિત કરવાની મંજૂરી આપે છે. જો કે, વેબ ઘટકો (Web Components) APIs પ્રમાણમાં નીચા સ્તરના અને સાદા છે. વાસ્તવિક એપ્લિકેશન બનાવવા માટે, આપણને કેટલીક વધારાની ક્ષમતાઓની જરૂર છે જે પ્લેટફોર્મ આવરી લેતું નથી:

- એક ડિક્લેરેટિવ અને કાર્યક્ષમ ટેમ્પલેટીંગ સિસ્ટમ;

- એક રિએક્ટિવ સ્ટેટ મેનેજમેન્ટ સિસ્ટમ જે ક્રોસ-કમ્પોનન્ટ લોજિક એક્સટ્રેક્શન અને રિયુઝની સુવિધા આપે છે;

- સર્વર પર ઘટકોને રેન્ડર કરવા અને તેમને ક્લાયંટ (SSR) પર હાઇડ્રેટ કરવાની કાર્યક્ષમ રીત, જે SEO અને [Web Vitals metrics જેમ કે LCP](https://web.dev/vitals/) માટે મહત્વપૂર્ણ છે. નેટિવ કસ્ટમ એલિમેન્ટ્સ SSR માં સામાન્ય રીતે Node.js માં DOM નું અનુકરણ કરવું અને પછી પરિવર્તિત DOM ને સીરીયલાઈઝ કરવું સામેલ હોય છે, જ્યારે Vue SSR જ્યારે પણ શક્ય હોય ત્યારે સ્ટ્રિંગ કોન્કેટેનેશનમાં કમ્પાઇલ કરે છે, જે ઘણું વધારે કાર્યક્ષમ છે.

Vue નું ઘટક મોડેલ આ જરૂરિયાતોને ધ્યાનમાં રાખીને એક સુસંગત સિસ્ટમ તરીકે ડિઝાઇન કરવામાં આવ્યું છે.

એક સક્ષમ એન્જિનિયરિંગ ટીમ સાથે, તમે સંભવતઃ નેટિવ કસ્ટમ એલિમેન્ટ્સની ટોચ પર તેના જેવું જ કંઈક બનાવી શકો છો - પરંતુ આનો અર્થ એ પણ છે કે તમે ઇન-હાઉસ ફ્રેમવર્કનો લાંબા ગાળાના મેન્ટેનન્સનો બોજ ઉઠાવી રહ્યા છો, જ્યારે Vue જેવા પરિપક્વ ફ્રેમવર્કની ઇકોસિસ્ટમ અને સમુદાય લાભો ગુમાવી રહ્યાં છો.

એવા ફ્રેમવર્ક્સ પણ છે જે કસ્ટમ એલિમેન્ટ્સને તેમના ઘટક મોડેલના આધાર તરીકે ઉપયોગ કરીને બનાવવામાં આવ્યા છે, પરંતુ તે બધાએ અનિવાર્યપણે ઉપર સૂચિબદ્ધ સમસ્યાઓ માટે તેમના પ્રોપ્રાઇટરી સોલ્યુશન્સ રજૂ કરવા પડે છે. આ ફ્રેમવર્કનો ઉપયોગ કરવાનો અર્થ એ છે કે આ સમસ્યાઓ કેવી રીતે હલ કરવી તે અંગેના તેમના ટેકનિકલ નિર્ણયોને સ્વીકારવા - જે, ગમે તેટલી જાહેરાત કરવામાં આવે તો પણ, તમને ભવિષ્યના સંભવિત ફેરફારોથી આપમેળે અલગ કરતા નથી.

કેટલાક ક્ષેત્રો એવા પણ છે જ્યાં અમને કસ્ટમ એલિમેન્ટ્સ મર્યાદિત લાગે છે:

- ઈગર સ્લોટ ઈવેલ્યુએશન (Eager slot evaluation) ઘટકોના કમ્પોઝિશનમાં અવરોધ ઊભો કરે છે. Vue ના [સ્કોપ્ડ સ્લોટ્સ (scoped slots)](/guide/components/slots#scoped-slots) ઘટક કમ્પોઝિશન માટે એક શક્તિશાળી મિકેનિઝમ છે, જે નેટિવ સ્લોટ્સની ઈગર પ્રકૃતિને કારણે કસ્ટમ એલિમેન્ટ્સ દ્વારા સમર્થિત થઈ શકતું નથી. આનો અર્થ એ પણ છે કે સ્વીકારનાર ઘટક એ નિયંત્રિત કરી શકતું નથી કે સ્લોટ કન્ટેન્ટનો ટુકડો ક્યારે અથવા રેન્ડર કરવો કે નહીં.

- સીએસએસ સ્કોપ ધરાવતા શેડો ડોમ (Shadow DOM) સાથે કસ્ટમ એલિમેન્ટ્સ મોકલવા માટે આજે JavaScript ની અંદર CSS એમ્બેડ કરવાની જરૂર છે જેથી કરીને રનટાઇમ પર શેડો રૂટમાં ઇન્જેક્ટ કરી શકાય. તે SSR દૃશ્યોમાં માર્કઅપમાં ડુપ્લિકેટ સ્ટાઇલના પરિણામે પણ આવે છે. આ ક્ષેત્રમાં [પ્લેટફોર્મ સુવિધાઓ](https://github.com/whatwg/html/pull/4898/) પર કામ કરવામાં આવી રહ્યું છે - પરંતુ અત્યાર સુધી તે સાર્વત્રિક રીતે સમર્થિત નથી, અને હજુ પણ પ્રોડક્શન પરફોર્મન્સ / SSR ચિંતાઓ છે જેને ઉકેલવાની જરૂર છે. તે દરમિયાન, Vue SFCs [CSS સ્કોપિંગ મિકેનિઝમ્સ](/api/sfc-css-features) પ્રદાન કરે છે જે સ્ટાઇલને સાદી CSS ફાઇલોમાં એક્સટ્રેક્ટ કરવાનું સમર્થન આપે છે.

Vue હંમેશા વેબ પ્લેટફોર્મના નવીનતમ ધોરણો સાથે અદ્યતન રહેશે, અને જો તે અમારું કામ સરળ બનાવે છે તો પ્લેટફોર્મ જે પણ પ્રદાન કરે છે તેનો અમે રાજીખુશીથી લાભ લઈશું. જો કે, અમારો ધ્યેય એવા સોલ્યુશન્સ પૂરા પાડવાનો છે જે સારી રીતે કાર્ય કરે અને આજે કાર્ય કરે. તેનો અર્થ એ છે કે આપણે નવી પ્લેટફોર્મ વિશેષતાઓને જટિલ માનસિકતા સાથે સામેલ કરવી પડશે - અને તેમાં તે ગાબડા ભરવાનો સમાવેશ થાય છે જ્યાં ધોરણો ટૂંકા પડે છે.
