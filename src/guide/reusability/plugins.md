# પ્લગિન્સ (Plugins) {#plugins}

## પ્રસ્તાવના (Introduction) {#introduction}

પ્લગિન્સ એ સ્વ-નિહિત (self-contained) કોડ છે જે સામાન્ય રીતે Vue માં એપ-લેવલ કાર્યક્ષમતા ઉમેરે છે. અમે પ્લગિન આ રીતે ઇન્સ્ટોલ કરીએ છીએ:

```js
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* વૈકલ્પિક ઓપ્શન્સ */
})
```

પ્લગિન કાં તો એવા ઓબ્જેક્ટ તરીકે વ્યાખ્યાયિત કરવામાં આવે છે જે `install()` મેથડને એક્સપોઝ કરે છે અથવા તો એક ફંક્શન તરીકે જે પોતે જ ઇન્સ્ટોલ ફંક્શન તરીકે કાર્ય કરે છે. ઇન્સ્ટોલ ફંક્શન [એપ ઇન્સ્ટન્સ](/api/application) મેળવે છે અને તેની સાથે `app.use()` ને પસાર કરેલા વધારાના ઓપ્શન્સ (જો હોય તો) મેળવે છે:

```js
const myPlugin = {
  install(app, options) {
    // એપને કોન્ફિગર કરો
  }
}
```

પ્લગિન માટે કોઈ કડક રીતે વ્યાખ્યાયિત સ્કોપ નથી, પરંતુ સામાન્ય પરિસ્થિતિઓ જ્યાં પ્લગિન્સ ઉપયોગી છે તેમાં નીચેનાનો સમાવેશ થાય છે:

