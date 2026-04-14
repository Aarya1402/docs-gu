# કમ્પ્યુટેડ પ્રોપર્ટીઝ {#computed-properties}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="ફ્રી Vue.js કમ્પ્યુટેડ પ્રોપર્ટીઝ લેસન"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="ફ્રી Vue.js કમ્પ્યુટેડ પ્રોપર્ટીઝ લેસન"/>
</div>

## મૂળભૂત ઉદાહરણ {#basic-example}

ટેમ્પલેટમાં રહેલા એક્સપ્રેશન્સ (In-template expressions) ખૂબ અનુકૂળ છે, પરંતુ તે સાદા ઓપરેશન્સ માટે હોય છે. તમારા ટેમ્પલેટ્સમાં ખૂબ જ લોજિક મૂકવાથી તેઓ જટિલ અને જાળવણી કરવા મુશ્કેલ બની શકે છે. ઉદાહરણ તરીકે, જો આપણી પાસે નેસ્ટેડ એરે વાળું ઓબ્જેક્ટ હોય:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

અને આપણે `author` પાસે પહેલેથી જ પુસ્તકો છે કે નહીં તેના આધારે અલગ અલગ સંદેશાઓ પ્રદર્શિત કરવા માંગીએ છીએ:

```vue-html
<p>પુસ્તકો પ્રકાશિત થયા છે:</p>
<span>{{ author.books.length > 0 ? 'હા' : 'ના' }}</span>
```

આ સ્થાને, ટેમ્પલેટ થોડું અસ્પષ્ટ (cluttered) બની રહ્યું છે. આપણે તેને એક સેકન્ડ માટે જોવું પડશે તે સમજવા માટે કે તે `author.books` પર આધારિત ગણતરી કરે છે. વધુ મહત્ત્વનું એ છે કે, જો આપણે ટેમ્પલેટમાં આ ગણતરીનો એકથી વધુ વાર સમાવેશ કરવાની જરૂર હોય તો આપણે તેને વારંવાર દોહરાવવા માંગતા નથી.

તેથી જ રિએક્ટિવ ડેટા ધરાવતા જટિલ લોજિક માટે, **કમ્પ્યુટેડ પ્રોપર્ટી (computed property)** નો ઉપયોગ કરવાની ભલામણ કરવામાં આવે છે. સમાન ઉદાહરણ અહીં રિફેક્ટર કરીને આપેલું છે:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // કમ્પ્યુટેડ ગેટર (getter)
    publishedBooksMessage() {
      // `this` કમ્પોનન્ટ ઇન્સ્ટન્સ તરફ નિર્દેશ કરે છે
      return this.author.books.length > 0 ? 'હા' : 'ના'
    }
  }
}
```

```vue-html
<p>પુસ્તકો પ્રકાશિત થયા છે:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkN1KxDAQhV/l0JsqaFfUq1IquwiKsF6JINaLbDNui20S8rO4lL676c82eCFCIDOZMzkzXxetlUoOjqI0ykypa2XzQtC3ktqC0ydzjUVXCIAzy87OpxjQZJ0WpwxgzlZSp+EBEKylFPGTrATuJcUXobST8sukeA8vQPzqCNe4xJofmCiJ48HV/FfbLLrxog0zdfmn4tYrXirC9mgs6WMcBB+nsJ+C8erHH0rZKmeJL0sot2tqUxHfDONuyRi2p4BggWCr2iQTgGTcLGlI7G2FHFe4Q/xGJoYn8SznQSbTQviTrRboPrHUqoZZ8hmQqfyRmTDFTC1bqalsFBN5183o/3NG33uvuWUwXYyi/gdTEpwK)

અહીં આપણે કમ્પ્યુટેડ પ્રોપર્ટી `publishedBooksMessage` જાહેર કરી છે.

એપ્લિકેશનના `data` માં `books` એરેની વેલ્યુ બદલવાનો પ્રયાસ કરો અને તમે જોશો કે `publishedBooksMessage` તે મુજબ કેવી રીતે બદલાય છે.

તમે ટેમ્પલેટ્સમાં સામાન્ય પ્રોપર્ટીની જેમ જ કમ્પ્યુટેડ પ્રોપર્ટીઝમાં ડેટા-બાઈન્ડ (data-bind) કરી શકો છો. Vue જાણે છે કે `this.publishedBooksMessage` એ `this.author.books` પર આધાર રાખે છે, તેથી જ્યારે `this.author.books` બદલાશે ત્યારે તે `this.publishedBooksMessage` પર આધારિત કોઈપણ બાઈન્ડિંગ્સને અપડેટ કરશે.

