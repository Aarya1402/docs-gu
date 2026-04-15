# કસ્ટમ એલિમેન્ટ્સ API (Custom Elements API) {#custom-elements-api}

## defineCustomElement() {#definecustomelement}

આ મેથડ [`defineComponent`](#definecomponent) જેવો જ આર્ગ્યુમેન્ટ સ્વીકારે છે, પરંતુ તેના બદલે નેટિવ [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) ક્લાસ constructor રિટર્ન કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & CustomElementsOptions)
      | ComponentOptions['setup'],
    options?: CustomElementsOptions
  ): {
    new (props?: object): HTMLElement
  }

  interface CustomElementsOptions {
    styles?: string[]

    // નીચેના ઓપ્શન્સ 3.5+ છે
    configureApp?: (app: App) => void
    shadowRoot?: boolean
    nonce?: string
  }
  ```

  > વાંચવાની સરળતા માટે ટાઇપ સરળ કરવામાં આવ્યો છે.

- **વિગત (Details)**

  સામાન્ય ઘટક ઓપ્શન્સ ઉપરાંત, `defineCustomElement()` કેટલાક ઓપ્શન્સ પણ સપોર્ટ કરે છે જે custom-elements-specific છે:

  - **`styles`**: એલિમેન્ટના shadow root માં inject કરવા જોઈએ તેવી CSS પ્રદાન કરવા માટે inlined CSS strings ની array.

  - **`configureApp`** <sup class="vt-badge" data-text="3.5+"/>: એક ફંક્શન જેનો ઉપયોગ custom element માટે Vue app instance કોન્ફિગર કરવા માટે કરી શકાય.

  - **`shadowRoot`** <sup class="vt-badge" data-text="3.5+"/>: `boolean`, ડિફોલ્ટ `true`. shadow root વિના custom element રેન્ડર કરવા `false` પર સેટ કરો. આનો અર્થ એ છે કે custom element SFC માં `<style>` હવે encapsulated નહીં થાય.

  - **`nonce`** <sup class="vt-badge" data-text="3.5+"/>: `string`, જો પ્રદાન કરવામાં આવે, તો shadow root માં inject થયેલા style tags પર `nonce` attribute તરીકે સેટ થશે.

  નોંધ કરો કે આ ઓપ્શન્સ ઘટકના ભાગ તરીકે પાસ કરવા ના બદલે, બીજા આર્ગ્યુમેન્ટ દ્વારા પણ પાસ કરી શકાય:

  ```js
  import Element from './MyElement.ce.vue'

  defineCustomElement(Element, {
    configureApp(app) {
      // ...
    }
  })
  ```

  રિટર્ન વેલ્યુ એક custom element constructor છે જેને [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) ઉપયોગ કરીને રજિસ્ટર કરી શકાય.

- **ઉદાહરણ (Example)**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* ઘટક ઓપ્શન્સ */
  })

  // Custom element રજિસ્ટર કરો.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **આ પણ જુઓ**

  - [ગાઇડ - Vue સાથે Custom Elements બનાવવા](/guide/extras/web-components#building-custom-elements-with-vue)

  - એ પણ નોંધ કરો કે Single-File Components સાથે ઉપયોગ કરતી વખતે `defineCustomElement()` ને [ખાસ config](/guide/extras/web-components#sfc-as-custom-element) ની જરૂર છે.

## useHost() <sup class="vt-badge" data-text="3.5+"/> {#usehost}

Composition API હેલ્પર જે વર્તમાન Vue custom element ના host element ને રિટર્ન કરે છે.

## useShadowRoot() <sup class="vt-badge" data-text="3.5+"/> {#useshadowroot}

Composition API હેલ્પર જે વર્તમાન Vue custom element ના shadow root ને રિટર્ન કરે છે.

## this.$host <sup class="vt-badge" data-text="3.5+"/> {#this-host}

Options API પ્રોપર્ટી જે વર્તમાન Vue custom element ના host element ને expose કરે છે.
