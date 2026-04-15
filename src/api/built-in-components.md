---
pageClass: api
---

# બિલ્ટ-ઇન ઘટકો (Built-in Components) {#built-in-components}

:::info રજીસ્ટ્રેશન અને ઉપયોગ (Registration and Usage)
બિલ્ટ-ઇન ઘટકો રજીસ્ટર કરવાની જરૂર વગર સીધા ટેમ્પ્લેટ્સમાં વાપરી શકાય છે. તેઓ ટ્રી-શેકેબલ (tree-shakeable) પણ છે: જ્યારે તેમનો ઉપયોગ કરવામાં આવે ત્યારે જ તેમને બિલ્ડમાં સામેલ કરવામાં આવે છે.

જ્યારે તેમનો [રેન્ડર ફંક્શન્સ](/guide/extras/render-function) માં ઉપયોગ કરવામાં આવે ત્યારે તેમને સ્પષ્ટ રીતે ઇમ્પોર્ટ (import) કરવાની જરૂર હોય છે. ઉદાહરણ તરીકે:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>` {#transition}

એક **સિંગલ** એલિમેન્ટ અથવા ઘટકને એનિમેટેડ ટ્રાન્ઝિશન ઇફેક્ટ્સ પ્રદાન કરે છે.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * ટ્રાન્ઝિશન CSS ક્લાસ નેમ્સ આપમેળે જનરેટ કરવા માટે વપરાય છે.
     * દા.ત. `name: 'fade'` આપમેળે `.fade-enter`,
     * `.fade-enter-active`, વગેરે પર વિસ્તારિત થશે.
     */
    name?: string
    /**
     * CSS ટ્રાન્ઝિશન ક્લાસ એપ્લાય કરવા કે નહીં.
     * ડિફોલ્ટ: true
     */
    css?: boolean
    /**
     * ટ્રાન્ઝિશન એન્ડ ટાઇમિંગ નક્કી કરવા માટે કયા પ્રકારની ટ્રાન્ઝિશન ઇવેન્ટ્સની રાહ જોવી તે સ્પષ્ટ કરે છે.
     * ડિફોલ્ટ બિહેવિયર લાંબો સમયગાળો ધરાવતા પ્રકારને આપમેળે શોધી કાઢે છે.
     */
    type?: 'transition' | 'animation'
    /**
     * ટ્રાન્ઝિશનનો સ્પષ્ટ સમયગાળો (durations) સ્પષ્ટ કરે છે.
     * ડિફોલ્ટ બિહેવિયર રુટ ટ્રાન્ઝિશન એલિમેન્ટ પર પ્રથમ `transitionend`
     * અથવા `animationend` ઇવેન્ટની રાહ જોવી છે.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * લીવિંગ/એન્ટરિંગ ટ્રાન્ઝિશનના ટાઇમિંગ સિક્વન્સને કંટ્રોલ કરે છે.
     * ડિફોલ્ટ બિહેવિયર એકસાથે (simultaneous) છે.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * પ્રારંભિક રેન્ડર પર ટ્રાન્ઝિશન એપ્લાય કરવું કે નહીં.
     * ડિફોલ્ટ: false
     */
    appear?: boolean

    /**
     * ટ્રાન્ઝિશન ક્લાસ કસ્ટમાઇઝ કરવા માટેના Props.
     * ટેમ્પ્લેટ્સમાં કેબાબ-કેસ (kebab-case) નો ઉપયોગ કરો, દા.ત. enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **ઇવેન્ટ્સ (Events)**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (ફક્ત `v-show` માં)
  - `@appear-cancelled`

- **Example**

  સરળ એલિમેન્ટ:

  ```vue-html
  <Transition>
    <div v-if="ok">toggled content</div>
  </Transition>
  ```

  `key` એટ્રિબ્યુટ બદલીને ટ્રાન્ઝિશન ફોર્સ કરવું:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  ડાયનેમિક ઘટક, ટ્રાન્ઝિશન મોડ + અપિયર (appear) પર એનિમેશન સાથે:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  ટ્રાન્ઝિશન ઇવેન્ટ્સ સાંભળવી (Listening):

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **આ પણ જુઓ** [ગાઇડ - ટ્રાન્ઝિશન (Transition)](/guide/built-ins/transition)

## `<TransitionGroup>` {#transitiongroup}

લિસ્ટમાંના **બહુવિધ** એલિમેન્ટ્સ અથવા ઘટકો માટે ટ્રાન્ઝિશન ઇફેક્ટ્સ પ્રદાન કરે છે.

- **Props**

  `<TransitionGroup>` `mode` સિવાય `<Transition>` જેવા જ પ્રોપ્સ સ્વીકારે છે, વત્તા બે વધારાના પ્રોપ્સ:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * જો વ્યાખ્યાયિત ન હોય તો, ફ્રેગમેન્ટ (fragment) તરીકે રેન્ડર થાય છે.
     */
    tag?: string
    /**
     * મુવ ટ્રાન્ઝિશન (move transitions) દરમિયાન એપ્લાય કરાયેલા CSS ક્લાસને કસ્ટમાઇઝ કરવા માટે.
     * ટેમ્પ્લેટ્સમાં કેબાબ-કેસનો ઉપયોગ કરો, દા.ત. move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **ઇવેન્ટ્સ (Events)**

  `<TransitionGroup>` `<Transition>` જેવી જ ઇવેન્ટ્સ એમિટ (emit) કરે છે.

- **વિગત (Details)**

  ડિફોલ્ટ રૂપે, `<TransitionGroup>` રેપર (wrapper) DOM એલિમેન્ટ રેન્ડર કરતું નથી, પરંતુ `tag` પ્રોપ દ્વારા તેને વ્યાખ્યાયિત કરી શકાય છે.

  નોંધ લો કે એનિમેશન યોગ્ય રીતે કામ કરવા માટે `<transition-group>` માં દરેક બાળક (child) પાસે [**અનન્ય કી (uniquely keyed)**](/guide/essentials/list#maintaining-state-with-key) હોવી આવશ્યક છે.

  `<TransitionGroup>` CSS ટ્રાન્સફોર્મ (transform) દ્વારા મૂવિંગ ટ્રાન્ઝિશનને સપોર્ટ કરે છે. જ્યારે અપડેટ પછી સ્ક્રીન પર બાળકની સ્થિતિ બદલાય છે, ત્યારે તેને મૂવિંગ CSS ક્લાસ એપ્લાય કરવામાં આવશે (`name` એટ્રિબ્યુટમાંથી ઓટો જનરેટ થાય છે અથવા `move-class` પ્રોપ સાથે કોન્ફિગર કરવામાં આવે છે). જો મૂવિંગ ક્લાસ એપ્લાય કરવામાં આવે ત્યારે CSS `transform` પ્રોપર્ટી "ટ્રાન્ઝિશન-એબલ" (transition-able) હોય, તો એલિમેન્ટ [FLIP ટેકનિક](https://aerotwist.com/blog/flip-your-animations/) નો ઉપયોગ કરીને તેના ડેસ્ટિનેશન પર સરળતાથી એનિમેટ થશે.

- **Example**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **આ પણ જુઓ** [ગાઇડ - ટ્રાન્ઝિશનગ્રુપ (TransitionGroup)](/guide/built-ins/transition-group)

## `<KeepAlive>` {#keepalive}

અંદર લપેટેલા (wrapped) ડાયનેમિકલી ટોગલ કરેલા ઘટકોને કેશ (cache) કરે છે.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * જો નિર્દિષ્ટ કરવામાં આવે, તો માત્ર `include` દ્વારા મેળ ખાતા નામો ધરાવતા ઘટકોને
     * જ કેશ કરવામાં આવશે.
     */
    include?: MatchPattern
    /**
     * `exclude` દ્વારા મેળ ખાતા નામો ધરાવતો કોઈપણ ઘટક કેશ કરવામાં આવશે નહીં.
     */
    exclude?: MatchPattern
    /**
     * કેશ કરવા માટેના ઘટક ઇન્સ્ટન્સની મહત્તમ સંખ્યા.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **વિગત (Details)**

  જ્યારે ડાયનેમિક ઘટકની આસપાસ લપેટી દેવામાં આવે છે, ત્યારે `<KeepAlive>` નિષ્ક્રિય ઘટક ઇન્સ્ટન્સને નાશ કર્યા વિના કેશ કરે છે.

  કોઈપણ સમયે `<KeepAlive>` ના ડાયરેક્ટ ચાઈલ્ડ તરીકે માત્ર એક જ સક્રિય ઘટક ઇન્સ્ટન્સ હોઈ શકે છે.

  જ્યારે `<KeepAlive>` ની અંદર ઘટક ટોગલ થાય છે, ત્યારે તેના `activated` અને `deactivated` લાઇફસાઇકલ હૂક્સ તે મુજબ ઇન્વોક કરવામાં આવશે, જે `mounted` અને `unmounted` ના વિકલ્પ તરીકે કામ કરશે, જે કોલ કરવામાં આવતા નથી. આ `<KeepAlive>` ના ડાયરેક્ટ ચાઈલ્ડ તેમજ તેના તમામ વંશજો (descendants) ને લાગુ પડે છે.

- **Example**

  મૂળભૂત ઉપયોગ:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  જ્યારે `v-if` / `v-else` બ્રાન્ચ સાથે ઉપયોગ થાય છે, ત્યારે એક સમયે માત્ર એક જ ઘટક રેન્ડર થયેલો હોવો જોઈએ:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  `<Transition>` સાથે મળીને વપરાય છે:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  `include` / `exclude` નો ઉપયોગ કરીને:

  ```vue-html
  <!-- અલ્પવિરામથી અલગ થયેલી સ્ટ્રિંગ -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- regex (`v-bind` નો ઉપયોગ કરો) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- Array (`v-bind` નો ઉપયોગ કરો) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  `max` સાથે ઉપયોગ:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **આ પણ જુઓ** [ગાઇડ - KeepAlive](/guide/built-ins/keep-alive)

