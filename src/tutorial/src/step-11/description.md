# ઘટકો (Components) {#components}

અત્યાર સુધી, અમે ફક્ત એક જ ઘટક સાથે કામ કરી રહ્યા છીએ. વાસ્તવિક Vue એપ્લિકેશન્સ સામાન્ય રીતે નેસ્ટેડ (nested) ઘટકો સાથે બનાવવામાં આવે છે.

પેરન્ટ (parent) ઘટક તેના ટેમ્પલેટમાં બીજા ઘટકને ચાઇલ્ડ (child) ઘટક તરીકે રેન્ડર કરી શકે છે. ચાઇલ્ડ ઘટકનો ઉપયોગ કરવા માટે, આપણે સૌ પ્રથમ તેને ઇમ્પોર્ટ કરવાની જરૂર છે:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

આપણે `components` ઓપ્શનનો ઉપયોગ કરીને ઘટકને રજીસ્ટર કરવાની પણ જરૂર છે. અહીં અમે `ChildComp` કી હેઠળ `ChildComp` ઘટકને રજીસ્ટર કરવા માટે ઓબ્જેક્ટ પ્રોપર્ટી શોર્ટકટનો ઉપયોગ કરી રહ્યા છીએ.

</div>
</div>

<div class="sfc">

પછી, આપણે ટેમ્પલેટમાં ઘટકનો ઉપયોગ આ રીતે કરી શકીએ છીએ:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

આપણે `components` ઓપ્શનનો ઉપયોગ કરીને ઘટકને રજીસ્ટર કરવાની પણ જરૂર છે. અહીં અમે `ChildComp` કી હેઠળ `ChildComp` ઘટકને રજીસ્ટર કરવા માટે ઓબ્જેક્ટ પ્રોપર્ટી શોર્ટકટનો ઉપયોગ કરી રહ્યા છીએ.

કારણ કે આપણે DOM માં ટેમ્પલેટ લખી રહ્યા છીએ, તે બ્રાઉઝરના પાર્સિંગ (parsing) નિયમોને આધીન રહેશે, જે ટેગ નામો માટે કેસ-ઇન્સેન્સિટિવ (અક્ષરોના કદ પ્રત્યે તટસ્થ) છે. તેથી, ચાઇલ્ડ ઘટકને સંદર્ભિત કરવા માટે આપણે કેબાબ-કેસ્ડ (kebab-cased) નામનો ઉપયોગ કરવાની જરૂર છે:

```vue-html
<child-comp></child-comp>
```

</div>

હવે તે જાતે અજમાવો - ચાઇલ્ડ ઘટકને ઇમ્પોર્ટ કરો અને તેને ટેમ્પલેટમાં રેન્ડર કરો.
