# લિસ્ટ રેન્ડરિંગ (List Rendering) {#list-rendering}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="ફ્રી Vue.js લિસ્ટ રેન્ડરિંગ લેસન"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="ફ્રી Vue.js લિસ્ટ રેન્ડરિંગ લેસન"/>
</div>

## `v-for` {#v-for}

એરે (array) ના આધારે આઇટમ્સની લિસ્ટ રેન્ડર કરવા માટે આપણે `v-for` ડિરેક્ટિવનો ઉપયોગ કરી શકીએ છીએ. `v-for` ડિરેક્ટિવને `item in items` ના સ્વરૂપમાં વિશેષ સિન્ટેક્સની જરૂર હોય છે, જ્યાં `items` સોર્સ ડેટા એરે છે અને `item` એરે એલિમેન્ટ માટેનું એક **alias** છે:

<div class="composition-api">

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

`v-for` સ્કોપની અંદર, ટેમ્પલેટ એક્સપ્રેશન્સ પાસે તમામ પેરેન્ટ સ્કોપ પ્રોપર્ટીઝની એક્સેસ હોય છે. વધુમાં, `v-for` વર્તમાન આઇટમના ઇન્ડેક્સ (index) માટે વૈકલ્પિક બીજા એલિયાસ (alias) ને પણ સપોર્ટ કરે છે:

<div class="composition-api">

