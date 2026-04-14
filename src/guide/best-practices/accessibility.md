# એક્સેસિબિલિટી (Accessibility) {#accessibility}

વેબ એક્સેસિબિલિટી (જેને a11y તરીકે પણ ઓળખવામાં આવે છે) એટલે એવી વેબસાઇટ્સ બનાવવાની પ્રથાઓ કે જેનો ઉપયોગ કોઈપણ વ્યક્તિ કરી શકે - પછી ભલે તે કોઈ અપંગ વ્યક્તિ હોય, ધીમું ઈન્ટરનેટ હોય, જૂના કે તૂટેલા હાર્ડવેર હોય અથવા પ્રતિકૂળ વાતાવરણમાં હોય. ઉદાહરણ તરીકે, વિડિઓમાં સબટાઇટલ્સ ઉમેરવાથી તમારા બહેરા અને સાંભળવાની ક્ષમતા ઓછી હોય તેવા વપરાશકર્તાઓ અને એવા વપરાશકર્તાઓ કે જેઓ ઘોંઘાટવાળા વાતાવરણમાં છે અને તેમનો ફોન સાંભળી શકતા નથી તે બંનેને મદદ કરશે. તેવી જ રીતે, તમારા ટેક્સ્ટનો કોન્ટ્રાસ્ટ બહુ ઓછો નથી તેની ખાતરી કરવાથી તમારા ઓછી દ્રષ્ટિવાળા વપરાશકર્તાઓ અને તમારા વપરાશકર્તાઓ કે જેઓ પ્રખર સૂર્યપ્રકાશમાં તેમના ફોનનો ઉપયોગ કરવાનો પ્રયાસ કરી રહ્યાં છે તે બંનેને મદદ કરશે.

શરૂ કરવા માટે તૈયાર છો પણ ક્યાંથી ખાતરી નથી?

[વર્લ્ડ વાઈડ વેબ કન્સોર્ટિયમ (W3C)](https://www.w3.org/) દ્વારા પૂરી પાડવામાં આવેલ [પ્લાનિંગ અને મેનેજિંગ વેબ એક્સેસિબિલિટી ગાઇડ](https://www.w3.org/WAI/planning-and-managing/) તપાસો.

## સ્કીપ લિંક (Skip link) {#skip-link}

તમારે દરેક પેજની ટોચ પર એક લિંક ઉમેરવી જોઈએ જે સીધી મુખ્ય કન્ટેન્ટ એરિયા પર જાય જેથી વપરાશકર્તાઓ બહુવિધ વેબ પેજીસ પર પુનરાવર્તિત થતા કન્ટેન્ટને છોડી શકે.

સામાન્ય રીતે આ `App.vue` ની ટોચ પર કરવામાં આવે છે કારણ કે તે તમારા બધા પેજીસ પર પ્રથમ ફોકેસેબલ (focusable) એલિમેન્ટ હશે:

```vue-html
<span ref="backToTop" tabindex="-1" />
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">મુખ્ય કન્ટેન્ટ પર જાઓ</a>
  </li>
</ul>
```

લિંક જ્યારે ફોકસ ન હોય ત્યારે તેને છુપાવવા માટે, તમે નીચેની સ્ટાઇલ ઉમેરી શકો છો:

```css
.skip-links {
  list-style: none;
}
.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
```

એકવાર વપરાશકર્તા રૂટ બદલી લે, પછી ફોકસને પેજના ખૂબ જ પ્રારંભમાં લાવો, સ્કીપ લિંકની બરાબર પહેલાં. `backToTop` ટેમ્પલેટ રેફ પર ફોકસ કૉલ કરીને આ પ્રાપ્ત કરી શકાય છે (ધારી લઈએ કે `vue-router` નો ઉપયોગ થાય છે):

<div class="options-api">

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.backToTop.focus()
    }
  }
}
</script>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const backToTop = ref()

