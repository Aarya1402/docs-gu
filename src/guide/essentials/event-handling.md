# ઇવેન્ટ હેન્ડલિંગ (Event Handling) {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="ફ્રી Vue.js ઇવેન્ટ્સ લેસન"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="ફ્રી Vue.js ઇવેન્ટ્સ લેસન"/>
</div>

## ઇવેન્ટ્સ સાંભળવી (Listening to Events) {#listening-to-events}

આપણે `v-on` ડિરેક્ટિવનો ઉપયોગ કરી શકીએ છીએ, જેને આપણે સામાન્ય રીતે `@` ચિહ્નથી ટૂંકું કરીએ છીએ, DOM ઇવેન્ટ્સ સાંભળવા માટે અને જ્યારે તેઓ ટ્રિગર થાય ત્યારે અમુક જાવાસ્ક્રિપ્ટ ચલાવવા માટે. વપરાશ `v-on:click="handler"` અથવા શોર્ટકટ સાથે, `@click="handler"` હશે.

હેન્ડલર વેલ્યુ (handler value) નીચેનામાંથી એક હોઈ શકે છે:

1. **ઇનલાઇન હેન્ડલર્સ:** ઇવેન્ટ ટ્રિગર થાય ત્યારે એક્ઝિક્યુટ કરવા માટે ઇનલાઇન જાવાસ્ક્રિપ્ટ (નેટિવ `onclick` એટ્રિબ્યુટ જેવું જ).

2. **મેથડ હેન્ડલર્સ:** કમ્પોનન્ટ પર વ્યાખ્યાયિત મેથડ (method) તરફ નિર્દેશ કરતું પ્રોપર્ટીનું નામ અથવા પાથ.

## ઇનલાઇન હેન્ડલર્સ (Inline Handlers) {#inline-handlers}

ઇનલાઇન હેન્ડલર્સનો ઉપયોગ સામાન્ય રીતે સાદા કિસ્સાઓમાં થાય છે, ઉદાહરણ તરીકે:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">૧ ઉમેરો</button>
<p>ગણતરી છે: {{ count }}</p>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jssKgzAURH/lko0tgrbbEqX+Q5fZaLxiqHmQ3LgJ+fdqFZcD58xMYp1z1RqRvRvP0itHEJCia4VR2llPkMDjBBkmbzUUG1oII4y0JhBIGw2hh2Znbo+7MLw+WjZ/C4TaLT3hnogPkcgaeMtFyW8j2GmXpWBtN47w5PWBHLhrPzPCKfWDXRHmPsCAaOBfgSOkdH3IGUhpDBWv9/e8vsZZ/gFFhFJN)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jcEKgzAQRH9lyKlF0PYqqdR/6DGXaLYo1RjiRgrivzepIizLzu7sm1XUzuVLIFEKObe+d1wpS183eYahtw4DY1UWMJr15ZpmxYAnDt7uF0BxOwXL5Evc0kbxlmyxxZLFyY2CaXSDZkqKZROYJ4tnO/Tt56HEgckyJaraGNxlsVt2u6teHeF40s20EDo9oyGy+CPIYF1xULBt4H6kOZeFiwBZnOFi+wH0B1hk)

</div>

## મેથડ હેન્ડલર્સ (Method Handlers) {#method-handlers}

ઘણા ઇવેન્ટ હેન્ડલર્સ માટેનું લોજિક વધુ જટિલ હશે અને ઇનલાઇન હેન્ડલર્સ સાથે શક્ય ન હોઈ શકે. તેથી જ `v-on` કમ્પોનન્ટ મેથડનું નામ અથવા પાથ પણ સ્વીકારી શકે છે જેને તમે કૉલ કરવા માંગો છો.

