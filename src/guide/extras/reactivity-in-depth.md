---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# રિએક્ટિવિટી ઊંડાણમાં (Reactivity in Depth) {#reactivity-in-depth}

Vue ની સૌથી વિશિષ્ટ વિશેષતાઓમાંની એક તેની અપ્રગટ રિએક્ટિવિટી સિસ્ટમ (unobtrusive reactivity system) છે. ઘટક સ્ટેટ રિએક્ટિવ JavaScript ઓબ્જેક્ટ્સ ધરાવે છે. જ્યારે તમે તેમને સુધારો છો, ત્યારે વ્યુ (view) અપડેટ થાય છે. તે સ્ટેટ મેનેજમેન્ટને સરળ અને સાહજિક બનાવે છે, પરંતુ કેટલીક સામાન્ય ભૂલોને ટાળવા માટે તે કેવી રીતે કાર્ય કરે છે તે સમજવું પણ મહત્વપૂર્ણ છે. આ વિભાગમાં, આપણે Vue ની રિએક્ટિવિટી સિસ્ટમની કેટલીક નિમ્ન-સ્તરની વિગતોમાં જઈશું.

## રિએક્ટિવિટી શું છે? (What is Reactivity?) {#what-is-reactivity}

આ શબ્દ પ્રોગ્રામિંગમાં આજકાલ ઘણો વપરાય છે, પરંતુ જ્યારે લોકો તેને કહે છે ત્યારે તેનો અર્થ શું થાય છે? રિએક્ટિવિટી એ એક પ્રોગ્રામિંગ પેરાડાઈમ (paradigm) છે જે આપણને ડિક્લેરેટિવ રીતે ફેરફારોને અનુરૂપ થવા દે છે. કેનોનિકલ ઉદાહરણ જે લોકો સામાન્ય રીતે બતાવે છે, કારણ કે તે એક ઉત્તમ ઉદાહરણ છે, તે એક્સેલ સ્પ્રેડશીટ છે:

<SpreadSheet />

અહીં સેલ A2 ને `= A0 + A1` ના ફોર્મ્યુલા દ્વારા વ્યાખ્યાયિત કરવામાં આવ્યો છે (તમે ફોર્મ્યુલા જોવા અથવા એડિટ કરવા માટે A2 પર ક્લિક કરી શકો છો), તેથી સ્પ્રેડશીટ આપણને ૩ આપે છે. તેમાં કોઈ આશ્ચર્યની વાત નથી. પરંતુ જો તમે A0 અથવા A1 અપડેટ કરશો, તો તમે જોશો કે A2 પણ આપમેળે અપડેટ થાય છે.

JavaScript સામાન્ય રીતે આ રીતે કામ કરતું નથી. જો આપણે JavaScript માં તેની તુલનામાં કંઈક લખીએ:

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // ૩

A0 = 2
console.log(A2) // હજુ પણ ૩
```

જ્યારે આપણે `A0` ને બદલીએ છીએ, ત્યારે `A2` આપમેળે બદલાતું નથી.

તો આપણે JavaScript માં આ કેવી રીતે કરીશું? પ્રથમ, `A2` ને અપડેટ કરતા કોડને ફરીથી ચલાવવા માટે, ચાલો તેને એક ફંક્શનમાં લપેટીએ:

```js
let A2