watch(
  () => route.path,
  () => {
    backToTop.value.focus()
  }
)
</script>
```

</div>

[મુખ્ય કન્ટેન્ટ પર સ્કીપ લિંક પરના દસ્તાવેજો વાંચો](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## કન્ટેન્ટ સ્ટ્રક્ચર (Content Structure) {#content-structure}

એક્સેસિબિલિટીના સૌથી મહત્વપૂર્ણ ભાગોમાંનું એક એ સુનિશ્ચિત કરવું છે કે ડિઝાઇન એક્સેસિબલ ઇમ્પ્લીમેન્ટેશનને સપોર્ટ કરી શકે છે. ડિઝાઇનમાં માત્ર કલર કોન્ટ્રાસ્ટ, ફોન્ટ સિલેક્શન, ટેક્સ્ટ સાઈઝ અને લેંગ્વેજ જ નહીં, પણ એપ્લિકેશનમાં કન્ટેન્ટ કેવી રીતે સ્ટ્રક્ચર કરવામાં આવ્યું છે તે પણ ધ્યાનમાં લેવું જોઈએ.

### હેડિંગ્સ (Headings) {#headings}

વપરાશકર્તાઓ હેડિંગ્સ દ્વારા એપ્લિકેશનમાં નેવિગેટ કરી શકે છે. તમારી એપ્લિકેશનના દરેક વિભાગ માટે વિગતવાર હેડિંગ્સ રાખવાથી વપરાશકર્તાઓ માટે દરેક વિભાગના કન્ટેન્ટની આગાહી કરવી સરળ બને છે. જ્યારે હેડિંગ્સની વાત આવે છે, ત્યારે કેટલીક ભલામણ કરેલ એક્સેસિબિલિટી પ્રથાઓ છે:

- હેડિંગ્સને તેમના ક્રમ મુજબ નેસ્ટ (nest) કરો: `<h1>` - `<h6>`
- વિભાગમાં હેડિંગ્સ છોડશો નહીં
- હેડિંગનો વિઝ્યુઅલ દેખાવ આપવા માટે ટેક્સ્ટને સ્ટાઇલ આપવાને બદલે વાસ્તવિક હેડિંગ ટૅગ્સનો ઉપયોગ કરો

[હેડિંગ્સ વિશે વધુ વાંચો](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```vue-html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">મુખ્ય શીર્ષક</h1>
  <section aria-labelledby="section-title-1">
    <h2 id="section-title-1"> વિભાગ શીર્ષક </h2>
    <h3>વિભાગ પેટાશીર્ષક</h3>
    <!-- કન્ટેન્ટ -->
  </section>
  <section aria-labelledby="section-title-2">
    <h2 id="section-title-2"> વિભાગ શીર્ષક </h2>
    <h3>વિભાગ પેટાશીર્ષક</h3>
    <!-- કન્ટેન્ટ -->
    <h3>વિભાગ પેટાશીર્ષક</h3>
    <!-- કન્ટેન્ટ -->
  </section>