આ પણ જુઓ: [Typing Computed Properties](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// એ કમ્પ્યુટેડ ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'હા' : 'ના'
})
</script>

<template>
  <p>પુસ્તકો પ્રકાશિત થયા છે:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1kE9Lw0AQxb/KI5dtoTainkoaaREUoZ5EEONhm0ybYLO77J9CCfnuzta0vdjbzr6Zeb95XbIwZroPlMySzJW2MR6OfDB5oZrWaOvRwZIsfbOnCUrdmuCpQo+N1S0ET4pCFarUynnI4GttMT9PjLpCAUq2NIN41bXCkyYxiZ9rrX/cDF/xDYiPQLjDDRbVXqqSHZ5DUw2tg3zP8lK6pvxHe2DtvSasDs6TPTAT8F2ofhzh0hTygm5pc+I1Yb1rXE3VMsKsyDm5JcY/9Y5GY8xzHI+wnIpVw4nTI/10R2rra+S4xSPEJzkBvvNNs310ztK/RDlLLjy1Zic9cQVkJn+R7gIwxJGlMXiWnZEq77orhH3Pq2NH9DjvTfpfSBSbmA==)

અહીં આપણે કમ્પ્યુટેડ પ્રોપર્ટી `publishedBooksMessage` જાહેર કરી છે. `computed()` ફંક્શન અપેક્ષા રાખે છે કે તેને [ગેટર ફંક્શન (getter function)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) પાસ કરવામાં આવે, અને પરત કરેલ મૂલ્ય એક **કમ્પ્યુટેડ ref (computed ref)** છે. સામાન્ય રિફ્સની જેમ, તમે કમ્પ્યુટેડ પરિણામને `publishedBooksMessage.value` તરીકે એક્સેસ કરી શકો છો. ટેમ્પલેટ્સમાં કમ્પ્યુટેડ રિફ્સ પણ ઓટો-અનવ્રેપ (auto-unwrapped) થાય છે જેથી તમે ટેમ્પલેટ એક્સપ્રેશન્સમાં `.value` વગર તેમનો સંદર્ભ લઈ શકો.

કમ્પ્યુટેડ પ્રોપર્ટી આપમેળે તેની રિએક્ટિવ ડિપેન્ડન્સી (reactive dependencies) ને ટ્રૅક કરે છે. Vue જાણે છે કે `publishedBooksMessage` ની ગણતરી `author.books` પર આધારિત છે, તેથી જ્યારે `author.books` બદલાશે ત્યારે તે `publishedBooksMessage` પર આધારિત કોઈપણ બાઈન્ડિંગ્સને અપડેટ કરશે.

