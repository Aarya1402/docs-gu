<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# ટૂલિંગ (Tooling) {#tooling}

## ઓનલાઇન અજમાવી જુઓ (Try It Online) {#try-it-online}

Vue SFCs ને અજમાવવા માટે તમારે તમારા મશીન પર કંઈપણ ઇન્સ્ટોલ કરવાની જરૂર નથી - ત્યાં ઓનલાઇન પ્લેગ્રાઉન્ડ્સ છે જે તમને બ્રાઉઝરમાં જ તેમ કરવાની મંજૂરી આપે છે:

- [Vue SFC Playground](https://play.vuejs.org)
  - હંમેશા લેટેસ્ટ કમિટમાંથી ડિપ્લોય કરવામાં આવે છે
  - કમ્પોનન્ટ કમ્પાઇલેશન પરિણામો તપાસવા માટે રચાયેલ છે
- [StackBlitz પર Vue + Vite](https://vite.new/vue)
  - બ્રાઉઝરમાં વાસ્તવિક Vite ડેવ સર્વર ચલાવતું IDE જેવું વાતાવરણ
  - લોકલ સેટઅપની સૌથી નજીક

બગ્સની જાણ કરતી વખતે રિપ્રોડક્શન્સ (reproductions) આપવા માટે આ ઓનલાઇન પ્લેગ્રાઉન્ડ્સનો ઉપયોગ કરવાની પણ ભલામણ કરવામાં આવે છે.

## પ્રોજેક્ટ સ્કેફોલ્ડિંગ (Project Scaffolding) {#project-scaffolding}

### Vite {#vite}

[Vite](https://vite.dev/) એ ફર્સ્ટ-ક્લાસ Vue SFC સપોર્ટ ધરાવતું હળવું અને ઝડપી બિલ્ડ ટૂલ છે. તે ઇવાન યુ દ્વારા બનાવવામાં આવ્યું છે, જે Vue ના લેખક પણ છે!

Vite + Vue સાથે શરૂઆત કરવા માટે, બસ ચલાવો:

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```
  
```sh [yarn]
# Yarn Modern (v2+) માટે
$ yarn create vue@latest
  
# Yarn ^v4.11 માટે
$ yarn dlx create-vue@latest
```
  
```sh [bun]
$ bun create vue@latest
```

:::

આ કમાન્ડ સત્તાવાર Vue પ્રોજેક્ટ સ્કેફોલ્ડિંગ ટૂલ [create-vue](https://github.com/vuejs/create-vue) ને ઇન્સ્ટોલ અને એક્ઝિક્યુટ કરશે.

- Vite વિશે વધુ જાણવા માટે, [Vite દસ્તાવેજો](https://vite.dev/) તપાસો.
- Vite પ્રોજેક્ટમાં Vue-વિશિષ્ટ વર્તનને કોન્ફિગર કરવા માટે, ઉદાહરણ તરીકે Vue કમ્પાઇલરને ઓપ્શન્સ પાસ કરવા માટે, [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme) માટેના દસ્તાવેજો તપાસો.

ઉપર જણાવેલ બંને ઓનલાઇન પ્લેગ્રાઉન્ડ્સ ફાઇલોને Vite પ્રોજેક્ટ તરીકે ડાઉનલોડ કરવાનું પણ સપોર્ટ કરે છે.

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/) એ Vue માટે સત્તાવાર webpack-આધારિત ટૂલચાઇન છે. તે હવે મેન્ટેનન્સ મોડમાં છે અને જ્યાં સુધી તમે વિશિષ્ટ લિંક-ઓન્લી ફીચર્સ પર આધાર રાખતા ન હોવ ત્યાં સુધી અમે Vite સાથે નવા પ્રોજેક્ટ્સ શરૂ કરવાની ભલામણ કરીએ છીએ. Vite મોટાભાગના કિસ્સાઓમાં શ્રેષ્ઠ ડેવલપર અનુભવ પ્રદાન કરશે.

Vue CLI થી Vite પર માઇગ્રેટ કરવા વિશેની માહિતી માટે:

- [VueSchool.io તરફથી Vue CLI -> Vite માઇગ્રેશન ગાઇડ](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [ઓટો માઇગ્રેશનમાં મદદ કરતા સાધનો / પ્લગિન્સ](https://github.com/vitejs/awesome-vite#vue-cli)

### ઇન-બ્રાઉઝર ટેમ્પલેટ કમ્પાઇલેશન પર નોંધ {#note-on-in-browser-template-compilation}

બિલ્ડ સ્ટેપ વિના Vue નો ઉપયોગ કરતી વખતે, કમ્પોનન્ટ ટેમ્પલેટ્સ કાં તો પેજના HTML માં સીધા લખવામાં આવે છે અથવા ઇનલાઇન JavaScript સ્ટ્રિંગ્સ તરીકે લખવામાં આવે છે. આવા કિસ્સાઓમાં, વેગમાં ટેમ્પલેટ કમ્પાઇલેશન કરવા માટે Vue એ બ્રાઉઝર પર ટેમ્પલેટ કમ્પાઇલર મોકલવાની જરૂર છે. બીજી બાજુ, જો આપણે બિલ્ડ સ્ટેપ સાથે ટેમ્પલેટ્સને પ્રી-કમ્પાઇલ કરીએ તો કમ્પાઇલર બિનજરૂરી હશે. ક્લાયંટ બંડલ સાઈઝ ઘટાડવા માટે, Vue વિવિધ ઉપયોગના કિસ્સાઓ માટે ઓપ્ટિમાઇઝ કરેલ [વિવિધ "બિલ્ડ્સ"](https://unpkg.com/browse/vue@3/dist/) પ્રદાન કરે છે.

- `vue.runtime.*` થી શરૂ થતી બિલ્ડ ફાઇલો **runtime-only builds** છે: તેમાં કમ્પાઇલરનો સમાવેશ થતો નથી. આ બિલ્ડ્સનો ઉપયોગ કરતી વખતે, બધા ટેમ્પલેટ્સ બિલ્ડ સ્ટેપ દ્વારા પ્રી-કમ્પાઇલ કરેલા હોવા જોઈએ.

- જે બિલ્ડ ફાઇલોમાં `.runtime` નો સમાવેશ થતો નથી તે **full builds** છે: તેમાં કમ્પાઇલર શામેલ છે અને બ્રાઉઝરમાં સીધા ટેમ્પલેટ્સ કમ્પાઇલ કરવાનું સપોર્ટ કરે છે. જો કે, તેઓ પેલોડમાં ~૧૪kb નો વધારો કરશે.

અમારા ડિફોલ્ટ ટૂલિંગ સેટઅપ્સ રનટાઇમ-ઓન્લી બિલ્ડનો ઉપયોગ કરે છે કારણ કે SFCs માંના તમામ ટેમ્પલેટ્સ પ્રી-કમ્પાઇલ કરેલા હોય છે. જો કોઈ કારણોસર, તમારે બિલ્ડ સ્ટેપ સાથે પણ બ્રાઉઝરમાં ટેમ્પલેટ કમ્પાઇલેશનની જરૂર હોય, તો તમે તેના બદલે બિલ્ડ ટૂલને `vue` ને `vue/dist/vue.esm-bundler.js` પર એલિયાસ (alias) કરવા માટે કોન્ફિગર કરીને તેમ કરી શકો છો.

જો તમે નો-બિલ્ડ-સ્ટેપ વપરાશ માટે હળવા વજનના વિકલ્પ શોધી રહ્યાં છો, તો [petite-vue](https://github.com/vuejs/petite-vue) તપાસો.

## IDE સપોર્ટ {#ide-support}

- ભલામણ કરેલ IDE સેટઅપ [VS Code](https://code.visualstudio.com/) + [Vue - સત્તાવાર એક્સ્ટેંશન (Official extension)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (અગાઉ Volar) છે. એક્સ્ટેંશન ટેમ્પલેટ એક્સપ્રેશન્સ અને કમ્પોનન્ટ પ્રોપ્સ માટે સિન્ટેક્સ હાઇલાઇટિંગ, TypeScript સપોર્ટ અને ઇન્ટેલિસેન્સ (intellisense) પ્રદાન કરે છે.

  :::tip
  Vue - Official એ [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) ને બદલે છે, જે Vue 2 માટે અમારું અગાઉનું સત્તાવાર VS Code એક્સ્ટેંશન છે. જો તમારી પાસે હાલમાં Vetur ઇન્સ્ટોલ કરેલ હોય, તો Vue 3 પ્રોજેક્ટ્સમાં તેને અક્ષમ કરવાની ખાતરી કરો.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) પણ Vue SFCs માટે ઉત્તમ બિલ્ટ-ઇન સપોર્ટ પૂરો પાડે છે.

- અન્ય IDEs કે જે [લેંગ્વેજ સર્વિસ પ્રોટોકોલ (Language Service Protocol)](https://microsoft.github.io/language-server-protocol/) (LSP) ને સપોર્ટ કરે છે તેઓ પણ LSP દ્વારા Volar ની મુખ્ય ટેકનિકલ સુવિધાઓનો લાભ લઈ શકે છે:

  - [LSP-Volar](https://github.com/sublimelsp/LSP-volar) દ્વારા Sublime Text સપોર્ટ.

  - [coc-volar](https://github.com/yaegassy/coc-volar) દ્વારા vim / Neovim સપોર્ટ.

  - [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/) દ્વારા emacs સપોર્ટ.

## બ્રાઉઝર ડેવલોલ્સ (Browser Devtools) {#browser-devtools}

Vue બ્રાઉઝર ડેવલોલ્સ એક્સ્ટેંશન તમને Vue એપના કમ્પોનન્ટ ટ્રીનું અન્વેષણ કરવા, વ્યક્તિગત ઘટકોની સ્થિતિ તપાસવા, સ્ટેટ મેનેજમેન્ટ ઇવેન્ટ્સને ટ્રૅક કરવા અને પરફોર્મન્સ પ્રોફાઇલ કરવાની મંજૂરી આપે છે.

![devtools screenshot](./images/devtools.png)

- [દસ્તાવેજીકરણ (Documentation)](https://devtools.vuejs.org/)
- [Chrome એક્સ્ટેંશન](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Vite પ્લગિન](https://devtools.vuejs.org/guide/vite-plugin)
- [સ્ટેન્ડઅલોન (Standalone) Electron એપ](https://devtools.vuejs.org/guide/standalone)

## TypeScript {#typescript}

મુખ્ય લેખ: [TypeScript સાથે Vue નો ઉપયોગ કરવો](/guide/typescript/overview).

- [Vue - સત્તાવાર એક્સ્ટેંશન](https://github.com/vuejs/language-tools) `<script lang="ts">` બ્લોક્સનો ઉપયોગ કરીને SFCs માટે ટાઇપ ચેકિંગ પ્રદાન કરે છે, જેમાં ટેમ્પલેટ એક્સપ્રેશન્સ અને ક્રોસ-કમ્પોનન્ટ પ્રોપ્સ વેલિડેશનનો સમાવેશ થાય છે.

- કમાન્ડ લાઇન પરથી સમાન ટાઇપ ચેકિંગ કરવા માટે અથવા SFCs માટે `d.ts` ફાઇલો જનરેટ કરવા માટે [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) નો ઉપયોગ કરો.

## ટેસ્ટિંગ (Testing) {#testing}

મુખ્ય લેખ: [ટેસ્ટિંગ ગાઇડ](/guide/scaling-up/testing).

- E2E ટેસ્ટ માટે [Cypress](https://www.cypress.io/) ની ભલામણ કરવામાં આવે છે. તેનો ઉપયોગ [Cypress Component Test Runner](https://docs.cypress.io/guides/component-testing/introduction) દ્વારા Vue SFCs માટે ઘટક પરીક્ષણ માટે પણ થઈ શકે છે.

- [Vitest](https://vitest.dev/) એ Vue / Vite ટીમના સભ્યો દ્વારા બનાવવામાં આવેલ એક ટેસ્ટ રનર છે જે ઝડપ પર ધ્યાન કેન્દ્રિત કરે છે. તે ખાસ કરીને Vite-આધારિત એપ્લિકેશનો માટે યુનિટ / કમ્પોનન્ટ ટેસ્ટિંગ માટે સમાન ત્વરિત પ્રતિસાદ લૂપ (feedback loop) આપવા માટે રચાયેલ છે.

- [Jest](https://jestjs.io/) ને [vite-jest](https://github.com/sodatea/vite-jest) દ્વારા Vite સાથે કામ કરવા માટે બનાવી શકાય છે. જો કે, જો તમારી પાસે અસ્તિત્વમાં રહેલી Jest-આધારિત ટેસ્ટ સ્યુટ્સ છે જેને તમારે Vite-આધારિત સેટઅપ પર માઇગ્રેટ કરવાની જરૂર હોય તો જ આની ભલામણ કરવામાં આવે છે, કારણ કે Vitest વધુ કાર્યક્ષમ સંકલન સાથે સમાન સુવિધાઓ પ્રદાન કરે છે.

## લિન્ટિંગ (Linting) {#linting}

Vue ટીમ [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) જાળવે છે, જે એક [ESLint](https://eslint.org/) પ્લગિન છે જે SFC-વિશિષ્ટ લિન્ટિંગ નિયમોને સપોર્ટ કરે છે.

અગાઉ Vue CLI નો ઉપયોગ કરતા વપરાશકર્તાઓ webpack લોડર્સ દ્વારા કોન્ફિગર કરેલા લિન્ટર્સ (linters) માટે ટેવાયેલા હોઈ શકે છે. જો કે જ્યારે Vite-આધારિત બિલ્ડ સેટઅપનો ઉપયોગ કરો છો, ત્યારે અમારી સામાન્ય ભલામણ છે:

૧. `npm install -D eslint eslint-plugin-vue`, પછી `eslint-plugin-vue` ની [કોન્ફિગરેશન ગાઇડ](https://eslint.vuejs.org/user-guide/#usage) અનુસરો.

૨. ESLint IDE એક્સ્ટેંશન સેટઅપ કરો, ઉદાહરણ તરીકે [VS Code માટે ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), જેથી તમને ડેવલપમેન્ટ દરમિયાન તમારા એડિટરમાં જ લિન્ટર પ્રતિસાદ મળે. આ ડેવ સર્વર શરૂ કરતી વખતે બિનજરૂરી લિન્ટિંગ ખર્ચને પણ ટાળે છે.

૩. પ્રોડક્શન બિલ્ડ કમાન્ડના ભાગ તરીકે ESLint ચલાવો, જેથી તમને પ્રોડક્શનમાં મોકલતા પહેલા સંપૂર્ણ લિન્ટર પ્રતિસાદ મળે.

૪. (વૈકલ્પિક) ગિટ કમિટ (git commit) પર સંશોધિત ફાઇલોને આપમેળે લિન્ટ કરવા માટે [lint-staged](https://github.com/okonet/lint-staged) જેવા સાધનો સેટઅપ કરો.

## ફોર્મેટિંગ (Formatting) {#formatting}

- [Vue - સત્તાવાર](https://github.com/vuejs/language-tools) VS Code એક્સ્ટેંશન આઉટ ઓફ ધ બોક્સ Vue SFCs માટે ફોર્મેટિંગ પ્રદાન કરે છે.

- વૈકલ્પિક રીતે, [Prettier](https://prettier.io/) બિલ્ટ-ઇન Vue SFC ફોર્મેટિંગ સપોર્ટ પૂરો પાડે છે.

## SFC કસ્ટમ બ્લોક ઇન્ટિગ્રેશન્સ {#sfc-custom-block-integrations}

કસ્ટમ બ્લોક્સને વિવિધ રિક્વેસ્ટ ક્વેરીઝ સાથે સમાન Vue ફાઇલમાં ઇમ્પોર્ટ્સમાં કમ્પાઇલ કરવામાં આવે છે. આ ઇમ્પોર્ટ વિનંતીઓને હેન્ડલ કરવાનું અંતર્ગત બિલ્ડ ટૂલ પર નિર્ભર છે.

- જો Vite નો ઉપયોગ કરી રહ્યાં હોવ, તો મેચ થયેલા કસ્ટમ બ્લોક્સને એક્ઝિક્યુટેબલ JavaScript માં રૂપાંતરિત કરવા માટે કસ્ટમ Vite પ્લગિનનો ઉપયોગ કરવો જોઈએ. [ઉદાહરણ](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- જો Vue CLI અથવા પ્લેન webpack નો ઉપયોગ કરી રહ્યાં હોવ, તો મેળ ખાતા બ્લોક્સને ટ્રાન્સફોર્મ કરવા માટે webpack લોડરને કોન્ફિગર કરવું જોઈએ. [ઉદાહરણ](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## લો-લેવલ પેકેજીસ (Lower-Level Packages) {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [દસ્તાવેજો](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

આ પેકેજ Vue કોર મોનોરેપોનો ભાગ છે અને હંમેશા મુખ્ય `vue` પેકેજ જેવા જ સંસ્કરણ સાથે પ્રકાશિત થાય છે. તે મુખ્ય `vue` પેકેજની ડિપેન્ડન્સી તરીકે સમાવવામાં આવેલ છે અને `vue/compiler-sfc` હેઠળ પ્રોક્સિડ (proxied) છે જેથી તમારે તેને વ્યક્તિગત રીતે ઇન્સ્ટોલ કરવાની જરૂર નથી.

પેકેજ પોતે Vue SFCs પર પ્રક્રિયા કરવા માટે લો-લેવલ ઉપયોગિતાઓ પ્રદાન કરે છે અને તે માત્ર ટૂલિંગ લેખકો માટે છે કે જેમને કસ્ટમ ટૂલ્સમાં Vue SFCs ને સપોર્ટ કરવાની જરૂર છે.

:::tip
હંમેશા `vue/compiler-sfc` ડીપ ઇમ્પોર્ટ દ્વારા આ પેકેજનો ઉપયોગ કરવાનું પસંદ કરો કારણ કે આ ખાતરી કરે છે કે તેનું વર્ઝન Vue રનટાઇમ સાથે સુસંગત છે.
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [દસ્તાવેજો](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

સત્તાવાર પ્લગિન જે Vite માં Vue SFC સપોર્ટ પૂરો પાડે છે.

### `vue-loader` {#vue-loader}

- [દસ્તાવેજો](https://vue-loader.vuejs.org/)

સત્તાવાર લોડર જે webpack માં Vue SFC સપોર્ટ પૂરો પાડે છે. જો તમે Vue CLI નો ઉપયોગ કરી રહ્યાં છો, તો [Vue CLI માં `vue-loader` ઓપ્શન્સ સુધારવા પરના દસ્તાવેજો](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) પણ જુઓ.

## અન્ય ઓનલાઇન પ્લેગ્રાઉન્ડ્સ (Other Online Playgrounds) {#other-online-playgrounds}

- [VueUse પ્લેગ્રાઉન્ડ](https://play.vueuse.org)
- [Repl.it પર Vue + Vite](https://replit.com/@templates/VueJS-with-Vite)
- [CodeSandbox પર Vue](https://codesandbox.io/p/devbox/github/codesandbox/sandbox-templates/tree/main/vue-vite)
- [Codepen પર Vue](https://codepen.io/pen/editor/vue)
- [WebComponents.dev પર Vue](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