</main>
```

### લેન્ડમાર્કસ (Landmarks) {#landmarks}

[લેન્ડમાર્કસ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) એપ્લિકેશનની અંદરના વિભાગોમાં પ્રોગ્રામેટિક એક્સેસ પૂરી પાડે છે. જે વપરાશકર્તાઓ આસિસ્ટીવ ટેક્નોલોજી (assistive technology) પર આધાર રાખે છે તેઓ એપ્લિકેશનના દરેક વિભાગમાં નેવિગેટ કરી શકે છે અને કન્ટેન્ટને છોડી શકે છે. આ પ્રાપ્ત કરવામાં મદદ કરવા માટે તમે [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) નો ઉપયોગ કરી શકો છો.

| HTML            | ARIA Role            | લેન્ડમાર્કનો હેતુ                                                                                                 |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"        | મુખ્ય શીર્ષક: પેજનું ટાઇટલ                                                                                 |
| nav             | role="navigation"    | દસ્તાવેજ અથવા સંબંધિત દસ્તાવેજો નેવિગેટ કરતી વખતે વાપરવા માટે યોગ્ય લિંક્સનો સંગ્રહ                           |
| main            | role="main"          | દસ્તાવેજની મુખ્ય અથવા કેન્દ્રીય સામગ્રી.                                                                     |
| footer          | role="contentinfo"   | પિતૃ દસ્તાવેજ વિશેની માહિતી: ફૂટનોટ્સ/કોપીરાઈટ્સ/ગોપનીયતા નિવેદનની લિંક્સ                           |
| aside           | role="complementary" | મુખ્ય સામગ્રીને સપોર્ટ કરે છે, છતાં તે તેની પોતાની સામગ્રી પર અલગ અને અર્થપૂર્ણ છે                                    |
| search          | role="search"        | આ વિભાગમાં એપ્લિકેશન માટે સર્ચ કાર્યક્ષમતા શામેલ છે                                               |
| form            | role="form"          | ફોર્મ-સંબંધિત ઘટકોનો સંગ્રહ                                                                           |
| section         | role="region"        | સામગ્રી જે સુસંગત છે અને વપરાશકર્તાઓ મોટે ભાગે નેવિગેટ કરવા માંગશે. આ એલિમેન્ટ માટે લેબલ પ્રદાન કરવું આવશ્યક છે |

[લેન્ડમાર્કસ વિશે વધુ વાંચો](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

## સેમેન્ટિક ફોર્મ્સ (Semantic Forms) {#semantic-forms}

ફોર્મ બનાવતી વખતે, તમે નીચેના ઘટકોનો ઉપયોગ કરી શકો છો: `<form>`, `<label>`, `<input>`, `<textarea>`, અને `<button>`

લેબલ્સ સામાન્ય રીતે ફોર્મ ફીલ્ડ્સની ટોચ પર અથવા ડાબી બાજુએ મૂકવામાં આવે છે:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">સબમિટ કરો</button>
</form>
```

નોંધ લો કે તમે ફોર્મ એલિમેન્ટ પર `autocomplete='on'` કેવી રીતે સમાવી શકો છો અને તે તમારા ફોર્મમાંના તમામ ઇનપુટ્સ પર લાગુ થશે. તમે દરેક ઇનપુટ માટે [autocomplete એટ્રિબ્યુટ માટે વિવિધ વેલ્યુઝ](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) પણ સેટ કરી શકો છો.

### લેબલ્સ (Labels) {#labels}

તમામ ફોર્મ કંટ્રોલના હેતુનું વર્ણન કરવા માટે લેબલ્સ પ્રદાન કરો; `for` અને `id` ને લિંક કરો:

```vue-html
<label for="name">નામ: </label>
<input type="text" name="name" id="name" v-model="name" />
```

જો તમે તમારા Chrome DevTools માં આ એલિમેન્ટનું નિરીક્ષણ કરો અને Elements ટેબની અંદર Accessibility ટેબ ખોલો, તો તમે જોશો કે ઇનપુટ તેનું નામ લેબલ પરથી કેવી રીતે મેળવે છે:

![Chrome Developer Tools showing input accessible name from label](./images/AccessibleLabelChromeDevTools.png)

:::warning ચેતવણી:
જોકે તમે આ રીતે ઇનપુટ ફીલ્ડ્સને લપેટતા લેબલ્સ જોયા હશે:

```vue-html
<label>
  નામ:
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

મેચિંગ `id` સાથે લેબલ્સને સ્પષ્ટપણે સેટ કરવું એ આસિસ્ટીવ ટેક્નોલોજી દ્વારા બહેતર સપોર્ટેડ છે.
:::

#### `aria-label` {#aria-label}

તમે [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) સાથે ઇનપુટને એક્સેસિબલ નામ પણ આપી શકો છો.

```vue-html
<label for="name">નામ: </label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```

એક્સેસિબલ નામ કેવી રીતે બદલાયું છે તે જોવા માટે Chrome DevTools માં આ એલિમેન્ટનું નિરીક્ષણ કરવા માટે નિઃસંકોચ રહો:

![Chrome Developer Tools showing input accessible name from aria-label](./images/AccessibleARIAlabelDevTools.png)

#### `aria-labelledby` {#aria-labelledby}

[`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) નો ઉપયોગ `aria-label` જેવો જ છે સિવાય કે જો લેબલ ટેક્સ્ટ સ્ક્રીન પર દેખાતી હોય તો તેનો ઉપયોગ થાય છે. તે અન્ય ઘટકો સાથે તેમના `id` દ્વારા જોડી દેવામાં આવે છે અને તમે બહુવિધ `id` ને લિંક કરી શકો છો:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">બિલિંગ</h1>
  <div class="form-item">
    <label for="name">નામ: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">સબમિટ કરો</button>
