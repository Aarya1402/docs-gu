# સ્લોટ્સ (Slots) {#slots}

> આ પેજ ધારે છે કે તમે પહેલાથી જ [કમ્પોનન્ટ્સના મૂળભૂત પાસાઓ](/guide/essentials/component-basics) વાંચી લીધું છે. જો તમે કમ્પોનન્ટ્સ માટે નવા હોવ તો પહેલા તે વાંચો.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-component-slots" title="ફ્રી Vue.js સ્લોટ્સ લેસન"/>

## સ્લોટ કન્ટેન્ટ અને આઉટલેટ (Slot Content and Outlet) {#slot-content-and-outlet}

આપણે શીખ્યા છીએ કે ઘટકો પ્રોપ્સ સ્વીકારી શકે છે, જે કોઈપણ પ્રકારના JavaScript મૂલ્યો હોઈ શકે છે. પણ ટેમ્પલેટ કન્ટેન્ટ વિશે શું? કેટલાક કિસ્સાઓમાં, આપણે ચાઇલ્ડ કમ્પોનન્ટમાં ટેમ્પલેટ ફ્રેગમેન્ટ (fragment) પાસ કરવા માંગીએ છીએ, અને ચાઇલ્ડ કમ્પોનન્ટને તેના પોતાના ટેમ્પલેટમાં તે ફ્રેગમેન્ટ રેન્ડર કરવા દેવા માંગીએ છીએ.

ઉદાહરણ તરીકે, આપણી પાસે `<FancyButton>` ઘટક હોઈ શકે છે જે આના જેવા વપરાશને સમર્થન આપે છે:

```vue-html{2}
<FancyButton>
  મને ક્લિક કરો! <!-- સ્લોટ કન્ટેન્ટ -->
</FancyButton>
```

`<FancyButton>` નું ટેમ્પલેટ આના જેવું લાગે છે:

```vue-html{2}
<button class="fancy-btn">
  <slot></slot> <!-- સ્લોટ આઉટલેટ -->
</button>
```

`<slot>` એલિમેન્ટ એ **સ્લોટ આઉટલેટ (slot outlet)** છે જે સૂચવે છે કે પેરેન્ટ દ્વારા પૂરા પાડવામાં આવેલ **સ્લોટ કન્ટેન્ટ (slot content)** ક્યાં રેન્ડર થવું જોઈએ.

![સ્લોટ ડાયાગ્રામ](./images/slots.png)

<!-- https://www.figma.com/file/LjKTYVL97Ck6TEmBbstavX/slot -->

અને ફાઈનલ રેન્ડર થયેલ DOM:

```html
<button class="fancy-btn">મને ક્લિક કરો!</button>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpdUdlqAyEU/ZVbQ0kLMdNsXabTQFvoV8yLcRkkjopLSQj596oTwqRvnuM9y9UT+rR2/hs5qlHjqZM2gOch2m2rZW+NC/BDND1+xRCMBuFMD9N5NeKyeNrqphrUSZdA4L1VJPCEAJrRdCEAvpWke+g5NHcYg1cmADU6cB0A4zzThmYckqimupqiGfpXILe/zdwNhaki3n+0SOR5vAu6ReU++efUajtqYGJQ/FIg5w8Wt9FlOx+OKh/nV1c4ZVNqlHE1TIQQ7xnvCN13zkTNalBSc+Jw5wiTac2H1WLDeDeDyXrJVm9LWG7uE3hev3AhHge1cYwnO200L4QljEnd1bCxB1g82UNhe+I6qQs5kuGcE30NrxeaRudzOWtkemeXuHP5tLIKOv8BN+mw3w==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNpdUdtOwzAM/RUThAbSurIbl1ImARJf0ZesSapoqROlKdo07d9x0jF1SHmIT+xzcY7sw7nZTy9Zwcqu9tqFTYW6ddYH+OZYHz77ECyC8raFySwfYXFsUiFAhXKfBoRUvDcBjhGtLbGgxNAVcLziOlVIp8wvelQE2TrDg6QKoBx1JwDgy+h6B62E8ibLoDM2kAAGoocsiz1VKMfmCCrzCymbsn/GY95rze1grja8694rpmJ/tg1YsfRO/FE134wc2D4YeTYQ9QeKa+mUrgsHE6+zC+vfjoz1Bdwqpd5iveX1rvG2R1GA0Si5zxrPhaaY98v5WshmCrerhVi+LmCxvqPiafUslXoYpq0XkuiQ1p4Ax4XQ2BSwdnuYP7p9QlvuG40JHI1lUaenv3o5w3Xvu2jOWU179oQNn5aisNMvLBvDOg==)

</div>

સ્લોટ્સ સાથે, `<FancyButton>` બહારના `<button>` (અને તેની ફેન્સી સ્ટાઇલ) ને રેન્ડર કરવા માટે જવાબદાર છે, જ્યારે અંદરનું કન્ટેન્ટ પેરેન્ટ કમ્પોનન્ટ દ્વારા પૂરું પાડવામાં આવે છે.

સ્લોટ્સને સમજવાની બીજી રીત એ છે કે તેને JavaScript ફંક્શન્સ સાથે સરખાવવી:

```js
// પેરેન્ટ કમ્પોનન્ટ સ્લોટ કન્ટેન્ટ પાસ કરી રહ્યું છે
FancyButton('મને ક્લિક કરો!')

// FancyButton તેના પોતાના ટેમ્પલેટમાં સ્લોટ કન્ટેન્ટ રેન્ડર કરે છે
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

સ્લોટ કન્ટેન્ટ માત્ર લખાણ સુધી મર્યાદિત નથી. તે કોઈપણ માન્ય ટેમ્પલેટ કન્ટેન્ટ હોઈ શકે છે. ઉદાહરણ તરીકે, આપણે બહુવિધ એલિમેન્ટ્સ અથવા અન્ય ઘટકો પણ પાસ કરી શકીએ છીએ:

```vue-html
<FancyButton>
  <span style="color:red">મને ક્લિક કરો!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1UmtOwkAQvspQYtCEgrx81EqCJibeoX+W7bRZaHc3+1AI4QyewH8ewvN4Aa/gbgtNIfFf5+vMfI/ZXbCQcvBmMYiCWFPFpAGNxsp5wlkphTLwQjjdPlljBIdMiRJ6g2EL88O9pnnxjlqU+EpbzS3s0BwPaypH4gqDpSyIQVcBxK3VFQDwXDC6hhJdlZi4zf3fRKwl4aDNtsDHJKCiECqiW8KTYH5c1gEnwnUdJ9rCh/XeM6Z42AgN+sFZAj6+Ux/LOjFaEK2diMz3h0vjNfj/zokuhPFU3lTdfcpShVOZcJ+DZgHs/HxtCrpZlj34eknoOlfC8jSCgnEkKswVSRlyczkZzVLM+9CdjtPJ/RjGswtX3ExvMcuu6mmhUnTruOBYAZKkKeN5BDO5gdG13FRoSVTOeAW2xkLPY3UEdweYWqW9OCkYN6gctq9uXllx2Z09CJ9dJwzBascI7nBYihWDldUGMqEgdTVIq6TQqCEMfUpNSD+fX7/fH+3b7P8AdGP6wA==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNptUltu2zAQvMpGQZEWsOzGiftQ1QBpgQK9g35oaikwkUiCj9aGkTPkBPnLIXKeXCBXyJKKBdoIoA/tYGd3doa74tqY+b+ARVXUjltp/FWj5GC09fCHKb79FbzXCoTVA5zNFxkWaWdT8/V/dHrAvzxrzrC3ZoBG4SYRWhQs9B52EeWapihU3lWwyxfPDgbfNYq+ejEppcLjYHrmkSqAOqMmAOB3L/ktDEhV4+v8gMR/l1M7wxQ4v+3xZ1Nw3Wtb8S1TTXG1H3cCJIO69oxc5mLUcrSrXkxSi1lxZGT0//CS9Wg875lzJELE/nLto4bko69dr31cFc8auw+3JHvSEfQ7nwbsHY9HwakQ4kes14zfdlYH1VbQS4XMlp1lraRMPl6cr1rsZnB6uWwvvi9hufpAxZfLryjEp5GtbYs0TlGICTCsbaXqKliZDZx/NpuEDsx2UiUwo5VxT6Dkv73BPFgXxRktlUdL2Jh6OoW8O3pX0buTsoTgaCNQcDjoGwk3wXkQ2tJLGzSYYI126KAso0uTSc8Pjy9P93k2d6+NyRKa)

</div>

સ્લોટ્સનો ઉપયોગ કરીને, અમારું `<FancyButton>` વધુ લવચીક અને પુનઃઉપયોગી છે. અમે હવે વિવિધ સ્થાનો પર વિવિધ આંતરિક કન્ટેન્ટ સાથે તેનો ઉપયોગ કરી શકીએ છીએ, પરંતુ બધું સમાન ફેન્સી સ્ટાઇલ સાથે હશે.

Vue કમ્પોનન્ટ્સની સ્લોટ મિકેનિઝમ [નેટિવ વેબ કમ્પોનન્ટ `<slot>` એલિમેન્ટ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) થી પ્રેરિત છે, પરંતુ વધારાની ક્ષમતાઓ સાથે જે આપણે પછી જોઈશું.

## રેન્ડર સ્કોપ (Render Scope) {#render-scope}

સ્લોટ કન્ટેન્ટ પાસે પેરેન્ટ કમ્પોનન્ટના ડેટા સ્કોપની એક્સેસ હોય છે, કારણ કે તે પેરેન્ટમાં વ્યાખ્યાયિત થયેલ છે. ઉદાહરણ તરીકે:

```vue-html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

અહીં બંને <span v-pre>`{{ message }}`</span> ઇન્ટરપોલેશન્સ સમાન કન્ટેન્ટ રેન્ડર કરશે.

સ્લોટ કન્ટેન્ટ પાસે ચાઇલ્ડ કમ્પોનન્ટના ડેટાની એક્સેસ હોતી **નથી**. Vue ટેમ્પલેટ્સમાં એક્સપ્રેશન્સ ફક્ત તે સ્કોપને જ એક્સેસ કરી શકે છે જેમાં તે વ્યાખ્યાયિત થયેલ છે, જે JavaScript ના લેક્સિકલ સ્કોપિંગ (lexical scoping) સાથે સુસંગત છે. બીજા શબ્દોમાં:

> પેરેન્ટ ટેમ્પલેટમાંના એક્સપ્રેશન્સ પાસે ફક્ત પેરેન્ટ સ્કોપની એક્સેસ હોય છે; ચાઇલ્ડ ટેમ્પલેટમાંના એક્સપ્રેશન્સ પાસે ફક્ત ચાઇલ્ડ સ્કોપની એક્સેસ હોય છે.

## ફોલબેક કન્ટેન્ટ (Fallback Content) {#fallback-content}

એવા કિસ્સાઓ છે જ્યારે સ્લોટ માટે ફોલબેક (એટલે કે ડિફોલ્ટ) કન્ટેન્ટ સ્પષ્ટ કરવું ઉપયોગી છે, જે ત્યારે જ રેન્ડર કરવામાં આવે જ્યારે કોઈ કન્ટેન્ટ પૂરું પાડવામાં ન આવે. ઉદાહરણ તરીકે, `<SubmitButton>` કમ્પોનન્ટમાં:

```vue-html
<button type="submit">
  <slot></slot>
</button>
```

