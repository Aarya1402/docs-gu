# ટેલિપોર્ટ (Teleport) {#teleport}

 <VueSchoolLink href="https://vueschool.io/lessons/vue-3-teleport" title="ફ્રી Vue.js ટેલિપોર્ટ લેસન"/>

`<Teleport>` એ એક બિલ્ટ-ઇન કમ્પોનન્ટ છે જે આપણને કમ્પોનન્ટના ટેમ્પલેટના ભાગને તે ઘટકના DOM વંશવેલો (hierarchy) ની બહાર અસ્તિત્વમાં હોય તેવા DOM નોડમાં "ટેલિપોર્ટ" કરવાની મંજૂરી આપે છે.

## મૂળભૂત વપરાશ (Basic Usage) {#basic-usage}

ક્યારેક કમ્પોનન્ટના ટેમ્પલેટનો એક ભાગ લોજિકલ રીતે તેનો જ હોય છે, પરંતુ વિઝ્યુઅલ દૃષ્ટિકોણથી, તે DOM માં બીજે ક્યાંક પ્રદર્શિત થવો જોઈએ, કદાચ Vue એપ્લિકેશનની બહાર પણ.

આનું સૌથી સામાન્ય ઉદાહરણ ફુલ-સ્ક્રીન મોડલ (modal) બનાવતી વખતે છે. આદર્શ રીતે, અમે ઇચ્છીએ છીએ કે મોડલના બટન અને મોડલનો જ કોડ સમાન સિંગલ-ફાઇલ કમ્પોનન્ટમાં લખાય, કારણ કે તે બંને મોડલની ઓપન / ક્લોઝ સ્ટેટ સાથે સંબંધિત છે. પરંતુ તેનો અર્થ એ છે કે મોડલ બટન સાથે રેન્ડર કરવામાં આવશે, જે એપ્લિકેશનના DOM વંશવેલોમાં ઊંડે સુધી નેસ્ટેડ હશે. CSS દ્વારા મોડલનું પોઝિશનિંગ (positioning) કરતી વખતે આ કેટલીક મુશ્કેલ સમસ્યાઓ ઊભી કરી શકે છે.

નીચેના HTML સ્ટ્રક્ચરને ધ્યાનમાં લો.

```vue-html
<div class="outer">
  <h3>Vue ટેલિપોર્ટ ઉદાહરણ</h3>
  <div>
    <MyModal />
  </div>
</div>
```

અને અહીં `<MyModal>` નું અમલીકરણ (implementation) છે:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>હેલો મોડલ માંથી!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>હેલો મોડલ માંથી!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

કમ્પોનન્ટમાં મોડલ ખોલવા માટે ટ્રિગર કરવા માટે એક `<button>` છે, અને `.modal` ક્લાસ સાથેનું એક `<div>` છે, જેમાં મોડલનું કન્ટેન્ટ અને સેલ્ફ-ક્લોઝ કરવા માટેનું બટન હશે.

પ્રારંભિક HTML સ્ટ્રક્ચરની અંદર આ કમ્પોનન્ટનો ઉપયોગ કરતી વખતે, ઘણી સમસ્યાઓ આવી શકે છે:

- `position: fixed` એ એલિમેન્ટને ત્યારે જ વ્યુપોર્ટ (viewport) ની સાપેક્ષે મૂકે છે જ્યારે પૂર્વજ (ancestor) એલિમેન્ટ પાસે `transform`, `perspective` અથવા `filter` પ્રોપર્ટી સેટ ન હોય. જો, ઉદાહરણ તરીકે, અમે CSS ટ્રાન્સફોર્મ સાથે પૂર્વજ `<div class="outer">` ને એનિમેટ કરવાનો ઇરાદો રાખીએ છીએ, તો તે મોડલ લેઆઉટને તોડી નાખશે!