</form>
```

![Chrome Developer Tools showing input accessible name from aria-labelledby](./images/AccessibleARIAlabelledbyDevTools.png)

#### `aria-describedby` {#aria-describedby}

[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) નો ઉપયોગ `aria-labelledby` ની જેમ જ કરવામાં આવે છે, સિવાય કે તે વઘારાની માહિતી સાથેનું વર્ણન પૂરું પાડે છે જે વપરાશકર્તાને જરૂર પડી શકે છે. આનો ઉપયોગ કોઈપણ ઇનપુટ માટેના માપદંડોનું વર્ણન કરવા માટે થઈ શકે છે:

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">બિલિંગ</h1>
  <div class="form-item">
    <label for="name">પૂરું નામ: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">કૃપા કરીને પ્રથમ અને છેલ્લું નામ આપો.</p>
  </div>
  <button type="submit">સબમિટ કરો</button>
</form>
```

તમે Chrome DevTools નું નિરીક્ષણ કરીને વર્ણન જોઈ શકો છો:

![Chrome Developer Tools showing input accessible name from aria-labelledby and description with aria-describedby](./images/AccessibleARIAdescribedby.png)

### પ્લેસહોલ્ડર (Placeholder) {#placeholder}

પ્લેસહોલ્ડર્સનો ઉપયોગ કરવાનું ટાળો કારણ કે તેઓ ઘણા વપરાશકર્તાઓને મૂંઝવણમાં મૂકી શકે છે.

પ્લેસહોલ્ડર્સની એક સમસ્યા એ છે કે તેઓ મૂળભૂત રીતે [કલર કોન્ટ્રાસ્ટ માપદંડ (color contrast criteria)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) ને પૂર્ણ કરતા નથી; કલર કોન્ટ્રાસ્ટ ફિક્સ કરવાથી પ્લેસહોલ્ડર ઇનપુટ ફીલ્ડ્સમાં અગાઉથી ભરેલા ડેટા જેવો દેખાય છે. નીચેનું ઉદાહરણ જોતા, તમે જોઈ શકો છો કે છેલ્લા નામ (Last Name) નું પ્લેસહોલ્ડર જે કલર કોન્ટ્રાસ્ટ માપદંડને પૂર્ણ કરે છે તે અગાઉથી ભરેલા ડેટા જેવું લાગે છે:

![Accessible placeholder](./images/AccessiblePlaceholder.png)

```vue-html
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      type="text"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
      :placeholder="item.placeholder"
    />
  </div>
  <button type="submit">સબમિટ કરો</button>
</form>
```

```css
/* https://www.w3schools.com/howto/howto_css_placeholder.asp */

#lastName::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

#lastName:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

#lastName::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
```

વપરાશકર્તાને કોઈપણ ઇનપુટ્સની બહાર ફોર્મ ભરવા માટે જરૂરી તમામ માહિતી પ્રદાન કરવી શ્રેષ્ઠ છે.

### સૂચનાઓ (Instructions) {#instructions}

જ્યારે તમારા ઇનપુટ ફીલ્ડ્સ માટે સૂચનાઓ ઉમેરો, ત્યારે તેને ઇનપુટ સાથે યોગ્ય રીતે લિંક કરવાની ખાતરી કરો.
તમે વધારાની સૂચનાઓ આપી શકો છો અને [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) ની અંદર બહુવિધ `id` બાઈન્ડ કરી શકો છો. આ વધુ લવચીક ડિઝાઇન માટે પરવાનગી આપે છે.

```vue-html
<fieldset>
  <legend>aria-labelledby નો ઉપયોગ કરવો</legend>
  <label id="date-label" for="date">વર્તમાન તારીખ: </label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>
```