ઉદાહરણ તરીકે:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`નમસ્તે ${name.value}!`)
  // `event` એ નેટિવ DOM ઇવેન્ટ છે
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // મેથડ્સની અંદર `this` વર્તમાન એક્ટિવ ઇન્સ્ટન્સ તરફ નિર્દેશ કરે છે
    alert(`નમસ્તે ${this.name}!`)
    // `event` એ નેટિવ DOM ઇવેન્ટ છે
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` એ ઉપર વ્યાખ્યાયિત મેથડનું નામ છે -->
<button @click="greet">અભિવાદન (Greet)</button>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVj0FLxDAQhf/KMwjtXtq7dBcFQS/qzVMOrWFao2kSkkkvpf/dJIuCEBgm771vZnbx4H23JRJ3YogqaM+IxMlfpNWrd4GxI9CMA3NwK5psbaSVVjkbGXZaCediaJv3RN1XbE5FnZNVrJ3FEoi4pY0sn7BLC0yGArfjMxnjcLsXQrdNJtFxM+Ys0PcYa2CEjuBPylNYb4THtxdUobj0jH/YX3D963gKC5WyvGZ+xR7S5jf01yPzeblhWr2ZmErHw0dizivfK6PV91mKursUl6dSh/4qZ+vQ/+XE8QODonDi)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNplUE1LxDAQ/StjEbYL0t5LXRQEvag3Tz00prNtNE1CMilC6X83SUkRhJDJfLz3Jm8tHo2pFo9FU7SOW2Ho0in8MdoSDHhlXhKsnQIYGLHyvL8BLJK3KmcAis3YwOnDY/XlTnt1i2G7i/eMNOnBNRkwWkQqcUFFByVAXUNPk3A9COXEgBkGRgtFDkgDTQjcWxuAwDiJBeMsMcUxszCJlsr+BaXUcLtGwiqut930579KST1IBd5Aqlgie3p/hdTIk+IK//bMGqleEbMjxjC+BZVDIv0+m9CpcNr6MDgkhLORjDBm1H56Iq3ggUvBv++7IhnUFZfnGNt6b4fRtj5wxfYL9p+Sjw==)

</div>

મેથડ હેન્ડલરને તે ટ્રિગર કરતી નેટિવ DOM ઇવેન્ટ ઓબ્જેક્ટ આપમેળે પ્રાપ્ત થાય છે - ઉપરના ઉદાહરણમાં, અમે `event.target` દ્વારા ઇવેન્ટ મોકલનાર એલિમેન્ટને એક્સેસ કરવા સક્ષમ છીએ.

<div class="composition-api">

આ પણ જુઓ: [Typing Event Handlers](/guide/typescript/composition-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

આ પણ જુઓ: [Typing Event Handlers](/guide/typescript/options-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### મેથડ વિરુદ્ધ ઇનલાઇન ડિટેક્શન {#method-vs-inline-detection}

ટેમ્પલેટ કમ્પાઇલર શુ `v-on` વેલ્યુ સ્ટ્રિંગ માન્ય જાવાસ્ક્રિપ્ટ આઇડેન્ટિફાયર (identifier) અથવા પ્રોપર્ટી એક્સેસ પાથ છે કે કેમ તે ચકાસીને મેથડ હેન્ડલર્સને ઓળખે છે. ઉદાહરણ તરીકે, `foo`, `foo.bar` અને `foo['bar']` ને મેથડ હેન્ડલર્સ તરીકે ગણવામાં આવે છે, જ્યારે `foo()` અને `count++` ને ઇનલાઇન હેન્ડલર્સ તરીકે ગણવામાં આવે છે.

## ઇનલાઇન હેન્ડલર્સમાં મેથડ્સ કોલ કરવી {#calling-methods-in-inline-handlers}

મેથડના નામ સાથે સીધા બાંધવાને બદલે, આપણે ઇનલાઇન હેન્ડલરમાં મેથડ્સ પણ કોલ કરી શકીએ છીએ. આ આપણને નેટિવ ઇવેન્ટને બદલે મેથડમાં કસ્ટમ આર્ગ્યુમેન્ટ્સ પાસ કરવાની મંજૂરી આપે છે:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('હેલો')">હેલો બોલો</button>
<button @click="say('બાય')">બાય બોલો</button>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9jTEOwjAMRa8SeSld6I5CBWdg9ZJGBiJSN2ocpKjq3UmpFDGx+Vn//b/ANYTjOxGcQEc7uyAqkqTQI98TW3ETq2jyYaQYzYNatSArZTzNUn/IK7Ludr2IBYTG4I3QRqKHJFJ6LtY7+zojbIXNk7yfmhahv5msvqS7PfnHGjJVp9w/hu7qKKwfEd1NSg==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNptjUEKwjAQRa8yZFO7sfsSi57B7WzGdjTBtA3NVC2ldzehEFwIw8D7vM9f1cX742tmVSsd2sl6aXDgjx8ngY7vNDuBFQeAnsWMXagToQAEWg49h0APLncDAIUcT5LzlKJsqRBfPF3ljQjCvXcknEj0bRYZBzi3zrbPE6o0UBhblKiaKy1grK52J/oA//23IcmNBD8dXeVBtX0BF0pXsg==)

</div>

## ઇનલાઇન હેન્ડલર્સમાં ઇવેન્ટ આર્ગ્યુમેન્ટ એક્સેસ કરવી {#accessing-event-argument-in-inline-handlers}

ક્યારેક આપણે ઇનલાઇન હેન્ડલરમાં અસલ DOM ઇવેન્ટને એક્સેસ કરવાની પણ જરૂર પડે છે. તમે તેને વિશિષ્ટ `$event` વેરિએબલનો ઉપયોગ કરીને મેથડમાં પાસ કરી શકો છો અથવા ઇનલાઇન એરો ફંક્શનનો ઉપયોગ કરી શકો છો:

```vue-html
<!-- $event વિશેષ વેરિએબલનો ઉપયોગ કરીને -->
<button @click="warn('ફોર્મ હજુ સબમિટ કરી શકાતું નથી.', $event)">
  સબમિટ
