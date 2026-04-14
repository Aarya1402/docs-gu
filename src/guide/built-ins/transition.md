<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# ટ્રાન્ઝિશન (Transition) {#transition}

Vue પરિસ્થિતિ (state) બદલવાના જવાબમાં ટ્રાન્ઝિશન અને એનિમેશન સાથે કામ કરવામાં મદદ કરી શકે તેવા બે બિલ્ટ-ઇન ઘટકો પ્રદાન કરે છે:

- જ્યારે કોઈ એલિમેન્ટ અથવા કમ્પોનન્ટ DOM માં પ્રવેશી રહ્યું હોય (entering) અને બહાર નીકળી રહ્યું હોય (leaving) ત્યારે એનિમેશન લાગુ કરવા માટે `<Transition>`. જે આ પેજ પર આવરી લેવામાં આવ્યું છે.

- જ્યારે કોઈ એલિમેન્ટ અથવા કમ્પોનન્ટ `v-for` લિસ્ટમાં દાખલ થાય, તેમાંથી દૂર કરવામાં આવે અથવા તેની અંદર ખસેડવામાં આવે ત્યારે એનિમેશન લાગુ કરવા માટે `<TransitionGroup>`. આ [આગામી પ્રકરણમાં](/guide/built-ins/transition-group) આવરી લેવામાં આવ્યું છે.

આ બે ઘટકો સિવાય, આપણે Vue માં અન્ય તકનીકોનો ઉપયોગ કરીને પણ એનિમેશન લાગુ કરી શકીએ છીએ જેમ કે CSS ક્લાસ ટૉગલ કરવા અથવા સ્ટાઇલ બાઈન્ડિંગ્સ દ્વારા સ્ટેટ-ડ્રાઇવન એનિમેશન્સ. આ વધારાની તકનીકો [એનિમેશન તકનીકો (Animation Techniques)](/guide/extras/animation) પ્રકરણમાં આવરી લેવામાં આવી છે.

## `<Transition>` કમ્પોનન્ટ {#the-transition-component}

`<Transition>` એ એક બિલ્ટ-ઇન ઘટક છે: આનો અર્થ એ છે કે તે કોઈપણ ઘટકના ટેમ્પલેટમાં તેને રજીસ્ટર કર્યા વિના ઉપલબ્ધ છે. તેનો ઉપયોગ તેના ડિફોલ્ટ સ્લોટ દ્વારા પસાર કરાયેલા એલિમેન્ટ્સ અથવા કમ્પોનન્ટ્સ પર એન્ટર (enter) અને લીવ (leave) એનિમેશન લાગુ કરવા માટે થઈ શકે છે. પ્રવેશવું અથવા છોડવું નીચેનામાંથી એક દ્વારા ટ્રિગર થઈ શકે છે:

- `v-if` દ્વારા કન્ડિશનલ રેન્ડરિંગ
- `v-show` દ્વારા કન્ડિશનલ ડિસ્પ્લે
- `<component>` સ્પેશિયલ એલિમેન્ટ દ્વારા ડાયનેમિક કમ્પોનન્ટ્સ ટૉગલિંગ
- સ્પેશિયલ `key` એટ્રિબ્યુટ બદલવું

આ સૌથી મૂળભૂત વપરાશનું ઉદાહરણ છે:

```vue-html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">હેલો!</p>
</Transition>
```

