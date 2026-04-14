# પ્રોવાઇડ / ઇન્જેક્ટ (Provide / Inject) {#provide-inject}

> આ પેજ ધારે છે કે તમે પહેલાથી જ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) વાંચી લીધું છે. જો તમે કમ્પોનન્ટ્સ માટે નવા હોવ તો પહેલા તે વાંચો.

## પ્રોપ ડ્રિલિંગ (Prop Drilling) {#prop-drilling}

સામાન્ય રીતે, જ્યારે આપણે પેરેન્ટમાંથી ચાઇલ્ડ કમ્પોનન્ટમાં ડેટા પાસ કરવાની જરૂર હોય છે, ત્યારે આપણે [પ્રોપ્સ](/guide/components/props) નો ઉપયોગ કરીએ છીએ. જો કે, કલ્પના કરો કે આપણી પાસે એક મોટું કમ્પોનન્ટ ટ્રી છે, અને ખૂબ જ ઊંડા નેસ્ટેડ (deeply nested) ઘટકને દૂરના પૂર્વજ (ancestor) ઘટક પાસેથી કંઈક જોઈએ છે. માત્ર પ્રોપ્સ સાથે, આપણે આખી પેરેન્ટ ચેઇનમાં સમાન પ્રોપ પાસ કરવી પડશે:

