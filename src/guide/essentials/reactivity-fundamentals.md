---
outline: deep
---

# રિએક્ટિવિટી ફંડામેન્ટલ્સ {#reactivity-fundamentals}

:::tip API પસંદગી (API Preference)
આ પૃષ્ઠ અને માર્ગદર્શિકાના પછીના ઘણા પ્રકરણો Options API અને Composition API માટે અલગ-અલગ સામગ્રી ધરાવે છે. તમારી વર્તમાન પસંદગી <span class="options-api">Options API</span><span class="composition-api">Composition API</span> છે. તમે ડાબી સાઇડબારની ટોચ પરના "API Preference" સ્વીચનો ઉપયોગ કરીને API શૈલીઓ વચ્ચે બદલી શકો છો.
:::

<div class="options-api">

## રિએક્ટિવ સ્ટેટ જાહેર કરવી \* {#declaring-reactive-state}

Options API સાથે, અમે ઘટકના રિએક્ટિવ સ્ટેટને જાહેર કરવા માટે `data` ઓપ્શનનો ઉપયોગ કરીએ છીએ. ઓપ્શનની વેલ્યુ એવું ફંક્શન હોવી જોઈએ જે ઓબ્જેક્ટ રિટર્ન કરે. Vue જ્યારે નવો કમ્પોનન્ટ ઇન્સ્ટન્સ બનાવશે ત્યારે ફંક્શનને કૉલ કરશે, અને પરત કરેલા ઓબ્જેક્ટને તેની રિએક્ટિવિટી સિસ્ટમમાં લપેટી લેશે. આ ઓબ્જેક્ટની કોઈપણ ટોપ-લેવલ પ્રોપર્ટીઝ કમ્પોનન્ટ ઇન્સ્ટન્સ પર પ્રોક્સી (proxy) થાય છે (મેથડ્સ અને લાઇફસાઇકલ હૂક્સમાં `this` તરીકે):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` એ લાઇફસાઇકલ હૂક છે જેને આપણે પછીથી સમજાવીશું
  mounted() {
    // `this` કમ્પોનન્ટ ઇન્સ્ટન્સનો સંદર્ભ આપે છે.
    console.log(this.count) // => 1

    // ડેટામાં ફેરફાર (mutated) પણ કરી શકાય છે
    this.count = 2
  }
}
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpFUNFqhDAQ/JXBpzsoHu2j3B2U/oYPpnGtoetGkrW2iP/eRFsPApthd2Zndilex7H8mqioimu0wY16r4W+Rx8ULXVmYsVSC9AaNafz/gcC6RTkHwHWT6IVnne85rI+1ZLr5YJmyG1qG7gIA3Yd2R/LhN77T8y9sz1mwuyYkXazcQI2SiHz/7iP3VlQexeb5KKjEKEe2lPyMIxeSBROohqxVO4E6yV6ppL9xykTy83tOQvd7tnzoZtDwhrBO2GYNFloYWLyxrzPPOi44WWLWUt618txvASUhhRCKSHgbZt2scKy7HfCujGOqWL9BVfOgyI=)

આ ઇન્સ્ટન્સ પ્રોપર્ટીઝ ફક્ત ત્યારે જ ઉમેરવામાં આવે છે જ્યારે ઇન્સ્ટન્સ પ્રથમ વખત બનાવવામાં આવે છે, તેથી તમારે ખાતરી કરવાની જરૂર છે કે તે બધી `data` ફંક્શન દ્વારા પરત કરાયેલા ઓબ્જેક્ટમાં હાજર છે. જ્યાં જરૂરી હોય ત્યાં, પ્રોપર્ટીઝ માટે `null`, `undefined` અથવા કોઈ અન્ય પ્લેસહોલ્ડર વેલ્યુનો ઉપયોગ કરો જ્યાં ઇચ્છિત મૂલ્ય હજી ઉપલબ્ધ ન હોય.

`data` માં સમાવિષ્ટ કર્યા વિના સીધા જ `this` પર નવી પ્રોપર્ટી ઉમેરવી શક્ય છે. જો કે, આ રીતે ઉમેરવામાં આવેલી પ્રોપર્ટીઝ રિએક્ટિવ અપડેટ્સ ટ્રિગર કરી શકશે નહીં.

Vue જ્યારે કમ્પોનન્ટ ઇન્સ્ટન્સ દ્વારા તેની પોતાની બિલ્ટ-ઇન API ને એક્સપોઝ કરે છે ત્યારે `$` પ્રિફિક્સનો ઉપયોગ કરે છે. તે આંતરિક પ્રોપર્ટીઝ માટે પ્રિફિક્સ `_` પણ અનામત રાખે છે. તમારે ટોપ-લેવલ `data` પ્રોપર્ટીઝ માટે આમાંના કોઈપણ અક્ષરોથી શરૂ થતા નામોનો ઉપયોગ કરવાનું ટાળવું જોઈએ.

### રિએક્ટિવ પ્રોક્સી વિરુદ્ધ અસલ \* {#reactive-proxy-vs-original}

Vue 3 માં, [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) નો લાભ લઈને ડેટાને રિએક્ટિવ બનાવવામાં આવે છે. Vue 2 થી આવતા વપરાશકર્તાઓએ નીચેના એજ કેસ (edge case) થી વાકેફ રહેવું જોઈએ:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

જ્યારે તમે `this.someObject` ને અસાઇન કર્યા પછી એક્સેસ કરો છો, ત્યારે વેલ્યુ એ અસલ `newObject` ની રિએક્ટિવ પ્રોક્સી છે. **Vue 2 ની જેમ અસલ `newObject` અકબંધ રહે છે અને તેને રિએક્ટિવ બનાવવામાં આવશે નહીં: હંમેશા `this` ની પ્રોપર્ટી તરીકે રિએક્ટિવ સ્ટેટને એક્સેસ કરવાની ખાતરી કરો.**

</div>

<div class="composition-api">

## રિએક્ટિવ સ્ટેટ જાહેર કરવી \*\* {#declaring-reactive-state-1}

### `ref()` \*\* {#ref}

Composition API માં, રિએક્ટિવ સ્ટેટ જાહેર કરવાની ભલામણ કરેલ રીત એ [`ref()`](/api/reactivity-core#ref) ફંક્શનનો ઉપયોગ છે:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` આર્ગ્યુમેન્ટ લે છે અને તેને `.value` પ્રોપર્ટી સાથેના રિફ (ref) ઓબ્જેક્ટની અંદર લપેટીને પરત કરે છે:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

