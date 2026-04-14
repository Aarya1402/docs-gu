# કોમ્પોઝિશન (Composition) API સાથે TypeScript {#typescript-with-composition-api}

<ScrimbaLink href="https://scrimba.com/links/vue-ts-composition-api" title="ફ્રી Vue.js TypeScript અને Composition API લેસન" type="scrimba">
  Scrimba પર ઇન્ટરેક્ટિવ વિડિયો લેસન જુઓ
</ScrimbaLink>

> આ પેજ ધારે છે કે તમે [Vue સાથે TypeScript નો ઉપયોગ કરવો](./overview) વિશેનું વિહંગાવલોકન પહેલેથી જ વાંચ્યું છે.

## ઘટક પ્રોપ્સ (Props) ના ટાઇપ્સ {#typing-component-props}

### `<script setup>` નો ઉપયોગ કરવો {#using-script-setup}

જ્યારે `<script setup>` નો ઉપયોગ કરવામાં આવે છે, ત્યારે `defineProps()` મેક્રો તેના આર્ગ્યુમેન્ટના આધારે પ્રોપ્સ ટાઇપ્સના અનુમાનને સપોર્ટ કરે છે:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

આને "રનટાઇમ ડિક્લેરેશન (runtime declaration)" કહેવામાં આવે છે, કારણ કે `defineProps()` માં પસાર થયેલ આર્ગ્યુમેન્ટનો ઉપયોગ રનટાઇમ `props` ઓપ્શન તરીકે કરવામાં આવશે.

જોકે, જેનેરિક ટાઇપ આર્ગ્યુમેન્ટ દ્વારા શુદ્ધ ટાઇપ્સ (pure types) સાથે પ્રોપ્સને વ્યાખ્યાયિત કરવું સામાન્ય રીતે વધુ સીધું હોય છે:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

આને "ટાઇપ-આધારિત ડિક્લેરેશન (type-based declaration)" કહેવામાં આવે છે. કમ્પાઇલર ટાઇપ આર્ગ્યુમેન્ટના આધારે સમકક્ષ રનટાઇમ ઓપ્શન્સનું અનુમાન કરવાનો શ્રેષ્ઠ પ્રયાસ કરશે. આ કિસ્સામાં, અમારું બીજું ઉદાહરણ પ્રથમ ઉદાહરણ સમાન રનટાઇમ ઓપ્શન્સમાં કમ્પાઇલ થાય છે.

તમે કાં તો ટાઇપ-આધારિત ડિક્લેરેશન અથવા રનટાઇમ ડિક્લેરેશનનો ઉપયોગ કરી શકો છો, પરંતુ તમે બંનેનો એકસાથે ઉપયોગ કરી શકતા નથી.

અમે પ્રોપ્સ ટાઇપ્સને અલગ ઇન્ટરફેસમાં પણ ખસેડી શકીએ છીએ:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

આ ત્યારે પણ કામ કરે છે જો `Props` કોઈ અન્ય ફાઇલમાંથી ઇમ્પોર્ટ કરવામાં આવે જેમ કે રિલેટિવ ઇમ્પોર્ટ, પાથ એલિયાસ (દા.ત. `@/types`), અથવા એક્સટર્નલ ડિપેન્ડન્સી (દા.ત. `node_modules`). આ સુવિધા માટે TypeScript ને Vue ની પીઅર ડિપેન્ડન્સી હોવી જરૂરી છે.