![પ્રોપ ડ્રિલિંગ ડાયાગ્રામ](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

નોંધ કરો કે જોકે `<Footer>` કમ્પોનન્ટને આ પ્રોપ્સની બિલકુલ પરવા ન હોય, છતાં પણ તેણે તેને જાહેર કરવી પડશે અને આગળ પસાર કરવી પડશે જેથી `<DeepChild>` તેને એક્સેસ કરી શકે. જો લાંબી પેરેન્ટ ચેઇન હોય, તો રસ્તામાં વધુ ઘટકો પ્રભાવિત થશે. આને "પ્રોપ્સ ડ્રિલિંગ (props drilling)" કહેવામાં આવે છે અને તેની સાથે વ્યવહાર કરવામાં ચોક્કસપણે મજા આવતી નથી.

અમે `provide` અને `inject` સાથે પ્રોપ્સ ડ્રિલિંગને ઉકેલી શકીએ છીએ. પેરેન્ટ કમ્પોનન્ટ તેના તમામ વંશજો (descendants) માટે **ડિપેન્ડન્સી પ્રોવાઇડર (dependency provider)** તરીકે સેવા આપી શકે છે. વંશજ ટ્રીમાંનો કોઈપણ ઘટક, તે ગમે તેટલો ઊંડો હોય, તેના પેરેન્ટ ચેઇનમાં ઉપરના ઘટકો દ્વારા પૂરી પાડવામાં આવેલી ડિપેન્ડન્સીસને **ઇન્જેક્ટ (inject)** કરી શકે છે.

![પ્રોવાઇડ/ઇન્જેક્ટ સ્કીમ](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## પ્રોવાઇડ (Provide) {#provide}

<div class="composition-api">

કમ્પોનન્ટના વંશજોને ડેટા પૂરો પાડવા માટે, [`provide()`](/api/composition-api-dependency-injection#provide) ફંક્શનનો ઉપયોગ કરો:

```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'હેલો!')
</script>
```

જો `<script setup>` નો ઉપયોગ ન કરતા હોય, તો ખાતરી કરો કે `provide()` `setup()` ની અંદર સિંક્રનસ રીતે કૉલ કરવામાં આવે છે:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* key */ 'message', /* value */ 'હેલો!')
  }
}
```

`provide()` ફંક્શન બે આર્ગ્યુમેન્ટ્સ સ્વીકારે છે. પ્રથમ આર્ગ્યુમેન્ટને **ઇન્જેક્શન કી (injection key)** કહેવામાં આવે છે, જે સ્ટ્રિંગ અથવા `Symbol` હોઈ શકે છે. ઇન્જેક્શન કીનો ઉપયોગ વંશજ ઘટકો દ્વારા ઇન્જેક્ટ કરવા માટે ઇચ્છિત વેલ્યુ શોધવા માટે કરવામાં આવે છે. સિંગલ કમ્પોનન્ટ વિવિધ વેલ્યુસ પૂરી પાડવા માટે અલગ-અલગ ઇન્જેક્શન કી સાથે બહુવિધ વખત `provide()` ને કૉલ કરી શકે છે.

બીજી આર્ગ્યુમેન્ટ એ પ્રોવાઇડેડ વેલ્યુ છે. વેલ્યુ કોઈપણ પ્રકારની હોઈ શકે છે, જેમાં રિફ્સ (refs) જેવા રિએક્ટિવ સ્ટેટનો સમાવેશ થાય છે:

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

રિએક્ટિવ વેલ્યુસ પૂરી પાડવાથી આ કિંમતનો ઉપયોગ કરતા વંશજ ઘટકોને પ્રોવાઇડર કમ્પોનન્ટ સાથે રિએક્ટિવ કનેક્શન સ્થાપિત કરવાની મંજૂરી મળે છે.

</div>

<div class="options-api">

કમ્પોનન્ટના વંશજોને ડેટા પૂરો પાડવા માટે, [`provide`](/api/options-composition#provide) ઓપ્શનનો ઉપયોગ કરો:

```js
export default {
  provide: {
    message: 'હેલો!'
  }
}
```

`provide` ઓબ્જેક્ટમાં દરેક પ્રોપર્ટી માટે, કીનો ઉપયોગ બાળક ઘટકો દ્વારા ઇન્જેક્ટ કરવા માટે યોગ્ય વેલ્યુ શોધવા માટે કરવામાં આવે છે, જ્યારે વેલ્યુ તે છે જે ઇન્જેક્ટ કરવામાં આવે છે.

જો આપણે પ્રતિ-ઇન્સ્ટન્સ (per-instance) સ્ટેટ પ્રદાન કરવાની જરૂર હોય, ઉદાહરણ તરીકે `data()` દ્વારા જાહેર કરાયેલ ડેટા, તો પછી `provide` એ ફંક્શન વેલ્યુનો ઉપયોગ કરવો જોઈએ:

```js{7-12}
export default {
  data() {
    return {
      message: 'હેલો!'
    }
  },
  provide() {
    // ફંક્શન સિન્ટેક્સનો ઉપયોગ કરો જેથી કરીને આપણે `this` ને એક્સેસ કરી શકીએ
    return {
      message: this.message
    }
  }
}
```

જો કે, નોંધ કરો કે આ ઇન્જેક્શનને રિએક્ટિવ બનાવતું **નથી**. અમે નીચે [રિએક્ટિવિટી સાથે કામ કરવું](#working-with-reactivity) વિભાગમાં ચર્ચા કરીશું.

</div>

## એપ-લેવલ પ્રોવાઇડ (App-level Provide) {#app-level-provide}

કમ્પોનન્ટમાં ડેટા પૂરો પાડવા ઉપરાંત, આપણે એપ લેવલ પર પણ પ્રોવાઇડ કરી શકીએ છીએ:

```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'હેલો!')
```

એપ-લેવલ પ્રોવાઇડ્સ એપમાં રેન્ડર થયેલા તમામ ઘટકો માટે ઉપલબ્ધ છે. [પ્લગિન્સ](/guide/reusability/plugins) લખતી વખતે આ ખાસ કરીને ઉપયોગી છે, કારણ કે પ્લગિન્સ સામાન્ય રીતે કમ્પોનન્ટ્સનો ઉપયોગ કરીને વેલ્યુસ પૂરી પાડી શકતા નથી.

## ઇન્જેક્ટ (Inject) {#inject}

<div class="composition-api">

પૂર્વજ કમ્પોનન્ટ દ્વારા પૂરા પાડવામાં આવેલ ડેટાને ઇન્જેક્ટ કરવા માટે, [`inject()`](/api/composition-api-dependency-injection#inject) ફંક્શનનો ઉપયોગ કરો:

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

જો બહુવિધ પેરેન્ટ્સ સમાન કી સાથે ડેટા પૂરો પાડે છે, તો ઇન્જેક્ટ કમ્પોનન્ટની પેરેન્ટ ચેઇનમાં સૌથી નજીકના પેરેન્ટની વેલ્યુ લેશે.

જો પૂરી પાડવામાં આવેલ વેલ્યુ રિફ (ref) હોય, તો તે તે જ રીતે ઇન્જેક્ટ કરવામાં આવશે અને તે આપમેળે અનરેપ (unwrapped) થશે **નહીં**. આ ઇન્જેક્ટર કમ્પોનન્ટને પ્રોવાઇડર કમ્પોનન્ટ સાથે રિએક્ટિવિટી કનેક્શન જાળવી રાખવા દે છે.

[રિએક્ટિવિટી સાથે સંપૂર્ણ પ્રોવાઇડ + ઇન્જેક્ટ ઉદાહરણ](https://play.vuejs.org/#eNqFUUFugzAQ/MrKF1IpxfeIVKp66Kk/8MWFDXYFtmUbpArx967BhURRU9/WOzO7MzuxV+fKcUB2YlWovXYRAsbBvQije2d9hAk8Xo7gvB11gzDDxdseCuIUG+ZN6a7JjZIvVRIlgDCcw+d3pmvTglz1okJ499I0C3qB1dJQT9YRooVaSdNiACWdQ5OICj2WwtTWhAg9hiBbhHNSOxQKu84WT8LkNQ9FBhTHXyg1K75aJHNUROxdJyNSBVBp44YI43NvG+zOgmWWYGt7dcipqPhGZEe2ef07wN3lltD+lWN6tNkV/37+rdKjK2rzhRTt7f3u41xhe37/xJZGAL2PLECXa9NKdD/a6QTTtGnP88LgiXJtYv4BaLHhvg==)

ફરીથી, જો `<script setup>` નો ઉપયોગ ન કરતા હોય, તો `inject()` ને માત્ર `setup()` ની અંદર સિંક્રનસ રીતે કૉલ કરવો જોઈએ:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

પૂર્વજ કમ્પોનન્ટ દ્વારા પૂરા પાડવામાં આવેલ ડેટાને ઇન્જેક્ટ કરવા માટે, [`inject`](/api/options-composition#inject) ઓપ્શનનો ઉપયોગ કરો:

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // ઇન્જેક્ટ કરેલી વેલ્યુ
  }
}
```