વૈકલ્પિક રીતે, તમે [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) સાથે ઇનપુટ સાથે સૂચનાઓ જોડી શકો છો:

```vue-html
<fieldset>
  <legend>aria-describedby નો ઉપયોગ કરવો</legend>
  <label id="dob" for="dob">જન્મ તારીખ: </label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

### કન્ટેન્ટ છુપાવવું (Hiding Content) {#hiding-content}

જો ઇનપુટનું એક્સેસિબલ નામ હોય તો પણ સામાન્ય રીતે લેબલ્સને વિઝ્યુઅલી છુપાવવાની ભલામણ કરવામાં આવતી નથી. જો કે, જો ઇનપુટની કાર્યક્ષમતા આસપાસના કન્ટેન્ટ સાથે સમજી શકાય છે, તો આપણે વિઝ્યુઅલ લેબલ છુપાવી શકીએ છીએ.

ચાલો આ સર્ચ ફીલ્ડ જોઈએ:

```vue-html
<form role="search">
  <label for="search" class="hidden-visually">શોધો: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">સર્ચ કરો</button>
</form>
```

આપણે આ કરી શકીએ છીએ કારણ કે સર્ચ બટન વિઝ્યુઅલ યુઝર્સને ઇનપુટ ફીલ્ડનો હેતુ ઓળખવામાં મદદ કરશે.

અમે ઘટકોને વિઝ્યુઅલી છુપાવવા માટે CSS નો ઉપયોગ કરી શકીએ છીએ પરંતુ તેમને આસિસ્ટીવ ટેક્નોલોજી માટે ઉપલબ્ધ રાખી શકીએ છીએ:

```css
.hidden-visually {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}
```

#### `aria-hidden="true"` {#aria-hidden-true}

`aria-hidden="true"` ઉમેરવાથી તે એલિમેન્ટ આસિસ્ટીવ ટેક્નોલોજીથી છુપાઈ જશે પરંતુ અન્ય વપરાશકર્તાઓ માટે વિઝ્યુઅલી ઉપલબ્ધ રહેશે. ફોકેસેબલ (focusable) એલિમેન્ટ્સ પર તેનો ઉપયોગ કરશો નહીં, માત્ર સુશોભન, ડુપ્લિકેટ અથવા ઓફસ્ક્રીન કન્ટેન્ટ પર જ તેનો ઉપયોગ કરો.

```vue-html
<p>આ સ્ક્રીન રીડર્સથી છુપાયેલું નથી.</p>
<p aria-hidden="true">આ સ્ક્રીન રીડર્સથી છુપાયેલું છે.</p>
```

### બટન્સ (Buttons) {#buttons}

જ્યારે ફોર્મની અંદર બટનોનો ઉપયોગ કરો, ત્યારે ફોર્મ સબમિટ થતું અટકાવવા માટે તમારે પ્રકાર (type) સેટ કરવો આવશ્યક છે.
તમે બટનો બનાવવા માટે ઇનપુટનો ઉપયોગ પણ કરી શકો છો:

```vue-html
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- બટન્સ -->
  <button type="button">રદ કરો</button>
  <button type="submit">સબમિટ કરો</button>

  <!-- ઇનપુટ બટન્સ -->
  <input type="button" value="રદ કરો" />
  <input type="submit" value="સબમિટ કરો" />
</form>
```

### ફંક્શનલ ઈમેજીસ (Functional Images) {#functional-images}

તમે ફંક્શનલ ઈમેજીસ બનાવવા માટે આ તકનીકનો ઉપયોગ કરી શકો છો.

- ઇનપુટ ફીલ્ડ્સ (Input fields)

  - આ છબીઓ ફોર્મ પર સબમિટ પ્રકારના બટન તરીકે કાર્ય કરશે

  ```vue-html
  <form role="search">
    <label for="search" class="hidden-visually">શોધો: </label>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="image"
      class="btnImg"
      src="https://img.icons8.com/search"
      alt="શોધો"
    />
  </form>
  ```

- ચિહ્નો (Icons)

```vue-html
<form role="search">
  <label for="searchIcon" class="hidden-visually">શોધો: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">શોધો</span>
  </button>
