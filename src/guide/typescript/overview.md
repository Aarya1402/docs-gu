---
outline: deep
---

# Vue સાથે TypeScript નો ઉપયોગ કરવો {#using-vue-with-typescript}

TypeScript જેવી ટાઇપ સિસ્ટમ બિલ્ડ સમયે સ્ટેટિક એનાલિસિસ દ્વારા ઘણી બધી સામાન્ય ભૂલો શોધી શકે છે. આ પ્રોડક્શનમાં રનટાઇમ એરર્સની શક્યતા ઘટાડે છે, અને અમને મોટા પાયે એપ્લિકેશન્સમાં કોડને વધુ વિશ્વાસપૂર્વક રિફેક્ટર કરવાની મંજૂરી આપે છે. TypeScript IDE માં ટાઇપ-આધારિત ઓટો-કમ્પ્લીશન (auto-completion) દ્વારા ડેવલપરના કામને પણ સરળ બનાવે છે.

Vue પોતે TypeScript માં લખાયેલું છે અને ફર્સ્ટ-ક્લાસ TypeScript સપોર્ટ પૂરો પાડે છે. તમામ ઓફિશિયલ Vue પેકેજો બંડલ ટાઇપ ડિક્લેરેશન (bundled type declarations) સાથે આવે છે જે તરત જ કામ કરવા જોઈએ.

## પ્રોજેક્ટ સેટઅપ (Project Setup) {#project-setup}

