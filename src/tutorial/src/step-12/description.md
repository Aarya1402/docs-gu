# પ્રોપ્સ (Props) {#props}

ચાઇલ્ડ ઘટક પેરન્ટ પાસેથી **પ્રોપ્સ (props)** દ્વારા ઇનપુટ સ્વીકારી શકે છે. પ્રથમ, તેણે તે જે પ્રોપ્સ સ્વીકારે છે તે જાહેર કરવી પડશે:

<div class="composition-api">
<div class="sfc">

```vue [ChildComp.vue]
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

નોંધ લો કે `defineProps()` એ કમ્પાઇલ-ટાઇમ મેક્રો છે અને તેને ઇમ્પોર્ટ કરવાની જરૂર નથી. એકવાર જાહેર કર્યા પછી, `msg` પ્રોપનો ઉપયોગ ચાઇલ્ડ ઘટકના ટેમ્પલેટમાં થઈ શકે છે. તેને `defineProps()` ના પરત કરેલા ઓબ્જેક્ટ દ્વારા JavaScript માં પણ એક્સેસ કરી શકાય છે.

</div>

<div class="html">

```js
// ચાઇલ્ડ ઘટકમાં
export default {
  props: {
    msg: String
  },
  setup(props) {
    // props.msg ને એક્સેસ કરો
  }
}
```

એકવાર જાહેર કર્યા પછી, `msg` પ્રોપ `this` પર એક્સપોઝ થાય છે અને ચાઇલ્ડ ઘટકના ટેમ્પલેટમાં ઉપયોગમાં લઈ શકાય છે. પ્રાપ્ત થયેલ પ્રોપ્સ `setup()` ને પ્રથમ આર્ગ્યુમેન્ટ તરીકે પસાર કરવામાં આવે છે.

</div>

</div>

<div class="options-api">

```js
// ચાઇલ્ડ ઘટકમાં
export default {
  props: {
    msg: String
  }
}
```

એકવાર જાહેર કર્યા પછી, `msg` પ્રોપ `this` પર એક્સપોઝ થાય છે અને ચાઇલ્ડ ઘટકના ટેમ્પલેટમાં ઉપયોગમાં લઈ શકાય છે.

</div>

પેરન્ટ ઘટક ચાઇલ્ડને એટ્રિબ્યુટ્સની જેમ જ પ્રોપ પાસ કરી શકે છે. ડાયનેમિક વેલ્યુ પાસ કરવા માટે, અમે `v-bind` સિન્ટેક્સનો પણ ઉપયોગ કરી શકીએ છીએ:

<div class="sfc">

```vue-html
<ChildComp :msg="greeting" />
```

</div>
<div class="html">

```vue-html
<child-comp :msg="greeting"></child-comp>
```

</div>

હવે એડિટરમાં તમારી જાતે પ્રયાસ કરો.
