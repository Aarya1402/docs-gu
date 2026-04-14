# કમ્પોનન્ટ v-model (Component v-model) {#component-v-model}

<ScrimbaLink href="https://scrimba.com/links/vue-component-v-model" title="ફ્રી Vue.js કમ્પોનન્ટ v-model લેસન" type="scrimba">
  Scrimba પર ઇન્ટરેક્ટિવ વિડિઓ લેસન જુઓ
</ScrimbaLink>

## મૂળભૂત વપરાશ (Basic Usage) {#basic-usage}

`v-model` નો ઉપયોગ કમ્પોનન્ટ પર ટુ-વે બાઈન્ડિંગ (two-way binding) કરવા માટે થઈ શકે છે.

<div class="composition-api">

Vue 3.4 થી શરૂ કરીને, આ હાંસલ કરવા માટેનો ભલામણ કરેલ અભિગમ [`defineModel()`](/api/sfc-script-setup#definemodel) મેક્રોનો ઉપયોગ કરવાનો છે:

```vue [Child.vue]
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>પેરેન્ટ બાઉન્ડ v-model છે: {{ model }}</div>
  <button @click="update">વધારો</button>
</template>
```

પેરેન્ટ પછી `v-model` સાથે વેલ્યુ બાંધી શકે છે:

```vue-html [Parent.vue]
<Child v-model="countModel" />
```

`defineModel()` દ્વારા પરત કરવામાં આવેલી વેલ્યુ એક રિફ (ref) છે. તે અન્ય કોઈપણ રિફની જેમ એક્સેસ અને મ્યુટેટ કરી શકાય છે, સિવાય કે તે પેરેન્ટ વેલ્યુ અને લોકલ વેલ્યુ વચ્ચેના ટુ-વે બાઈન્ડિંગ તરીકે કાર્ય કરે છે:

- તેની `.value` પેરેન્ટ `v-model` દ્વારા બાઉન્ડ વેલ્યુ સાથે સિંક (synced) થયેલ છે;
- જ્યારે તે ચાઇલ્ડ દ્વારા મ્યુટેટ કરવામાં આવે છે, ત્યારે તે પેરેન્ટ બાઉન્ડ વેલ્યુને પણ અપડેટ કરવાનું કારણ બને છે.

આનો અર્થ એ છે કે તમે આ રિફને `v-model` સાથે નેટિવ ઇનપુટ એલિમેન્ટ સાથે પણ બાંધી શકો છો, જે સમાન `v-model` વપરાશ પ્રદાન કરતી વખતે નેટિવ ઇનપુટ એલિમેન્ટ્સને લપેટવાનું (wrap) સરળ બનાવે છે:

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFUtFKwzAU/ZWYl06YLbK30Q10DFSYigq+5KW0t11mmoQknZPSf/cm3eqEsT0l555zuefmpKV3WsfbBuiUpjY3XDtiwTV6ziSvtTKOLNZcFKQ0qiZRnATkG6JB0BIDJen2kp5iMlfSOlLbisw8P4oeQAhFPpURxVV0zWSa9PNwEgIHtRaZA0SEpOvbeduG5q5LE0Sh2jvZ3tSqADFjFHlGSYJkmhz10zF1FseXvIo3VklcrfX9jOaq1lyAedGOoz1GpyQwnsvQ3fdTqDnTwPhQz9eQf52ob+zO1xh9NWDBbIHRgXOZqcD19PL9GXZ4H0h03whUnyHfwCrReI+97L6RBdo+0gW3j+H9uaw+7HLnQNrDUt6oV3ZBzyhmsjiz+p/dSTwJfUx2+IpD1ic+xz5enwQGXEDJJaw8Gl2I1upMzlc/hEvdOBR6SNKAjqP1J6P/o6XdL11L5h4=)

### પડદા પાછળની પ્રક્રિયા {#under-the-hood}

