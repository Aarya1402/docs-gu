# ક્લાસ અને સ્ટાઇલ બાઈન્ડિંગ્સ {#class-and-style-bindings}

ડેટા બાઈન્ડિંગ માટેની સામાન્ય જરૂરિયાત એ એલિમેન્ટની ક્લાસ લિસ્ટ અને ઇનલાઇન સ્ટાઇલમાં ફેરફાર કરવાની છે. કારણ કે `class` અને `style` બંને એટ્રિબ્યુટ્સ છે, અમે અન્ય એટ્રિબ્યુટ્સની જેમ જ તેમને ગતિશીલ રીતે સ્ટ્રિંગ વેલ્યુ અસાઇન કરવા માટે `v-bind` નો ઉપયોગ કરી શકીએ છીએ. જો કે, સ્ટ્રિંગ કોન્કેટિનેશન (concatenation) નો ઉપયોગ કરીને તે મૂલ્યો જનરેટ કરવાનો પ્રયાસ કરવો કંટાળાજનક અને ભૂલ-ભરેલું હોઈ શકે છે. આ કારણોસર, જ્યારે `v-bind`નો `class` અને `style` સાથે ઉપયોગ કરવામાં આવે છે ત્યારે Vue વિશેષ સુધારાઓ પ્રદાન કરે છે. સ્ટ્રિંગ્સ ઉપરાંત, એક્સપ્રેશન્સનું મૂલ્યાંકન ઓબ્જેક્ટ્સ અથવા એરે તરીકે પણ થઈ શકે છે.

## HTML ક્લાસ બાઈન્ડ કરવા {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="ફ્રી Vue.js ડાયનેમિક CSS ક્લાસીસ લેસન"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="ફ્રી Vue.js ડાયનેમિક CSS ક્લાસીસ લેસન"/>
</div>

### ઓબ્જેક્ટ્સ સાથે બાઈન્ડિંગ {#binding-to-objects}

ક્લાસીસને ડાયનેમિકલી ટોગલ (toggle) કરવા માટે આપણે `:class` (`v-bind:class`નું ટૂંકું નામ) માં ઓબ્જેક્ટ પાસ કરી શકીએ છીએ:

```vue-html
<div :class="{ active: isActive }"></div>
```

ઉપરના સિન્ટેક્સનો અર્થ એ છે કે `active` ક્લાસની હાજરી ડેટા પ્રોપર્ટી `isActive` ની [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) દ્વારા નક્કી કરવામાં આવશે.

તમે ઓબ્જેક્ટમાં વધુ ફિલ્ડ્સ રાખીને બહુવિધ ક્લાસીસને ટોગલ કરી શકો છો. વધુમાં, `:class` ડિરેક્ટિવ સાદા `class` એટ્રિબ્યુટ સાથે પણ સહ-અસ્તિત્વમાં હોઈ શકે છે. તેથી નીચેની સ્થિતિ જોતાં:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

અને નીચેનું ટેમ્પલેટ:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

તે રેન્ડર થશે:

```vue-html
<div class="static active"></div>
```

જ્યારે `isActive` અથવા `hasError` બદલાય છે, ત્યારે ક્લાસ લિસ્ટ તે મુજબ અપડેટ કરવામાં આવશે. ઉદાહરણ તરીકે, જો `hasError` એ `true` બને, તો ક્લાસ લિસ્ટ `"static active text-danger"` બની જશે.

બાઉન્ડ ઓબ્જેક્ટ (bound object) ઇનલાઇન હોવું જરૂરી નથી:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

આ રેન્ડર થશે:

```vue-html
<div class="active"></div>
```

આપણે [કમ્પ્યુટેડ પ્રોપર્ટી (computed property)](./computed) સાથે પણ બાંધી શકીએ છીએ જે ઓબ્જેક્ટ પરત કરે છે. આ એક સામાન્ય અને શક્તિશાળી પેટર્ન છે:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### એરે (Arrays) સાથે બાઈન્ડિંગ {#binding-to-arrays}

ક્લાસની સૂચિ લાગુ કરવા માટે આપણે `:class` ને એરે (array) સાથે બાંધી શકીએ છીએ:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