```css
/* અમે આગળ સમજાવીશું કે આ ક્લાસ શું કરે છે! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

<Basic />

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVkEFuwyAQRa8yZZNWqu1sunFJ1N4hSzYUjRNUDAjGVJHluxcCipIV/OG/pxEr+/a+TwuykfGogvYEEWnxR2H17F0gWCHgBBtMwc2wy9WdsMIqZ2OuXtwfHErhlcKCb8LyoVoynwPh7I0kzAmA/yxEzsKXMlr9HgRr9Es5BTue3PlskA+1VpFTkDZq0i3niYfU6anRmbqgMY4PZeH8OjwBfHhYIMdIV1OuferQEoZOKtIJ328TgzJhm8BabHR3jeC8VJqusO8/IqCM+CnsVqR3V/mfRxO5amnkCPuK5B+6rcG2fydshks=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVkMFuAiEQhl9lyqlNuouXXrZo2nfwuBeKs0qKQGBAjfHdZZfVrAmB+f/M/2WGK/v1vs0JWcdEVEF72vQWz94Fgh0OMhmCa28BdpLk+0etAQJSCvahAOLBnTqgkLA6t/EpVzmCP7lFEB69kYRFAYi/ROQs/Cij1f+6ZyMG1vA2vj3bbN1+b1Dw2lYj2yBt1KRnXRwPudHDnC6pAxrjBPe1n78EBF8MUGSkixnLNjdoCUMjFemMn5NjUGacnboqPVkdOC+Vpgus2q8IKCN+T+suWENwxyWJXKXMyQ5WNVJ+aBqD3e6VSYoi)

</div>

:::tip
`<Transition>` તેના સ્લોટ કન્ટેન્ટ તરીકે માત્ર સિંગલ એલિમેન્ટ અથવા કમ્પોનન્ટને સપોર્ટ કરે છે. જો કન્ટેન્ટ કમ્પોનન્ટ હોય, તો કમ્પોનન્ટમાં પણ માત્ર એક જ રૂટ એલિમેન્ટ હોવો જોઈએ.
:::

જ્યારે `<Transition>` કમ્પોનન્ટમાં કોઈ એલિમેન્ટ દાખલ કરવામાં આવે અથવા દૂર કરવામાં આવે, ત્યારે આ થાય છે:

૧. Vue આપમેળે તે જોશે કે ટાર્ગેટ એલિમેન્ટમાં CSS ટ્રાન્ઝિશન અથવા એનિમેશન લાગુ કરવામાં આવ્યા છે કે નહીં. જો એમ હોય, તો યોગ્ય સમયે સંખ્યાબંધ [CSS ટ્રાન્ઝિશન ક્લાસીસ](#transition-classes) ઉમેરવામાં / દૂર કરવામાં આવશે.

૨. જો [JavaScript હૂક્સ](#javascript-hooks) માટે લિસનર્સ હોય, તો આ હૂક્સ યોગ્ય સમયે કૉલ કરવામાં આવશે.

૩. જો કોઈ CSS ટ્રાન્ઝિશન / એનિમેશન શોધી શકાતું નથી અને કોઈ JavaScript હૂક્સ આપવામાં આવ્યા નથી, તો ઇન્સર્શન (insertion) અને/અથવા રિમૂવલ (removal) માટેના DOM ઓપરેશન્સ બ્રાઉઝરની આગામી એનિમેશન ફ્રેમ પર અમલમાં આવશે.

## CSS-આધારિત ટ્રાન્ઝિશન {#css-based-transitions}

### ટ્રાન્ઝિશન ક્લાસીસ (Transition Classes) {#transition-classes}

એન્ટર / લીવ ટ્રાન્ઝિશન માટે છ ક્લાસીસ લાગુ કરવામાં આવે છે.

![ટ્રાન્ઝિશન ડાયાગ્રામ](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

૧. `v-enter-from`: એન્ટર માટે પ્રારંભિક અવસ્થા. એલિમેન્ટ દાખલ થાય તે પહેલાં ઉમેરવામાં આવે છે, જે એલિમેન્ટ દાખલ થયાની એક ફ્રેમ પછી દૂર કરવામાં આવે છે.

૨. `v-enter-active`: એન્ટર માટે એક્ટિવ સ્ટેટ. સમગ્ર પ્રવેશના તબક્કા (entering phase) દરમિયાન લાગુ કયારે આવે છે. એલિમેન્ટ દાખલ થાય તે પહેલાં ઉમેરવામાં આવે છે, ટ્રાન્ઝિશન/એનિમેશન સમાપ્ત થાય ત્યારે દૂર કરવામાં આવે છે. આ ક્લાસનો ઉપયોગ પ્રવેશ ટ્રાન્ઝિશન માટે ડ્યુરેશન (duration), વિલંબ (delay) અને ઇઝિંગ કર્વ (easing curve) વ્યાખ્યાયિત કરવા માટે થઈ શકે છે.

૩. `v-enter-to`: એન્ટર માટે અંતિમ સ્થિતિ. એલિમેન્ટ દાખલ થયાની એક ફ્રેમ પછી ઉમેરવામાં આવે છે (જે જ સમયે `v-enter-from` દૂર કરવામાં આવે છે), ટ્રાન્ઝિશન/એનિમેશન સમાપ્ત થાય ત્યારે દૂર કરવામાં આવે છે.

૪. `v-leave-from`: લીવ માટે પ્રારંભિક સ્થિતિ. જ્યારે લીવિંગ ટ્રાન્ઝિશન ટ્રિગર થાય ત્યારે તરત જ ઉમેરવામાં આવે છે, એક ફ્રેમ પછી દૂર કરવામાં આવે છે.

૫. `v-leave-active`: લીવ માટે એક્ટિવ સ્ટેટ. સમગ્ર બહાર નીકળવાના તબક્કા (leaving phase) દરમિયાન લાગુ કરવામાં આવે છે. જ્યારે લીવિંગ ટ્રાન્ઝિશન ટ્રિગર થાય ત્યારે તરત જ ઉમેરવામાં આવે છે, ટ્રાન્ઝિશન/એનિમેશન સમાપ્ત થાય ત્યારે દૂર કરવામાં આવે છે. આ ક્લાસનો ઉપયોગ બહાર નીકળતા ટ્રાન્ઝિશન માટે સમયગાળો, વિલંબ અને ઇઝિંગ કર્વ વ્યાખ્યાયિત કરવા માટે થઈ શકે છે.

૬. `v-leave-to`: લીવ માટે અંતિમ સ્થિતિ. જ્યારે લીવિંગ ટ્રાન્ઝિશન ટ્રિગર થાય તેની એક ફ્રેમ પછી ઉમેરવામાં આવે છે (તે જ સમયે `v-leave-from` દૂર કરવામાં આવે છે), ટ્રાન્ઝિશન/એનિમેશન સમાપ્ત થાય ત્યારે દૂર કરવામાં આવે છે.

`v-enter-active` અને `v-leave-active` અમને એન્ટર / લીવ ટ્રાન્ઝિશન માટે અલગ-અલગ ઇઝિંગ કર્વ્સ સ્પષ્ટ કરવાની ક્ષમતા આપે છે, જેનું ઉદાહરણ આપણે આગામી વિભાગોમાં જોઈશું.

### નામવાળા ટ્રાન્ઝિશન (Named Transitions) {#named-transitions}

`name` પ્રોપ દ્વારા ટ્રાન્ઝિશનને નામ આપી શકાય છે:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

નામવાળા ટ્રાન્ઝિશન માટે, તેના ટ્રાન્ઝિશન ક્લાસીસ `v` ને બદલે તેના નામથી શરૂ થશે. ઉદાહરણ તરીકે, ઉપરોક્ત ટ્રાન્ઝિશન માટે લાગુ શૈલી `v-enter-active` ને બદલે `fade-enter-active` હશે. ફેડ ટ્રાન્ઝિશન માટેનું CSS આના જેવું દેખાવું જોઈએ:

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### CSS ટ્રાન્ઝિશન (CSS Transitions) {#css-transitions}

મૂળભૂત ઉદાહરણમાં જોયું તેમ `<Transition>` નો સૌથી સામાન્ય રીતે [નેટિવ CSS ટ્રાન્ઝિશન](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) ના સંયોજનમાં ઉપયોગ કરવામાં આવે છે. `transition` CSS પ્રોપર્ટી એક શોર્ટહેન્ડ છે જે આપણને એનિમેટેડ પ્રોપર્ટીઝ, ટ્રાન્ઝિશનનો સમયગાળો અને [ઇઝિંગ કર્વ્સ (easing curves)](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) સહિત ટ્રાન્ઝિશનના બહુવિધ પાસાઓને સ્પષ્ટ કરવાની મંજૂરી આપે છે.

અહીં એક વધુ અદ્યતન ઉદાહરણ છે જે બહુવિધ પ્રોપર્ટીઝનું ટ્રાન્ઝિશન કરે છે, જેમાં પ્રવેશવા અને બહાર નીકળવા માટે અલગ-અલગ ડ્યુરેશન અને ઇઝિંગ કર્વ્સ છે:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">હેલો!</p>
</Transition>
```