`defineModel` એક સગવડતા મેક્રો (convenience macro) છે. કમ્પાઇલર તેને નીચે પ્રમાણે વિસ્તાર કરે છે:

- `modelValue` નામનો પ્રોપ, જેની સાથે લોકલ રિફની વેલ્યુ સિંક થયેલ છે;
- `update:modelValue` નામની ઇવેન્ટ, જે લોકલ રિફની વેલ્યુ મ્યુટેટ થાય ત્યારે એમિટ થાય છે.

આ રીતે તમે 3.4 પહેલા ઉપર બતાવેલ તે જ ચાઇલ્ડ કમ્પોનન્ટ લાગુ કરશો:

```vue [Child.vue]
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

પછી, પેરેન્ટ કમ્પોનન્ટમાં `v-model="foo"` આ રીતે કમ્પાઇલ કરવામાં આવશે:

```vue-html [Parent.vue]
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

જેમ તમે જોઈ શકો છો, તે ઘણું વધારે લખાણ છે. જો કે, પડદા પાછળ શું થઈ રહ્યું છે તે સમજવું મદદરૂપ છે.

કારણ કે `defineModel` પ્રોપ જાહેર કરે છે, તમે તેને `defineModel` માં પાસ કરીને અન્ડરલાઇંગ પ્રોપના ઓપ્શન્સ જાહેર કરી શકો છો:

```js
// v-model ને જરૂરી (required) બનાવવું
const model = defineModel({ required: true })

// ડિફોલ્ટ વેલ્યુ પૂરી પાડવી
const model = defineModel({ default: 0 })
```

:::warning
જો તમારી પાસે `defineModel` પ્રોપ માટે `default` વેલ્યુ છે અને તમે પેરેન્ટ કમ્પોનન્ટમાંથી આ પ્રોપ માટે કોઈ વેલ્યુ પ્રદાન કરતા નથી, તો તે પેરેન્ટ અને ચાઇલ્ડ કમ્પોનન્ટ્સ વચ્ચે ડિ-સિંક્રોનાઇઝેશન (de-synchronization) નું કારણ બની શકે છે. નીચેના ઉદાહરણમાં, પેરેન્ટનો `myRef` અનડિફાઇન્ડ (undefined) છે, પરંતુ ચાઇલ્ડનો `model` ૧ છે:

```vue [Child.vue]
<script setup>
const model = defineModel({ default: 1 })
</script>
```

```vue [Parent.vue]
<script setup>
const myRef = ref()
</script>

<template>
  <Child v-model="myRef"></Child>
</template>
```

:::

</div>

<div class="options-api">

સૌ પ્રથમ ચાલો જોઈએ કે નેટિવ એલિમેન્ટ પર `v-model` નો ઉપયોગ કેવી રીતે થાય છે:

```vue-html
<input v-model="searchText" />
```

પડદા પાછળ, ટેમ્પલેટ કમ્પાઇલર અમારા માટે `v-model` ને વધુ વિગતવાર સમકક્ષ વિસ્તારે છે. તેથી ઉપરનો કોડ નીચે મુજબ જ કામ કરે છે:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

જ્યારે કમ્પોનન્ટ પર ઉપયોગ કરવામાં આવે ત્યારે, `v-model` તેના બદલે આમાં વિસ્તરે છે:

```vue-html
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
```

આ ખરેખર કાર્ય કરવા માટે, `<CustomInput>` કમ્પોનન્ટે બે વસ્તુઓ કરવી આવશ્યક છે:

૧. નેટિવ `<input>` એલિમેન્ટના `value` એટ્રિબ્યુટને `modelValue` પ્રોપ સાથે બાંધો (bind).
૨. જ્યારે નેટિવ `input` ઇવેન્ટ ટ્રિગર થાય ત્યારે, નવી વેલ્યુ સાથે `update:modelValue` કસ્ટમ ઇવેન્ટ એમિટ કરો.

અહીં તે ક્રિયામાં છે:

