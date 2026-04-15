# પ્રાથમિકતા B નિયમો: ભારપૂર્વક ભલામણ કરેલ (Priority B Rules: Strongly Recommended) {#priority-b-rules-strongly-recommended}

::: warning નોંધ
આ Vue.js સ્ટાઇલ ગાઇડ જૂની છે અને તેની સમીક્ષા કરવાની જરૂર છે. જો તમારી પાસે કોઈ પ્રશ્નો અથવા સૂચનો હોય, તો કૃપા કરીને [ઇશ્યુ ઓપન કરો (open an issue)](https://github.com/vuejs/docs/issues/new).
:::

આ નિયમો મોટાભાગના પ્રોજેક્ટ્સમાં વાંચવાની ક્ષમતા (readability) અને/અથવા ડેવલપરના અનુભવને સુધારવા માટે મળ્યા છે. જો તમે તેનું ઉલ્લંઘન કરશો તો પણ તમારો કોડ ચાલશે, પરંતુ ઉલ્લંઘન દુર્લભ અને યોગ્ય રીતે વાજબી હોવું જોઈએ.

## કમ્પોનન્ટ ફાઇલ્સ (Component files) {#component-files}

**જ્યારે પણ ફાઇલ્સને જોડવા (concatenate) માટે બિલ્ડ સિસ્ટમ ઉપલબ્ધ હોય, ત્યારે દરેક ઘટક તેની પોતાની ફાઇલમાં હોવો જોઈએ.**

આ તમને ઘટકને ઝડપથી શોધવામાં મદદ કરે છે જ્યારે તમારે તેને સંપાદિત કરવાની અથવા તેનો ઉપયોગ કેવી રીતે કરવો તેની સમીક્ષા કરવાની જરૂર હોય.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

## સિંગલ-ફાઇલ કમ્પોનન્ટ ફાઇલનેમ કેસિંગ {#single-file-component-filename-casing}

**[સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (Single-File Components)](/guide/scaling-up/sfc) ના ફાઇલનેમ હંમેશા PascalCase અથવા હંમેશા kebab-case હોવા જોઈએ.**

PascalCase કોડ એડિટર્સમાં ઓટોકમ્પ્લીટ સાથે શ્રેષ્ઠ રીતે કામ કરે છે, કારણ કે જ્યાં પણ શક્ય હોય ત્યાં JS(X) અને ટેમ્પ્લેટ્સમાં ઘટકોને સંદર્ભિત કરવાની રીત સાથે તે સુસંગત છે. જો કે, મિક્સ્ડ કેસ ફાઇલનેમ ક્યારેક કેસ-ઇનસેન્સિટિવ ફાઇલ સિસ્ટમ્સ પર સમસ્યાઓ સર્જી શકે છે, જેથી kebab-case પણ સંપૂર્ણપણે સ્વીકાર્ય છે.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

## બેઝ કમ્પોનન્ટ નામો (Base component names) {#base-component-names}

**બેઝ ઘટકો (a.k.a. presentational, dumb, અથવા pure ઘટકો) જે એપ-વિશિષ્ટ સ્ટાઇલિંગ અને કન્વેન્શન્સ લાગુ કરે છે તે તમામ ચોક્કસ ઉપસર્ગ (prefix) થી શરૂ થવા જોઈએ, જેમ કે `Base`, `App`, અથવા `V`.**

::: details વિગતવાર સમજૂતી (Detailed Explanation)
આ ઘટકો તમારી એપ્લિકેશનમાં સુસંગત સ્ટાઇલિંગ અને વર્તન માટે પાયો નાખે છે. તેમાં **માત્ર** આ હોઈ શકે:

- HTML એલિમેન્ટ્સ,
- અન્ય બેઝ ઘટકો, અને
- તૃતીય-પક્ષ (3rd-party) UI ઘટકો.

પરંતુ તેમાં **ક્યારેય** ગ્લોબલ સ્ટેટ (દા.ત. [Pinia](https://pinia.vuejs.org/) સ્ટોર તરફથી) સમાવિષ્ટ નહીં હોય.

તેમના નામોમાં ઘણીવાર તેઓ જે એલિમેન્ટને ઘેરે છે તેનું નામ સામેલ હોય છે (દા.ત. `BaseButton`, `BaseTable`), સિવાય કે તેમના ચોક્કસ હેતુ માટે કોઈ એલિમેન્ટ અસ્તિત્વમાં ન હોય (દા.ત. `BaseIcon`). જો તમે વધુ ચોક્કસ સંદર્ભ માટે સમાન ઘટકો બનાવો છો, તો તેઓ લગભગ હંમેશા આ ઘટકોનો ઉપભોગ કરશે (દા.ત. `BaseButton` ને `ButtonSubmit` માં ઉપયોગ કરી શકાય).

આ કન્વેન્શનના કેટલાક ફાયદા:

- જ્યારે એડિટર્સમાં મૂળાક્ષર પ્રમાણે ગોઠવાય છે, ત્યારે તમારા એપના બેઝ ઘટકો એકસાથે સૂચિબદ્ધ થાય છે, જે તેમને ઓળખવાનું સરળ બનાવે છે.

- ઘટક નામો હંમેશા મલ્ટી-વર્ડ હોવા જોઈએ, આ કન્વેન્શન તમને સરળ ઘટક રેપર્સ માટે મનસ્વી ઉપસર્ગ (arbitrary prefix) પસંદ કરવાથી બચાવે છે (દા.ત. `MyButton`, `VueButton`).

- આ ઘટકો ઘણી વાર ઉપયોગમાં લેવાતા હોવાથી, તમે તેમને બધે ઇમ્પોર્ટ કરવાના બદલે ફક્ત ગ્લોબલ બનાવી શકો છો. Webpack સાથે ઉપસર્ગ આ શક્ય બનાવે છે:

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig =
      baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

## ગાઢ રીતે જોડાયેલા કમ્પોનન્ટ નામો (Tightly coupled component names) {#tightly-coupled-component-names}

**પેરેન્ટ સાથે ગાઢ રીતે જોડાયેલા ચાઇલ્ડ ઘટકોમાં પેરેન્ટ ઘટકનું નામ ઉપસર્ગ (prefix) તરીકે સામેલ હોવું જોઈએ.**

જો ઘટક માત્ર એક જ પેરેન્ટ ઘટકના સંદર્ભમાં અર્થપૂર્ણ હોય, તો તે સંબંધ તેના નામમાં સ્પષ્ટ હોવો જોઈએ. એડિટર્સ સામાન્ય રીતે ફાઇલ્સને મૂળાક્ષર પ્રમાણે ગોઠવે છે, આ સંબંધિત ફાઇલ્સને એકબીજાની બાજુમાં રાખે છે.

::: details વિગતવાર સમજૂતી (Detailed Explanation)
તમને આ સમસ્યાને ચાઇલ્ડ ઘટકોને પેરેન્ટના નામ પર આધારિત ડિરેક્ટરીઓમાં નેસ્ટ કરીને ઉકેલવાનું લોભામણું લાગી શકે. ઉદાહરણ તરીકે:

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

અથવા:

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

આ ભલામણ કરવામાં આવતી નથી, કારણ કે તેના પરિણામે:

- સમાન નામવાળી ઘણી ફાઇલ્સ, જે કોડ એડિટર્સમાં ઝડપી ફાઇલ સ્વિચિંગને વધુ મુશ્કેલ બનાવે છે.
- ઘણી નેસ્ટેડ સબ-ડિરેક્ટરીઓ, જે એડિટરના સાઇડબારમાં ઘટકો બ્રાઉઝ કરવામાં લાગતો સમય વધારે છે.
  :::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

## કમ્પોનન્ટ નામોમાં શબ્દોનો ક્રમ (Order of words in component names) {#order-of-words-in-component-names}

**ઘટક નામો સૌથી ઉચ્ચ-સ્તરના (ઘણીવાર સૌથી સામાન્ય) શબ્દોથી શરૂ થવા જોઈએ અને વર્ણનાત્મક ફેરફાર કરતા શબ્દો સાથે સમાપ્ત થવા જોઈએ.**

::: details વિગતવાર સમજૂતી (Detailed Explanation)
તમે વિચારતા હશો:

> "અમે ઘટક નામોને ઓછી કુદરતી ભાષા (less natural language) નો ઉપયોગ કરવા શા માટે ફરજ પાડીએ?"

કુદરતી અંગ્રેજીમાં, વિશેષણો અને અન્ય વર્ણનકર્તાઓ સામાન્ય રીતે સંજ્ઞાઓ પહેલા આવે છે, જ્યારે અપવાદો માટે જોડાણ શબ્દો (connector words) ની જરૂર પડે છે. ઉદાહરણ તરીકે:

- Coffee _with_ milk
- Soup _of the_ day
- Visitor _to the_ museum

તમે ઈચ્છો તો ઘટક નામોમાં આ જોડાણ શબ્દો ચોક્કસ સામેલ કરી શકો, પરંતુ ક્રમ હજુ પણ મહત્વપૂર્ણ છે.

એ પણ નોંધો કે **\"સૌથી ઉચ્ચ-સ્તર\" શું છે તે તમારી એપના સંદર્ભ અનુસાર હશે**. ઉદાહરણ તરીકે, શોધ ફોર્મ (search form) ધરાવતી એપની કલ્પના કરો. તેમાં આ જેવા ઘટકો હોઈ શકે:

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

જેમ તમે જોઈ શકો છો, કયા ઘટકો શોધ (search) માટે ચોક્કસ છે તે જોવાનું ઘણું મુશ્કેલ છે. ચાલો હવે નિયમ અનુસાર ઘટકોનું નામ બદલીએ:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

એડિટર્સ સામાન્ય રીતે ફાઇલ્સને મૂળાક્ષર પ્રમાણે ગોઠવે છે, ઘટકો વચ્ચેના તમામ મહત્વપૂર્ણ સંબંધો હવે એક નજરમાં સ્પષ્ટ છે.

તમને આ સમસ્યાને અલગ રીતે ઉકેલવાનું લોભામણું લાગી શકે, તમામ શોધ ઘટકોને \"search\" ડિરેક્ટરી હેઠળ નેસ્ટ કરીને, પછી તમામ સેટિંગ્સ ઘટકોને \"settings\" ડિરેક્ટરી હેઠળ. અમે ફક્ત ખૂબ મોટી એપ્સમાં (દા.ત. 100+ ઘટકો) જ આ અભિગમ ધ્યાનમાં લેવાની ભલામણ કરીએ છીએ, આ કારણોસર:

- નેસ્ટેડ સબ-ડિરેક્ટરીઓમાં નેવિગેટ કરવામાં સામાન્ય રીતે એક `components` ડિરેક્ટરીમાં સ્ક્રોલ કરવા કરતા વધુ સમય લાગે છે.
- નામ ટકરાવ (દા.ત. બહુવિધ `ButtonDelete.vue` ઘટકો) કોડ એડિટરમાં ચોક્કસ ઘટક પર ઝડપથી નેવિગેટ કરવાનું વધુ મુશ્કેલ બનાવે છે.
- રિફેક્ટરિંગ વધુ મુશ્કેલ બને છે, કારણ કે ખસેડવામાં આવેલા ઘટકના સંબંધિત સંદર્ભોને અપડેટ કરવા માટે ફાઇન્ડ-એન્ડ-રિપ્લેસ ઘણીવાર પૂરતું નથી.
  :::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

## સેલ્ફ-ક્લોઝિંગ કમ્પોનન્ટ્સ (Self-closing components) {#self-closing-components}

**કોઈ કન્ટેન્ટ ન હોય તેવા ઘટકો [સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (Single-File Components)](/guide/scaling-up/sfc), સ્ટ્રિંગ ટેમ્પ્લેટ્સ, અને [JSX](/guide/extras/render-function#jsx-tsx) માં સેલ્ફ-ક્લોઝિંગ હોવા જોઈએ - પરંતુ ઇન-DOM ટેમ્પ્લેટ્સમાં ક્યારેય નહીં.**

સેલ્ફ-ક્લોઝ થતા ઘટકો જણાવે છે કે તેમની પાસે માત્ર કોઈ કન્ટેન્ટ નથી, પણ **ઈરાદાપૂર્વક** કોઈ કન્ટેન્ટ નથી. તે પુસ્તકમાં ખાલી પેજ અને "આ પેજ ઈરાદાપૂર્વક ખાલી છુટેલ છે" લેબલવાળા પેજ વચ્ચેનો તફાવત છે. બિનજરૂરી ક્લોઝિંગ ટેગ વિના તમારો કોડ પણ સ્વચ્છ છે.

દુર્ભાગ્યે, HTML કસ્ટમ એલિમેન્ટ્સને સેલ્ફ-ક્લોઝિંગ કરવાની મંજૂરી આપતું નથી - ફક્ત [સત્તાવાર "void" એલિમેન્ટ્સ](https://www.w3.org/TR/html/syntax.html#void-elements). તેથી જ આ વ્યૂહરચના ત્યારે જ શક્ય છે જ્યારે Vue ના ટેમ્પ્લેટ કમ્પાઇલર ડોમ (DOM) પહેલા ટેમ્પ્લેટ સુધી પહોંચી શકે, પછી DOM સ્પેક-અનુરૂપ HTML પીરસે.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<!-- સિંગલ-ફાઇલ કમ્પોનન્ટ્સ, સ્ટ્રિંગ ટેમ્પ્લેટ્સ, અને JSX માં -->
<MyComponent></MyComponent>
```

```vue-html
<!-- ઇન-DOM ટેમ્પ્લેટ્સમાં -->
<my-component/>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<!-- સિંગલ-ફાઇલ કમ્પોનન્ટ્સ, સ્ટ્રિંગ ટેમ્પ્લેટ્સ, અને JSX માં -->
<MyComponent/>
```

```vue-html
<!-- ઇન-DOM ટેમ્પ્લેટ્સમાં -->
<my-component></my-component>
```

</div>

## ટેમ્પ્લેટ્સમાં કમ્પોનન્ટ નામ કેસિંગ {#component-name-casing-in-templates}

**મોટાભાગના પ્રોજેક્ટ્સમાં, ઘટક નામો [સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (Single-File Components)](/guide/scaling-up/sfc) અને સ્ટ્રિંગ ટેમ્પ્લેટ્સમાં હંમેશા PascalCase હોવા જોઈએ - પરંતુ ઇન-DOM ટેમ્પ્લેટ્સમાં kebab-case.**

PascalCase ના kebab-case કરતા કેટલાક ફાયદા છે:

- એડિટર્સ ટેમ્પ્લેટ્સમાં ઘટક નામો ઓટોકમ્પ્લીટ કરી શકે છે, કારણ કે PascalCase JavaScript માં પણ ઉપયોગમાં લેવાય છે.
- `<MyComponent>` એક-શબ્દના HTML એલિમેન્ટ કરતા `<my-component>` કરતા દૃષ્ટિગત રીતે વધુ અલગ છે, કારણ કે બે અક્ષર તફાવત (બે કેપિટલ) છે, માત્ર એક (હાઇફન) ના બદલે.
- જો તમે તમારા ટેમ્પ્લેટ્સમાં કોઈ non-Vue કસ્ટમ એલિમેન્ટ્સ ઉપયોગ કરો છો, જેમ કે વેબ કમ્પોનન્ટ, PascalCase ખાતરી કરે છે કે તમારા Vue ઘટકો સ્પષ્ટ રીતે દેખાય છે.

દુર્ભાગ્યે, HTML ની કેસ ઇનસેન્સિટિવિટી (case insensitivity) ને કારણે, ઇન-DOM ટેમ્પ્લેટ્સે હજુ પણ kebab-case નો ઉપયોગ કરવો પડે.

એ પણ નોંધો કે જો તમે પહેલેથી kebab-case માં ભારે રોકાણ કર્યું છે, તો HTML કન્વેન્શન્સ સાથે સુસંગતતા અને તમારા બધા પ્રોજેક્ટ્સમાં સમાન કેસિંગનો ઉપયોગ કરવો ઉપર સૂચિબદ્ધ ફાયદાઓ કરતા વધુ મહત્વપૂર્ણ હોઈ શકે. તે કિસ્સાઓમાં, **સર્વત્ર kebab-case નો ઉપયોગ કરવો પણ સ્વીકાર્ય છે.**

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<!-- સિંગલ-ફાઇલ કમ્પોનન્ટ્સ અને સ્ટ્રિંગ ટેમ્પ્લેટ્સમાં -->
<mycomponent/>
```

```vue-html
<!-- સિંગલ-ફાઇલ કમ્પોનન્ટ્સ અને સ્ટ્રિંગ ટેમ્પ્લેટ્સમાં -->
<myComponent/>
```

```vue-html
<!-- ઇન-DOM ટેમ્પ્લેટ્સમાં -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<!-- સિંગલ-ફાઇલ કમ્પોનન્ટ્સ અને સ્ટ્રિંગ ટેમ્પ્લેટ્સમાં -->
<MyComponent/>
```

```vue-html
<!-- ઇન-DOM ટેમ્પ્લેટ્સમાં -->
<my-component></my-component>
```

અથવા (OR)

```vue-html
<!-- સર્વત્ર (Everywhere) -->
<my-component></my-component>
```

</div>

## JS/JSX માં કમ્પોનન્ટ નામ કેસિંગ {#component-name-casing-in-js-jsx}

**JS/[JSX](/guide/extras/render-function#jsx-tsx) માં ઘટક નામો હંમેશા PascalCase હોવા જોઈએ, જો કે `app.component` દ્વારા ફક્ત ગ્લોબલ કમ્પોનન્ટ રજિસ્ટ્રેશનનો ઉપયોગ કરતી સરળ એપ્લિકેશન્સ માટે સ્ટ્રિંગ્સ અંદર kebab-case હોઈ શકે.**

::: details વિગતવાર સમજૂતી (Detailed Explanation)
JavaScript માં, PascalCase ક્લાસ અને પ્રોટોટાઇપ કન્સ્ટ્રક્ટર્સ માટેનો કન્વેન્શન છે - અનિવાર્યપણે, કોઈપણ વસ્તુ જેના અલગ ઇન્સ્ટન્સ હોઈ શકે. Vue ઘટકોના પણ ઇન્સ્ટન્સ હોય છે, તેથી PascalCase નો ઉપયોગ કરવો અર્થપૂર્ણ છે. JSX (અને ટેમ્પ્લેટ્સ) માં PascalCase નો ઉપયોગ કરવાથી, કોડ વાંચનારા ઘટકો અને HTML એલિમેન્ટ્સ વચ્ચે વધુ સરળતાથી ભેદ પાડી શકે છે.

જો કે, `app.component` દ્વારા **ફક્ત** ગ્લોબલ ઘટક વ્યાખ્યાઓ (global component definitions) નો ઉપયોગ કરતી એપ્લિકેશન્સ માટે, અમે તેના બદલે kebab-case ની ભલામણ કરીએ છીએ. કારણો આ છે:

- ગ્લોબલ ઘટકોને JavaScript માં ભાગ્યે જ સંદર્ભિત કરવામાં આવે છે, તેથી JavaScript માટેના કન્વેન્શનને અનુસરવું ઓછું અર્થપૂર્ણ છે.
- આ એપ્લિકેશન્સમાં હંમેશા ઘણા ઇન-DOM ટેમ્પ્લેટ્સ હોય છે, જ્યાં [kebab-case **જરૂરી** છે](#component-name-casing-in-templates).
  :::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent'
  // ...
}
```

```js
export default {
  name: 'my-component'
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent'
  // ...
}
```

</div>

## પૂર્ણ-શબ્દ કમ્પોનન્ટ નામો (Full-word component names) {#full-word-component-names}

**ઘટક નામો ટૂંકાક્ષરો (abbreviations) ના બદલે પૂર્ણ શબ્દોને પ્રાધાન્ય આપવું જોઈએ.**

એડિટર્સમાં ઓટોકમ્પ્લીટ લાંબા નામો લખવાનો ખર્ચ ઘણો ઓછો બનાવે છે, જ્યારે તેઓ જે સ્પષ્ટતા પ્રદાન કરે છે તે અમૂલ્ય છે. ખાસ કરીને, અસામાન્ય ટૂંકાક્ષરો (uncommon abbreviations) હંમેશા ટાળવા જોઈએ.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

## પ્રોપ નામ કેસિંગ (Prop name casing) {#prop-name-casing}

**પ્રોપ નામો ડિક્લેરેશન દરમિયાન હંમેશા camelCase હોવા જોઈએ. ઇન-DOM ટેમ્પ્લેટ્સમાં ઉપયોગ કરતી વખતે, પ્રોપ્સ kebab-cased હોવા જોઈએ. સિંગલ-ફાઇલ કમ્પોનન્ટ ટેમ્પ્લેટ્સ અને [JSX](/guide/extras/render-function#jsx-tsx) kebab-case અથવા camelCase પ્રોપ્સ બંનેનો ઉપયોગ કરી શકે. કેસિંગ સુસંગત હોવું જોઈએ - જો તમે camelCased પ્રોપ્સ ઉપયોગ કરવાનું પસંદ કરો, તો ખાતરી કરો કે તમે તમારી એપ્લિકેશનમાં kebab-cased પ્રોપ્સ ઉપયોગ ન કરો**

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

<div class="options-api">

```js
props: {
  'greeting-text': String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  'greeting-text': String
})
```

</div>

```vue-html
// ઇન-DOM ટેમ્પ્લેટ્સ માટે
<welcome-message greetingText="hi"></welcome-message>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

<div class="options-api">

```js
props: {
  greetingText: String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  greetingText: String
})
```

</div>

```vue-html
// SFC માટે - કૃપા કરીને ખાતરી કરો કે તમારા આખા પ્રોજેક્ટમાં કેસિંગ સુસંગત છે
// તમે ગમે તે કન્વેન્શન ઉપયોગ કરી શકો પરંતુ અમે બે અલગ કેસિંગ સ્ટાઇલ્સ મિક્સ કરવાની ભલામણ કરતા નથી
<WelcomeMessage greeting-text="hi"/>
// અથવા
<WelcomeMessage greetingText="hi"/>
```

```vue-html
// ઇન-DOM ટેમ્પ્લેટ્સ માટે
<welcome-message greeting-text="hi"></welcome-message>
```

</div>

## મલ્ટી-એટ્રિબ્યુટ એલિમેન્ટ્સ (Multi-attribute elements) {#multi-attribute-elements}

**બહુવિધ એટ્રિબ્યુટ્સ ધરાવતા એલિમેન્ટ્સ બહુવિધ લાઇન્સ પર ફેલાવા જોઈએ, દરેક લાઇન પર એક એટ્રિબ્યુટ.**

JavaScript માં, બહુવિધ પ્રોપર્ટીઝ ધરાવતા ઓબ્જેક્ટ્સને બહુવિધ લાઇન્સમાં વિભાજિત કરવું એ વ્યાપક રીતે સારો કન્વેન્શન માનવામાં આવે છે, કારણ કે તે વાંચવામાં ઘણું સરળ છે. અમારા ટેમ્પ્લેટ્સ અને [JSX](/guide/extras/render-function#jsx-tsx) એ જ ધ્યાનને પાત્ર છે.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```vue-html
<MyComponent foo="a" bar="b" baz="c"/>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```vue-html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

</div>

## ટેમ્પ્લેટ્સમાં સરળ એક્સપ્રેશન્સ (Simple expressions in templates) {#simple-expressions-in-templates}

**ઘટક ટેમ્પ્લેટ્સમાં માત્ર સરળ એક્સપ્રેશન્સ હોવા જોઈએ, વધુ જટિલ એક્સપ્રેશન્સે computed પ્રોપર્ટીઝ અથવા methods માં રિફેક્ટર થવા જોઈએ.**

તમારા ટેમ્પ્લેટ્સમાં જટિલ એક્સપ્રેશન્સ તેમને ઓછા ડિક્લેરેટિવ (declarative) બનાવે છે. આપણે _શું_ દેખાવું જોઈએ તે વર્ણવવાનો પ્રયત્ન કરવો જોઈએ, _કેવી રીતે_ આપણે તે મૂલ્યની ગણતરી કરી રહ્યા છે તે નહીં. Computed પ્રોપર્ટીઝ અને methods કોડને ફરીથી ઉપયોગમાં લેવાની પણ મંજૂરી આપે છે.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<!-- ટેમ્પ્લેટમાં -->
{{ normalizedFullName }}
```

<div class="options-api">

```js
// જટિલ એક્સપ્રેશનને computed પ્રોપર્ટીમાં ખસેડવામાં આવ્યું છે
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

<div class="composition-api">

```js
// જટિલ એક્સપ્રેશનને computed પ્રોપર્ટીમાં ખસેડવામાં આવ્યું છે
const normalizedFullName = computed(() =>
  fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
```

</div>

</div>

## સરળ computed પ્રોપર્ટીઝ (Simple computed properties) {#simple-computed-properties}

**જટિલ computed પ્રોપર્ટીઝને શક્ય તેટલી ઘણી સરળ પ્રોપર્ટીઝમાં વિભાજિત કરવી જોઈએ.**

::: details વિગતવાર સમજૂતી (Detailed Explanation)
સરળ, સારા નામવાળી computed પ્રોપર્ટીઝ:

- **ટેસ્ટ કરવા સરળ**

  જ્યારે દરેક computed પ્રોપર્ટીમાં ખૂબ ઓછી ડિપેન્ડન્સીઝ સાથે માત્ર ખૂબ સરળ એક્સપ્રેશન હોય, ત્યારે તે સાચી રીતે કામ કરે છે તેની પુષ્ટિ કરતા ટેસ્ટ લખવા ઘણું સરળ છે.

- **વાંચવા સરળ**

  Computed પ્રોપર્ટીઝને સરળ બનાવવાથી તમને દરેક મૂલ્યને વર્ણનાત્મક નામ આપવાની ફરજ પડે છે, ભલે તે ફરીથી ઉપયોગમાં ન આવે. આ અન્ય ડેવલપર્સ (અને ભવિષ્યના તમે) માટે તેઓ જે કોડ વિશે ધ્યાન રાખે છે તેના પર ધ્યાન કેન્દ્રિત કરવાનું ઘણું સરળ બનાવે છે.

- **બદલાતી આવશ્યકતાઓ માટે વધુ અનુકૂળ**

  કોઈપણ મૂલ્ય કે જેને નામ આપી શકાય તે વ્યૂ (view) માટે ઉપયોગી હોઈ શકે છે. ઉદાહરણ તરીકે, અમે યુઝરને કહેતો સંદેશ દર્શાવવાનું નક્કી કરી શકીએ કે તેમણે કેટલા પૈસા બચાવ્યા. અમે સેલ્સ ટેક્સની ગણતરી કરવાનું પણ નક્કી કરી શકીએ, પરંતુ કદાચ તેને અંતિમ ભાવનો ભાગ હોવાના બદલે અલગથી દર્શાવીએ.

  નાની, કેન્દ્રિત computed પ્રોપર્ટીઝ માહિતી કેવી રીતે ઉપયોગમાં લેવાશે તે વિશે ઓછા અનુમાનો બનાવે છે, તેથી આવશ્યકતાઓ બદલાય ત્યારે ઓછા રિફેક્ટરિંગની જરૂર પડે છે.
  :::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

<div class="options-api">

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="composition-api">

```js
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value)
  return basePrice - basePrice * (discountPercent.value || 0)
})
```

</div>

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

<div class="options-api">

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

<div class="composition-api">

```js
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
)

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0)
)

const finalPrice = computed(() => basePrice.value - discount.value)
```

</div>

</div>

## ક્વોટેડ એટ્રિબ્યુટ વેલ્યુ (Quoted attribute values) {#quoted-attribute-values}

**ખાલી ન હોય તેવા HTML એટ્રિબ્યુટ વેલ્યુ હંમેશા ક્વોટ્સ (સિંગલ અથવા ડબલ, જે JS માં ઉપયોગ ન થતું હોય તે) ની અંદર હોવા જોઈએ.**

જ્યારે કોઈ સ્પેસ ન હોય તેવા એટ્રિબ્યુટ વેલ્યુ માટે HTML માં ક્વોટ્સ જરૂરી નથી, આ પ્રથા ઘણીવાર સ્પેસ _ટાળવા_ તરફ દોરી જાય છે, જે એટ્રિબ્યુટ વેલ્યુને ઓછા વાંચી શકાય તેવા બનાવે છે.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<input type=text>
```

```vue-html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<input type="text">
```

```vue-html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

</div>

## ડિરેક્ટિવ શોર્ટહેન્ડ્સ (Directive shorthands) {#directive-shorthands}

**ડિરેક્ટિવ શોર્ટહેન્ડ્સ (`v-bind:` માટે `:`, `v-on:` માટે `@` અને `v-slot` માટે `#`) નો ઉપયોગ હંમેશા અથવા ક્યારેય ન થવો જોઈએ.**

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```vue-html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```vue-html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>
```

```vue-html
<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

</div>