```css
/*
  એન્ટર અને લીવ એનિમેશન વિવિધ સમયગાળા (durations) 
  અને ટાઇમિંગ ફંક્શન્સનો ઉપયોગ કરી શકે છે.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<SlideFade />

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkc9uwjAMxl/F6wXQKIVNk1AX0HbZC4zDDr2E4EK0NIkStxtDvPviFQ0OSFzyx/m+n+34kL16P+lazMpMRBW0J4hIrV9WVjfeBYIDBKzhCHVwDQySdFDZyipnY5Lu3BcsWDCk0OKosqLoKcmfLoSNN5KQbyTWLZGz8KKMVp+LKju573ivsuXKbbcG4d3oDcI9vMkNiqL3JD+AWAVpoyadGFY2yATW5nVSJj9rkspDl+v6hE/hHRrjRMEdpdfiDEkBUVxWaEWkveHj5AzO0RKGXCrSHcKBIfSPKEEaA9PJYwSUEXPX0nNlj8y6RBiUHd5AzCOodq1VvsYfjWE4G6fgEy/zMcxG17B9ZTyX8bV85C5y1S40ZX/kdj+GD1P/zVQA56XStC9h2idJI/z7huv4CxoVvE4=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkc1uwjAMgF/F6wk0SmHTJNQFtF32AuOwQy+hdSFamkSJ08EQ776EbMAkJKTIf7I/O/Y+ezVm3HvMyoy52gpDi0rh1mhL0GDLvSTYVwqg4cQHw2QDWCRv1Z8H4Db6qwSyHlPkEFUQ4bHixA0OYWckJ4wesZUn0gpeainqz3mVRQzM4S7qKlss9XotEd6laBDu4Y03yIpUE+oB2NJy5QSJwFC8w0iIuXkbMkN9moUZ6HPR/uJDeINSalaYxCjOkBBgxeWEijnayWiOz+AcFaHNeU2ix7QCOiFK4FLCZPzoALnDXHt6Pq7hP0Ii7/EGYuag9itR5yv8FmgH01EIPkUxG8F0eA2bJmut7kbX+pG+6NVq28WTBTN+92PwMDHbSAXQhteCdiVMUpNwwuMassMP8kfAJQ==)

</div>

### CSS એનિમેશન્સ (CSS Animations) {#css-animations}

[નેટિવ CSS એનિમેશન્સ](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) CSS ટ્રાન્ઝિશનની જેમ જ લાગુ કરવામાં આવે છે, તફાવત એ છે કે એલિમેન્ટ દાખલ થયા પછી તરત જ `*-enter-from` દૂર કરવામાં આવતું નથી, પરંતુ `animationend` ઇવેન્ટ પર દૂર કરવામાં આવે છે.

મોટાભાગના CSS એનિમેશન્સ માટે, આપણે તેને ફક્ત `*-enter-active` અને `*-leave-active` ક્લાસ હેઠળ જાહેર કરી શકીએ છીએ. અહીં એક ઉદાહરણ છે:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    હેલો અહીં કેટલીક ઉછળતી ટેક્સ્ટ છે!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<CssAnimation />

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNksGOgjAQhl9lJNmoBwRNvCAa97YP4JFLbQZsLG3TDqzG+O47BaOezCYkpfB9/0wHbsm3c4u+w6RIyiC9cgQBqXO7yqjWWU9wA4813KH2toUpo9PKVEZaExg92V/YRmBGvsN5ZcpsTGGfN4St04Iw7qg8dkTWwF5qJc/bKnnYk7hWye5gm0ZjmY0YKwDlwQsTFCnWjGiRpaPtjETG43smHPSpqh9pVQKBrjpyrfCNMilZV8Aqd5cNEF4oFVo1pgCJhtBvnjEAP6i1hRN6BBUg2BZhKHUdvMmjWhYHE9dXY/ygzN4PasqhB75djM2mQ7FUSFI9wi0GCJ6uiHYxVsFUGcgX67CpzP0lahQ9/k/kj9CjDzgG7M94rT1PLLxhQ0D+Na4AFI9QW98WEKTQOMvnLAOwDrD+wC0Xq/Ubusw/sU+QL/45hskk9z8Bddbn)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNUs2OwiAQfpWxySZ66I8mXioa97YP4LEXrNNKpEBg2tUY330pqOvJmBBgyPczP1yTb2OyocekTJirrTC0qRSejbYEB2x4LwmulQI4cOLTWbwDWKTeqkcE4I76twSyPcaX23j4zS+WP3V9QNgZyQnHiNi+J9IKtrUU9WldJaMMrGEynlWy2em2lcjyCPMUALazXDlBwtMU79CT9rpXNXp4tGYGhlQ0d7UqAUcXOeI6bluhUtKmhEvhzisgPFPKpWhVCTUqQrt6ygD8oJQajmgRhAOnO4RgdQm8yd0tNzGv/D8x/8Dy10IVCzn4axaTTYNZymsSA8YuciU6PrLL6IKpUFBkS7cKXXwQJfIBPyP6IQ1oHUaB7QkvjfUdcy+wIFB8PeZIYwmNtl0JruYSp8XMk+/TXL7BzbPF8gU6L95hn8D4OUJnktsfM1vavg==)

</div>

### કસ્ટમ ટ્રાન્ઝિશન ક્લાસીસ (Custom Transition Classes) {#custom-transition-classes}

તમે `<Transition>` ને નીચેના પ્રોપ્સ પસાર કરીને કસ્ટમ ટ્રાન્ઝિશન ક્લાસીસ પણ સ્પષ્ટ કરી શકો છો:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

આ પરંપરાગત ક્લાસ નામોને ઓવરરાઇડ કરશે. આ ખાસ કરીને ઉપયોગી છે જ્યારે તમે Vue ની ટ્રાન્ઝિશન સિસ્ટમને અસ્તિત્વમાં હોય તેવી CSS એનિમેશન લાઇબ્રેરી સાથે જોડવા માંગતા હો, જેમ કે [Animate.css](https://daneden.github.io/animate.css/):

```vue-html
<!-- ધારો કે Animate.css પેજ પર સમાવિષ્ટ છે -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">હેલો!</p>
</Transition>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNUctuwjAQ/BXXF9oDsZB6ogbRL6hUcbSEjLMhpn7JXtNWiH/vhqS0R3zxPmbWM+szf02pOVXgSy6LyTYhK4A1rVWwPsWM7MwydOzCuhw9mxF0poIKJoZC0D5+stUAeMRc4UkFKcYpxKcEwSenEYYM5b4ixsA2xlnzsVJ8Yj8Mt+LrbTwcHEgxwojCmNxmHYpFG2kaoxO0B2KaWjD6uXG6FCiKj00ICHmuDdoTjD2CavJBCna7KWjZrYK61b9cB5pI93P3sQYDbxXf7aHHccpVMolO7DS33WSQjPXgXJRi2Cl1xZ8nKkjxf0dBFvx2Q7iZtq94j5jKUgjThmNpjIu17ZzO0JjohT7qL+HsvohJWWNKEc/NolncKt6Goar4y/V7rg/wyw9zrLOy)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNUcFuwjAM/RUvp+1Ao0k7sYDYF0yaOFZCJjU0LE2ixGFMiH9f2gDbcVKU2M9+tl98Fm8hNMdMYi5U0tEEXraOTsFHho52mC3DuXUAHTI+PlUbIBLn6G4eQOr91xw4ZqrIZXzKVY6S97rFYRqCRabRY7XNzN7BSlujPxetGMvAAh7GtxXLtd/vLSlZ0woFQK0jumTY+FJt7ORwoMLUObEfZtpiSpRaUYPkmOIMNZsj1VhJRWeGMsFmczU6uCOMHd64lrCQ/s/d+uw0vWf+MPuea5Vp5DJ0gOPM7K4Ci7CerPVKhipJ/moqgJJ//8ipxN92NFdmmLbSip45pLmUunOH1Gjrc7ezGKnRfpB4wJO0ZpvkdbJGpyRfmufm+Y4Mxo1oK16n9UwNxOUHwaK3iQ==)