૧. [`app.component()`](/api/application#app-component) અને [`app.directive()`](/api/application#app-directive) સાથે એક અથવા વધુ ગ્લોબલ કમ્પોનન્ટ્સ અથવા કસ્ટમ ડાયરેક્ટિવ્સ રજીસ્ટર કરો.

૨. [`app.provide()`](/api/application#app-provide) કોલ કરીને સમગ્ર એપમાં રિસોર્સને [ઇન્જેક્ટેબલ (injectable)](/guide/components/provide-inject) બનાવો.

૩. [`app.config.globalProperties`](/api/application#app-config-globalproperties) માં જોડીને કેટલીક ગ્લોબલ ઇન્સ્ટન્સ પ્રોપર્ટીઝ અથવા મેથડ્સ ઉમેરો.

૪. એક લાઇબ્રેરી કે જેણે ઉપરોક્ત કેટલાક સંયોજન કરવાની જરૂર છે (દા.ત. [vue-router](https://github.com/vuejs/vue-router-next)).

## પ્લગિન લખવું (Writing a Plugin) {#writing-a-plugin}

તમારા પોતાના Vue.js પ્લગિન્સ કેવી રીતે બનાવવા તે વધુ સારી રીતે સમજવા માટે, અમે પ્લગિનનું ખૂબ જ સરળ સંસ્કરણ બનાવીશું જે `i18n` ([Internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization) નું ટૂંકું નામ) સ્ટ્રિંગ્સ પ્રદર્શિત કરે છે.

ચાલો પ્લગિન ઓબ્જેક્ટ સેટ કરીને શરૂઆત કરીએ. લોજિકને સીમિત અને અલગ રાખવા માટે તેને એક અલગ ફાઇલમાં બનાવવાની અને તેને એક્સપોર્ટ કરવાની ભલામણ કરવામાં આવે છે, જે નીચે બતાવ્યા પ્રમાણે છે.

```js [plugins/i18n.js]
export default {
  install: (app, options) => {
    // પ્લગિન કોડ અહીં જાય છે
  }
}
```

અમે ટ્રાન્સલેશન ફંક્શન બનાવવા માંગીએ છીએ. આ ફંક્શન ડોટ-ડિલિમિટેડ (dot-delimited) `key` સ્ટ્રિંગ મેળવશે, જેનો ઉપયોગ અમે યુઝર દ્વારા પૂરા પાડવામાં આવેલ ઓપ્શન્સમાં ટ્રાન્સલેટેડ સ્ટ્રિંગ શોધવા માટે કરીશું. આ ટેમ્પલેટ્સમાં ઇચ્છિત વપરાશ છે:

```vue-html
<h1>{{ $translate('greetings.hello') }}</h1>
```

આ ફંક્શન તમામ ટેમ્પલેટ્સમાં ગ્લોબલ સ્તરે ઉપલબ્ધ હોવું જોઈએ, તેથી અમે તેને અમારા પ્લગિનમાં `app.config.globalProperties` સાથે જોડીશું:

```js{3-10} [plugins/i18n.js]
export default {
  install: (app, options) => {
    // ગ્લોબલ સ્તરે ઉપલબ્ધ $translate() મેથડ ઇન્જેક્ટ કરો
    app.config.globalProperties.$translate = (key) => {
      // રસ્તો (path) તરીકે `key` નો ઉપયોગ કરીને 
      // `options` માં નેસ્ટેડ પ્રોપર્ટી મેળવો
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

અમારું `$translate` ફંક્શન `greetings.hello` જેવી સ્ટ્રિંગ લેશે, યુઝર દ્વારા પૂરા પાડવામાં આવેલ કોન્ફિગરેશનની અંદર જોશે અને ટ્રાન્સલેટેડ વેલ્યુ પરત કરશે.

ટ્રાન્સલેટેડ કીઝ ધરાવતો ઓબ્જેક્ટ ઇન્સ્ટોલેશન દરમિયાન `app.use()` ના વધારાના પેરામીટર દ્વારા પ્લગિનમાં પાસ કરવો જોઈએ:

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

હવે, આપણી પ્રારંભિક અભિવ્યક્તિ `$translate('greetings.hello')` રનટાઇમ પર `Bonjour!` દ્વારા બદલવામાં આવશે.

આ પણ જુઓ: [Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

:::tip
ગ્લોબલ પ્રોપર્ટીઝનો ઉપયોગ ઓછો કરો, કારણ કે જો વિવિધ પ્લગિન્સ દ્વારા ઇન્જેક્ટ કરવામાં આવેલી ઘણી બધી ગ્લોબલ પ્રોપર્ટીઝનો ઉપયોગ સમગ્ર એપમાં કરવામાં આવે તો તે ઝડપથી મૂંઝવણ પેદા કરી શકે છે.
:::

### પ્લગિન્સ સાથે પ્રોવાઇડ / ઇન્જેક્ટ {#provide-inject-with-plugins}

પ્લગિન્સ આપણને પ્લગિન યુઝર્સને ફંક્શન અથવા એટ્રિબ્યુટની એક્સેસ આપવા લાયક બનાવવા માટે `provide` નો ઉપયોગ કરવાની પણ મંજૂરી આપે છે. ઉદાહરણ તરીકે, અમે એપ્લિકેશનને `options` પેરામીટરની એક્સેસ આપી શકીએ છીએ જેથી ટ્રાન્સલેશન ઓબ્જેક્ટનો ઉપયોગ કરી શકાય.

```js{3} [plugins/i18n.js]
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```

પ્લગિન યુઝર્સ હવે `i18n` કીનો ઉપયોગ કરીને તેમના કમ્પોનન્ટ્સમાં પ્લગિન ઓપ્શન્સ ઇન્જેક્ટ કરી શકશે:

<div class="composition-api">

```vue{4}
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

</div>
<div class="options-api">

```js{2}
export default {
  inject: ['i18n'],
  created() {
    console.log(this.i18n.greetings.hello)
  }
}
```

</div>

### NPM માટે બંડલ {#bundle-for-npm}

જો તમે અન્ય લોકોના ઉપયોગ માટે તમારા પ્લગિનને આગળ બનાવવા અને પ્રકાશિત (publish) કરવા માંગતા હો, તો [Library Mode પર Vite નો વિભાગ](https://vite.dev/guide/build.html#library-mode) જુઓ.