## `<Teleport>` {#teleport}

તેના સ્લોટ કન્ટેન્ટને DOM ના બીજા ભાગમાં રેન્ડર કરે છે.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * ફરજિયાત. ટાર્ગેટ કન્ટેનર સ્પષ્ટ કરો.
     * તે ક્યાં તો સિલેક્ટર અથવા વાસ્તવિક એલિમેન્ટ હોઈ શકે છે.
     */
    to: string | HTMLElement
    /**
     * જ્યારે `true` હોય, ત્યારે કન્ટેન્ટ ટાર્ગેટ કન્ટેનરમાં ખસેડવાને બદલે તેના
     * મૂળ સ્થાને જ રહેશે. ગતિશીલ રીતે બદલી શકાય છે.
     */
    disabled?: boolean
    /**
     * જ્યારે `true` હોય, ત્યારે ટેલિપોર્ટ તેના ટાર્ગેટને રિઝોલ્વ કરતા પહેલા
     * એપ્લિકેશનના અન્ય ભાગો માઉન્ટ ન થાય ત્યાં સુધી વિલંબ (defer) કરશે. (3.5+)
     */
    defer?: boolean
  }
  ```

- **Example**

  ટાર્ગેટ કન્ટેનર સ્પષ્ટ કરવું:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  શરતી રીતે નિષ્ક્રિય કરવું (Conditionally disabling):

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

  વિલંબિત ટાર્ગેટ રિઝોલ્યુશન (Defer target resolution) <sup class="vt-badge" data-text="3.5+" />:

  ```vue-html
  <Teleport defer to="#late-div">...</Teleport>

  <!-- ટેમ્પ્લેટમાં ક્યાંક પછી થી -->
  <div id="late-div"></div>
  ```

- **આ પણ જુઓ** [ગાઇડ - ટેલિપોર્ટ (Teleport)](/guide/built-ins/teleport)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

ઘટક વૃક્ષમાં નેસ્ટેડ અસિંક્રોનસ ડિપેન્ડન્સી (async dependencies) ને ઓર્કેસ્ટ્રેટ કરવા માટે વપરાય છે.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
    suspensible?: boolean
  }
  ```