function update() {
  A2 = A0 + A1
}
```

પછી, આપણે કેટલાક શબ્દો વ્યાખ્યાયિત કરવાની જરૂર છે:

- `update()` ફંક્શન એક **સાઇડ ઇફેક્ટ (side effect)**, અથવા ટૂંકમાં **ઇફેક્ટ (effect)** ઉત્પન્ન કરે છે, કારણ કે તે પ્રોગ્રામના સ્ટેટને સુધારે છે.

- `A0` અને `A1` ને ઇફેક્ટની **ડિપેન્ડન્સીસ (dependencies)** માનવામાં આવે છે, કારણ કે તેમની વેલ્યુઝનો ઉપયોગ ઇફેક્ટ કરવા માટે થાય છે. ઇફેક્ટને તેની ડિપેન્ડન્સીસનો **સબ્સ્ક્રાઇબર (subscriber)** કહેવામાં આવે છે.

આપણને એક એવા જાદુઈ ફંક્શનની જરૂર છે જે જ્યારે પણ `A0` અથવા `A1` (**ડિપેન્ડન્સીસ**) બદલાય ત્યારે `update()` (**ઇફેક્ટ**) ને બોલાવી શકે:

```js
whenDepsChange(update)
```

આ `whenDepsChange()` ફંક્શન પાસે નીચેના કાર્યો છે:

૧. વેરિએબલ ક્યારે વંચાય (read) છે તેનો ટ્રેક કરો. દા.ત. જ્યારે એક્સપ્રેશન `A0 + A1` નું મૂલ્યાંકન કરવામાં આવે છે, ત્યારે `A0` અને `A1` બંને વંચાય છે.

૨. જો કોઈ વેરિએબલ ત્યારે વંચાય જ્યારે હાલમાં કોઈ ઇફેક્ટ ચાલુ હોય, તો તે ઇફેક્ટને તે વેરિએબલનો સબ્સ્ક્રાઇબર બનાવો. દા.ત. કારણ કે જ્યારે `update()` એક્ઝિક્યુટ થઈ રહ્યું હોય ત્યારે `A0` અને `A1` વંચાય છે, તેથી `update()` પ્રથમ કોલ પછી `A0` અને `A1` બંનેનો સબ્સ્ક્રાઇબર બને છે.

૩. વેરિએબલ ક્યારે બદલાય છે તે શોધો. દા.ત. જ્યારે `A0` ને નવી વેલ્યુ અસાઇન કરવામાં આવે છે, ત્યારે તેના તમામ સબ્સ્ક્રાઇબર ઇફેક્ટ્સને ફરીથી ચલાવવા માટે સૂચિત (notify) કરો.

## Vue માં રિએક્ટિવિટી કેવી રીતે કામ કરે છે (How Reactivity Works in Vue) {#how-reactivity-works-in-vue}

અમે ઉદાહરણની જેમ લોકલ વેરિએબલ્સના વાંચવા અને લખવાને ખરેખર ટ્રેક કરી શકતા નથી. સામાન્ય JavaScript માં તે કરવા માટે કોઈ મિકેનિઝમ નથી. જોકે, આપણે જે કરી શકીએ છીએ તે છે **ઓબ્જેક્ટ પ્રોપર્ટીઝ** ના વાંચવા અને લખવાને અટકાવવું (intercept).

JavaScript માં પ્રોપર્ટી એક્સેસને અટકાવવાની બે રીતો છે: [ગેટર (getter)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) / [સેટર (setters)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set#description) અને [પ્રોક્સીઝ (Proxies)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Vue 2 બ્રાઉઝર સપોર્ટ મર્યાદાઓને કારણે ફક્ત ગેટર / સેટરનો ઉપયોગ કરતું હતું. Vue 3 માં, રિએક્ટિવ ઓબ્જેક્ટ્સ માટે પ્રોક્સીઝનો ઉપયોગ કરવામાં આવે છે અને રેફ્સ (refs) માટે ગેટર / સેટર્સનો ઉપયોગ થાય છે. અહીં કેટલાક સ્યુડો-કોડ (pseudo-code) છે જે દર્શાવે છે કે તેઓ કેવી રીતે કાર્ય કરે છે:

```js{4,9,17,22}
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

:::tip
અહીં અને નીચે આપેલા કોડ સ્નિપેટ્સ કોર કન્સેપ્ટ્સને શક્ય તેટલા સરળ સ્વરૂપમાં સમજાવવા માટે છે, તેથી ઘણી નાની વિગતો અવગણવામાં આવી છે.
:::