```vue
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

#### સિન્ટેક્સ મર્યાદાઓ (Syntax Limitations) {#syntax-limitations}

વર્ઝન ૩.૨ અને તેથી ઓછા વર્ઝનમાં, `defineProps()` માટે જેનેરિક ટાઇપ પેરામીટર ટાઇપ લિટરલ અથવા લોકલ ઇન્ટરફેસના રિફરન્સ સુધી મર્યાદિત હતું.

આ મર્યાદા ૩.૩ માં ઉકેલવામાં આવી હતી. Vue નું લેટેસ્ટ વર્ઝન ટાઇપ પેરામીટર પોઝિશનમાં ઇમ્પોર્ટેડ અને મર્યાદિત જટિલ ટાઇપ્સના રિફરન્સ આપવાને સપોર્ટ કરે છે. જોકે, ટાઇપ ટુ રનટાઇમ કન્વર્ઝન હજુ પણ AST-આધારિત હોવાથી, કેટલાક જટિલ પ્રકારો કે જેને વાસ્તવિક ટાઇપ એનાલિસિસની જરૂર હોય છે, દા.ત. શરતી ટાઇપ્સ (conditional types), સપોર્ટેડ નથી. તમે સિંગલ પ્રોપના ટાઇપ માટે શરતી પ્રકારોનો ઉપયોગ કરી શકો છો, પરંતુ સમગ્ર પ્રોપ્સ ઓબ્જેક્ટ માટે નહીં.

### પ્રોપ્સની ડિફોલ્ટ વેલ્યુઝ (Props Default Values) {#props-default-values}

જ્યારે ટાઇપ-આધારિત ડિક્લેરેશનનો ઉપયોગ કરવામાં આવે છે, ત્યારે આપણે પ્રોપ્સ માટે ડિફોલ્ટ વેલ્યુઝ જાહેર કરવાની ક્ષમતા ગુમાવીએ છીએ. આને [રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચર (Reactive Props Destructure)](/guide/components/props#reactive-props-destructure) <sup class="vt-badge" data-text="3.5+" /> નો ઉપયોગ કરીને ઉકેલી શકાય છે:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'નમસ્તે', labels = ['એક', 'બે'] } = defineProps<Props>()
```

૩.૪ અને તેનાથી નીચેના વર્ઝનમાં, રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચર ડિફોલ્ટ રૂપે સક્ષમ નથી. તેનો વિકલ્પ `withDefaults` કમ્પાઇલર મેક્રોનો ઉપયોગ કરવાનો છે:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'નમસ્તે',
  labels: () => ['એક', 'બે']
})
```

આ સમકક્ષ રનટાઇમ પ્રોપ્સ `default` ઓપ્શન્સમાં કમ્પાઇલ કરવામાં આવશે. વધારામાં, `withDefaults` હેલ્પર ડિફોલ્ટ વેલ્યુઝ માટે ટાઇપ ચેક્સ પૂરા પાડે છે, અને સુનિશ્ચિત કરે છે કે પરત કરેલ `props` ટાઇપમાં જે પ્રોપર્ટીઝ માટે ડિફોલ્ટ વેલ્યુઝ જાહેર કરવામાં આવી છે તેમાંથી ઓપ્શનલ ફ્લેગ્સ દૂર કરવામાં આવે છે.

:::info
નોંધ કરો કે મ્યુટેબલ રિફરન્સ ટાઇપ્સ (જેમ કે એરે અથવા ઓબ્જેક્ટ્સ) માટે ડિફોલ્ટ વેલ્યુઝને `withDefaults` નો ઉપયોગ કરતી વખતે આકસ્મિક ફેરફાર અને બાહ્ય આડઅસરોથી બચવા માટે ફંક્શન્સમાં લપેટી લેવી જોઈએ. આ સુનિશ્ચિત કરે છે કે દરેક ઘટક ઇન્સ્ટન્સ તેની પોતાની ડિફોલ્ટ વેલ્યુની નકલ મેળવે છે. જ્યારે ડિસ્ટ્રક્ચર સાથે ડિફોલ્ટ વેલ્યુઝનો ઉપયોગ કરવામાં આવે ત્યારે આ જરૂરી **નથી**.
:::

### `<script setup>` વિના {#without-script-setup}

જો `<script setup>` નો ઉપયોગ કરતા નથી, તો પ્રોપ્સ ટાઇપ ઇન્ફરન્સને સક્ષમ કરવા માટે `defineComponent()` નો ઉપયોગ કરવો જરૂરી છે. `setup()` માં પસાર થયેલ પ્રોપ્સ ઓબ્જેક્ટનો પ્રકાર `props` ઓપ્શન પરથી અનુમાનિત થાય છે.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- ટાઇપ: string
  }
})
```

### જટિલ પ્રોપ ટાઇપ્સ (Complex prop types) {#complex-prop-types}

ટાઇપ-આધારિત ડિક્લેરેશન સાથે, પ્રોપ અન્ય કોઈપણ પ્રકારની જેમ જટિલ ટાઇપનો ઉપયોગ કરી શકે છે:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

રનટાઇમ ડિક્લેરેશન માટે, આપણે `PropType` યુટિલિટી ટાઇપનો ઉપયોગ કરી શકીએ છીએ:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

જો આપણે સીધા જ `props` ઓપ્શનનો ઉલ્લેખ કરીએ તો આ લગભગ સમાન રીતે કાર્ય કરે છે:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

