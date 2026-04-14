# રાઉટીંગ (Routing) {#routing}

## ક્લાયન્ટ-સાઇડ વિરુદ્ધ સર્વર-સાઇડ રાઉટીંગ {#client-side-vs-server-side-routing}

સર્વર બાજુ પર રાઉટીંગનો અર્થ એ છે કે વપરાશકર્તા જે URL પાથની મુલાકાત લઈ રહ્યો છે તેના આધારે સર્વર પ્રતિસાદ (response) મોકલે છે. જ્યારે આપણે પરંપરાગત સર્વર-રેન્ડર્ડ વેબ એપ્લિકેશનમાં લિંક પર ક્લિક કરીએ છીએ, ત્યારે બ્રાઉઝર સર્વર પાસેથી HTML પ્રતિસાદ પ્રાપ્ત કરે છે અને નવા HTML સાથે સમગ્ર પેજને ફરીથી લોડ કરે છે.

જો કે, [સિંગલ-પેજ એપ્લિકેશન (Single-Page Application)](https://developer.mozilla.org/en-US/docs/Glossary/SPA) (SPA) માં ક્લાયન્ટ-સાઇડ JavaScript નેવિગેશનને અટકાવી શકે છે, ગતિશીલ રીતે નવો ડેટા મેળવી શકે છે અને સંપૂર્ણ પેજ રીલોડ કર્યા વિના વર્તમાન પેજને અપડેટ કરી શકે છે. આના પરિણામે સામાન્ય રીતે વધુ ઝડપી વપરાશકર્તા અનુભવ મળે છે, ખાસ કરીને એવા કિસ્સાઓ માટે કે જે વાસ્તવિક "એપ્લિકેશન્સ" જેવા વધુ હોય છે, જ્યાં વપરાશકર્તા લાંબા સમય સુધી ઘણી બધી ક્રિયાપ્રતિક્રિયાઓ કરે તેવી અપેક્ષા રાખવામાં આવે છે.

આવા SPAs માં, "રાઉટીંગ" ક્લાયન્ટ બાજુએ, બ્રાઉઝરમાં કરવામાં આવે છે. ક્લાયન્ટ-સાઇડ રાઉટર બ્રાઉઝર APIs જેમ કે [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) અથવા [`hashchange` ઇવેન્ટ](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) નો ઉપયોગ કરીને એપ્લિકેશનના રેન્ડર કરેલા વ્યુને મેનેજ કરવા માટે જવાબદાર છે.

## સત્તાવાર રાઉટર (Official Router) {#official-router}

<!-- TODO update links -->
<div>
  <VueSchoolLink href="https://vueschool.io/courses/vue-router-4-for-everyone" title="ફ્રી Vue રાઉટર કોર્સ">
    Vue School પર મફત વિડિઓ કોર્સ જુઓ
  </VueSchoolLink>
</div>

Vue SPAs બનાવવા માટે ખૂબ જ અનુકૂળ છે. મોટાભાગના SPAs માટે, સત્તાવાર રીતે સપોર્ટેડ [Vue Router લાઇબ્રેરી](https://github.com/vuejs/router) નો ઉપયોગ કરવાની ભલામણ કરવામાં આવે છે. વધુ વિગતો માટે, Vue Router ના [દસ્તાવેજો](https://router.vuejs.org/) જુઓ.

## શરૂઆતથી (from Scratch) સાદું રાઉટીંગ {#simple-routing-from-scratch}

જો તમને માત્ર ખૂબ જ સાદા રાઉટીંગની જરૂર હોય અને તમે ફુલ-ફીચર્ડ રાઉટર લાઇબ્રેરીનો સમાવેશ કરવા માંગતા ન હોવ, તો તમે [ડાયનેમિક કમ્પોનન્ટ્સ](/guide/essentials/component-basics#dynamic-components) સાથે તેમ કરી શકો છો અને બ્રાઉઝરની [`hashchange` ઇવેન્ટ્સ](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) સાંભળીને અથવા [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) નો ઉપયોગ કરીને વર્તમાન ઘટક સ્થિતિને અપડેટ કરી શકો છો.

અહીં એક સામાન્ય ઉદાહરણ છે:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">હોમ (Home)</a> |
  <a href="#/about">વિશે (About)</a> |
  <a href="#/non-existent-path">તૂટેલી લિંક</a>
  <component :is="currentView" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNptUk1vgkAQ/SsTegAThZp4MmhikzY9mKanXkoPWxjLRpgly6JN1P/eWb5Eywlm572ZN2/m5GyKwj9U6CydsIy1LAyUaKpiHZHMC6UNnEDjbgqxyovKYAIX2GmVg8sktwe9qhzbdz+wga15TW++VWX6fB3dAt6UeVEVJT2me2hhEcWKSgOamVjCCk4RAbiBu6xbT5tI2ML8VDeI6HLlxZXWSOZdmJTJPJB3lJSoo5+pWBipyE9FmU4soU2IJHk+MGUrS4OE2nMtIk4F/aA7BW8Cq3WjYlDbP4isQu4wVp0F1Q1uFH1IPDK+c9cb1NW8B03tyJ//uvhlJmP05hM4n60TX/bb2db0CoNmpbxMDgzmRSYMcgQQCkjZhlXkPASRs7YmhoFYw/k+WXvKiNrTcQgpmuFv7ZOZFSyQ4U9a7ZFgK2lvSTXFDqmIQbCUJTMHFkQOBAwKg16kM3W6O7K3eSs+nbeK+eee1V/XKK0dY4Q3vLhR6uJxMUK8/AFKaB6k)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">હોમ (Home)</a> |
  <a href="#/about">વિશે (About)</a> |
  <a href="#/non-existent-path">તૂટેલી લિંક</a>
  <component :is="currentView" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNptUstO6zAQ/ZVR7iKtVJKLxCpKK3Gli1ggxIoNZmGSKbFoxpEzoUi0/87YeVBKNonHPmfOmcdndN00yXuHURblbeFMwxtFpm6sY7i1NcLW2RriJPWBB8bT8/WL7Xh6D9FPwL3lG9tROWHGiwGmqLDUMjhhYgtr+FQEEKdxFqRXfaR9YrkKAoqOnocfQaDEre523PNKzXqx7M8ADrlzNEYAReccEj9orjLYGyrtPtnZQrOxlFS6rXqgZJdPUC5s3YivMhuTDCkeDe6/dSalvognrkybnIgl7c4UuLhcwuHgS3v2/7EPvzRruRXJ7/SDU12W/98l451pGQndIvaWi0rTK8YrEPx64ymKFQOce5DOzlfs4cdlkA+NzdNpBSRgrJudZpQIINdQOdyuVfQnVdHGzydP9QYO549hXIII45qHkKUL/Ail8EUjBgX+z9k3JLgz9OZJgeInYElAkJlWmCcDUBGkAsrTyWS0isYV9bv803x1OTiWwzlrWtxZ2lDGDO90mWepV3+vZojHL3QQKQE=)

</div>