આ રિએક્ટિવ ઓબ્જેક્ટ્સની કેટલીક [મર્યાદાઓ](/guide/essentials/reactivity-fundamentals#limitations-of-reactive) સમજાવે છે જેની અમે ફંડામેન્ટલ્સ વિભાગમાં ચર્ચા કરી છે:

- જ્યારે તમે લોકલ વેરિએબલમાં રિએક્ટિવ ઓબ્જેક્ટની પ્રોપર્ટી અસાઇન અથવા ડિસ્ટ્રક્ચર કરો છો, ત્યારે તે વેરિએબલને એક્સેસ કરવું અથવા અસાઇન કરવું તે નોન-રિએક્ટિવ છે કારણ કે તે સોર્સ ઓબ્જેક્ટ પર ગેટ / સેટ પ્રોક્સી ટ્રેપ્સને ટ્રિગર કરતું નથી. નોંધ કરો કે આ "ડિસ્કનેક્ટ" માત્ર વેરિએબલ બાઇન્ડિંગને અસર કરે છે - જો વેરિએબલ ઓબ્જેક્ટ જેવી નોન-પ્રિમિટિવ વેલ્યુ તરફ નિર્દેશ કરે છે, તો ઓબ્જેક્ટમાં ફેરફાર કરવો હજુ પણ રિએક્ટિવ હશે.

- `reactive()` માંથી પરત કરાયેલ પ્રોક્સી, જોકે મૂળ જેવી જ વર્તે છે, પરંતુ જો આપણે `===` ઓપરેટરનો ઉપયોગ કરીને મૂળ સાથે તેની તુલના કરીએ તો તેની ઓળખ (identity) અલગ હોય છે.

`track()` ની અંદર, આપણે તપાસીએ છીએ કે હાલમાં કોઈ ઇફેક્ટ ચાલુ છે કે નહીં. જો ત્યાં કોઈ હોય, તો અમે ટ્રેક કરવામાં આવતી પ્રોપર્ટી માટે સબ્સ્ક્રાઇબર ઇફેક્ટ્સ (Set માં સંગ્રહિત) શોધીએ છીએ, અને Set માં ઇફેક્ટ ઉમેરીએ છીએ:

```js
// આ ઇફેક્ટ ચલાવવામાં આવે તે પહેલાં સેટ કરવામાં આવશે.
// અમે તેની સાથે પછીથી વ્યવહાર કરીશું.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

ઇફેક્ટ સબ્સ્ક્રિપ્શન્સ ગ્લોબલ `WeakMap<target, Map<key, Set<effect>>>` ડેટા સ્ટ્રક્ચરમાં સંગ્રહિત થાય છે. જો કોઈ પ્રોપર્ટી (પહેલીવાર ટ્રેક કરેલ) માટે કોઈ સબ્સ્ક્રાઇબિંગ ઇફેક્ટ્સ Set મળી ન હોય, તો તે બનાવવામાં આવશે. `getSubscribersForProperty()` ફંક્શન ટૂંકમાં આ જ કરે છે. સરળતા માટે, અમે તેની વિગતો છોડી દઈશું.

`trigger()` ની અંદર, આપણે ફરીથી પ્રોપર્ટી માટે સબ્સ્ક્રાઇબર ઇફેક્ટ્સ શોધીએ છીએ. પરંતુ આ વખતે અમે તેમને બોલાવીએ છીએ (invoke):

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

હવે ચાલો `whenDepsChange()` ફંક્શન પર પાછા ફરીએ:

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

તે વાસ્તવિક અપડેટ ચલાવતા પહેલા પોતાની જાતને વર્તમાન એક્ટિવ ઇફેક્ટ તરીકે સેટ કરે છે અને રો (raw) `update` ફંક્શનને ઇફેક્ટમાં વીંટાળે છે. આ અપડેટ દરમિયાન `track()` કોલ્સને વર્તમાન એક્ટિવ ઇફેક્ટ શોધવા માટે સક્ષમ કરે છે.

આ બિંદુએ, અમે એક ઇફેક્ટ બનાવી છે જે તેની ડિપેન્ડન્સીસને આપમેળે ટ્રેક કરે છે, અને જ્યારે પણ ડિપેન્ડન્સી બદલાય છે ત્યારે ફરીથી ચાલે છે. અમે આને **રિએક્ટિવ ઇફેક્ટ (Reactive Effect)** કહીએ છીએ.

Vue એક API પ્રદાન કરે છે જે તમને રિએક્ટિવ ઇફેક્ટ્સ બનાવવાની મંજૂરી આપે છે: [`watchEffect()`](/api/reactivity-core#watcheffect). હકીકતમાં, તમે નોંધ્યું હશે કે તે ઉદાહરણમાંના જાદુઈ `whenDepsChange()` જેવું જ કામ કરે છે. હવે આપણે વાસ્તવિક Vue APIs નો ઉપયોગ કરીને મૂળ ઉદાહરણને ફરીથી બનાવી શકીએ છીએ:

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // A0 અને A1 ટ્રેક કરે છે
  A2.value = A0.value + A1.value
})

// ઇફેક્ટ ટ્રિગર કરે છે
A0.value = 2
```

રેફને બદલવા માટે રિએક્ટિવ ઇફેક્ટનો ઉપયોગ કરવો એ સૌથી રસપ્રદ ઉપયોગ નથી - હકીકતમાં, કોમ્પ્યુટેડ પ્રોપર્ટીનો ઉપયોગ તેને વધુ ડિક્લેરેટિવ બનાવે છે:

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

આંતરિક રીતે, `computed` રિએક્ટિવ ઇફેક્ટનો ઉપયોગ કરીને તેના અનૌપચારિકતા (invalidation) અને પુનઃગણતરી (re-computation) ને મેનેજ કરે છે.

તો સામાન્ય અને ઉપયોગી રિએક્ટિવ ઇફેક્ટનું ઉદાહરણ શું છે? હમ્મ, DOM ને અપડેટ કરવું! આપણે આ રીતે સરળ "રિએક્ટિવ રેન્ડરિંગ" લાગુ કરી શકીએ છીએ:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `કાઉન્ટ છે: ${count.value}`
})

