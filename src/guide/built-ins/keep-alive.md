<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# કીપએલાઇવ (KeepAlive) {#keepalive}

`<KeepAlive>` એ એક બિલ્ટ-ઇન ઘટક છે જે આપણને બહુવિધ ઘટકો વચ્ચે ડાયનેમિકલી સ્વિચ કરતી વખતે કમ્પોનન્ટ ઇન્સ્ટન્સને કેશ (cache) કરવાની મંજૂરી આપે છે.

## મૂળભૂત વપરાશ (Basic Usage) {#basic-usage}

કમ્પોનન્ટ બેઝિક્સ (Component Basics) પ્રકરણમાં, આપણે `<component>` સ્પેશિયલ એલિમેન્ટનો ઉપયોગ કરીને [ડાયનેમિક કમ્પોનન્ટ્સ](/guide/essentials/component-basics#dynamic-components) માટેનો સિન્ટેક્સ રજૂ કર્યો હતો:

```vue-html
<component :is="activeComponent" />
```

ડિફોલ્ટ રૂપે, જ્યારે કોઈ સક્રિય કમ્પોનન્ટ ઇન્સ્ટન્સમાંથી સ્વિચ કરવામાં આવે ત્યારે તે અનમાઉન્ટ થઈ જશે. આનાથી તે ધરાવેલી કોઈપણ બદલાયેલી સ્ટેટ ખોવાઈ જશે. જ્યારે આ કમ્પોનન્ટ ફરીથી પ્રદર્શિત થાય છે, ત્યારે માત્ર પ્રારંભિક સ્ટેટ (initial state) સાથે નવો ઇન્સ્ટન્સ બનાવવામાં આવશે.

નીચેના ઉદાહરણમાં, આપણી પાસે બે સ્ટેટફુલ પ્રોજક્ટ્સ (components) છે - A માં કાઉન્ટર છે, જ્યારે B માં `v-model` દ્વારા ઇનપુટ સાથે સિંક કરેલ મેસેજ છે. તેમાંથી એકની સ્ટેટ અપડેટ કરવાનો પ્રયાસ કરો, સ્વિચ કરો અને પછી તેના પર પાછા સ્વિચ કરો:

<SwitchComponent />

તમે જોશો કે જ્યારે પાછા સ્વિચ કરવામાં આવે ત્યારે, અગાઉની બદલાયેલી સ્ટેટ રિસેટ થઈ ગઈ હશે.

સ્વિચ પર નવો ઘટક ઇન્સ્ટન્સ બનાવવો એ સામાન્ય રીતે ઉપયોગી વર્તન છે, પરંતુ આ કિસ્સામાં, આપણે ખરેખર ઇચ્છીએ છીએ કે બે ઘટક ઇન્સ્ટન્સ નિષ્ક્રિય હોય ત્યારે પણ સચવાયેલા રહે. આ સમસ્યાને ઉકેલવા માટે, આપણે આપણા ડાયનેમિક કમ્પોનન્ટને `<KeepAlive>` બિલ્ટ-ઇન કમ્પોનન્ટ સાથે લપેટી શકીએ છીએ:

```vue-html
<!-- નિષ્ક્રિય ઘટકો કેશ (cached) થશે! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

હવે, ઘટક સ્વિચ દરમિયાન સ્ટેટ સચવાયેલી રહેશે:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqtUsFOwzAM/RWrl4IGC+cqq2h3RFw495K12YhIk6hJi1DVf8dJSllBaAJxi+2XZz8/j0lhzHboeZIl1NadMA4sd73JKyVaozsHI9hnJqV+feJHmODY6RZS/JEuiL1uTTEXtiREnnINKFeAcgZUqtbKOqj7ruPKwe6s2VVguq4UJXEynAkDx1sjmeMYAdBGDFBLZu2uShre6ioJeaxIduAyp0KZ3oF7MxwRHWsEQmC4bXXDJWbmxpjLBiZ7DwptMUFyKCiJNP/BWUbO8gvnA+emkGKIgkKqRrRWfh+Z8MIWwpySpfbxn6wJKMGV4IuSs0UlN1HVJae7bxYvBuk+2IOIq7sLnph8P9u5DJv5VfpWWLaGqTzwZTCOM/M0IaMvBMihd04ruK+lqF/8Ajxms8EFbCiJxR8khsP6ncQosLWnWV6a/kUf2nqu75Fby04chA0iPftaYryhz6NBRLndtajpHZTWPio=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqtU8tugzAQ/JUVl7RKWveMXFTIseofcHHAiawasPxArRD/3rVNSEhbpVUrIWB3x7PM7jAkuVL3veNJmlBTaaFsVraiUZ22sO0alcNedw2s7kmIPHS1ABQLQDEBAMqWvwVQzffMSQuDz1aI6VreWpPCEBtsJppx4wE1s+zmNoIBNLdOt8cIjzut8XAKq3A0NAIY/QNveFEyi8DA8kZJZjlGALQWPVSSGfNYJjVvujIJeaxItuMyo6JVzoJ9VxwRmtUCIdDfNV3NJWam5j7HpPOY8BEYkwxySiLLP1AWkbK4oHzmXOVS9FFOSM3jhFR4WTNfRslcO54nSwJKcCD4RsnZmJJNFPXJEl8t88quOuc39fCrHalsGyWcnJL62apYNoq12UQ8DLEFjCMy+kKA7Jy1XQtPlRTVqx+Jx6zXOJI1JbH4jejg3T+KbswBzXnFlz9Tjes/V/3CjWEHDsL/OYNvdCE8Wu3kLUQEhy+ljh+brFFu)

</div>

:::tip
જ્યારે [in-DOM templates](/guide/essentials/component-basics#in-dom-template-parsing-caveats) માં ઉપયોગ થાય છે, ત્યારે તેને `<keep-alive>` તરીકે ઓળખવામાં આવવું જોઈએ.
:::

## ઇન્ક્લુડ / એક્સક્લુડ (Include / Exclude) {#include-exclude}

ડિફોલ્ટ રૂપે, `<KeepAlive>` અંદરના કોઈપણ કમ્પોનન્ટ ઇન્સ્ટન્સને કેશ કરશે. આપણે `include` અને `exclude` પ્રોપ્સ દ્વારા આ વર્તનને કસ્ટમાઇઝ કરી શકીએ છીએ. બંને પ્રોપ્સ અલ્પવિરામથી અલગ કરેલી સ્ટ્રિંગ, `RegExp` અથવા બંને પ્રકારો ધરાવતા એરે હોઈ શકે છે:

```vue-html
<!-- અલ્પવિરામથી અલગ કરેલી સ્ટ્રિંગ -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- regex (`v-bind` વાપરો) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- એરે (`v-bind` વાપરો) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

મેચ કમ્પોનન્ટના [`name`](/api/options-misc#name) ઓપ્શન સામે તપાસવામાં આવે છે, તેથી જે કમ્પોનન્ટ્સને `KeepAlive` દ્વારા કેશ કરવાની જરૂર છે તેમણે સ્પષ્ટપણે `name` ઓપ્શન જાહેર કરવો જોઈએ.

:::tip
વર્ઝન ૩.૨.૩૪ થી, `<script setup>` નો ઉપયોગ કરતા સિંગલ-ફાઇલ કમ્પોનન્ટ ફાઇલના નામ પરથી તેના `name` ઓપ્શનનું આપમેળે અનુમાન લગાવશે, જે મેન્યુઅલી નામ જાહેર કરવાની જરૂરિયાતને દૂર કરે છે.
:::

## મહત્તમ કેશ્ડ (Cached) ઇન્સ્ટન્સ {#max-cached-instances}

અમે `max` પ્રોપ દ્વારા કેશ કરી શકાય તેવા સોફ્ટવેર ઘટકોની મહત્તમ સંખ્યાને મર્યાદિત કરી શકીએ છીએ. જ્યારે `max` નિર્દિષ્ટ કરવામાં આવે છે, ત્યારે `<KeepAlive>` એક [LRU કેશ](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)>) ની જેમ વર્તે છે: જો કેશ કરેલ ઇન્સ્ટન્સની સંખ્યા નિર્દિષ્ટ મહત્તમ સંખ્યાને ઓળંગવાની હોય, તો નવા માટે જગ્યા બનાવવા માટે સૌથી ઓછા સમય પહેલાં એક્સેસ કરાયેલ કેશ ઇન્સ્ટન્સ નાશ પામશે.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## કેશ્ડ (Cached) ઇન્સ્ટન્સનું લાઇફસાયકલ (Lifecycle of Cached Instance) {#lifecycle-of-cached-instance}

જ્યારે કમ્પોનન્ટ ઇન્સ્ટન્સને DOM માંથી દૂર કરવામાં આવે છે પરંતુ તે `<KeepAlive>` દ્વારા કેશ કરાયેલ કમ્પોનન્ટ ટ્રીનો ભાગ હોય છે, ત્યારે તે અનમાઉન્ટ થવાને બદલે **નિષ્ક્રિય (deactivated)** સ્ટેટમાં જાય છે. જ્યારે કમ્પોનન્ટ ઇન્સ્ટન્સને કેશ કરેલા ટ્રીના ભાગ તરીકે DOM માં દાખલ કરવામાં આવે છે, ત્યારે તે **સક્રિય (activated)** થાય છે.

<div class="composition-api">

કીપ-એલાઈવ કમ્પોનન્ટ [`onActivated()`](/api/composition-api-lifecycle#onactivated) અને [`onDeactivated()`](/api/composition-api-lifecycle#ondeactivated) નો ઉપયોગ કરીને આ બે સ્ટેટ્સ માટે લાઇફસાયકલ હૂક્સ રજીસ્ટર કરી શકે છે:

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // પ્રારંભિક માઉન્ટ પર કૉલ કરવામાં આવે છે
  // અને દર વખતે જ્યારે તેને કેશમાંથી ફરીથી દાખલ કરવામાં આવે છે
})

