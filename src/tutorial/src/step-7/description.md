# લિસ્ટ રેન્ડરિંગ (List Rendering) {#list-rendering}

આપણે સોર્સ એરેના આધારે એલિમેન્ટ્સની સૂચિ રેન્ડર કરવા માટે `v-for` ડાયરેક્ટિવનો ઉપયોગ કરી શકીએ છીએ:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

અહીં `todo` એ લોકલ વેરિએબલ છે જે હાલમાં ઇટરેટ (iterate) થઈ રહેલા એરે એલિમેન્ટનું પ્રતિનિધિત્વ કરે છે. તે ફક્ત `v-for` એલિમેન્ટ પર અથવા તેની અંદર જ એક્સેસ કરી શકાય છે, જે ફંક્શન સ્કોપ જેવું જ છે.

નોંધ લો કે આપણે દરેક ટૂ-ડૂ (todo) ઓબ્જેક્ટને અનન્ય `id` પણ આપી રહ્યા છીએ, અને તેને દરેક `<li>` માટે <a target="_blank" href="/api/built-in-special-attributes.html#key">ખાસ `key` એટ્રિબ્યુટ</a> તરીકે બાઇન્ડ કરી રહ્યાં છીએ. `key` Vue ને દરેક `<li>` ને એરેમાં તેના સંબંધિત ઓબ્જેક્ટની પોઝિશન સાથે મેચ કરવા માટે સચોટ રીતે ખસેડવાની મંજૂરી આપે છે.

લિસ્ટને અપડેટ કરવાની બે રીતો છે:

૧. સોર્સ એરે પર [મ્યુટેટીંગ મેથડ્સ (mutating methods)](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating) ને કોલ કરો:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

૨. એરેને નવા એરે સાથે બદલો:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

અહીં આપણી પાસે એક સરળ ટૂ-ડૂ લિસ્ટ છે - તેને કાર્યરત કરવા માટે `addTodo()` અને `removeTodo()` મેથડ્સ માટે લોજિક અમલમાં મૂકવાનો પ્રયાસ કરો!

`v-for` પર વધુ વિગતો: <a target="_blank" href="/guide/essentials/list.html">માર્ગદર્શિકા - લિસ્ટ રેન્ડરિંગ</a>
