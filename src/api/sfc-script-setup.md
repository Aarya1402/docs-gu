# \<script setup> {#script-setup}

`<script setup>` એ સિંગલ-ફાઇલ કમ્પોનન્ટ્સ (SFCs) ની અંદર કમ્પોઝિશન (Composition) API નો ઉપયોગ કરવા માટે કમ્પાઇલ-ટાઇમ સિન્ટેક્ટિક શુગર (syntactic sugar) છે. જો તમે SFCs અને Composition API બંનેનો ઉપયોગ કરી રહ્યાં હોવ તો આ ભલામણ કરેલ સિન્ટેક્સ છે. તે સામાન્ય `<script>` સિન્ટેક્સ પર સંખ્યાબંધ ફાયદા પૂરા પાડે છે:

- ઓછા બોઇલરપ્લેટ (boilerplate) સાથે વધુ સંક્ષિપ્ત કોડ
- શુદ્ધ (pure) TypeScript નો ઉપયોગ કરીને પ્રોપ્સ અને એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરવાની ક્ષમતા
- બહેતર રનટાઇમ પરફોર્મન્સ (ટેમ્પ્લેટ સમાન સ્કોપમાં રેન્ડર ફંક્શનમાં કમ્પાઇલ કરવામાં આવે છે, મધ્યવર્તી પ્રોક્સી વગર)
- બહેતર IDE ટાઇપ-ઇન્ફરન્સ પરફોર્મન્સ (લેંગ્વેજ સર્વર માટે કોડમાંથી પ્રકારો કાઢવાનું કામ ઓછું)

## મૂળભૂત સિન્ટેક્સ (Basic Syntax) {#basic-syntax}

સિન્ટેક્સ પર સ્વિચ કરવા માટે, `<script>` બ્લોકમાં `setup` એટ્રિબ્યુટ ઉમેરો:

```vue
<script setup>
console.log('hello script setup')
</script>
```

અંદરનો કોડ ઘટકના `setup()` ફંક્શનના કન્ટેન્ટ તરીકે કમ્પાઇલ કરવામાં આવે છે. આનો અર્થ એ છે કે સામાન્ય `<script>` થી વિપરીત, જે માત્ર એક જ વાર એક્ઝિક્યુટ થાય છે જ્યારે ઘટક પ્રથમ વખત ઇમ્પોર્ટ કરવામાં આવે છે, `<script setup>` ની અંદરનો કોડ **દરેક વખતે એક્ઝિક્યુટ થશે જ્યારે ઘટકનો ઇન્સ્ટન્સ બનાવવામાં આવશે**.

### ટોપ-લેવલ બાઈન્ડિંગ્સ ટેમ્પ્લેટમાં એક્સપોઝ થાય છે {#top-level-bindings-are-exposed-to-template}

જ્યારે `<script setup>` નો ઉપયોગ કરવામાં આવે છે, ત્યારે `<script setup>` ની અંદર જાહેર કરાયેલ કોઈપણ ટોપ-લેવલ બાઈન્ડિંગ્સ (વેરિયેબલ્સ, ફંક્શન ડિક્લેરેશન્સ અને ઇમ્પોર્ટ્સ સહિત) ટેમ્પ્લેટમાં સીધા વાપરી શકાય છે:

```vue
<script setup>
// વેરિયેબલ
const msg = 'Hello!'

// ફંક્શન્સ
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

ઇમ્પોર્ટ્સ પણ તે જ રીતે એક્સપોઝ થાય છે. આનો અર્થ એ છે કે તમે `methods` વિકલ્પ દ્વારા એક્સપોઝ કર્યા વિના ટેમ્પ્લેટ એક્સપ્રેશન્સમાં ઇમ્પોર્ટ કરેલા હેલ્પર ફંક્શનનો સીધો ઉપયોગ કરી શકો છો:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## રિએક્ટિવિટી (Reactivity) {#reactivity}

રિએક્ટિવ સ્ટેટ [રિએક્ટિવિટી APIs](./reactivity-core) નો ઉપયોગ કરીને સ્પષ્ટપણે બનાવવાની જરૂર છે. `setup()` ફંક્શનમાંથી રિટર્ન કરેલી વેલ્યુની જેમ જ, જ્યારે ટેમ્પ્લેટ્સમાં રેફરન્સ આપવામાં આવે ત્યારે refs આપમેળે અનવ્રેપ (unwrapped) થઈ જાય છે:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## ઘટકોનો ઉપયોગ કરવો (Using Components) {#using-components}

`<script setup>` ના સ્કોપમાં રહેલી કિંમતો કસ્ટમ કમ્પોનન્ટ ટેગ નામો તરીકે પણ સીધી વાપરી શકાય છે:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

`MyComponent` ને વેરિયેબલ તરીકે રેફરન્સ આપવામાં આવે છે તેમ વિચારો. જો તમે JSX નો ઉપયોગ કર્યો હોય, તો મેન્ટલ મોડેલ અહીં સમાન છે. કેબાબ-કેસ (kebab-case) સમકક્ષ `<my-component>` પણ ટેમ્પ્લેટમાં કામ કરે છે - જો કે સુસંગતતા માટે પાસ્કલકેસ (PascalCase) કમ્પોનન્ટ ટેગ્સની ભારપૂર્વક ભલામણ કરવામાં આવે છે. તે નેટિવ કસ્ટમ એલિમેન્ટ્સથી અલગ પાડવામાં પણ મદદ કરે છે.

### ડાયનેમિક ઘટકો (Dynamic Components) {#dynamic-components}

ઘટકોને સ્ટ્રિંગ કી હેઠળ રજીસ્ટર કરવાને બદલે વેરિયેબલ્સ તરીકે રેફરન્સ આપવામાં આવતા હોવાથી, આપણે `<script setup>` ની અંદર ડાયનેમિક ઘટકોનો ઉપયોગ કરતી વખતે ડાયનેમિક `:is` બાઈન્ડિંગનો ઉપયોગ કરવો જોઈએ:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

જુઓ કે કેવી રીતે ઘટકોનો ટર્નરી (ternary) એક્સપ્રેશનમાં વેરિયેબલ્સ તરીકે ઉપયોગ કરી શકાય છે.

### રિકર્સિવ ઘટકો (Recursive Components) {#recursive-components}

SFC તેના ફાઇલનામ દ્વારા ગર્ભિત રીતે (implicitly) પોતાનો ઉલ્લેખ કરી શકે છે. દા.ત. `FooBar.vue` નામની ફાઈલ તેના ટેમ્પ્લેટમાં પોતાની જાતને `<FooBar/>` તરીકે ઉલ્લેખ કરી શકે છે.

નોંધ લો કે આની અગ્રતા (priority) ઇમ્પોર્ટ કરેલ ઘટકો કરતા ઓછી છે. જો તમારી પાસે કોઈ નેમ્ડ ઇમ્પોર્ટ (named import) હોય જે ઘટકના અનુમાનિત નામ સાથે અથડાય છે, તો તમે ઇમ્પોર્ટનું ઉપનામ (alias) આપી શકો છો:

```js
import { FooBar as FooBarChild } from './components'
```

### નેમસ્પેસ ઘટકો (Namespaced Components) {#namespaced-components}

તમે ઓબ્જેક્ટ પ્રોપર્ટીઝ હેઠળ નેસ્ટેડ ઘટકોનો ઉલ્લેખ કરવા માટે `<Foo.Bar>` જેવા બિંદુઓવાળા કમ્પોનન્ટ ટેગ્સનો ઉપયોગ કરી શકો છો. આ ત્યારે ઉપયોગી છે જ્યારે તમે સિંગલ ફાઇલમાંથી બહુવિધ ઘટકો ઇમ્પોર્ટ કરો છો:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## કસ્ટમ ડાયરેક્ટિવ્સનો ઉપયોગ કરવો (Using Custom Directives) {#using-custom-directives}

વૈશ્વિક સ્તરે રજીસ્ટર થયેલા કસ્ટમ ડાયરેક્ટિવ્સ હંમેશની જેમ કામ કરે છે. સ્થાનિક કસ્ટમ ડાયરેક્ટિવ્સને `<script setup>` સાથે સ્પષ્ટપણે રજીસ્ટર કરવાની જરૂર નથી, પરંતુ તેઓએ `vNameOfDirective` નામકરણ યોજનાને અનુસરવી આવશ્યક છે:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // એલિમેન્ટ સાથે કંઈક કામ કરો
  }
}
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

જો તમે બીજે ક્યાંકથી ડાયરેક્ટિવ ઇમ્પોર્ટ કરી રહ્યાં હોવ, તો તેને જરૂરી નામકરણ યોજનામાં ફિટ કરવા માટે નામ બદલી શકાય છે:

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## defineProps() & defineEmits() {#defineprops-defineemits}

સંપૂર્ણ ટાઇપ ઇન્ફરન્સ સપોર્ટ સાથે `props` અને `emits` જેવા વિકલ્પો જાહેર કરવા માટે, આપણે `defineProps` અને `defineEmits` APIs નો ઉપયોગ કરી શકીએ છીએ, જે `<script setup>` ની અંદર આપમેળે ઉપલબ્ધ છે:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

- `defineProps` અને `defineEmits` એ **કમ્પાઇલર મેક્રો** છે જે માત્ર `<script setup>` ની અંદર જ વાપરી શકાય છે. તેમને ઇમ્પોર્ટ કરવાની જરૂર નથી, અને જ્યારે `<script setup>` પ્રોસેસ થાય છે ત્યારે તેમને દૂર કરવામાં આવે છે.

- `defineProps` `props` વિકલ્પ જેવી જ કિંમત સ્વીકારે છે, જ્યારે `defineEmits` `emits` વિકલ્પ જેવી જ કિંમત સ્વીકારે છે.

- `defineProps` અને `defineEmits` પાસ કરેલા વિકલ્પોના આધારે યોગ્ય ટાઇપ ઇન્ફરન્સ પ્રદાન કરે છે.

- `defineProps` અને `defineEmits` ને પાસ કરેલા વિકલ્પો સેટઅપની બહાર મોડ્યુલ સ્કોપમાં ખસેડવામાં આવશે (hoisted). તેથી, વિકલ્પો સેટઅપ સ્કોપમાં જાહેર કરેલા સ્થાનિક વેરિયેબલ્સનો સંદર્ભ આપી શકતા નથી. આવું કરવાથી કમ્પાઇલ એરર આવશે. જો કે, તે ઇમ્પોર્ટ કરેલ બાઈન્ડિંગ્સનો સંદર્ભ આપી _શકે છે_ કારણ કે તેઓ મોડ્યુલ સ્કોપમાં પણ છે.

### ફક્ત-ટાઇપના પ્રોપ્સ/એમિટ ડિક્લેરેશન્સ<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

પ્રોપ્સ અને એમિટ્સ `defineProps` અથવા `defineEmits` ને લિટરલ ટાઇપ આર્ગ્યુમેન્ટ પાસ કરીને પ્યોર-ટાઇપ સિન્ટેક્સનો ઉપયોગ કરીને પણ જાહેર કરી શકાય છે:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: વૈકલ્પિક, વધુ સંક્ષિપ્ત સિન્ટેક્સ
const emit = defineEmits<{
  change: [id: number] // નેમ્ડ ટ્યુપલ સિન્ટેક્સ
  update: [value: string]
}>()
```