આ પણ જુઓ: [Typing Computed](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />

</div>

## કમ્પ્યુટેડ કેશીંગ (Caching) વિરુદ્ધ મેથડ્સ {#computed-caching-vs-methods}

તમે નોંધ્યું હશે કે આપણે એક્સપ્રેશનમાં મેથડ ઇનવોક (invoking) કરીને સમાન પરિણામ પ્રાપ્ત કરી શકીએ છીએ:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// કમ્પોનન્ટમાં
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'હા' : 'ના'
  }
}
```

</div>

<div class="composition-api">

```js
// કમ્પોનન્ટમાં
function calculateBooksMessage() {
  return author.books.length > 0 ? 'હા' : 'ના'
}
```

</div>

કમ્પ્યુટેડ પ્રોપર્ટીને બદલે, આપણે સમાન ફંક્શનને મેથડ તરીકે વ્યાખ્યાયિત કરી શકીએ છીએ. અંતિમ પરિણામ માટે, બંને અભિગમો ખરેખર બરાબર સમાન છે. જો કે, તફાવત એ છે કે **કમ્પ્યુટેડ પ્રોપર્ટીઝ તેમની રિએક્ટિવ ડિપેન્ડન્સીના આધારે કેશ (cached) થાય છે.** કમ્પ્યુટેડ પ્રોપર્ટી ત્યારે જ ફરીથી મૂલ્યાંકન (re-evaluate) થશે જ્યારે તેની કેટલીક રિએક્ટિવ ડિપેન્ડન્સી બદલાઈ હશે. આનો અર્થ એ છે કે જે સુધી `author.books` બદલાયું નથી, ત્યાં સુધી `publishedBooksMessage` ની બહુવિધ એક્સેસ ગેટર ફંક્શનને ફરીથી ચલાવ્યા વગર અગાઉથી ગણતરી કરેલ પરિણામ તરત જ પરત કરશે.

આનો અર્થ એ પણ છે કે નીચેની કમ્પ્યુટેડ પ્રોપર્ટી ક્યારેય અપડેટ થશે નહીં, કારણ કે `Date.now()` રિએક્ટિવ ડિપેન્ડન્સી નથી:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

સરખામણીમાં, જ્યારે પણ રિન-રેન્ડર થાય ત્યારે મેથડ ઇન્વોકેશન (method invocation) **હંમેશા** ફંક્શન ચલાવશે.

આપણને કેશીંગ (caching) ની કેમ જરૂર છે? કલ્પના કરો કે આપણી પાસે એક ખર્ચાળ (expensive) કમ્પ્યુટેડ પ્રોપર્ટી `list` છે, જેને વિશાળ એરે દ્વારા લૂપિંગ કરવાની અને ઘણી બધી ગણતરીઓ કરવાની જરૂર છે. પછી આપણી પાસે અન્ય કમ્પ્યુટેડ પ્રોપર્ટીઝ હોઈ શકે છે જે બદલામાં `list` પર આધારિત હોય. કેશીંગ વિના, આપણે `list` ના ગેટરને જરૂર કરતાં ઘણી વધુ વાર ચલાવીશું! એવા કિસ્સામાં કે જ્યાં તમે કેશીંગ નથી ઈચ્છતા, તેના બદલે મેથડ કોલનો ઉપયોગ કરો.

## રાઈટેબલ (Writable) કમ્પ્યુટેડ {#writable-computed}

કમ્પ્યુટેડ પ્રોપર્ટીઝ મૂળભૂત રીતે ફક્ત ગેટર-ઓન્લી (getter-only) હોય છે. જો તમે કમ્પ્યુટેડ પ્રોપર્ટીમાં નવી વેલ્યુ અસાઇન કરવાનો પ્રયાસ કરો છો, તો તમને રનટાઇમ વોર્નિંગ મળશે. દુર્લભ કિસ્સાઓમાં જ્યાં તમારે "રાઈટેબલ" કમ્પ્યુટેડ પ્રોપર્ટીની જરૂર હોય, તમે ગેટર અને સેટર બંને પ્રદાન કરીને એક બનાવી શકો છો:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // નોંધ: આપણે અહીં ડિસ્ટ્રક્ચરિંગ અસાઇનમેન્ટ સિન્ટેક્સનો ઉપયોગ કરી રહ્યા છીએ.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

હવે જ્યારે તમે `this.fullName = 'John Doe'` ચલાવો છો, ત્યારે સેટર ઇનવોક થશે અને `this.firstName` અને `this.lastName` તે મુજબ અપડેટ કરવામાં આવશે.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // નોંધ: આપણે અહીં ડિસ્ટ્રક્ચરિંગ અસાઇનમેન્ટ સિન્ટેક્સનો ઉપયોગ કરી રહ્યા છીએ.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

હવે જ્યારે તમે `fullName.value = 'John Doe'` ચલાવો છો, ત્યારે સેટર ઇનવોક થશે અને `firstName` અને `lastName` તે મુજબ અપડેટ કરવામાં આવશે.

</div>

## અગાઉની વેલ્યુ મેળવવી {#previous}

- ફક્ત 3.4+ માં સપોર્ટેડ છે

<p class="options-api">
જો તમને તેની જરૂર હોય, તો તમે ગેટરની બીજી આર્ગ્યુમેન્ટ એક્સેસ કરીને કમ્પ્યુટેડ પ્રોપર્ટી દ્વારા પરત કરેલ અગાઉની વેલ્યુ મેળવી શકો છો:
</p>

<p class="composition-api">
જો તમને તેની જરૂર હોય, તો તમે ગેટરની પ્રથમ આર્ગ્યુમેન્ટ એક્સેસ કરીને કમ્પ્યુટેડ પ્રોપર્ટી દ્વારા પરત કરેલ અગાઉની વેલ્યુ મેળવી શકો છો:
</p>

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 2
    }
  },
  computed: {
    // આ કમ્પ્યુટેડ કાઉન્ટની વેલ્યુ પરત કરશે જ્યારે તે 3 કરતા ઓછું અથવા સમાન હોય.
    // જ્યારે કાઉન્ટ >=4 હોય, ત્યારે છેલ્લું મૂલ્ય જેણે અમારી શરત પૂરી કરી હતી તે પરત કરવામાં આવશે
    // જ્યાં સુધી કાઉન્ટ 3 કે તેનાથી ઓછું ન થાય ત્યાં સુધી.
    alwaysSmall(_, previous) {
      if (this.count <= 3) {
        return this.count
      }

      return previous
    }
  }
}
```
</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

