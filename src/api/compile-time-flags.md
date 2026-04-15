---
outline: deep
---

# કમ્પાઇલ-ટાઇમ ફ્લેગ્સ (Compile-Time Flags) {#compile-time-flags}

:::tip
કમ્પાઇલ-ટાઇમ ફ્લેગ્સ ફક્ત Vue ના `esm-bundler` બિલ્ડ (i.e. `vue/dist/vue.esm-bundler.js`) ઉપયોગ કરતી વખતે જ લાગુ થાય છે.
:::

બિલ્ડ સ્ટેપ સાથે Vue ઉપયોગ કરતી વખતે, ચોક્કસ સુવિધાઓ સક્ષમ / અક્ષમ (enable / disable) કરવા માટે ઘણા કમ્પાઇલ-ટાઇમ ફ્લેગ્સ કોન્ફિગર કરવું શક્ય છે. કમ્પાઇલ-ટાઇમ ફ્લેગ્સ ઉપયોગ કરવાનો ફાયદો એ છે કે આ રીતે અક્ષમ કરેલી સુવિધાઓને tree-shaking દ્વારા અંતિમ bundle માંથી દૂર કરી શકાય.

જો આ ફ્લેગ્સ સ્પષ્ટ રીતે કોન્ફિગર ન કરવામાં આવ્યા હોય તો પણ Vue કામ કરશે. જો કે, તેમને હંમેશા કોન્ફિગર કરવાની ભલામણ કરવામાં આવે છે જેથી જ્યારે શક્ય હોય ત્યારે સંબંધિત સુવિધાઓ યોગ્ય રીતે દૂર થઈ શકે.

તમારા બિલ્ડ ટૂલના આધારે તેમને કેવી રીતે કોન્ફિગર કરવા તે માટે [કોન્ફિગરેશન ગાઇડ્સ](#configuration-guides) જુઓ.

## `__VUE_OPTIONS_API__` {#VUE_OPTIONS_API}

- **ડિફોલ્ટ (Default):** `true`

  Options API સપોર્ટ સક્ષમ / અક્ષમ કરો. આને અક્ષમ કરવાથી નાના bundles મળશે, પરંતુ જો તૃતીય-પક્ષ (3rd party) libraries Options API પર આધાર રાખે છે તો સુસંગતતા (compatibility) ને અસર કરી શકે.

## `__VUE_PROD_DEVTOOLS__` {#VUE_PROD_DEVTOOLS}

- **ડિફોલ્ટ (Default):** `false`

  પ્રોડક્શન builds માં devtools સપોર્ટ સક્ષમ / અક્ષમ કરો. આનાથી bundle માં વધુ કોડ સામેલ થશે, તેથી ફક્ત debugging હેતુઓ માટે જ આને સક્ષમ કરવાની ભલામણ કરવામાં આવે છે.

## `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` {#VUE_PROD_HYDRATION_MISMATCH_DETAILS}

- **ડિફોલ્ટ (Default):** `false`

  પ્રોડક્શન builds માં hydration mismatches માટે વિગતવાર ચેતવણીઓ સક્ષમ/અક્ષમ કરો. આનાથી bundle માં વધુ કોડ સામેલ થશે, તેથી ફક્ત debugging હેતુઓ માટે જ આને સક્ષમ કરવાની ભલામણ કરવામાં આવે છે.

- માત્ર 3.4+ માં ઉપલબ્ધ

## કોન્ફિગરેશન ગાઇડ્સ (Configuration Guides) {#configuration-guides}

### Vite {#vite}

`@vitejs/plugin-vue` આ ફ્લેગ્સ માટે આપમેળે ડિફોલ્ટ વેલ્યુ પ્રદાન કરે છે. ડિફોલ્ટ વેલ્યુ બદલવા માટે, Vite ના [`define` config ઓપ્શન](https://vite.dev/config/shared-options.html#define) નો ઉપયોગ કરો:

```js [vite.config.js]
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // પ્રોડક્શન build માં hydration mismatch details સક્ષમ કરો
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
})
```

### vue-cli {#vue-cli}

`@vue/cli-service` આમાંના કેટલાક ફ્લેગ્સ માટે આપમેળે ડિફોલ્ટ વેલ્યુ પ્રદાન કરે છે. વેલ્યુ કોન્ફિગર / બદલવા માટે:

```js [vue.config.js]
module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
}
```

### webpack {#webpack}

ફ્લેગ્સ webpack ના [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) ઉપયોગ કરીને ડિફાઇન કરવા જોઈએ:

```js [webpack.config.js]
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```

### Rollup {#rollup}

ફ્લેગ્સ [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace) ઉપયોગ કરીને ડિફાઇન કરવા જોઈએ:

```js [rollup.config.js]
import replace from '@rollup/plugin-replace'

export default {
  plugins: [
    replace({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```