</button>

<!-- ઇનલાઇન એરો ફંક્શનનો ઉપયોગ કરીને -->
<button @click="(event) => warn('ફોર્મ હજુ સબમિટ કરી શકાતું નથી.', event)">
  સબમિટ
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // હવે આપણી પાસે નેટિવ ઇવેન્ટની એક્સેસ છે
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // હવે આપણી પાસે નેટિવ ઇવેન્ટની એક્સેસ છે
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## ઇવેન્ટ મોડિફાયર્સ (Event Modifiers) {#event-modifiers}

ઇવેન્ટ હેન્ડલર્સની અંદર `event.preventDefault()` અથવા `event.stopPropagation()` ને કોલ કરવાની સામાન્ય જરૂરિયાત હોય છે. જોકે આપણે મેથડ્સની અંદર આ સરળતાથી કરી શકીએ છીએ, જો મેથડ્સ DOM ઇવેન્ટની વિગતો સાથે વ્યવહાર કરવાને બદલે સંપૂર્ણ રીતે ડેટા લોજિક વિશે હોઈ શકે તો તે વધુ સારું રહેશે.

આ સમસ્યાને ઉકેલવા માટે, Vue `v-on` માટે **ઇવેન્ટ મોડિફાયર્સ (event modifiers)** પૂરા પાડે છે. યાદ કરો કે મોડિફાયર્સ બિંદુ (dot) દ્વારા સૂચવવામાં આવેલ ડિરેક્ટિવ પોસ્ટફિક્સ છે.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- ક્લિક ઇવેન્ટનું પ્રોપેગેશન (propagation) અટકાવી દેવામાં આવશે -->
<a @click.stop="doThis"></a>

<!-- સબમિટ ઇવેન્ટ હવે પેજ લોડ થશે નહિ -->
<form @submit.prevent="onSubmit"></form>

<!-- મોડિફાયર્સને સાંકળી (chained) શકાય છે -->
<a @click.stop.prevent="doThat"></a>

<!-- માત્ર મોડિફાયર -->
<form @submit.prevent></form>

