<script setup>
import ElasticHeader from './demos/ElasticHeader.vue'
import DisabledButton from './demos/DisabledButton.vue'
import Colors from './demos/Colors.vue'
import AnimateWatcher from './demos/AnimateWatcher.vue'
</script>

# એનિમેશન ટેકનિક્સ (Animation Techniques) {#animation-techniques}

Vue એન્ટર / લીવ (enter / leave) અને લિસ્ટ ટ્રાન્ઝિશનને હેન્ડલ કરવા માટે [`<Transition>`](/guide/built-ins/transition) અને [`<TransitionGroup>`](/guide/built-ins/transition-group) ઘટકો પ્રદાન કરે છે. જો કે, વેબ પર એનિમેશનનો ઉપયોગ કરવાની ઘણી અન્ય રીતો છે, ભલે તે Vue એપ્લિકેશનમાં હોય. અહીં આપણે કેટલીક વધારાની તકનીકોની ચર્ચા કરીશું.

## ક્લાસ-આધારિત એનિમેશન (Class-based Animations) {#class-based-animations}

DOM માં એન્ટર / લીવ ન થતા હોય તેવા એલિમેન્ટ્સ માટે, આપણે ગતિશીલ રીતે (dynamically) CSS ક્લાસ ઉમેરીને એનિમેશન ટ્રિગર કરી શકીએ છીએ:

<div class="composition-api">

```js
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }
  }
}
```

</div>

```vue-html
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">મને ક્લિક કરો</button>
  <span v-if="disabled">આ સુવિધા અક્ષમ (disabled) છે!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

<DisabledButton />

## સ્ટેટ-ડ્રાઇવન એનિમેશન (State-driven Animations) {#state-driven-animations}

કેટલીક ટ્રાન્ઝિશન ઇફેક્ટ્સ વેલ્યુઝના ઇન્ટરપોલેટીંગ (interpolating) દ્વારા લાગુ કરી શકાય છે, ઉદાહરણ તરીકે જ્યારે કોઈ ઇન્ટરેક્શન થાય ત્યારે એલિમેન્ટ સાથે સ્ટાઇલ બાઇન્ડ કરીને. આ ઉદાહરણ લો:

<div class="composition-api">

```js
const x = ref(0)

function onMousemove(e) {
  x.value = e.clientX
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX
    }
  }
}
```

</div>

```vue-html
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>તમારા માઉસને આ ડિવ (div) પર ફેરવો...</p>
  <p>x: {{ x }}</p>
</div>
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```

<Colors />

કલર ઉપરાંત, તમે ટ્રાન્સફોર્મ (transform), વિડ્થ (width) અથવા હાઇટ (height) ને એનિમેટ કરવા માટે સ્ટાઇલ બાઇન્ડિંગ્સનો પણ ઉપયોગ કરી શકો છો. તમે સ્પ્રિંગ ફિઝિક્સ (spring physics) નો ઉપયોગ કરીને SVG પાથને પણ એનિમેટ કરી શકો છો - છેવટે, તે બધા એટ્રિબ્યુટ ડેટા બાઇન્ડિંગ્સ છે:

<ElasticHeader />

## વોચર્સ (Watchers) સાથે એનિમેટીંગ {#animating-with-watchers}

કેટલીક સર્જનાત્મકતા સાથે, આપણે કોઈપણ સંખ્યાત્મક સ્ટેટના આધારે કંઈપણ એનિમેટ કરવા માટે વોચર્સનો ઉપયોગ કરી શકીએ છીએ. ઉદાહરણ તરીકે, આપણે નંબરને જ એનિમેટ કરી શકીએ છીએ:

<div class="composition-api">

```js
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'

const number = ref(0)
const tweened = reactive({
  number: 0
})

// નોંધ: Number.MAX_SAFE_INTEGER (9007199254740991) કરતા મોટા ઇનપુટ્સ માટે,
// JavaScript નંબર પ્રિસિઝનમાં મર્યાદાઓને કારણે પરિણામ અચોક્કસ હોઈ શકે છે.
watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

```vue-html
એક નંબર લખો: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```

</div>
<div class="options-api">

```js
import gsap from 'gsap'

export default {
  data() {
    return {
      number: 0,
      tweened: 0
    }
  },
  // નોંધ: Number.MAX_SAFE_INTEGER (9007199254740991) કરતા મોટા ઇનપુટ્સ માટે,
  // JavaScript નંબર પ્રિસિઝનમાં મર્યાદાઓને કારણે પરિણામ અચોક્કસ હોઈ શકે છે.
  watch: {
    number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    }
  }
}
```

```vue-html
એક નંબર લખો: <input v-model.number="number" />
<p>{{ tweened.toFixed(0) }}</p>
```

</div>

<AnimateWatcher />

<div class="composition-api">

[પ્લેગ્રાઉન્ડ માં અજમાવો](https://play.vuejs.org/#eNpNUstygzAM/BWNLyEzBDKd6YWSdHrpsacefSGgJG7xY7BImhL+vTKv9ILllXYlr+jEm3PJpUWRidyXjXIEHql1e2mUdrYh6KDBY8yfoiR1wRiuBZVn6OHYWA0r5q6W2pMv3ISHkBPSlNZ4AtPqAzawC2LRdj3DdEU0WA34qB910sBUnsFWmp6LpRmaRo9UHMLIrGG3h4EBQ/OEbDRpxjx51TYFKWtYKHmOF9WP4Qzs+x22EDoA9NLwmaejC/x+vhBqVxeEfAPIK3WBsi6830lRobZSDDjA580hFIt8roxrCS4bbSuskxFmzhhIAenEy92id1CnzZzfd91szETmZ72rH6zYOej7PA3rYXrKE3GUp//m5KunWx3C5CE6enS0hjZXVKczZXCwdfWyoF79YgZPqBliJ9iGSUTEYlzuRrO9X94a/lUGNTklvBTZvAMpwhYCIMWZyPksTVvjvk9JaXUacq9sSlujFJPnvej/AElH3FQ=)

</div>
<div class="options-api">

[પ્લેગ્રાઉન્ડ માં અજમાવો](https://play.vuejs.org/#eNpNUctugzAQ/JWVLyESj6hSL5Sm6qXHnnr0xYENuAXbwus8Svj3GlxIJEvendHMvgb2bkx6cshyVtiyl4b2XMnO6J6gtsLAsdcdbKZwwxVXeJmpCo/CtQQDVwCVIBFtQwzQI7leLRmAct0B+xx28YLQGVFh5aGAjNM3zvRZUNnkizhII7V6w9xTSjqiRtoYBqhcL0hq5c3S5/hu/blKbzfYwbh9LMWVf0W2zusTws60gnDK6OtqEMTaeSGVcQSnpNMVtmmAXzkLAWeQzarCQNkKaz1zkHWysPthWNryjX/IC1bRbgvjWGTG64rssbQqLF3bKUzvHmH6o1aUnFHWDeVw0G31sqJW/mIOT9h5KEw2m7CYhUsmnV/at9XKX3n24v+E5WxdNmfTbieAs4bI2DzLnDI/dVrqLpu4Nz+/a5GzZYls/AM3dcFx)

</div>