</div>

### ટ્રાન્ઝિશન અને એનિમેશનનો સાથે ઉપયોગ {#using-transitions-and-animations-together}

ટ્રાન્ઝિશન ક્યારે સમાપ્ત થયું તે જાણવા માટે Vue એ ઇવેન્ટ લિસનર્સ જોડવાની જરૂર છે. તે લાગુ કરેલ CSS નિયમોના પ્રકાર પર આધાર રાખીને `transitionend` અથવા `animationend` હોઈ શકે છે. જો તમે માત્ર એક અથવા બીજાનો ઉપયોગ કરી રહ્યાં છો, તો Vue આપમેળે સાચો પ્રકાર શોધી શકે છે.

જો કે, કેટલાક કિસ્સાઓમાં તમે સમાન ઘટક પર બંને રાખવા ઈચ્છી શકો છો, ઉદાહરણ તરીકે Vue દ્વારા ટ્રિગર કરાયેલ CSS એનિમેશન હોવું, તેની સાથે હોવર (hover) પર CSS ટ્રાન્ઝિશન ઇફેક્ટ હોવી. આ કિસ્સાઓમાં, તમારે `type` પ્રોપ પાસ કરીને Vue જેની કાળજી લેવા માંગતા હોય તે પ્રકાર સ્પષ્ટપણે જાહેર કરવો પડશે, જેમાં `animation` અથવા `transition` ની કિંમત હશે:

```vue-html
<Transition type="animation">...</Transition>
```

### નેસ્ટેડ ટ્રાન્ઝિશન અને સ્પષ્ટ ટ્રાન્ઝિશન ડ્યુરેશન્સ {#nested-transitions-and-explicit-transition-durations}

જોકે ટ્રાન્ઝિશન ક્લાસીસ માત્ર `<Transition>` માં બાળ (child) એલિમેન્ટ પર લાગુ કરવામાં આવે છે, આપણે નેસ્ટેડ CSS સિલેક્ટર્સનો ઉપયોગ કરીને નેસ્ટેડ એલિમેન્ટ્સનું ટ્રાન્ઝિશન કરી શકીએ છીએ:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      હેલો!
    </div>
  </div>
</Transition>
```

```css
/* નેસ્ટેડ એલિમેન્ટ્સને ટાર્ગેટ કરતા નિયમો */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... જરૂર મુજબ અન્ય CSS */
```

અમે પ્રવેશ પર નેસ્ટેડ એલિમેન્ટમાં ટ્રાન્ઝિશન વિલંબ (delay) પણ ઉમેરી શકીએ છીએ, જે સ્ટેગર્ડ (staggered) એન્ટર એનિમેશન સિક્વન્સ બનાવે છે:

```css{3}
/* સ્ટેગર્ડ અસર માટે નેસ્ટેડ એલિમેન્ટના એન્ટરમાં વિલંબ કરો */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

જો કે, આ એક નાની સમસ્યા ઉભી કરે છે. ડિફોલ્ટ રૂપે, `<Transition>` કમ્પોનન્ટ રૂટ ટ્રાન્ઝિશન એલિમેન્ટ પરની **પ્રથમ** `transitionend` અથવા `animationend` ઇવેન્ટને સાંભળીને ટ્રાન્ઝિશન ક્યારે સમાપ્ત થયું છે તે આપમેળે શોધવાનો પ્રયાસ કરે છે. નેસ્ટેડ ટ્રાન્ઝિશન સાથે, ઇચ્છિત વર્તન તમામ આંતરિક તત્વોના ટ્રાન્ઝિશન સમાપ્ત થાય ત્યાં સુધી રાહ જોવાનું હોવું જોઈએ.

આવા કિસ્સાઓમાં તમે `<Transition>` કમ્પોનન્ટ પર `duration` પ્રોપનો ઉપયોગ કરીને સ્પષ્ટ ટ્રાન્ઝિશન ડ્યુરેશન (મિલિસેકન્ડમાં) સ્પષ્ટ કરી શકો છો. કુલ સમયગાળો વિલંબ ઉપરાંત આંતરિક તત્વના ટ્રાન્ઝિશન સમયગાળા સાથે મેળ ખાતો હોવો જોઈએ:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVVd9v0zAQ/leO8LAfrE3HNKSFbgKmSYMHQNAHkPLiOtfEm2NHttN2mvq/c7bTNi1jgFop9t13d9995ziPyfumGc5bTLJkbLkRjQOLrm2uciXqRhsHj2BwBiuYGV3DAUEPcpUrrpUlaKUXcOkBh860eJSrcRqzUDxtHNaNZA5pBzCets5pBe+4FPz+Mk+66Bf+mSdXE12WEsdphMWQiWHKCicoLCtaw/yKIs/PR3kCitVIG4XWYUEJfATFFGIO84GYdRUIyCWzlra6dWg2wA66dgqlts7c+d8tSqk34JTQ6xqb9TjdUiTDOO21TFvrHqRfDkPpExiGKvBITjdl/L40ulVFBi8R8a3P17CiEKrM4GzULIOlFmpQoSgrl8HpKFpX3kFZu2y0BNhJxznvwaJCA1TEYcC4E3MkKp1VIptjZ43E3KajDJiUMBqeWUBmcUBUqJGYOT2GAiV7gJAA9Iy4GyoBKLH2z+N0W3q/CMC2yCCkyajM63Mbc+9z9mfvZD+b071MM23qLC69+j8PvX5HQUDdMC6cL7BOTtQXCJwpas/qHhWIBdYtWGgtDWNttWTmThu701pf1W6+v1Hd8Xbz+k+VQxmv8i7Fv1HZn+g/iv2nRkjzbd6npf/Rkz49DifQ3dLZBBYOJzC4rqgCwsUbmLYlCAUVU4XsCd1NrCeRHcYXb1IJC/RX2hEYCwJTvHYVMZoavbBI09FmU+LiFSzIh0AIXy1mqZiFKaKCmVhiEVJ7GftHZTganUZ56EYLL3FykjhL195MlMM7qxXdmEGDPOG6boRE86UJVPMki+p4H01WLz4Fm78hSdBo5xXy+yfsd3bpbXny1SA1M8c82fgcMyW66L75/hmXtN44a120ktDPOL+h1bL1HCPsA42DaPdwge3HcO/TOCb2ZumQJtA15Yl65Crg84S+BdfPtL6lezY8C3GkZ7L6Bc1zNR0=)

