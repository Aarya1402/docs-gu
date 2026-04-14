<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# ટ્રાન્ઝિશનગ્રુપ (TransitionGroup) {#transitiongroup}

`<TransitionGroup>` એ એક બિલ્ટ-ઇન ઘટક છે જે લિસ્ટમાં રેન્ડર થયેલા એલિમેન્ટ્સ અથવા કમ્પોનન્ટ્સના ઇન્સર્શન (insertion), રિમૂવલ (removal) અને ઓર્ડર ચેન્જ (order change) ને એનિમેટ કરવા માટે રચાયેલ છે.

## `<Transition>` થી તફાવત {#differences-from-transition}

`<TransitionGroup>` સમાન પ્રોપ્સ, CSS ટ્રાન્ઝિશન ક્લાસીસ અને JavaScript હૂક લિસનર્સને `<Transition>` ની જેમ જ સપોર્ટ કરે છે, જેમાં નીચેના તફાવતો છે:

- ડિફોલ્ટ રૂપે, તે રેપર એલિમેન્ટ (wrapper element) રેન્ડર કરતું નથી. પરંતુ તમે `tag` પ્રોપ સાથે રેન્ડર કરવા માટે એલિમેન્ટ ઉલ્લેખ કરી શકો છો.

- [ટ્રાન્ઝિશન મોડ્સ](./transition#transition-modes) ઉપલબ્ધ નથી, કારણ કે આપણે હવે પરસ્પર વિશિષ્ટ ઘટકો (mutually exclusive elements) વચ્ચે વૈકલ્પિક રીતે બદલાતા નથી.

- અંદરના એલિમેન્ટ્સ માટે હંમેશા અનન્ય `key` એટ્રિબ્યુટ હોવું **જરૂરી** છે.

- CSS ટ્રાન્ઝિશન ક્લાસીસ લિસ્ટમાં વ્યક્તિગત એલિમેન્ટ્સ પર લાગુ કરવામાં આવશે, ગ્રુપ / કન્ટેનર પર **નહીં**.

:::tip
જ્યારે [in-DOM templates](/guide/essentials/component-basics#in-dom-template-parsing-caveats) માં ઉપયોગ થાય છે, ત્યારે તેને `<transition-group>` તરીકે ઓળખવામાં આવવું જોઈએ.
:::

## એન્ટર / લીવ ટ્રાન્ઝિશન (Enter / Leave Transitions) {#enter-leave-transitions}

અહીં `<TransitionGroup>` નો ઉપયોગ કરીને `v-for` લિસ્ટમાં એન્ટર / લીવ ટ્રાન્ઝિશન લાગુ કરવાનું ઉદાહરણ છે:

```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## મુવ ટ્રાન્ઝિશન (Move Transitions) {#move-transitions}

ઉપરોક્ત ડેમોમાં કેટલીક સ્પષ્ટ ખામીઓ છે: જ્યારે કોઈ આઇટમ દાખલ કરવામાં આવે અથવા દૂર કરવામાં આવે, ત્યારે તેની આસપાસની આઇટમ્સ સરળતાથી ખસવાને બદલે તરત જ "જમ્પ" કરીને તેની જગ્યાએ આવી જાય છે. અમે કેટલાક વધારાના CSS નિયમો ઉમેરીને આને ઠીક કરી શકીએ છીએ:

```css{1,13-17}
.list-move, /* ખસેડતા ઘટકો પર ટ્રાન્ઝિશન લાગુ કરો */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ખાતરી કરો કે બહાર નીકળતી આઇટમ્સ લેઆઉટ પ્રવાહમાંથી બહાર કાઢવામાં આવે છે 
   જેથી કરીને મૂવિંગ એનિમેશનની ગણતરી યોગ્ય રીતે કરી શકાય. */
.list-leave-active {
  position: absolute;
}
```

હવે તે ઘણું સારું લાગે છે - જ્યારે આખું લિસ્ટ શફલ (shuffled) થાય ત્યારે પણ સરળતાથી એનિમેટ થાય છે:

<ListMove />

[સંપૂર્ણ ઉદાહરણ](/examples/#list-transition)

### કસ્ટમ ટ્રાન્ઝિશનગ્રુપ ક્લાસીસ {#custom-transitiongroup-classes}

તમે `<TransitionGroup>` ને `moveClass` પ્રોપ પાસ કરીને મૂવિંગ એલિમેન્ટ માટે કસ્ટમ ટ્રાન્ઝિશન ક્લાસીસ પણ સ્પષ્ટ કરી શકો છો, બિલકુલ [`<Transition>` પર કસ્ટમ ટ્રાન્ઝિશન ક્લાસીસ](/guide/built-ins/transition.html#custom-transition-classes) ની જેમ.

## સ્ટેગર્ડ લિસ્ટ ટ્રાન્ઝિશન (Staggering List Transitions) {#staggering-list-transitions}

ડેટા એટ્રિબ્યુટ્સ દ્વારા JavaScript ટ્રાન્ઝિશન સાથે વાતચીત કરીને, લિસ્ટમાં ટ્રાન્ઝિશનને સ્ટેગર (stagger) કરવું પણ શક્ય છે. પ્રથમ, અમે DOM એલિમેન્ટ પર ડેટા એટ્રિબ્યુટ તરીકે આઇટમની ઇન્ડેક્સ (index) રેન્ડર કરીએ છીએ:

```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

પછી, JavaScript હૂક્સમાં, અમે ડેટા એટ્રિબ્યુટના આધારે વિલંબ (delay) સાથે એલિમેન્ટને એનિમેટ કરીએ છીએ. આ ઉદાહરણ એનિમેશન કરવા માટે [GSAP લાઇબ્રેરી](https://gsap.com/) નો ઉપયોગ કરી રહ્યું છે:

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[Playground માં સંપૂર્ણ ઉદાહરણ](https://play.vuejs.org/#eNqlVMuu0zAQ/ZVRNklRm7QLWETtBW4FSFCxYkdYmGSSmjp28KNQVfl3xk7SFyvEponPGc+cOTPNOXrbdenRYZRHa1Nq3lkwaF33VEjedkpbOIPGeg6lajtnsYIeaq1aiOlSfAlqDOtG3L8SUchSSWNBcPrZwNdCAqVqTZND/KxdibBDjKGf3xIfWXngCNs9k4/Udu/KA3xWWnPz1zW0sOOP6CcnG3jv9ImIQn67SvrpUJ9IE/WVxPHsSkw97gbN0zFJZrB5grNPrskcLUNXac2FRZ0k3GIbIvxLSsVTq3bqF+otM5jMUi5L4So0SSicHplwOKOyfShdO1lariQo+Yy10vhO+qwoZkNFFKmxJ4Gp6ljJrRe+vMP3yJu910swNXqXcco1h0pJHDP6CZHEAAcAYMydwypYCDAkJRdX6Sts4xGtUDAKotIVs9Scpd4q/A0vYJmuXo5BSm7JOIEW81DVo77VR207ZEf8F23LB23T+X9VrbNh82nn6UAz7ASzSCeANZe0AnBctIqqbIoojLCIIBvoL5pJw31DH7Ry3VDKsoYinSii4ZyXxhBQM2Fwwt58D7NeoB8QkXfDvwRd2XtceOsCHkwc8KCINAk+vADJppQUFjZ0DsGVGT3uFn1KSjoPeKLoaYtvCO/rIlz3vH9O5FiU/nXny/pDT6YGKZngg0/Zg1GErrMbp6N5NHxJFi3N/4dRkj5IYf5ULxCmiPJpI4rIr4kHimhvbWfyLHOyOzQpNZZ57jXNy4nRGFLTR/0fWBqe7w==)

</div>
<div class="options-api">

[Playground માં સંપૂર્ણ ઉદાહરણ](https://play.vuejs.org/#eNqtVE2P0zAQ/SujXNqgNmkPcIjaBbYCJKg4cSMcTDJNTB07+KNsVfW/M3aabNpyQltViT1vPPP8Zian6H3bJgeHURatTKF5ax9yyZtWaQuVYS3stGpg4peTXOayUNJYEJwea/ieS4ATNKbKYPKoXYGwRZzAeTYGPrNizxE2NZO30KZ2xR6+Kq25uTuGFrb81vrFyQo+On0kIJc/PCV8CmxL3DEnLJy8e8ksm8bdGkCjdVr2O4DfDvWRgtGN/JYC0SOkKVTTOotl1jv3hi3d+DngENILkey4sKinU26xiWH9AH6REN/Eqq36g3rDDE7jhMtCuBLN1NbcJIFEHN9RaNDWqjQDAyUfcac0fpA+CYoRCRSJsUeBiWpZwe2RSrK4w2rkVe2rdYG6LD5uH3EGpZI4iuurTdwDNBjpRJclg+UlhP914UnMZfIGm8kIKVEwciYivhoGLQlQ4hO8gkWyfD1yVHJDKgu0mAUmPXLuxRkYb5Ed8H8YL/7BeGx7Oa6hkLmk/yodBoo21BKtYBZpB7DikroKDvNGUeZ1HoVmyCNIO/ibZtJwy5X8pJVru9CWVeTpRB51+6wwhgw7Jgz2tnc/Q6/M0ZeWwKvmGZye0Wu78PIGexC6swdGxEnw/q6HOYUkt9DwMwhKxfS6GpY+KPHc45G8+6EYAV7reTjucf/uwUtSmvvTME1wDuISlVTwTqf0RiiyrtKR0tEs6r5l84b645dRkr5zoT8oXwBMHg2Tlke+jbwhj2prW5OlqZPtvkroYqnH3lK9nLgI46scnf8Cn22kBA==)

</div>

---

**સંબંધિત**

- [`<TransitionGroup>` API રિફરન્સ](/api/built-in-components#transitiongroup)