onDeactivated(() => {
  // જ્યારે DOM માંથી કેશમાં દૂર કરવામાં આવે ત્યારે કૉલ કરવામાં આવે છે
  // અને જ્યારે અનમાઉન્ટ કરવામાં આવે ત્યારે પણ
})
</script>
```

</div>
<div class="options-api">

કીપ-એલાઈવ કમ્પોનન્ટ [`activated`](/api/options-lifecycle#activated) અને [`deactivated`](/api/options-lifecycle#deactivated) હૂક્સનો ઉપયોગ કરીને આ બે સ્ટેટ્સ માટે લાઇફસાયકલ હૂક્સ રજીસ્ટર કરી શકે છે:

```js
export default {
  activated() {
    // પ્રારંભિક માઉન્ટ પર કૉલ કરવામાં આવે છે
    // અને દર વખતે જ્યારે તેને કેશમાંથી ફરીથી દાખલ કરવામાં આવે છે
  },
  deactivated() {
    // જ્યારે DOM માંથી કેશમાં દૂર કરવામાં આવે ત્યારે કૉલ કરવામાં આવે છે
    // અને જ્યારે અનમાઉન્ટ કરવામાં આવે ત્યારે પણ
  }
}
```

</div>

નોંધ લો કે:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span> માઉન્ટ પર પણ કહેવાય છે, અને <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span> અનમાઉન્ટ પર પણ કહેવાય છે.

- બંને હૂક્સ માત્ર `<KeepAlive>` દ્વારા કેશ કરાયેલ રૂટ ઘટક માટે જ નહીં, પણ કેશ કરેલા ટ્રીમાં વંશજ ઘટકો (descendant components) માટે પણ કામ કરે છે.
---

**સંબંધિત**

- [`<KeepAlive>` API રિફરન્સ](/api/built-in-components#keepalive)
