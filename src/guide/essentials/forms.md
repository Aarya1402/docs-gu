---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
const dynamicSelected = ref('A')
const options = ref([
  { text: 'એક', value: 'A' },
  { text: 'બે', value: 'B' },
  { text: 'ત્રણ', value: 'C' }
])
</script>

# ફોર્મ ઇનપુટ બાઈન્ડિંગ્સ (Form Input Bindings) {#form-input-bindings}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="ફ્રી Vue.js યુઝર ઇનપુટ્સ લેસન"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="ફ્રી Vue.js યુઝર ઇનપુટ્સ લેસન"/>
</div>

ફ્રન્ટએન્ડ પર ફોર્મ સાથે કામ કરતી વખતે, આપણે ઘણીવાર ફોર્મ ઇનપુટ એલિમેન્ટ્સના સ્ટેટને જાવાસ્ક્રિપ્ટમાં અનુરૂપ સ્ટેટ સાથે સિંક (sync) કરવાની જરૂર પડે છે. વેલ્યુ બાઈન્ડિંગ્સ અને ચેન્જ ઇવેન્ટ લિસનર્સને મેન્યુઅલી વાયર અપ કરવું કંટાળાજનક હોઈ શકે છે:

```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

`v-model` ડિરેક્ટિવ આપણને ઉપરોક્તને સરળ બનાવવામાં મદદ કરે છે:

```vue-html
<input v-model="text">
```

વધુમાં, `v-model` નો ઉપયોગ વિવિધ પ્રકારના ઇનપુટ્સ, `<textarea>`, અને `<select>` એલિમેન્ટ્સ પર થઈ શકે છે. તે જે એલિમેન્ટ પર ઉપયોગમાં લેવાય છે તેના આધારે તે આપમેળે વિવિધ DOM પ્રોપર્ટી અને ઇવેન્ટ જોડીમાં વિસ્તરે છે:

- ટેક્સ્ટ પ્રકારો સાથેના `<input>` અને `<textarea>` એલિમેન્ટ્સ `value` પ્રોપર્ટી અને `input` ઇવેન્ટનો ઉપયોગ કરે છે;
- `<input type="checkbox">` અને `<input type="radio">` `checked` પ્રોપર્ટી અને `change` ઇવેન્ટનો ઉપયોગ કરે છે;
- `<select>` `value` નો પ્રોપ તરીકે અને `change` નો ઇવેન્ટ તરીકે ઉપયોગ કરે છે.

::: tip નોંધ
`v-model` કોઈપણ ફોર્મ એલિમેન્ટ્સ પર મળેલા પ્રારંભિક `value`, `checked` અથવા `selected` એટ્રિબ્યુટ્સને અવગણશે. તે હંમેશા વર્તમાન બાઉન્ડ જાવાસ્ક્રિપ્ટ સ્ટેટને સત્યના સ્ત્રોત (source of truth) તરીકે ગણશે. તમારે <span class="options-api">[`data`](/api/options-state.html#data) ઓપ્શન</span><span class="composition-api">[રિએક્ટિવિટી APIs](/api/reactivity-core.html#reactivity-api-core)</span> નો ઉપયોગ કરીને જાવાસ્ક્રિપ્ટ બાજુએ પ્રારંભિક વેલ્યુ જાહેર કરવી જોઈએ.
:::

## મૂળભૂત વપરાશ {#basic-usage}

### લખાણ (Text) {#text}

```vue-html
<p>સંદેશ છે: {{ message }}</p>
<input v-model="message" placeholder="કંઈક લખો" />
```

<div class="demo">
  <p>સંદેશ છે: {{ message }}</p>
  <input v-model="message" placeholder="કંઈક લખો" />
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jUEOgyAQRa8yYUO7aNkbNOkBegM2RseWRGACoxvC3TumxuX/+f+9ql5Ez31D1SlbpuyJoSBvNLjoA6XMUCHjAg2WnAJomWoXXZxSLAwBSxk/CP2xuWl9d9GaP0YAEhgDrSOjJABLw/s8+NJBrde/NWsOpWPrI20M+yOkGdfeqXPiFAhowm9aZ8zS4+wPv/RGjtZcJtV+YpNK1g==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jdEKwjAMRX8l9EV90L2POvAD/IO+lDVqoetCmw6h9N/NmBuEJPeSc1PVg+i2FFS90nlMnngwEb80JwaHL1sCQzURwFm258u2AyTkkuKuACbM2b6xh9Nps9o6pEnp7ggWwThRsIyiADQNz40En3uodQ+C1nRHK8HaRyoMy3WaHYa7Uf8To0CCRvzMwWESH51n4cXvBNTd8Um1H0FuTq0=)

</div>

<span id="vmodel-ime-tip"></span>
::: tip નોંધ
જે ભાષાઓમાં [IME](https://en.wikipedia.org/wiki/Input_method) (ચીની, જાપાનીઝ, કોરિયન વગેરે) ની જરૂર હોય છે, તે માટે તમે જોશો કે IME કમ્પોઝિશન દરમિયાન `v-model` અપડેટ થતું નથી. જો તમે આ અપડેટ્સ માટે પ્રતિસાદ આપવા માંગતા હોવ, તો `v-model` નો ઉપયોગ કરવાને બદલે તમારા પોતાના `input` ઇવેન્ટ લિસનર અને `value` બાઇન્ડિંગનો ઉપયોગ કરો.
:::

### બહુરેખા લખાણ (Multiline Text) {#multiline-text}

```vue-html
<span>બહુરેખા સંદેશ છે:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="બહુરેખા સંદેશ લખો"></textarea>
```

<div class="demo">
  <span>બહુરેખા સંદેશ છે:</span>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  <textarea v-model="multilineText" placeholder="બહુરેખા સંદેશ લખો"></textarea>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jktuwzAMRK9CaON24XrvKgZ6gN5AG8FmGgH6ECKdJjB891D5LYec9zCb+SH6Oq9oRmN5roEEGGWlyeWQqFSBDSoeYYdjLQk6rXYuuzyXzAIJmf0fwqF1Prru02U7PDQq0CCYKHrBlsQy+Tz9rlFCDBnfdOBRqfa7twhYrhEPzvyfgmCvnxlHoIp9w76dmbbtDe+7HdpaBQUv4it6OPepLBjV8Gw5AzpjxlOJC1a9+2WB1IZQRGhWVqsdXgb1tfDcbvYbJDRqLQ==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNo9jk2OwyAMha9isenMIpN9hok0B+gN2FjBbZEIscDpj6LcvaZpKiHg2X6f32L+mX+uM5nO2DLkwNK7RHeesoCnE85RYHEJwKPg1/f2B8gkc067AhipFDxTB4fDVlrro5ce237AKoRGjihUldjCmPqjLgkxJNoxEEqnrtp7TTEUeUT6c+Z2CUKNdgbdxZmaavt1pl+Wj3ldbcubUegumAnh2oyTp6iE95QzoDEGukzRU9Y6eg9jDcKRoFKLUm27E5RXxTu7WZ89/G4E)

</div>

નોંધ કરો કે `<textarea>` ની અંદર ઇન્ટરપોલેશન (interpolation) કામ કરશે નહીં. તેના બદલે `v-model` નો ઉપયોગ કરો.

```vue-html
<!-- ખરાબ -->
<textarea>{{ text }}</textarea>