જો જરૂરી હોય તો, તમે ઓબ્જેક્ટનો ઉપયોગ કરીને એન્ટર અને લીવ ડ્યુરેશન માટે અલગ વેલ્યુ પણ સ્પષ્ટ કરી શકો છો:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### પરફોર્મન્સ સંબંધિત બાબતો (Performance Considerations) {#performance-considerations}

તમે નોંધશો કે મહાર બતાવેલા એનિમેશન મોટે ભાગે `transform` અને `opacity` જેવી પ્રોપર્ટીઝનો ઉપયોગ કરે છે. આ પ્રોપર્ટીઝ એનિમેટ કરવા માટે કાર્યક્ષમ છે કારણ કે:

૧. તેઓ એનિમેશન દરમિયાન દસ્તાવેજના લેઆઉટને અસર કરતા નથી, તેથી તેઓ દરેક એનિમેશન ફ્રેમ પર મોંઘા CSS લેઆઉટની ગણતરી (layout calculation) ટ્રિગર કરતા નથી.

૨. મોટાભાગના આધુનિક બ્રાઉઝર્સ `transform` ને એનિમેટ કરતી વખતે GPU હાર્ડવેર એક્સિલરેશનનો લાભ લઈ શકે છે.

તેનાથી વિપરીત, `height` અથવા `margin` જેવી પ્રોપર્ટીઝ CSS લેઆઉટને ટ્રિગર કરશે, તેથી તેને એનિમેટ કરવા માટે ઘણું મોંઘું છે અને સાવચેતી સાથે ઉપયોગ કરવો જોઈએ.

## JavaScript હૂક્સ (Hooks) {#javascript-hooks}

તમે `<Transition>` કમ્પોનન્ટ પરની ઇવેન્ટ્સ સાંભળીને JavaScript સાથે ટ્રાન્ઝિશન પ્રક્રિયામાં હૂક કરી શકો છો:

```vue-html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

<div class="composition-api">

```js
// એલિમેન્ટને DOM માં દાખલ કરવામાં આવે તે પહેલાં કૉલ કરવામાં આવે છે.
// એલિમેન્ટની "enter-from" સ્થિતિ સેટ કરવા માટે આનો ઉપયોગ કરો
function onBeforeEnter(el) {}

// એલિમેન્ટ દાખલ થયાની એક ફ્રેમ પછી કૉલ કરવામાં આવે છે.
// પ્રવેશી રહેલા (entering) એનિમેશનને શરૂ કરવા માટે આનો ઉપયોગ કરો.
function onEnter(el, done) {
  // ટ્રાન્ઝિશનનો અંત સૂચવવા માટે ડન (done) કોલબેકને કૉલ કરો
  // જો CSS સાથે સંયોજનમાં ઉપયોગ કરવામાં આવે તો વૈકલ્પિક
  done()
}

// જ્યારે પ્રવેશ ટ્રાન્ઝિશન પૂર્ણ થાય ત્યારે કૉલ કરવામાં આવે છે.
function onAfterEnter(el) {}

// જ્યારે એન્ટર ટ્રાન્ઝિશન પૂર્ણ થાય તે પહેલાં રદ કરવામાં આવે ત્યારે કૉલ કરવામાં આવે છે.
function onEnterCancelled(el) {}

// લીવ હૂક પહેલાં કૉલ કરવામાં આવે છે.
// મોટાભાગે, તમારે ફક્ત લીવ હૂકનો ઉપયોગ કરવો જોઈએ
function onBeforeLeave(el) {}

// જ્યારે બહાર નીકળવાનું (leave) ટ્રાન્ઝિશન શરૂ થાય ત્યારે કૉલ કરવામાં આવે છે.
// લીવિંગ એનિમેશન શરૂ કરવા માટે આનો ઉપયોગ કરો.
function onLeave(el, done) {
  // ટ્રાન્ઝિશનનો અંત સૂચવવા માટે ડન (done) કોલબેકને કૉલ કરો
  // જો CSS સાથે સંયોજનમાં ઉપયોગ કરવામાં આવે તો વૈકલ્પિક
  done()
}

// જ્યારે લીવ ટ્રાન્ઝિશન સમાપ્ત થાય અને 
// એલિમેન્ટને DOM માંથી દૂર કરવામાં આવે ત્યારે કૉલ કરવામાં આવે છે.
function onAfterLeave(el) {}

