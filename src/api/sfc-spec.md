# SFC Syntax Specification {#sfc-syntax-specification}

## ઓવરવ્યુ (Overview) {#overview}

Vue Single-File Component (SFC), પરંપરાગત રીતે `*.vue` file extension ઉપયોગ કરે, તે કસ્ટમ file format છે જે Vue ઘટકનું વર્ણન કરવા HTML-જેવા syntax ઉપયોગ કરે છે. Vue SFC syntactically HTML સાથે compatible છે.

દરેક `*.vue` file ત્રણ ટાઇપના top-level language blocks ધરાવે છે: `<template>`, `<script>`, અને `<style>`, અને વૈકલ્પિક રીતે વધારાના custom blocks:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

## Language Blocks {#language-blocks}

### `<template>` {#template}

- દરેક `*.vue` file વધુમાં વધુ એક top-level `<template>` block ધરાવી શકે.

- Contents extract થશે અને `@vue/compiler-dom` ને pass થશે, JavaScript render functions માં pre-compile થશે, અને exported ઘટક ને તેના `render` ઓપ્શન તરીકે attach થશે.

### `<script>` {#script}

- દરેક `*.vue` file વધુમાં વધુ એક `<script>` block ધરાવી શકે ([`<script setup>`](/api/sfc-script-setup) ને બાદ કરતા).

- Script ES Module તરીકે execute થાય છે.

- **default export** Vue component options object હોવું જોઈએ, ક્યાં તો plain object તરીકે અથવા [defineComponent](/api/general#definecomponent) ની return value તરીકે.

### `<script setup>` {#script-setup}

- દરેક `*.vue` file વધુમાં વધુ એક `<script setup>` block ધરાવી શકે (normal `<script>` ને બાદ કરતા).

- Script pre-process થાય છે અને ઘટકના `setup()` function તરીકે ઉપયોગ થાય છે, જેનો અર્થ છે કે તે **ઘટકના દરેક instance માટે** execute થશે. `<script setup>` માં top-level bindings આપમેળે template ને expose થાય છે. વધુ વિગત માટે, [`<script setup>` પર dedicated documentation](/api/sfc-script-setup) જુઓ.

### `<style>` {#style}

- એક `*.vue` file બહુવિધ `<style>` tags ધરાવી શકે.

- `<style>` tag વર્તમાન ઘટક સુધી styles ને encapsulate કરવામાં મદદ કરવા `scoped` અથવા `module` attributes ધરાવી શકે (વધુ વિગત માટે [SFC Style Features](/api/sfc-css-features) જુઓ). વિવિધ encapsulation modes ધરાવતા અનેક `<style>` tags સમાન ઘટકમાં mix કરી શકાય.

### Custom Blocks {#custom-blocks}

કોઈપણ project-specific જરૂરિયાતો માટે `*.vue` file માં વધારાના custom blocks સામેલ કરી શકાય, ઉદાહરણ તરીકે `<docs>` block. Custom blocks ના કેટલાક real-world ઉદાહરણો:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#i18n-custom-block)

Custom Blocks ની handling tooling પર આધાર રાખે - જો તમે તમારા પોતાના custom block integrations બનાવવા માંગો, તો વધુ વિગત માટે [SFC custom block integrations tooling section](/guide/scaling-up/tooling#sfc-custom-block-integrations) જુઓ.

## ઓટોમેટિક Name Inference {#automatic-name-inference}

SFC નીચેના cases માં તેના **filename** માંથી ઘટકનું name આપમેળે infer કરે છે:

- Dev warning formatting
- DevTools inspection
- Recursive self-reference, દા.ત. `FooBar.vue` નામની file તેના template માં `<FooBar/>` તરીકે પોતાનો reference કરી શકે. explicitly registered/imported ઘટકો કરતા આ ઓછી priority ધરાવે.

## Pre-Processors {#pre-processors}

Blocks `lang` attribute ઉપયોગ કરીને pre-processor languages declare કરી શકે. સૌથી સામાન્ય case `<script>` block માટે TypeScript ઉપયોગ કરવો:

```vue-html
<script lang="ts">
  // TypeScript ઉપયોગ કરો
</script>
```

`lang` કોઈપણ block પર apply કરી શકાય - ઉદાહરણ તરીકે `<style>` ને [Sass](https://sass-lang.com/) સાથે અને `<template>` ને [Pug](https://pugjs.org/api/getting-started.html) સાથે ઉપયોગ કરી શકીએ:

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

નોંધ કરો કે વિવિધ pre-processors સાથેનું integration toolchain દ્વારા ભિન્ન હોઈ શકે. ઉદાહરણો માટે respective documentation તપાસો:

- [Vite](https://vite.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## `src` Imports {#src-imports}

જો તમે તમારા `*.vue` ઘટકોને બહુવિધ files માં split કરવાનું પસંદ કરો, તો language block માટે external file import કરવા `src` attribute ઉપયોગ કરી શકો:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

સાવધાન રહો કે `src` imports webpack module requests જેવા જ path resolution rules ને અનુસરે, જેનો અર્થ છે:

- Relative paths `./` થી શરૂ થવા જોઈએ
- તમે npm dependencies માંથી resources import કરી શકો:

```vue
<!-- installed "todomvc-app-css" npm package માંથી file import કરો -->
<style src="todomvc-app-css/index.css" />
```

`src` imports custom blocks સાથે પણ કામ કરે, દા.ત.:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

:::warning નોંધ
`src` માં aliases ઉપયોગ કરતી વખતે, `~` થી શરૂ ન કરો, તેની પછીની કોઈપણ વસ્તુ module request તરીકે interpret થાય છે. આનો અર્થ છે કે તમે node modules અંદર assets ને reference કરી શકો:
```vue
<img src="~some-npm-package/foo.png">
```
:::

## Comments {#comments}

દરેક block અંદર ઉપયોગ થતી language ની comment syntax (HTML, CSS, JavaScript, Pug, etc.) ઉપયોગ કરવી. Top-level comments માટે, HTML comment syntax ઉપયોગ કરો: `<!-- comment contents here -->`
