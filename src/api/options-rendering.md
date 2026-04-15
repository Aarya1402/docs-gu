# ઓપ્શન્સ: રેન્ડરિંગ (Options: Rendering) {#options-rendering}

## template {#template}

ઘટક માટે સ્ટ્રિંગ ટેમ્પ્લેટ.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **વિગત (Details)**

  `template` ઓપ્શન દ્વારા પ્રદાન કરેલું ટેમ્પ્લેટ runtime માં on-the-fly કમ્પાઇલ થશે. તે ફક્ત Vue ના એવા build ઉપયોગ કરતી વખતે જ સપોર્ટેડ છે જેમાં template compiler સામેલ હોય. Template compiler Vue ના એવા builds માં સામેલ **નથી** જેમના નામમાં `runtime` શબ્દ હોય, દા.ત. `vue.runtime.esm-bundler.js`. વિવિધ builds વિશે વધુ વિગત માટે [dist file guide](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) જુઓ.

  જો સ્ટ્રિંગ `#` થી શરૂ થાય તો તેને `querySelector` તરીકે ઉપયોગ કરવામાં આવશે અને પસંદ કરેલા element ના `innerHTML` ને template string તરીકે ઉપયોગ કરશે. આ source template ને native `<template>` elements ઉપયોગ કરીને લખવાની મંજૂરી આપે છે.

  જો સમાન ઘટકમાં `render` ઓપ્શન પણ હાજર હોય, તો `template` અવગણવામાં આવશે.

  જો તમારી એપ્લિકેશનના root component માં `template` કે `render` ઓપ્શન સ્પષ્ટ ન હોય, તો Vue mounted element ના `innerHTML` ને template તરીકે ઉપયોગ કરવાનો પ્રયાસ કરશે.

  :::warning સુરક્ષા નોંધ (Security Note)
  ફક્ત તે template sources ઉપયોગ કરો જેના પર તમે વિશ્વાસ કરી શકો. user દ્વારા પ્રદાન કરેલ content ને તમારા template તરીકે ઉપયોગ ન કરો. વધુ વિગત માટે [સુરક્ષા ગાઇડ](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates) જુઓ.
  :::

## render {#render}

એક ફંક્શન જે ઘટકના virtual DOM tree ને programmatically રિટર્ન કરે છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **વિગત (Details)**

  `render` string templates નો વિકલ્પ છે જે તમને ઘટકના render output ને declare કરવા માટે JavaScript ની સંપૂર્ણ programmatic શક્તિનો લાભ લેવાની મંજૂરી આપે છે.

  પ્રી-કમ્પાઇલ્ડ templates, ઉદાહરણ તરીકે Single-File Components માં, build time માં `render` ઓપ્શનમાં compile થાય છે. જો ઘટકમાં `render` અને `template` બંને હાજર હોય, તો `render` ને ઉચ્ચ પ્રાથમિકતા મળશે.

- **આ પણ જુઓ**
  - [રેન્ડરિંગ મિકેનિઝમ](/guide/extras/rendering-mechanism)
  - [રેન્ડર ફંક્શન્સ](/guide/extras/render-function)

## compilerOptions {#compileroptions}

ઘટકના template માટે runtime compiler ઓપ્શન્સ configure કરો.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // default: 'condense'
      delimiters?: [string, string] // default: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **વિગત (Details)**

  આ config ઓપ્શન ફક્ત ત્યારે જ માન્ય છે જ્યારે full build (i.e. standalone `vue.js` જે browser માં templates compile કરી શકે) ઉપયોગ કરો. તે app-level [app.config.compilerOptions](/api/application#app-config-compileroptions) જેવા જ ઓપ્શન્સ ને support કરે છે, અને વર્તમાન ઘટક માટે ઉચ્ચ પ્રાથમિકતા ધરાવે છે.

- **આ પણ જુઓ** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## slots<sup class="vt-badge ts"/> {#slots}

- માત્ર 3.3+ માં સપોર્ટેડ

render functions માં programmatically slots ઉપયોગ કરતી વખતે type inference માં સહાય કરવા માટેનો ઓપ્શન.

- **વિગત (Details)**

  આ ઓપ્શનની runtime value ઉપયોગ થતી નથી. વાસ્તવિક types `SlotsType` type helper ઉપયોગ કરીને type casting દ્વારા declare થવા જોઈએ:

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