<!-- સારું -->
<textarea v-model="text"></textarea>
```

### ચેકબોક્સ (Checkbox) {#checkbox}

સિંગલ ચેકબોક્સ, બુલિયન (boolean) વેલ્યુ:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVjssKgzAURH/lko3tonVfotD/yEaTKw3Ni3gjLSH/3qhUcDnDnMNk9gzhviRkD8ZnGXUgmJFS6IXTNvhIkCHiBAWm6C00ddoIJ5z0biaQL5RvVNCtmwvFhFfheLuLqqIGQhvMQLgm4tqFREDfgJ1gGz36j2Cg1TkvN+sVmn+JqnbtrjDDiAYmH09En/PxphTebqsK8PY4wMoPslBUxQ==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpVjtEKgzAMRX8l9Gl72Po+OmH/0ZdqI5PVNnSpOEr/fVVREEKSc0kuN4sX0X1KKB5Cfbs4EDfa40whMljsTXIMWXsAa9hcrtsOEJFT9DsBdG/sPmgfwDHhJpZl1FZLycO6AuNIzjAusGrwlBj4R/jUYrVpw6wFDPbM020MFt0uoq2a3CycadFBH+Lpo8l5jwWlKLle1QcljwCi/AH7gFic)

</div>

આપણે બહુવિધ ચેકબોક્સને સમાન એરે (array) અથવા [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) વેલ્યુ સાથે પણ બાંધી શકીએ છીએ:

<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
```

</div>