// ફક્ત v-show ટ્રાન્ઝિશન સાથે ઉપલબ્ધ છે
function onLeaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // એલિમેન્ટને DOM માં દાખલ કરવામાં આવે તે પહેલાં કૉલ કરવામાં આવે છે.
    // એલિમેન્ટની "enter-from" સ્થિતિ સેટ કરવા માટે આનો ઉપયોગ કરો
    onBeforeEnter(el) {},

    // એલિમેન્ટ દાખલ થયાની એક ફ્રેમ પછી કૉલ કરવામાં આવે છે.
    // એનિમેશન શરૂ કરવા માટે આનો ઉપયોગ કરો.
    onEnter(el, done) {
      // ટ્રાન્ઝિશનનો અંત સૂચવવા માટે ડન (done) કોલબેકને કૉલ કરો
      // જો CSS સાથે સંયોજનમાં ઉપયોગ કરવામાં આવે તો વૈકલ્પિક
      done()
    },

    // જ્યારે પ્રવેશ ટ્રાન્ઝિશન પૂર્ણ થાય ત્યારે કૉલ કરવામાં આવે છે.
    onAfterEnter(el) {},

    // જ્યારે એન્ટર ટ્રાન્ઝિશન પૂર્ણ થાય તે પહેલાં રદ કરવામાં આવે ત્યારે કૉલ કરવામાં આવે છે.
    onEnterCancelled(el) {},

    // લીવ હૂક પહેલાં કૉલ કરવામાં આવે છે.
    // મોટાભાગે, તમારે ફક્ત લીવ હૂકનો ઉપયોગ કરવો જોઈએ.
    onBeforeLeave(el) {},

    // જ્યારે બહાર નીકળવાનું (leave) ટ્રાન્ઝિશન શરૂ થાય ત્યારે કૉલ કરવામાં આવે છે.
    // લીવિંગ એનિમેશન શરૂ કરવા માટે આનો ઉપયોગ કરો.
    onLeave(el, done) {
      // ટ્રાન્ઝિશનનો અંત સૂચવવા માટે ડન (done) કોલબેકને કૉલ કરો
      // જો CSS સાથે સંયોજનમાં ઉપયોગ કરવામાં આવે તો વૈકલ્પિક
      done()
    },

    // જ્યારે લીવ ટ્રાન્ઝિશન સમાપ્ત થાય અને 
    // એલિમેન્ટને DOM માંથી દૂર કરવામાં આવે ત્યારે કૉલ કરવામાં આવે છે.
    onAfterLeave(el) {},

    // ફક્ત v-show ટ્રાન્ઝિશન સાથે ઉપલબ્ધ છે
    onLeaveCancelled(el) {}
  }
}
```

</div>

આ હૂકનો ઉપયોગ CSS ટ્રાન્ઝિશન / એનિમેશન સાથે અથવા તેની જાતે જ કરી શકાય છે.

માત્ર JavaScript-ઓન્લી ટ્રાન્ઝિશનનો ઉપયોગ કરતી વખતે, `:css="false"` પ્રોપ ઉમેરવી સામાન્ય રીતે સારો વિચાર છે. આ સ્પષ્ટપણે Vue ને ઓટો CSS ટ્રાન્ઝિશન ડિટેક્શન છોડવાનું કહે છે. થોડું વધુ પરફોર્મન્ટ હોવા ઉપરાંત, આ CSS નિયમોને આકસ્મિક રીતે ટ્રાન્ઝિશનમાં દખલ કરતા અટકાવે છે:

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

`:css="false"` સાથે, ટ્રાન્ઝિશન ક્યારે સમાપ્ત થાય છે તે નિયંત્રિત કરવા માટે આપણે સંપૂર્ણપણે જવાબદાર છીએ. આ કિસ્સામાં, `@enter` અને `@leave` હૂક્સ માટે `done` કોલબેક્સ જરૂરી છે. અન્યથા, હૂક્સ સિંક્રનસ રીતે કૉલ કરવામાં આવશે અને ટ્રાન્ઝિશન તરત જ સમાપ્ત થઈ જશે.

એનિમેશન કરવા માટે [GSAP લાઇબ્રેરી](https://gsap.com/) નો ઉપયોગ કરીને ડેમો અહીં છે. તમે, અલબત્ત, અન્ય કોઈપણ એનિમેશન લાઇબ્રેરીનો ઉપયોગ કરી શકો છો જે તમે ઇચ્છો છો, ઉદાહરણ તરીકે [Anime.js](https://animejs.com/) અથવા [Motion One](https://motion.dev/):

<JsHooks />

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNVMtu2zAQ/JUti8I2YD3i1GigKmnaorcCveTQArpQFCWzlkiCpBwHhv+9Sz1qKYckJ3FnlzvD2YVO5KvW4aHlJCGpZUZoB5a7Vt9lUjRaGQcnMLyEM5RGNbDA0sX/VGWpHnB/xEQmmZIWe+zUI9z6m0tnWr7ymbKVzAklQclvvFSG/5COmyWvV3DKJHTdQiRHZN0jAJbRmv9OIA432/UE+jODlKZMuKcErnx8RrazP8woR7I1FEryKaVTU8aiNdRfwWZTQtQwi1HAGF/YB4BTyxNY8JpaJ1go5K/WLTfhdg1Xq8V4SX5Xja65w0ovaCJ8Jvsnpwc+l525F2XH4ac3Cj8mcB3HbxE9qnvFMRzJ0K3APuhIjPefmTTyvWBAGvWbiDuIgeNYRh3HCCDNW+fQmHtWC7a/zciwaO/8NyN3D6qqap5GfVnXAC89GCqt8Bp77vu827+A+53AJrOFzMhQdMnO8dqPpMO74Yx4wqxFtKS1HbBOMdIX4gAMffVp71+Qq2NG4BCIcngBKk8jLOvfGF30IpBGEwcwtO6p9sdwbNXPIadsXxnVyiKB9x83+c3N9WePN9RUQgZO6QQ2sT524KMo3M5Pf4h3XFQ7NwFyZQpuAkML0doEtvEHhPvRDPRkTfq/QNDgRvy1SuIvpFOSDQmbkWTckf7hHsjIzjltkyhqpd5XIVNN5HNfGlW09eAcMp3J+R+pEn7L)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNVFFvmzAQ/is3pimNlABNF61iaddt2tukvfRhk/xiwIAXsJF9pKmq/PedDTSwh7ZSFLjvzvd9/nz4KfjatuGhE0ES7GxmZIu3TMmm1QahtLyFwugGFu51wRQAU+Lok7koeFcjPDk058gvlv07gBHYGTVGALbSDwmg6USPnNzjtHL/jcBK5zZxxQwZavVNFNqIHwqF8RUAWs2jn4IffCfqQz+mik5lKLWi3GT1hagHRU58aAUSshpV2YzX4ncCcbjZDp099GcG6ZZnEh8TuPR8S0/oTJhQjmQryLUSU0rUU8a8M9wtoWZTQtIwi0nAGJ/ZB0BwKxJYiJpblFko1a8OLzbhdgWXy8WzP99109YCqdIJmgifyfYuzmUzfFF2HH56o/BjAldx/BbRo7pXHKMjGbrl1IcciWn9fyaNfC8YsIueR5wCFFTGUVAEsEs7pOmDu6yW2f6GBW5o4QbeuScLbu91WdZiF/VlvgEtujdcWek09tx3qZ+/tXAzQU1mA8mCoeicneO1OxKP9yM+4ElmLaEFr+2AecVEn8sDZOSrSzv/1qk+sgAOa1kMOyDlu4jK+j1GZ70E7KKJAxRafKzdazi26s8h5dm+NLpTeQLvP27S6+urz/7T5aaUao26TWATt0cPPsgcK3f6Q1wJWVY4AVJtcmHWhueyo89+G38guD+agT5YBf39s25oIv5arehu8krYkLAs8BeG86DfuANYUCG2NomiTrX7Msx0E7ncl0bnXT04566M4PQPykWaWw==)

</div>

## પુનઃઉપયોગી ટ્રાન્ઝિશન (Reusable Transitions) {#reusable-transitions}

Vue ની કમ્પોનન્ટ સિસ્ટમ દ્વારા ટ્રાન્ઝિશનનો ફરીથી ઉપયોગ કરી શકાય છે. પુનઃઉપયોગી ટ્રાન્ઝિશન બનાવવા માટે, આપણે એક કમ્પોનન્ટ બનાવી શકીએ છીએ જે `<Transition>` કમ્પોનન્ટને લપેટી લે છે અને સ્લોટ કન્ટેન્ટ નીચે પસાર કરે છે:

```vue{6} [MyTransition.vue]
<script>
// JavaScript હૂક્સ લોજિક...
</script>

<template>
  <!-- બિલ્ટ-ઇન ટ્રાન્ઝિશન કમ્પોનન્ટને લપેટી લો -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- સ્લોટ કન્ટેન્ટ દ્વારા નીચે પાસ કરો -->
  </Transition>
</template>

