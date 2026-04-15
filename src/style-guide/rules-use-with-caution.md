# પ્રાથમિકતા D નિયમો: સાવધાની સાથે ઉપયોગ કરો (Priority D Rules: Use with Caution) {#priority-d-rules-use-with-caution}

::: warning નોંધ
આ Vue.js સ્ટાઇલ ગાઇડ જૂની છે અને તેની સમીક્ષા કરવાની જરૂર છે. જો તમારી પાસે કોઈ પ્રશ્નો અથવા સૂચનો હોય, તો કૃપા કરીને [ઇશ્યુ ઓપન કરો (open an issue)](https://github.com/vuejs/docs/issues/new).
:::

Vue ની કેટલીક સુવિધાઓ દુર્લભ એજ કેસ (edge cases) અથવા જૂના કોડ બેઝમાંથી સ્મૂધ માઇગ્રેશન માટે અસ્તિત્વમાં છે. જો કે જ્યારે વધુ પડતો ઉપયોગ કરવામાં આવે છે, ત્યારે તે તમારા કોડને મેન્ટેન કરવાનું વધુ મુશ્કેલ બનાવી શકે છે અથવા તો બગ્સનું કારણ પણ બની શકે છે. આ નિયમો સંભવિત જોખમી સુવિધાઓ પર પ્રકાશ પાડે છે, તે સમજાવે છે કે ક્યારે અને શા માટે તેમને ટાળવા જોઈએ.

## `scoped` સાથે એલિમેન્ટ સિલેક્ટર્સ {#element-selectors-with-scoped}

**`scoped` સાથે એલિમેન્ટ સિલેક્ટર્સ ટાળવા જોઈએ.**

`scoped` સ્ટાઇલ્સમાં એલિમેન્ટ સિલેક્ટર્સ કરતા ક્લાસ સિલેક્ટર્સ ને પ્રાધાન્ય આપો, કારણ કે મોટી સંખ્યામાં એલિમેન્ટ સિલેક્ટર્સ ધીમા હોય છે.

::: details વિગતવાર સમજૂતી (Detailed Explanation)
સ્ટાઇલ્સને સ્કોપ (scope) કરવા માટે, Vue ઘટક એલિમેન્ટ્સમાં એક અનન્ય એટ્રિબ્યુટ ઉમેરે છે, જેમ કે `data-v-f3f3eg9`. પછી સિલેક્ટર્સને એ રીતે ફેરફાર કરવામાં આવે છે કે ફક્ત આ એટ્રિબ્યુટ ધરાવતા મેળ ખાતા એલિમેન્ટ્સ જ પસંદ થાય (દા.ત. `button[data-v-f3f3eg9]`).

સમસ્યા એ છે કે મોટી સંખ્યામાં element-attribute સિલેક્ટર્સ (દા.ત. `button[data-v-f3f3eg9]`) class-attribute સિલેક્ટર્સ (દા.ત. `.btn-close[data-v-f3f3eg9]`) કરતા નોંધપાત્ર રીતે ધીમા હશે, તેથી જ્યાં પણ શક્ય હોય ત્યાં ક્લાસ સિલેક્ટર્સ ને પ્રાધાન્ય આપવું જોઈએ.
:::

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue-html
<template>
  <button>×</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

</div>

## ગર્ભિત પેરેન્ટ-ચાઇલ્ડ કોમ્યુનિકેશન (Implicit parent-child communication) {#implicit-parent-child-communication}

**પેરેન્ટ-ચાઇલ્ડ ઘટક કોમ્યુનિકેશન માટે `this.$parent` અથવા પ્રોપ્સ મ્યુટેશન ના બદલે પ્રોપ્સ અને ઇવેન્ટ્સ ને પ્રાધાન્ય આપવું જોઈએ.**

એક આદર્શ Vue એપ્લિકેશન props down, events up છે. આ કન્વેન્શનનું પાલન કરવાથી તમારા ઘટકો સમજવામાં ઘણા સરળ બને છે. જો કે, એવા એજ કેસ છે જ્યાં પ્રોપ મ્યુટેશન (prop mutation) અથવા `this.$parent` બે ઘટકોને સરળ બનાવી શકે છે જે પહેલેથી ગાઢ રીતે જોડાયેલા (deeply coupled) છે.

સમસ્યા એ છે કે, ઘણા _સરળ_ કિસ્સાઓ પણ છે જ્યાં આ પેટર્ન્સ સુવિધા આપી શકે. સાવધાન રહો: ટૂંકા ગાળાની સુવિધા (ઓછો કોડ લખવો) માટે સરળતા (તમારી સ્ટેટના પ્રવાહને સમજવામાં સમર્થ હોવું) નો વેપાર કરવાથી લલચાશો નહીં.

<div class="options-api">

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: '<input v-model="todo.text">'
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(
        (todo) => todo.id !== vm.todo.id
      )
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `
})
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['input'],

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['delete'],

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `
})
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>ખરાબ (Bad)</h3>

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <input v-model="todo.text" />
</template>
```

```vue
<script setup>
import { getCurrentInstance } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const instance = getCurrentInstance()

function removeTodo() {
  const parent = instance.parent
  if (!parent) return

  parent.props.todos = parent.props.todos.filter((todo) => {
    return todo.id !== props.todo.id
  })
}
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo">×</button>
  </span>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>સારું (Good)</h3>

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['input'])
</script>

<template>
  <input :value="todo.text" @input="emit('input', $event.target.value)" />
</template>
```

```vue
<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])
</script>

<template>
  <span>
    {{ todo.text }}
    <button @click="emit('delete')">×</button>
  </span>
</template>
```

</div>

</div>