```vue-html
<div>ચેક કરેલ નામો: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

<div class="demo">
  <div>ચેક કરેલ નામો: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames" />
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames" />
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames" />
  <label for="demo-mike">Mike</label>
</div>

આ કિસ્સામાં, `checkedNames` એરે હંમેશા વર્તમાન ચેક કરેલા બોક્સના મૂલ્યો ધરાવશે.

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVkUtqwzAURbfy0CTtoNU8KILSWaHdQNWBIj8T1fohyybBeO+RbOc3i2e+vHvuMWggHyG89x2SLWGtijokaDF1gQunbfAxwQARaxihjt7CJlc3wgmnvGsTqAOqBqsfabGFXSm+/P69CsfovJVXckhog5EJcwJgle7558yBK+AWhuFxaRwZLbVCZ0K70CVIp4A7Qabi3h8FAV3l/C9Vk797abpy/lrim/UVmkt/Gc4HOv+EkXs0UPt4XeCFZHQ6lM4TZn9w9+YlrjFPCC/kKrPVDd6Zv5e4wjwv8ELezIxeX4qMZwHduAs=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVUc1qxCAQfpXBU3tovS9WKL0V2hdoenDjLGtjVNwxbAl592rMpru3DYjO5/cnOLLXEJ6HhGzHxKmNJpBsHJ6DjwQaDypZgrFxAFqRenisM0BEStFdEEB7xLZD/al6PO3g67veT+XIW16Cr+kZEPbBKsKMAIQ2g3yrAeBqwjjeRMI0CV5kxZ0dxoVEQL8BXxo2C/f+3DAwOuMf1XZ5HpRNhX5f4FPvNdqLfgnOBK+PsGqPFg4+rgmyOAWfiaK5o9kf3XXzArc0zxZZnJuae9PhVfPHAjc01wRZnP/Ngq8/xaY/yMW74g==)

</div>

### રેડિયો (Radio) {#radio}

```vue-html
<div>પસંદ કરેલ: {{ picked }}</div>

<input type="radio" id="one" value="એક" v-model="picked" />
<label for="one">એક</label>

<input type="radio" id="two" value="બે" v-model="picked" />
<label for="two">બે</label>
```

<div class="demo">
  <div>પસંદ કરેલ: {{ picked }}</div>

  <input type="radio" id="one" value="એક" v-model="picked" />
  <label for="one">એક</label>

  <input type="radio" id="two" value="બે" v-model="picked" />
  <label for="two">બે</label>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkDFuwzAMRa9CaHE7tNoDxUBP0A4dtTgWDQiRJUKmHQSG7x7KhpMMAbLxk3z/g5zVD9H3NKI6KDO02RPDgDxSbaPvKWWGGTJ2sECXUw+VrFY22timODCQb8/o4FhWPqrfiNWnjUZvRmIhgrGn0DCKAjDOT/XfCh1gnnd+WYwukwJYNj7SyMBXwqNVuXE+WQXeiUgRpZyaMJaR5BX11SeHQfTmJi1dnNiE5oQBupR3shbC6LX9Posvpdyz/jf1OksOe85ayVqIR5bR9z+o5Qbc6oCk)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNkEEOAiEMRa/SsFEXyt7gJJ5AFy5ng1ITIgLBMmomc3eLOONSEwJ9Lf//pL3YxrjqMoq1ULdTspGa1uMjhkRg8KyzI+hbD2A06fmi1gAJKSc/EkC0pwuaNcx2Hme1OZSHLz5KTtYMhNfoNGEhUsZ2zf6j7vuPEQyDkmVSBPzJ+pgJ6Blx04qkjQ2tAGsYgkcuO+1yGXF6oeU1GHTM1Y1bsoY5fUQH55BGZcMKJd/t31l0L+WYdaj0V9Zb2bDim6XktAcxvADR+YWb)

</div>

### સિલેક્ટ (Select) {#select}

સિંગલ સિલેક્ટ:

```vue-html
<div>પસંદ કરેલ: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">મહેરબાની કરીને એક પસંદ કરો</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>પસંદ કરેલ: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">મહેરબાની કરીને એક પસંદ કરો</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1j7EOgyAQhl/lwmI7tO4Nmti+QJOuLFTPxASBALoQ3r2H2jYOjvff939wkTXWXucJ2Y1x37rBBvAYJlsLPYzWuAARHPaQoHdmhILQQmihW6N9RhW2ATuoMnQqirPQvFw9ZKAh4GiVDEgTAPdW6hpeW+sGMf4VKVEz73Mvs8sC5stoOlSVYF9SsEVGiLFhMBq6wcu3IsUs1YREEvFUKD1udjAaebnS+27dHOT3g/yxy+nHywM08PJ3KksfXwJ2dA==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1j1ELgyAUhf/KxZe2h633cEHbHxjstReXdxCYSt5iEP333XIJPQSinuN3jjqJyvvrOKAohAxN33oqa4tf73oCjR81GIKptgBakTqd4x6gRxp6uymAgAYbQl1AlkVvXhaeeMg8NbMg7LxRhKwAZPDKlvBK8WlKXTDPnFzOI7naMF46p9HcarFxtVgBRpyn1lnQbVBvwwWjMgMyycTToAr47wZnUeaR3mfL6sC/H/iPnc/vXS9gIfP0UTH/ACgWeYE=)