[`create-vue`](https://github.com/vuejs/create-vue), જે ઓફિશિયલ પ્રોજેક્ટ સ્કેફોલ્ડિંગ ટૂલ છે, તે [Vite](https://vite.dev/)-સંચાલિત, TypeScript-રેડી Vue પ્રોજેક્ટ સ્કેફોલ્ડ કરવા માટેના વિકલ્પો પ્રદાન કરે છે.

### વિહંગાવલોકન (Overview) {#overview}

Vite-આધારિત સેટઅપ સાથે, ડેવ સર્વર અને બંડલર માત્ર ટ્રાન્સપિલેશન (transpilation-only) કરે છે અને કોઈ ટાઇપ-ચેકિંગ કરતા નથી. આ સુનિશ્ચિત કરે છે કે TypeScript નો ઉપયોગ કરતી વખતે પણ Vite ડેવ સર્વર અત્યંત ઝડપી રહે છે.

- ડેવલપમેન્ટ દરમિયાન, અમે ટાઇપ એરર્સ (type errors) પર તાત્કાલિક પ્રતિસાદ માટે સારા [IDE સેટઅપ](#ide-support) પર આધાર રાખવાની ભલામણ કરીએ છીએ.

- જો SFCs નો ઉપયોગ કરી રહ્યાં હોવ, તો કમાન્ડ લાઇન ટાઇપ ચેકિંગ અને ટાઇપ ડિક્લેરેશન જનરેશન માટે [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) યુટિલિટીનો ઉપયોગ કરો. `vue-tsc` એ `tsc` ની ઉપરનું આવરણ છે, જે TypeScript નું પોતાનું કમાન્ડ લાઇન ઇન્ટરફેસ છે. તે મોટાભાગે `tsc` ની જેમ જ કામ કરે છે સિવાય કે તે TypeScript ફાઇલો ઉપરાંત Vue SFCs ને પણ સપોર્ટ કરે છે. તમે Vite ડેવ સર્વરની સમાંતર વૉચ મોડ (watch mode) માં `vue-tsc` ચલાવી શકો છો, અથવા [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) જેવા Vite પ્લગિનનો ઉપયોગ કરી શકો છો જે અલગ વર્કર થ્રેડમાં ચેક્સ ચલાવે છે.

- Vue CLI પણ TypeScript સપોર્ટ પૂરો પાડે છે, પરંતુ હવે તેની ભલામણ કરવામાં આવતી નથી. [નીચેની નોંધો](#note-on-vue-cli-and-ts-loader) જુઓ.

### IDE સપોર્ટ (IDE Support) {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) (VS Code) ને તેની ઉત્તમ આઉટ-ઓફ-ધ-બોક્સ TypeScript સપોર્ટ માટે ભારપૂર્વક ભલામણ કરવામાં આવે છે.

  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (અગાઉ Volar) એ ઓફિશિયલ VS Code એક્સ્ટેંશન છે જે Vue SFCs ની અંદર TypeScript સપોર્ટ પૂરો પાડે છે, સાથે સાથે બીજી ઘણી સારી સુવિધાઓ પણ આપે છે.

    :::tip
    Vue - Official એક્સ્ટેંશન Vue 2 માટેના અમારા અગાઉના સત્તાવાર VS Code એક્સ્ટેંશન [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) ને બદલે છે. જો તમે હાલમાં Vetur ઇન્સ્ટોલ કરેલ હોય, તો Vue 3 પ્રોજેક્ટ્સમાં તેને અક્ષમ કરવાની ખાતરી કરો.
    :::

- [WebStorm](https://www.jetbrains.com/webstorm/) પણ TypeScript અને Vue બંને માટે આઉટ-ઓફ-ધ-બોક્સ સપોર્ટ પૂરો પાડે છે. અન્ય JetBrains IDEs પણ તેમને સપોર્ટ કરે છે, કાં તો આઉટ-ઓફ-ધ-બોક્સ અથવા [ફ્રી પ્લગિન](https://plugins.jetbrains.com/plugin/9442-vue-js) દ્વારા. ૨૦૨૩.૨ વર્ઝન મુજબ, WebStorm અને Vue પ્લગિન Vue લેંગ્વેજ સર્વર માટે બિલ્ટ-ઇન સપોર્ટ સાથે આવે છે. તમે Settings > Languages & Frameworks > TypeScript > Vue હેઠળ તમામ TypeScript વર્ઝન પર Volar ઇન્ટિગ્રેશનનો ઉપયોગ કરવા માટે Vue સર્વિસ સેટ કરી શકો છો. ડિફોલ્ટ રૂપે, TypeScript વર્ઝન ૫.૦ અને તેનાથી ઉપરના વર્ઝન માટે Volar નો ઉપયોગ કરવામાં આવશે.

### `tsconfig.json` કોન્ફિગર કરવું {#configuring-tsconfig-json}

`create-vue` દ્વારા સ્કેફોલ્ડ કરાયેલા પ્રોજેક્ટ્સમાં પ્રી-કોન્ફિગર કરેલ `tsconfig.json` શામેલ હોય છે. બેઝ કોન્ફિગ [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) પેકેજમાં એબ્સ્ટ્રેક્ટ કરવામાં આવ્યું છે. પ્રોજેક્ટની અંદર, અમે અલગ-અલગ વાતાવરણમાં ચાલતા કોડ માટે સાચા ટાઇપ્સ (correct types) સુનિશ્ચિત કરવા માટે [પ્રોજેક્ટ રિફરન્સ (Project References)](https://www.typescriptlang.org/docs/handbook/project-references.html) નો ઉપયોગ કરીએ છીએ (દા.ત. એપ કોડ અને ટેસ્ટ કોડમાં અલગ-અલગ ગ્લોબલ વેરિએબલ્સ હોવા જોઈએ).

મેન્યુઅલી `tsconfig.json` કોન્ફિગર કરતી વખતે, કેટલીક નોંધપાત્ર ઓપ્શન્સમાં નીચેનાનો સમાવેશ થાય છે:

- [`compilerOptions.isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) ને `true` સેટ કરવામાં આવે છે કારણ કે Vite TypeScript ને ટ્રાન્સપાઈલ કરવા માટે [esbuild](https://esbuild.github.io/) નો ઉપયોગ કરે છે અને તે સિંગલ-ફાઈલ ટ્રાન્સપાઈલ મર્યાદાઓને આધીન છે. [`compilerOptions.verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) એ [`isolatedModules` નો સુપરસેટ](https://github.com/microsoft/TypeScript/issues/53601) છે અને તે પણ એક સારી પસંદગી છે - તે જ `@vue/tsconfig` વાપરે છે.

- જો તમે Options API નો ઉપયોગ કરી રહ્યાં હોવ, તો ઘટક વિકલ્પોમાં `this` ના ટાઇપ ચેકિંગનો લાભ લેવા માટે તમારે [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) ને `true` સેટ કરવાની જરૂર છે (અથવા ઓછામાં ઓછું [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) સક્ષમ કરો, જે `strict` ફ્લેગનો એક ભાગ છે). નહિંતર `this` ને `any` તરીકે ગણવામાં આવશે.

- જો તમે તમારા બિલ્ડ ટૂલમાં રીસોલ્વર એલિયાસ (resolver aliases) કોન્ફિગર કરેલા હોય, ઉદાહરણ તરીકે `create-vue` પ્રોજેક્ટમાં ડિફોલ્ટ રૂપે કોન્ફિગર કરેલ `@/*` એલિયાસ, તો તમારે તેને TypeScript માટે [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths) દ્વારા પણ કોન્ફિગર કરવાની જરૂર છે.

- જો તમે Vue સાથે TSX નો ઉપયોગ કરવાનો ઈરાદો ધરાવતા હોવ, તો [`compilerOptions.jsx`](https://www.typescriptlang.org/tsconfig#jsx) ને `"preserve"` સેટ કરો અને [`compilerOptions.jsxImportSource`](https://www.typescriptlang.org/tsconfig#jsxImportSource) ને `"vue"` સેટ કરો.

આ પણ જુઓ:

- [ઓફિશિયલ TypeScript કમ્પાઇલર ઓપ્શન્સ ડોક્યુમેન્ટેશન](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [esbuild TypeScript કમ્પાઇલેશન ચેતવણીઓ](https://esbuild.github.io/content-types/#typescript-caveats)

### Vue CLI અને `ts-loader` પર નોંધ {#note-on-vue-cli-and-ts-loader}

Vue CLI જેવા વેબપેક-આધારિત સેટઅપ્સમાં, મોડ્યુલ ટ્રાન્સફોર્મ પાઇપલાઇનના ભાગરૂપે ટાઇપ ચેકિંગ કરવું સામાન્ય છે, ઉદાહરણ તરીકે `ts-loader` સાથે. જો કે, આ એક શુદ્ધ ઉકેલ નથી કારણ કે ટાઇપ સિસ્ટમને ટાઇપ ચેકિંગ કરવા માટે સમગ્ર મોડ્યુલ ગ્રાફના જ્ઞાનની જરૂર હોય છે. વ્યક્તિગત મોડ્યુલનું ટ્રાન્સફોર્મ સ્ટેપ ફક્ત કાર્ય માટે યોગ્ય સ્થાન નથી. તે નીચેની સમસ્યાઓ તરફ દોરી જાય છે:

- `ts-loader` ફક્ત પોસ્ટ-ટ્રાન્સફોર્મ કોડને ટાઇપ ચેક કરી શકે છે. આ IDE માં અથવા `vue-tsc` માં જોયેલી એરર્સ સાથે સંમત થતું નથી, જે સીધા જ સોર્સ કોડ પર મેપ કરે છે.

- ટાઇપ ચેકિંગ ધીમું હોઈ શકે છે. જ્યારે તે કોડ ટ્રાન્સફોર્મેશન સાથે સમાન થ્રેડ / પ્રક્રિયામાં કરવામાં આવે છે, ત્યારે તે સમગ્ર એપ્લિકેશનની બિલ્ડ સ્પીડને નોંધપાત્ર રીતે અસર કરે છે.

- અમારી પાસે પહેલેથી જ અમારા IDE માં અલગ પ્રક્રિયામાં ટાઇપ ચેકિંગ ચાલી રહ્યું છે, તેથી ડેવલપમેન્ટ અનુભવને ધીમો કરવાનો ખર્ચ એ સારો ટ્રેડ-ઓફ નથી.

જો તમે અત્યારે Vue CLI દ્વારા Vue 3 + TypeScript નો ઉપયોગ કરી રહ્યાં છો, તો અમે ભારપૂર્વક Vite પર સ્થળાંતર (migrate) કરવાની ભલામણ કરીએ છીએ. અમે ટ્રાન્સપાઈલ-ઓન્લી TS સપોર્ટને સક્ષમ કરવા માટે CLI ઓપ્શન્સ પર પણ કામ કરી રહ્યા છીએ, જેથી તમે ટાઇપ ચેકિંગ માટે `vue-tsc` પર સ્વિચ કરી શકો.

## સામાન્ય ઉપયોગની નોંધો (General Usage Notes) {#general-usage-notes}

### `defineComponent()` {#definecomponent}

TypeScript ને ઘટક વિકલ્પોની અંદરના ટાઇપ્સને યોગ્ય રીતે અનુમાન કરવા દેવા માટે, આપણે [`defineComponent()`](/api/general#definecomponent) સાથે ઘટકોને વ્યાખ્યાયિત કરવાની જરૂર છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // ટાઇપ ઇન્ફરન્સ સક્ષમ છે
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // ટાઇપ: string | undefined
    this.msg // ટાઇપ: string
    this.count // ટાઇપ: number
  }
})
```

`defineComponent()` જ્યારે `<script setup>` વિના કમ્પોઝિશન API નો ઉપયોગ કરતા હોય ત્યારે `setup()` માં પસાર થતા પ્રોપ્સના અનુમાનને પણ સપોર્ટ કરે છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // ટાઇપ ઇન્ફરન્સ સક્ષમ છે
  props: {
    message: String
  },
  setup(props) {
    props.message // ટાઇપ: string | undefined
  }
})
```

આ પણ જુઓ:

- [વેબપેક ટ્રી-શેકિંગ પર નોંધ (Note on webpack Treeshaking)](/api/general#note-on-webpack-treeshaking)
- [`defineComponent` માટે ટાઇપ ટેસ્ટ્સ](https://github.com/vuejs/core/blob/main/packages-private/dts-test/defineComponent.test-d.tsx)

:::tip
`defineComponent()` સાદા JavaScript માં વ્યાખ્યાયિત ઘટકો માટે પણ ટાઇપ ઇન્ફરન્સને સક્ષમ કરે છે.
:::

### સિંગલ-ફાઇલ ઘટકો (SFCs) માં ઉપયોગ {#usage-in-single-file-components}

SFCs માં TypeScript નો ઉપયોગ કરવા માટે, `<script>` ટૅગ્સમાં `lang="ts"` એટ્રિબ્યુટ ઉમેરો. જ્યારે `lang="ts"` હોય છે, ત્યારે તમામ ટેમ્પલેટ એક્સપ્રેશન્સમાં પણ કડક ટાઇપ ચેકિંગનો લાભ મળે છે.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- ટાઇપ ચેકિંગ અને ઓટો-કમ્પ્લીશન સક્ષમ છે -->
  {{ count.toFixed(2) }}
</template>
```

`lang="ts"` નો ઉપયોગ `<script setup>` સાથે પણ કરી શકાય છે:

```vue
<script setup lang="ts">
// TypeScript સક્ષમ છે
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- ટાઇપ ચેકિંગ અને ઓટો-કમ્પ્લીશન સક્ષમ છે -->
  {{ count.toFixed(2) }}
</template>
```

### ટેમ્પલેટ્સમાં TypeScript {#typescript-in-templates}

જ્યારે `<script lang="ts">` અથવા `<script setup lang="ts">` નો ઉપયોગ કરવામાં આવે ત્યારે `<template>` બાઇન્ડિંગ એક્સપ્રેશન્સમાં TypeScript ને પણ સપોર્ટ કરે છે. આ એવા કિસ્સાઓમાં ઉપયોગી છે જ્યાં તમારે ટેમ્પલેટ એક્સપ્રેશન્સમાં ટાઇપ કાસ્ટિંગ (type casting) કરવાની જરૂર હોય.

અહીં એક ઉદાહરણ છે:

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- ભૂલ કારણ કે x સ્ટ્રિંગ હોઈ શકે છે -->
  {{ x.toFixed(2) }}
</template>
```

આને ઇનલાઇન ટાઇપ કાસ્ટ સાથે ઉકેલી શકાય છે:

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip
જો Vue CLI અથવા વેબપેક-આધારિત સેટઅપનો ઉપયોગ કરી રહ્યાં હોવ, તો ટેમ્પલેટ એક્સપ્રેશન્સમાં TypeScript માટે `vue-loader@^16.8.0` જરૂરી છે.
:::

### TSX સાથે ઉપયોગ {#usage-with-tsx}

Vue JSX / TSX સાથે ઘટકો લખવાને પણ સપોર્ટ કરે છે. વિગતો [Render Function & JSX](/guide/extras/render-function.html#jsx-tsx) ગાઇડમાં આવરી લેવામાં આવી છે.

## જેનેરિક ઘટકો (Generic Components) {#generic-components}

જેનેરિક ઘટકો બે કિસ્સાઓમાં સપોર્ટેડ છે:

- SFCs માં: [`generic` એટ્રિબ્યુટ સાથે `<script setup>`](/api/sfc-script-setup.html#generics)
- રેન્ડર ફંક્શન / JSX ઘટકો: [`defineComponent()` નું ફંક્શન સિગ્નેચર](/api/general.html#function-signature)

## API-વિશિષ્ટ વાનગીઓ (API-Specific Recipes) {#api-specific-recipes}

- [કોમ્પોઝિશન API સાથે TypeScript](./composition-api)
- [વિકલ્પો (Options) API સાથે TypeScript](./options-api)