<style>
/*
  જરૂરી CSS...
  નોંધ: અહીં <style scoped> નો ઉપયોગ કરવાનું ટાળો કારણ કે 
  તે સ્લોટ કન્ટેન્ટ પર લાગુ પડતું નથી.
*/
</style>
```

હવે `MyTransition` ને બ્રાઉઝર-લક્ષી વર્ઝનની જેમ જ ઇમ્પોર્ટ અને ઉપયોગ કરી શકાય છે:

```vue-html
<MyTransition>
  <div v-if="show">હેલો!</div>
</MyTransition>
```

## દેખાવ પર ટ્રાન્ઝિશન (Transition on Appear) {#transition-on-appear}

જો તમે નોડના પ્રારંભિક રેન્ડર (initial render) પર ટ્રાન્ઝિશન પણ લાગુ કરવા માંગતા હો, તો તમે `appear` પ્રોપ ઉમેરી શકો છો:

```vue-html
<Transition appear>
  ...
</Transition>
```

## એલિમેન્ટ્સ વચ્ચે ટ્રાન્ઝિશન {#transition-between-elements}

`v-if` / `v-show` સાથે એલિમેન્ટને ટૉગલ કરવા ઉપરાંત, આપણે `v-if` / `v-else` / `v-else-if` નો ઉપયોગ કરીને બે એલિમેન્ટ્સ વચ્ચે ટ્રાન્ઝિશન પણ કરી શકીએ છીએ, જો આપણે ખાતરી કરીએ કે કોઈપણ ક્ષણે માત્ર એક જ એલિમેન્ટ બતાવવામાં આવી રહ્યો છે:

```vue-html
<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

<BetweenElements />

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqdk8tu2zAQRX9loI0SoLLcFN2ostEi6BekmwLa0NTYJkKRBDkSYhj+9wxJO3ZegBGu+Lhz7syQ3Bd/nJtNIxZN0QbplSMISKNbdkYNznqCPXhcwwHW3g5QsrTsTGekNYGgt/KBBCEsouimDGLCvrztTFtnGGN4QTg4zbK4ojY4YSDQTuOiKwbhN8pUXm221MDd3D11xfJeK/kIZEHupEagrbfjZssxzAgNs5nALIC2VxNILUJg1IpMxWmRUAY9U6IZ2/3zwgRFyhowYoieQaseq9ElDaTRrkYiVkyVWrPiXNdiAcequuIkPo3fMub5Sg4l9oqSevmXZ22dwR8YoQ74kdsL4Go7ZTbR74HT/KJfJlxleGrG8l4YifqNYVuf251vqOYr4llbXz4C06b75+ns1a3BPsb0KrBy14Aymnerlbby8Vc8cTajG35uzFITpu0t5ufzHQdeH6LBsezEO0eJVbB6pBiVVLPTU6jQEPpKyMj8dnmgkQs+HmQcvVTIQK1hPrv7GQAFt9eO9Bk6fZ8Ub52Qiri8eUo+4dbWD02exh79v/nBP+H2PStnwz/jelJ1geKvk/peHJ4BoRZYow==)

## ટ્રાન્ઝિશન મોડ્સ (Transition Modes) {#transition-modes}

અગાઉના ઉદાહરણમાં, પ્રવેશતા અને બહાર નીકળતા એલિમેન્ટ્સ સમાન સમયે એનિમેટેડ હોય છે, અને જ્યારે બંને એલિમેન્ટ્સ DOM માં હાજર હોય ત્યારે લેઆઉટની સમસ્યા ટાળવા માટે આપણે તેને `position: absolute` બનાવવા પડ્યા હતા.

જો કે, કેટલાક કિસ્સાઓમાં આ વિકલ્પ નથી હોતો, અથવા ફક્ત તે ઇચ્છિત વર્તન હોતું નથી. અમે ઈચ્છી શકીએ છીએ કે બહાર નીકળતું એલિમેન્ટ પહેલા એનિમેટેડ થઈ જાય અને પ્રવેશતું એલિમેન્ટ લીવિંગ એનિમેશન સમાપ્ત થયા **પછી જ** દાખલ કરવામાં આવે. આવા એનિમેશનને મેન્યુઅલી ઓર્કેસ્ટ્રેટ કરવું ખૂબ જ જટિલ હશે - સદનસીબે, આપણે `<Transition>` ને `mode` પ્રોપ પસાર કરીને આ વર્તનને સક્ષમ કરી શકીએ છીએ:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

`mode="out-in"` સાથેનો અગાઉનો ડેમો અહીં છે:

<BetweenElements mode="out-in" />

`<Transition>` એ `mode="in-out"` ને પણ સપોર્ટ કરે છે, જોકે તેનો ઉપયોગ ભાગ્યે જ થાય છે.

## કમ્પોનન્ટ્સ વચ્ચે ટ્રાન્ઝિશન {#transition-between-components}

`<Transition>` નો ઉપયોગ [ડાયનેમિક કમ્પોનન્ટ્સ](/guide/essentials/component-basics#dynamic-components) ની આસપાસ પણ થઈ શકે છે:

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqtksFugzAMhl/F4tJNKtDLLoxWKnuDacdcUnC3SCGJiMmEqr77EkgLbXfYYZyI8/v77dinZG9M5npMiqS0dScMgUXqzY4p0RrdEZzAfnEp9fc7HuEMx063sPIZq6viTbdmHy+yfDwF5K2guhFUUcBUnkNvcelBGrjTooHaC7VCRXBAoT6hQTRyAH2w2DlsmKq1sgS8JuEwUCfxdgF7Gqt5ZqrMp+58X/5A2BrJCcOJSskPKP0v+K8UyvQENBjcsqTjjdAsAZe2ukHpI3dm/q5wXPZBPFqxZAf7gCrzGfufDlVwqB4cPjqurCChFSjeBvGRN+iTA9afdE+pUD43FjG/bSHsb667Mr9qJot89vCBMl8+oiotDTL8ZsE39UnYpRN0fQlK5A5jEE6BSVdiAdrwWtAAm+zFAnKLr0ydA3pJDDt0x/PrMrJifgGbKdFPfCwpWU+TuWz5omzfVCNcfJJ5geL8pqtFn5E07u7fSHFOj6TzDyUDNEM=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqtks9ugzAMxl/F4tJNamGXXVhWqewVduSSgStFCkkUDFpV9d0XJyn9t8MOkxBg5/Pvi+Mci51z5TxhURdi7LxytG2NGpz1BB92cDvYezvAqqxixNLVjaC5ETRZ0Br8jpIe93LSBMfWAHRBYQ0aGms4Jvw6Q05rFvSS5NNzEgN4pMmbcwQgO1Izsj5CalhFRLDj1RN/wis8olpaCQHh4LQk5IiEll+owy+XCGXcREAHh+9t4WWvbFvAvBlsjzpk7gx5TeqJtdG4LbawY5KoLtR/NGjYoHkw+PTSjIqUNWDkwOK97DHUMjVEdqKNMqE272E5dajV+JvpVlSLJllUF4+QENX1ERox0kHzb8m+m1CEfpOgYYgpqVHOmJNpgLQQa7BOdooO8FK+joByxLc4tlsiX6s7HtnEyvU1vKTCMO+4pWKdBnO+0FfbDk31as5HsvR+Hl9auuozk+J1/hspz+mRdPoBYtonzg==)