// DOM અપડેટ કરે છે
count.value++
```

હકીકતમાં, આ ઘણું બધું એવું છે કે જે રીતે Vue ઘટક સ્ટેટ અને DOM ને સિંકમાં રાખે છે - દરેક ઘટક ઇન્સ્ટન્સ DOM ને રેન્ડર અને અપડેટ કરવા માટે રિએક્ટિવ ઇફેક્ટ બનાવે છે. અલબત્ત, Vue ઘટકો DOM ને અપડેટ કરવા માટે `innerHTML` કરતા ઘણી વધુ કાર્યક્ષમ રીતોનો ઉપયોગ કરે છે. આની ચર્ચા [રેન્ડરિંગ મિકેનિઝમ (Rendering Mechanism)](./rendering-mechanism) માં કરવામાં આવી છે.

<div class="options-api">

`ref()`, `computed()` અને `watchEffect()` APIs તમામ કોમ્પોઝિશન API ના ભાગ છે. જો તમે અત્યાર સુધી Vue સાથે માત્ર ઓપ્શન્સ API નો ઉપયોગ કરી રહ્યા હોવ, તો તમે જોશો કે કોમ્પોઝિશન API એ રીતે નજીક છે કે જે રીતે Vue ની રિએક્ટિવિટી સિસ્ટમ આંતરિક રીતે કામ કરે છે. હકીકતમાં, Vue 3 માં ઓપ્શન્સ API કોમ્પોઝિશન API ની ઉપર લાગુ કરવામાં આવ્યું છે. ઘટક ઇન્સ્ટન્સ (`this`) પર તમામ પ્રોપર્ટી એક્સેસ રિએક્ટિવિટી ટ્રેકિંગ માટે ગેટર / સેટરને ટ્રિગર કરે છે, અને `watch` અને `computed` જેવા ઓપ્શન્સ આંતરિક રીતે તેમના કોમ્પોઝિશન API સમકક્ષોને બોલાવે છે.

</div>

## રનટાઇમ વિરુદ્ધ કમ્પાઇલ-ટાઇમ રિએક્ટિવિટી (Runtime vs. Compile-time Reactivity) {#runtime-vs-compile-time-reactivity}

Vue ની રિએક્ટિવિટી સિસ્ટમ મુખ્યત્વે રનટાઇમ-આધારિત છે: જ્યારે કોડ સીધો બ્રાઉઝરમાં ચાલી રહ્યો હોય ત્યારે ટ્રેકિંગ અને ટ્રિગરિંગ બધું જ કરવામાં આવે છે. રનટાઇમ રિએક્ટિવિટીના ફાયદા એ છે કે તે બિલ્ડ સ્ટેપ વિના કામ કરી શકે છે અને તેમાં ઓછા એજ કેસો છે. બીજી બાજુ, આ તેને JavaScript ની સિન્ટેક્સ મર્યાદાઓ દ્વારા મર્યાદિત બનાવે છે, જે Vue refs જેવા વેલ્યુ કન્ટેનર્સની જરૂરિયાત તરફ દોરી જાય છે.

કેટલાક ફ્રેમવર્ક, જેમ કે [Svelte](https://svelte.dev/), કમ્પાઇલેશન દરમિયાન રિએક્ટિવિટી લાગુ કરીને આવી મર્યાદાઓને દૂર કરવાનું પસંદ કરે છે. તે રિએક્ટિવિટીનું અનુકરણ કરવા માટે કોડનું વિશ્લેષણ અને રૂપાંતર કરે છે. કમ્પાઇલેશન સ્ટેપ ફ્રેમવર્કને JavaScript ના સિમેન્ટિક્સ (semantics) બદલવાની મંજૂરી આપે છે - ઉદાહરણ તરીકે, ગર્ભિત રીતે કોડ ઇન્જેક્ટ કરવો જે લોકલી વ્યાખ્યાયિત વેરિએબલ્સના એક્સેસની આસપાસ ડિપેન્ડન્સી એનાલિસિસ અને ઇફેક્ટ ટ્રિગરિંગ કરે છે. નુકસાન એ છે કે આવા ટ્રાન્સફોર્મ માટે બિલ્ડ સ્ટેપની જરૂર પડે છે, અને JavaScript સિમેન્ટિક્સ બદલવું એ આવશ્યકપણે એવી ભાષા બનાવવી છે જે JavaScript જેવી લાગે છે પરંતુ કંઈક બીજું બને છે.

Vue ટીમે [Reactivity Transform](/guide/extras/reactivity-transform) નામની પ્રાયોગિક સુવિધા દ્વારા આ દિશામાં સંશોધન કર્યું હતું, પરંતુ અંતે અમે નક્કી કર્યું કે તે પ્રોજેક્ટ માટે યોગ્ય નથી [અહીંના કારણો](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028) ને કારણે.

## રિએક્ટિવિટી ડીબગીંગ (Reactivity Debugging) {#reactivity-debugging}

તે મહાન છે કે Vue ની રિએક્ટિવિટી સિસ્ટમ આપમેળે ડિપેન્ડન્સીસને ટ્રેક કરે છે, પરંતુ કેટલાક કિસ્સાઓમાં આપણે શું ટ્રેક થઈ રહ્યું છે અથવા ઘટક શા માટે ફરીથી રેન્ડર થઈ રહ્યો છે તે બરાબર જાણવા માંગીએ છીએ.

### કમ્પોનન્ટ ડીબગીંગ હૂક્સ {#component-debugging-hooks}

ઘટકના રેન્ડર દરમિયાન કઈ ડિપેન્ડન્સીસનો ઉપયોગ કરવામાં આવે છે અને કઈ ડિપેન્ડન્સી અપડેટને ટ્રિગર કરી રહી છે તે આપણે <span class="options-api">`renderTracked`</span><span class="composition-api">`onRenderTracked`</span> અને <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span> લાઇફસાયકલ હૂક્સનો ઉપયોગ કરીને ડીબગ કરી શકીએ છીએ. બંને હૂક્સને ડીબગર ઇવેન્ટ પ્રાપ્ત થશે જેમાં પ્રશ્નમાં રહેલી ડિપેન્ડન્સી વિશેની માહિતી હશે. ડિપેન્ડન્સીનું ઇન્ટરેક્ટિવ રીતે નિરીક્ષણ કરવા માટે કોલબેક્સમાં `debugger` સ્ટેટમેન્ટ મૂકવાની ભલામણ કરવામાં આવે છે:

<div class="composition-api">

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
```

