# પ્રોડક્શન ડિપ્લોયમેન્ટ (Production Deployment) {#production-deployment}

## ડેવલપમેન્ટ વિરુદ્ધ પ્રોડક્શન (Development vs. Production) {#development-vs-production}

ડેવલપમેન્ટ દરમિયાન, Vue ડેવલપમેન્ટ અનુભવને સુધારવા માટે સંખ્યાબંધ સુવિધાઓ પ્રદાન કરે છે:

- સામાન્ય ભૂલો અને મુશ્કેલીઓ માટે ચેતવણી (Warning)
- પ્રોપ્સ / ઇવેન્ટ્સ વેલિડેશન
- [રિએક્ટિવિટી ડિબગિંગ હૂક્સ (Reactivity debugging hooks)](/guide/extras/reactivity-in-depth#reactivity-debugging)
- Devtools ઇન્ટિગ્રેશન

જો કે, આ સુવિધાઓ પ્રોડક્શનમાં બિનઉપયોગી બની જાય છે. કેટલીક ચેતવણી તપાસોમાં ઓવરહેડ (overhead) થી પર્ફોર્મન્સમાં થોડો ઘટાડો પણ થઈ શકે છે. પ્રોડક્શનમાં ડિપ્લોય કરતી વખતે, આપણે નાની પેલોડ સાઈઝ અને બહેતર પ્રદર્શન માટે બધી બિનઉપયોગી, માત્ર ડેવલપમેન્ટ કોડ બ્રાન્ચને છોડી દેવી જોઈએ.

## બિલ્ડ ટૂલ્સ વિના (Without Build Tools) {#without-build-tools}

જો તમે CDN અથવા સેલ્ફ-હોસ્ટેડ સ્ક્રિપ્ટ પરથી લોડ કરીને બિલ્ડ ટૂલ વિના Vue નો ઉપયોગ કરી રહ્યાં હોવ, તો પ્રોડક્શનમાં ડિપ્લોય કરતી વખતે પ્રોડક્શન બિલ્ડ (`dist` ફાઇલો કે જે `.prod.js` માં સમાપ્ત થાય છે) વાપરવાની ખાતરી કરો. પ્રોડક્શન બિલ્ડ્સ બધી ડેવલપમેન્ટ-ઓન્લી કોડ બ્રાન્ચોને દૂર કરીને પહેલેથી જ મીનીફાઇડ (minified) હોય છે.

- જો ગ્લોબલ બિલ્ડનો ઉપયોગ કરી રહ્યાં હોવ (`Vue` ગ્લોબલ દ્વારા એક્સેસ કરવું): `vue.global.prod.js` નો ઉપયોગ કરો.
- જો ESM બિલ્ડનો ઉપયોગ કરી રહ્યાં હોવ (નેટિવ ESM ઇમ્પોર્ટ્સ દ્વારા એક્સેસ કરવું): `vue.esm-browser.prod.js` નો ઉપયોગ કરો.

વધુ વિગતો માટે [`dist` ફાઇલ માર્ગદર્શિકા (dist file guide)](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) જુઓ.

## બિલ્ડ ટૂલ્સ સાથે (With Build Tools) {#with-build-tools}

`create-vue` (Vite પર આધારિત) અથવા Vue CLI (webpack પર આધારિત) દ્વારા બનાવવામાં આવેલા પ્રોજેક્ટસ્ પ્રોડક્શન બિલ્ડ્સ માટે પહેલેથી જ કોન્ફિગર કરેલા હોય છે.

જો કસ્ટમ સેટઅપનો ઉપયોગ કરી રહ્યાં હોવ, તો ખાતરી કરો કે:

૧. `vue` એ `vue.runtime.esm-bundler.js` રિઝોલ્વ કરે છે.
૨. [કમ્પાઇલ ટાઇમ ફીચર ફ્લેગ્સ (compile time feature flags)](/api/compile-time-flags) યોગ્ય રીતે કોન્ફિગર કરેલા છે.
૩. બિલ્ડ દરમિયાન `process.env<wbr>.NODE_ENV` ને `"production"` સાથે બદલવામાં આવે છે.

વધારાના સંદર્ભો:

- [Vite પ્રોડક્શન બિલ્ડ ગાઇડ](https://vite.dev/guide/build.html)
- [Vite ડિપ્લોયમેન્ટ ગાઇડ](https://vite.dev/guide/static-deploy.html)
- [Vue CLI ડિપ્લોયમેન્ટ ગાઇડ](https://cli.vuejs.org/guide/deployment.html)

## રનટાઇમ એરર્સ ટ્રેક કરવી (Tracking Runtime Errors) {#tracking-runtime-errors}

[એપ-લેવલ એરર હેન્ડલર (app-level error handler)](/api/application#app-config-errorhandler) નો ઉપયોગ ટ્રેકિંગ સેવાઓને ભૂલોની જાણ કરવા માટે કરી શકાય છે:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // ટ્રેકિંગ સેવાઓને ભૂલની જાણ કરો
}
```

[Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) અને [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) જેવી સેવાઓ પણ Vue માટે સત્તાવાર એકીકરણ પ્રદાન કરે છે.