```vue [CustomInput.vue]
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

હવે `v-model` એ આ ઘટક સાથે સંપૂર્ણ રીતે કામ કરવું જોઈએ:

```vue-html
<CustomInput v-model="searchText" />
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkctqwzAQRX9lEAEn4Np744aWrvoD3URdiHiSGvRCHpmC8b93JDfGKYGCkJjXvTrSJF69r8aIohHtcA69p6O0vfEuELzFgZx5tz4SXIIzUFT1JpfGCmmlxe/c3uFFRU0wSQtwdqxh0dLQwHSnNJep3ilS+8PSCxCQYrC3CMDgMKgrNlB8odaOXVJ2TgdvvNp6vSwHhMZrRcgRQLs1G5+M61A/S/ErKQXUR5immwXMWW1VEKX4g3j3Mo9QfXCeKU9FtvpQmp/lM0Oi6RP/qYieebHZNvyL0acLLODNmGYSxCogxVJ6yW1c2iWz/QOnEnY48kdUpMIVGSllD8t8zVZb+PkHqPG4iw==)

આ કમ્પોનન્ટની અંદર `v-model` ને લાગુ કરવાની બીજી રીત ગેટર અને સેટર બંને સાથે રાઈટેબલ (writable) `computed` પ્રોપર્ટીનો ઉપયોગ કરવાની છે. `get` મેથડે `modelValue` પ્રોપર્ટી પરત કરવી જોઈએ અને `set` મેથડે સંબંધિત ઇવેન્ટ એમિટ કરવી જોઈએ:

```vue [CustomInput.vue]
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

</div>

## `v-model` આર્ગ્યુમેન્ટ્સ (`v-model` Arguments) {#v-model-arguments}

કમ્પોનન્ટ પરનું `v-model` આર્ગ્યુમેન્ટ પણ સ્વીકારી શકે છે:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

<div class="composition-api">

ચાઇલ્ડ કમ્પોનન્ટમાં, આપણે તેની પ્રથમ આર્ગ્યુમેન્ટ તરીકે `defineModel()` માં સ્ટ્રિંગ પાસ કરીને સંબંધિત આર્ગ્યુમેન્ટને સપોર્ટ કરી શકીએ છીએ:

```vue [MyComponent.vue]
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFklFPwjAUhf9K05dhgiyGNzJI1PCgCWqUx77McQeFrW3aOxxZ9t+9LTAXA/q2nnN6+t12Db83ZrSvgE944jIrDTIHWJmZULI02iJrmIWctSy3umQRRaPOWhweNX0pUHiyR3FP870UZkyoTCuH7FPr3VJiAWzqSwfR/rbUKyhYatdV6VugTktTQHQjVBIfeYiEFgikpwi0YizZ3M2aplfXtklMWvD6UKf+CfrUVPBuh+AspngSd718yH+hX7iS4xihjUZYQS4VLPwJgyiI/3FLZSrafzAeBqFG4jgxeuEqGTo6OZfr0dZpRVxNuFWeEa4swL4alEQm+IQFx3tpUeiv56ChrWB41rMNZLsL+tbVXhP8zYIDuyeQzkN6HyBWb88/XgJ3ZxJ95bH/MN/B6aLyjMfYQ6VWhN3LBdqn8FdJtV66eY2g3HkoD+qTbcgLTo/jX+ra6D+449E47BOq5e039mr+gA==)

જો પ્રોપ ઓપ્શન્સની પણ જરૂર હોય, તો તે મોડેલ નામ પછી પાસ કરવા જોઈએ:

```js
const title = defineModel('title', { required: true })
```

<details>
<summary>3.4 પહેલાનો વપરાશ</summary>