જે રેન્ડર થશે:

```vue-html
<div class="active text-danger"></div>
```

જો તમે લિસ્ટમાં શરતી રીતે (conditionally) ક્લાસ ટોગલ કરવા માંગતા હોવ, તો તમે તેને ટર્નરી (ternary) એક્સપ્રેશન સાથે કરી શકો છો:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

આ હંમેશા `errorClass` લાગુ કરશે, પરંતુ `activeClass` ત્યારે જ લાગુ થશે જ્યારે `isActive` સત્ય (truthy) હશે.

જો કે, જો તમારી પાસે બહુવિધ શરતી ક્લાસ હોય તો આ થોડું જટિલ (verbose) હોઈ શકે છે. તેથી જ એરે સિન્ટેક્સની અંદર ઓબ્જેક્ટ સિન્ટેક્સનો ઉપયોગ કરવો પણ શક્ય છે:

```vue-html
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

### કમ્પોનન્ટ્સ સાથે {#with-components}

> આ વિભાગ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) ના જ્ઞાનને ધારે છે. તેને છોડી દેવા અને પછીથી પાછા આવવા માટે નિઃસંકોચ રહો.

જ્યારે તમે સિંગલ રૂટ એલિમેન્ટ (root element) ધરાવતા કમ્પોનન્ટ પર `class` એટ્રિબ્યુટનો ઉપયોગ કરો છો, ત્યારે તે ક્લાસ કમ્પોનન્ટના રૂટ એલિમેન્ટમાં ઉમેરવામાં આવશે અને તેના પર પહેલેથી અસ્તિત્વમાં હોય તેવા કોઈપણ ક્લાસ સાથે મર્જ કરવામાં આવશે.

ઉદાહરણ તરીકે, જો આપણી પાસે `MyComponent` નામનો કમ્પોનન્ટ નીચેના ટેમ્પલેટ સાથે હોય:

```vue-html
<!-- ચાઈલ્ડ (child) કમ્પોનન્ટ ટેમ્પલેટ -->
<p class="foo bar">નમસ્તે!</p>
```

પછી તેનો ઉપયોગ કરતી વખતે કેટલાક ક્લાસ ઉમેરો:

```vue-html
<!-- જ્યારે કમ્પોનન્ટનો ઉપયોગ કરી રહ્યા હોઈએ હોઈએ -->
<MyComponent class="baz boo" />
```

રેન્ડર કરેલ HTML હશે:

```vue-html
<p class="foo bar baz boo">નમસ્તે!</p>
```

કલાસ બાઈન્ડિંગ્સ માટે પણ આ જ સાચું છે:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

જ્યારે `isActive` સત્ય (truthy) હશે, ત્યારે રેન્ડર થયેલ HTML હશે:

```vue-html
<p class="foo bar active">નમસ્તે!</p>
```

જો તમારા ઘટકમાં બહુવિધ રૂટ એલિમેન્ટ્સ હોય, તો તમારે તે વ્યાખ્યાયિત કરવાની જરૂર પડશે કે કયા એલિમેન્ટને આ ક્લાસ પ્રાપ્ત થશે. તમે `$attrs` ઘટક પ્રોપર્ટીનો ઉપયોગ કરીને આ કરી શકો છો:

```vue-html
<!-- $attrs નો ઉપયોગ કરીને MyComponent ટેમ્પલેટ -->
<p :class="$attrs.class">નમસ્તે!</p>
<span>આ એક ચાઇલ્ડ કમ્પોનન્ટ છે</span>
```

```vue-html
<MyComponent class="baz" />
```

રેન્ડર થશે:

```html
<p class="baz">નમસ્તે!</p>
<span>આ એક ચાઇલ્ડ કમ્પોનન્ટ છે</span>
```

તમે [Fallthrough Attributes](/guide/components/attrs) વિભાગમાં કમ્પોનન્ટ એટ્રિબ્યુટ ઇનહેરિટન્સ (inheritance) વિશે વધુ જાણી શકો છો.

## ઇનલાઇન સ્ટાઇલ્સ (Inline Styles) બાઈન્ડ કરવા {#binding-inline-styles}

### ઓબ્જેક્ટ્સ સાથે બાઈન્ડિંગ {#binding-to-objects-1}

`:style` જાવાસ્ક્રિપ્ટ ઓબ્જેક્ટ વેલ્યુસ સાથે બાઈન્ડિંગ સપોર્ટ કરે છે - તે [HTML એલિમેન્ટની `style` પ્રોપર્ટી](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) ને અનુરૂપ છે:

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

જોકે ઊંટકેસ (camelCase) કી ભલામણ કરવામાં આવે છે, `:style` પણ કેબાબ-કેસ્ડ (kebab-cased) CSS પ્રોપર્ટી કીને સપોર્ટ કરે છે (જે વાસ્તવિક CSS માં કેવી રીતે ઉપયોગમાં લેવાય છે તેની અનુરૂપ છે) - ઉદાહરણ તરીકે:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

સ્ટાઇલ ઓબ્જેક્ટ સાથે સીધું બાઈન્ડ કરવું એ ઘણીવાર સારો વિચાર છે જેથી ટેમ્પલેટ સ્વચ્છ રહે:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

ફરીથી, ઓબ્જેક્ટ સ્ટાઇલ બાઈન્ડિંગનો ઉપયોગ અવારનવાર કમ્પ્યુટેડ પ્રોપર્ટીઝ સાથે કરવામાં આવે છે જે ઓબ્જેક્ટ પરત કરે છે.

`:style` ડિરેક્ટિવ્સ પણ સાધારણ સ્ટાઇલ એટ્રિબ્યુટ્સ સાથે સહ-અસ્તિત્વમાં હોઈ શકે છે, બરાબર `:class` ની જેમ.

ટેમ્પલેટ:

```vue-html
<h1 style="color: red" :style="'font-size: 1em'">hello</h1>
```

તે રેન્ડર થશે:

```vue-html
<h1 style="color: red; font-size: 1em;">hello</h1>
```

### એરે (Arrays) સાથે બાઈન્ડિંગ {#binding-to-arrays-1}

આપણે બહુવિધ સ્ટાઇલ ઓબ્જેક્ટ્સના એરેમાં `:style` ને બાંધી શકીએ છીએ. આ ઓબ્જેક્ટ્સ મર્જ કરવામાં આવશે અને તે જ એલિમેન્ટ પર લાગુ કરવામાં આવશે:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### ઓટો-પ્રિફિક્સિંગ (Auto-prefixing) {#auto-prefixing}

જ્યારે તમે `:style` માં એવી CSS પ્રોપર્ટીનો ઉપયોગ કરો છો કે જેને [વેન્ડર પ્રિફિક્સ (vendor prefix)](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) ની જરૂર હોય, ત્યારે Vue આપમેળે યોગ્ય પ્રિફિક્સ ઉમેરશે. Vue વર્તમાન બ્રાઉઝરમાં કઈ સ્ટાઇલ પ્રોપર્ટીઝ સપોર્ટેડ છે તે જોવા માટે રનટાઈમ પર ચેક કરીને આ કરે છે. જો બ્રાઉઝર કોઈ ચોક્કસ પ્રોપર્ટીને સપોર્ટ કરતું નથી, તો પછી વિવિધ પ્રિફિક્સ્ડ વેરિઅન્ટ્સનું પરીક્ષણ કરવામાં આવશે જે સપોર્ટેડ છે તેને શોધવા માટે.

### બહુવિધ મૂલ્યો (Multiple Values) {#multiple-values}

તમે સ્ટાઇલ પ્રોપર્ટી માટે બહુવિધ (પ્રિફિક્સ્ડ) મૂલ્યોનો એરે પ્રદાન કરી શકો છો, ઉદાહરણ તરીકે:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

આ ફક્ત એરેની અંતિમ વેલ્યુને રેન્ડર કરશે જે બ્રાઉઝર સપોર્ટ કરે છે. આ ઉદાહરણમાં, તે એવા બ્રાઉઝર્સ માટે `display: flex` રેન્ડર કરશે જે ફ્લેક્સબોક્સના અનપ્રિફિક્સ્ડ (unprefixed) સંસ્કરણને સપોર્ટ કરે છે.