`props` ઓપ્શન સામાન્ય રીતે Options API સાથે વપરાય છે, તેથી તમને [TypeScript અને Options API](/guide/typescript/options-api#typing-component-props) માર્ગદર્શિકામાં વધુ વિગતવાર ઉદાહરણો મળશે. તે ઉદાહરણોમાં દર્શાવેલ તકનીકો `defineProps()` નો ઉપયોગ કરીને રનટાઇમ ડિક્લેરેશન પર પણ લાગુ પડે છે.

## ઘટક એમિટ્સ (Emits) ના ટાઇપ્સ {#typing-component-emits}

`<script setup>` માં, `emit` ફંક્શન પણ કાં તો રનટાઇમ ડિક્લેરેશન અથવા ટાઇપ ડિક્લેરેશનનો ઉપયોગ કરીને ટાઇપ કરી શકાય છે:

```vue
<script setup lang="ts">
// રનટાઇમ (runtime)
const emit = defineEmits(['change', 'update'])

// ઓપ્શન્સ આધારિત (options based)
const emit = defineEmits({
  change: (id: number) => {
    // વેલિડેશન પાસ / ફેલ દર્શાવવા માટે
    // `true` અથવા `false` પરત કરો
  },
  update: (value: string) => {
    // વેલિડેશન પાસ / ફેલ દર્શાવવા માટે
    // `true` અથવા `false` પરત કરો
  }
})

// ટાઇપ-આધારિત (type-based)
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// ૩.૩+: વૈકલ્પિક, વધુ સંક્ષિપ્ત સિન્ટેક્સ
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

ટાઇપ આર્ગ્યુમેન્ટ નીચેનામાંથી એક હોઈ શકે છે:

૧. કોલેબલ ફંક્શન ટાઇપ, પરંતુ [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures) સાથે ટાઇપ લિટરલ તરીકે લખાયેલ. તેનો ઉપયોગ પરત કરેલા `emit` ફંક્શનના પ્રકાર તરીકે કરવામાં આવશે.
૨. ટાઇપ લિટરલ જ્યાં કીઓ ઇવેન્ટના નામ છે, અને વેલ્યુઝ એરે / ટ્યુપલ પ્રકારો છે જે ઇવેન્ટ માટે વધારાના સ્વીકૃત પરિમાણોનું પ્રતિનિધિત્વ કરે છે. ઉપરનું ઉદાહરણ નેમ્ડ ટ્યુપલનો ઉપયોગ કરી રહ્યું છે જેથી દરેક આર્ગ્યુમેન્ટનું સ્પષ્ટ નામ હોઈ શકે.

જેમ આપણે જોઈ શકીએ છીએ, ટાઇપ ડિક્લેરેશન આપણને એમિટેડ ઇવેન્ટ્સના ટાઇપ કન્સ્ટ્રેઇન્ટ્સ પર વધુ સારું નિયંત્રણ આપે છે.

જ્યારે `<script setup>` નો ઉપયોગ ન કરતા હોય, ત્યારે `defineComponent()` સેટઅપ કોન્ટેક્ષ પર એક્સપોઝ થયેલા `emit` ફંક્શન માટે મંજૂર ઇવેન્ટ્સનું અનુમાન કરવામાં સક્ષમ છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- ટાઇપ ચેક / ઓટો-કમ્પ્લીશન
  }
})
```

## `ref()` ના ટાઇપ્સ {#typing-ref}

Refs પ્રારંભિક મૂલ્ય પરથી ટાઇપનો અંદાજ મેળવે છે:

```ts
import { ref } from 'vue'

// અનુમાનિત પ્રકાર: Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

ક્યારેક આપણે રેફના અંદરના મૂલ્ય માટે જટિલ ટાઇપ સ્પષ્ટ કરવાની જરૂર પડી શકે છે. આપણે `Ref` ટાઇપનો ઉપયોગ કરીને તે કરી શકીએ છીએ:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // બરાબર છે!
```

અથવા, ડિફોલ્ટ ઇન્ફરન્સને ઓવરરાઇડ કરવા માટે `ref()` ને કૉલ કરતી વખતે જેનેરિક આર્ગ્યુમેન્ટ આપીને:

```ts
// પરિણામી પ્રકાર: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // બરાબર છે!
```

જો તમે જેનેરિક ટાઇપ આર્ગ્યુમેન્ટનો ઉલ્લેખ કરો છો પરંતુ પ્રારંભિક મૂલ્યને અવગણો છો, તો પરિણામી પ્રકાર યુનિયન ટાઇપ હશે જેમાં `undefined` શામેલ હશે:

```ts
// અનુમાનિત પ્રકાર: Ref<number | undefined>
const n = ref<number>()
```

## `reactive()` ના ટાઇપ્સ {#typing-reactive}

`reactive()` પણ તેના આર્ગ્યુમેન્ટ પરથી સ્પષ્ટપણે પ્રકારનું અનુમાન કરે છે:

```ts
import { reactive } from 'vue'

// અનુમાનિત પ્રકાર: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

`reactive` પ્રોપર્ટીને સ્પષ્ટપણે ટાઇપ કરવા માટે, આપણે ઇન્ટરફેસનો ઉપયોગ કરી શકીએ છીએ:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip
`reactive()` ના જેનેરિક આર્ગ્યુમેન્ટનો ઉપયોગ કરવાની ભલામણ કરવામાં આવતી નથી કારણ કે પરત કરેલ ટાઇપ, જે નેસ્ટેડ રેફ અનરેપિંગને હેન્ડલ કરે છે, તે જેનેરિક આર્ગ્યુમેન્ટ ટાઇપ કરતા અલગ હોય છે.
:::

## `computed()` ના ટાઇપ્સ {#typing-computed}

`computed()` ગેટરની પરત વેલ્યુના આધારે તેના પ્રકારનો અંદાજ મેળવે છે:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// અનુમાનિત પ્રકાર: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

તમે જેનેરિક આર્ગ્યુમેન્ટ દ્વારા સ્પષ્ટ પ્રકારનો ઉલ્લેખ પણ કરી શકો છો:

```ts
const double = computed<number>(() => {
  // જો આ નંબર પરત ન કરે તો ટાઇપ એરર આવશે
})
```

## ઇવેન્ટ હેન્ડલર્સના ટાઇપ્સ {#typing-event-handlers}

જ્યારે નેટિવ DOM ઇવેન્ટ્સ સાથે કામ કરો ત્યારે હેન્ડલરને જે આર્ગ્યુમેન્ટ મોકલીએ છીએ તેને ટાઇપ કરવું મદદરૂપ બની રહે છે. ચાલો આ ઉદાહરણ જોઈએ:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` માં સ્પષ્ટપણે `any` ટાઇપ છે
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

ટાઇપ એનોટેશન (type annotation) વિના, `event` આર્ગ્યુમેન્ટમાં હજુ પણ `any` ટાઇપ હશે. જો `tsconfig.json` માં `"strict": true` અથવા `"noImplicitAny": true` વપરાયેલ હોય તો આના પરિણામે TS ભૂલ પણ આવશે. તેથી ઇવેન્ટ હેન્ડલર્સના આર્ગ્યુમેન્ટને સ્પષ્ટપણે એનોટેટ કરવાની ભલામણ કરવામાં આવે છે. વધારામાં, `event` ની પ્રોપર્ટીઝ એક્સેસ કરતી વખતે તમારે ટાઇપ એસર્શન્સ (type assertions) નો ઉપયોગ કરવાની જરૂર પડી શકે છે:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Provide / Inject ના ટાઇપ્સ {#typing-provide-inject}

Provide અને inject સામાન્ય રીતે અલગ ઘટકોમાં કરવામાં આવે છે. ઇન્જેક્ટેડ વેલ્યુઝને યોગ્ય રીતે ટાઇપ કરવા માટે, Vue `InjectionKey` ઇન્ટરફેસ પ્રદાન કરે છે, જે `Symbol` ને વિસ્તૃત કરતો જેનેરિક ટાઇપ છે. તેનો ઉપયોગ પ્રોવાઇડર અને કન્ઝ્યુમર વચ્ચે ઇન્જેક્ટેડ વેલ્યુના પ્રકારને સિંક (sync) કરવા માટે થઈ શકે છે:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // નોન-સ્ટ્રિંગ વેલ્યુ આપવાથી ભૂલ આવશે

const foo = inject(key) // foo નો ટાઇપ: string | undefined
```

ઇન્જેક્શન કીને અલગ ફાઇલમાં રાખવાની ભલામણ કરવામાં આવે છે જેથી કરીને તેને બહુવિધ ઘટકોમાં ઇમ્પોર્ટ કરી શકાય.

સ્ટ્રિંગ ઇન્જેક્શન કીનો ઉપયોગ કરતી વખતે, ઇન્જેક્ટ કરેલી વેલ્યુનો પ્રકાર `unknown` હશે, અને જેનેરિક ટાઇપ આર્ગ્યુમેન્ટ દ્વારા સ્પષ્ટપણે જાહેર કરવાની જરૂર છે:

```ts
const foo = inject<string>('foo') // ટાઇપ: string | undefined
```

નોંધ લો કે ઇન્જેક્ટ કરેલ વેલ્યુ હજુ પણ `undefined` હોઈ શકે છે, કારણ કે એવી કોઈ ગેરેંટી નથી કે પ્રોવાઇડર રનટાઇમ પર આ કિંમત પ્રદાન કરશે.

ડિફોલ્ટ વેલ્યુ આપીને `undefined` પ્રકાર દૂર કરી શકાય છે:

```ts
const foo = inject<string>('foo', 'bar') // ટાઇપ: string
```

જો તમને ખાતરી હોય કે કિંમત હંમેશા પૂરી પાડવામાં આવે છે, તો તમે વેલ્યુ કાસ્ટ પણ કરી શકો છો:

```ts
const foo = inject('foo') as string
```

## ટેમ્પલેટ રેફ્સ (Template Refs) ના ટાઇપ્સ {#typing-template-refs}

Vue ૩.૫ અને `@vue/language-tools` ૨.૧ (IDE લેંગ્વેજ સર્વિસ અને `vue-tsc` બંનેને પાવર આપતા) સાથે, SFCs માં `useTemplateRef()` દ્વારા બનાવેલા રેફ્સનો પ્રકાર સ્ટેટિક રેફ્સ માટે જે એલિમેન્ટ પર મેચિંગ `ref` એટ્રિબ્યુટ વપરાય છે તેના આધારે **આપમેળે અનુમાનિત** થઈ શકે છે.

એવા કિસ્સાઓમાં કે જ્યાં ઓટો-ઇન્ફરન્સ શક્ય ન હોય, તો પણ તમે જેનેરિક આર્ગ્યુમેન્ટ દ્વારા ટેમ્પલેટ રેફને સ્પષ્ટ પ્રકારમાં કાસ્ટ કરી શકો છો:

```ts
const el = useTemplateRef<HTMLInputElement>('el')
```

<details>
<summary>૩.૫ પહેલાનો વપરાશ</summary>

ટેમ્પલેટ રેફ્સ સ્પષ્ટ જેનેરિક ટાઇપ આર્ગ્યુમેન્ટ અને `null` ની પ્રારંભિક વેલ્યુ સાથે બનાવવા જોઈએ:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

</details>

યોગ્ય DOM ઇન્ટરફેસ મેળવવા માટે તમે [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#technical_summary) જેવા પેજ તપાસી શકો છો.

નોંધ લો કે સખત ટાઇપ સેફ્ટી માટે, `el.value` એક્સેસ કરતી વખતે ઓપ્શનલ ચેઇનિંગ અથવા ટાઇપ ગાર્ડ્સનો ઉપયોગ કરવો જરૂરી છે. આ એટલા માટે છે કારણ કે ઘટક માઉન્ટ ન થાય ત્યાં સુધી પ્રારંભિક રેફ વેલ્યુ `null` હોય છે, અને જો રિફરન્સ કરેલ એલિમેન્ટ `v-if` દ્વારા અનમાઉન્ટ કરવામાં આવે તો તે `null` પર પણ સેટ થઈ શકે છે.

## ઘટક ટેમ્પલેટ રેફ્સના ટાઇપ્સ (Typing Component Template Refs) {#typing-component-template-refs}

Vue ૩.૫ અને `@vue/language-tools` ૨.૧ (IDE લેંગ્વેજ સર્વિસ અને `vue-tsc` બંનેને પાવર આપતા) સાથે, SFCs માં `useTemplateRef()` દ્વારા બનાવેલા રેફ્સનો પ્રકાર સ્ટેટિક રેફ્સ માટે જે એલિમેન્ટ અથવા ઘટક પર મેચિંગ `ref` એટ્રિબ્યુટ વપરાય છે તેના આધારે **આપમેળે અનુમાનિત** થઈ શકે છે.

એવા કિસ્સાઓમાં કે જ્યાં ઓટો-ઇન્ફરન્સ શક્ય ન હોય (દા.ત. નોન-SFC વપરાશ અથવા ડાયનેમિક ઘટકો), તેમ છતાં તમે જેનેરિક આર્ગ્યુમેન્ટ દ્વારા ટેમ્પલેટ રેફને સ્પષ્ટ પ્રકારમાં કાસ્ટ કરી શકો છો.

ઇમ્પોર્ટ કરેલ ઘટકનો ઇન્સ્ટન્સ પ્રકાર મેળવવા માટે, આપણે પહેલા `typeof` દ્વારા તેનો પ્રકાર મેળવવો પડશે, પછી તેનો ઇન્સ્ટન્સ પ્રકાર કાઢવા માટે TypeScript ના બિલ્ટ-ઇન `InstanceType` યુટિલિટીનો ઉપયોગ કરવો પડશે:

```vue{6,7} [App.vue]
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

type FooType = InstanceType<typeof Foo>
type BarType = InstanceType<typeof Bar>

const compRef = useTemplateRef<FooType | BarType>('comp')
</script>

<template>
  <component :is="Math.random() > 0.5 ? Foo : Bar" ref="comp" />
</template>
```

એવા કિસ્સાઓમાં કે જ્યાં ઘટકનો ચોક્કસ પ્રકાર ઉપલબ્ધ ન હોય અથવા મહત્વનો ન હોય, તો તેના બદલે `ComponentPublicInstance` નો ઉપયોગ કરી શકાય છે. આમાં ફક્ત તે જ પ્રોપર્ટીઝ શામેલ હશે જે તમામ ઘટકો દ્વારા શેર કરવામાં આવે છે, જેમ કે `$el`:

```ts
import { useTemplateRef } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = useTemplateRef<ComponentPublicInstance>('child')
```

એવા કિસ્સાઓમાં કે જ્યાં રિફરન્સ કરેલ ઘટક [જેનેરિક ઘટક (generic component)](/guide/typescript/overview.html#generic-components) છે, ઉદાહરણ તરીકે `MyGenericModal`:

```vue [MyGenericModal.vue]
<script setup lang="ts" generic="ContentType extends string | number">
import { ref } from 'vue'

const content = ref<ContentType | null>(null)

const open = (newContent: ContentType) => (content.value = newContent)

defineExpose({
  open
})
</script>
```

તેને `InstanceType` કામ ન કરતું હોવાથી [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) લાઇબ્રેરીમાંથી `ComponentExposed` નો ઉપયોગ કરીને રિફરન્સ કરવાની જરૂર છે.

```vue [App.vue]
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyGenericModal from './MyGenericModal.vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

const modal =
  useTemplateRef<ComponentExposed<typeof MyGenericModal>>('modal')

const openModal = () => {
  modal.value?.open('newValue')
}
</script>
```

નોંધ લો કે `@vue/language-tools` ૨.૧+ સાથે સ્ટેટિક ટેમ્પલેટ રેફ્સના ટાઇપ્સ આપમેળે અનુમાનિત થઈ શકે છે અને ઉપરોક્ત માત્ર એજ કેસોમાં જ જરૂરી છે.

## ગ્લોબલ કસ્ટમ ડાયરેક્ટિવ્સના ટાઇપ્સ (Typing Global Custom Directives) {#typing-global-custom-directives}

`app.directive()` સાથે જાહેર કરાયેલા ગ્લોબલ કસ્ટમ ડાયરેક્ટિવ્સ માટે ટાઇપ હિન્ટ્સ અને ટાઇપ ચેકિંગ મેળવવા માટે, તમે `GlobalDirectives` ને વિસ્તૃત કરી શકો છો.

```ts [src/directives/highlight.ts]
import type { Directive } from 'vue'

export type HighlightDirective = Directive<HTMLElement, string>

declare module 'vue' {
  export interface GlobalDirectives {
    // v થી પ્રીફિક્સ કરો (v-highlight)
    vHighlight: HighlightDirective
  }
}

export default {
  mounted: (el, binding) => {
    el.style.backgroundColor = binding.value
  }
} satisfies HighlightDirective
```

```ts [main.ts]
import highlight from './directives/highlight'
// ...બીજો કોડ
const app = createApp(App)
app.directive('highlight', highlight)
```

ઘટકમાં વપરાશ

```vue [App.vue]
<template>
  <p v-highlight="'blue'">આ વાક્ય મહત્વનું છે!</p>
</template>
```