```vue [MyComponent.vue]
<script setup>
defineProps({
  title: {
    required: true
  }
})
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9kE1rwzAMhv+KMIW00DXsGtKyMXYc7D7vEBplM8QfOHJoCfnvk+1QsjJ2svVKevRKk3h27jAGFJWoh7NXjmBACu4kjdLOeoIJPHYwQ+ethoJLi1vq7fpi+WfQ0JI+lCstcrkYQJqzNQMBKeoRjhG4LcYHbVvsofFfQUcCXhrteix20tRl9sIuOCBkvSHkCKD+fjxN04Ka57rkOOlrMwu7SlVHKdIrBZRcWpc3ntiLO7t/nKHFThl899YN248ikYpP9pj1V60o6sG1TMwDU/q/FZRxgeIPgK4uGcQLSZGlamz6sHKd1afUxOoGeeT298A9bHCMKxBfE3mTSNjl1vud5x8qNa76)

</details>
</div>
<div class="options-api">

આ કિસ્સામાં, ડિફોલ્ટ `modelValue` પ્રોપ અને `update:modelValue` ઇવેન્ટને બદલે, ચાઇલ્ડ કમ્પોનન્ટે `title` પ્રોપની અપેક્ષા રાખવી જોઈએ અને પેરેન્ટ વેલ્યુને અપડેટ કરવા માટે `update:title` ઇવેન્ટ એમિટ કરવી જોઈએ:

```vue [MyComponent.vue]
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFUNFqwzAM/BVhCm6ha9hryMrGnvcFdR9Mo26B2DGuHFJC/n2yvZakDAohtuTTne5G8eHcrg8oSlFdTr5xtFe2Ma7zBF/Xz45vFi3B2XcG5K6Y9eKYVFZZHBK8xrMOLcGoLMDphrqUMC6Ypm18rzXp9SZjATxS8PZWAVBDLZYg+xfT1diC9t/BxGEctHFtlI2wKR78468q7ttzQcgoTcgVQPXzuh/HzAnTVBVcp/58qz+lMqHelEinElAwtCrufGIrHhJYBPdfEs53jkM4yEQpj8k+miYmc5DBcRKYZeXxqZXGukDZPF1dWhQHUiK3yl63YbZ97r6nIe6uoup6KbmFFfbRCnHGyI4iwyaPPnqffgGMlsEM)

</div>

## બહુવિધ `v-model` બાઈન્ડિંગ્સ (Multiple `v-model` Bindings) {#multiple-v-model-bindings}

ચોક્કસ પ્રોપ અને ઇવેન્ટને લક્ષ્ય બનાવવાની ક્ષમતાનો લાભ લઈને આપણે અગાઉ [`v-model` આર્ગ્યુમેન્ટ્સ](#v-model-arguments) સાથે શીખ્યા હતા, હવે આપણે સિંગલ કમ્પોનન્ટ ઇન્સ્ટન્સ પર બહુવિધ `v-model` બાઈન્ડિંગ્સ બનાવી શકીએ છીએ.

દરેક `v-model` કમ્પોનન્ટમાં વધારાના ઓપ્શન્સની જરૂરિયાત વિના, અલગ પ્રોપ સાથે સિંક થશે:

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

<div class="composition-api">

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkstuwjAQRX/F8iZUAqKKHQpIfbAoUmnVx86bKEzANLEt26FUkf+9Y4MDSAg2UWbu9fjckVv6oNRw2wAd08wUmitLDNhGTZngtZLakpZoKIkjpZY1SdCadNK3Ab3IazhowzQ2/ES0MVFIYSwpucbvxA/qJXO5FsldlKr8qDxL8EKW7kEQAQsLtapyC1gRkq3vp217mOccwf8wwLksRSlYIoMvCNkOarmEahyODAT2J4yGgtFzhx8UDf5/r6c4NEs7CNqnpxkvbO0kcVjNhCyh5AJe/SW9pBPOV3DJGvu3dsKFaiyxf8qTW9gheQwVs4Z90BDm5oF47cF/Ht4aZC75argxUmD61g9ktJC14hXoN2U5ZmJ0TILitbyq5O889KxuoB/7xRqKnwv9jdn5HqPvGnDVWwTpNJvrFSCul2efi4DeiRigqdB9RfwAI6vGM+5tj41YIvaJL9C+hOfNxerLzHYWhImhPKh3uuBnFJ/A05XoR9zRcBTOMeGo+wcs+yse)

