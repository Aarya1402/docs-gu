# લાઇફસાઇકલ હૂક્સ (Lifecycle Hooks) {#lifecycle-hooks}

દરેક Vue કમ્પોનન્ટ ઇન્સ્ટન્સ જ્યારે બનાવવામાં આવે છે ત્યારે તે પ્રારંભિક પગલાઓની શ્રેણીમાંથી પસાર થાય છે - ઉદાહરણ તરીકે, તેને ડેટા ઓબ્ઝર્વેશન સેટ કરવાની જરૂર છે, ટેમ્પલેટ કમ્પાઇલ કરવાની જરૂર છે, DOM માં ઇન્સ્ટન્સને માઉન્ટ કરવાની જરૂર છે અને ડેટા બદલાય ત્યારે DOM અપડેટ કરવાની જરૂર છે. રસ્તામાં, તે લાઇફસાઇકલ હૂક્સ (lifecycle hooks) નામના ફંક્શન્સ પણ ચલાવે છે, જે યુઝર્સને ચોક્કસ તબક્કાઓ પર પોતાનો કોડ ઉમેરવાની તક આપે છે.

## લાઇફસાઇકલ હૂક્સ રજીસ્ટર કરવા {#registering-lifecycle-hooks}

ઉદાહરણ તરીકે, <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> હૂકનો ઉપયોગ ઘટકે પ્રારંભિક રેન્ડરિંગ પૂર્ણ કર્યા પછી અને DOM નોડ્સ બનાવ્યા પછી કોડ ચલાવવા માટે થઈ શકે છે:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`કમ્પોનન્ટ હવે માઉન્ટ થયેલ છે.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`કમ્પોનન્ટ હવે માઉન્ટ થયેલ છે.`)
  }
}
```

</div>

અન્ય હૂક્સ પણ છે જે ઇન્સ્ટન્સની લાઇફસાઇકલના વિવિધ તબક્કાઓ પર કોલ કરવામાં આવશે, જેમાંથી સૌથી સામાન્ય રીતે ઉપયોગમાં લેવાતા હૂક્સ <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle#onmounted), [`onUpdated`](/api/composition-api-lifecycle#onupdated), અને [`onUnmounted`](/api/composition-api-lifecycle#onunmounted) છે.</span><span class="options-api">[`mounted`](/api/options-lifecycle#mounted), [`updated`](/api/options-lifecycle#updated), અને [`unmounted`](/api/options-lifecycle#unmounted) છે.</span>

<div class="options-api">

બધા લાઇફસાઇકલ હૂક્સને તેમના `this` કોન્ટેક્સ્ટ સાથે કૉલ કરવામાં આવે છે જે તેને બોલાવતા વર્તમાન એક્ટિવ ઇન્સ્ટન્સ તરફ નિર્દેશ કરે છે. નોંધ કરો કે આનો અર્થ એ છે કે તમારે લાઇફસાઇકલ હૂક્સ જાહેર કરતી વખતે એરો ફંક્શન્સનો ઉપયોગ કરવાનું ટાળવું જોઈએ, કારણ કે જો તમે આવું કરશો તો તમે `this` દ્વારા કમ્પોનન્ટ ઇન્સ્ટન્સને એક્સેસ કરી શકશો નહીં.

</div>

<div class="composition-api">

જ્યારે `onMounted` ને કૉલ કરવામાં આવે છે, ત્યારે Vue આપમેળે નોંધાયેલ (registered) કોલબેક ફંક્શનને વર્તમાન એક્ટિવ કમ્પોનન્ટ ઇન્સ્ટન્સ સાથે જોડે છે. આ માટે આ હૂક્સ કમ્પોનન્ટ સેટઅપ દરમિયાન **સિંક્રનસ (synchronously)** રીતે રજીસ્ટર થયેલા હોવા જરૂરી છે. ઉદાહરણ તરીકે, આ ન કરો:

```js
setTimeout(() => {
  onMounted(() => {
    // આ કામ કરશે નહીં.
  })
}, 100)
```

એ નોંધવું જોઈએ કે આનો અર્થ એ નથી કે કોલ લેક્સિકલી (lexically) રીતે `setup()` અથવા `<script setup>` ની અંદર હોવો જોઈએ. `onMounted()` ને બાહ્ય ફંક્શનમાં કૉલ કરી શકાય છે જ્યાં સુધી કોલ સ્ટેક (call stack) સિંક્રનસ હોય અને `setup()` ની અંદરથી ઉદ્ભવતો હોય.

</div>

## લાઇફસાઇકલ ડાયાગ્રામ (Lifecycle Diagram) {#lifecycle-diagram}

નીચે ઇન્સ્ટન્સ લાઇફસાઇકલ માટેનો ડાયાગ્રામ છે. અત્યારે જે કંઈ થઈ રહ્યું છે તે બધું તમારે સંપૂર્ણપણે સમજવાની જરૂર નથી, પરંતુ જેમ જેમ તમે શીખશો અને વધુ બનાવશો તેમ તેમ તે એક ઉપયોગી સંદર્ભ બનશે.

![કમ્પોનન્ટ લાઇફસાઇકલ ડાયાગ્રામ](./images/lifecycle.png)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

તમામ લાઇફસાઇકલ હૂક્સ અને તેમના સંબંધિત ઉપયોગના કિસ્સાઓ વિશેની વિગતો માટે <span class="composition-api">[લાઇફસાઇકલ હૂક્સ API સંદર્ભ](/api/composition-api-lifecycle)</span><span class="options-api">[લાઇફસાઇકલ હૂક્સ API સંદર્ભ](/api/options-lifecycle)</span> નો સંપર્ક કરો.