- `defineProps` અથવા `defineEmits` માત્ર રનટાઇમ ડિક્લેરેશન અથવા ટાઇપ ડિક્લેરેશન માંથી કોઈપણ એક જ વાપરી શકે છે. બંનેનો એકસાથે ઉપયોગ કરવાથી કમ્પાઇલ એરર આવશે.

- ટાઇપ ડિક્લેરેશનનો ઉપયોગ કરતી વખતે, ડબલ ડિક્લેરેશનની જરૂરિયાતને દૂર કરવા અને હજુ પણ યોગ્ય રનટાઇમ બિહેવિયર સુનિશ્ચિત કરવા માટે સ્ટેટિક એનાલિસિસમાંથી સમાન રનટાઇમ ડિક્લેરેશન આપમેળે જનરેટ થાય છે.

  - ડેવ મોડમાં, કમ્પાઇલર પ્રકારોમાંથી અનુરૂપ રનટાઇમ વેલિડેશનનું અનુમાન લગાવવાનો પ્રયાસ કરશે. ઉદાહરણ તરીકે અહીં `foo: string` પ્રકાર પરથી `foo: String` નું અનુમાન લગાવવામાં આવે છે. ઇમ્પોર્ટ કરેલા પ્રકારો પણ રિઝોલ્વ થાય છે, જો TypeScript પીઅર (peer) ડિપેન્ડન્સી તરીકે ઇન્સ્ટોલ કરેલી હોય.

  - પ્રોડ મોડમાં, કમ્પાઇલર બંડલનું કદ ઘટાડવા માટે એરે ફોર્મેટ ડિક્લેરેશન જનરેટ કરશે (અહીં પ્રોપ્સ `['foo', 'bar']` માં કમ્પાઇલ થશે)

- વર્ઝન 3.2 અને તેથી નીચેનામાં, `defineProps()` માટે જેનરિક ટાઇપ પેરામીટર લિટરલ અથવા સ્થાનિક ઇન્ટરફેસના સંદર્ભ સુધી મર્યાદિત હતા.

  આ મર્યાદા 3.3 માં ઉકેલવામાં આવી હતી. Vue નું લેટેસ્ટ વર્ઝન ટાઇપ પેરામીટરની સ્થિતિમાં ઇમ્પોર્ટ કરેલા અને જટિલ પ્રકારોના મર્યાદિત સેટને રેફરન્સ આપવાનું સપોર્ટ કરે છે. જો કે, કારણ કે ટાઇપ ટુ રનટાઇમ કન્વર્ઝન હજુ પણ AST-આધારિત છે, કેટલાક જટિલ પ્રકારો કે જેમાં વાસ્તવિક પ્રકાર વિશ્લેષણની જરૂર હોય છે, દા.ત. શરતી પ્રકારો (conditional types), સપોર્ટેડ નથી. તમે સિંગલ પ્રોપના પ્રકાર માટે શરતી પ્રકારોનો ઉપયોગ કરી શકો છો, પરંતુ સમગ્ર પ્રોપ્સ ઓબ્જેક્ટ માટે નહીં.

### રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચર (Reactive Props Destructure) <sup class="vt-badge" data-text="3.5+" /> {#reactive-props-destructure}

Vue 3.5 અને તેથી ઉપરના વર્ઝનમાં, `defineProps` ની રિટર્ન વેલ્યુમાંથી ડિસ્ટ્રક્ચર (destructured) કરેલા વેરિયેબલ્સ રિએક્ટિવ છે. જ્યારે સમાન `<script setup>` બ્લોકમાંનો કોડ `defineProps` માંથી ડિસ્ટ્રક્ચર થયેલા વેરિયેબલ્સને એક્સેસ કરે છે ત્યારે Vue નું કમ્પાઇલર આપમેળે `props.` આગળ જોડે છે:

```ts
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 3.5 પહેલા માત્ર એક જ વાર ચાલે છે
  // 3.5+ માં જ્યારે "foo" પ્રોપ બદલાય છે ત્યારે ફરીથી ચાલે છે
  console.log(foo)
})
```

ઉપર મુજબ નીચેના સમકક્ષ કમ્પાઇલ થાય છે:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // કમ્પાઇલર દ્વારા `foo` ને `props.foo` માં રૂપાંતરિત કરવામાં આવ્યું
  console.log(props.foo)
})
```

વધારામાં, તમે પ્રોપ્સ માટે ડિફોલ્ટ કિંમતો જાહેર કરવા માટે JavaScript ના નેટિવ ડિફોલ્ટ વેલ્યુ સિન્ટેક્સનો ઉપયોગ કરી શકો છો. જ્યારે ટાઇપ-આધારિત પ્રોપ્સ ડિક્લેરેશનનો ઉપયોગ કરવામાં આવે ત્યારે આ ખાસ કરીને ઉપયોગી છે:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

### ટાઇપ ડિક્લેરેશનનો ઉપયોગ કરતી વખતે ડિફોલ્ટ પ્રોપ્સ વેલ્યુઝ <sup class="vt-badge ts" /> {#default-props-values-when-using-type-declaration}

3.5 અને તેથી વધુમાં, રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચરનો ઉપયોગ કરતી વખતે ડિફોલ્ટ કિંમતો કુદરતી રીતે જાહેર કરી શકાય છે. પણ 3.4 અને તેથી નીચેનામાં, રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચર ડિફોલ્ટ રૂપે સક્ષમ નથી. ટાઇપ-આધારિત ડિક્લેરેશન સાથે પ્રોપ્સની ડિફોલ્ટ કિંમતો જાહેર કરવા માટે, `withDefaults` કમ્પાઇલર મેક્રોની જરૂર છે:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

આ સમકક્ષ રનટાઇમ પ્રોપ્સ `default` ઓપ્શન્સ માં કમ્પાઇલ થશે. વધુમાં, `withDefaults` હેલ્પર ડિફોલ્ટ કિંમતો માટે ટાઇપ ચેક પૂરા પાડે છે, અને ખાતરી કરે છે કે રિટર્ન થયેલ `props` પ્રકાર પાસે તે પ્રોપર્ટીઝ માટે વૈકલ્પિક ફ્લેગ્સ (optional flags) દૂર કરેલા છે કે જેના માટે ડિફોલ્ટ કિંમતો જાહેર કરવામાં આવી છે.

:::info
નોંધ કરો કે મ્યુટેબલ રેફરન્સ પ્રકારો (જેમ કે એરે અથવા ઓબ્જેક્ટ્સ) માટે ડિફોલ્ટ કિંમતો આકસ્મિક ફેરફાર અને બાહ્ય આડઅસરો ટાળવા માટે `withDefaults` નો ઉપયોગ કરતી વખતે ફંક્શન્સમાં લપેટવી જોઈએ. આ સુનિશ્ચિત કરે છે કે દરેક ઘટક ઇન્સ્ટન્સને ડિફોલ્ટ વેલ્યુની પોતાની નકલ મળે. ડિસ્ટ્રક્ચર સાથે ડિફોલ્ટ કિંમતોનો ઉપયોગ કરતી વખતે આ જરૂરી **નથી**.
:::

## defineModel() {#definemodel}

- માત્ર 3.4+ માં ઉપલબ્ધ છે

આ મેક્રોનો ઉપયોગ ટુ-વે બાઈન્ડિંગ પ્રોપ જાહેર કરવા માટે થઈ શકે છે જેનો ઉપયોગ પેરેન્ટ ઘટકમાંથી `v-model` દ્વારા કરી શકાય છે. ઉદાહરણ ઉપયોગ વિશે [ઘટક `v-model`](/guide/components/v-model) ગાઇડ માં પણ ચર્ચા કરવામાં આવી છે.

આ મેક્રો અંદરથી (under the hood) મોડેલ પ્રોપ અને અનુરૂપ વેલ્યુ અપડેટ ઇવેન્ટ જાહેર કરે છે. જો પ્રથમ આર્ગ્યુમેન્ટ લિટરલ સ્ટ્રિંગ હોય, તો તેનો ઉપયોગ પ્રોપ નેમ તરીકે કરવામાં આવશે; અન્યથા પ્રોપ નેમ ડિફોલ્ટ રૂપે `"modelValue"` રહેશે. બંને કિસ્સાઓમાં, તમે વધારાના ઓબ્જેક્ટને પણ પાસ કરી શકો છો જેમાં પ્રોપના વિકલ્પો અને મોડેલ રેફના વેલ્યુ ટ્રાન્સફોર્મ વિકલ્પો શામેલ હોઈ શકે છે.

```js
// "modelValue" પ્રોપ જાહેર કરે છે, પેરેન્ટ દ્વારા v-model દ્વારા ઉપયોગ થાય છે
const model = defineModel()
// અથવા: ઓપ્શન્સ સાથે "modelValue" પ્રોપ જાહેર કરે છે
const model = defineModel({ type: String })