<details>
<summary>3.4 પહેલાનો વપરાશ</summary>

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNUc1qwzAMfhVjCk6hTdg1pGWD7bLDGIydlh1Cq7SGxDaOEjaC332yU6cdFNpLsPRJ348y8idj0qEHnvOi21lpkHWAvdmWSrZGW2Qjs1Azx2qrWyZoVMzQZwf2rWrhhKVZbHhGGivVTqsOWS0tfTeeKBGv+qjEMkJNdUaeNXigyCYjZIEKhNY0FQJVjBXHh+04nvicY/QOBM4VGUFhJHrwBWPDutV7aPKwslbU35Q8FCX/P+GJ4oB/T3hGpEU2m+ArfpnxytX2UEsF71abLhk9QxDzCzn7QCvVYeW7XuGyWSpH0eP6SyuxS75Eb/akOpn302LFYi8SiO8bJ5PK9DhFxV/j0yH8zOnzoWr6+SbhbifkMSwSsgByk1zzsoABFKZY2QNgGpiW57Pdrx2z3JCeI99Svvxh7g8muf2x)

</details>
</div>
<div class="options-api">

```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqGkk1rg0AQhv/KIAETSJRexYYWeuqhl9JTt4clmSSC7i7rKCnif+/ObtYkELAiujPzztejQ/JqTNZ3mBRJ2e5sZWgrVNUYbQm+WrQfskE4WN1AmuXRwQmpUELh2Qv3eJBdTTAIBbDTLluhoraA4VpjXHNwL0kuV0EIYJE6q6IFcKhsSwWk7/qkUq/nP9ve+aa5JztGfrmHu8t8GtoZhI2pJaGzAMrT03YYQk0YR3BnruSOZe5CXhKnC3X7TaP3WBc+ZaOc/1kk3hDJvYILRQGfQzx3Rct8GiJZJ7fA7gg/AmesNszMrUIXFpxbwCfZSh09D0Hc7tbN6sAWm4qZf6edcZgxrMHSdA3RF7PTn1l8lTIdhbXp1/CmhOeJRNHLupv4eIaXyItPdJEFD7R8NM0Ce/d/ZCTtESnzlVZXhP/vHbeZaT0tPdf59uONfx7mDVM=)

</div>

## `v-model` મોડિફાયર્સ ને હેન્ડલ કરવા (Handling `v-model` Modifiers) {#handling-v-model-modifiers}

જ્યારે આપણે ઇનપુટ બાઇન્ડિંગ્સ ફોર્મ (form input bindings) શીખી રહ્યા હતા, ત્યારે આપણે જોયું કે `v-model` માં [બિલ્ટ-ઇન મોડિફાયર્સ](/guide/essentials/forms#modifiers) છે - `.trim`, `.number` અને `.lazy`. કેટલાક કિસ્સાઓમાં, તમે કસ્ટમ મોડિફાયર્સને સપોર્ટ કરવા માટે તમારા કસ્ટમ ઇનપુટ કમ્પોનન્ટ પર `v-model` પણ ઈચ્છી શકો છો.

ચાલો એક ઉદાહરણ કસ્ટમ મોડિફાયર, `capitalize` બનાવીએ, જે `v-model` બાઇન્ડિંગ દ્વારા પૂરી પાડવામાં આવેલ સ્ટ્રિંગના પ્રથમ અક્ષરને કેપિટલાઇઝ (મોટો) કરે છે:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

<div class="composition-api">

કમ્પોનન્ટ `v-model` માં ઉમેરવામાં આવેલા મોડિફાયર્સને આ રીતે `defineModel()` રિટર્ન વેલ્યુને ડિસ્ટ્રક્ચર કરીને ચાઇલ્ડ કમ્પોનન્ટમાં એક્સેસ કરી શકાય છે:

```vue{4}
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