// આ કમ્પ્યુટેડ કાઉન્ટની વેલ્યુ પરત કરશે જ્યારે તે 3 કરતા ઓછું અથવા સમાન હોય.
// જ્યારે કાઉન્ટ >=4 હોય, ત્યારે છેલ્લું મૂલ્ય જેણે અમારી શરત પૂરી કરી હતી તે પરત કરવામાં આવશે
// જ્યાં સુધી કાઉન્ટ 3 કે તેનાથી ઓછું ન થાય ત્યાં સુધી.
const alwaysSmall = computed((previous) => {
  if (count.value <= 3) {
    return count.value
  }

  return previous
})
</script>
```
</div>

જો તમે રાઈટેબલ (writable) કમ્પ્યુટેડનો ઉપયોગ કરી રહ્યાં છો:

<div class="options-api">

```js
export default {
  data() {
    return {
      count: 2
    }
  },
  computed: {
    alwaysSmall: {
      get(_, previous) {
        if (this.count <= 3) {
          return this.count
        }

        return previous;
      },
      set(newValue) {
        this.count = newValue * 2
      }
    }
  }
}
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

const alwaysSmall = computed({
  get(previous) {
    if (count.value <= 3) {
      return count.value
    }

    return previous
  },
  set(newValue) {
    count.value = newValue * 2
  }
})
</script>
```

</div>


## શ્રેષ્ઠ અભ્યાસો (Best Practices) {#best-practices}

### ગેટર્સ (Getters) સાઇડ-ઇફેક્ટ ફ્રી હોવા જોઈએ {#getters-should-be-side-effect-free}

એ યાદ રાખવું અગત્યનું છે કે કમ્પ્યુટેડ ગેટર ફંક્શન્સ માત્ર ગણતરી (computation) કરવા જોઈએ અને સાઇડ ઇફેક્ટ્સથી મુક્ત હોવા જોઈએ. ઉદાહરણ તરીકે, **બીજા સ્ટેટ ને મ્યુટેટ (mutate) કરશો નહીં, એસિંક કોલ્સ કરશો નહીં, અથવા કમ્પ્યુટેડ ગેટરની અંદર DOM ને મ્યુટેટ કરશો નહીં!** કમ્પ્યુટેડ પ્રોપર્ટીને અન્ય વેલ્યુ પર આધારિત વેલ્યુ કેવી રીતે મેળવવી તે ડિક્લેરેટિવ રીતે વર્ણવતા તરીકે વિચારો - તેની એકમાત્ર જવાબદારી તે વેલ્યુની ગણતરી અને પરત કરવાની હોવી જોઈએ. પછીથી માર્ગદર્શિકામાં આપણે ચર્ચા કરીશું કે કેવી રીતે આપણે [watchers](./watchers) સાથે સ્ટેટ ફેરફારોની પ્રતિક્રિયામાં સાઇડ ઇફેક્ટ્સ કરી શકીએ છીએ.

### કમ્પ્યુટેડ વેલ્યુ બદલવાનું ટાળો {#avoid-mutating-computed-value}

કમ્પ્યુટેડ પ્રોપર્ટીમાંથી પરત મળેલ વેલ્યુ ડિરાઇવ્ડ (derived) સ્ટેટ છે. તેને કામચલાઉ સ્નેપશોટ તરીકે વિચારો - જ્યારે પણ સોર્સ સ્ટેટ બદલાય છે, ત્યારે નવો સ્નેપશોટ બનાવવામાં આવે છે. સ્નેપશોટને મ્યુટેટ કરવાનો કોઈ અર્થ નથી, તેથી કમ્પ્યુટેડ રિટર્ન મૂલ્યને ફક્ત વાંચવા માટે (read-only) ગણવું જોઈએ અને તેને ક્યારેય મ્યુટેટ કરવું જોઈએ નહીં - તેના બદલે, નવી ગણતરીઓને ટ્રિગર કરવા માટે તે જેના પર આધાર રાખે છે તે સોર્સ સ્ટેટને અપડેટ કરો.