// જ્યારે મ્યુટેટ (mutated) થાય ત્યારે "update:modelValue" એમિટ કરે છે
model.value = 'hello'

// "count" પ્રોપ જાહેર કરે છે, પેરેન્ટ દ્વારા v-model:count દ્વારા ઉપયોગ થાય છે
const count = defineModel('count')
// અથવા: ઓપ્શન્સ સાથે "count" પ્રોપ જાહેર કરે છે
const count = defineModel('count', { type: Number, default: 0 })

function inc() {
  // જ્યારે મ્યુટેટ થાય ત્યારે "update:count" એમિટ કરે છે
  count.value++
}
```

:::warning
જો તમારી પાસે `defineModel` પ્રોપ માટે `default` કિંમત હોય અને તમે પેરેન્ટ ઘટકમાંથી આ પ્રોપ માટે કોઈ કિંમત આપતા નથી, તો તે પેરેન્ટ અને ચાઈલ્ડ ઘટકો વચ્ચે ડી-સિંક્રોનાઈઝેશન (de-synchronization) પેદા કરી શકે છે. નીચેના ઉદાહરણમાં, પેરેન્ટનો `myRef` અનડિફાઇન્ડ છે, પરંતુ ચાઈલ્ડનો `model` 1 છે:

```vue [Child.vue]
<script setup>
const model = defineModel({ default: 1 })
</script>
```

```vue [Parent.vue]
<script setup>
const myRef = ref()
</script>

<template>
  <Child v-model="myRef"></Child>
</template>
```

:::

### મોડિફાયર્સ અને ટ્રાન્સફોર્મર્સ {#modifiers-and-transformers}

`v-model` ડાયરેક્ટિવ સાથે વપરાતા મોડિફાયર્સને એક્સેસ કરવા માટે, આપણે `defineModel()` ની રિટર્ન વેલ્યુને આ રીતે ડિસ્ટ્રક્ચર કરી શકીએ છીએ:

```js
const [modelValue, modelModifiers] = defineModel()

