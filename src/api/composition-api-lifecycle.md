# Composition API: લાઇફસાઇકલ હૂક્સ (Lifecycle Hooks) {#composition-api-lifecycle-hooks}

:::info ઉપયોગ નોંધ (Usage Note)
આ page પર listed તમામ APIs ઘટકના `setup()` phase દરમિયાન synchronously call થવા જોઈએ. વધુ વિગત માટે [ગાઇડ - લાઇફસાઇકલ હૂક્સ](/guide/essentials/lifecycle) જુઓ.
:::

## onMounted() {#onmounted}

ઘટક mounted થયા પછી call થવા માટે callback register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onMounted(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **વિગત (Details)**

  ઘટક mounted માનવામાં આવે જ્યારે:

  - તેના તમામ synchronous child ઘટકો mounted થઈ ગયા હોય (async ઘટકો અથવા `<Suspense>` trees અંદરના ઘટકો સામેલ નથી).

  - તેનું પોતાનું DOM tree બનાવવામાં આવ્યું હોય અને parent container માં insert થયું હોય. નોંધ કરો કે તે ફક્ત ગેરંટી આપે કે ઘટકનું DOM tree in-document છે જો application ના root container પણ in-document હોય.

  આ hook સામાન્ય રીતે side effects perform કરવા માટે ઉપયોગ થાય જેમને ઘટકના rendered DOM ની access જોઈએ, અથવા [server-rendered application](/guide/scaling-up/ssr) માં DOM-related code ને client સુધી limit કરવા.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

- **ઉદાહરણ (Example)**

  Template ref દ્વારા element access કરવું:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated() {#onupdated}

Reactive state change ને કારણે ઘટકે તેનું DOM tree update કર્યા પછી call થવા માટે callback register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onUpdated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **વિગત (Details)**

  Parent ઘટકનો updated hook તેના child ઘટકો પછી call થાય છે.

  આ hook ઘટકના કોઈપણ DOM update પછી call થાય છે, જે વિવિધ state changes ને કારણે થઈ શકે, કારણ કે performance કારણોસર multiple state changes ને single render cycle માં batch કરી શકાય. ચોક્કસ state change પછી updated DOM access કરવાની જરૂર હોય, તો [nextTick()](/api/general#nexttick) ઉપયોગ કરો.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

  :::warning
  Updated hook માં component state mutate ન કરો - આ infinite update loop તરફ દોરી શકે!
  :::

- **ઉદાહરણ (Example)**

  Updated DOM access કરવું:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // text content વર્તમાન `count.value` જેટલું જ હોવું જોઈએ
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted() {#onunmounted}

ઘટક unmounted થયા પછી call થવા માટે callback register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onUnmounted(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **વિગત (Details)**

  ઘટક unmounted માનવામાં આવે જ્યારે:

  - તેના તમામ child ઘટકો unmounted થઈ ગયા હોય.

  - તેના તમામ associated reactive effects (render effect અને `setup()` દરમિયાન created computed / watchers) stop થઈ ગયા હોય.

  Manually created side effects જેમ timers, DOM event listeners અથવા server connections clean up કરવા માટે આ hook ઉપયોગ કરો.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

- **ઉદાહરણ (Example)**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount() {#onbeforemount}

ઘટક mount થવાના હોય તેની ઠીક પહેલા call થવા માટે hook register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onBeforeMount(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **વિગત (Details)**

  જ્યારે આ hook call થાય, ત્યારે ઘટકે તેની reactive state setup કરવાનું પૂર્ણ કર્યું છે, પરંતુ હજુ કોઈ DOM nodes create થયા નથી. તે પ્રથમ વખત તેના DOM render effect execute કરવાના છે.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## onBeforeUpdate() {#onbeforeupdate}

Reactive state change ને કારણે ઘટક તેનું DOM tree update કરવાના હોય તેની ઠીક પહેલા call થવા માટે hook register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onBeforeUpdate(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **વિગત (Details)**

  Vue DOM update કરે તે પહેલા DOM state access કરવા આ hook ઉપયોગ કરી શકાય. આ hook અંદર component state modify કરવું safe છે.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## onBeforeUnmount() {#onbeforeunmount}

ઘટક instance unmount થવાના હોય તેની ઠીક પહેલા call થવા માટે hook register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onBeforeUnmount(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **વિગત (Details)**

  જ્યારે આ hook call થાય, ત્યારે ઘટક instance હજુ સંપૂર્ણ functional છે.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## onErrorCaptured() {#onerrorcaptured}

Descendant ઘટકમાંથી propagate થતા error capture થાય ત્યારે call થવા માટે hook register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **વિગત (Details)**

  નીચેના sources માંથી errors capture કરી શકાય:

  - ઘટક renders (Component renders)
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

  Hook ત્રણ arguments receive કરે: error, error trigger કરનાર ઘટક instance, અને error source type specify કરતી information string.

  :::tip
  Production માં, 3rd argument (`info`) full information string ના બદલે shortened code હશે. [Production Error Code Reference](/error-reference/#runtime-errors) માં code to string mapping શોધી શકો.
  :::

  User ને error state display કરવા `onErrorCaptured()` માં component state modify કરી શકો. જો કે, error state original content render ન કરે જેણે error cause કર્યો; નહીંતર ઘટક infinite render loop માં throw થશે.

  Hook error ને આગળ propagate થતા રોકવા `false` return કરી શકે. Error propagation details નીચે જુઓ.

  **Error Propagation Rules**

  - ડિફોલ્ટ રૂપે, તમામ errors application-level [`app.config.errorHandler`](/api/application#app-config-errorhandler) ને મોકલવામાં આવે જો define થયેલો હોય, જેથી આ errors ને single place માં analytics service ને report કરી શકાય.

  - જો ઘટકના inheritance chain અથવા parent chain પર multiple `errorCaptured` hooks exist કરે, તો તે બધા same error પર bottom to top ક્રમમાં invoke થશે. આ native DOM events ની bubbling mechanism ને similar છે.

  - જો `errorCaptured` hook પોતે error throw કરે, તો આ error અને original captured error બંને `app.config.errorHandler` ને મોકલવામાં આવે.

  - `errorCaptured` hook error ને further propagate થતા રોકવા `false` return કરી શકે. આ essentially "આ error handle થઈ ગયો અને ignore થવો જોઈએ" કહે છે. આ error માટે કોઈ additional `errorCaptured` hooks કે `app.config.errorHandler` invoke થતા અટકાવશે.

## onRenderTracked() <sup class="vt-badge dev-only" /> {#onrendertracked}

ઘટકના render effect દ્વારા reactive dependency track થાય ત્યારે call થવા માટે debug hook register કરે છે.

**આ hook ફક્ત development-mode માં છે અને server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **આ પણ જુઓ** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## onRenderTriggered() <sup class="vt-badge dev-only" /> {#onrendertriggered}

Reactive dependency ઘટકના render effect ને re-run trigger કરે ત્યારે call થવા માટે debug hook register કરે છે.

**આ hook ફક્ત development-mode માં છે અને server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **આ પણ જુઓ** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## onActivated() {#onactivated}

[`<KeepAlive>`](/api/built-in-components#keepalive) દ્વારા cached tree ના ભાગ તરીકે DOM માં ઘટક instance insert થયા પછી call થવા માટે callback register કરે છે.

**આ hook server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  function onActivated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **આ પણ જુઓ** [ગાઇડ - Cached Instance નો Lifecycle](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onDeactivated() {#ondeactivated}

[`<KeepAlive>`](/api/built-in-components#keepalive) દ્વારા cached tree ના ભાગ તરીકે DOM માંથી ઘટક instance removed થયા પછી call થવા માટે callback register કરે છે.

**આ hook server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  function onDeactivated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **આ પણ જુઓ** [ગાઇડ - Cached Instance નો Lifecycle](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" /> {#onserverprefetch}

Server પર ઘટક instance render થવાના હોય તે પહેલા resolve થવા માટે async function register કરે છે.

- **ટાઇપ (Type)**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **વિગત (Details)**

  જો callback Promise return કરે, તો server renderer ઘટક render કરતા પહેલા Promise resolve થાય ત્યાં સુધી wait કરશે.

  આ hook ફક્ત server-side rendering દરમિયાન call થાય અને server-only data fetching perform કરવા ઉપયોગ કરી શકાય.

- **ઉદાહરણ (Example)**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // ઘટક initial request ના ભાગ તરીકે render થાય
    // server પર data pre-fetch કરો કારણ client કરતા ઝડપી છે
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // જો mount પર data null છે, તેનો અર્થ ઘટક
      // client પર dynamically render થયો. Client-side
      // fetch perform કરો.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **આ પણ જુઓ** [Server-Side Rendering](/guide/scaling-up/ssr)
