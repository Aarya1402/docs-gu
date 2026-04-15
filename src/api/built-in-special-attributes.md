# બિલ્ટ-ઇન ખાસ એટ્રિબ્યુટ્સ (Built-in Special Attributes) {#built-in-special-attributes}

## key {#key}

`key` ખાસ એટ્રિબ્યુટનો ઉપયોગ મુખ્યત્વે Vue ના virtual DOM algorithm માટે સંકેત (hint) તરીકે થાય છે જેથી જૂની list સામે નવી list ના nodes ને diffing કરતી વખતે vnodes ઓળખી શકાય.

- **અપેક્ષિત (Expects):** `number | string | symbol`

- **વિગત (Details)**

  keys વિના, Vue એલ્ગોરિધમ ઉપયોગ કરે છે જે element ની ગતિ (movement) ને ઓછી કરે છે અને શક્ય તેટલા સમાન ટાઇપના elements ને in-place patch/reuse કરવાનો પ્રયાસ કરે છે. keys સાથે, તે keys ના ક્રમ ફેરફાર (order change) ના આધારે elements ને ફરીથી ક્રમબદ્ધ કરશે, અને જે keys હવે હાજર નથી તે elements ને હંમેશા દૂર / નષ્ટ (removed / destroyed) કરવામાં આવશે.

  સમાન સામાન્ય પેરેન્ટના children ની **અનન્ય (unique) keys** હોવી આવશ્યક છે. ડુપ્લિકેટ keys રેન્ડર errors નું કારણ બનશે.

  `v-for` સાથે સંયોજનમાં સૌથી સામાન્ય ઉપયોગ:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  reuse ના બદલે element/component ને replace (ફરજિયાત બદલવા) માટે પણ ઉપયોગ કરી શકાય. જ્યારે તમે આ કરવા માંગો ત્યારે ઉપયોગી:

  - ઘટકના lifecycle hooks ને યોગ્ય રીતે trigger કરવા
  - Transitions trigger કરવા

  ઉદાહરણ તરીકે:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  જ્યારે `text` બદલાય는, `<span>` ને patch ના બદલે હંમેશા replace કરવામાં આવશે, તેથી transition trigger થશે.

- **આ પણ જુઓ** [ગાઇડ - લિસ્ટ રેન્ડરિંગ - `key` સાથે State જાળવવી](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

[ટેમ્પ્લેટ ref](/guide/essentials/template-refs) દર્શાવે છે.

- **અપેક્ષિત (Expects):** `string | Function`

- **વિગત (Details)**

  `ref` નો ઉપયોગ element અથવા child component ના reference રજિસ્ટર કરવા માટે થાય છે.

  Options API માં, reference ઘટકના `this.$refs` ઓબ્જેક્ટ હેઠળ રજિસ્ટર થશે:

  ```vue-html
  <!-- this.$refs.p તરીકે સંગ્રહિત -->
  <p ref="p">hello</p>
  ```

  Composition API માં, reference મેળ ખાતા નામ સાથેના ref માં સંગ્રહિત (stored) થશે:

  ```vue
  <script setup>
  import { useTemplateRef } from 'vue'

  const pRef = useTemplateRef('p')
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  જો plain DOM element પર ઉપયોગ કરવામાં આવે, તો reference તે element હશે; જો child component પર ઉપયોગ કરવામાં આવે, તો reference child component ઇન્સ્ટન્સ હશે.

  વૈકલ્પિક રીતે `ref` ફંક્શન વેલ્યુ સ્વીકારી શકે છે જે reference ક્યાં store કરવો તેના પર પૂર્ણ નિયંત્રણ આપે છે:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  ref registration timing વિશે મહત્વની નોંધ: કારણ કે refs પોતે render function ના પરિણામ તરીકે બનાવવામાં આવે છે, તમારે ઘટક mounted થાય ત્યાં સુધી રાહ જોવી પડશે તેમને access કરતા પહેલા.

  `this.$refs` non-reactive પણ છે, તેથી તમારે ટેમ્પ્લેટ્સમાં data-binding માટે તેનો ઉપયોગ કરવાનો પ્રયાસ ન કરવો જોઈએ.

- **આ પણ જુઓ**
  - [ગાઇડ - ટેમ્પ્લેટ Refs](/guide/essentials/template-refs)
  - [ગાઇડ - ટેમ્પ્લેટ Refs ટાઇપ કરવા](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [ગાઇડ - ઘટક ટેમ્પ્લેટ Refs ટાઇપ કરવા](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

[ડાયનેમિક કમ્પોનન્ટ્સ](/guide/essentials/component-basics#dynamic-components) બાઇન્ડ કરવા માટે ઉપયોગ થાય છે.

- **અપેક્ષિત (Expects):** `string | Component`

- **નેટિવ elements પર ઉપયોગ (Usage on native elements)**
 
  - માત્ર 3.1+ માં સપોર્ટેડ

  જ્યારે `is` એટ્રિબ્યુટ નેટિવ HTML element પર ઉપયોગ થાય છે, ત્યારે તેને [Customized built-in element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) તરીકે interpret કરવામાં આવશે, જે નેટિવ web platform feature છે.

  જો કે, એક use case છે જ્યાં તમને Vue ને નેટિવ element ને Vue component સાથે replace કરવાની જરૂર પડી શકે, જેમ [in-DOM ટેમ્પ્લેટ Parsing ચેતવણીઓ](/guide/essentials/component-basics#in-dom-template-parsing-caveats) માં સમજાવ્યું છે. તમે `is` એટ્રિબ્યુટ ની વેલ્યુ `vue:` સાથે prefix કરી શકો જેથી Vue element ને Vue component તરીકે રેન્ડર કરે:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **આ પણ જુઓ**

  - [બિલ્ટ-ઇન ખાસ એલિમેન્ટ - `<component>`](/api/built-in-special-elements#component)
  - [ડાયનેમિક કમ્પોનન્ટ્સ](/guide/essentials/component-basics#dynamic-components)