</div>

:::tip નોંધ
જો તમારા `v-model` એક્સપ્રેશનની પ્રારંભિક વેલ્યુ કોઈપણ ઓપ્શન સાથે મેળ ખાતી નથી, તો `<select>` એલિમેન્ટ "unselected" સ્ટેટમાં રેન્ડર થશે. iOS પર આના કારણે યુઝર પ્રથમ આઇટમ પસંદ કરી શકશે નહીં કારણ કે iOS આ કિસ્સામાં ચેન્જ ઇવેન્ટ ફાયર કરતું નથી. તેથી ખાલી મૂલ્ય સાથે ડિસેબલ્ડ (disabled) ઓપ્શન પ્રદાન કરવાની ભલામણ કરવામાં આવે છે, જે ઉપરના ઉદાહરણમાં દર્શાવ્યા મુજબ છે.
:::

મલ્ટીપલ સિલેક્ટ (એરે સાથે બાઉન્ડ):

```vue-html
<div>પસંદ કરેલ: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>પસંદ કરેલ: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1kL2OwjAQhF9l5Ya74i7QBhMJeARKTIESIyz5Z5VsAsjyu7NOQEBB5xl/M7vaKNaI/0OvRSlkV7cGCTpNPVbKG4ehJYjQ6hMkOLXBwYzRmfLK18F3GbW6Jt3AKkM/+8Ov8rKYeriBBWmH9kiaFYBszFDtHpkSYnwVpCSL/JtDDE4+DH8uNNqulHiCSoDrLRm0UyWzAckEX61l8Xh9+psv/vbD563HCSxk8bY0y45u47AJ2D/HHyDm4MU0dC5hMZ/jdal8Gg8wJkS6A3nRew4=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1UEEOgjAQ/MqmJz0oeMVKgj7BI3AgdI1NCjSwIIbwdxcqRA4mTbsznd2Z7CAia49diyIQsslrbSlMSuxtVRMofGStIRiSEkBllO32rgaokdq6XBBAgwZzQhVAnDpunB6++EhvncyAsLAmI2QEIJXuwvvaPAzrJBhH6U2/UxMLHQ/doagUmksiFmEioOCU2ho3krWVJV2VYSS9b7Xlr3/424bn1LMDA+n9hGbY0Hs2c4J4sU/dPl5a0TOAk+/b/rwsYO4Q4wdtRX7l)

</div>

સિલેક્ટ ઓપ્શન્સ `v-for` સાથે ડાયનેમિકલી રેન્ડર કરી શકાય છે:

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: 'એક', value: 'A' },
  { text: 'બે', value: 'B' },
  { text: 'ત્રણ', value: 'C' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'એક', value: 'A' },
        { text: 'બે', value: 'B' },
        { text: 'ત્રણ', value: 'C' }
      ]
    }
  }
}
```

</div>

