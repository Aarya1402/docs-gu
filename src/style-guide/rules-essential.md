# પ્રાથમિકતા A નિયમો: આવશ્યક (Priority A Rules: Essential) {#priority-a-rules-essential}

::: warning નોંધ
આ Vue.js સ્ટાઇલ ગાઇડ જૂની છે અને તેની સમીક્ષા કરવાની જરૂર છે. જો તમારી પાસે કોઈ પ્રશ્નો અથવા સૂચનો હોય, તો કૃપા કરીને [ઇશ્યુ ઓપન કરો (open an issue)](https://github.com/vuejs/docs/issues/new).
:::

આ નિયમો ભૂલોને રોકવામાં મદદ કરે છે, તેથી કોઈપણ ભોગે તેને શીખો અને તેનું પાલન કરો. અપવાદો અસ્તિત્વમાં હોઈ શકે છે, પરંતુ તે ખૂબ જ દુર્લભ હોવા જોઈએ અને તે ફક્ત તે જ લોકો દ્વારા બનાવવામાં આવવા જોઈએ જેમને JavaScript અને Vue બંનેનું નિષ્ણાત જ્ઞાન હોય.

## મલ્ટી-વર્ડ કમ્પોનન્ટ નામોનો ઉપયોગ કરો {#use-multi-word-component-names}

યુઝર કમ્પોનન્ટ નામો હંમેશા મલ્ટી-વર્ડ હોવા જોઈએ, રૂટ `App` ઘટકો સિવાય. આ હાલના અને ભવિષ્યના HTML એલિમેન્ટ્સ સાથે [ટકરાવ અટકાવે છે (prevents conflicts)](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name), કારણ કે તમામ HTML એલિમેન્ટ્સ એક જ શબ્દના હોય છે.

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<!-- પ્રી-કમ્પાઇલ્ડ ટેમ્પ્લેટ્સમાં -->
<Item />

<!-- ઇન-DOM ટેમ્પ્લેટ્સમાં -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<!-- પ્રી-કમ્પાઇલ્ડ ટેમ્પ્લેટ્સમાં -->
<TodoItem />

<!-- ઇન-DOM ટેમ્પ્લેટ્સમાં -->
<todo-item></todo-item>
```

</div>

## વિગતવાર પ્રોપ વ્યાખ્યાઓનો ઉપયોગ કરો (Use detailed prop definitions) {#use-detailed-prop-definitions}

કમિટ કરેલા કોડમાં, પ્રોપ વ્યાખ્યાઓ હંમેશા શક્ય તેટલી વિગતવાર હોવી જોઈએ, ઓછામાં ઓછું ટાઇપ(સ) સ્પષ્ટ કરવો જોઈએ.

::: details વિગતવાર સમજૂતી (Detailed Explanation)
વિગતવાર [પ્રોપ વ્યાખ્યાઓ (prop definitions)](/guide/components/props#prop-validation) ના બે ફાયદા છે:

- તેઓ ઘટકના API ને દસ્તાવેજીકૃત કરે છે, જેથી ઘટકનો ઉપયોગ કેવી રીતે કરવો તે જોવાનું સરળ બને છે.
- ડેવલપમેન્ટમાં, જો ઘટકને ખોટી રીતે ફોર્મેટ કરેલા પ્રોપ્સ આપવામાં આવે તો Vue તમને ચેતવણી આપશે, જેથી તમને ભૂલના સંભવિત સ્ત્રોતો શોધવામાં મદદ મળે.
  :::

<div class="options-api">

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
// આ માત્ર પ્રોટોટાઇપિંગ વખતે જ ઠીક છે
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```js
props: {
  status: String
}
```

```js
// આનાથી પણ વધુ સારું!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
// આ માત્ર પ્રોટોટાઇપિંગ વખતે જ ઠીક છે
const props = defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```js
const props = defineProps({
  status: String
})
```

```js
// આનાથી પણ વધુ સારું!

const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```

</div>

</div>

## `v-for` સાથે key નો ઉપયોગ કરો {#use-keyed-v-for}

`key` સાથે `v-for` ઘટકો પર _હંમેશા_ જરૂરી છે, જેથી સબટ્રીની નીચે આંતરિક ઘટકની સ્થિતિ જાળવી શકાય. એલિમેન્ટ્સ માટે પણ, [ઓબ્જેક્ટ કોન્સ્ટન્સી (object constancy)](https://bost.ocks.org/mike/constancy/) જેવી અનુમાનિત વર્તણૂક (predictable behavior) જાળવવી એ સારી પ્રથા છે, જેમ કે એનિમેશનમાં.

::: details વિગતવાર સમજૂતી (Detailed Explanation)
ચાલો કહીએ કે તમારી પાસે todos ની યાદી છે:

<div class="options-api">

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Learn to use v-for'
      },
      {
        id: 2,
        text: 'Learn to use key'
      }
    ]
  }
}
```

</div>

<div class="composition-api">

```js
const todos = ref([
  {
    id: 1,
    text: 'Learn to use v-for'
  },
  {
    id: 2,
    text: 'Learn to use key'
  }
])
```

</div>

પછી તમે તેમને મૂળાક્ષર પ્રમાણે (alphabetically) ક્રમબદ્ધ કરો. DOM અપડેટ કરતી વખતે, Vue શક્ય તેટલા સસ્તા DOM ફેરફારો કરવા માટે રેન્ડરિંગને ઓપ્ટિમાઇઝ કરશે. તેનો અર્થ એ હોઈ શકે છે કે પ્રથમ todo એલિમેન્ટ કાઢી નાખવું, પછી તેને ફરીથી લિસ્ટના અંતમાં ઉમેરવું.

સમસ્યા એ છે કે, એવા કિસ્સાઓ છે જ્યાં DOM માં રહેનારા એલિમેન્ટ્સને ન કાઢવા મહત્વપૂર્ણ છે. ઉદાહરણ તરીકે, તમે લિસ્ટ સોર્ટિંગને એનિમેટ કરવા માટે `<transition-group>` નો ઉપયોગ કરવા માંગો, અથવા જો રેન્ડર થયેલ એલિમેન્ટ `<input>` હોય તો ફોકસ જાળવવો. આ કિસ્સાઓમાં, દરેક આઇટમ માટે એક અનન્ય key ઉમેરવી (દા.ત. `:key="todo.id"`) Vue ને વધુ અનુમાનિત (predictable) રીતે વર્તન કરવા કહેશે.

અમારા અનુભવમાં, હંમેશા એક અનન્ય key ઉમેરવી વધુ સારું છે, જેથી તમે અને તમારી ટીમ ક્યારેય આ એજ કેસ (edge cases) વિશે ચિંતા ન કરો. પછી દુર્લભ, પરફોર્મન્સ-ક્રિટિકલ સિનેરિયોમાં જ્યાં ઓબ્જેક્ટ કોન્સ્ટન્સી જરૂરી નથી, ત્યાં તમે સભાનપણે અપવાદ બનાવી શકો છો.
:::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## `v-for` સાથે `v-if` ટાળો {#avoid-v-if-with-v-for}

**`v-for` જે એલિમેન્ટ પર હોય તેના પર ક્યારેય `v-if` નો ઉપયોગ ન કરો.**

બે સામાન્ય કિસ્સાઓ છે જ્યાં આ લોભામણું (tempting) હોઈ શકે:

- લિસ્ટમાં આઇટમ્સ ફિલ્ટર કરવા (દા.ત. `v-for="user in users" v-if="user.isActive"`). આ કિસ્સાઓમાં, `users` ને નવી computed પ્રોપર્ટી સાથે બદલો જે તમારી ફિલ્ટર કરેલી લિસ્ટ પરત કરે (દા.ત. `activeUsers`).

- જો લિસ્ટ છુપાવવાની હોય તો તેને રેન્ડર કરવાનું ટાળવા (દા.ત. `v-for="user in users" v-if="shouldShowUsers"`). આ કિસ્સાઓમાં, `v-if` ને કન્ટેનર એલિમેન્ટ પર ખસેડો (દા.ત. `ul`, `ol`).

::: details વિગતવાર સમજૂતી (Detailed Explanation)
જ્યારે Vue ડિરેક્ટિવ્સ પ્રોસેસ કરે છે, ત્યારે `v-if` ની પ્રાથમિકતા `v-for` કરતા વધારે હોય છે, તેથી આ ટેમ્પ્લેટ:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

એરર આપશે, કારણ કે `v-if` ડિરેક્ટિવ પહેલા મૂલ્યાંકિત (evaluated) થશે અને ઇટરેશન વેરિએબલ `user` આ સમયે અસ્તિત્વમાં નથી.

આ computed પ્રોપર્ટી પર ઇટરેટ કરીને ઠીક કરી શકાય છે, આ રીતે:

<div class="options-api">

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

</div>

<div class="composition-api">

```js
const activeUsers = computed(() => {
  return users.filter((user) => user.isActive)
})
```

</div>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

વૈકલ્પિક રીતે, `<li>` એલિમેન્ટને ઘેરવા માટે `v-for` સાથે `<template>` ટેગનો ઉપયોગ કરી શકીએ:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## કમ્પોનન્ટ-સ્કોપ્ડ સ્ટાઇલિંગ નો ઉપયોગ કરો {#use-component-scoped-styling}

એપ્લિકેશન્સ માટે, ટોપ-લેવલ `App` ઘટક અને લેઆઉટ ઘટકોમાં સ્ટાઇલ્સ ગ્લોબલ હોઈ શકે છે, પરંતુ અન્ય તમામ ઘટકો હંમેશા સ્કોપ્ડ હોવા જોઈએ.

આ ફક્ત [સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (Single-File Components)](/guide/scaling-up/sfc) માટે સંબંધિત છે. તેને [`scoped` એટ્રિબ્યુટ](https://vue-loader.vuejs.org/guide/scoped-css.html) નો ઉપયોગ કરવાની _જરૂર_ નથી. સ્કોપિંગ [CSS modules](https://vue-loader.vuejs.org/guide/css-modules.html), ક્લાસ-આધારિત વ્યૂહરચના જેમ કે [BEM](http://getbem.com/), અથવા અન્ય લાઇબ્રેરી/કન્વેન્શન દ્વારા થઈ શકે છે.

**કમ્પોનન્ટ લાઇબ્રેરીઓએ, જો કે, `scoped` એટ્રિબ્યુટ ના ઉપયોગ ને બદલે ક્લાસ-આધારિત વ્યૂહરચનાને પ્રાધાન્ય આપવી જોઈએ.**

આ આંતરિક સ્ટાઇલ્સને ઓવરરાઇડ કરવાનું સરળ બનાવે છે, માનવ-વાંચી શકાય તેવા ક્લાસ નામો સાથે જેમાં વધુ પડતી સ્પેસિફિસિટી (specificity) નથી, પરંતુ ટકરાવ (conflict) માં પરિણમવાની શક્યતા ખૂબ ઓછી છે.

::: details વિગતવાર સમજૂતી (Detailed Explanation)
જો તમે મોટા પ્રોજેક્ટ ડેવલપ કરી રહ્યા છો, અન્ય ડેવલપર્સ સાથે કામ કરી રહ્યા છો, અથવા ક્યારેક તૃતીય-પક્ષ (3rd-party) HTML/CSS (દા.ત. Auth0 તરફથી) સામેલ કરો છો, તો સુસંગત સ્કોપિંગ (consistent scoping) ખાતરી કરશે કે તમારી સ્ટાઇલ્સ ફક્ત તે ઘટકોને લાગુ પડે જે માટે તે બનાવવામાં આવી છે.

`scoped` એટ્રિબ્યુટ ઉપરાંત, અનન્ય ક્લાસ નામોનો ઉપયોગ કરવાથી ખાતરી કરવામાં મદદ મળી શકે છે કે તૃતીય-પક્ષ CSS તમારા પોતાના HTML ને લાગુ ન પડે. ઉદાહરણ તરીકે, ઘણા પ્રોજેક્ટ્સ `button`, `btn`, અથવા `icon` ક્લાસ નામોનો ઉપયોગ કરે છે, તેથી BEM જેવી વ્યૂહરચના ન વાપરતા હોવ છતાં, એપ-વિશિષ્ટ અને/અથવા ઘટક-વિશિષ્ટ ઉપસર્ગ (prefix) ઉમેરવાથી (દા.ત. `ButtonClose-icon`) થોડું સુરક્ષા મળી શકે છે.
:::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- `scoped` એટ્રિબ્યુટનો ઉપયોગ કરીને -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- CSS modules નો ઉપયોગ કરીને -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- BEM કન્વેન્શનનો ઉપયોગ કરીને -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>