જો પેરેન્ટ કોઈ સ્લોટ કન્ટેન્ટ પૂરું પાડતું નથી, તો આપણે ઈચ્છીએ છીએ કે લખાણ "સબમિટ (Submit)" `<button>` ની અંદર રેન્ડર થાય. "સબમિટ" ને ફોલબેક કન્ટેન્ટ બનાવવા માટે, આપણે તેને `<slot>` ટેગ વચ્ચે મૂકી શકીએ છીએ:

```vue-html{3}
<button type="submit">
  <slot>
    સબમિટ <!-- ફોલબેક કન્ટેન્ટ -->
  </slot>
</button>
```

હવે જ્યારે આપણે પેરેન્ટ કમ્પોનન્ટમાં `<SubmitButton>` નો ઉપયોગ કરીએ છીએ, ત્યારે સ્લોટ માટે કોઈ કન્ટેન્ટ પ્રદાન ન કરીએ તો:

```vue-html
<SubmitButton />
```

આ ફોલબેક કન્ટેન્ટ, "સબમિટ" રેન્ડર કરશે:

```html
<button type="submit">સબમિટ</button>
```

પરંતુ જો આપણે કન્ટેન્ટ પ્રદાન કરીએ:

```vue-html
<SubmitButton>સેવ કરો</SubmitButton>
```

પછી પૂરા પાડવામાં આવેલ કન્ટેન્ટ તેના બદલે રેન્ડર કરવામાં આવશે:

```html
<button type="submit">સેવ કરો</button>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1kMsKwjAQRX9lzMaNbfcSC/oL3WbT1ikU8yKZFEX8d5MGgi2YVeZxZ86dN7taWy8B2ZlxP7rZEnikYFuhZ2WNI+jCoGa6BSKjYXJGwbFufpNJfhSaN1kflTEgVFb2hDEC4IeqguARpl7KoR8fQPgkqKpc3Wxo1lxRWWeW+Y4wBk9x9V9d2/UL8g1XbOJN4WAntodOnrecQ2agl8WLYH7tFyw5olj10iR3EJ+gPCxDFluj0YS6EAqKR8mi9M3Td1ifLxWShcU=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp1UEEOwiAQ/MrKxYu1d4Mm+gWvXChuk0YKpCyNxvh3lxIb28SEA8zuDDPzEucQ9mNCcRAymqELdFKu64MfCK6p6Tu6JCLvoB18D9t9/Qtm4lY5AOXwMVFu2OpkCV4ZNZ51HDqKhwLAQjIjb+X4yHr+mh+EfbCakF8AclNVkCJCq61ttLkD4YOgqsp0YbGesJkVBj92NwSTIrH3v7zTVY8oF8F4SdazD7ET69S5rqXPpnigZ8CjEnHaVyInIp5G63O6XIGiIlZMzrGMd8RVfR0q4lIKKV+L+srW+wNTTZq3)

</div>

## નામવાળા સ્લોટ્સ (Named Slots) {#named-slots}

એવા સમયે હોય છે જ્યારે સિંગલ કમ્પોનન્ટમાં બહુવિધ સ્લોટ આઉટલેટ્સ હોવા ઉપયોગી છે. ઉદાહરણ તરીકે, નીચેના ટેમ્પલેટ સાથે `<BaseLayout>` કમ્પોનન્ટમાં:

```vue-html
<div class="container">
  <header>
    <!-- આપણે હીડર કન્ટેન્ટ અહીં ઈચ્છીએ છીએ -->
  </header>
  <main>
    <!-- આપણે મેઈન કન્ટેન્ટ અહીં ઈચ્છીએ છીએ -->
  </main>
  <footer>
    <!-- આપણે ફૂટર કન્ટેન્ટ અહીં ઈચ્છીએ છીએ -->
  </footer>
</div>
```

આ કેસો માટે, `<slot>` એલિમેન્ટ પાસે એક વિશેષ એટ્રિબ્યુટ `name` છે, જેનો ઉપયોગ વિવિધ સ્લોટ્સને અનન્ય ID આપવા માટે થઈ શકે છે જેથી તમે નક્કી કરી શકો કે કન્ટેન્ટ ક્યાં રેન્ડર થવું જોઈએ:

```vue-html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

`name` વગરનું `<slot>` આઉટલેટ ગૌણ રીતે "default" નામ ધરાવે છે.

`<BaseLayout>` નો ઉપયોગ કરતા પેરેન્ટ કમ્પોનન્ટમાં, આપણે બહુવિધ સ્લોટ કન્ટેન્ટ ફ્રેગમેન્ટ્સ પાસ કરવાની રીતની જરૂર છે, દરેક એક અલગ સ્લોટ આઉટલેટને ટાર્ગેટ કરે છે. ત્યાં જ **નામવાળા સ્લોટ્સ (named slots)** આવે છે.

નામવાળા સ્લોટને પાસ કરવા માટે, આપણે `v-slot` ડાયરેક્ટિવ સાથે `<template>` એલિમેન્ટનો ઉપયોગ કરવાની જરૂર છે, અને પછી `v-slot` માં આર્ગ્યુમેન્ટ તરીકે સ્લોટનું નામ પાસ કરવું પડશે:

```vue-html
<BaseLayout>
  <template v-slot:header>
    <!-- હીડર સ્લોટ માટે કન્ટેન્ટ -->
  </template>
</BaseLayout>
```

`v-slot` પાસે ડેડિકેટેડ શોર્ટહેન્ડ `#` છે, તેથી `<template v-slot:header>` ને ટૂંકાવીને ફક્ત `<template #header>` કરી શકાય છે. તેને આ રીતે વિચારો "આ ટેમ્પલેટ ફ્રેગમેન્ટને ચાઇલ્ડ કમ્પોનન્ટના 'header' સ્લોટમાં રેન્ડર કરો".

![નામવાળા સ્લોટનું ચિત્ર](./images/named-slots.png)