```vue-html
<div>પસંદ કરેલ: {{ selected }}</div>

<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>
```
<div class="demo">
  <div>પસંદ કરેલ: {{ dynamicSelected }}</div>
  
  <select v-model="dynamicSelected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</div>

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9kj9vwjAQxb/KyUtaiYahGwpIgBjaoVSFre6AkguEOnZkOwEpynfv2flDqlZkyt37+fye7ZotiyKsSmQzFplYZ4UFg7YsFlxmeaG0hRo0ptBAqlUOAaEBl1zGShqHCowtJjB30EOwDB5voipsRj+d9skl0CyLVzuDYCsxmEB1ECVStQygmfzS9xc10ld/9ZPG8YQ1EVx+0e7RtI1BAaiwmBfiYNFVNkqyarHrLM+grm/+myaaOtUtAojaPlRPuUpQzDnrQc4IAfqiNh0hqdIEdGUm+9icwcy7G8TQl8MESlN3cOhSkYdu9LTteo7i+K2piKZDGjZh1tApp9kxPBsl6fZqR3MWq7zIBOpt74JytmM5OwihLq++Z3WJ/kT9mhPG3//0z+bqepy9azSoK/I+aPagj2hbebN7I/8jkU6tFETfET/QKFE6jy22KmVCtkecd/vi32Amj3uzuVqUpg/ljDqyfRec0btc34l+s/scPvt1XDas+QENov3B)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9ksFuwjAMhl/FyoVNYuWwG+omAeKwHcY0uC07VK2BspBUiVuQKt59Tkq6Hjakqortz87/J2nFrKqSpkYxFanLbVnRs9R4rowlKHCb1YqglRqgyCi7u+/WABaptjpGAA4V5oTFFEaz0ThmTUWl0W4KnzED0ALhmZhbaRyNoclUjaELLn3fgNqczICa/0ftLQ6nLZiL2Fe3CDH/+EsnvVMOCI+Vygh9RGlRNs/r3kzb9s7gckknvuqbANIuD83D0RSonqSIoBSM+B3Tzj4jW2MZuIaljuciBUyD4r6YhLCfwA7bK5x4p6zhOnrSZQPHdsLWHKST3o0YC3K50dtylxyc0XzB4bakyM2xKhXaVVTBPruxUmRKmdNryJGt8XrW3LPH/PuP/MGdfU6Kd4sObcPa+xpldofUlZfrN9Y/KPKp1YrpG8UPdEbVXmOHzWtdsOwBF9S+HP1jLfVu45ZnQu2iKS80XHrgpeBXvrhh/VfuY/IYH4u4/AD+8ADR)

</div>

## વેલ્યુ બાઈન્ડિંગ્સ (Value Bindings) {#value-bindings}

રેડિયો, ચેકબોક્સ અને સિલેક્ટ ઓપ્શન્સ માટે, `v-model` બાઇન્ડિંગ વેલ્યુ સામાન્ય રીતે સ્ટેટિક સ્ટ્રિંગ્સ (અથવા ચેકબોક્સ માટે બુલિયન) હોય છે:

```vue-html
<!-- ચેક કરતી વખતે `picked` એ સ્ટ્રિંગ "a" છે -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` એ કાં તો true અથવા false છે -->
<input type="checkbox" v-model="toggle" />

<!-- પ્રથમ ઓપ્શન પસંદ કરવામાં આવે ત્યારે `selected` એ સ્ટ્રિંગ "abc" છે -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

પરંતુ કેટલીકવાર આપણે વેલ્યુને વર્તમાન એક્ટિવ ઇન્સ્ટન્સ પર ડાયનેમિક પ્રોપર્ટી સાથે બાંધવા માંગીએ છીએ. આપણે તે હાંસલ કરવા માટે `v-bind` નો ઉપયોગ કરી શકીએ છીએ. વધુમાં, `v-bind` નો ઉપયોગ કરવાથી આપણને ઇનપુટ વેલ્યુને નોન-સ્ટ્રિંગ વેલ્યુસ સાથે બાંધવાની મંજૂરી મળે છે.