// v-model.trim ને અનુરૂપ છે
if (modelModifiers.trim) {
  // ...
}
```

જ્યારે મોડિફાયર હાજર હોય, ત્યારે મન પડે તેવી કિંમત વાંચતી વખતે અથવા તેને પેરેન્ટ સાથે પાછી સિંક કરતી વખતે તેને ટ્રાન્સફોર્મ કરવાની જરૂર પડી શકે છે. અમે `get` અને `set` ટ્રાન્સફોર્મર ઓપ્શન્સનો ઉપયોગ કરીને આ હાંસલ કરી શકીએ છીએ:

```js
const [modelValue, modelModifiers] = defineModel({
  // get() અહીં જરૂર ન હોવાથી છોડી દેવામાં આવ્યું છે
  set(value) {
    // જો .trim મોડિફાયરનો ઉપયોગ થાય, તો ટ્રીમ કરેલી વેલ્યુ રિટર્ન કરો
    if (modelModifiers.trim) {
      return value.trim()
    }
    // અન્યથા, વેલ્યુ એઝ-ઇઝ રિટર્ન કરો
    return value
  }
})
```

### TypeScript સાથે ઉપયોગ <sup class="vt-badge ts" /> {#usage-with-typescript}

`defineProps` અને `defineEmits` ની જેમ, `defineModel` પણ મોડેલ વેલ્યુ અને મોડિફાયર્સના પ્રકારો સ્પષ્ટ કરવા માટે ટાઇપ આર્ગ્યુમેન્ટ્સ મેળવી શકે છે:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// ઓપ્શન્સ સાથે ડિફોલ્ટ મોડેલ, required શક્ય અનડિફાઇન્ડ વેલ્યુઝ દૂર કરે છે
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```

## defineExpose() {#defineexpose}

`<script setup>` નો ઉપયોગ કરતા ઘટકો **ડિફોલ્ટ રૂપે બંધ (closed by default)** હોય છે - એટલે કે ઘટકનો પબ્લિક ઇન્સ્ટન્સ, જે ટેમ્પ્લેટ રેફ્સ અથવા `$parent` ચેઇન્સ દ્વારા મેળવવામાં આવે છે, તે `<script setup>` ની અંદર જાહેર કરાયેલ કોઈપણ બાઈન્ડિંગ્સને એક્સપોઝ કરશે **નહીં**.

`<script setup>` ઘટકમાં ગુણધર્મોને સ્પષ્ટપણે સ્પષ્ટપણે એક્સપોઝ કરવા માટે, `defineExpose` કમ્પાઇલર મેક્રોનો ઉપયોગ કરો:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

જ્યારે પેરેન્ટ ટેમ્પ્લેટ રેફ્સ દ્વારા આ ઘટકનો ઇન્સ્ટન્સ મેળવે છે, ત્યારે મેળવેલ ઇન્સ્ટન્સ `{ a: number, b: number }` આકારનું હશે (refs સામાન્ય ઇન્સ્ટન્સની જેમ આપમેળે અનવ્રેપ થઈ જાય છે).

## defineOptions() {#defineoptions}

- માત્ર 3.3+ માં સપોર્ટેડ

આ મેક્રોનો ઉપયોગ અલગ `<script>` બ્લોકનો ઉપયોગ કરવાની જરૂર વગર સીધા `<script setup>` ની અંદર ઘટક વિકલ્પો જાહેર કરવા માટે થઈ શકે છે:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

- આ એક મેક્રો છે. વિકલ્પોને મોડ્યુલ સ્કોપમાં ખસેડવામાં આવશે અને તે `<script setup>` માંના સ્થાનિક વેરિયેબલ્સ કે જે લિટરલ કોન્સ્ટન્ટ્સ (literal constants) નથી તેમને એક્સેસ કરી શકતા નથી.

## defineSlots()<sup class="vt-badge ts"/> {#defineslots}

- માત્ર 3.3+ માં સપોર્ટેડ

આ મેક્રોનો ઉપયોગ સ્લોટ નેમ અને પ્રોપ્સ ટાઇપ ચેકિંગ માટે IDEs ને ટાઇપ હિન્ટ્સ પ્રદાન કરવા માટે થઈ શકે છે.

`defineSlots()` માત્ર ટાઇપ પેરામીટર સ્વીકારે છે અને કોઈ રનટાઇમ આર્ગ્યુમેન્ટ્સ નથી. ટાઇપ પેરામીટર ટાઇપ લિટરલ હોવું જોઈએ જ્યાં પ્રોપર્ટી કી સ્લોટનું નામ છે, અને વેલ્યુ ટાઇપ સ્લોટ ફંક્શન છે. ફંક્શનનો પ્રથમ આર્ગ્યુમેન્ટ એ પ્રોપ્સ છે જે સ્લોટ મેળવવાની અપેક્ષા રાખે છે, અને તેનો પ્રકાર ટેમ્પ્લેટમાં સ્લોટ પ્રોપ્સ માટે ઉપયોગમાં લેવામાં આવશે. રિટર્ન ટાઇપ હાલમાં અવગણવામાં આવે છે અને ગમે તે (`any`) હોઈ શકે છે, પરંતુ અમે ભવિષ્યમાં સ્લોટ કન્ટેન્ટ ચેકિંગ માટે તેનો લાભ લઈ શકીએ છીએ.