મોડિફાયર્સના આધારે વેલ્યુ કેવી રીતે વાંચવી/લખવી જોઈએ તે શરતી રીતે ગોઠવવા માટે, અમે `defineModel()` માં `get` અને `set` ઓપ્શન્સ પાસ કરી શકીએ છીએ. આ બે ઓપ્શન્સ મોડલ રિફ ના ગેટ/સેટ (get / set) પર વેલ્યુ મેળવે છે અને ટ્રાન્સફોર્મ કરેલી વેલ્યુ પરત કરવી જોઈએ. આ રીતે આપણે `capitalize` મોડિફાયરને લાગુ કરવા માટે `set` ઓપ્શનનો ઉપયોગ કરી શકીએ છીએ:

```vue{4-6}
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9UsFu2zAM/RVClzhY5mzoLUgHdEUPG9Bt2LLTtIPh0Ik6WRIkKksa5N9LybFrFG1OkvgeyccnHsWNc+UuoliIZai9cgQBKbpP0qjWWU9wBI8NnKDxtoUJUycDdH+4tXwzaOgMl/NRLNVlMoA0tTWBoD2scE9wnSoWk8lUmuW8a8rt+EHYOl0R8gtgtVUBlHGRoK6cokqrRwxAW4RGea6mkQg9HGwEboZ+kbKWY027961doy6f86+l6ERIAXNus5wPPcVMvNB+yZOaiZFw/cKYftI/ufEM+FCNQh/+8tRrbJTB+4QUxySWqxa7SkecQn4DqAaKIWekeyAAe0fRG8h5Zb2t/A0VH6Yl2d/Oob+tAhZTeHfGg1Y1Fh/Z6ZR66o5xhRTh8OnyXyy7f6CDSw5S59/Z3WRpOl91lAL70ahN+RCsYT/zFFIk95RG/92RYr+kWPTzSVFpbf9/zTHyEWd9vN5i/e+V+EPYp5gUPzwG9DuUYsCo8htkrQm++/Ut6x5AVh01sy+APzFYHZPGjvY5mjXLHvGy2i95K5TZrMLdntCEfqgkNDuc+VLwkqQNe2v0Z7lX5VX/M+L0BFEuPdc=)

<details>
<summary>3.4 પહેલાનો વપરાશ</summary>

```vue{11-13}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="props.modelValue" @input="emitValue" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9Us1Og0AQfpUJF5ZYqV4JNTaNxyYmVi/igdCh3QR2N7tDIza8u7NLpdU0nmB+v5/ZY7Q0Jj10GGVR7iorDYFD6sxDoWRrtCU4gsUaBqitbiHm1ngqrfuV5j+Fik7ldH6R83u5GaBQlVaOoO03+Emw8BtFHCeFyucjKMNxQNiapiTkCGCzlw6kMh1BVRpJZSO/0AEe0Pa0l2oHve6AYdBmvj+/ZHO4bfUWm/Q8uSiiEb6IYM4A+XxCi2bRH9ZX3BgVGKuNYwFbrKXCZx+Jo0cPcG9l02EGL2SZ3mxKr/VW1hKty9hMniy7hjIQCSweQByHBIZCDWzGDwi20ps0Yjxx4MR73Jktc83OOPFHGKk7VZHUKkyFgsAEAqcG2Qif4WWYUml3yOp8wldlDSLISX+TvPDstAemLeGbVvvSLkncJSnpV2PQrkqHLOfmVHeNrFDcMz3w0iBQE1cUzMYBbuS2f55CPj4D6o0/I41HzMKsP+u0kLOPoZWzkx1X7j18A8s0DEY=)

</details>
</div>

<div class="options-api">