</div>

## ડાયનેમિક ટ્રાન્ઝિશન (Dynamic Transitions) {#dynamic-transitions}

`<Transition>` ના `name` જેવા પ્રોપ્સ પણ ડાયનેમિક હોઈ શકે છે! તે આપણને સ્ટેટ ચેન્જના આધારે વિવિધ ટ્રાન્ઝિશન ગતિશીલ રીતે લાગુ કરવાની મંજૂરી આપે છે:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

આ ત્યારે ઉપયોગી થઈ શકે છે જ્યારે તમે Vue ના ટ્રાન્ઝિશન ક્લાસ પરંપરાઓનો ઉપયોગ કરીને CSS ટ્રાન્ઝિશન / એનિમેશન વ્યાખ્યાયિત કર્યા હોય અને તેમની વચ્ચે સ્વિચ કરવા માંગતા હોવ.

તમે તમારા ઘટકની વર્તમાન સ્થિતિના આધારે JavaScript ટ્રાન્ઝિશન હૂક્સમાં અલગ વર્તન પણ લાગુ કરી શકો છો. છેલ્લે, ડાયનેમિક ટ્રાન્ઝિશન બનાવવાનો અંતિમ માર્ગ [પુનઃઉપયોગી ટ્રાન્ઝિશન કમ્પોનન્ટ્સ](#reusable-transitions) દ્વારા છે જે વાપરવા માટેના ટ્રાન્ઝિશનના સ્વભાવને બદલવા માટે પ્રોપ્સ સ્વીકારે છે. તે ચીઝી લાગી શકે છે, પરંતુ ખરેખર માત્ર તમારી કલ્પના જ સીમા છે.

## Key એટ્રિબ્યુટ સાથે ટ્રાન્ઝિશન {#transitions-with-the-key-attribute}

કેટલીકવાર તમારે ટ્રાન્ઝિશન થવા માટે DOM એલિમેન્ટને ફરીથી રેન્ડર કરવા માટે દબાણ કરવાની જરૂર હોય છે.

ઉદાહરણ તરીકે આ કાઉન્ટર (counter) ઘટક લો:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);

setInterval(() => count.value++, 1000);
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 1,
      interval: null 
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.count++;
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<template>
  <Transition>
    <span :key="count">{{ count }}</span>
  </Transition>
</template>
```

</div>

જો આપણે `key` એટ્રિબ્યુટને બાકાત રાખ્યું હોત, તો માત્ર ટેક્સ્ટ નોડ અપડેટ કરવામાં આવ્યો હોત અને આ રીતે કોઈ ટ્રાન્ઝિશન થયું ન હોત. જો કે, `key` એટ્રિબ્યુટની હાજરીમાં, Vue જાણે છે કે જ્યારે પણ `count` બદલાય ત્યારે નવું `span` એલિમેન્ટ બનાવવાનું હોય છે અને આમ `Transition` કમ્પોનન્ટ પાસે ટ્રાન્ઝિશન કરવા માટે ૨ અલગ એલિમેન્ટ્સ હોય છે.

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9UsFu2zAM/RVCl6Zo4nhYd/GcAtvQQ3fYhq1HXTSFydTKkiDJbjLD/z5KMrKgLXoTHx/5+CiO7JNz1dAja1gbpFcuQsDYuxtuVOesjzCCxx1MsPO2gwuiXnzkhhtpTYggbW8ibBJlUV/mBJXfmYh+EHqxuITNDYzcQGFWBPZ4dUXEaQnv6jrXtOuiTJoUROycFhEpAmi3agCpRQgbzp68cA49ZyV174UJKiprckxIcMJA84hHImc9oo7jPOQ0kQ4RSvH6WXW7JiV6teszfQpDPGqEIK3DLSGpQbazsyaugvqLDVx77JIhbqp5wsxwtrRvPFI7NWDhEGtYYVrQSsgELzOiUQw4I2Vh8TRgA9YJqeIR6upDABQh9TpTAPE7WN3HlxLp084Foi3N54YN1KWEVpOMkkO2ZJHsmp3aVw/BGjqMXJE22jml0X93STRw1pReKSe0tk9fMxZ9nzwVXP5B+fgK/hAOCePsh8dAt4KcnXJR+D3S16X07a9veKD3KdnZba+J/UbyJ+Zl0IyF9rk3Wxr7jJenvcvnrcz+PtweItKuZ1Np0MScMp8zOvkvb1j/P+776jrX0UbZ9A+fYSTP)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9U8tu2zAQ/JUFTwkSyw6aXlQ7QB85pIe2aHPUhZHWDhOKJMiVYtfwv3dJSpbbBgEMWJydndkdUXvx0bmi71CUYhlqrxzdVAa3znqCBtey0wT7ygA0kuTZeX4G8EidN+MJoLadoRKuLkdAGULfS12C6bSGDB/i3yFx2tiAzaRIjyoUYxesICDdDaczZq1uJrNETY4XFx8G5Uu4WiwW55PBA66txy8YyNvdZFNrlP4o/Jdpbq4M/5bzYxZ8IGydloR8Alg2qmcVGcKqEi9eOoe+EqnExXsvTVCkrBkQxoKTBspn3HFDmprp+32ODA4H9mLCKDD/R2E5Zz9+Ws5PpuBjoJ1GCLV12DASJdKGa2toFtRvLOHaY8vx8DrFMGdiOJvlS48sp3rMHGb1M4xRzGQdYU6REY6rxwHJGdJxwBKsk7WiHSyK9wFQhqh14gDyIVjd0f8Wa2/bUwOyWXwQLGGRWzicuChvKC4F8bpmrTbFU7CGL2zqiJm2Tmn03100DZUox5ddCam1ffmaMPJd3Cnj9SPWz6/gT2EbsUr88Bj4VmAljjWSfoP88mL59tc33PLzsdjaptPMfqP4E1MYPGOmfepMw2Of8NK0d238+JTZ3IfbLSFnPSwVB53udyX4q/38xurTuO+K6/Fqi8MffqhR/A==)

</div>

---

**સંબંધિત**

- [`<Transition>` API રિફરન્સ](/api/built-in-components#transition)
