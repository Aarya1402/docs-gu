# SFC CSS Features {#sfc-css-features}

## Scoped CSS {#scoped-css}

જ્યારે `<style>` tag ને `scoped` attribute હોય, ત્યારે તેનું CSS ફક્ત વર્તમાન ઘટકના elements ને જ apply થશે. આ Shadow DOM માં મળતા style encapsulation જેવું છે. તેમાં કેટલાક caveats છે, પરંતુ કોઈ polyfills ની જરૂર નથી. PostCSS ઉપયોગ કરીને નીચેનાને transform કરીને પ્રાપ્ત થાય છે:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

નીચેનામાં ફેરવે છે:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### Child Component Root Elements {#child-component-root-elements}

`scoped` સાથે, parent ઘટકના styles child ઘટકોમાં leak થશે નહીં. જો કે, child ઘટકનો root node parent ના scoped CSS અને child ના scoped CSS બંનેથી affected થશે. આ design દ્વારા છે જેથી parent layout હેતુઓ માટે child root element ને style કરી શકે.

### Deep Selectors {#deep-selectors}

જો તમે `scoped` styles માં selector ને "deep" બનાવવા માંગો, i.e. child ઘટકોને affect કરે, `:deep()` pseudo-class ઉપયોગ કરી શકો:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

ઉપરોક્ત compile થશે:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
`v-html` સાથે created DOM content scoped styles થી affected થતું નથી, પરંતુ તમે deep selectors ઉપયોગ કરીને તેમને style કરી શકો.
:::

### Slotted Selectors {#slotted-selectors}

ડિફોલ્ટ રૂપે, scoped styles `<slot/>` દ્વારા rendered contents ને affect કરતા નથી, કારણ કે તેમને pass કરતા parent ઘટક દ્વારા owned માનવામાં આવે છે. Slot content ને explicitly target કરવા માટે, `:slotted` pseudo-class ઉપયોગ કરો:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Global Selectors {#global-selectors}

જો તમે ફક્ત એક rule globally apply કરવા માંગો, તો બીજી `<style>` બનાવવાના બદલે `:global` pseudo-class ઉપયોગ કરી શકો (નીચે જુઓ):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Local અને Global Styles ભેળવવી (Mixing) {#mixing-local-and-global-styles}

સમાન ઘટકમાં scoped અને non-scoped styles બંને include કરી શકો:

```vue
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

### Scoped Style ટિપ્સ (Tips) {#scoped-style-tips}

- **Scoped styles classes ની જરૂરિયાત દૂર કરતા નથી**. Browsers વિવિધ CSS selectors render કરે તે રીતને કારણે, `p { color: red }` scoped હોય ત્યારે (i.e. attribute selector સાથે combine થાય ત્યારે) ઘણી ગણી ધીમી હશે. જો તમે classes અથવા ids ઉપયોગ કરો, જેમ `.example { color: red }` માં, તો તમે તે performance hit ને વર્ચ્યુઅલી દૂર કરો છો.

- **Recursive ઘટકોમાં descendant selectors સાથે સાવધાન!** `.a .b` selector ધરાવતા CSS rule માટે, જો `.a` ને match કરતો element recursive child ઘટક ધરાવે, તો તે child ઘટકમાં તમામ `.b` rule દ્વારા match થશે.

## CSS Modules {#css-modules}

`<style module>` tag [CSS Modules](https://github.com/css-modules/css-modules) તરીકે compile થાય છે અને resulting CSS classes ને `$style` key હેઠળ ઘટકને object તરીકે expose કરે છે:

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

Resulting classes collision ટાળવા માટે hashed છે, CSS ને ફક્ત વર્તમાન ઘટક સુધી scoping ના સમાન effect ને પ્રાપ્ત કરે છે.

[global exceptions](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) અને [composition](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition) જેવી વધુ વિગત માટે [CSS Modules spec](https://github.com/css-modules/css-modules) જુઓ.

### Custom Inject Name {#custom-inject-name}

`module` attribute ને value આપીને injected classes object ની property key ને customize કરી શકો:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Composition API સાથે ઉપયોગ (Usage with Composition API) {#usage-with-composition-api}

Injected classes ને `setup()` અને `<script setup>` માં `useCssModule` API દ્વારા access કરી શકાય. Custom injection names ધરાવતા `<style module>` blocks માટે, `useCssModule` matching `module` attribute value ને પ્રથમ આર્ગ્યુમેન્ટ તરીકે accepts કરે છે:

```js
import { useCssModule } from 'vue'

// setup() scope અંદર...
// default, <style module> માટે classes return કરે છે
useCssModule()

// named, <style module="classes"> માટે classes return કરે છે
useCssModule('classes')
```

- **ઉદાહરણ (Example)**

```vue
<script setup lang="ts">
import { useCssModule } from 'vue'

const classes = useCssModule()
</script>

<template>
  <p :class="classes.red">red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

## CSS માં `v-bind()` {#v-bind-in-css}

SFC `<style>` tags `v-bind` CSS function ઉપયોગ કરીને CSS values ને dynamic component state સાથે link કરવાને support કરે છે:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

Syntax [`<script setup>`](./sfc-script-setup) સાથે કામ કરે છે, અને JavaScript expressions ને support કરે છે (quotes માં wrap હોવા જોઈએ):

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

વાસ્તવિક value hashed CSS custom property માં compile થાય છે, તેથી CSS હજુ static છે. Custom property inline styles દ્વારા ઘટકના root element ને apply થશે અને source value બદલાય ત્યારે reactively update થશે.
