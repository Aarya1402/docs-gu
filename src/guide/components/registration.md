# કમ્પોનન્ટ રજીસ્ટ્રેશન (Component Registration) {#component-registration}

> આ પેજ ધારે છે કે તમે પહેલાથી જ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) વાંચી લીધું છે. જો તમે કમ્પોનન્ટ્સ માટે નવા હોવ તો પહેલા તે વાંચો.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="ફ્રી Vue.js કમ્પોનન્ટ રજીસ્ટ્રેશન લેસન"/>

Vue કમ્પોનન્ટને "રજીસ્ટર (registered)" કરવાની જરૂર છે જેથી Vue ને ખબર પડે કે જ્યારે તે ટેમ્પલેટમાં જોવા મળે ત્યારે તેનું અમલીકરણ ક્યાં શોધવું. ઘટકોને રજીસ્ટર કરવાની બે રીતો છે: ગ્લોબલ અને લોકલ.

## ગ્લોબલ રજીસ્ટ્રેશન (Global Registration) {#global-registration}

અમે `.component()` મેથડનો ઉપયોગ કરીને વર્તમાન [Vue એપ્લિકેશન](/guide/essentials/application) માં ઘટકોને વૈશ્વિક સ્તરે (globally) ઉપલબ્ધ કરાવી શકીએ છીએ:

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // નોંધાયેલ નામ (registered name)
  'MyComponent',
  // અમલીકરણ (implementation)
  {
    /* ... */
  }
)
```

જો SFCs નો ઉપયોગ કરી રહ્યાં હોવ, તો તમે ઇમ્પોર્ટ કરેલી `.vue` ફાઇલોને રજીસ્ટર કરશો:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

`.component()` મેથડને સાંકળ (chained) કરી શકાય છે:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

ગ્લોબલી રજીસ્ટર થયેલા ઘટકોનો ઉપયોગ આ એપ્લિકેશનમાંના કોઈપણ ઘટકના ટેમ્પલેટમાં થઈ શકે છે:

```vue-html
<!-- આ એપની અંદરના કોઈપણ કમ્પોનન્ટમાં કામ કરશે -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

આ તમામ સબ-કમ્પોનન્ટ્સ પર પણ લાગુ પડે છે, જેનો અર્થ એ છે કે આ ત્રણેય ઘટકો _એકબીજામાં_ પણ ઉપલબ્ધ હશે.

## લોકલ રજીસ્ટ્રેશન (Local Registration) {#local-registration}

સુવિધાજનક હોવા છતાં, ગ્લોબલ રજીસ્ટ્રેશનના થોડા ગેરફાયદા છે:

1. ગ્લોબલ રજીસ્ટ્રેશન બિલ્ડ સિસ્ટમ્સને બિનઉપયોગી ઘટકોને દૂર કરતા અટકાવે છે (જેને "ટ્રી-શેકિંગ" (tree-shaking) તરીકે પણ ઓળખવામાં આવે છે). જો તમે ગ્લોબલી કમ્પોનન્ટ રજીસ્ટર કરો છો પરંતુ તમારી એપમાં ક્યાંય પણ તેનો ઉપયોગ કરવાનું આયોજન કરતા નથી, તો પણ તે ફાઈનલ બંડલ માં સમાવવામાં આવશે.

2. ગ્લોબલ રજીસ્ટ્રેશન મુખ્ય એપ્લિકેશનોમાં ડિપેન્ડન્સી સંબંધોને ઓછી સ્પષ્ટ બનાવે છે. તેનો ઉપયોગ કરીને પેરેન્ટ કમ્પોનન્ટમાંથી ચાઇલ્ડ કમ્પોનન્ટના અમલીકરણને શોધવાનું મુશ્કેલ બને છે. આ ઘણા ગ્લોબલ વેરિએબલ્સના ઉપયોગની જેમ લાંબા ગાળાની જાળવણી (maintainability) ને અસર કરી શકે છે.

લોકલ રજીસ્ટ્રેશન રજીસ્ટર કરાયેલા ઘટકોની ઉપલબ્ધતા માત્ર વર્તમાન ઘટક સુધી મર્યાદિત રાખે છે. તે ડિપેન્ડન્સી સંબંધને વધુ સ્પષ્ટ બનાવે છે, અને તે ટ્રી-શેકિંગ ફ્રેન્ડલી (tree-shaking friendly) છે.

