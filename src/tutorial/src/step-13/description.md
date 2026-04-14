# એમિટ્સ (Emits) {#emits}

પ્રોપ્સ પ્રાપ્ત કરવા ઉપરાંત, ચાઇલ્ડ ઘટક પેરન્ટને ઇવેન્ટ્સ એમિટ (emit) પણ કરી શકે છે:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરો
const emit = defineEmits(['response'])

// આર્ગ્યુમેન્ટ સાથે એમિટ કરો
emit('response', 'ચાઇલ્ડ તરફથી નમસ્તે')
</script>
```

</div>

<div class="html">

```js
export default {
  // એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરો
  emits: ['response'],
  setup(props, { emit }) {
    // આર્ગ્યુમેન્ટ સાથે એમિટ કરો
    emit('response', 'ચાઇલ્ડ તરફથી નમસ્તે')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // એમિટ કરેલી ઇવેન્ટ્સ જાહેર કરો
  emits: ['response'],
  created() {
    // આર્ગ્યુમેન્ટ સાથે એમિટ કરો
    this.$emit('response', 'ચાઇલ્ડ તરફથી નમસ્તે')
  }
}
```

</div>

<span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span> માટે પ્રથમ આર્ગ્યુમેન્ટ ઇવેન્ટનું નામ છે. કોઈપણ વધારાની આર્ગ્યુમેન્ટ્સ ઇવેન્ટ લિસનર (event listener) ને મોકલવામાં આવે છે.

પેરન્ટ `v-on` નો ઉપયોગ કરીને ચાઇલ્ડ દ્વારા એમિટ કરવામાં આવેલી ઇવેન્ટ્સ સાંભળી શકે છે - અહીં હેન્ડલર ચાઇલ્ડ એમિટ કોલમાંથી વધારાની આર્ગ્યુમેન્ટ મેળવે છે અને તેને લોકલ સ્ટેટમાં અસાઇન કરે છે:

<div class="sfc">

```vue-html
<ChildComp @response="(msg) => childMsg = msg" />
```

</div>
<div class="html">

```vue-html
<child-comp @response="(msg) => childMsg = msg"></child-comp>
```

</div>

હવે એડિટરમાં તમારી જાતે પ્રયાસ કરો.