</div>

:::tip
કમ્પોનન્ટ ડીબગ હૂક્સ માત્ર ડેવલપમેન્ટ મોડમાં જ કામ કરે છે.
:::

ડીબગ ઇવેન્ટ ઓબ્જેક્ટ્સ નીચેના પ્રકાર ધરાવે છે:

<span id="debugger-event"></span>

```ts
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### કોમ્પ્યુટેડ ડીબગીંગ (Computed Debugging) {#computed-debugging}

અમે `onTrack` અને `onTrigger` કોલબેક્સ સાથે `computed()` ને બીજા ઓપ્શન્સ ઓબ્જેક્ટને પાસ કરીને કોમ્પ્યુટેડ પ્રોપર્ટીઝને ડીબગ કરી શકીએ છીએ:

- જ્યારે રિએક્ટિવ પ્રોપર્ટી અથવા રેફને ડિપેન્ડન્સી તરીકે ટ્રેક કરવામાં આવે ત્યારે `onTrack` ને બોલાવવામાં આવશે.
- જ્યારે ડિપેન્ડન્સીના ફેરફાર દ્વારા વોચર કોલબેક ટ્રિગર થાય ત્યારે `onTrigger` ને બોલાવવામાં આવશે.

બંને કોલબેક્સ કમ્પોનન્ટ ડીબગ હૂક્સ જેવા [સમાન ફોર્મેટ](#debugger-event) માં ડીબગર ઇવેન્ટ્સ પ્રાપ્ત કરશે:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // જ્યારે count.value ને ડિપેન્ડન્સી તરીકે ટ્રેક કરવામાં આવે ત્યારે ટ્રિગર થાય છે
    debugger
  },
  onTrigger(e) {
    // જ્યારે count.value બદલાય ત્યારે ટ્રિગર થાય છે
    debugger
  }
})

// plusOne એક્સેસ કરો, onTrack ને ટ્રિગર કરવું જોઈએ
console.log(plusOne.value)

// count.value બદલો, onTrigger ને ટ્રિગર કરવું જોઈએ
count.value++
```

:::tip
`onTrack` અને `onTrigger` કોમ્પ્યુટેડ ઓપ્શન્સ માત્ર ડેવલપમેન્ટ મોડમાં જ કામ કરે છે.
:::

### વોચર ડીબગીંગ (Watcher Debugging) {#watcher-debugging}

`computed()` ની જેમ, વોચર્સ પણ `onTrack` અને `onTrigger` ઓપ્શન્સને સપોર્ટ કરે છે:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip
`onTrack` અને `onTrigger` વોચર ઓપ્શન્સ માત્ર ડેવલપમેન્ટ મોડમાં જ કામ કરે છે.
:::

## બાહ્ય સ્ટેટ સિસ્ટમ્સ સાથે સંકલન (Integration with External State Systems) {#integration-with-external-state-systems}

Vue ની રિએક્ટિવિટી સિસ્ટમ સાદા JavaScript ઓબ્જેક્ટ્સને રિએક્ટિવ પ્રોક્સીઝમાં ઊંડાણપૂર્વક રૂપાંતરિત કરીને કાર્ય કરે છે. બાહ્ય સ્ટેટ મેનેજમેન્ટ સિસ્ટમ્સ (દા.ત. જો કોઈ બાહ્ય સોલ્યુશન પ્રોક્સીઝનો ઉપયોગ પણ કરતું હોય) સાથે સંકલિત કરતી વખતે ઊંડાણપૂર્વકનું રૂપાંતર બિનજરૂરી અથવા ક્યારેક અનિચ્છનીય હોઈ શકે છે.

