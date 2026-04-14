# કમ્પ્યુટેડ પ્રોપર્ટી (Computed Property) {#computed-property}

ચાલો છેલ્લા સ્ટેપથી ટૂ-ડૂ લિસ્ટ પર આગળ વધીએ. અહીં, આપણે પહેલેથી જ દરેક ટૂ-ડૂમાં ટૉગલ ફંક્શનલિટી ઉમેરી છે. આ દરેક ટૂ-ડૂ ઓબ્જેક્ટમાં `done` પ્રોપર્ટી ઉમેરીને અને તેને ચેકબોક્સ સાથે બાઇન્ડ કરવા માટે `v-model` નો ઉપયોગ કરીને કરવામાં આવે છે:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

આગળનો સુધારો આપણે એ કરી શકીએ છીએ કે જે ટૂ-ડૂ પહેલેથી પૂર્ણ થઈ ગયા છે તેને છુપાવી શકીએ. અમારી પાસે પહેલેથી જ એક બટન છે જે `hideCompleted` સ્ટેટને ટૉગલ કરે છે. પરંતુ આપણે તે સ્ટેટના આધારે વિવિધ લિસ્ટ આઇટમ્સને કેવી રીતે રેન્ડર કરીએ?

<div class="options-api">

રજૂ કરીએ છીએ <a target="_blank" href="/guide/essentials/computed.html">કમ્પ્યુટેડ પ્રોપર્ટી (computed property)</a>. આપણે એક પ્રોપર્ટી જાહેર કરી શકીએ છીએ જે અન્ય પ્રોપર્ટીઝમાંથી રિએક્ટિવલી ગણતરી (reactively computed) કરવામાં આવે છે, તે માટે `computed` ઓપ્શનનો ઉપયોગ કરીએ:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted` ના આધારે ફિલ્ટર કરેલ ટૂ-ડૂ પરત કરો
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted` ના આધારે ફિલ્ટર કરેલ ટૂ-ડૂ પરત કરો
    }
  }
})
```

</div>

</div>
<div class="composition-api">

રજૂ કરીએ છીએ <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>. આપણે કમ્પ્યુટેડ રેફ બનાવી શકીએ છીએ જે તેના અન્ય રિએક્ટિવ ડેટા સોર્સના આધારે તેની `.value` ગણે છે:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // `todos.value` અને `hideCompleted.value`
  // ના આધારે ફિલ્ટર કરેલ ટૂ-ડૂ પરત કરો
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // `todos.value` અને `hideCompleted.value`
      // ના આધારે ફિલ્ટર કરેલ ટૂ-ડૂ પરત કરો
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

કમ્પ્યુટેડ પ્રોપર્ટી તેની ગણતરીમાં ઉપયોગમાં લેવાતા અન્ય રિએક્ટિવ સ્ટેટને ડિપેન્ડન્સીસ (dependencies) તરીકે ટ્રેક (track) કરે છે. તે પરિણામને કૅશ (cache) કરે છે અને જ્યારે તેની ડિપેન્ડન્સીસ બદલાય છે ત્યારે તેને આપમેળે અપડેટ કરે છે.

હવે, `filteredTodos` કમ્પ્યુટેડ પ્રોપર્ટી ઉમેરવાનો પ્રયાસ કરો અને તેના ગણતરી લોજિકને અમલમાં મૂકો! જો યોગ્ય રીતે અમલમાં મૂકવામાં આવે તો, જ્યારે પૂર્ણ થયેલ આઇટમ્સ છુપાવી રહ્યા હોવ ત્યારે ટૂ-ડૂને ચેક કરવાથી તે તરત જ છુપાઈ જવી જોઈએ.