તે `slots` ઓબ્જેક્ટ પણ રિટર્ન કરે છે, જે સેટઅપ કોન્ટેક્સ્ટ (context) પર એક્સપોઝ થયેલા અથવા `useSlots()` દ્વારા રિટર્ન કરાયેલા `slots` ઓબ્જેક્ટની સમકક્ષ છે.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

## `useSlots()` & `useAttrs()` {#useslots-useattrs}

`<script setup>` ની અંદર `slots` અને `attrs` નો ઉપયોગ પ્રમાણમાં ઓછો હોવો જોઈએ, કારણ કે તમે તેમને ટેમ્પ્લેટમાં `$slots` અને `$attrs` તરીકે સીધા એક્સેસ કરી શકો છો. દુર્લભ કિસ્સામાં જ્યાં તમારે તેમની જરૂર હોય, અનુક્રમે `useSlots` અને `useAttrs` હેલ્પર્સનો ઉપયોગ કરો:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` અને `useAttrs` વાસ્તવિક રનટાઇમ ફંક્શન્સ છે જે `setupContext.slots` અને `setupContext.attrs` ના સમકક્ષ રિટર્ન કરે છે. તેઓ સામાન્ય કમ્પોઝિશન API ફંક્શન્સમાં પણ વાપરી શકાય છે.

## સામાન્ય `<script>` ની સાથે ઉપયોગ {#usage-alongside-normal-script}

`<script setup>` નો ઉપયોગ સામાન્ય `<script>` ની સાથે કરી શકાય છે. એવા કિસ્સાઓમાં સામાન્ય `<script>` ની જરૂર પડી શકે છે જ્યાં અમારે કરવાની જરૂર હોય:

- એવા વિકલ્પો જાહેર કરવા કે જે `<script setup>` માં વ્યક્ત કરી શકાતા નથી, ઉદાહરણ તરીકે `inheritAttrs` અથવા પ્લગઈન્સ દ્વારા સક્ષમ કરેલ કસ્ટમ વિકલ્પો (3.3+ માં [`defineOptions`](/api/sfc-script-setup#defineoptions) દ્વારા બદલી શકાય છે).
- નેમ્ડ એક્સપોર્ટ્સ (named exports) જાહેર કરવા.
- સાઇડ ઇફેક્ટ્સ ચલાવો અથવા એવા ઓબ્જેક્ટ્સ બનાવો જે ફક્ત એક જ વાર એક્ઝિક્યુટ થવા જોઈએ.

```vue
<script>
// સામાન્ય <script>, મોડ્યુલ સ્કોપમાં એક્ઝિક્યુટ થાય છે (માત્ર એક જ વાર)
runSideEffectOnce()