- **ઇવેન્ટ્સ (Events)**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **વિગત (Details)**

  `<Suspense>` બે સ્લોટ સ્વીકારે છે: `#default` સ્લોટ અને `#fallback` સ્લોટ. તે મેમરીમાં ડિફોલ્ટ સ્લોટ રેન્ડર કરતી વખતે ફોલબેક સ્લોટનું કન્ટેન્ટ પ્રદર્શિત કરશે.

  જો ડિફોલ્ટ સ્લોટ રેન્ડર કરતી વખતે તેને અસિંક્રોનસ ડિપેન્ડન્સી ([અસિંક્રોનસ ઘટકો](/guide/components/async) અને [`async setup()`](/guide/built-ins/suspense#async-setup) ધરાવતા ઘટકો) મળે છે, તો તે ડિફોલ્ટ સ્લોટ પ્રદર્શિત કરતા પહેલા તે તમામ રિઝોલ્વ ન થાય ત્યાં સુધી રાહ જોશે.

  સસ્પેન્સને `suspensible` તરીકે સેટ કરીને, તમામ અસિંક્રોનસ ડિપેન્ડન્સી હેન્ડલિંગ પેરેન્ટ સસ્પેન્સ દ્વારા હેન્ડલ કરવામાં આવશે. જુઓ [અમલીકરણ વિગતો (implementation details)](https://github.com/vuejs/core/pull/6736)

- **આ પણ જુઓ** [ગાઇડ - સસ્પેન્સ (Suspense)](/guide/built-ins/suspense)