<!-- https://www.figma.com/file/2BhP8gVZevttBu9oUmUUyz/named-slot -->

શોર્ટહેન્ડ સિન્ટેક્સનો ઉપયોગ કરીને `<BaseLayout>` માં ત્રણેય સ્લોટ્સ માટે કન્ટેન્ટ પાસ કરતો કોડ અહીં છે:

```vue-html
<BaseLayout>
  <template #header>
    <h1>અહીં પેજ ટાઇટલ હોઈ શકે છે</h1>
  </template>

  <template #default>
    <p>મેઈન કન્ટેન્ટ માટેનો પેરેગ્રાફ.</p>
    <p>અને બીજો એક.</p>
  </template>

  <template #footer>
    <p>અહીં કેટલીક સંપર્ક માહિતી છે</p>
  </template>
</BaseLayout>
```

જ્યારે કમ્પોનન્ટ ડિફોલ્ટ સ્લોટ અને નામવાળા સ્લોટ બંનેને સ્વીકારે છે, ત્યારે તમામ ટોપ-લેવલ નોન-`<template>` નોડ્સ ગૌણ રીતે ડિફોલ્ટ સ્લોટ માટે કન્ટેન્ટ તરીકે ગણવામાં આવે છે. તેથી ઉપરનાને આ પ્રમાણે પણ લખી શકાય છે:

```vue-html
<BaseLayout>
  <template #header>
    <h1>અહીં પેજ ટાઇટલ હોઈ શકે છે</h1>
  </template>

  <!-- ગૌણ (implicit) ડિફોલ્ટ સ્લોટ -->
  <p>મેઈન કન્ટેન્ટ માટેનો પેરેગ્રાફ.</p>
  <p>અને બીજો એક.</p>

  <template #footer>
    <p>અહીં કેટલીક સંપર્ક માહિતી છે</p>
  </template>
</BaseLayout>
```

હવે `<template>` એલિમેન્ટ્સની અંદરની દરેક વસ્તુ સંબંધિત સ્લોટ્સમાં પસાર કરવામાં આવશે. અંતિમ રેન્ડર કરાયેલ HTML આ પ્રમાણે હશે:

```html
<div class="container">
  <header>
    <h1>અહીં પેજ ટાઇટલ હોઈ શકે છે</h1>
  </header>
  <main>
    <p>મેઈન કન્ટેન્ટ માટેનો પેરેગ્રાફ.</p>
    <p>અને બીજો એક.</p>
  </main>
  <footer>
    <p>અહીં કેટલીક સંપર્ક માહિતી છે</p>
  </footer>
</div>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9UsFuwjAM/RWrHLgMOi5o6jIkdtphn9BLSF0aKU2ixEVjiH+fm8JoQdvRfu/5xS8+ZVvvl4cOsyITUQXtCSJS5zel1a13geBdRvyUR9cR1MG1MF/mt1YvnZdW5IOWVVwQtt5IQq4AxI2cau5ccZg1KCsMlz4jzWrzgQGh1fuGYIcgwcs9AmkyKHKGLyPykcfD1Apr2ZmrHUN+s+U5Qe6D9A3ULgA1bCK1BeUsoaWlyPuVb3xbgbSOaQGcxRH8v3XtHI0X8mmfeYToWkxmUhFoW7s/JvblJLERmj1l0+T7T5tqK30AZWSMb2WW3LTFUGZXp/u8o3EEVrbI9AFjLn8mt38fN9GIPrSp/p4/Yoj7OMZ+A/boN9KInPeZZpAOLNLRDAsPZDgN4p0L/NQFOV/Ayn9x6EZXMFNKvQ4E5YwLBczW6/WlU3NIi6i/sYDn5Qu2qX1OF51MsvMPkrIEHg==)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9UkFuwjAQ/MoqHLiUpFxQlaZI9NRDn5CLSTbEkmNb9oKgiL934wRwQK3ky87O7njGPicba9PDHpM8KXzlpKV1qWVnjSP4FB6/xcnsCRpnOpin2R3qh+alBig1HgO9xkbsFcG5RyvDOzRq8vkAQLSury+l5lNkN1EuCDurBCFXAMWdH2pGrn2YtShqdCPOnXa5/kKH0MldS7BFEGDFDoEkKSwybo8rskjjaevo4L7Wrje8x4mdE7aFxjiglkWE1GxQE9tLi8xO+LoGoQ3THLD/qP2/dGMMxYZs8DP34E2HQUxUBFI35o+NfTlJLOomL8n04frXns7W8gCVEt5/lElQkxpdmVyVHvP2yhBo0SHThx5z+TEZvl1uMlP0oU3nH/kRo3iMI9Ybes960UyRsZ9pBuGDeTqpwfBAvn7NrXF81QUZm8PSHjl0JWuYVVX1PhAqo4zLYbZarUak4ZAWXv5gDq/pG3YBHn50EEkuv5irGBk=)

</div>

ફરીથી, તે તમને જાવાસ્ક્રિપ્ટ ફંક્શન સામ્યતાનો ઉપયોગ કરીને નામવાળા સ્લોટ્સને વધુ સારી રીતે સમજવામાં મદદ કરી શકે છે:

```js
// વિવિધ નામો સાથે બહુવિધ સ્લોટ ફ્રેગમેન્ટ્સ પાસ કરવા
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> તેમને વિવિધ સ્થળોએ રેન્ડર કરે છે
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

## શરતી સ્લોટ્સ (Conditional Slots) {#conditional-slots}

ક્યારેક તમે સ્લોટમાં કન્ટેન્ટ પાસ કરવામાં આવ્યું છે કે નહીં તેના આધારે કંઈક રેન્ડર કરવા માંગો છો.