### ચેકબોક્સ (Checkbox) {#checkbox-1}

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` અને `false-value` એ Vue-વિશિષ્ટ એટ્રિબ્યુટ્સ છે જે ફક્ત `v-model` સાથે કામ કરે છે. અહીં જ્યારે બોક્સ ચેક કરવામાં આવશે ત્યારે `toggle` પ્રોપર્ટીની વેલ્યુ `'yes'` પર સેટ કરવામાં આવશે, અને જ્યારે અનચેક કરવામાં આવશે ત્યારે `'no'` પર સેટ કરવામાં આવશે. તમે `v-bind` નો ઉપયોગ કરીને તેમને ડાયનેમિક વેલ્યુસ સાથે પણ બાંધી શકો છો:

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip મહત્વની વાત
`true-value` અને `false-value` એટ્રિબ્યુટ્સ ઇનપુટના `value` એટ્રિબ્યુટને અસર કરતા નથી, કારણ કે બ્રાઉઝર્સ ફોર્મ સબમિશનમાં અનચેક કરેલા બોક્સનો સમાવેશ કરતા નથી. ફોર્મમાં બે મૂલ્યોમાંથી એક સબમિટ કરવામાં આવે તેની ગેરંટી આપવા માટે (દા.ત. "yes" અથવા "no"), તેના બદલે રેડિયો ઇનપુટ્સનો ઉપયોગ કરો.
:::

### રેડિયો (Radio) {#radio-1}

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

જ્યારે પ્રથમ રેડિયો ઇનપુટ ચેક કરવામાં આવશે ત્યારે `pick` એ `first` ની વેલ્યુ પર સેટ થશે, અને જ્યારે બીજું ચેક કરવામાં આવશે ત્યારે `second` ની વેલ્યુ પર સેટ થશે.

### સિલેક્ટ ઓપ્શન્સ {#select-options}

```vue-html
<select v-model="selected">
  <!-- ઇનલાઇન ઓબ્જેક્ટ લિટરલ -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` નોન-સ્ટ્રિંગ વેલ્યુસના વેલ્યુ બાઈન્ડિંગ્સને પણ સપોર્ટ કરે છે! ઉપરના ઉદાહરણમાં, જ્યારે ઓપ્શન પસંદ કરવામાં આવે છે, ત્યારે `selected` ઓબ્જેક્ટ લિટરલ વેલ્યુ `{ number: 123 }` પર સેટ થશે.

## મોડિફાયર્સ (Modifiers) {#modifiers}

### `.lazy` {#lazy}

ડિફોલ્ટ રૂપે, `v-model` દરેક `input` ઇવેન્ટ પછી ડેટા સાથે ઇનપુટને સિંક કરે છે (ઉપર જણાવ્યા મુજબ IME કમ્પોઝિશનના અપવાદ સાથે). તમે તેના બદલે `change` ઇવેન્ટ્સ પછી સિંક કરવા માટે `lazy` મોડિફાયર ઉમેરી શકો છો:

```vue-html
<!-- "input" ને બદલે "change" પછી સિંક થશે -->
<input v-model.lazy="msg" />
```

### `.number` {#number}

જો તમે ઇચ્છો છો કે યુઝર ઇનપુટ આપમેળે નંબર તરીકે ટાઇપકાસ્ટ (typecast) થાય, તો તમે તમારા `v-model` સંચાલિત ઇનપુટ્સમાં `number` મોડિફાયર ઉમેરી શકો છો:

```vue-html
<input v-model.number="age" />
```

જો વેલ્યુ `parseFloat()` સાથે પાર્સ કરી શકાતી નથી, તો તેના બદલે અસલ (સ્ટ્રિંગ) વેલ્યુનો ઉપયોગ કરવામાં આવે છે. ખાસ કરીને, જો ઇનપુટ ખાલી હોય (દાખલા તરીકે યુઝર દ્વારા ઇનપુટ ફીલ્ડ સાફ કર્યા પછી), તો ખાલી સ્ટ્રિંગ પરત કરવામાં આવે છે. આ વર્તન [DOM પ્રોપર્ટી `valueAsNumber`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#valueasnumber) થી અલગ છે.

જો ઇનપુટમાં `type="number"` હોય તો `number` મોડિફાયર આપમેળે લાગુ થાય છે.

### `.trim` {#trim}

જો તમે ઇચ્છો છો કે યુઝર ઇનપુટમાંથી વ્હાઇટ સ્પેસ (whitespace) આપમેળે ટ્રિમ થાય, તો તમે તમારા `v-model`-સંચાલિત ઇનપુટ્સમાં `trim` મોડિફાયર ઉમેરી શકો છો:

```vue-html
<input v-model.trim="msg" />
```

## કમ્પોનન્ટ સાથે `v-model` {#v-model-with-components}

> જો તમે હજી સુધી Vue ના કમ્પોનન્ટથી પરિચિત નથી, તો તમે અત્યારે આને છોડી શકો છો.

HTML ના બિલ્ટ-ઇન ઇનપુટ પ્રકારો હંમેશા તમારી જરૂરિયાતોને પૂર્ણ કરશે નહીં. સદભાગ્યે, Vue કમ્પોનન્ટ્સ તમને સંપૂર્ણ કસ્ટમાઇઝ્ડ વર્તન સાથે પુનઃઉપયોગી ઇનપુટ્સ બનાવવાની મંજૂરી આપે છે. આ ઇનપુટ્સ `v-model` સાથે પણ કામ કરે છે! વધુ જાણવા માટે, કમ્પોનન્ટ્સ માર્ગદર્શિકામાં [`v-model` સાથે વપરાશ](/guide/components/v-model) વિશે વાંચો.