- મોડલનું `z-index` તેના સમાવિષ્ટ ઘટકો દ્વારા મર્યાદિત રહે છે. જો ત્યાં બીજું એલિમેન્ટ હોય જે `<div class="outer">` સાથે ઓવરલેપ થાય અને તેની પાસે ઉચ્ચ `z-index` હોય, તો તે અમારા મોડલને આવરી લેશે.

`<Teleport>` આપણને નેસ્ટેડ DOM સ્ટ્રક્ચરની બહાર નીકળવાની મંજૂરી આપીને, આ સમસ્યાઓ ઉકેલવાનો એક સ્વચ્છ માર્ગ પૂરો પાડે છે. ચાલો `<Teleport>` નો ઉપયોગ કરવા માટે `<MyModal>` માં ફેરફાર કરીએ:

```vue-html{3,8}
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>હેલો મોડલ માંથી!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

`<Teleport>` નું `to` ટાર્ગેટ CSS સિલેક્ટર સ્ટ્રિંગ અથવા વાસ્તવિક DOM નોડની અપેક્ષા રાખે છે. અહીં, આપણે આવશ્યકપણે Vue ને કહી રહ્યા છીએ કે "**આ ટેમ્પલેટ ફ્રેગમેન્ટને `body` ટૅગમાં ટેલિપોર્ટ કરો**".

તમે નીચેના બટનને ક્લિક કરી શકો છો અને તમારા બ્રાઉઝરના ડેવલૂલ્સ (devtools) દ્વારા `<body>` ટૅગ તપાસી શકો છો:

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo">
  <button @click="open = true">Open Modal</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">હેલો મોડલ માંથી!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

એનિમેટેડ મોડલ્સ બનાવવા માટે તમે [`<Transition>`](./transition) સાથે `<Teleport>` ને જોડી શકો છો - [અહીં ઉદાહરણ](/examples/#modal) જુઓ.

:::tip
જ્યારે `<Teleport>` કમ્પોનન્ટ માઉન્ટ થાય ત્યારે ટેલિપોર્ટ `to` ટાર્ગેટ પહેલાથી જ DOM માં હોવું જોઈએ. આદર્શ રીતે, આ સમગ્ર Vue એપ્લિકેશનની બહારનું એલિમેન્ટ હોવું જોઈએ. જો Vue દ્વારા રેન્ડર કરાયેલ અન્ય એલિમેન્ટને લક્ષ્ય બનાવતા હોવ, તો તમારે ખાતરી કરવાની જરૂર છે કે તે એલિમેન્ટ `<Teleport>` પહેલા માઉન્ટ થયેલ છે. જો તમે SSR નો ઉપયોગ કરી રહ્યાં છો, તો [SSR માં ટેલિપોર્ટ્સ હેન્ડલ કરવું](/guide/scaling-up/ssr#teleports) જુઓ.
:::

## કમ્પોનન્ટ્સ સાથે ઉપયોગ (Using with Components) {#using-with-components}

`<Teleport>` માત્ર રેન્ડર થયેલા DOM સ્ટ્રક્ચરને બદલે છે - તે ઘટકોના લોજિકલ વંશવેલો (hierarchy) ને અસર કરતું નથી. એટલે કે, જો `<Teleport>` માં કોઈ ઘટક હોય, તો તે ઘટક `<Teleport>` ધરાવતા પેરેન્ટ કમ્પોનન્ટનું લોજિકલ બાળક રહેશે. પ્રોપ્સ પાસ કરવાનું અને ઇવેન્ટ એમિટિંગ સમાન રીતે કાર્ય કરવાનું ચાલુ રાખશે.

આનો અર્થ એ પણ છે કે પેરેન્ટ કમ્પોનન્ટમાંથી ઇન્જેક્શન અપેક્ષા મુજબ કામ કરે છે, અને તે કે ચાઇલ્ડ કમ્પોનન્ટ Vue Devtools માં પેરેન્ટ કમ્પોનન્ટની નીચે નેસ્ટેડ જ રહેશે, તે જે જગ્યાએ વાસ્તવિક કન્ટેન્ટ ખસેડવામાં આવ્યું છે ત્યાં મૂકવાને બદલે.

## ટેલિપોર્ટ અક્ષમ (Disable) કરવું (Disabling Teleport) {#disabling-teleport}

કેટલાક કિસ્સાઓમાં, અમે `<Teleport>` ને શરતી રીતે અક્ષમ કરવા માગીએ છીએ. ઉદાહરણ તરીકે, અમે ડેસ્કટોપ માટે ઓવરલે તરીકે કમ્પોનન્ટ રેન્ડર કરવા માગીએ છીએ, પરંતુ મોબાઇલ પર ઇનલાઇન (inline). `<Teleport>` `disabled` પ્રોપને સપોર્ટ કરે છે જે ગતિશીલ રીતે ટૉગલ કરી શકાય છે:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

અમે પછી ગતિશીલ રીતે `isMobile` ને અપડેટ કરી શકીએ છીએ.

## સમાન ટાર્ગેટ પર બહુવિધ ટેલિપોર્ટ (Multiple Teleports on the Same Target) {#multiple-teleports-on-the-same-target}

એક પુનઃઉપયોગી `<Modal>` કમ્પોનન્ટ એક સામાન્ય ઉપયોગ હોઈ શકે છે, જેમાં એક જ સમયે બહુવિધ ઇન્સ્ટન્સ સક્રિય હોવાની સંભાવના હોય છે. આ પ્રકારના દૃશ્ય માટે, બહુવિધ `<Teleport>` કમ્પોનન્ટ્સ તેમના કન્ટેન્ટને સમાન ટાર્ગેટ એલિમેન્ટ પર માઉન્ટ કરી શકે છે. ઓર્ડર એક સરળ એપેન્ડ (append) હશે, જેમાં પછીના માઉન્ટ્સ અગાઉના માઉન્ટ્સ પછી સ્થિત હશે, પરંતુ બધા ટાર્ગેટ એલિમેન્ટની અંદર હશે.

નીચેના વપરાશને જોતા:

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

રેન્ડર થયેલ પરિણામ આ હશે:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

## વિલંબિત (Deferred) ટેલિપોર્ટ <sup class="vt-badge" data-text="3.5+" /> {#deferred-teleport}

Vue ૩.૫ અને તેનાથી ઉપરના વર્ઝનમાં, અમે એપ્લિકેશનના અન્ય ભાગો માઉન્ટ થાય ત્યાં સુધી ટેલિપોર્ટના ટાર્ગેટ રિઝોલ્વિંગ (resolving) ને વિલંબિત કરવા માટે `defer` પ્રોપનો ઉપયોગ કરી શકીએ છીએ. આ ટેલિપોર્ટને કન્ટેનર એલિમેન્ટને ટાર્ગેટ કરવાની મંજૂરી આપે છે જે Vue દ્વારા રેન્ડર કરવામાં આવે છે, પરંતુ કમ્પોનન્ટ ટ્રીના પછીના ભાગમાં:

```vue-html
<Teleport defer to="#late-div">...</Teleport>

<!-- ટેમ્પલેટમાં ક્યાંક પછી -->
<div id="late-div"></div>
```

નોંધ કરો કે ટાર્ગેટ એલિમેન્ટ ટેલિપોર્ટ સાથે સમાન માઉન્ટ / અપડેટ ટીક (tick) માં રેન્ડર થયેલ હોવું જોઈએ - એટલે કે જો `<div>` માત્ર એક સેકન્ડ પછી માઉન્ટ થાય, તો ટેલિપોર્ટ હજી પણ ભૂલની જાણ કરશે. ડિફર (defer) `mounted` લાઇફસાયકલ હૂક જેવી જ રીતે કામ કરે છે.

---

**સંબંધિત**

- [`<Teleport>` API રિફરન્સ](/api/built-in-components#teleport)
- [SSR માં ટેલિપોર્ટ હેન્ડલ કરવું](/guide/scaling-up/ssr#teleports)
