# કન્ડિશનલ રેન્ડરિંગ (Conditional Rendering) {#conditional-rendering}

આપણે એલિમેન્ટને કન્ડિશનલી (શરતી રીતે) રેન્ડર કરવા માટે `v-if` ડાયરેક્ટિવનો ઉપયોગ કરી શકીએ છીએ:

```vue-html
<h1 v-if="awesome">Vue અદભૂત છે!</h1>
```

આ `<h1>` ત્યારે જ રેન્ડર કરવામાં આવશે જો `awesome` ની વેલ્યુ [ટ્રુથી (truthy)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) હોય. જો `awesome` [ફેલ્સી (falsy)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) વેલ્યુમાં બદલાય છે, તો તે DOM માંથી દૂર કરવામાં આવશે.

અમે શરતની અન્ય શાખાઓ દર્શાવવા માટે `v-else` અને `v-else-if` નો પણ ઉપયોગ કરી શકીએ છીએ:

```vue-html
<h1 v-if="awesome">Vue અદભૂત છે!</h1>
<h1 v-else>અરે ના 😢</h1>
```

હાલમાં, ડેમો બંને `<h1>` ને એક જ સમયે બતાવી રહ્યો છે, અને બટન કંઈ કરતું નથી. તેમાં `v-if` અને `v-else` ડાયરેક્ટિવ્સ ઉમેરવાનો પ્રયાસ કરો, અને `toggle()` મેથડ અમલમાં મૂકો જેથી કરીને આપણે તેમની વચ્ચે ટૉગલ (toggle) કરી શકીએ.

`v-if` પર વધુ વિગતો: <a target="_blank" href="/guide/essentials/conditional.html">માર્ગદર્શિકા - કન્ડિશનલ રેન્ડરિંગ</a>
