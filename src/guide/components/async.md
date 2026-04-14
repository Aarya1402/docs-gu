# એસિંક કમ્પોનન્ટ્સ (Async Components) {#async-components}

## મૂળભૂત વપરાશ (Basic Usage) {#basic-usage}

મોટી એપ્લિકેશન્સમાં, આપણે એપ્લિકેશનને નાના ટુકડાઓમાં વહેંચવાની જરૂર પડી શકે છે અને જ્યારે જરૂર હોય ત્યારે જ સર્વર પરથી ઘટક લોડ કરવાની જરૂર પડી શકે છે. તે શક્ય બનાવવા માટે, Vue પાસે [`defineAsyncComponent`](/api/general#defineasynccomponent) ફંક્શન છે:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...સર્વર પરથી ઘટક લોડ કરો
    resolve(/* લોડ કરેલ ઘટક */)
  })
})
// ... `AsyncComp` નો સામાન્ય ઘટક જેવો ઉપયોગ કરો
```

જેમ તમે જોઈ શકો છો, `defineAsyncComponent` લોડર ફંક્શન સ્વીકારે છે જે પ્રોમિસ (Promise) પરત કરે છે. પ્રોમિસનું `resolve` કોલબેક ત્યારે કૉલ કરવું જોઈએ જ્યારે તમે સર્વર પરથી તમારી કમ્પોનન્ટની ડેફીનેશન મેળવી લો. લોડ નિષ્ફળ ગયો છે તે સૂચવવા માટે તમે `reject(reason)` ને પણ કૉલ કરી શકો છો.

[ES મોડ્યુલ ડાયનેમિક ઇમ્પોર્ટ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) પણ પ્રોમિસ પરત કરે છે, તેથી મોટાભાગના સમયે આપણે તેનો ઉપયોગ `defineAsyncComponent` સાથે સંયોજનમાં કરીશું. Vite અને webpack જેવા બંડલર્સ પણ આ સિન્ટેક્સને સપોર્ટ કરે છે (અને તેને બંડલ સ્પ્લિટ પોઈન્ટ્સ તરીકે ઉપયોગ કરશે), તેથી આપણે તેનો ઉપયોગ Vue SFCs ને ઇમ્પોર્ટ કરવા માટે કરી શકીએ છીએ:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

પરિણામી `AsyncComp` એ એક રેપર (wrapper) કમ્પોનન્ટ છે જે જ્યારે પેજ પર ખરેખર રેન્ડર થાય ત્યારે જ લોડર ફંક્શનને કૉલ કરે છે. આ ઉપરાંત, તે કોઈપણ પ્રોપ્સ અને સ્લોટ્સને આંતરિક ઘટકમાં પસાર કરશે, જેથી તમે લેઝી લોડિંગ (lazy loading) પ્રાપ્ત કરતી વખતે મૂળ ઘટકને સીમલેસ રીતે બદલવા માટે એસિંક રેપરનો ઉપયોગ કરી શકો.

સામાન્ય ઘટકોની જેમ, એસિંક ઘટકો પણ `app.component()` નો ઉપયોગ કરીને [ગ્લોબલ રજીસ્ટર કરી શકાય છે](/guide/components/registration#global-registration):

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

<div class="options-api">

[કમ્પોનન્ટને લોકલ રજીસ્ટર કરતી વખતે](/guide/components/registration#local-registration) તમે `defineAsyncComponent` નો ઉપયોગ પણ કરી શકો છો:

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

તેમને સીધા તેમના પેરેન્ટ કમ્પોનન્ટની અંદર પણ વ્યાખ્યાયિત કરી શકાય છે:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## લોડિંગ અને એરર સ્ટેટ્સ (Loading and Error States) {#loading-and-error-states}

અસિંક્રોનસ ઓપરેશન્સમાં અનિવાર્યપણે લોડિંગ અને એરર સ્ટેટ્સનો સમાવેશ થાય છે - `defineAsyncComponent()` એડવાન્સ્ડ ઓપ્શન્સ દ્વારા આ સ્ટેટ્સને હેન્ડલ કરવા માટે સપોર્ટ કરે છે:

```js
const AsyncComp = defineAsyncComponent({
  // લોડર ફંક્શન
  loader: () => import('./Foo.vue'),

  // એસિંક કમ્પોનન્ટ લોડ થઈ રહ્યો હોય ત્યારે વાપરવા માટેનો ઘટક
  loadingComponent: LoadingComponent,
  // લોડિંગ ઘટક બતાવતા પહેલા વિલંબ (delay). ડિફોલ્ટ: ૨૦૦ms.
  delay: 200,

  // જો લોડ નિષ્ફળ જાય તો વાપરવા માટેનો ઘટક
  errorComponent: ErrorComponent,
  // જો ટાઈમઆઉટ (timeout) પ્રદાન કરવામાં આવે અને તે વધી જાય તો 
  // એરર કમ્પોનન્ટ પ્રદર્શિત થશે. ડિફોલ્ટ: Infinity.
  timeout: 3000
})
```

જો લોડિંગ કમ્પોનન્ટ આપવામાં આવે છે, તો જ્યારે આંતરિક ઘટક લોડ થઈ રહ્યું હોય ત્યારે તે પહેલા પ્રદર્શિત થશે. લોડિંગ કમ્પોનન્ટ બતાવવામાં આવે તે પહેલા ડિફોલ્ટ ૨૦૦ms વિલંબ હોય છે - કારણ કે ઝડપી નેટવર્ક્સ પર, જ્યારે કોઈ ત્વરિત લોડિંગ સ્ટેટ ખૂબ જ ઝડપથી બદલાઈ જાય છે ત્યારે તે ફ્લિકરિંગ (flicker) જેવું લાગે છે.

જો એરર કમ્પોનન્ટ પ્રદાન કરવામાં આવેલ હોય, તો જ્યારે લોડર ફંક્શન દ્વારા પ્રોમિસ રીજેક્ટ થાય ત્યારે તે પ્રદર્શિત થશે. જ્યારે રિક્વેસ્ટમાં વધુ સમય લાગી રહ્યો હોય ત્યારે એરર કમ્પોનન્ટ બતાવવા માટે તમે ટાઈમઆઉટ પણ સ્પષ્ટ કરી શકો છો.

## લેઝી હાઇડ્રેશન (Lazy Hydration) <sup class="vt-badge" data-text="3.5+" /> {#lazy-hydration}

> જો તમે [સર્વર-સાઇડ રેન્ડરિંગ (Server-Side Rendering)](/guide/scaling-up/ssr) નો ઉપયોગ કરી રહ્યા હોવ તો જ આ વિભાગ લાગુ પડે છે.

Vue ૩.૫+ માં, અસિંક્રોનસ ઘટકો હાઇડ્રેશન સ્ટ્રેટેજી પ્રદાન કરીને તે ક્યારે હાઇડ્રેટ થાય છે તે નિયંત્રિત કરી શકે છે.

- Vue ઘણી બધી બિલ્ટ-ઇન હાઇડ્રેશન સ્ટ્રેટેજી પ્રદાન કરે છે. આ બિલ્ટ-ઇન સ્ટ્રેટેજી ને વ્યક્તિગત રીતે ઇમ્પોર્ટ કરવાની જરૂર છે જેથી જો તેનો ઉપયોગ ન કરવામાં આવે તો તેને ટ્રી-શેક (tree-shaken) કરી શકાય.

- લવચીકતા (flexibility) માટે ડિઝાઇન ઇરાદાપૂર્વક લો-લેવલ છે. કમ્પાઇલર સિન્ટેક્સ સુગર (syntax sugar) ભવિષ્યમાં કાં તો કોરમાં અથવા ઉચ્ચ સ્તરના સોલ્યુશન્સમાં (દા.ત. Nuxt) આની ટોચ પર બનાવી શકાય છે.

### આઈડલ (Idle) પર હાઈડ્રેટ {#hydrate-on-idle}

`requestIdleCallback` દ્વારા હાઈડ્રેટ થાય છે:

```js
import { defineAsyncComponent, hydrateOnIdle } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* વૈકલ્પિક રીતે મહત્તમ ટાઈમઆઉટ પાસ કરો */)
})
```

### વિઝિબલ (Visible) પર હાઈડ્રેટ {#hydrate-on-visible}

`IntersectionObserver` દ્વારા જ્યારે એલિમેન્ટ દૃશ્યમાન (visible) થાય ત્યારે હાઈડ્રેટ થાય છે.

```js
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnVisible()
})
```

ઓબ્ઝર્વર (observer) માટે ઓપ્શન્સ ઓબ્જેક્ટ વેલ્યુ વૈકલ્પિક રીતે પાસ કરી શકો છો:

```js
hydrateOnVisible({ rootMargin: '100px' })
```

### મીડિયા ક્વેરી પર હાઈડ્રેટ {#hydrate-on-media-query}

જ્યારે ઉલ્લેખિત મીડિયા ક્વેરી મેળ ખાય ત્યારે હાઈડ્રેટ થાય છે.

```js
import { defineAsyncComponent, hydrateOnMediaQuery } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnMediaQuery('(max-width:500px)')
})
```

### ઇન્ટરેક્શન પર હાઈડ્રેટ {#hydrate-on-interaction}

જ્યારે કમ્પોનન્ટ એલિમેન્ટ્સ પર નિર્દિષ્ટ ઇવેન્ટ(ઓ) ટ્રિગર થાય ત્યારે હાઈડ્રેટ થાય છે. હાઇડ્રેશનને ટ્રિગર કરનાર ઇવેન્ટ હાઇડ્રેશન પૂર્ણ થયા પછી એકવાર ફરીથી પ્લે કરવામાં આવશે.

```js
import { defineAsyncComponent, hydrateOnInteraction } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnInteraction('click')
})
```

બહુવિધ ઇવેન્ટ પ્રકારોની સૂચિ (list) પણ હોઈ શકે છે:

```js
hydrateOnInteraction(['wheel', 'mouseover'])
```

### કસ્ટમ સ્ટ્રેટેજી (Custom Strategy) {#custom-strategy}

```ts
import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement એ કમ્પોનન્ટના બિન-હાઇડ્રેટેડ DOM માંના તમામ રૂટ એલિમેન્ટ્સ દ્વારા
  // પુનરાવર્તન કરવામાં મદદરૂપ છે, કારણ કે રૂટ સિંગલ એલિમેન્ટને બદલે ફ્રેગમેન્ટ હોઈ શકે છે.
  forEachElement(el => {
    // ...
  })
  // તૈયાર હોય ત્યારે `hydrate` ને કૉલ કરો
  hydrate()
  return () => {
    // જો જરૂર હોય તો ટીયરડાઉન (teardown) ફંક્શન પરત કરો
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
```

## Suspense સાથે ઉપયોગ {#using-with-suspense}

એસિંક કમ્પોનન્ટ્સ `<Suspense>` બિલ્ટ-ઇન કમ્પોનન્ટ સાથે વાપરી શકાય છે. `<Suspense>` અને એસિંક કમ્પોનન્ટ્સ વચ્ચેની ક્રિયાપ્રતિક્રિયા [Suspense માટે સમર્પિત પ્રકરણમાં](/guide/built-ins/suspense) દસ્તાવેજિત છે.
