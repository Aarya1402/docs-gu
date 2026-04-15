# ઓપ્શન્સ: વિવિધ (Options: Misc) {#options-misc}

## name {#name}

ઘટક માટે display name સ્પષ્ટ રીતે declare કરો.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **વિગત (Details)**

  ઘટકનું name નીચેના માટે ઉપયોગ થાય છે:

  - ઘટકના પોતાના template માં recursive self-reference
  - Vue DevTools ના component inspection tree માં display
  - Warning component traces માં display

  જ્યારે તમે Single-File Components ઉપયોગ કરો છો, ત્યારે ઘટક પહેલેથી જ filename માંથી પોતાનું name infer કરે છે. ઉદાહરણ તરીકે, `MyComponent.vue` નામની file ના inferred display name "MyComponent" હશે.

  બીજો case એ છે કે જ્યારે ઘટક [`app.component`](/api/application#app-component) સાથે globally register થાય, ત્યારે global ID આપમેળે તેના name તરીકે set થાય છે.

  `name` ઓપ્શન inferred name ને override કરવાની, અથવા જ્યારે કોઈ name infer ન થઈ શકે (દા.ત. build tools ઉપયોગ ન કરતી વખતે, અથવા inlined non-SFC ઘટક) ત્યારે explicitly name provide કરવાની મંજૂરી આપે છે.

  એક case છે જ્યાં `name` explicitly જરૂરી છે: [`<KeepAlive>`](/guide/built-ins/keep-alive) ના `include / exclude` props દ્વારા cacheable components સાથે match કરતી વખતે.

  :::tip
  Version 3.2.34 થી, `<script setup>` ઉપયોગ કરતું single-file component filename ના આધારે આપમેળે તેનો `name` ઓપ્શન infer કરશે, `<KeepAlive>` સાથે ઉપયોગ કરતી વખતે પણ manually name declare કરવાની જરૂર દૂર કરે છે.
  :::

## inheritAttrs {#inheritattrs}

Default component attribute fallthrough behavior સક્ષમ કરવી કે નહીં તે નિયંત્રિત કરે છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // default: true
  }
  ```

- **વિગત (Details)**

  ડિફોલ્ટ રૂપે, parent scope attribute bindings જે props તરીકે ઓળખાતા નથી તે "fallthrough" થશે. આનો અર્થ એ છે કે single-root ઘટક હોય ત્યારે, આ bindings child ઘટકના root element પર સામાન્ય HTML attributes તરીકે apply થશે. જ્યારે target element અથવા અન્ય ઘટકને wrap કરતો ઘટક author કરો, ત્યારે આ હંમેશા ઇચ્છિત વર્તણૂક ન હોઈ શકે. `inheritAttrs` ને `false` પર set કરીને, આ default behavior અક્ષમ (disabled) કરી શકાય. Attributes `$attrs` instance property દ્વારા ઉપલબ્ધ છે અને `v-bind` ઉપયોગ કરીને non-root element ને explicitly bind કરી શકાય.

- **ઉદાહરણ (Example)**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  `<script setup>` ઉપયોગ કરતા ઘટકમાં આ ઓપ્શન declare કરતી વખતે, [`defineOptions`](/api/sfc-script-setup#defineoptions) macro ઉપયોગ કરી શકો:

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **આ પણ જુઓ**

  - [Fallthrough Attributes](/guide/components/attrs)
  <div class="composition-api">

  - [સામાન્ય `<script>` માં `inheritAttrs` ઉપયોગ કરવું](/api/sfc-script-setup.html#usage-alongside-normal-script)
  </div>

## components {#components}

ઘટક ઇન્સ્ટન્સ માટે ઉપલબ્ધ કરવા registers ઘટકોનો ઓબ્જેક્ટ.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // shorthand
      Foo,
      // અલગ name હેઠળ register કરો
      RenamedBar: Bar
    }
  }
  ```

- **આ પણ જુઓ** [ઘટક રજિસ્ટ્રેશન (Component Registration)](/guide/components/registration)

## directives {#directives}

ઘટક ઇન્સ્ટન્સ માટે ઉપલબ્ધ કરવા directives registers કરતો ઓબ્જેક્ટ.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  export default {
    directives: {
      // template માં v-focus સક્ષમ કરે છે
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

- **આ પણ જુઓ** [કસ્ટમ ડિરેક્ટિવ્સ](/guide/reusability/custom-directives)