<!-- જો event.target એલિમેન્ટ પોતે હોય તો જ હેન્ડલર ટ્રિગર કરો -->
<!-- એટલે કે ચાઇલ્ડ એલિમેન્ટમાંથી નહીં -->
<div @click.self="doThat">...</div>
```

::: tip
મોડિફાયરનો ઉપયોગ કરતી વખતે ક્રમ (order) મહત્વનો છે કારણ કે સંબંધિત કોડ સમાન ક્રમમાં જનરેટ થાય છે. તેથી `@click.prevent.self` નો ઉપયોગ કરવાથી **એલિમેન્ટ પોતે અને તેના ચિલ્ડ્રન પર ક્લિકની ડિફોલ્ટ એક્શન અટકશે**, જ્યારે `@click.self.prevent` ફક્ત એલિમેન્ટ પર જ ક્લિકની ડિફોલ્ટ એક્શનને અટકાવશે.
:::

`.capture`, `.once`, અને `.passive` મોડિફાયર્સ નેટિવ `addEventListener` મેથડના [ઓપ્શન્સ](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) ને પ્રતિબિંબિત કરે છે:

```vue-html
<!-- ઇવેન્ટ લિસનર ઉમેરતી વખતે કેપ્ચર મોડ (capture mode) નો ઉપયોગ કરો -->
<!-- એટલે કે આંતરિક એલિમેન્ટને લક્ષ્ય બનાવતી ઇવેન્ટ અહીં હેન્ડલ કરવામાં આવે છે -->
<!-- તે એલિમેન્ટ દ્વારા હેન્ડલ કરવામાં આવે તે પહેલાં -->
<div @click.capture="doThis">...</div>

<!-- ક્લિક ઇવેન્ટ વધુમાં વધુ એકવાર ટ્રિગર થશે -->
<a @click.once="doThis"></a>

<!-- સ્ક્રોલ ઇવેન્ટનું ડિફોલ્ટ વર્તન (સ્ક્રોલિંગ) તરત જ થશે -->
<!-- `onScroll` પૂર્ણ થવાની રાહ જોવાને બદલે -->
<!-- જો તેમાં `event.preventDefault()` હોય તો -->
<div @scroll.passive="onScroll">...</div>
```

`.passive` મોડિફાયરનો ઉપયોગ સામાન્ય રીતે [મોબાઇલ ઉપકરણો પર પર્ફોર્મન્સ સુધારવા માટે](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scroll_performance_using_passive_listeners) ટચ ઇવેન્ટ લિસનર્સ સાથે કરવામાં આવે છે.

::: tip
`.passive` અને `.prevent` નો એકસાથે ઉપયોગ કરશો નહીં, કારણ કે `.passive` પહેલેથી જ બ્રાઉઝરને સૂચવે છે કે તમે ઇવેન્ટની ડિફોલ્ટ વર્તણૂકને અટકાવવા માંગતા _નથી_, અને જો તમે આવું કરશો તો તમને બ્રાઉઝર તરફથી વોર્નિંગ દેખાશે.
:::

## કી મોડિફાયર્સ (Key Modifiers) {#key-modifiers}

કીબોર્ડ ઇવેન્ટ્સ સાંભળતી વખતે, આપણે ઘણીવાર ચોક્કસ કી ચેક કરવાની જરૂર પડે છે. કી ઇવેન્ટ્સ સાંભળતી વખતે Vue `v-on` અથવા `@` માટે કી મોડિફાયર્સ ઉમેરવાની મંજૂરી આપે છે:

```vue-html
<!-- જ્યારે `key` એ `Enter` હોય ત્યારે જ `submit` ને કોલ કરો -->
<input @keyup.enter="submit" />
```

તમે [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) દ્વારા એક્સપોઝ થયેલ કોઈપણ માન્ય કી નામોને કેબાબ-કેસ (kebab-case) માં કન્વર્ટ કરીને સીધા જ મોડિફાયર તરીકે ઉપયોગ કરી શકો છો.

```vue-html
<input @keyup.page-down="onPageDown" />
```

ઉપરના ઉદાહરણમાં, જો `$event.key` એ `'PageDown'` ની સમાન હોય તો જ હેન્ડલર કોલ કરવામાં આવશે.

### કી એલિયાસીસ (Key Aliases) {#key-aliases}

Vue સૌથી સામાન્ય રીતે ઉપયોગમાં લેવાતી કી માટે એલિયાસ (aliases) પ્રદાન કરે છે:

- `.enter`
- `.tab`
- `.delete` ("Delete" અને "Backspace" બંને કી માટે)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### સિસ્ટમ મોડિફાયર કીઝ {#system-modifier-keys}

જ્યારે સંબંધિત મોડિફાયર કી દબાવવામાં આવે ત્યારે જ માઉસ અથવા કીબોર્ડ ઇવેન્ટ લિસનર્સને ટ્રિગર કરવા માટે તમે નીચેના મોડિફાયર્સનો ઉપયોગ કરી શકો છો:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip નોંધ
Macintosh કીબોર્ડ પર, meta એ કમાન્ડ કી (⌘) છે. Windows કીબોર્ડ પર, meta એ Windows કી (⊞) છે. Sun Microsystems કીબોર્ડ પર, meta સોલિડ ડાયમંડ (◆) તરીકે ચિહ્નિત થયેલ છે. અમુક કીબોર્ડ્સ પર, ખાસ કરીને MIT અને Lisp મશીન કીબોર્ડ્સ અને અનુગામીઓ, જેમ કે Knight કીબોર્ડ, meta પર "META" લેબલ હોય છે. Symbolics કીબોર્ડ પર, meta પર "META" અથવા "Meta" લેબલ હોય છે.
:::

ઉદાહરણ તરીકે:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">કંઈક કરો</div>
```

