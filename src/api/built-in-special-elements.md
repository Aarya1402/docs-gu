# બિલ્ટ-ઇન ખાસ એલિમેન્ટ્સ (Built-in Special Elements) {#built-in-special-elements}

:::info ઘટકો નથી (Not Components)
`<component>`, `<slot>` અને `<template>` ઘટક-જેવી સુવિધાઓ છે અને template syntax નો ભાગ છે. તેઓ સાચા ઘટકો નથી અને template compilation દરમિયાન compiled away થાય છે. તેથી, templates માં તેઓ પરંપરાગત રીતે lowercase માં લખવામાં આવે છે.
:::

## `<component>` {#component}

ડાયનેમિક ઘટકો અથવા elements રેન્ડર કરવા માટેનો "meta component".

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **વિગત (Details)**

  રેન્ડર કરવાનો વાસ્તવિક ઘટક `is` prop દ્વારા નિર્ધારિત થાય છે.

  - જ્યારે `is` string હોય, ત્યારે તે HTML tag name અથવા ઘટકનું registered name હોઈ શકે.

  - વૈકલ્પિક રીતે, `is` ને ઘટકની definition સાથે સીધું bind પણ કરી શકાય.

- **ઉદાહરણ (Example)**

  Registered name દ્વારા ઘટકો રેન્ડર કરવા (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  Definition દ્વારા ઘટકો રેન્ડર કરવા (Composition API with `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  HTML elements રેન્ડર કરવા:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  [બિલ્ટ-ઇન ઘટકો](./built-in-components) ને બધા `is` ને પાસ કરી શકાય, પરંતુ જો તમે તેમને name દ્વારા પાસ કરવા માંગો તો તમારે તેમને register કરવા પડશે. ઉદાહરણ તરીકે:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  જો તમે ઘટકને તેના name ના બદલે ઘટક પોતે `is` ને પાસ કરો, તો registration જરૂરી નથી, દા.ત. `<script setup>` માં.

  જો `<component>` ટેગ પર `v-model` ઉપયોગ કરવામાં આવે, તો template compiler તેને `modelValue` prop અને `update:modelValue` event listener માં expand કરશે, જેમ કે અન્ય કોઈપણ ઘટક માટે કરે. જો કે, આ native HTML elements, જેમ કે `<input>` અથવા `<select>` સાથે compatible નહીં હોય. પરિણામે, dynamically બનાવેલા native element સાથે `v-model` ઉપયોગ કરવું કામ નહીં કરે:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- આ કામ નહીં કરે કારણ કે 'input' native HTML element છે -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  વ્યવહારમાં, આ edge case સામાન્ય નથી કારણ કે native form fields સામાન્ય રીતે વાસ્તવિક applications માં ઘટકોમાં wrapped હોય છે. જો તમારે native element ને direct ઉપયોગ કરવાની જરૂર હોય, તમે `v-model` ને attribute અને event માં manually split કરી શકો.

- **આ પણ જુઓ** [ડાયનેમિક કમ્પોનન્ટ્સ](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

Templates માં slot content outlets દર્શાવે છે.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * <slot> ને પાસ કરેલા કોઈપણ props scoped slots માટે
     * arguments તરીકે પાસ થાય
     */
    [key: string]: any
    /**
     * Slot name સ્પષ્ટ કરવા માટે reserved.
     */
    name?: string
  }
  ```

- **વિગત (Details)**

  `<slot>` element slot name સ્પષ્ટ કરવા માટે `name` attribute ઉપયોગ કરી શકે. કોઈ `name` સ્પષ્ટ ન હોય ત્યારે, default slot રેન્ડર થશે. Slot element ને પાસ કરેલા વધારાના attributes parent માં defined scoped slot ને slot props તરીકે પાસ થશે.

  Element પોતે તેના matched slot content દ્વારા replaced થશે.

  Vue templates માં `<slot>` elements JavaScript માં compile થાય છે, તેથી તેમને [native `<slot>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) સાથે ભેળસેળ ન કરવી.

- **આ પણ જુઓ** [ઘટક - Slots](/guide/components/slots)

## `<template>` {#template}

`<template>` ટેગનો ઉપયોગ placeholder તરીકે થાય છે જ્યારે આપણે DOM માં element રેન્ડર કર્યા વિના built-in directive ઉપયોગ કરવા માંગીએ.

- **વિગત (Details)**

  `<template>` માટે ખાસ handling ફક્ત ત્યારે જ trigger થાય છે જ્યારે તે આ directives માંથી કોઈ એક સાથે ઉપયોગ થાય:

  - `v-if`, `v-else-if`, અથવા `v-else`
  - `v-for`
  - `v-slot`

  જો આ directives માંથી કોઈ હાજર ન હોય તો તે [native `<template>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) તરીકે રેન્ડર થશે.

  `v-for` ધરાવતા `<template>` ને [`key` attribute](/api/built-in-special-attributes#key) પણ હોઈ શકે. અન્ય તમામ attributes અને directives ને discard કરવામાં આવશે, કારણ કે corresponding element વિના તેઓ અર્થપૂર્ણ નથી.

  Single-file components સમગ્ર template ને wrap કરવા માટે [top-level `<template>` tag](/api/sfc-spec#language-blocks) ઉપયોગ કરે છે. તે ઉપયોગ ઉપર વર્ણવેલા `<template>` ના ઉપયોગથી અલગ છે. તે top-level tag template નો ભાગ નથી અને directives જેવા template syntax ને support કરતો નથી.

- **આ પણ જુઓ**
  - [ગાઇડ - `<template>` પર `v-if`](/guide/essentials/conditional#v-if-on-template)
  - [ગાઇડ - `<template>` પર `v-for`](/guide/essentials/list#v-for-on-template)
  - [ગાઇડ - Named slots](/guide/components/slots#named-slots)
