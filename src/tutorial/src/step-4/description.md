# ઇવેન્ટ લિસનર્સ (Event Listeners) {#event-listeners}

અમે `v-on` ડાયરેક્ટિવ (directive) નો ઉપયોગ કરીને DOM ઇવેન્ટ્સ સાંભળી શકીએ છીએ:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

તેના વારંવાર ઉપયોગને કારણે, `v-on` પાસે શોર્ટકટ સિન્ટેક્સ પણ છે:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

અહીં, `increment` એ `methods` ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવામાં આવેલા ફંક્શનનો સંદર્ભ આપે છે:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // ઘટકની સ્ટેટ અપડેટ કરો
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // ઘટકની સ્ટેટ અપડેટ કરો
      this.count++
    }
  }
})
```

</div>

મેથડની અંદર, આપણે `this` નો ઉપયોગ કરીને ઘટક ઇન્સ્ટન્સને એક્સેસ કરી શકીએ છીએ. ઘટક ઇન્સ્ટન્સ `data` દ્વારા જાહેર કરાયેલ ડેટા પ્રોપર્ટીઝને એક્સપોઝ કરે છે. અમે આ પ્રોપર્ટીઝને બદલીને (mutating) ઘટકની સ્ટેટ અપડેટ કરી શકીએ છીએ.

</div>

<div class="composition-api">

<div class="sfc">

અહીં, `increment` એ `<script setup>` માં જાહેર કરાયેલ ફંક્શનનો સંદર્ભ આપે છે:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // ઘટકની સ્ટેટ અપડેટ કરો
  count.value++
}
</script>
```

</div>

<div class="html">

અહીં, `increment` એ `setup()` માંથી પાછા ફરેલા ઓબ્જેક્ટમાંની એક મેથડનો સંદર્ભ આપે છે:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // ઘટકની સ્ટેટ અપડેટ કરો
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

ફંક્શનની અંદર, આપણે રેફ્સ (refs) ને બદલીને ઘટકની સ્ટેટ અપડેટ કરી શકીએ છીએ.

</div>

ઇવેન્ટ હેન્ડલર્સ ઇનલાઇન એક્સપ્રેશન્સ (inline expressions) નો પણ ઉપયોગ કરી શકે છે, અને મોડિફાયર્સ (modifiers) સાથે સામાન્ય કાર્યોને સરળ બનાવી શકે છે. આ વિગતો <a target="_blank" href="/guide/essentials/event-handling.html">માર્ગદર્શિકા - ઇવેન્ટ હેન્ડલિંગ</a> માં આવરી લેવામાં આવી છે.

હવે, તમારી જાતે `increment` <span class="options-api">મેથડ</span><span class="composition-api">ફંક્શન</span> અમલમાં મૂકવાનો પ્રયાસ કરો અને `v-on` નો ઉપયોગ કરીને તેને બટન સાથે બાઇન્ડ કરો.