> આ પણ જુઓ: [Typing Refs](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

કમ્પોનન્ટના ટેમ્પલેટમાં રિફ્સ (refs) ને એક્સેસ કરવા માટે, તેમને કમ્પોનન્ટના `setup()` ફંક્શનમાંથી જાહેર કરો અને પરત કરો:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // `setup` એ Composition API માટે સમર્પિત એક વિશિષ્ટ હૂક છે.
  setup() {
    const count = ref(0)

    // ટેમ્પલેટમાં ref એક્સપોઝ કરો
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

નોંધ લો કે ટેમ્પલેટમાં રિફનો ઉપયોગ કરતી વખતે અમારે `.value` જોડવાની જરૂર પડી **નથી**. સગવડ માટે, જ્યારે ટેમ્પલેટની અંદર ઉપયોગ કરવામાં આવે ત્યારે રિફ્સ આપોઆપ અનવ્રેપ (unwrap) થઈ જાય છે (થોડા [અવરોધો](#caveat-when-unwrapping-in-templates) સાથે).

તમે ઇવેન્ટ હેન્ડલર્સમાં સીધા જ ફેરફાર (mutate) કરી શકો છો:

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

વધુ જટિલ લોજિક માટે, અમે સમાન સ્કોપ (scope) માં રિફ્સમાં ફેરફાર કરતા ફંક્શન્સ જાહેર કરી શકીએ છીએ અને તેમને સ્ટેટની સાથે મેથડ્સ તરીકે એક્સપોઝ કરી શકીએ છીએ:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // JavaScript માં .value જરૂરી છે
      count.value++
    }

    // ફંક્શનને પણ એક્સપોઝ કરવાનું ભૂલશો નહીં.
    return {
      count,
      increment
    }
  }
}
```

એક્સપોઝ કરેલી મેથડ્સનો પછી ઇવેન્ટ હેન્ડલર્સ તરીકે ઉપયોગ કરી શકાય છે:

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

કોઈપણ બિલ્ડ ટૂલ્સનો ઉપયોગ કર્યા વિના, [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo) પર આ ઉદાહરણ લાઈવ છે.

### `<script setup>` \*\* {#script-setup}

`setup()` દ્વારા મેન્યુઅલી સ્ટેટ અને મેથડ્સ એક્સપોઝ કરવી કંટાળાજનક હોઈ શકે છે. સદભાગ્યે, [સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (SFCs)](/guide/scaling-up/sfc) નો ઉપયોગ કરતી વખતે તેને ટાળી શકાય છે. અમે `<script setup>` સાથે તેનો વપરાશ સરળ બનાવી શકીએ છીએ:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

`<script setup>` માં જાહેર કરવામાં આવેલા ટોપ-લેવલ ઇમ્પોર્ટ્સ, વેરિએબલ્સ અને ફંક્શન્સ સમાન ઘટકના ટેમ્પલેટમાં આપમેળે વાપરી શકાય તેવા હોય છે. ટેમ્પલેટને સમાન સ્કોપમાં જાહેર કરાયેલા જાવાસ્ક્રિપ્ટ ફંક્શન તરીકે વિચારો - તે સ્વાભાવિક રીતે તેની સાથે જાહેર કરાયેલ દરેક વસ્તુની એક્સેસ ધરાવે છે.

:::tip
માર્ગદર્શિકાના બાકીના ભાગો માટે, અમે Composition API કોડ ઉદાહરણો માટે મુખ્યત્વે SFC + `<script setup>` સિન્ટેક્સનો ઉપયોગ કરીશું, કારણ કે Vue ડેવલપર્સ માટે તે સૌથી સામાન્ય વપરાશ છે.

જો તમે SFC નો ઉપયોગ કરી રહ્યાં નથી, તો પણ તમે [`setup()`](/api/composition-api-setup) ઓપ્શન સાથે Composition API નો ઉપયોગ કરી શકો છો.
:::

### રિફ્સ (Refs) શા માટે? \*\* {#why-refs}

તમે કદાચ વિચારતા હશો કે આપણને સાદા વેરિએબલ્સને બદલે `.value` સાથેના રિફ્સની કેમ જરૂર છે. તે સમજાવવા માટે, આપણે Vue ની રિએક્ટિવિટી સિસ્ટમ કેવી રીતે કાર્ય કરે છે તેની ટૂંકમાં ચર્ચા કરવાની જરૂર પડશે.

જ્યારે તમે ટેમ્પલેટમાં રિફનો ઉપયોગ કરો છો અને પછીથી રિફની વેલ્યુ બદલો છો, ત્યારે Vue આપમેળે ફેરફાર શોધી કાઢે છે અને તે મુજબ DOM ને અપડેટ કરે છે. આ ડિપેન્ડન્સી-ટ્રેકિંગ (dependency-tracking) આધારિત રિએક્ટિવિટી સિસ્ટમ સાથે શક્ય બન્યું છે. જ્યારે કોઈ ઘટક પ્રથમ વખત રેન્ડર થાય છે, ત્યારે Vue રેન્ડર દરમિયાન ઉપયોગમાં લેવાયેલા દરેક રિફને **ટ્રૅક (tracks)** કરે છે. બાદમાં, જ્યારે રિફમાં ફેરફાર કરવામાં આવે છે, ત્યારે તે તેને ટ્રૅક કરતા ઘટકો માટે ફરીથી રેન્ડર (re-render) કરવાનું **ટ્રિગર (trigger)** કરશે.

પ્રમાણભૂત JavaScript માં, સાદા વેરિએબલ્સની એક્સેસ અથવા ફેરફારને શોધવાનો કોઈ રસ્તો નથી. જો કે, અમે ગેટર (getter) અને સેટર (setter) મેથડનો ઉપયોગ કરીને ઓબ્જેક્ટની પ્રોપર્ટીઝના ગેટ અને સેટ ઓપરેશન્સને અટકાવી શકીએ છીએ.

`.value` પ્રોપર્ટી Vue ને એ શોધવાની તક આપે છે કે ક્યારે કોઈ રિફ એક્સેસ અથવા મ્યુટેટેડ (mutated) થઈ છે. અંદરથી, Vue તેના ગેટરમાં ટ્રેકિંગ કરે છે અને તેના સેટરમાં ટ્રિગરિંગ કરે છે. કલ્પનાત્મક રીતે, તમે રિફને એવા ઓબ્જેક્ટ તરીકે વિચારી શકો છો જે આના જેવો દેખાય છે:

```js
// સ્યુડો કોડ, વાસ્તવિક અમલીકરણ નથી
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

રિફ્સનો બીજો સારો ગુણ એ છે કે સાદા વેરિએબલ્સથી વિપરીત, તમે નવીનતમ વેલ્યુ અને રિએક્ટિવિટી કનેક્શનની એક્સેસ જાળવી રાખીને રિફ્સને ફંક્શન્સમાં પાસ કરી શકો છો. જટિલ લોજિકને પુનઃઉપયોગી કોડમાં રિફેક્ટરિંગ કરતી વખતે આ ખાસ કરીને ઉપયોગી છે.

રિએક્ટિવિટી સિસ્ટમ વિશે વધુ વિગતવાર [રિએક્ટિવિટી ઇન ડેપ્થ](/guide/extras/reactivity-in-depth) વિભાગમાં ચર્ચા કરવામાં આવી છે.
</div>

<div class="options-api">

## મેથડ્સ જાહેર કરવી \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="ફ્રી Vue.js મેથડ્સ લેસન"/>

કમ્પોનન્ટ ઇન્સ્ટન્સમાં મેથડ્સ ઉમેરવા માટે આપણે `methods` ઓપ્શનનો ઉપયોગ કરીએ છીએ. આમાં જોઈતી મેથડ્સ ધરાવતી ઓબ્જેક્ટ હોવી જોઈએ:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // મેથડ્સને લાઇફસાઇકલ હૂક્સમાં અથવા અન્ય મેથડ્સમાં કોલ કરી શકાય છે!
    this.increment()
  }
}
```

Vue આપોઆપ `methods` માટે `this` વેલ્યુને બાઈન્ડ કરે છે જેથી તે હંમેશા કમ્પોનન્ટ ઇન્સ્ટન્સનો સંદર્ભ આપે. આ સુનિશ્ચિત કરે છે કે જો કોઈ મેથડનો ઉપયોગ ઇવેન્ટ લિસનર અથવા કોલબેક તરીકે કરવામાં આવે તો તે યોગ્ય `this` વેલ્યુ જાળવી રાખે છે. `methods` વ્યાખ્યાયિત કરતી વખતે તમારે એરો ફંક્શન્સ (arrow functions) નો ઉપયોગ કરવાનું ટાળવું જોઈએ, કારણ કે તે Vue ને યોગ્ય `this` વેલ્યુ બાંધતા અટકાવે છે:

```js
export default {
  methods: {
    increment: () => {
      // ખરાબ: અહીં `this` એક્સેસ નથી!
    }
  }
}
```

કમ્પોનન્ટ ઇન્સ્ટન્સની અન્ય તમામ પ્રોપર્ટીઝની જેમ, `methods` કમ્પોનન્ટના ટેમ્પલેટની અંદરથી એક્સેસ કરી શકાય છે. ટેમ્પલેટની અંદર તેનો ઉપયોગ સામાન્ય રીતે ઇવેન્ટ લિસનર્સ (event listeners) તરીકે થાય છે:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

ઉપરના ઉદાહરણમાં, જ્યારે `<button>` ક્લિક કરવામાં આવશે ત્યારે મેથડ `increment` કોલ કરવામાં આવશે.

</div>

### ડીપ (Deep) રિએક્ટિવિટી {#deep-reactivity}

<div class="options-api">

Vue માં, સ્ટેટ ડિફોલ્ટ રૂપે ડીપ રિએક્ટિવ (deeply reactive) હોય છે. આનો અર્થ એ છે કે જ્યારે તમે નેસ્ટેડ ઓબ્જેક્ટ્સ અથવા એરેમાં ફેરફાર કરો છો ત્યારે પણ ફેરફારો શોધી શકાય છે:

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // આ અપેક્ષા મુજબ કામ કરશે.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

રિફ્સ (Refs) કોઈપણ વેલ્યુ પ્રકાર ધરાવી શકે છે જેમાં ડીપલી નેસ્ટેડ ઓબ્જેક્ટ્સ, એરે અથવા JavaScript બિલ્ટ-ઇન ડેટા સ્ટ્રક્ચર્સ જેમ કે `Map` નો સમાવેશ થાય છે.

રિફ તેની વેલ્યુને ડીપલી રિએક્ટિવ બનાવશે. આનો અર્થ એ છે કે જ્યારે તમે નેસ્ટેડ ઓબ્જેક્ટ્સ અથવા એરેમાં ફેરફાર કરો છો ત્યારે પણ ફેરફારો શોધી શકાય છે:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // આ અપેક્ષા મુજબ કામ કરશે.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

બિન-પ્રિમિટિવ (Non-primitive) મૂલ્યોને [`reactive()`](#reactive) દ્વારા રિએક્ટિવ પ્રોક્સીમાં ફેરવવામાં આવે છે, જેની નીચે ચર્ચા કરવામાં આવી છે.

[shallow refs](/api/reactivity-advanced#shallowref) સાથે ડીપ રિએક્ટિવિટી ને ઓપ્ટ-આઉટ (opt-out) કરવી પણ શક્ય છે. શેલો રિફ્સ (shallow refs) માટે, રિએક્ટિવિટી માટે ફક્ત `.value` એક્સેસ ટ્રૅક કરવામાં આવે છે. મોટા ઓબ્જેક્ટ્સના અવલોકન ખર્ચને ટાળીને અથવા જ્યાં આંતરિક સ્થિતિ બાહ્ય લાઇબ્રેરી દ્વારા સંચાલિત હોય તેવા કિસ્સાઓમાં પર્ફોર્મન્સ ઑપ્ટિમાઇઝ કરવા માટે શેલો રિફ્સનો ઉપયોગ કરી શકાય છે.

વધુ વાંચન:

- [મોટી ઇમ્યુટેબલ રચનાઓ માટે રિએક્ટિવિટી ઓવરહેડ ઘટાડો](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [બાહ્ય સ્ટેટ સિસ્ટમ્સ સાથે સંકલન](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### DOM અપડેટ ટાઈમિંગ {#dom-update-timing}

જ્યારે તમે રિએક્ટિવ સ્ટેટમાં ફેરફાર કરો છો, ત્યારે DOM આપોઆપ અપડેટ થાય છે. જો કે, એ નોંધવું જોઈએ કે DOM અપડેટ્સ સિંક્રનસ (synchronously) રીતે લાગુ પડતા નથી. તેના બદલે, Vue તેમને અપડેટ ચક્રમાં "નેક્સ્ટ ટીક (next tick)" સુધી બફર (buffers) કરે છે જેથી ખાતરી કરી શકાય કે તમે કેટલા ડેટા ફેરફારો કર્યા છે તે મહત્વનું નથી, દરેક ઘટક માત્ર એક જ વાર અપડેટ થાય.

સ્ટેટ ફેરફાર પછી DOM અપડેટ પૂર્ણ થાય તેની રાહ જોવા માટે, તમે [nextTick()](/api/general#nexttick) ગ્લોબલ API નો ઉપયોગ કરી શકો છો:

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // હવે DOM અપડેટ થયેલ છે
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // હવે DOM અપડેટ થયેલ છે
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()` \*\* {#reactive}

રિએક્ટિવ સ્ટેટ જાહેર કરવાની બીજી રીત છે, જે `reactive()` API સાથે છે. રિફની વિપરીત જે આંતરિક વેલ્યુને વિશેષ ઓબ્જેક્ટમાં લપેટી લે છે, `reactive()` ઓબ્જેક્ટને પોતે જ રિએક્ટિવ બનાવે છે:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> આ પણ જુઓ: [Typing Reactive](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

ટેમ્પલેટમાં વપરાશ:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

રિએક્ટિવ ઓબ્જેક્ટ્સ [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) છે અને સામાન્ય ઓબ્જેક્ટ્સની જેમ જ વર્તે છે. તફાવત એ છે કે Vue રિએક્ટિવિટી ટ્રેકિંગ અને ટ્રિગરીંગ માટે રિએક્ટિવ ઓબ્જેક્ટની તમામ પ્રોપર્ટીઝની એક્સેસ અને ફેરફારને અટકાવવા સક્ષમ છે.

`reactive()` ઓબ્જેક્ટને ડીપલી કન્વર્ટ કરે છે: જ્યારે એક્સેસ કરવામાં આવે ત્યારે નેસ્ટેડ ઓબ્જેક્ટ્સ પણ `reactive()` સાથે લપેટાયેલા હોય છે. જ્યારે રિફ વેલ્યુ ઓબ્જેક્ટ હોય ત્યારે તે આંતરિક રીતે `ref()` દ્વારા પણ કોલ કરવામાં આવે છે. શેલો રિફ્સની જેમ, ડીપ રિએક્ટિવિટીમાંથી ઓપ્ટ-આઉટ કરવા માટે [`shallowReactive()`](/api/reactivity-advanced#shallowreactive) API પણ છે.

### રિએક્ટિવ પ્રોક્સી વિરુદ્ધ અસલ \*\* {#reactive-proxy-vs-original-1}

એ નોંધવું અગત્યનું છે કે `reactive()` માંથી પરત કરાયેલ વેલ્યુ અસલ ઓબ્જેક્ટની [પ્રોક્સી (Proxy)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) છે, જે અસલ ઓબ્જેક્ટની સમાન નથી:

```js
const raw = {}
const proxy = reactive(raw)

// પ્રોક્સી અસલ સમાન નથી.
console.log(proxy === raw) // false
```

સિર્ફ પ્રોક્સી જ રિએક્ટિવ છે - અસલ ઓબ્જેક્ટ બદલવાથી અપડેટ્સ ટ્રિગર થશે નહીં. તેથી, Vue ની રિએક્ટિવિટી સિસ્ટમ સાથે કામ કરતી વખતે શ્રેષ્ઠ અભ્યાસ એ છે કે **તમારા સ્ટેટના પ્રોક્સિએડ વર્ઝનનો વિશિષ્ટ રીતે ઉપયોગ કરવો**.

પ્રોક્સીની સુસંગત એક્સેસ સુનિશ્ચિત કરવા માટે, સમાન ઓબ્જેક્ટ પર `reactive()` ને કોલ કરવાથી હંમેશા સમાન પ્રોક્સી મળે છે, અને અસ્તિત્વમાં હોય તેવી પ્રોક્સી પર `reactive()` ને કોલ કરવાથી પણ તે જ પ્રોક્સી મળે છે:

```js
// સમાન ઓબ્જેક્ટ પર reactive() કોલ કરવાથી તે જ પ્રોક્સી પરત મળે છે
console.log(reactive(raw) === proxy) // true

// પ્રોક્સી પર reactive() કોલ કરવાથી તે પોતે જ પરત મળે છે
console.log(reactive(proxy) === proxy) // true
```

આ નિયમ નેસ્ટેડ ઓબ્જેક્ટ્સને પણ લાગુ પડે છે. ડીપ રિએક્ટિવિટીને કારણે, રિએક્ટિવ ઓબ્જેક્ટની અંદર નેસ્ટેડ ઓબ્જેક્ટ્સ પણ પ્રોક્સી છે:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### `reactive()` ની મર્યાદાઓ \*\* {#limitations-of-reactive}

`reactive()` API ની કેટલીક મર્યાદાઓ છે:

1. **મર્યાદિત વેલ્યુ પ્રકારો:** તે ફક્ત ઓબ્જેક્ટ પ્રકારો (ઓબ્જેક્ટ્સ, એરે અને [કલેક્શન પ્રકારો](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) જેમ કે `Map` અને `Set`) માટે જ કામ કરે છે. તે [પ્રિમિટિવ પ્રકારો](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) જેમ કે `string`, `number` અથવા `boolean` ને પકડી શકતું નથી.

2. **સમગ્ર ઓબ્જેક્ટને બદલી શકાતું નથી:** કારણ કે Vue નું રિએક્ટિવિટી ટ્રેકિંગ પ્રોપર્ટી એક્સેસ પર કામ કરે છે, આપણે હંમેશા રિએક્ટિવ ઓબ્જેક્ટનો સમાન સંદર્ભ (reference) રાખવો જોઈએ. આનો અર્થ એ છે કે આપણે રિએક્ટિવ ઓબ્જેક્ટને સરળતાથી "બદલી" શકતા નથી કારણ કે પ્રથમ સંદર્ભ સાથેનું રિએક્ટિવિટી કનેક્શન ખોવાઈ જાય છે:

   ```js
   let state = reactive({ count: 0 })

   // ઉપરનો સંદર્ભ ({ count: 0 }) હવે ટ્રૅક કરવામાં આવી રહ્યો નથી
   // (રિએક્ટિવિટી કનેક્શન ખોવાઈ ગયું છે!)
   state = reactive({ count: 1 })
   ```

3. **ડિસ્ટ્રક્ચર-ફ્રેન્ડલી નથી:** જ્યારે આપણે રિએક્ટિવ ઓબ્જેક્ટની પ્રિમિટિવ ટાઈપ પ્રોપર્ટીને લોકલ વેરિએબલ્સમાં ડિસ્ટ્રક્ચર (destructure) કરીએ છીએ, અથવા જ્યારે આપણે તે પ્રોપર્ટીને ફંક્શનમાં પાસ કરીએ છીએ, ત્યારે આપણે રિએક્ટિવિટી કનેક્શન ગુમાવીશું:

   ```js
   const state = reactive({ count: 0 })

   // જ્યારે ડિસ્ટ્રક્ચર કરવામાં આવે ત્યારે count એ state.count થી ડિસ્કનેક્ટ થઈ જાય છે.
   let { count } = state
   // અસલ સ્ટેટ ને અસર કરતું નથી
   count++

   // ફંક્શનને પ્લેન નંબર મળે છે અને
   // state.count માં થતા ફેરફારને ટ્રૅક કરી શકશે નહીં.
   // રિએક્ટિવિટી જાળવવા માટે આપણે આખો ઓબ્જેક્ટ પાસ કરવો પડશે
   callSomeFunction(state.count)
   ```

આ મર્યાદાઓને કારણે, અમે રિએક્ટિવ સ્ટેટ જાહેર કરવા માટે પ્રાથમિક API તરીકે `ref()` નો ઉપયોગ કરવાની ભલામણ કરીએ છીએ.

## વધારાના રિફ અનવ્રેપિંગ (Ref Unwrapping) ની વિગતો \*\* {#additional-ref-unwrapping-details}

### રિએક્ટિવ ઓબ્જેક્ટ પ્રોપર્ટી તરીકે \*\* {#ref-unwrapping-as-reactive-object-property}

જ્યારે રિએક્ટિવ ઓબ્જેક્ટની પ્રોપર્ટી તરીકે એક્સેસ અથવા મ્યુટેટેડ કરવામાં આવે ત્યારે રિફ આપમેળે અનવ્રેપ (unwrap) થાય છે. બીજા શબ્દોમાં કહીએ તો, તે સામાન્ય પ્રોપર્ટીની જેમ વર્તે છે:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

જો હાલના રિફ સાથે લિંક કરેલી પ્રોપર્ટીને નવો રિફ અસાઇન કરવામાં આવે, તો તે જૂના રિફને બદલી દેશે:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// અસલ રિફ હવે state.count થી ડિસ્કનેક્ટ થઈ ગયો છે
console.log(count.value) // 1
```

રિફ અનવ્રેપિંગ ફક્ત ત્યારે જ થાય છે જ્યારે ડીપ રિએક્ટિવ ઓબ્જેક્ટની અંદર નેસ્ટ થયેલ હોય. જ્યારે તેને [શેલો રિએક્ટિવ ઓબ્જેક્ટ (shallow reactive object)](/api/reactivity-advanced#shallowreactive) ની પ્રોપર્ટી તરીકે એક્સેસ કરવામાં આવે ત્યારે તે લાગુ પડતું નથી.

### એરે (Arrays) અને કલેક્શનમાં ચેતવણી \*\* {#caveat-in-arrays-and-collections}

રિએક્ટિવ ઓબ્જેક્ટ્સથી વિપરીત, જ્યારે રિફને રિએક્ટિવ એરેના એલિમેન્ટ અથવા `Map` જેવી મૂળ કલેક્શન ટાઈપ તરીકે એક્સેસ કરવામાં આવે ત્યારે **કોઈ** અનવ્રેપિંગ કરવામાં આવતું નથી:

```js
const books = reactive([ref('Vue 3 Guide')])
// અહીં .value ની જરૂર છે
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// અહીં .value ની જરૂર છે
console.log(map.get('count').value)
```

### ટેમ્પલેટ્સમાં અનવ્રેપિંગ કરતી વખતે ચેતવણી \*\* {#caveat-when-unwrapping-in-templates}

ટેમ્પલેટ્સમાં રિફ અનવ્રેપિંગ ફક્ત ત્યારે જ લાગુ થાય છે જો રિફ ટેમ્પલેટ રેન્ડર કોન્ટેક્સ્ટમાં ટોપ-લેવલ પ્રોપર્ટી હોય.

નીચેના ઉદાહરણમાં, `count` અને `object` ટોપ-લેવલ પ્રોપર્ટીઝ છે, પરંતુ `object.id` નથી:

```js
const count = ref(0)
const object = { id: ref(1) }
```

તેથી, આ એક્સપ્રેશન અપેક્ષા મુજબ કામ કરે છે:

```vue-html
{{ count + 1 }}
```

...જ્યારે આ કામ કરતું **નથી**:

```vue-html
{{ object.id + 1 }}
```

રેન્ડર કરેલ પરિણામ `[object Object]1` હશે કારણ કે એક્સપ્રેશનના મૂલ્યાંકન વખતે `object.id` અનવ્રેપ થયેલું નથી અને તે રિફ ઓબ્જેક્ટ રહે છે. આને ઠીક કરવા માટે, અમે `id` ને ટોપ-લેવલ પ્રોપર્ટીમાં ડિસ્ટ્રક્ચર કરી શકીએ છીએ:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

હવે રેન્ડર પરિણામ `2` હશે.

બીજી નોંધવા જેવી બાબત એ છે કે રિફ અનવ્રેપ થઈ જાય છે જો તે ટેક્સ્ટ ઇન્ટરપોલેશનનું અંતિમ મૂલ્યાંકન કરેલ મૂલ્ય હોય (એટલે ​​કે <code v-pre>{{ }}</code> ટેગ), તેથી નીચે આપેલ `1` રેન્ડર થશે:

```vue-html
{{ object.id }}
```

આ ફક્ત ટેક્સ્ટ ઇન્ટરપોલેશનની સગવડતા છે અને તે <code v-pre>{{ object.id.value }}</code> ની સમકક્ષ છે.

</div>

<div class="options-api">

### સ્ટેટફુલ મેથડ્સ (Stateful Methods) \* {#stateful-methods}

કેટલાક કિસ્સાઓમાં, અમારે ગતિશીલ રીતે મેથડ ફંક્શન બનાવવાની જરૂર પડી શકે છે, ઉદાહરણ તરીકે ડિબાઉન્સ્ડ (debounced) ઇવેન્ટ હેન્ડલર બનાવવું:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Lodash સાથે ડિબાઉન્સિંગ (Debouncing)
    click: debounce(function () {
      // ... ક્લિકનો પ્રતિભાવ આપો ...
    }, 500)
  }
}
```

જો કે, આ અભિગમ પુનઃઉપયોગમાં લેવાતા ઘટકો માટે સમસ્યારૂપ છે કારણ કે ડિબાઉન્સ્ડ ફંક્શન **સ્ટેટફુલ (stateful)** છે: તે વીતેલા સમય પર અમુક આંતરિક સ્ટેટ જાળવી રાખે છે. જો બહુવિધ કમ્પોનન્ટ ઇન્સ્ટન્સ સમાન ડિબાઉન્સ્ડ ફંક્શનને શેર કરે છે, તો તેઓ એકબીજામાં દખલ કરશે.

દરેક કમ્પોનન્ટ ઇન્સ્ટન્સના ડિબાઉન્સ્ડ ફંક્શનને અન્યોથી સ્વતંત્ર રાખવા માટે, આપણે `created` લાઇફસાઇકલ હૂકમાં ડિબાઉન્સ્ડ વર્ઝન બનાવી શકીએ છીએ:

```js
export default {
  created() {
    // હવે દરેક ઇન્સ્ટન્સ પાસે ડિબાઉન્સ્ડ હેન્ડલરની પોતાની કોપી છે
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // જ્યારે કમ્પોનન્ટ દૂર કરવામાં આવે ત્યારે પણ
    // ટાઈમર કેન્સલ કરવું એ સારો વિચાર છે.
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... ક્લિકનો પ્રતિભાવ આપો ...
    }
  }
}
```

</div>
