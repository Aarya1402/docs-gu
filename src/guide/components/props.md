# પ્રોપ્સ (Props) {#props}

> આ પેજ ધારે છે કે તમે પહેલાથી જ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) વાંચી લીધું છે. જો તમે કમ્પોનન્ટ્સ માટે નવા હોવ તો પહેલા તે વાંચો.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="ફ્રી Vue.js પ્રોપ્સ લેસન"/>
</div>

## પ્રોપ્સ જાહેર કરવા (Props Declaration) {#props-declaration}

Vue કમ્પોનન્ટ્સને સ્પષ્ટ પ્રોપ્સ ડિકલેરેશન (explicit props declaration) ની જરૂર હોય છે જેથી Vue ને ખબર પડે કે કમ્પોનન્ટમાં કયા બાહ્ય પ્રોપ્સ પાસ કરવામાં આવ્યા છે અને તેને ફૉલથ્રુ એટ્રિબ્યુટ્સ (fallthrough attributes) તરીકે ગણવા જોઈએ (જેની ચર્ચા [તેના બનેલા વિભાગ](/guide/components/attrs) માં કરવામાં આવશે).

<div class="composition-api">

`<script setup>` નો ઉપયોગ કરતા SFCs માં, `defineProps()` મેક્રોનો ઉપયોગ કરીને પ્રોપ્સ જાહેર કરી શકાય છે:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

બિન-`<script setup>` કમ્પોનન્ટ્સમાં, પ્રોપ્સને [`props`](/api/options-state#props) ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવામાં આવે છે:

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() પ્રોપ્સને પ્રથમ આર્ગ્યુમેન્ટ તરીકે મેળવે છે.
    console.log(props.foo)
  }
}
```

નોંધ કરો કે `defineProps()` ને પાસ કરવામાં આવેલી આર્ગ્યુમેન્ટ `props` ઓપ્શન્સને આપવામાં આવેલી વેલ્યુ જેવી જ છે: સમાન પ્રોપ્સ ઓપ્શન્સ API બે ડિક્લેરેશન સ્ટાઇલ વચ્ચે શેર કરવામાં આવે છે.

</div>

<div class="options-api">

પ્રોપ્સને [`props`](/api/options-state#props) ઓપ્શનનો ઉપયોગ કરીને જાહેર કરવામાં આવે છે:

```js
export default {
  props: ['foo'],
  created() {
    // પ્રોપ્સ `this` પર એક્સપોઝ થાય છે
    console.log(this.foo)
  }
}
```

</div>

સ્ટ્રિંગ્સના એરેનો ઉપયોગ કરીને પ્રોપ્સ જાહેર કરવા ઉપરાંત, આપણે ઓબ્જેક્ટ સિન્ટેક્સનો પણ ઉપયોગ કરી શકીએ છીએ:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// <script setup> માં
defineProps({
  title: String,
  likes: Number
})
```

```js
// non-<script setup> માં
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

ઓબ્જેક્ટ ડિક્લેરેશન સિન્ટેક્સની દરેક પ્રોપર્ટી માટે, કી પ્રોપનું નામ છે, જ્યારે વેલ્યુ અપેક્ષિત પ્રકારનું કન્સ્ટ્રક્ટર (constructor) ફંક્શન હોવી જોઈએ.

આ માત્ર તમારા કમ્પોનન્ટને ડોક્યુમેન્ટ જ કરતું નથી, પરંતુ જો બ્રાઉઝર કન્સોલમાં તમારું કમ્પોનન્ટ વાપરનારા અન્ય ડેવલપર્સ ખોટો ટાઇપ પાસ કરશે તો તેમને વોર્નિંગ (warn) પણ આપશે. અમે આ પેજ પર આગળ [પ્રોપ વેલિડેશન](#prop-validation) વિશે વધુ વિગતોની ચર્ચા કરીશું.

<div class="options-api">

આ પણ જુઓ: [Typing Component Props](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

જો તમે `<script setup>` સાથે TypeScript નો ઉપયોગ કરી રહ્યાં છો, તો શુદ્ધ પ્રકારનાં એનોટેશન્સ (pure type annotations) નો ઉપયોગ કરીને પ્રોપ્સ જાહેર કરવાનું પણ શક્ય છે:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

વધુ વિગતો: [Typing Component Props](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

## રિએક્ટિવ પ્રોપ્સ ડિસ્ટ્રક્ચર (Reactive Props Destructure) <sup class="vt-badge" data-text="3.5+" /> \*\* {#reactive-props-destructure}

Vue ની રિએક્ટિવિટી સિસ્ટમ પ્રોપર્ટી એક્સેસના આધારે સ્ટેટ વપરાશને ટ્રેક કરે છે. દા.ત. જ્યારે તમે કમ્પ્યુટેડ ગેટર અથવા વોચરમાં `props.foo` ને એક્સેસ કરો છો, ત્યારે `foo` પ્રોપ ડિપેન્ડન્સી તરીકે ટ્રેક કરવામાં આવે છે.

તેથી, નીચેના કોડને ધ્યાનમાં લેતા:

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 3.5 પહેલા માત્ર એક જ વાર ચાલે છે
  // 3.5+ માં જ્યારે "foo" પ્રોપ બદલાય છે ત્યારે ફરીથી ચાલે છે
  console.log(foo)
})
```