// વધારાના વિકલ્પો જાહેર કરો
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// setup() સ્કોપમાં એક્ઝિક્યુટ થાય છે (દરેક ઇન્સ્ટન્સ માટે)
</script>
```

સમાન ઘટકમાં `<script setup>` અને `<script>` ના સંયોજન માટે સપોર્ટ ઉપર વર્ણવેલ દૃશ્યો સુધી મર્યાદિત છે. ખાસ કરીને:

- એવા વિકલ્પો માટે અલગ `<script>` વિભાગનો ઉપયોગ કરશો **નહીં** જે પહેલાથી જ `<script setup>` નો ઉપયોગ કરીને વ્યાખ્યાયિત કરી શકાય છે, જેમ કે `props` અને `emits`.
- `<script setup>` ની અંદર બનાવેલા વેરિયેબલ્સ ઘટક ઇન્સ્ટન્સમાં પ્રોપર્ટીઝ તરીકે ઉમેરવામાં આવતા નથી, જેનાથી તેઓ Options API માંથી એક્સેસ કરી શકાતા નથી. આ રીતે મિક્સિંગ APIs ને સખત રીતે નિરુત્સાહિત (discouraged) કરવામાં આવે છે.

જો તમે તમારી જાતને એવા દૃશ્યોમાંના એકમાં જોશો કે જે સપોર્ટેડ નથી, તો તમારે `<script setup>` નો ઉપયોગ કરવાને બદલે સ્પષ્ટ [`setup()`](/api/composition-api-setup) ફંક્શન પર સ્વિચ કરવાનું વિચારવું જોઈએ.

## ટોપ-લેવલ `await` {#top-level-await}

ટોપ-લેવલ `await` નો ઉપયોગ `<script setup>` ની અંદર થઈ શકે છે. પરિણામી કોડ `async setup()` તરીકે કમ્પાઇલ કરવામાં આવશે:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

વધારામાં, અવેઈટેડ (awaited) એક્સપ્રેશન એવા ફોર્મેટમાં આપમેળે કમ્પાઇલ કરવામાં આવશે જે `await` પછી વર્તમાન ઘટક ઇન્સ્ટન્સ કોન્ટેક્સ્ટને સાચવે છે.

:::warning નોંધ
`async setup()` નો ઉપયોગ [`Suspense`](/guide/built-ins/suspense.html) સાથે સંયોજનમાં થવો જોઈએ, જે હાલમાં હજુ એક પ્રાયોગિક (experimental) સુવિધા છે. અમે ભવિષ્યના રિલીઝમાં તેને અંતિમ સ્વરૂપ આપવાની અને ડોક્યુમેન્ટ કરવાની યોજના બનાવીએ છીએ - પરંતુ જો તમે અત્યારે ઉત્સુક હોવ, તો તે કેવી રીતે કાર્ય કરે છે તે જોવા માટે તમે તેના [પરીક્ષણો (tests)](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts) નો સંદર્ભ લઈ શકો છો.
:::

## ઇમ્પોર્ટ સ્ટેટમેન્ટ્સ (Import Statements) {#imports-statements}

vue માં ઇમ્પોર્ટ સ્ટેટમેન્ટ્સ [ECMAScript મોડ્યુલ સ્પષ્ટીકરણ (module specification)](https://nodejs.org/api/esm.html) ને અનુસરે છે.
વધારેમાં, તમે તમારા બિલ્ડ ટૂલ કોન્ફિગરેશનમાં વ્યાખ્યાયિત ઉપનામો (aliases) નો ઉપયોગ કરી શકો છો:

```vue
<script setup>
import { ref } from 'vue'
import { componentA } from './Components'
import { componentB } from '@/Components'
import { componentC } from '~/Components'
</script>
```

## જેનરિક્સ (Generics) <sup class="vt-badge ts" /> {#generics}

જેનરિક ટાઇપ પેરામીટર્સ `<script>` ટેગ પર `generic` એટ્રિબ્યુટનો ઉપયોગ કરીને જાહેર કરી શકાય છે:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

`generic` ની કિંમત TypeScript માં `<...>` વચ્ચેની પેરામીટર લિસ્ટ જેવી જ કામ કરે છે. ઉદાહરણ તરીકે, તમે બહુવિધ પેરામીટર્સ, `extends` પ્રતિબંધો, ડિફોલ્ટ પ્રકારો અને ઇમ્પોર્ટ કરેલ પ્રકારોનો રેફરન્સ આપી શકો છો:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

જ્યારે પ્રકારનું અનુમાન ન કરી શકાય, ત્યારે સ્પષ્ટ પ્રકારો પાસ કરવા માટે તમે `@vue-generic` ડાયરેક્ટિવનો ઉપયોગ કરી શકો છો:

```vue
<template>
  <!-- @vue-generic {import('@/api').Actor} -->
  <ApiSelect v-model="peopleIds" endpoint="/api/actors" id-prop="actorId" />

  <!-- @vue-generic {import('@/api').Genre} -->
  <ApiSelect v-model="genreIds" endpoint="/api/genres" id-prop="genreId" />
</template>
```

`ref` માં જેનરિક ઘટકનો સંદર્ભ વાપરવા માટે તમારે [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) લાઈબ્રેરીનો ઉપયોગ કરવાની જરૂર છે કારણ કે `InstanceType` કામ કરશે નહીં.

```vue
<script
  setup
  lang="ts"
>
import componentWithoutGenerics from '../component-without-generics.vue';
import genericComponent from '../generic-component.vue';

import type { ComponentExposed } from 'vue-component-type-helpers';

// જેનરિક વગરના ઘટક માટે કામ કરે છે
ref<InstanceType<typeof componentWithoutGenerics>>();

ref<ComponentExposed<typeof genericComponent>>();
```

## મર્યાદાઓ (Restrictions) {#restrictions}

- મોડ્યુલ એક્ઝિક્યુશન સેમેન્ટિક્સમાં તફાવતને કારણે, `<script setup>` ની અંદરનો કોડ SFC ના કોન્ટેક્સ્ટ પર આધાર રાખે છે. જ્યારે બાહ્ય `.js` અથવા `.ts` ફાઇલોમાં ખસેડવામાં આવે ત્યારે તે ડેવલપર્સ અને ટૂલ્સ બંને માટે મૂંઝવણ પેદા કરી શકે છે. તેથી, **`<script setup>`** નો ઉપયોગ `src` એટ્રિબ્યુટ સાથે કરી શકાતો નથી.
- `<script setup>` ઇન-DOM રુટ કમ્પોનન્ટ ટેમ્પલેટને સપોર્ટ કરતું નથી.([સંબંધિત ચર્ચા](https://github.com/vuejs/core/issues/8391))