<div class="composition-api">

`<script setup>` સાથે SFC નો ઉપયોગ કરતી વખતે, ઇમ્પોર્ટ કરેલા ઘટકોનો રજીસ્ટ્રેશન વગર લોકલી ઉપયોગ કરી શકાય છે:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

જો `<script setup>` ન હોય તો, તમારે `components` ઓપ્શનનો ઉપયોગ કરવાની જરૂર પડશે:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

લોકલ રજીસ્ટ્રેશન `components` ઓપ્શનનો ઉપયોગ કરીને કરવામાં આવે છે:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

`components` ઓબ્જેક્ટમાંની દરેક પ્રોપર્ટી માટે, કી ઘટકનું રજીસ્ટર થયેલ નામ હશે, જ્યારે વેલ્યુમાં ઘટકનું અમલીકરણ હશે. ઉપરનું ઉદાહરણ ES2015 પ્રોપર્ટી શોર્ટહેન્ડનો ઉપયોગ કરી રહ્યું છે અને તે આની સમકક્ષ છે:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

નોંધ કરો કે **લોકલી રજીસ્ટર થયેલા ઘટકો વંશજ (descendant) ઘટકોમાં પણ ઉપલબ્ધ નથી**. આ કિસ્સામાં, `ComponentA` માત્ર વર્તમાન ઘટક માટે ઉપલબ્ધ કરાવવામાં આવશે, તેના કોઈપણ ચાઇલ્ડ અથવા વંશજ ઘટકો માટે નહીં.

## કમ્પોનન્ટ નામ કેસિંગ (Component Name Casing) {#component-name-casing}

સમગ્ર માર્ગદર્શિકામાં, અમે ઘટકોની નોંધણી કરતી વખતે PascalCase નામોનો ઉપયોગ કરી રહ્યા છીએ. આ એટલા માટે છે કારણ કે:

1. PascalCase નામો માન્ય (valid) જાવાસ્ક્રિપ્ટ આઇડેન્ટિફાયર છે. આ જાવાસ્ક્રિપ્ટમાં ઘટકોને ઇમ્પોર્ટ અને રજીસ્ટર કરવાનું સરળ બનાવે છે. તે ઓટો-કમ્પ્લીશન (auto-completion) માં IDEs ને પણ મદદ કરે છે.

2. `<PascalCase />` ટેમ્પલેટ્સમાં નેટિવ HTML એલિમેન્ટને બદલે આ એક Vue કમ્પોનન્ટ છે તે વધુ સ્પષ્ટ બનાવે છે. તે Vue કમ્પોનન્ટ્સને કસ્ટમ એલિમેન્ટ્સ (web components) થી પણ અલગ પાડે છે.

SFC અથવા સ્ટ્રિંગ ટેમ્પલેટ્સ સાથે કામ કરતી વખતે આ ભલામણ કરેલ સ્ટાઇલ છે. જોકે, [in-DOM ટેમ્પલેટ પાર્સિંગ સાવચેતીઓ](/guide/essentials/component-basics#in-dom-template-parsing-caveats) માં ચર્ચા કર્યા મુજબ, PascalCase ટેગ્સ in-DOM ટેમ્પલેટ્સમાં વાપરી શકાય તેવા નથી.

નસીબજોગે, Vue PascalCase નો ઉપયોગ કરીને રજીસ્ટર થયેલા ઘટકો માટે kebab-case ટેગ્સને રિઝોલ્વ કરવાનું સપોર્ટ કરે છે. આનો અર્થ એ છે કે `MyComponent` તરીકે રજીસ્ટર કરાયેલ કમ્પોનન્ટનો સંદર્ભ Vue ટેમ્પલેટની અંદર (અથવા Vue દ્વારા રેન્ડર કરાયેલ HTML એલિમેન્ટની અંદર) `<MyComponent>` અને `<my-component>` બંને દ્વારા આપી શકાય છે. આ આપણને ટેમ્પલેટ સોર્સને ધ્યાનમાં લીધા વિના સમાન જાવાસ્ક્રિપ્ટ કમ્પોનન્ટ રજીસ્ટ્રેશન કોડનો ઉપયોગ કરવાની મંજૂરી આપે છે.