આ હાંસલ કરવા માટે તમે [v-if](/guide/essentials/conditional.html#v-if) સાથે સંયોજનમાં [$slots](/api/component-instance.html#slots) પ્રોપર્ટીનો ઉપયોગ કરી શકો છો.

નીચેના ઉદાહરણમાં અમે ત્રણ શરતી સ્લોટ્સ સાથે 'કાર્ડ (Card)' કમ્પોનન્ટ વ્યાખ્યાયિત કરીએ છીએ: `header`, `footer` અને `default`.
જ્યારે હીડર / ફૂટર / ડિફોલ્ટ માટે કન્ટેન્ટ હાજર હોય, ત્યારે અમે વધારાની સ્ટાઇલ પૂરી પાડવા માટે તેને લપેટવા (wrap) માંગીએ છીએ:

```vue-html
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVVMtu2zAQ/BWCLZBLIjVoTq4aoA1yaA9t0eaoCy2tJcYUSZCUKyPwv2dJioplOw4C+EDuzM4+ONYT/aZ1tumBLmhhK8O1IxZcr29LyTutjCN3zNRkZVRHLrLcXzz9opRFHvnIxIuDTgvmAG+EFJ4WTnhOCPnQAqvBjHFE2uvbh5Zbgj/XAolwkWN4TM33VI/UalixXvjyo5yeqVVKOpCuyP0ob6utlHL7vUE3U4twkWP4hJq/jiPP4vSSOouNrHiTPVolcclPnl3SSnWaCzC/teNK2pIuSEA8xoRQ/3+GmDM9XKZ41UK1PhF/tIOPlfSPAQtmAyWdMMdMAy7C9/9+wYDnCexU3QtknwH/glWi9z1G2vde1tj2Hi90+yNYhcvmwd4PuHabhvKNeuYu8EuK1rk7M/pLu5+zm5BXyh1uMdnOu3S+95pvSCWYtV9xQcgqaXogj2yu+AqBj1YoZ7NosJLOEq5S9OXtPZtI1gFSppx8engUHs+vVhq9eVhq9ORRrXdpRyseSqfo6SmmnONK6XTw9yis24q448wXSG+0VAb3sSDXeiBoDV6TpWDV+ktENatrdMGCfAoBfL1JYNzzpINJjVFoJ9yKUKho19ul6OFQ6UYPx1rjIpPYeXIc/vXCgjetawzbni0dPnhhJ3T3DMVSruI=)

## ડાયનેમિક સ્લોટ નામો (Dynamic Slot Names) {#dynamic-slot-names}

[ડાયનેમિક ડાયરેક્ટિવ આર્ગ્યુમેન્ટ્સ](/guide/essentials/template-syntax.md#dynamic-arguments) `v-slot` પર પણ કામ કરે છે, જે ડાયનેમિક સ્લોટ નામોની વ્યાખ્યા કરવાની મંજૂરી આપે છે:

```vue-html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- શોર્ટહેન્ડ સાથે -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

નોંધ કરો કે એક્સપ્રેશન ડાયનેમિક ડાયરેક્ટિવ આર્ગ્યુમેન્ટ્સના [સિન્ટેક્સ અવરોધો (syntax constraints)](/guide/essentials/template-syntax.md#dynamic-argument-syntax-constraints) ને આધીન છે.

## સ્કોપ્ડ સ્લોટ્સ (Scoped Slots) {#scoped-slots}

[રેન્ડર સ્કોપ](#render-scope) માં ચર્ચા કર્યા મુજબ, સ્લોટ કન્ટેન્ટ પાસે ચાઇલ્ડ કમ્પોનન્ટમાંના સ્ટેટની એક્સેસ હોતી નથી.

જો કે, એવા કિસ્સાઓ છે કે જેમાં જો સ્લોટનું કન્ટેન્ટ પેરેન્ટ સ્કોપ અને ચાઇલ્ડ સ્કોપ બંનેના ડેટાનો ઉપયોગ કરી શકે તો તે ઉપયોગી થઈ શકે છે. તે હાંસલ કરવા માટે, આપણે ચાઇલ્ડ માટે સ્લોટ રેન્ડર કરતી વખતે તેમાં ડેટા પાસ કરવાની રીતની જરૂર છે.

હકીકતમાં, આપણે બરાબર તે જ કરી શકીએ છીએ - આપણે સ્લોટ આઉટલેટમાં એટ્રિબ્યુટ્સ પાસ કરી શકીએ છીએ જેમ કે કમ્પોનન્ટમાં પ્રોપ્સ પાસ કરીએ છીએ:

```vue-html
<!-- <MyComponent> ટેમ્પલેટ -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

સિંગલ ડિફોલ્ટ સ્લોટ વિરુદ્ધ નામવાળા સ્લોટ્સનો ઉપયોગ કરતી વખતે સ્લોટ પ્રોપ્સ મેળવવાનું થોડું અલગ છે. અમે સૌ પ્રથમ ચાઇલ્ડ કમ્પોનન્ટ ટેગ પર સીધા `v-slot` નો ઉપયોગ કરીને, સિંગલ ડિફોલ્ટ સ્લોટનો ઉપયોગ કરીને પ્રોપ્સ કેવી રીતે મેળવવી તે બતાવવા જઈ રહ્યા છીએ:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

![સ્કોપ્ડ સ્લોટ્સ ડાયાગ્રામ](./images/scoped-slots.svg)

<!-- https://www.figma.com/file/QRneoj8eIdL1kw3WQaaEyc/scoped-slot -->

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNp9kMEKgzAMhl8l9OJlU3aVOhg7C3uAXsRlTtC2tFE2pO++dA5xMnZqk+b/8/2dxMnadBxQ5EL62rWWwCMN9qh021vjCMrn2fBNoya4OdNDkmarXhQnSstsVrOOC8LedhVhrEiuHca97wwVSsTj4oz1SvAUgKJpgqWZEj4IQoCvZm0Gtgghzss1BDvIbFkqdmID+CNdbbQnaBwitbop0fuqQSgguWPXmX+JePe1HT/QMtJBHnE51MZOCcjfzPx04JxsydPzp2Szxxo7vABY1I/p)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFkNFqxCAQRX9l8CUttAl9DbZQ+rzQD/AlJLNpwKjoJGwJ/nvHpAnusrAg6FzHO567iE/nynlCUQsZWj84+lBmGJ31BKffL8sng4bg7O0IRVllWnpWKAOgDF7WBx2em0kTLElt975QbwLkhkmIyvCS1TGXC8LR6YYwVSTzH8yvQVt6VyJt3966oAR38XhaFjjEkvBCECNcia2d2CLyOACZQ7CDrI6h4kXcAF7lcg+za6h5et4JPdLkzV4B9B6RBtOfMISmxxqKH9TarrGtATxMgf/bDfM/qExEUCdEDuLGXAmoV06+euNs2JK7tyCrzSNHjX9aurQf)

</div>

ચાઇલ્ડ દ્વારા સ્લોટમાં પાસ કરાયેલ પ્રોપ્સ સંબંધિત `v-slot` ડાયરેક્ટિવની વેલ્યુ તરીકે ઉપલબ્ધ છે, જે સ્લોટની અંદરના એક્સપ્રેશન્સ દ્વારા એક્સેસ કરી શકાય છે.

તમે સ્કોપ્ડ સ્લોટને ચાઇલ્ડ કમ્પોનન્ટમાં પસાર થતા ફંક્શન તરીકે વિચારી શકો છો. ચાઇલ્ડ કમ્પોનન્ટ પછી તેને કૉલ કરે છે, આર્ગ્યુમેન્ટ્સ તરીકે પ્રોપ્સ પાસ કરે છે:

```js
MyComponent({
  // ડિફોલ્ટ સ્લોટ પાસ કરવો, પણ એક ફંક્શન તરીકે
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'હેલો'
  return `<div>${
    // પ્રોપ્સ સાથે સ્લોટ ફંક્શનને કૉલ કરો!
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

હકીકતમાં, આ સ્કોપ્ડ સ્લોટ્સ કેવી રીતે કમ્પાઇલ કરવામાં આવે છે અને તમે મેન્યુઅલ [રેન્ડર ફંક્શન્સ (render functions)](/guide/extras/render-function) માં સ્કોપ્ડ સ્લોટ્સનો ઉપયોગ કેવી રીતે કરશો તેની ખૂબ નજીક છે.

નોંધ કરો કે `v-slot="slotProps"` સ્લોટ ફંક્શન સિગ્નેચર સાથે કેવી રીતે મેળ ખાય છે. બરાબર ફંક્શન આર્ગ્યુમેન્ટ્સની જેમ, આપણે `v-slot` માં ડિસ્ટ્રક્ચરિંગનો ઉપયોગ કરી શકીએ છીએ:

```vue-html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### નામવાળા સ્કોપ્ડ સ્લોટ્સ (Named Scoped Slots) {#named-scoped-slots}

નામવાળા સ્કોપ્ડ સ્લોટ્સ સમાન રીતે કામ કરે છે - સ્લોટ પ્રોપ્સ `v-slot` ડાયરેક્ટિવની વેલ્યુ તરીકે એક્સેસિબલ હોય છે: `v-slot:name="slotProps"`. શોર્ટહેન્ડનો ઉપયોગ કરતી વખતે, તે આના જેવું લાગે છે:

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

નામવાળા સ્લોટમાં પ્રોપ્સ પાસ કરવી:

```vue-html
<slot name="header" message="હેલો"></slot>
```

નોંધ કરો કે સ્લોટનું `name` પ્રોપ્સમાં શામેલ કરવામાં આવશે નહીં કારણ કે તે રિઝર્વ્ડ (reserved) છે - તેથી પરિણામી `headerProps` એ `{ message: 'હેલો' }` હશે.

જો તમે ડિફોલ્ટ સ્કોપ્ડ સ્લોટ સાથે નામવાળા સ્લોટ્સ મિક્સ કરી રહ્યાં છો, તો તમારે ડિફોલ્ટ સ્લોટ માટે સ્પષ્ટ `<template>` ટેગનો ઉપયોગ કરવાની જરૂર છે. કમ્પોનન્ટ પર સીધા જ `v-slot` ડાયરેક્ટિવને મૂકવાનો પ્રયાસ કરવાથી કમ્પાઈલેશન એરર આવશે. આ ડિફોલ્ટ સ્લોટના પ્રોપ્સના સ્કોપ વિશેની કોઈપણ અસ્પષ્ટતાને ટાળવા માટે છે. ઉદાહરણ તરીકે:

```vue-html
<!-- <MyComponent> ટેમ્પલેટ -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" />
</div>
```

```vue-html
<!-- આ ટેમ્પલેટ કમ્પાઇલ થશે નહીં -->
<MyComponent v-slot="{ message }">
  <p>{{ message }}</p>
  <template #footer>
    <!-- message ડિફોલ્ટ સ્લોટનું છે, અને અહીં ઉપલબ્ધ નથી -->
    <p>{{ message }}</p>
  </template>
</MyComponent>
```

ડિફોલ્ટ સ્લોટ માટે સ્પષ્ટ `<template>` ટેગનો ઉપયોગ કરવાથી તે સ્પષ્ટ કરવામાં મદદ મળે છે કે `message` પ્રોપ અન્ય સ્લોટની અંદર ઉપલબ્ધ નથી:

```vue-html
<MyComponent>
  <!-- એક્સપ્લીસિટ (સ્પષ્ટ) ડિફોલ્ટ સ્લોટ વાપરો -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>

  <template #footer>
    <p>અહીં કેટલીક સંપર્ક માહિતી છે</p>
  </template>
</MyComponent>
```

### ફેન્સી લિસ્ટ ઉદાહરણ (Fancy List Example) {#fancy-list-example}

તમે કદાચ વિચારતા હશો કે સ્કોપ્ડ સ્લોટ્સ માટે કયો સારો ઉપયોગ હોઈ શકે. અહીં એક ઉદાહરણ છે: કલ્પના કરો કે એક `<FancyList>` કમ્પોનન્ટ જે વસ્તુઓની યાદી (લિસ્ટ) રેન્ડર કરે છે - તે રિમોટ ડેટા લોડ કરવા માટેના લોજિકને એન્કેપ્સ્યુલેટ કરી શકે છે, લિસ્ટ પ્રદર્શિત કરવા માટે ડેટાનો ઉપયોગ કરી શકે છે, અથવા પેજિનેશન (pagination) અથવા ઇન્ફિનાઇટ સ્ક્રોલીંગ (infinite scrolling) જેવી એડવાન્સ સુવિધાઓ પણ હોઈ શકે છે. જો કે, અમે ઈચ્છીએ છીએ કે તે દરેક આઈટમ કેવી દેખાય તેની સાથે લવચીક હોય અને દરેક આઈટમની સ્ટાઇલિંગ તેને વાપરનારા પેરેન્ટ કમ્પોનન્ટ પર છોડી દે. તેથી ઇચ્છિત વપરાશ આના જેવો દેખાઈ શકે છે:

```vue-html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>{{ username }} દ્વારા | {{ likes }} લાઈક્સ</p>
    </div>
  </template>
</FancyList>
```

`<FancyList>` ની અંદર, આપણે વિવિધ આઈટમ ડેટા સાથે સમાન `<slot>` ને બહુવિધ વખત રેન્ડર કરી શકીએ છીએ (નોંધ લો કે આપણે સ્લોટ પ્રોપ્સ તરીકે ઓબ્જેક્ટ પાસ કરવા માટે `v-bind` નો ઉપયોગ કરી રહ્યા છીએ):

```vue-html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqFU2Fv0zAQ/StHJtROapNuZTBCNwnQQKBpTGxCQss+uMml8+bYlu2UlZL/zjlp0lQa40sU3/nd3Xv3vA7eax0uSwziYGZTw7UDi67Up4nkhVbGwScm09U5tw5yowoYhFEX8cBBImdRgyQMHRwWWjCHdAKYbdFM83FpxEkS0DcJINZoxpotkCIHkySo7xOixcMep19KrmGustUISotGsgJHIPgDWqg6DKEyvoRUMGsJ4HG9HGX16bqpAlU1izy5baqDFegYweYroMttMwLAHx/Y9Kyan36RWUTN2+mjXfpbrei8k6SjdSuBYFOlMaNI6AeAtcflSrqx5b8xhkl4jMU7H0yVUCaGvVeH8+PjKYWqWnpf5DQYBTtb+fc612Awh2qzzGaBiUyVpBVpo7SFE8gw5xIv/Wl4M9gsbjCCQbuywe3+FuXl9iiqO7xpElEEhUofKFQo2mTGiFiOLr3jcpFImuiaF6hKNxzuw8lpw7kuEy6ZKJGK3TR6NluLYXBVqwRXQjkLn0ueIc3TLonyZ0sm4acqKVovKIbDCVQjGsb1qvyg2telU4Yzz6eHv6ARBWdwjVqUNCbbFjqgQn6aW1J8RKfJhDg+5/lStG4QHJZjnpO5XjT0BMqFu+uZ81yxjEQJw7A1kOA76FyZjaWBy0akvu8tCQKeQ+d7wsy5zLpz1FlzU3kW1QP+x40ApWgWAySEJTv6/NitNMkllcTakwCaZZ5ADEf6cROas/RhYVQps5igEpkZLwzRROmG04OjDBcj7+Js+vYQDo9e0uH1qzeY5/s1vtaaqG969+vTTrsmBTMLLv12nuy7l+d5W673SBzxkzlfhPdWSXokdZMkSFWhuUDzTTtOnk6CuG2fBEwI9etrHXOmRLJUE0/vMH14In5vH30sCS4Nkr+WmARdztHQ6Jr02dUFPtJ/lyxUVgq6/UzyO1olSj9jc+0DcaWxe/fqab/UT51Uu7Znjw6lbUn5QWtR6vtJQM//4zPUt+NOw+lGzCqo/gLm1QS8)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNVNtq20AQ/ZWpQnECujhO0qaqY+hD25fQl4RCifKwllbKktXushcT1/W/d1bSSnYJNCCEZmbPmcuZ1S76olS6cTTKo6UpNVN2VQjWKqktfCOi3N4yY6HWsoVZmo0eD5kVAqAQ9KU7XNGaOG5h572lRAZBhTV574CJzJv7QuCzzMaMaFjaKk4sRQtgOeUmiiVO85siwncRQa6oThRpKHrO50XUnUdEwMMJw08M7mAtq20MzlAtSEtj4OyZGkweMIiq2AZKToxBgMcdxDCqVrueBfb7ZaaOQiOspZYgbL0FPBySIQD+eMeQc99/HJIsM0weqs+O258mjfZREE1jt5yCKaWiFXpSX0A/5loKmxj2m+YwT69p+7kXg0udw8nlYn19fYGufvSeZBXF0ZGmR2vwmrJKS4WiPswGWWYxzIIgs8fYH6mIJadnQXdNrdMiWAB+yJ7gsXdgLfjqcK10wtJqgmYZ+spnpGgl6up5oaa2fGKi6U8Yau9ZS6Wzpwi7WU1p7BMzaZcLbuBh0q2XM4fZXTc+uOPSGvjuWEWxlaAexr9uiIBf0qG3Uy6HxXwo9B+mn47CvbNSM+LHccDxAyvmjMA9Vdxh1WQiO0eywBVGEaN3Pj972wVxPKwOZ7BJWI2b+K5rOOVUNPbpYJNvJalwZmmahm3j7AhdSz3sPzDRS3R4SQwOCXxP4yVBzJqJarSzcY8H5mXWFfif1QVwPGjGcQWTLp7YrcLxCfyDdAuMW0cq30AOV+plcK1J+dxoXJkqR6igRCeNxjbxp3N6cX5V0Sb2K19dfFrA4uo9Gh8uP9K6Puvw3eyx9SH3IT/qPCZpiW6Y8Gq9mvekrutAN96o/V99ALPj)

</div>

### રેન્ડરલેસ કમ્પોનન્ટ્સ (Renderless Components) {#renderless-components}

અમે ઉપર જે `<FancyList>` ઉદાહરણની ચર્ચા કરી છે તે પુનઃઉપયોગી લોજિક (ડેટા ફેચિંગ, પેજિનેશન વગેરે) અને વિઝ્યુઅલ આઉટપુટ બંનેને એન્કેપ્સ્યુલેટ કરે છે, જ્યારે સ્કોપ્ડ સ્લોટ્સ દ્વારા વિઝ્યુઅલ આઉટપુટનો ભાગ કન્ઝ્યુમર કમ્પોનન્ટ (consumer component) ને સોંપે છે.

જો આપણે આ ખ્યાલને થોડો આગળ ધપાવીએ, તો આપણે એવા ઘટકો સાથે આવી શકીએ છીએ જે માત્ર લોજિકને જ એન્કેપ્સ્યુલેટ કરે છે અને પોતાની રીતે કંઈપણ રેન્ડર કરતા નથી - વિઝ્યુઅલ આઉટપુટ સ્કોપ્ડ સ્લોટ્સ સાથે સંપૂર્ણપણે કન્ઝ્યુમર કમ્પોનન્ટને સોંપવામાં આવે છે. આપણે આ પ્રકારના કમ્પોનન્ટને **રેન્ડરલેસ કમ્પોનન્ટ (Renderless Component)** કહીએ છીએ.

રેન્ડરલેસ કમ્પોનન્ટનું ઉદાહરણ એ હોઈ શકે છે જે માઉસની વર્તમાન સ્થિતિને ટ્રેક કરવાના લોજિકને એન્કેપ્સ્યુલેટ કરે છે:

```vue-html
<MouseTracker v-slot="{ x, y }">
  માઉસ અત્યારે અહીં છે: {{ x }}, {{ y }}
</MouseTracker>
```

<div class="composition-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqNUcFqhDAQ/ZUhF12w2rO4Cz301t5aaCEX0dki1SQko6uI/96J7i4qLPQQmHmZ9+Y9ZhQvxsRdiyIVmStsZQgcUmtOUlWN0ZbgXbcOP2xe/KKFs9UNBHGyBj09kCpLFj4zuSFsTJ0T+o6yjUb35GpNRylG6CMYYJKCpwAkzWNQOcgphZG/YZoiX/DQNAttFjMrS+6LRCT2rh6HGsHiOQKtmKIIS19+qmZpYLrmXIKxM1Vo5Yj9HD0vfD7ckGGF3LDWlOyHP/idYPQCfdzldTtjscl/8MuDww78lsqHVHdTYXjwCpdKlfoS52X52qGit8oRKrRhwHYdNrrDILouPbCNVZCtgJ1n/6Xx8JYAmT8epD3fr5cC0oGLQYpkd4zpD27R0vA=)

</div>
<div class="options-api">

[Playground માં તે અજમાવી જુઓ](https://play.vuejs.org/#eNqVUU1rwzAM/SvCl7SQJTuHdLDDbttthw18MbW6hjW2seU0oeS/T0lounQfUDBGepaenvxO4tG5rIkoClGGra8cPUhT1c56ghcbA756tf1EDztva0iy/Ds4NCbSAEiD7diicafigeA0oFvLPAYNhWICYEE5IL00fMp8Hs0JYe0OinDIqFyIaO7CwdJGihO0KXTcLriK59NYBlUARTyMn6Hv0yHgIp7ARAvl3FXm8yCRiuu1Fv/x23JakVqtz3t5pOjNOQNoC7hPz0nHyRSzEr7Ghxppb/XlZ6JjRlzhTAlA+ypkLWwAM6c+8G2BdzP+/pPbRkOoL/KOldH2mCmtnxr247kKhAb9KuHKgLVtMEkn2knG+sIVzV9sfmy8hfB/swHKwV0oWja4lQKKjoNOivzKrf4L/JPqaQ==)

</div>

રસપ્રદ પેટર્ન હોવા છતાં, રેન્ડરલેસ કમ્પોનન્ટ્સ સાથે જે કંઈ પ્રાપ્ત કરી શકાય છે તે મોટાભાગે Composition API સાથે વધુ અસરકારક રીતે પ્રાપ્ત કરી શકાય છે, વધારાના કમ્પોનન્ટ નેસ્ટિંગના ઓવરહેડ વગર. પાછળથી, આપણે જોઈશું કે આપણે [કમ્પોઝેબલ (Composable)](/guide/reusability/composables) તરીકે સમાન માઉસ ટ્રેકિંગ કાર્યક્ષમતાને કેવી રીતે અમલમાં મૂકી શકીએ છીએ.

તેમ છતાં, સ્કોપ્ડ સ્લોટ્સ હજી પણ એવા કિસ્સાઓમાં ઉપયોગી છે જ્યાં આપણે લોજિકને એન્કેપ્સ્યુલેટ કરવાની **અને** વિઝ્યુઅલ આઉટપુટ કમ્પોઝ કરવાની જરૂર હોય, જેમ કે `<FancyList>` ઉદાહરણમાં.
