# યુટિલિટી ટાઇપ્સ (Utility Types) {#utility-types}

:::info
આ પેજ ફક્ત થોડા સામાન્ય રીતે ઉપયોગમાં લેવાતા utility types ને list કરે છે જેમના ઉપયોગ માટે સમજૂતીની જરૂર પડી શકે. Exported types ની સંપૂર્ણ list માટે, [source code](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131) જુઓ.
:::

## PropType\<T> {#proptype-t}

Runtime props declarations ઉપયોગ કરતી વખતે prop ને વધુ advanced types સાથે annotate કરવા માટે ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // `Object` ને વધુ ચોક્કસ type provide કરો
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **આ પણ જુઓ** [ગાઇડ - ઘટક Props ટાઇપ કરવા](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

- માત્ર 3.3+ માં સપોર્ટેડ

`T | Ref<T>` માટે Alias. [Composables](/guide/reusability/composables.html) ના arguments annotate કરવા માટે ઉપયોગી.

## MaybeRefOrGetter\<T> {#maybereforgetter}

- માત્ર 3.3+ માં સપોર્ટેડ

`T | Ref<T> | (() => T)` માટે Alias. [Composables](/guide/reusability/composables.html) ના arguments annotate કરવા માટે ઉપયોગી.

## ExtractPropTypes\<T> {#extractproptypes}

Runtime props options object માંથી prop types extract કરો. Extracted types internal facing છે - i.e. ઘટક દ્વારા received resolved props. આનો અર્થ એ છે કે boolean props અને default values ધરાવતા props હંમેશા defined છે, ભલે તેઓ required ન હોય.

Public facing props extract કરવા, i.e. parent ને pass કરવાની મંજૂરી હોય તેવા props, [`ExtractPublicPropTypes`](#extractpublicproptypes) ઉપયોગ કરો.

- **ઉદાહરણ (Example)**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

- માત્ર 3.3+ માં સપોર્ટેડ

Runtime props options object માંથી prop types extract કરો. Extracted types public facing છે - i.e. parent ને pass કરવાની મંજૂરી હોય તેવા props.

- **ઉદાહરણ (Example)**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

Custom global properties ને support કરવા માટે ઘટક ઇન્સ્ટન્સ type ને augment કરવા ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  Augmentations module `.ts` અથવા `.d.ts` file માં placed હોવા જોઈએ. વધુ વિગત માટે [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) જુઓ.
  :::

- **આ પણ જુઓ** [ગાઇડ - ગ્લોબલ Properties Augment કરવી](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

Custom options ને support કરવા માટે ઘટક options type ને augment કરવા ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Augmentations module `.ts` અથવા `.d.ts` file માં placed હોવા જોઈએ. વધુ વિગત માટે [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) જુઓ.
  :::

- **આ પણ જુઓ** [ગાઇડ - Custom Options Augment કરવી](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

TSX elements પર non-declared props ઉપયોગ કરવા માટે allowed TSX props ને augment કરવા ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // હવે કામ કરે છે ભલે hello declared prop ન હોય
  <MyComponent hello="world" />
  ```

  :::tip
  Augmentations module `.ts` અથવા `.d.ts` file માં placed હોવા જોઈએ. વધુ વિગત માટે [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) જુઓ.
  :::

## CSSProperties {#cssproperties}

Style property bindings માં allowed values ને augment કરવા ઉપયોગ થાય છે.

- **ઉદાહરણ (Example)**

  કોઈપણ custom CSS property ની મંજૂરી આપો

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip
Augmentations module `.ts` અથવા `.d.ts` file માં placed હોવા જોઈએ. વધુ વિગત માટે [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties) જુઓ.
:::

:::info આ પણ જુઓ
SFC `<style>` tags `v-bind` CSS function ઉપયોગ કરીને CSS values ને dynamic component state સાથે link કરવાને support કરે છે. આ type augmentation વિના custom properties ની મંજૂરી આપે છે.

- [CSS માં v-bind()](/api/sfc-css-features#v-bind-in-css)
  :::