સંસ્કરણ 3.4 અને નીચેનામાં, `foo` એક વાસ્તવિક કોન્સ્ટન્ટ (constant) છે અને તે ક્યારેય બદલાશે નહીં. સંસ્કરણ 3.5 અને તેથી ઉપરનામાં, Vue નું કમ્પાઇલર જ્યારે સમાન `<script setup>` બ્લોકમાંનો કોડ `defineProps` માંથી ડિસ્ટ્રક્ચર કરાયેલા વેરિએબલ્સને એક્સેસ કરે છે ત્યારે આપમેળે `props.` પ્રીપેન્ડ કરે છે. તેથી ઉપરોક્ત કોડ નીચે મુજબ સમાન બની જાય છે:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` કમ્પાઇલર દ્વારા `props.foo` માં ટ્રાન્સફોર્મ કરવામાં આવ્યું છે
  console.log(props.foo)
})
```

વધુમાં, તમે પ્રોપ્સ માટે ડિફોલ્ટ વેલ્યુસ જાહેર કરવા માટે JavaScript ના નેટિવ ડિફોલ્ટ વેલ્યુ સિન્ટેક્સનો ઉપયોગ કરી શકો છો. આ ખાસ કરીને ત્યારે ઉપયોગી છે જ્યારે ટાઈપ-આધારિત (type-based) પ્રોપ્સ ડિક્લેરેશનનો ઉપયોગ કરવામાં આવે:

```ts
const { foo = 'હેલો' } = defineProps<{ foo?: string }>()
```

જો તમે તમારા IDE માં ડિસ્ટ્રક્ચર કરેલા પ્રોપ્સ અને સામાન્ય વેરિએબલ્સ વચ્ચે વધુ વિઝ્યુઅલ તફાવત રાખવાનું પસંદ કરો છો, તો Vue નું VSCode એક્સટેન્શન ડિસ્ટ્રક્ચર કરેલા પ્રોપ્સ માટે ઇનલે-હિન્ટ્સ (inlay-hints) સક્ષમ કરવા માટે સેટિંગ પૂરું પાડે છે.

### ફંક્શન્સમાં ડિસ્ટ્રક્ચર કરેલા પ્રોપ્સ પાસ કરવા {#passing-destructured-props-into-functions}

જ્યારે આપણે ફંક્શનમાં ડિસ્ટ્રક્ચર કરેલા પ્રોપ ને પાસ કરીએ છીએ, દા.ત.:

```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```

આ અપેક્ષા મુજબ કામ કરશે નહીં કારણ કે તે `watch(props.foo, ...)` ની બરાબર છે - અમે `watch` માં રિએક્ટિવ ડેટા સોર્સને બદલે વેલ્યુ પાસ કરી રહ્યા છીએ. હકીકતમાં, Vue નું કમ્પાઇલર આવા કેસોને પકડશે અને વોર્નિંગ આપશે.

જેમ આપણે `watch(() => props.foo, ...)` સાથે સામાન્ય પ્રોપને વોચ કરી શકીએ છીએ, તેમ આપણે તેને ગેટરમાં લપેટીને ડિસ્ટ્રક્ચર કરેલા પ્રોપ ને પણ જોઈ શકીએ છીએ:

```js
watch(() => foo, /* ... */)
```