ઇન્જેક્શન કમ્પોનન્ટના પોતાના સ્ટેટ **પહેલા** સોલ્વ કરવામાં આવે છે, તેથી તમે `data()` માં ઇન્જેક્ટ કરેલી પ્રોપર્ટીઝને એક્સેસ કરી શકો છો:

```js
export default {
  inject: ['message'],
  data() {
    return {
      // ઇન્જેક્ટ કરેલી વેલ્યુ પર આધારિત પ્રારંભિક ડેટા
      fullMessage: this.message
    }
  }
}
```

જો બહુવિધ પેરેન્ટ્સ સમાન કી સાથે ડેટા પૂરો પાડે છે, તો ઇન્જેક્ટ કમ્પોનન્ટની પેરેન્ટ ચેઇનમાં સૌથી નજીકના પેરેન્ટની વેલ્યુ લેશે.

[સંપૂર્ણ પ્રોવાઇડ + ઇન્જેક્ટ ઉદાહરણ](https://play.vuejs.org/#eNqNkcFqwzAQRH9l0EUthOhuRKH00FO/oO7B2JtERZaEvA4F43+vZCdOTAIJCImRdpi32kG8h7A99iQKobs6msBvpTNt8JHxcTC2wS76FnKrJpVLZelKR39TSUO7qreMoXRA7ZPPkeOuwHByj5v8EqI/moZeXudCIBL30Z0V0FLXVXsqIA9krU8R+XbMR9rS0mqhS4KpDbZiSgrQc5JKQqvlRWzEQnyvuc9YuWbd4eXq+TZn0IvzOeKr8FvsNcaK/R6Ocb9Uc4FvefpE+fMwP0wH8DU7wB77nIo6x6a2hvNEME5D0CpbrjnHf+8excI=)

### ઇન્જેક્શન એલિયાસિંગ (Aliasing) {#injection-aliasing}

`inject` માટે એરે સિન્ટેક્સનો ઉપયોગ કરતી વખતે, ઇન્જેક્ટ કરેલી પ્રોપર્ટીઝ સમાન કીનો ઉપયોગ કરીને કમ્પોનન્ટ ઇન્સ્ટન્સ પર એક્સપોઝ થાય છે. ઉપરના ઉદાહરણમાં, પ્રોપર્ટી `"message"` કી હેઠળ પૂરી પાડવામાં આવી હતી અને `this.message` તરીકે ઇન્જેક્ટ કરવામાં આવી હતી. લોકલ કી ઇન્જેક્શન કી જેવી જ છે.

જો આપણે કોઈ અલગ લોકલ કીનો ઉપયોગ કરીને પ્રોપર્ટીને ઇન્જેક્ટ કરવા માંગતા હોઈએ, તો આપણે `inject` ઓપ્શન માટે ઓબ્જેક્ટ સિન્ટેક્સનો ઉપયોગ કરવાની જરૂર છે:

```js
export default {
  inject: {
    /* લોકલ કી */ localMessage: {
      from: /* ઇન્જેક્શન કી */ 'message'
    }
  }
}
```

અહીં, કમ્પોનન્ટ `"message"` કી સાથે પૂરી પાડવામાં આવેલ પ્રોપર્ટી શોધશે અને પછી તેને `this.localMessage` તરીકે એક્સપોઝ કરશે.

</div>

### ઇન્જેક્શન ડિફોલ્ટ વેલ્યુસ (Injection Default Values) {#injection-default-values}

ડિફોલ્ટ રૂપે, `inject` ધારે છે કે ઇન્જેક્ટ કરેલી કી પેરેન્ટ ચેઇનમાં ક્યાંક પૂરી પાડવામાં આવી છે. જો કી પૂરી પાડવામાં ન આવી હોય, તો રનટાઇમ વોર્નિંગ આવશે.

જો આપણે ઇન્જેક્ટ કરેલી પ્રોપર્ટીને વૈકલ્પિક (optional) પ્રોવાઇડર્સ સાથે કામ કરવા ઈચ્છીએ છીએ, તો આપણે પ્રોપ્સની જેમ જ ડિફોલ્ટ વેલ્યુ જાહેર કરવાની જરૂર છે:

<div class="composition-api">

```js
// જો "message" સાથે મેળ ખાતો કોઈ ડેટા પૂરો પાડવામાં આવ્યો નથી
// તો `value` એ "ડિફોલ્ટ વેલ્યુ" હશે
const value = inject('message', 'ડિફોલ્ટ વેલ્યુ')
```

કેટલાક કિસ્સાઓમાં, ફંક્શનને કૉલ કરીને અથવા નવો ક્લાસ બનાવીને ડિફોલ્ટ વેલ્યુ બનાવવાની જરૂર પડી શકે છે. જો વૈકલ્પિક વેલ્યુનો ઉપયોગ કરવામાં ન આવે તો બિનજરૂરી કમ્પ્યુટેશન ટાળવા માટે, આપણે ડિફોલ્ટ વેલ્યુ બનાવવા માટે ફેક્ટરી ફંક્શનનો ઉપયોગ કરી શકીએ છીએ:

```js
const value = inject('key', () => new ExpensiveClass(), true)
```

ત્રીજો પેરામીટર સૂચવે છે કે ડિફોલ્ટ વેલ્યુને ફેક્ટરી ફંક્શન તરીકે ગણવામાં આવવી જોઈએ.

</div>

<div class="options-api">

```js
export default {
  // ઇન્જેક્શન માટે ડિફોલ્ટ વેલ્યુ જાહેર કરતી વખતે
  // ઓબ્જેક્ટ સિન્ટેક્સ જરૂરી છે
  inject: {
    message: {
      from: 'message', // જો ઇન્જેક્શન માટે સમાન કીનો ઉપયોગ કરતા હોય તો આ વૈકલ્પિક છે
      default: 'ડિફોલ્ટ વેલ્યુ'
    },
    user: {
      // નોન-પ્રિમિટિવ વેલ્યુસ માટે ફેક્ટરી ફંક્શનનો ઉપયોગ કરો જે બનાવવી મોંઘી હોય,
      // અથવા તે જે કમ્પોનન્ટ ઇન્સ્ટન્સ દીઠ અનન્ય હોવી જોઈએ.
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

## રિએક્ટિવિટી સાથે કામ કરવું (Working with Reactivity) {#working-with-reactivity}

<div class="composition-api">

રિએક્ટિવ પ્રોવાઇડ / ઇન્જેક્ટ વેલ્યુસનો ઉપયોગ કરતી વખતે, **જ્યારે પણ શક્ય હોય ત્યારે રિએક્ટિવ સ્ટેટમાં કોઈપણ મ્યુટેશન _પ્રોવાઇડર_ ની અંદર રાખવાની ભલામણ કરવામાં આવે છે**. આ સુનિશ્ચિત કરે છે કે પૂરી પાડવામાં આવેલ સ્ટેટ અને તેના સંભવિત મ્યુટેશન્સ સમાન ઘટકમાં સાથે સ્થિત છે, જે ભવિષ્યમાં જાળવવાનું સરળ બનાવે છે.

એવા સમયે હોઈ શકે છે જ્યારે આપણે ઇન્જેક્ટર કમ્પોનન્ટમાંથી ડેટા અપડેટ કરવાની જરૂર હોય. આવા કિસ્સાઓમાં, અમે એક ફંક્શન પ્રદાન કરવાની ભલામણ કરીએ છીએ જે સ્ટેટ ને મ્યુટેટ કરવા માટે જવાબદાર છે:

```vue{7-9,13}
<!-- પ્રોવાઇડર કમ્પોનન્ટની અંદર -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('ઉત્તર ધ્રુવ')

function updateLocation() {
  location.value = 'દક્ષિણ ધ્રુવ'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- ઇન્જેક્ટર કમ્પોનન્ટમાં -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

છેલ્લે, જો તમે ખાતરી કરવા માંગતા હોવ કે `provide` દ્વારા પાસ કરવામાં આવેલ ડેટા ઇન્જેક્ટર કમ્પોનન્ટ દ્વારા મ્યુટેટ કરી શકાતો નથી, તો તમે પૂરી પાડવામાં આવેલ વેલ્યુને [`readonly()`](/api/reactivity-core#readonly) સાથે લપેટી શકો છો.

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

પ્રોવાઇડર સાથે ઇન્જેક્શનને રિએક્ટિવ રીતે લિંક કરવા માટે, આપણે [computed()](/api/reactivity-core#computed) ફંક્શનનો ઉપયોગ કરીને કમ્પ્યુટેડ પ્રોપર્ટી પ્રદાન કરવાની જરૂર છે:

```js{12}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'હેલો!'
    }
  },
  provide() {
    return {
      // સ્પષ્ટપણે કમ્પ્યુટેડ પ્રોપર્ટી પ્રદાન કરો
      message: computed(() => this.message)
    }
  }
}
```

[રિએક્ટિવિટી સાથે સંપૂર્ણ પ્રોવાઇડ + ઇન્જેક્ટ ઉદાહરણ](https://play.vuejs.org/#eNqNUctqwzAQ/JVFFyeQxnfjBEoPPfULqh6EtYlV9EKWTcH43ytZtmPTQA0CsdqZ2dlRT16tPXctkoKUTeWE9VeqhbLGeXirheRwc0ZBds7HKkKzBdBDZZRtPXIYJlzqU40/I4LjjbUyIKmGEWw0at8UgZrUh1PscObZ4ZhQAA596/RcAShsGnbHArIapTRBP74O8Up060wnOO5QmP0eAvZyBV+L5jw1j2tZqsMp8yWRUHhUVjKPoQIohQ460L0ow1FeKJlEKEnttFweijJfiORElhCf5f3umObb0B9PU/I7kk17PJj7FloN/2t7a2Pj/Zkdob+x8gV8ZlMs2de/8+14AXwkBngD9zgVqjg2rNXPvwjD+EdlHilrn8MvtvD1+Q==)

`computed()` ફંક્શનનો ઉપયોગ સામાન્ય રીતે Composition API કમ્પોનન્ટ્સમાં થાય છે, પરંતુ Options API માં અમુક ઉપયોગો પૂરક બનાવવા માટે પણ તેનો ઉપયોગ કરી શકાય છે. તમે Composition API પર સેટ કરેલ API પ્રેફરન્સ (API Preference) સાથે [રિએક્ટિવિટીના મૂળભૂત પાસાઓ](/guide/essentials/reactivity-fundamentals) અને [કમ્પ્યુટેડ પ્રોપર્ટીઝ](/guide/essentials/computed) વાંચીને તેના વપરાશ વિશે વધુ જાણી શકો છો.

</div>

## સિમ્બોલ કીઝ સાથે કામ કરવું (Working with Symbol Keys) {#working-with-symbol-keys}

અત્યાર સુધી, અમે ઉદાહરણોમાં સ્ટ્રિંગ ઇન્જેક્શન કીનો ઉપયોગ કરી રહ્યા છીએ. જો તમે ઘણા ડિપેન્ડન્સી પ્રોવાઇડર્સ સાથે મોટી એપ્લિકેશનમાં કામ કરી રહ્યા છો, અથવા તમે એવા કમ્પોનન્ટ્સ બનાવી રહ્યા છો જે અન્ય ડેવલપર્સ દ્વારા ઉપયોગમાં લેવા જઈ રહ્યા છે, તો સંભવિત અથડામણ (collisions) ટાળવા માટે [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) ઇન્જેક્શન કીનો ઉપયોગ કરવો શ્રેષ્ઠ છે.

એક સમર્પિત ફાઇલમાં સિમ્બોલ્સ એક્સપોર્ટ કરવાની ભલામણ કરવામાં આવે છે:

```js [keys.js]
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// પ્રોવાઇડર કમ્પોનન્ટમાં
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* પ્રોવાઇડ કરવા માટેનો ડેટા */
})
```

```js
// ઇન્જેક્ટર કમ્પોનન્ટમાં
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

આ પણ જુઓ: [Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// પ્રોવાઇડર કમ્પોનન્ટમાં
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* પ્રોવાઇડ કરવા માટેનો ડેટા */
      }
    }
  }
}
```

```js
// ઇન્જેક્ટર કમ્પોનન્ટમાં
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