કમ્પોનન્ટ `v-model` માં ઉમેરવામાં આવેલા મોડિફાયર્સ `modelModifiers` પ્રોપ દ્વારા કમ્પોનન્ટ ને પૂરા પાડવામાં આવશે. નીચેના ઉદાહરણમાં, અમે એક કમ્પોનન્ટ બનાવ્યું છે જેમાં `modelModifiers` પ્રોપ છે જે ડિફોલ્ટ રૂપે ખાલી ઓબ્જેક્ટ છે:

```vue{11}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

નોંધ કરો કે કમ્પોનન્ટના `modelModifiers` પ્રોપમાં `capitalize` છે અને તેનું મૂલ્ય `true` છે - તે `v-model` બાઇન્ડિંગ `v-model.capitalize="myText"` પર સેટ કરવામાં આવ્યું હોવાને કારણે.

હવે જ્યારે અમારી પાસે અમારો પ્રોપ સેટઅપ છે, અમે `modelModifiers` ઓબ્જેક્ટ કીઝને ચેક કરી શકીએ છીએ અને એમિટ થયેલી વેલ્યુ ને બદલવા માટે હેન્ડલર લખી શકીએ છીએ. નીચેના કોડમાં જ્યારે પણ `<input />` એલિમેન્ટ `input` ઇવેન્ટને ફાયર કરશે ત્યારે અમે સ્ટ્રિંગને કેપિટલાઇઝ (પ્રથમ અક્ષર મોટો) કરીશું.

```vue{13-15}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFks1qg0AQgF9lkIKGpqa9iikNOefUtJfaw6KTZEHdZR1DbPDdO7saf0qgIq47//PNXL2N1uG5Ri/y4io1UtNrUspCK0Owa7aK/0osCQ5GFeCHq4nMuvlJCZCUeHEOGR5EnRNcrTS92VURXGex2qXVZ4JEsOhsAQxSbcrbDaBo9nihCHyXAaC1B3/4jVdDoXwhLHQuCPkGsD/JCmSpa4JUaEkilz9YAZ7RNHSS5REaVQPXgCay9vG0rPNToTLMw9FznXhdHYkHK04Qr4Zs3tL7g2JG8B4QbZS2LLqGXK5PkdcYwTsZrs1R6RU7lcmDRDPaM7AuWARMbf0KwbVdTNk4dyyk5f3l15r5YjRm8b+dQYF0UtkY1jo4fYDDLAByZBxWCmvAkIQ5IvdoBTcLeYCAiVbhvNwJvEk4GIK5M0xPwmwoeF6EpD60RrMVFXJXj72+ymWKwUvfXt+gfVzGB1tzcKfDZec+o/LfxsTdtlCj7bSpm3Xk4tjpD8FZ+uZMWTowu7MW7S+CWR77)

</div>

### આર્ગ્યુમેન્ટ્સ સાથે `v-model` માટે મોડિફાયર્સ {#modifiers-for-v-model-with-arguments}

<div class="options-api">

આર્ગ્યુમેન્ટ અને મોડિફાયર બંને સાથે `v-model` બાઈન્ડિંગ્સ માટે, જનરેટ થયેલ પ્રોપ નામ `arg + "Modifiers"` હશે. ઉદાહરણ તરીકે:

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

તેના માટેની ડિક્લેરેશન્સ નીચે મુજબ હોવી જોઈએ:

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```

</div>

અહીં વિવિધ આર્ગ્યુમેન્ટ્સ સાથે બહુવિધ (multiple) `v-model` સાથે મોડિફાયર્સ વાપરવાનું બીજું ઉદાહરણ છે:

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

<div class="composition-api">

```vue
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```

<details>
<summary>3.4 પહેલાનો વપરાશ</summary>

```vue{5,6,10,11}
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```

</details>
</div>
<div class="options-api">

```vue{15,16}
<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    firstNameModifiers: {
      default: () => ({})
    },
    lastNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:firstName', 'update:lastName'],
  created() {
    console.log(this.firstNameModifiers) // { capitalize: true }
    console.log(this.lastNameModifiers) // { uppercase: true }
  }
}
</script>
```

</div>