વધુમાં, જ્યારે આપણે રિએક્ટિવિટી જાળવી રાખીને કોઈ બાહ્ય ફંક્શનમાં ડિસ્ટ્રક્ચર કરેલા પ્રોપ ને પાસ કરવાની જરૂર હોય ત્યારે આ ભલામણ કરેલ અભિગમ છે:

```js
useComposable(() => foo)
```

જ્યારે પ્રદાન કરેલ પ્રોપના ફેરફારોને ટ્રૅક કરવાની જરૂર હોય ત્યારે બાહ્ય ફંક્શન ગેટરને કોલ કરી શકે છે (અથવા તેને [toValue](/api/reactivity-utilities.html#tovalue) સાથે નોર્મલાઈઝ કરી શકે છે), દા.ત. કમ્પ્યુટેડ અથવા વોચર ગેટરમાં.

</div>

## પ્રોપ પાસ કરવાની વિગતો {#prop-passing-details}

### પ્રોપ નામ કેસિંગ (Prop Name Casing) {#prop-name-casing}

અમે ઊંટ શૈલી (camelCase) નો ઉપયોગ કરીને લાંબા પ્રોપ નામો જાહેર કરીએ છીએ કારણ કે આ પ્રોપર્ટી કી તરીકે ઉપયોગ કરતી વખતે અવતરણ ચિહ્નો (quotes) નો ઉપયોગ કરવાનું ટાળે છે, અને અમને ટેમ્પલેટ એક્સપ્રેશન્સમાં સીધો સંદર્ભ આપવા દે છે કારણ કે તે માન્ય JavaScript આઇડેન્ટિફાયર છે:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

તકનીકી રીતે, તમે ચાઇલ્ડ કમ્પોનન્ટમાં પ્રોપ્સ પાસ કરતી વખતે camelCase નો ઉપયોગ પણ કરી શકો છો ([in-DOM templates](/guide/essentials/component-basics#in-dom-template-parsing-caveats) સિવાય). જો કે, સંમેલન (convention) એ HTML એટ્રિબ્યુટ્સ સાથે સંરેખિત થવા માટે તમામ કેસોમાં kebab-case નો ઉપયોગ કરવાનું છે:

```vue-html
<MyComponent greeting-message="હેલો" />
```

જ્યારે શક્ય હોય ત્યારે અમે [કમ્પોનન્ટ ટેગ્સ માટે PascalCase](/guide/components/registration#component-name-casing) નો ઉપયોગ કરીએ છીએ કારણ કે તે નેટિવ એલિમેન્ટ્સ થી Vue કમ્પોનન્ટ્સને પ્રભેદિત (differentiating) કરીને ટેમ્પલેટની વાંચનક્ષમતા વધારે છે. જો કે, પ્રોપ્સ પસાર કરતી વખતે camelCase નો ઉપયોગ કરવાનો એટલો વ્યવહારુ ફાયદો નથી, તેથી અમે દરેક ભાષાના સંમેલનોને અનુસરવાનું પસંદ કરીએ છીએ.

### સ્ટેટિક વિરુદ્ધ ડાયનેમિક પ્રોપ્સ {#static-vs-dynamic-props}

અત્યાર સુધી, તમે પ્રોપ્સને સ્ટેટિક વેલ્યુસ તરીકે પસાર થતા જોયા હશે, જેમ કે:

```vue-html
<BlogPost title="Vue સાથેની મારી સફર" />
```

તમે `v-bind` અથવા તેના ટૂંકાક્ષર `:` સાથે ગતિશીલ રીતે અસાઇન કરાયેલા પ્રોપ્સ પણ જોયા છે, જેમ કે:

```vue-html
<!-- વેરિએબલની વેલ્યુ ડાયનેમિકલી અસાઇન કરો -->
<BlogPost :title="post.title" />

<!-- જટિલ એક્સપ્રેશનની વેલ્યુ ડાયનેમિકલી અસાઇન કરો -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### વિવિધ પ્રકારના મૂલ્યો પાસ કરવા {#passing-different-value-types}

ઉપરના બે ઉદાહરણોમાં, અમે સ્ટ્રિંગ વેલ્યુ પાસ કરીએ છીએ, પરંતુ પ્રોપમાં _કોઈપણ_ પ્રકારની વેલ્યુ પાસ કરી શકાય છે.

#### નંબર (Number) {#number}

```vue-html
<!-- ભલે `42` સ્ટેટિક છે, તો પણ આપણને Vue ને જણાવવા માટે v-bind ની જરૂર છે કે -->
<!-- આ સ્ટ્રિંગને બદલે JavaScript એક્સપ્રેશન છે. -->
<BlogPost :likes="42" />

<!-- વેરિએબલની વેલ્યુ ડાયનેમિકલી અસાઇન કરો. -->
<BlogPost :likes="post.likes" />
```

#### બુલિયન (Boolean) {#boolean}

```vue-html
<!-- કોઈ વેલ્યુ વગર પ્રોપનો સમાવેશ કરવાથી `true` સૂચિત થશે. -->
<BlogPost is-published />

<!-- ભલે `false` સ્ટેટિક છે, તો પણ આપણને Vue ને જણાવવા માટે v-bind ની જરૂર છે કે -->
<!-- આ સ્ટ્રિંગને બદલે JavaScript એક્સપ્રેશન છે. -->
<BlogPost :is-published="false" />

<!-- વેરિએબલની વેલ્યુ ડાયનેમિકલી અસાઇન કરો. -->
<BlogPost :is-published="post.isPublished" />
```

#### એરે (Array) {#array}

```vue-html
<!-- ભલે એરે સ્ટેટિક છે, તો પણ આપણને Vue ને જણાવવા માટે v-bind ની જરૂર છે કે -->
<!-- આ સ્ટ્રિંગને બદલે JavaScript એક્સપ્રેશન છે. -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- વેરિએબલની વેલ્યુ ડાયનેમિકલી અસાઇન કરો. -->
<BlogPost :comment-ids="post.commentIds" />
```

#### ઓબ્જેક્ટ (Object) {#object}

```vue-html
<!-- ભલે ઓબ્જેક્ટ સ્ટેટિક છે, તો પણ આપણને Vue ને જણાવવા માટે v-bind ની જરૂર છે કે -->
<!-- આ સ્ટ્રિંગને બદલે JavaScript એક્સપ્રેશન છે. -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- વેરિએબલની વેલ્યુ ડાયનેમિકલી અસાઇન કરો. -->
<BlogPost :author="post.author" />
```

### ઓબ્જેક્ટનો ઉપયોગ કરીને બહુવિધ પ્રોપર્ટીઝ બાંધવી {#binding-multiple-properties-using-an-object}

જો તમે ઓબ્જેક્ટની તમામ પ્રોપર્ટીઝને પ્રોપ્સ તરીકે પાસ કરવા માંગો છો, તો તમે [આર્ગ્યુમેન્ટ વગર `v-bind`](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) નો ઉપયોગ કરી શકો છો (`:prop-name` ને બદલે `v-bind`). ઉદાહરણ તરીકે, આપેલ `post` ઓબ્જેક્ટ:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'Vue સાથેની મારી સફર'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'Vue સાથેની મારી સફર'
}
```

</div>

નીચેનું ટેમ્પલેટ:

```vue-html
<BlogPost v-bind="post" />
```

આની સમકક્ષ હશે:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## વન-વે ડેટા ફ્લો (One-Way Data Flow) {#one-way-data-flow}

બધા પ્રોપ્સ ચાઇલ્ડ પ્રોપર્ટી અને પેરેન્ટ પ્રોપર્ટી વચ્ચે **એક-માર્ગી-ડાઉન બાઇન્ડિંગ (one-way-down binding)** બનાવે છે: જ્યારે પેરેન્ટ પ્રોપર્ટી અપડેટ થાય છે, ત્યારે તે ચાઇલ્ડ પાસે નીચે વહેશે, પરંતુ બીજી રીતે નહીં. આ ચાઇલ્ડ કમ્પોનન્ટ્સને અકસ્માતે પેરેન્ટના સ્ટેટને મ્યુટેટ કરવાથી અટકાવે છે, જે તમારી એપ્લિકેશનના ડેટા ફ્લોને સમજવામાં મુશ્કેલ બનાવી શકે છે.

વધુમાં, જ્યારે પણ પેરેન્ટ કમ્પોનન્ટ અપડેટ થાય છે, ત્યારે ચાઇલ્ડ કમ્પોનન્ટના તમામ પ્રોપ્સ નવીનતમ વેલ્યુ સાથે રિફ્રેશ થશે. આનો અર્થ એ છે કે તમારે ચાઇલ્ડ કમ્પોનન્ટની અંદર પ્રોપને મ્યુટેટ કરવાનો પ્રયાસ કરવો જોઈએ **નહીં**. જો તમે કરો છો, તો Vue તમને કન્સોલમાં વોર્નિંગ આપશે:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ ચેતવણી, પ્રોપ્સ ફક્ત વાંચવા માટે છે!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ ચેતવણી, પ્રોપ્સ ફક્ત વાંચવા માટે છે!
    this.foo = 'bar'
  }
}
```

</div>

સામાન્ય રીતે એવા બે કિસ્સાઓ હોય છે જ્યાં પ્રોપ ને મ્યુટેટ કરવાની લાલચ હોય છે:

1. **પ્રોપનો ઉપયોગ પ્રારંભિક વેલ્યુ પાસ કરવા માટે થાય છે; ચાઇલ્ડ કમ્પોનન્ટ પછીથી તેને લોકલ ડેટા પ્રોપર્ટી તરીકે વાપરવા માંગે છે.** આ કિસ્સામાં, લોકલ ડેટા પ્રોપર્ટીને વ્યાખ્યાયિત કરવી શ્રેષ્ઠ છે જે પ્રોપનો ઉપયોગ તેની પ્રારંભિક વેલ્યુ તરીકે કરે છે:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // કાઉન્ટર ફક્ત પ્રારંભિક વેલ્યુ તરીકે props.initialCounter નો ઉપયોગ કરે છે;
   // તે ભાવિ પ્રોપ અપડેટ્સથી ડિસ્કનેક્ટ (disconnected) છે.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // કાઉન્ટર ફક્ત પ્રારંભિક વેલ્યુ તરીકે props.initialCounter નો ઉપયોગ કરે છે;
         // તે ભાવિ પ્રોપ અપડેટ્સથી ડિસ્કનેક્ટ (disconnected) છે.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **પ્રોપને કાચા (raw) વેલ્યુ તરીકે પાસ કરવામાં આવે છે જેને ટ્રાન્સફોર્મ કરવાની જરૂર છે.** આ કિસ્સામાં, પ્રોપની વેલ્યુનો ઉપયોગ કરીને કમ્પ્યુટેડ પ્રોપર્ટીને વ્યાખ્યાયિત કરવી શ્રેષ્ઠ છે:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // કમ્પ્યુટેડ પ્રોપર્ટી જે પ્રોપ બદલાય ત્યારે ઓટો-અપડેટ થાય છે
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // કમ્પ્યુટેડ પ્રોપર્ટી જે પ્રોપ બદલાય ત્યારે ઓટો-અપડેટ થાય છે
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### ઓબ્જેક્ટ / એરે પ્રોપ્સ ને મ્યુટેટ કરવા {#mutating-object-array-props}

જ્યારે ઓબ્જેક્ટ્સ અને એરેને પ્રોપ્સ તરીકે પાસ કરવામાં આવે છે, ત્યારે ચાઇલ્ડ કમ્પોનન્ટ પ્રોપ બાઇન્ડિંગને મ્યુટેટ કરી શકતું નથી, પરંતુ તે ઓબ્જેક્ટ અથવા એરેની નેસ્ટેડ પ્રોપર્ટીઝને મ્યુટેટ કરવા માટે સક્ષમ **હશે**. આ એટલા માટે છે કારણ કે JavaScript માં ઓબ્જેક્ટ્સ અને એરે સંદર્ભ (reference) દ્વારા પાસ કરવામાં આવે છે, અને Vue માટે આવા મ્યુટેશનને રોકવા અત્યંત મોંઘા છે.

આવા મ્યુટેશનનો મુખ્ય ગેરલાભ એ છે કે તે ચાઇલ્ડ કમ્પોનન્ટને પેરેન્ટ સ્ટેટને એવી રીતે અસર કરવાની મંજૂરી આપે છે જે પેરેન્ટ કમ્પોનન્ટ માટે સ્પષ્ટ હોતું નથી, સંભવિતપણે ભવિષ્યમાં ડેટા ફ્લો વિશે તર્ક કરવાનું વધુ મુશ્કેલ બનાવે છે. શ્રેષ્ઠ પ્રેક્ટિસ તરીકે, તમારે આવા મ્યુટેશન ટાળવા જોઈએ સિવાય કે પેરેન્ટ અને ચાઇલ્ડ ડિઝાઇન દ્વારા ચુસ્તપણે જોડાયેલા (tightly coupled) હોય. મોટાભાગના કિસ્સાઓમાં, ચાઇલ્ડે પેરેન્ટને મ્યુટેશન કરવા દેવા માટે [ઇવેન્ટ મોકલવી (emit)](/guide/components/events) જોઈએ.

## પ્રોપ વેલિડેશન (Prop Validation) {#prop-validation}

કમ્પોનન્ટ્સ તેમના પ્રોપ્સ માટે જરૂરિયાતો સ્પષ્ટ કરી શકે છે, જેમ કે તમે પહેલાથી જોયેલા ટાઇપ્સ. જો કોઈ જરૂરિયાત પૂરી ન થાય, તો Vue તમને બ્રાઉઝરના JavaScript કન્સોલમાં ચેતવણી આપશે. આ ખાસ કરીને ત્યારે ઉપયોગી છે જ્યારે તે ઘટક વિકસાવતી વખતે જે અન્ય લોકો દ્વારા ઉપયોગમાં લેવાનો હેતુ હોય.

પ્રોપ વેલિડેશન સ્પષ્ટ કરવા માટે, તમે સ્ટ્રિંગ્સના એરેને બદલે, <span class="composition-api">`defineProps()` મેક્રો</span><span class="options-api">`props` ઓપ્શન</span> માટે વેલિડેશન જરૂરિયાતો સાથે ઓબ્જેક્ટ પ્રદાન કરી શકો છો. ઉદાહરણ તરીકે:

<div class="composition-api">

```js
defineProps({
  // બેઝિક ટાઇપ ચેક
  // (`null` અને `undefined` વેલ્યુ કોઈપણ ટાઇપ ને સ્વીકારશે)
  propA: Number,
  // બહુવિધ શક્ય ટાઇપ્સ
  propB: [String, Number],
  // જરૂરી સ્ટ્રિંગ
  propC: {
    type: String,
    required: true
  },
  // જરૂરી પરંતુ નલેબલ (nullable) સ્ટ્રિંગ
  propD: {
    type: [String, null],
    required: true
  },
  // ડિફોલ્ટ વેલ્યુ સાથેનો નંબર
  propE: {
    type: Number,
    default: 100
  },
  // ડિફોલ્ટ વેલ્યુ સાથેનો ઓબ્જેક્ટ
  propF: {
    type: Object,
    // ઓબ્જેક્ટ અથવા એરે ડિફોલ્ટ ફેક્ટરી ફંક્શનમાંથી
    // પરત કરવા આવશ્યક છે. ફંક્શન આર્ગ્યુમેન્ટ તરીકે
    // કમ્પોનન્ટ દ્વારા પ્રાપ્ત પાચા પ્રોપ્સ (raw props) મેળવે છે.
    default(rawProps) {
      return { message: 'હેલો' }
    }
  },
  // કસ્ટમ વેલિડેટર ફંક્શન
  // સંપૂર્ણ પ્રોપ્સ 3.4+ માં બીજી આર્ગ્યુમેન્ટ તરીકે પાસ થાય છે
  propG: {
    validator(value, props) {
      // વેલ્યુ આ સ્ટ્રિંગ્સમાંથી એક સાથે મેળ ખાતી હોવી જોઈએ
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // ડિફોલ્ટ વેલ્યુ સાથેનું ફંક્શન
  propH: {
    type: Function,
    // ઓબ્જેક્ટ અથવા એરે ડિફોલ્ટથી વિપરીત, આ ફેક્ટરી ફંક્શન નથી
    // - આ ડિફોલ્ટ વેલ્યુ તરીકે સેવા આપવા માટેનું ફંક્શન છે
    default() {
      return 'ડિફોલ્ટ ફંક્શન'
    }
  }
})
```

:::tip
`defineProps()` આર્ગ્યુમેન્ટની અંદરનો કોડ **`<script setup>` માં જાહેર કરાયેલા અન્ય વેરિએબલ્સને એક્સેસ કરી શકતો નથી**, કારણ કે જ્યારે કમ્પાઇલ કરવામાં આવે ત્યારે આખું એક્સપ્રેશન બહારના ફંક્શન સ્કોપમાં ખસેડવામાં આવે છે.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // બેઝિક ટાઇપ ચેક
    // (`null` અને `undefined` વેલ્યુ કોઈપણ ટાઇપ ને સ્વીકારશે)
    propA: Number,
    // બહુવિધ શક્ય ટાઇપ્સ
    propB: [String, Number],
    // જરૂરી સ્ટ્રિંગ
    propC: {
      type: String,
      required: true
    },
    // જરૂરી પરંતુ નલેબલ (nullable) સ્ટ્રિંગ
    propD: {
      type: [String, null],
      required: true
    },
    // ડિફોલ્ટ વેલ્યુ સાથેનો નંબર
    propE: {
      type: Number,
      default: 100
    },
    // ડિફોલ્ટ વેલ્યુ સાથેનો ઓબ્જેક્ટ
    propF: {
      type: Object,
      // ઓબ્જેક્ટ અથવા એરે ડિફોલ્ટ ફેક્ટરી ફંક્શનમાંથી
      // પરત કરવા આવશ્યક છે. ફંક્શન આર્ગ્યુમેન્ટ તરીકે
      // કમ્પોનન્ટ દ્વારા પ્રાપ્ત પાચા પ્રોપ્સ (raw props) મેળવે છે.
      default(rawProps) {
        return { message: 'હેલો' }
      }
    },
    // કસ્ટમ વેલિડેટર ફંક્શન
    // સંપૂર્ણ પ્રોપ્સ 3.4+ માં બીજી આર્ગ્યુમેન્ટ તરીકે પાસ થાય છે
    propG: {
      validator(value, props) {
        // વેલ્યુ આ સ્ટ્રિંગ્સમાંથી એક સાથે મેળ ખાતી હોવી જોઈએ
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // ડિફોલ્ટ વેલ્યુ સાથેનું ફંક્શન
    propH: {
      type: Function,
      // ઓબ્જેક્ટ અથવા એરે ડિફોલ્ટથી વિપરીત, આ ફેક્ટરી ફંક્શન નથી
      // - આ ડિફોલ્ટ વેલ્યુ તરીકે સેવા આપવા માટેનું ફંક્શન છે
      default() {
        return 'ડિફોલ્ટ ફંક્શન'
      }
    }
  }
}
```

</div>

વધારાની વિગતો:

- જ્યાં સુધી `required: true` સ્પષ્ટ કરવામાં ન આવે ત્યાં સુધી બધા પ્રોપ્સ મૂળભૂત રીતે વૈકલ્પિક (optional) છે.

- `Boolean` સિવાયના ગેરહાજર વૈકલ્પિક પ્રોપમાં `undefined` વેલ્યુ હશે.

- `Boolean` ગેરહાજર પ્રોપ્સ `false` માં કાસ્ટ કરવામાં આવશે. તમે તેના માટે `default` સેટ કરીને આ બદલી શકો છો — એટલે કે: બિન-બુલિયન પ્રોપ તરીકે વર્તવા માટે `default: undefined`.

- જો `default` વેલ્યુ સ્પષ્ટ કરવામાં આવે છે, તો જો રિઝોલ્વ થયેલ પ્રોપ વેલ્યુ `undefined` હોય તો તેનો ઉપયોગ કરવામાં આવશે - આમાં પ્રોપ ગેરહાજર હોય અથવા સ્પષ્ટ `undefined` વેલ્યુ પાસ કરવામાં આવે તે બંને કિસ્સાઓનો સમાવેશ થાય છે.

જ્યારે પ્રોપ વેલિડેશન નિષ્ફળ જાય છે, ત્યારે Vue કન્સોલ વોર્નિંગ આપશે (જો ડેવલપમેન્ટ બિલ્ડનો ઉપયોગ કરી રહ્યા હોય).

<div class="composition-api">

જો [Type-based props declarations](/api/sfc-script-setup#type-only-props-emit-declarations) <sup class="vt-badge ts" /> નો ઉપયોગ કરવામાં આવે તો, Vue ટાઈપ એનોટેશન્સ ને સમકક્ષ રનટાઇમ પ્રોપ ડિક્લેરેશન માં કમ્પાઇલ કરવાનો શ્રેષ્ઠ પ્રયાસ કરશે. ઉદાહરણ તરીકે, `defineProps<{ msg: string }>` ને `{ msg: { type: String, required: true }}` માં કમ્પાઇલ કરવામાં આવશે.

</div>
<div class="options-api">

::: tip નોંધ
નોંધ કરો કે પ્રોપ્સ કમ્પોનન્ટ ઇન્સ્ટન્સ બનાવવામાં આવે તે **પહેલાં** વેલિડેટ કરવામાં આવે છે, તેથી ઇન્સ્ટન્સ પ્રોપર્ટીઝ (દા.ત. `data`, `computed`, વગેરે) `default` અથવા `validator` ફંક્શનની અંદર ઉપલબ્ધ રહેશે નહીં.
:::

</div>

### રનટાઈમ ટાઈપ ચેક (Runtime Type Checks) {#runtime-type-checks}

`type` નીચેના નેટિવ કન્સ્ટ્રક્ટરોમાંથી એક હોઈ શકે છે:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- `Error`

વધુમાં, `type` કસ્ટમ ક્લાસ અથવા કન્સ્ટ્રક્ટર ફંક્શન પણ હોઈ શકે છે અને એસર્શન (assertion) `instanceof` ચેક સાથે કરવામાં આવશે. ઉદાહરણ તરીકે, આપેલ ક્લાસ:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

તમે તેને પ્રોપના ટાઇપ તરીકે ઉપયોગ કરી શકો છો:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

Vue `author` પ્રોપની વેલ્યુ ખરેખર `Person` ક્લાસનો ઇન્સ્ટન્સ છે કે કેમ તે ચકાસવા માટે `instanceof Person` નો ઉપયોગ કરશે.

### નલેબલ ટાઈપ (Nullable Type) {#nullable-type}

જો ટાઇપ જરૂરી છે પણ નલેબલ છે, તો તમે એરે સિન્ટેક્સનો ઉપયોગ કરી શકો છો જેમાં `null` શામેલ છે:

<div class="composition-api">

```js
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    id: {
      type: [String, null],
      required: true
    }
  }
}
```

</div>

નોંધ કરો કે જો એરે સિન્ટેક્સનો ઉપયોગ કર્યા વગર `type` માત્ર `null` હોય, તો તે કોઈપણ પ્રકારને મંજૂરી આપશે.

## બુલિયન કાસ્ટિંગ (Boolean Casting) {#boolean-casting}

`Boolean` ટાઇપ ધરાવતા પ્રોપ્સ પાસે નેટિવ બુલિયન એટ્રિબ્યુટ્સના વર્તનને મીમિક (mimic) કરવા માટે ખાસ કાસ્ટિંગ નિયમો છે. નીચેની ડિક્લેરેશન સાથે `<MyComponent>` આપેલ છે:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

કમ્પોનન્ટનો આ રીતે ઉપયોગ કરી શકાય છે:

```vue-html
<!-- :disabled="true" પાસ કરવાને સમકક્ષ -->
<MyComponent disabled />

<!-- :disabled="false" પાસ કરવાને સમકક્ષ -->
<MyComponent />
```

જ્યારે પ્રોપને બહુવિધ ટાઇપ્સને મંજૂરી આપવા માટે જાહેર કરવામાં આવે છે, ત્યારે `Boolean` માટે કાસ્ટિંગ નિયમો પણ લાગુ કરવામાં આવશે. જો કે, જ્યારે `String` અને `Boolean` બંનેને મંજૂરી આપવામાં આવે ત્યારે એક તફાવત (edge) હોય છે - બુલિયન કાસ્ટિંગ નિયમ ત્યારે જ લાગુ પડે છે જો Boolean, String ની પહેલા આવે:

<div class="composition-api">

```js
// disabled ને true માં કાસ્ટ કરવામાં આવશે
defineProps({
  disabled: [Boolean, Number]
})

// disabled ને true માં કાસ્ટ કરવામાં આવશે
defineProps({
  disabled: [Boolean, String]
})

// disabled ને true માં કાસ્ટ કરવામાં આવશે
defineProps({
  disabled: [Number, Boolean]
})

// disabled ને ખાલી સ્ટ્રિંગ તરીકે પાર્સ કરવામાં આવશે (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```

</div>
<div class="options-api">

```js
// disabled ને true માં કાસ્ટ કરવામાં આવશે
export default {
  props: {
    disabled: [Boolean, Number]
  }
}

// disabled ને true માં કાસ્ટ કરવામાં આવશે
export default {
  props: {
    disabled: [Boolean, String]
  }
}

// disabled ને true માં કાસ્ટ કરવામાં આવશે
export default {
  props: {
    disabled: [Number, Boolean]
  }
}

// disabled ને ખાલી સ્ટ્રિંગ તરીકે પાર્સ કરવામાં આવશે (disabled="")
export default {
  props: {
    disabled: [String, Boolean]
  }
}
```

</div>