::: tip
નોંધ લો કે મોડિફાયર કી સામાન્ય કીથી અલગ છે અને જ્યારે `keyup` ઇવેન્ટ્સ સાથે ઉપયોગમાં લેવામાં આવે છે, ત્યારે ઇવેન્ટ ઈમીટ (emit) થાય ત્યારે તેને દબાવવી પડે છે. બીજા શબ્દોમાં કહીએ તો, જો તમે `ctrl` દબાવી રાખીને કી છોડો તો જ `keyup.ctrl` ટ્રિગર થશે. જો તમે એકલા `ctrl` કી છોડશો તો તે ટ્રિગર થશે નહીં.
:::

### `.exact` મોડિફાયર {#exact-modifier}

`.exact` મોડિફાયર ઇવેન્ટને ટ્રિગર કરવા માટે જરૂરી સિસ્ટમ મોડિફાયર્સના ચોક્કસ સંયોજન (combination) ને નિયંત્રિત કરવાની મંજૂરી આપે છે.

```vue-html
<!-- જો Alt અથવા Shift પણ દબાવવામાં આવે તો પણ આ ફાયર થશે -->
<button @click.ctrl="onClick">A</button>

<!-- જ્યારે Ctrl દબાવવામાં આવે અને બીજી કોઈ કી દબાવવામાં ન આવે ત્યારે જ આ ફાયર થશે -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- જ્યારે કોઈ સિસ્ટમ મોડિફાયર દબાવવામાં ન આવે ત્યારે જ આ ફાયર થશે -->
<button @click.exact="onClick">A</button>
```

## માઉસ બટન મોડિફાયર્સ {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

આ મોડિફાયર્સ હેન્ડલરને ચોક્કસ માઉસ બટન દ્વારા ટ્રિગર કરાયેલ ઇવેન્ટ્સ સુધી મર્યાદિત કરે છે.

જોકે, નોંધ કરો કે `.left`, `.right`, અને `.middle` મોડિફાયર નામો સામાન્ય જમણા હાથના માઉસ લેઆઉટ પર આધારિત છે, પરંતુ વાસ્તવમાં અનુક્રમે "main", "secondary", અને "auxiliary" પોઇન્ટિંગ ડિવાઇસ ઇવેન્ટ ટ્રિગર્સનું પ્રતિનિધિત્વ કરે છે, અને વાસ્તવિક ફિઝિકલ બટનોનું નહીં. તેથી ડાબા હાથના માઉસ લેઆઉટ માટે "મુખ્ય" બટન જમણું હોઈ શકે છે પરંતુ તે `.left` મોડિફાયર હેન્ડલરને ટ્રિગર કરશે. અથવા ટ્રેકપેડ એક આંગળીના ટેપ સાથે `.left` હેન્ડલર, બે આંગળીના ટેપ સાથે `.right` હેન્ડલર અને ત્રણ આંગળીના ટેપ સાથે `.middle` હેન્ડલર ટ્રિગર કરી શકે છે. તે જ રીતે, "માઉસ" ઇવેન્ટ્સ જનરેટ કરતા અન્ય ઉપકરણો અને ઇવેન્ટ સ્ત્રોતોમાં ટ્રિગર મોડ્સ હોઈ શકે છે જે "ડાબે" અને "જમણે" સાથે બિલકુલ સંબંધિત નથી.