```js
const parentMessage = ref('પેરેન્ટ')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'પેરેન્ટ',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'પેરેન્ટ'
const items = [{ message: 'Foo' }, { message: 'Bar' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpdTsuqwjAQ/ZVDNlFQu5d64bpwJ7g3LopOJdAmIRlFCPl3p60PcDWcM+eV1X8Iq/uN1FrV6RxtYCTiW/gzzvbBR0ZGpBYFbfQ9tEi1ccadvUuM0ERyvKeUmithMyhn+jCSev4WWaY+vZ7HjH5Sr6F33muUhTR8uW0ThTuJua6mPbJEgGSErmEaENedxX3Z+rgxajbEL2DdhR5zOVOdUSIEDOf8M7IULCHsaPgiMa1eK4QcS6rOSkhdfapVeQLQEWnH)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVTssKwjAQ/JUllyr0cS9V0IM3wbvxEOxWAm0a0m0phPy7m1aqhpDsDLMz48XJ2nwaUZSiGp5OWzpKg7PtHUGNjRpbAi8NQK1I7fbrLMkhjc5EJAn4WOXQ0BWHQb2whOS24CSN6qjXhN1Qwt1Dt2kufZ9ASOGXOyvH3GMNCdGdH75VsZVjwGa2VYQRUdVqmLKmdwcpdjEnBW1qnPf8wZIrBQujoff/RSEEyIDZZeGLeCn/dGJyCSlazSZVsUWL8AYme21i)

</div>

`v-for` નું વેરિએબલ સ્કોપિંગ નીચેના જાવાસ્ક્રિપ્ટ જેવું જ છે:

```js
const parentMessage = 'પેરેન્ટ'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // આઉટર (outer) સ્કોપ `parentMessage` ની એક્સેસ છે
  // પરંતુ `item` અને `index` ફક્ત અહીં જ ઉપલબ્ધ છે
  console.log(parentMessage, item.message, index)
})
```

નોંધ કરો કે કેવી રીતે `v-for` વેલ્યુ `forEach` કોલબેકના ફંક્શન સિગ્નેચર સાથે મેળ ખાય છે. વાસ્તવમાં, તમે ફંક્શન આર્ગ્યુમેન્ટ્સને ડિસ્ટ્રક્ચર કરવા જેવું જ `v-for` આઇટમ એલિયાસ પર ડિસ્ટ્રક્ચરિંગ (destructuring) નો ઉપયોગ કરી શકો છો:

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- ઇન્ડેક્સ સાથે -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

નેસ્ટેડ (nested) `v-for` માટે, સ્કોપિંગ નેસ્ટેડ ફંક્શન્સની જેમ જ કામ કરે છે. દરેક `v-for` સ્કોપ પાસે પેરેન્ટ સ્કોપ્સની એક્સેસ હોય છે:

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

તમે `in` ને બદલે `of` નો ડિલિમિટર તરીકે ઉપયોગ કરી શકો છો, જેથી તે ઇટરટર્સ (iterators) માટે જાવાસ્ક્રિપ્ટના સિન્ટેક્સની નજીક હોય:

```vue-html
<div v-for="item of items"></div>
```

## ઓબ્જેક્ટ સાથે `v-for` {#v-for-with-an-object}

તમે ઓબ્જેક્ટની પ્રોપર્ટીઝ દ્વારા પુનરાવર્તન (iterate) કરવા માટે `v-for` નો ઉપયોગ પણ કરી શકો છો. પુનરાવર્તન ક્રમ ઓબ્જેક્ટ પર `Object.values()` ને કોલ કરવાના પરિણામ પર આધારિત હશે:

<div class="composition-api">

```js
const myObject = reactive({
  title: 'Vue માં લિસ્ટ કેવી રીતે બનાવવી',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'Vue માં લિસ્ટ કેવી રીતે બનાવવી',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

તમે પ્રોપર્ટીના નામ (જેને કી તરીકે પણ ઓળખવામાં આવ છે) માટે બીજું એલિયાસ પ્રદાન કરી શકો છો:

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

અને બીજું ઈન્ડેક્સ માટે:

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jjFvgzAQhf/KE0sSCQKpqg7IqRSpQ9WlWycvBC6KW2NbcKaNEP+9B7Tx4nt33917Y3IKYT9ESspE9XVnAqMnjuFZO9MG3zFGdFTVbAbChEvnW2yE32inXe1dz2hv7+dPqhnHO7kdtQPYsKUSm1f/DfZoPKzpuYdx+JAL6cxUka++E+itcoQX/9cO8SzslZoTy+yhODxlxWN2KMR22mmn8jWrpBTB1AZbMc2KVbTyQ56yBkN28d1RJ9uhspFSfNEtFf+GfnZzjP/oOll2NQPjuM4xTftZyIaU5VwuN0SsqMqtWZxUvliq/J4jmX4BTCp08A==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9T8FqwzAM/RWRS1pImnSMHYI3KOwwdtltJ1/cRqXe3Ng4ctYS8u+TbVJjLD3rPelpLg7O7aaARVeI8eS1ozc54M1ZT9DjWQVDMMsBoFekNtucS/JIwQ8RSQI+1/vX8QdP1K2E+EmaDHZQftg/IAu9BaNHGkEP8B2wrFYxgAp0sZ6pn2pAeLepmEuSXDiy7oL9gduXT+3+pW6f631bZoqkJY/kkB6+onnswoDw6owijIhEMByjUBgNU322/lUWm0mZgBX84r1ifz3ettHmupYskjbanedch2XZRcAKTnnvGVIPBpkqGqPTJNGkkaJ5+CiWf4KkfBs=)

</div>

## રેન્જ સાથે `v-for` {#v-for-with-a-range}

`v-for` ઇન્ટિજર (integer) પણ લઈ શકે છે. આ કિસ્સામાં તે `1...n` ની રેન્જના આધારે તેટલી વખત ટેમ્પલેટને પુનરાવર્તિત કરશે.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

નોંધ કરો કે અહીં `n` 0 ને બદલે `1` ની પ્રારંભિક વેલ્યુ સાથે શરૂ થાય છે.

## `<template>` પર `v-for` {#v-for-on-template}

ટેમ્પલેટ `v-if` ની જેમ, તમે બહુવિધ એલિમેન્ટ્સના બ્લોકને રેન્ડર કરવા માટે `v-for` સાથે `<template>` ટેગનો ઉપયોગ પણ કરી શકો છો. ઉદાહરણ તરીકે:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-if` સાથે `v-for` {#v-for-with-v-if}

જ્યારે તે સમાન નોડ પર અસ્તિત્વ ધરાવે છે, ત્યારે `v-if` પાસે `v-for` કરતા વધારે પ્રાધાન્ય (priority) હોય છે. તેનો અર્થ એ છે કે `v-if` શરત પાસે `v-for` ના સ્કોપમાંથી વેરિએબલ્સની એક્સેસ હશે નહીં:

```vue-html
<!--
આ એરર આપશે કારણ કે પ્રોપર્ટી "todo"
ઇન્સ્ટન્સ પર વ્યાખ્યાયિત નથી.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

આને `v-for` ને રેપિંગ (wrapping) `<template>` ટેગ પર ખસેડીને ઠીક કરી શકાય છે (જે વધુ સ્પષ્ટ પણ છે):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

:::warning નોંધ
ઇમ્પલિસિટ પ્રેસિડેન્સ (implicit precedence) ને કારણે એક જ એલિમેન્ટ પર `v-if` અને `v-for` નો ઉપયોગ કરવાની ભલામણ કરવામાં આવતી **નથી**.

ત્યાં બે સામાન્ય કિસ્સાઓ છે જ્યાં આ લલચાવનારું હોઈ શકે છે:

- લિસ્ટમાં આઇટમ્સ ફિલ્ટર કરવા માટે (દા.ત. `v-for="user in users" v-if="user.isActive"`). આ કિસ્સાઓમાં, `users` ને નવી કમ્પ્યુટેડ પ્રોપર્ટી સાથે બદલો જે તમારી ફિલ્ટર કરેલી લિસ્ટ પરત કરે (દા.ત. `activeUsers`).

- જો લિસ્ટ છુપાવવી હોય તો તેને રેન્ડર કરવાનું ટાળવા માટે (દા.ત. `v-for="user in users" v-if="shouldShowUsers"`). આ કિસ્સાઓમાં, `v-if` ને કન્ટેનર એલિમેન્ટ (દા.ત. `ul`, `ol`) પર ખસેડો.
:::

## `key` સાથે સ્ટેટ જાળવવું {#maintaining-state-with-key}

જ્યારે Vue `v-for` સાથે રેન્ડર કરાયેલા એલિમેન્ટ્સની સૂચિને અપડેટ કરી રહ્યું હોય, ત્યારે ડિફોલ્ટ રૂપે તે "in-place patch" વ્યૂહરચનાનો ઉપયોગ કરે છે. જો ડેટા આઇટમ્સનો ક્રમ બદલાયો હોય, તો આઇટમ્સના ક્રમ સાથે મેળ ખાવા માટે DOM એલિમેન્ટ્સને ખસેડવાને બદલે, Vue દરેક એલિમેન્ટને ઇન-પ્લેસ પેચ કરશે અને ખાતરી કરશે કે તે તે ચોક્કસ ઇન્ડેક્સ પર શું રેન્ડર થવું જોઈએ તે પ્રતિબિંબિત કરે છે.

આ ડિફોલ્ટ મોડ કાર્યક્ષમ છે, પરંતુ **ત્યારે જ યોગ્ય છે જ્યારે તમારું લિસ્ટ રેન્ડર આઉટપુટ ચાઇલ્ડ કમ્પોનન્ટ સ્ટેટ અથવા કામચલાઉ DOM સ્ટેટ (દા.ત. ફોર્મ ઇનપુટ વેલ્યુસ) પર આધારિત ન હોય**.

Vue ને એક સંકેત આપવા માટે કે જેથી તે દરેક નોડની ઓળખને ટ્રૅક કરી શકે અને આ રીતે અસ્તિત્વમાં હોય તેવા એલિમેન્ટ્સનો પુનઃઉપયોગ અને પુનઃક્રમાંકિત કરી શકે, તમારે દરેક આઇટમ માટે એક યુનિક (unique) `key` એટ્રિબ્યુટ પ્રદાન કરવાની જરૂર છે:

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- સામગ્રી -->
</div>
```

જ્યારે `<template v-for>` નો ઉપયોગ કરો છો, ત્યારે `key` `<template>` કન્ટેનર પર હોવી જોઈએ:

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip નોંધ
અહીં `key` એ `v-bind` સાથે બાંધવામાં આવેલ એક વિશેષ એટ્રિબ્યુટ છે. [ઓબ્જેક્ટ સાથે `v-for` નો ઉપયોગ કરતી વખતે](#v-for-with-an-object) પ્રોપર્ટી કી વેરિએબલ સાથે તેને મિક્સ ન કરવી જોઈએ.
:::

જ્યારે પણ શક્ય હોય ત્યારે `v-for` સાથે `key` એટ્રિબ્યુટ પ્રદાન કરવાની ભલામણ કરવામાં આવે છે, સિવાય કે ઇટરેટેડ DOM સામગ્રી સરળ હોય (એટલે ​​કે તેમાં કોઈ ઘટકો અથવા સ્ટેટફુલ DOM એલિમેન્ટ્સ ન હોય), અથવા તમે પર્ફોર્મન્સ લાભો માટે જાણી જોઈને ડિફોલ્ટ વર્તન પર આધાર રાખી રહ્યા હોવ.

`key` બાઈન્ડિંગ પ્રિમિટિવ વેલ્યુની અપેક્ષા રાખે છે - એટલે કે સ્ટ્રિંગ્સ અને નંબર્સ. `v-for` કી તરીકે ઓબ્જેક્ટ્સનો ઉપયોગ કરશો નહીં. `key` એટ્રિબ્યુટના વિગતવાર વપરાશ માટે, કૃપા કરીને [`key` API દસ્તાવેજીકરણ](/api/built-in-special-attributes#key) જુઓ.

## કમ્પોનન્ટ સાથે `v-for` {#v-for-with-a-component}

> આ વિભાગ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) ના જ્ઞાનને ધારે છે. તેને છોડી દેવા અને પછીથી પાછા આવવા માટે નિઃસંકોચ રહો.

તમે કોઈપણ સામાન્ય એલિમેન્ટની જેમ કમ્પોનન્ટ પર સીધો `v-for` ઉપયોગ કરી શકો છો (એક `key` આપવાનું ભૂલશો નહીં):

```vue-html
<MyComponent v-for="item in items" :key="item.id" />
```

જો કે, આ કમ્પોનન્ટમાં આપમેળે કોઈ ડેટા પાસ કરશે નહીં, કારણ કે ઘટકોના પોતાના સ્વયં-અલગ (isolated) સ્કોપ્સ હોય છે. કમ્પોનન્ટમાં ઇટરેટેડ ડેટા પાસ કરવા માટે, આપણે પ્રોપ્સ (props) નો પણ ઉપયોગ કરવો જોઈએ:

```vue-html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

ઘટકમાં `item` ને આપમેળે ઇન્જેક્ટ ન કરવાનું કારણ એ છે કે તે કમ્પોનન્ટને `v-for` કેવી રીતે કામ કરે છે તેની સાથે ચુસ્તપણે જોડે (tightly coupled) છે. તેનો ડેટા ક્યાંથી આવે છે તે વિશે સ્પષ્ટ બનવું ઘટકને અન્ય પરિસ્થિતિઓમાં પુનઃઉપયોગી બનાવે છે.

<div class="composition-api">

દરેક ઇન્સ્ટન્સમાં અલગ-અલગ ડેટા પાસ કરીને `v-for` નો ઉપયોગ કરીને ઘટકોની સૂચિ કેવી રીતે રેન્ડર કરવી તે જોવા માટે [સિમ્પલ ટોડો લિસ્ટનું આ ઉદાહરણ](https://play.vuejs.org/#eNp1U8Fu2zAM/RXCGGAHTWx02ylwgxZYB+ywYRhyq3dwLGYRYkuCJTsZjPz7KMmK3ay9JBQfH/meKA/Rk1Jp32G0jnJdtVwZ0Gg6tSkEb5RsDQzQ4h4usG9lAzGVxldoK5n8YzAYsTQLCduRygAKUUmhDQg8WWyLZwMPtmESx4sAGkL0mH6xrMH+AHC2hvuljw03Na4h/iLBHBAY1wfUbsTFVcwoH28o2/KIIDuaQ0TTlvrwNu/TDe+7PDlKXZ6EZxTiN4kuRI3W0dk4u4yUf7bZfScqw6WAkrEf3m+y8AOcw7Qv6w5T1elDMhs7Nbq7e61gdmme60SQAvgfIhExiSSJeeb3SBukAy1D1aVBezL5XrYN9Csp1rrbNdykqsUehXkookl0EVGxlZHX5Q5rIBLhNHFlbRD6xBiUzlOeuZJQz4XqjI+BxjSSYe2pQWwRBZizV01DmsRWeJA1Qzv0Of2TwldE5hZRlVd+FkbuOmOksJLybIwtkmfWqg+7qz47asXpSiaN3lxikSVwwfC8oD+/sEnV+oh/qcxmU85mebepgLjDBD622Mg+oDrVquYVJm7IEu4XoXKTZ1dho3gnmdJhedEymn9ab3ysDPdc4M9WKp28xE5JbB+rzz/Trm3eK3LAu8/E7p2PNzYM/i3ChR7W7L7hsSIvR7L2Aal1EhqTp80vF95sw3WcG7r8A0XaeME=) તપાસો.

</div>
<div class="options-api">

દરેક ઇન્સ્ટન્સમાં અલગ-અલગ ડેટા પાસ કરીને `v-for` નો ઉપયોગ કરીને ઘટકોની સૂચિ કેવી રીતે રેન્ડર કરવી તે જોવા માટે [સિમ્પલ ટોડો લિસ્ટનું આ ઉદાહરણ](https://play.vuejs.org/#eNo9T8FqwzAM/RWRS1pImnSMHYI3KOwwdtltJ1/cRqXe3Ng4ctYS8u+TbVJjLD3rPelpLg7O7aaARVeI8eS1ozc54M1ZT9DjWQVDMMsBoFekNtucS/JIwQ8RSQI+1/vX8QdP1K2E+EmaDHZQftg/IAu9BaNHGkEP8B2wrFYxgAp0sZ6pn2pAeLepmEuSXDiy7oL9gduXT+3+pW6f631bZoqkJY/kkB6+onnswoDw6owijIhEMByjUBgNU322/lUWm0mZgBX84r1ifz3ettHmupYskjbanedch2XZRcAKTnnvGVIPBpkqGqPTJNGkkaJ5+CiWf4KkfBs=) તપાસો.

</div>

## એરે (Array) ફેરફાર ડિટેક્શન {#array-change-detection}

### મેટેશન મેથડ્સ (Mutation Methods) {#mutation-methods}

Vue એ શોધવા માટે સક્ષમ છે કે જ્યારે રિએક્ટિવ એરેની મેટેશન મેથડ્સ કોલ કરવામાં આવે અને જરૂરી અપડેટ્સ ટ્રિગર થાય. આ મ્યુટેશન મેથડ્સ છે:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### એરેને બદલવું {#replacing-an-array}

મ્યુટેશન મેથડ્સ, જેમ કે નામ સૂચવે છે, તે અસલ એરેને મ્યુટેટ (mutate) કરે છે જેના પર તેઓ કોલ કરવામાં આવે છે. સરખામણીમાં, નોન-મ્યુટેટીંગ મેથડ્સ પણ છે, દા.ત. `filter()`, `concat()` અને `slice()`, જે અસલ એરેને મ્યુટેટ કરતી નથી પરંતુ **હંમેશા નવો એરે પરત કરે છે**. નોન-મ્યુટેટીંગ મેથડ્સ સાથે કામ કરતી વખતે, આપણે જૂના એરેને નવા એરે સાથે બદલવો જોઈએ:

<div class="composition-api">

```js
// `items` એ એરે વેલ્યુ સાથેનું ref છે
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

તમને લાગશે કે આનાથી Vue અસ્તિત્વમાં રહેલા DOM ને ફેંકી દેશે અને આખી લિસ્ટ ફરીથી રેન્ડર કરશે - સદભાગ્યે, એવું નથી. Vue DOM એલિમેન્ટના પુનઃઉપયોગને મહત્તમ કરવા માટે કેટલાક સ્માર્ટ હ્યુરિસ્ટિક્સ (heuristics) લાગુ કરે છે, તેથી ઓવરલેપિંગ ઓબ્જેક્ટ્સ ધરાવતા અન્ય એરે સાથે એરે બદલવું એ ખૂબ જ કાર્યક્ષમ કામગીરી છે.

## ફિલ્ટર/સોર્ટ કરેલા પરિણામો પ્રદર્શિત કરવા {#displaying-filtered-sorted-results}

ક્યારેક આપણે અસલ ડેટાને મ્યુટેટ કર્યા અથવા રીસેટ કર્યા વગર એરેનું ફિલ્ટર કરેલ અથવા સોર્ટ કરેલ વર્ઝન પ્રદર્શિત કરવા માંગીએ છીએ. આ કિસ્સામાં, તમે કમ્પ્યુટેડ પ્રોપર્ટી બનાવી શકો છો જે ફિલ્ટર કરેલી અથવા સોર્ટ કરેલી એરે પરત કરે છે.

ઉદાહરણ તરીકે:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

પરિસ્થિતિઓમાં જ્યાં કમ્પ્યુટેડ પ્રોપર્ટીઝ શક્ય નથી (દા.ત. નેસ્ટેડ `v-for` લૂપ્સની અંદર), તમે મેથડનો ઉપયોગ કરી શકો છો:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

કમ્પ્યુટેડ પ્રોપર્ટીમાં `reverse()` અને `sort()` સાથે સાવચેત રહો! આ બે મેથડ અસલ એરેને મ્યુટેટ કરશે, જે કમ્પ્યુટેડ ગેટર્સમાં ટાળવી જોઈએ. આ મેથડ્સ કોલ કરતા પહેલા અસલ એરેની નકલ બનાવો:

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
