# લાઇફસાયકલ અને ટેમ્પલેટ રેફ્સ (Lifecycle and Template Refs) {#lifecycle-and-template-refs}

અત્યાર સુધી, Vue રિએક્ટિવિટી અને ડિક્લેરેટિવ રેન્ડરિંગને કારણે અમારા માટે તમામ DOM અપડેટ્સને હેન્ડલ કરી રહ્યું છે. જો કે, અનિવાર્યપણે એવા કિસ્સાઓ હશે જ્યાં અમારે DOM સાથે મેન્યુઅલી કામ કરવાની જરૂર પડશે.

આપણે ખાસ `ref` એટ્રિબ્યુટનો ઉપયોગ કરીને **ટેમ્પલેટ રેફ (template ref)** મેળવી શકીએ છીએ - એટલે કે ટેમ્પલેટમાં રહેલા એલિમેન્ટનો સંદર્ભ:

```vue-html
<p ref="pElementRef">નમસ્તે</p>
```

<div class="composition-api">

રેફને એક્સેસ કરવા માટે, આપણે સમાન નામ સાથે રેફ જાહેર<span class="html"> અને એક્સપોઝ (expose)</span> કરવો પડશે:

<div class="sfc">

```js
const pElementRef = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const pElementRef = ref(null)

  return {
    pElementRef
  }
}
```

</div>

નોંધ લો કે રેફ `null` વેલ્યુ સાથે ઇનિશિયલાઇઝ (initialize) થયેલ છે. આ એટલા માટે છે કારણ કે જ્યારે <span class="sfc">`<script setup>`</span><span class="html">`setup()`</span> એક્ઝિક્યુટ થાય છે ત્યારે એલિમેન્ટ હજુ અસ્તિત્વમાં હોતો નથી. ટેમ્પલેટ રેફ ઘટક **માઉન્ટ (mounted)** થયા પછી જ એક્સેસિબલ બને છે.

માઉન્ટ થયા પછી કોડ ચલાવવા માટે, આપણે `onMounted()` ફંક્શનનો ઉપયોગ કરી શકીએ છીએ:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // ઘટક હવે માઉન્ટ થયેલ છે.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // ઘટક હવે માઉન્ટ થયેલ છે.
    })
  }
})
```

</div>
</div>

<div class="options-api">

એલિમેન્ટ `this.$refs` પર `this.$refs.pElementRef` તરીકે એક્સપોઝ થશે. જો કે, તમે ઘટક **માઉન્ટ (mounted)** થયા પછી જ તેને એક્સેસ કરી શકો છો.

માઉન્ટ થયા પછી કોડ ચલાવવા માટે, આપણે `mounted` ઓપ્શનનો ઉપયોગ કરી શકીએ છીએ:

<div class="sfc">

```js
export default {
  mounted() {
    // ઘટક હવે માઉન્ટ થયેલ છે.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // ઘટક હવે માઉન્ટ થયેલ છે.
  }
})
```

</div>
</div>

આને **લાઇફસાયકલ હૂક (lifecycle hook)** કહેવામાં આવે છે - તે અમને ઘટકના લાઇફસાયકલના અમુક સમયે કોલ કરવા માટે કોલબેક (callback) રજીસ્ટર કરવાની મંજૂરી આપે છે. <span class="options-api">`created` અને `updated`</span><span class="composition-api">`onUpdated` અને `onUnmounted`</span> જેવા અન્ય હૂક્સ પણ છે. વધુ વિગતો માટે <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">લાઇફસાયકલ ડાયાગ્રામ</a> તપાસો.

હવે, <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> હૂક ઉમેરવાનો પ્રયાસ કરો, <span class="options-api">`this.$refs.pElementRef`</span><span class="composition-api">`pElementRef.value`</span> દ્વારા `<p>` ને એક્સેસ કરો, અને તેના પર કેટલીક સીધી DOM કામગીરી કરો (દા.ત. તેનું `textContent` બદલવું).