</form>
```

## ધોરણો (Standards) {#standards}

વર્લ્ડ વાઈડ વેબ કન્સોર્ટિયમ (W3C) વેબ એક્સેસિબિલિટી ઇનિશિયેટિવ (WAI) વિવિધ ઘટકો માટે વેબ એક્સેસિબિલિટી ધોરણો વિકસાવે છે:

- [વપરાશકર્તા એજન્ટ એક્સેસિબિલિટી માર્ગદર્શિકા (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
  - વેબ બ્રાઉઝર્સ અને મીડિયા પ્લેયર્સ, જેમાં આસિસ્ટીવ ટેક્નોલોજીના કેટલાક પાસાઓ સામેલ છે
- [ઓથરિંગ ટૂલ એક્સેસિબિલિટી માર્ગદર્શિકા (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
  - ઓથરિંગ ટૂલ્સ
- [વેબ કન્ટેન્ટ એક્સેસિબિલિટી માર્ગદર્શિકા (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  - વેબ કન્ટેન્ટ - ડેવલપર્સ, ઓથરિંગ ટૂલ્સ અને એક્સેસિબિલિટી મૂલ્યાંકન સાધનો દ્વારા ઉપયોગમાં લેવાય છે

### વેબ કન્ટેન્ટ એક્સેસિબિલિટી માર્ગદર્શિકા (WCAG) {#web-content-accessibility-guidelines-wcag}

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) એ [WCAG 2.0](https://www.w3.org/TR/WCAG20/) પર વિસ્તરે છે અને વેબ પરના ફેરફારોને સંબોધીને નવી ટેકનોલોજીના અમલીકરણની મંજૂરી આપે છે. W3C વેબ એક્સેસિબિલિટી પોલિસી વિકસાવતી વખતે અથવા અપડેટ કરતી વખતે WCAG ના અત્યંત વર્તમાન સંસ્કરણના ઉપયોગને પ્રોત્સાહિત કરે છે.

#### WCAG 2.1 ચાર મુખ્ય માર્ગદર્શક સિદ્ધાંતો (POUR તરીકે સંક્ષિપ્ત): {#wcag-2-1-four-main-guiding-principles-abbreviated-as-pour}

- [Perceivable](https://www.w3.org/TR/WCAG21/#perceivable)
  - વપરાશકર્તાઓ પ્રસ્તુત કરવામાં આવતી માહિતીને સમજવા માટે સક્ષમ હોવા જોઈએ
- [Operable](https://www.w3.org/TR/WCAG21/#operable)
  - ઇન્ટરફેસ ફોર્મ્સ, કંટ્રોલ અને નેવિગેશન ઓપરેબલ છે
- [Understandable](https://www.w3.org/TR/WCAG21/#understandable)
  - માહિતી અને વપરાશકર્તા ઇન્ટરફેસનું સંચાલન તમામ વપરાશકર્તાઓ માટે સમજી શકાય તેવું હોવું જોઈએ
- [Robust](https://www.w3.org/TR/WCAG21/#robust)
  - જેમ જેમ ટેકનોલોજી આગળ વધે તેમ વપરાશકર્તાઓ કન્ટેન્ટને એક્સેસ કરવા સક્ષમ હોવા જોઈએ

#### વેબ એક્સેસિબિલિટી ઇનિશિયેટિવ – એક્સેસિબલ રિચ ઇન્ટરનેટ એપ્લિકેશન્સ (WAI-ARIA) {#web-accessibility-initiative-–-accessible-rich-internet-applications-wai-aria}

W3C નું WAI-ARIA ગતિશીલ કન્ટેન્ટ અને અદ્યતન વપરાશકર્તા ઇન્ટરફેસ કંટ્રોલ્સ કેવી રીતે બનાવવા તે અંગે માર્ગદર્શન પૂરું પાડે છે.

- [એક્સેસિબલ રિચ ઇન્ટરનેટ એપ્લિકેશન્સ (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

## સંસાધનો (Resources) {#resources}

### દસ્તાવેજીકરણ (Documentation) {#documentation}

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [એક્સેસિબલ રિચ ઇન્ટરનેટ એપ્લિકેશન્સ (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

### આસિસ્ટીવ ટેક્નોલોજીઓ (Assistive Technologies) {#assistive-technologies}

- સ્ક્રીન રીડર્સ (Screen Readers)
  - [NVDA](https://www.nvaccess.org/download/)
  - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
  - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
- ઝૂમિંગ સાધનો
  - [MAGic](https://www.freedomscientific.com/products/software/magic/)
  - [ZoomText](https://www.freedomscientific.com/products/software/zoomtext/)
  - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

### ટેસ્ટિંગ {#testing}

- ઓટોમેટેડ ટુલ્સ
  - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
  - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- રંગ સાધનો (Color Tools)
  - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
  - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- અન્ય મદદરૂપ સાધનો
  - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en…)
  - [Color Oracle](https://colororacle.org)
  - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US…)
  - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=en-US)
  - [Silktide સાઇટ એક્સેસિબિલિટી સિમ્યુલેટર](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

### વપરાશકર્તાઓ (Users) {#users}

વર્લ્ડ હેલ્થ ઓર્ગેનાઈઝેશન અંદાજે છે કે વિશ્વની ૧૫% વસ્તી કોઈને કોઈ પ્રકારની અપંગતા ધરાવે છે, જેમાંથી ૨-૪% ગંભીર રીતે છે. તે વિશ્વભરમાં અંદાજિત ૧ અબજ લોકો છે; જે વિકલાંગ લોકોને વિશ્વનું સૌથી મોટું લઘુમતી જૂથ બનાવે છે.

ત્યાં વિકલાંગતાની વિશાળ શ્રેણી છે, જે આશરે ચાર શ્રેણીઓમાં વિભાજિત કરી શકાય છે:

- _[Visual](https://webaim.org/articles/visual/)_ - આ વપરાશકર્તાઓ સ્ક્રીન રીડર્સ, સ્ક્રીન મેગ્નિફિકેશન, સ્ક્રીન કોન્ટ્રાસ્ટ કન્ટ્રોલ કરવા અથવા બ્રેઇલ ડિસ્પ્લેના ઉપયોગથી લાભ મેળવી શકે છે.
- _[Auditory](https://webaim.org/articles/auditory/)_ - આ વપરાશકર્તાઓ કેપ્શનિંગ, ટ્રાન્સક્રિપ્ટ્સ અથવા સંકેત ભાષા વિડિઓથી લાભ મેળવી શકે છે.
- _[Motor](https://webaim.org/articles/motor/)_ - આ વપરાશકર્તાઓ [મોટર ક્ષતિઓ માટે આસિસ્ટીવ ટેક્નોલોજી (assistive technologies for motor impairments)](https://webaim.org/articles/motor/assistive) ની શ્રેણીથી લાભ મેળવી શકે છે: વોઈસ રેકગ્નિશન સોફ્ટવેર, આઈ ટ્રેકિંગ, સિંગલ-સ્વીચ એક્સેસ, હેડ વાન્ડ, સીપ એન્ડ પફ સ્વીચ, ઓવરસાઈઝ્ડ ટ્રેકબોલ માઉસ, એડેપ્ટિવ કીબોર્ડ અથવા અન્ય આસિસ્ટીવ ટેક્નોલોજીઓ.
- _[Cognitive](https://webaim.org/articles/cognitive/)_ - આ વપરાશકર્તાઓ પૂરક મીડિયા (supplemental media), કન્ટેન્ટનું માળખાકીય સંગઠન, સ્પષ્ટ અને સરળ લેખનથી લાભ મેળવી શકે છે.

વપરાશકર્તાઓ પાસેથી સમજવા માટે WebAim ની નીચેની લિંક્સ તપાસો:

- [વેબ એક્સેસિબિલિટી પરિપ્રેક્ષ્ય: દરેક માટે અસર અને લાભોનું અન્વેષણ કરો](https://www.w3.org/WAI/perspective-videos/)
- [વેબ વપરાશકર્તાઓની વાર્તાઓ](https://www.w3.org/WAI/people-use-web/user-stories/)