બાહ્ય સ્ટેટ મેનેજમેન્ટ સોલ્યુશન સાથે Vue ની રિએક્ટિવિટી સિસ્ટમને સંકલિત કરવાનો સામાન્ય વિચાર એ છે કે બાહ્ય સ્ટેટને [`shallowRef`](/api/reactivity-advanced#shallowref) માં રાખવામાં આવે. શૈલો રેફ (shallow ref) ત્યારે જ રિએક્ટિવ હોય છે જ્યારે તેની `.value` પ્રોપર્ટી એક્સેસ કરવામાં આવે - અંદરની વેલ્યુ અકબંધ રહે છે. જ્યારે બાહ્ય સ્ટેટ બદલાય છે, ત્યારે અપડેટ્સ ટ્રિગર કરવા માટે રેફ વેલ્યુ બદલો.

### ઇમ્યુટેબલ ડેટા (Immutable Data) {#immutable-data}

જો તમે અનડૂ / રીડૂ (undo / redo) સુવિધા અમલમાં મૂકી રહ્યાં છો, તો તમે સંભવતઃ દરેક વપરાશકર્તા એડિટ પર એપ્લિકેશનના સ્ટેટનો સ્નેપશોટ લેવા માંગો છો. જો કે, જો સ્ટેટ ટ્રી મોટું હોય તો Vue ની મ્યુટેબલ રિએક્ટિવિટી સિસ્ટમ આ માટે શ્રેષ્ઠ અનુકૂળ નથી, કારણ કે દરેક અપડેટ પર સમગ્ર સ્ટેટ ઓબ્જેક્ટને સીરીયલાઈઝ કરવું CPU અને મેમરી બંને ખર્ચના સંદર્ભમાં ખર્ચાળ હોઈ શકે છે.

[ઇમ્યુટેબલ ડેટા સ્ટ્રક્ચર્સ (Immutable data structures)](https://en.wikipedia.org/wiki/Persistent_data_structure) સ્ટેટ ઓબ્જેક્ટ્સને ક્યારેય ન બદલીને આને હલ કરે છે - તેના બદલે, તે નવા ઓબ્જેક્ટ્સ બનાવે છે જે જૂના ભાગો સાથે સમાન, અપરિવર્તિત ભાગો શેર કરે છે. JavaScript માં ઇમ્યુટેબલ ડેટાનો ઉપયોગ કરવાની વિવિધ રીતો છે, પરંતુ અમે Vue સાથે [Immer](https://immerjs.github.io/immer/) નો ઉપયોગ કરવાની ભલામણ કરીએ છીએ કારણ કે તે તમને વધુ અર્ગનોમિક, મ્યુટેબલ સિન્ટેક્સ રાખતી વખતે ઇમ્યુટેબલ ડેટાનો ઉપયોગ કરવાની મંજૂરી આપે છે.

અમે એક સરળ કમ્પોઝેબલ દ્વારા Immer ને Vue સાથે સંકલિત કરી શકીએ છીએ:

```js
import { produce } from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[પ્લેગ્રાઉન્ડ માં અજમાવો](https://play.vuejs.org/#eNp9VMFu2zAM/RXNl6ZAYnfoTlnSdRt66DBsQ7vtEuXg2YyjRpYEUU5TBPn3UZLtuE1RH2KLfCIfycfsk8/GpNsGkmkyw8IK4xiCa8wVV6I22jq2Zw3CbV2DZQe2srpmZ2km/PmMK8a4KrRCxxbCQY1j1pgyd3DrD0s27++OFh689z/0OOEkTBlPvkNuFfvbAE/Gra/UilzOko0Mh2A+ufcHwd9ij8KtWUjwMsAqlxgjcLU854qrVaMKJ7RiTleVDBRHQpWwO4/xB8xHeRg2v+oyh/MioJepT0ClvTsxhnSUi1LOsthN6iMdCGgkBacTY7NGhjd9ScG2k5W2c56M9rG6ceBPdbOWm1AxO0/a+uiZFjJHpFv7Fj10XhdSFBtyntTJkzaxf/ZtQnYguoFNJkUkmAWGs2xAm47onqT/jPWHxjjYuUkJhba57+yUSaFg4tZWN9X6Y9eIcC8ZJ1FQkzo36QNqRZILQXjroAqnXb+9LQzVD3vtnMFpljXKbKq00HWU3/X7i/QivcxKgS5aUglVXjxNAGvK8KnWZSNJWa0KDoGChzmk3L28jSVcQX1o1d1puwfgOpdSP97BqsfQxhCCK9gFTC+tXu7/coR7R71rxRWXBL2FpHOMOAAeYVGJhBvFL3s+kGKIkW5zSfKfd+RHA2u3gzZEpML9y9JS06YtAq5DLFmOMWXsjkM6rET1YjzUcSMk2J/G1/h8TKGOb8HmV7bdQbqzhmLziv0Bd3Govywg2O1x8Umvua3ARffN/Q/S1sDZDfMN5x2glo3nGGFfGlUS7QEusL0NcxWq+o03OwcKu6Ke/+fwhIb89Y3Sj3Qv0w+9xg7/AWfvyMs=)

### સ્ટેટ મશીન્સ (State Machines) {#state-machines}

[સ્ટેટ મશીન (State Machine)](https://en.wikipedia.org/wiki/Finite-state_machine) એ એપ્લિકેશન ક્યા સંભવિત સ્ટેટમાં હોઈ શકે છે અને તે એક સ્ટેટમાંથી બીજા સ્ટેટમાં સંક્રમણ કરી શકે તેવી તમામ સંભવિત રીતોનું વર્ણન કરવા માટેનું એક મોડેલ છે. જ્યારે તે સરળ ઘટકો માટે વધુ પડતું હોઈ શકે છે, તે જટિલ સ્ટેટ પ્રવાહને વધુ મજબૂત અને વ્યવસ્થિત બનાવવામાં મદદ કરી શકે છે.

JavaScript માં સૌથી લોકપ્રિય સ્ટેટ મશીન અમલીકરણોમાંનું એક [XState](https://xstate.js.org/) છે. અહીં એક કમ્પોઝેબલ છે જે તેની સાથે સંકલિત છે:

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[પ્લેગ્રાઉન્ડ માં અજમાવો](https://play.vuejs.org/#eNp1U81unDAQfpWRL7DSFqqqUiXEJumhyqVVpDa3ugcKZtcJjC1syEqId8/YBu/uIRcEM9/P/DGz71pn0yhYwUpTD1JbMMKO+o6j7LUaLMwwGvGrqk8SBSzQDqqHJMv7EMleTMIRgGOt0Fj4a2xlxZ5EsPkHhytuOjucbApIrDoeO5HsfQCllVVHUYlVbeW0xr2OKcCzHCwkKQAK3fP56fHx5w/irSyqbfFMgA+h0cKBHZYey45jmYfeqWv6sKLXHbnTF0D5f7RWITzUnaxfD5y5ztIkSCY7zjwKYJ5DyVlf2fokTMrZ5sbZDu6Bs6e25QwK94b0svgKyjwYkEyZR2e2Z2H8n/pK04wV0oL8KEjWJwxncTicnb23C3F2slabIs9H1K/HrFZ9HrIPX7Mv37LPuTC5xEacSfa+V83YEW+bBfleFkuW8QbqQZDEuso9rcOKQQ/CxosIHnQLkWJOVdept9+ijSA6NEJwFGePaUekAdFwr65EaRcxu9BbOKq1JDqnmzIi9oL0RRDu4p1u/ayH9schrhlimGTtOLGnjeJRAJnC56FCQ3SFaYriLWjA4Q7SsPOp6kYnEXMbldKDTW/ssCFgKiaB1kusBWT+rkLYjQiAKhkHvP2j3IqWd5iMQ+M=)

### RxJS {#rxjs}

[RxJS](https://rxjs.dev/) એ અસુક્ર્રોનસ ઇવેન્ટ સ્ટ્રીમ્સ (asynchronous event streams) સાથે કામ કરવા માટેની લાઇબ્રેરી છે. [VueUse](https://vueuse.org/) લાઇબ્રેરી RxJS સ્ટ્રીમ્સને Vue ની રિએક્ટિવિટી સિસ્ટમ સાથે જોડવા માટે [`@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) એડ-ઓન પ્રદાન કરે છે.

## સિગ્નલ્સ સાથે જોડાણ (Connection to Signals) {#connection-to-signals}

ઘણા બધા અન્ય ફ્રેમવર્ક્સ "સિગ્નલ્સ (signals)" શબ્દ હેઠળ Vue ના કોમ્પોઝિશન API ના રેફ્સ જેવા જ રિએક્ટિવિટી પ્રિમિટિવ્સ રજૂ કર્યા છે:

- [Solid Signals](https://docs.solidjs.com/concepts/signals)
- [Angular Signals](https://angular.dev/guide/signals)
- [Preact Signals](https://preactjs.com/guide/v10/signals/)
- [Qwik Signals](https://qwik.builder.io/docs/components/state/#usesignal)

મૂળભૂત રીતે, સિગ્નલ્સ એ Vue refs જેવા જ પ્રકારના રિએક્ટિવિટી પ્રિમિટિવ છે. તે એક વેલ્યુ કન્ટેનર છે જે એક્સેસ પર ડિપેન્ડન્સી ટ્રેકિંગ પ્રદાન કરે છે અને બદલવા પર સાઇડ-ઇફેક્ટ ટ્રિગરિંગ પ્રદાન કરે છે. આ રિએક્ટિવિટી-પ્રિમિટિવ-આધારિત પેરાડાઈમ ફ્રન્ટએન્ડ વિશ્વમાં ખાસ કરીને નવો કન્સેપ્ટ નથી: તે એક દાયકા પહેલાના [Knockout observables](https://knockoutjs.com/documentation/observables.html) અને [Meteor Tracker](https://docs.meteor.com/api/tracker.html) જેવા અમલીકરણોનો છે. Vue ઓપ્શન્સ API અને React સ્ટેટ મેનેજમેન્ટ લાઇબ્રેરી [MobX](https://mobx.js.org/) પણ સમાન સિદ્ધાંતો પર આધારિત છે, પરંતુ પ્રિમિટિવ્સને ઓબ્જેક્ટ પ્રોપર્ટીઝ પાછળ છુપાવે છે.

જોકે કોઈ વસ્તુને સિગ્નલ તરીકે લાયક બનવા માટે જરૂરી નથી, આજે આ કન્સેપ્ટની ચર્ચા અવારનવાર રેન્ડરિંગ મોડલની સાથે કરવામાં આવે છે જ્યાં અપડેટ્સ ફાઇન-ગ્રેઇન્ડ સબ્સ્ક્રિપ્શન્સ દ્વારા કરવામાં આવે છે. વર્ચ્યુઅલ DOM ના ઉપયોગને લીધે, Vue હાલમાં [સમાન ઓપ્ટિમાઇઝેશન હાંસલ કરવા માટે કમ્પાઇલર્સ પર આધાર રાખે છે](/guide/extras/rendering-mechanism#compiler-informed-virtual-dom). જો કે, અમે [Vapor Mode](https://github.com/vuejs/core-vapor) નામની નવી સોલિડ-પ્રેરિત કમ્પાઇલેશન વ્યૂહરચના પણ શોધી રહ્યા છીએ, જે વર્ચ્યુઅલ DOM પર આધાર રાખતી નથી અને Vue ની બિલ્ટ-ઇન રિએક્ટિવિટી સિસ્ટમનો વધુ લાભ લે છે.

### API ડિઝાઇન ટ્રેડ-ઓફ (API Design Trade-Offs) {#api-design-trade-offs}

Preact અને Qwik ના સિગ્નલોની ડિઝાઇન Vue ના [shallowRef](/api/reactivity-advanced#shallowref) જેવી જ છે: ત્રણેય `.value` પ્રોપર્ટી દ્વારા મ્યુટેબલ ઇન્ટરફેસ પ્રદાન કરે છે. અમે સોલિડ (Solid) અને એંગ્યુલર (Angular) સિગ્નલો પર ચર્ચા પર ધ્યાન કેન્દ્રિત કરીશું.

#### સોલિડ સિગ્નલ્સ (Solid Signals) {#solid-signals}

Solid ની `createSignal()` API ડિઝાઇન વાંચવા / લખવાના અલગ કરવા (read / write segregation) પર ભાર મૂકે છે. સિગ્નલો રીડ-ઓન્લી ગેટર અને અલગ સેટર તરીકે એક્સપોઝ થાય છે:

```js
const [count, setCount] = createSignal(0)

count() // વેલ્યુને એક્સેસ કરો
setCount(1) // વેલ્યુ અપડેટ કરો
```

નોંધ લો કે કેવી રીતે `count` સિગ્નલ સેટર વગર પસાર કરી શકાય છે. આ સુનિશ્ચિત કરે છે કે જો સેટર પણ સ્પષ્ટપણે એક્સપોઝ ન કરવામાં આવે તો સ્ટેટ ક્યારેય બદલાઈ શકતી નથી. શું આ સુરક્ષા ગેરંટી વધુ વર્બોઝ સિન્ટેક્સને ન્યાય આપે છે તે પ્રોજેક્ટની જરૂરિયાત અને વ્યક્તિગત સ્વાદને આધિન હોઈ શકે છે - પરંતુ જો તમે આ API સ્ટાઇલ પસંદ કરો છો, તો તમે તેને Vue માં સરળતાથી નકલ (replicate) કરી શકો છો:

```js
import { shallowRef, triggerRef } from 'vue'

export function createSignal(value, options) {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}
```

#### એંગ્યુલર સિગ્નલ્સ (Angular Signals) {#angular-signals}

એંગ્યુલર ડર્ટી-ચેકિંગ (dirty-checking) ને છોડીને અને રિએક્ટિવિટી પ્રિમિટિવના પોતાના અમલીકરણને રજૂ કરીને કેટલાક મૂળભૂત ફેરફારોમાંથી પસાર થઈ રહ્યું છે. Angular Signal API આના જેવું લાગે છે:

```js
const count = signal(0)

count() // વેલ્યુ એક્સેસ કરો
count.set(1) // નવી વેલ્યુ સેટ કરો
count.update((v) => v + 1) // અગાઉની વેલ્યુના આધારે અપડેટ કરો
```

ફરીથી, આપણે Vue માં API ની નકલ સરળતાથી કરી શકીએ છીએ:

```js
import { shallowRef } from 'vue'

export function signal(initialValue) {
  const r = shallowRef(initialValue)
  const s = () => r.value
  s.set = (value) => {
    r.value = value
  }
  s.update = (updater) => {
    r.value = updater(r.value)
  }
  return s
}
```

Vue refs ની સરખામણીમાં, સોલિડ અને એંગ્યુલરની ગેટર-આધારિત API સ્ટાઇલ જ્યારે Vue ઘટકોમાં ઉપયોગમાં લેવાય ત્યારે કેટલાક રસપ્રદ ટ્રેડ-ઓફ પ્રદાન કરે છે:

- `()` એ `.value` કરતા થોડું ઓછું વર્બોઝ છે, પરંતુ વેલ્યુ અપડેટ કરવી તે વધુ વર્બોઝ છે.
- કોઈ ref-unwrapping નથી: વેલ્યુ એક્સેસ કરવા માટે હંમેશા `()` ની જરૂર પડે છે. આ વેલ્યુ એક્સેસને દરેક જગ્યાએ સુસંગત બનાવે છે. આનો અર્થ એ પણ છે કે તમે રો (raw) સિગ્નલોને ઘટક પ્રોપ્સ તરીકે પસાર કરી શકો છો.

આ API સ્ટાઇલ તમને અનુકૂળ છે કે નહીં તે અમુક અંશે વ્યક્તિગત છે. અમારો ધ્યેય અહીં આ વિવિધ API ડિઝાઇન્સ વચ્ચેની અંતર્ગત સમાનતા અને ટ્રેડ-ઓફ દર્શાવવાનો છે. અમે એ પણ બતાવવા માંગીએ છીએ કે Vue લવચીક છે: તમે ખરેખર અસ્તિત્વમાં રહેલા APIs માં લૉક નથી. જો જરૂરી હોય તો, તમે વધુ વિશિષ્ટ જરૂરિયાતોને અનુરૂપ તમારું પોતાનું રિએક્ટિવિટી પ્રિમિટિવ API બનાવી શકો છો.
