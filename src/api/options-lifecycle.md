# ઓપ્શન્સ: લાઇફસાઇકલ (Options: Lifecycle) {#options-lifecycle}

:::info આ પણ જુઓ
Lifecycle hooks ના shared ઉપયોગ માટે, [ગાઇડ - લાઇફસાઇકલ હૂક્સ](/guide/essentials/lifecycle) જુઓ
:::

## beforeCreate {#beforecreate}

Instance initialize થાય ત્યારે call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  Instance initialize થાય અને props resolve થાય ત્યારે તરત call થાય છે.

  પછી props reactive properties તરીકે define થશે અને `data()` અથવા `computed` જેવી state set up થશે.

  નોંધ કરો કે Composition API નો `setup()` hook કોઈપણ Options API hooks પહેલા call થાય, `beforeCreate()` પણ.

## created {#created}

Instance તમામ state-related options process કરી લે પછી call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  આ hook call થાય ત્યારે, નીચેના set up થઈ ગયા હોય: reactive data, computed properties, methods, અને watchers. જો કે, mounting phase શરૂ થયો નથી, અને `$el` property હજુ ઉપલબ્ધ નહીં હોય.

## beforeMount {#beforemount}

ઘટક mount થવાના હોય તેની ઠીક પહેલા call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  જ્યારે આ hook call થાય, ત્યારે ઘટકે reactive state setup કરવાનું પૂર્ણ કર્યું છે, પરંતુ હજુ કોઈ DOM nodes create થયા નથી. તે પ્રથમ વખત DOM render effect execute કરવાના છે.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## mounted {#mounted}

ઘટક mounted થયા પછી call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  ઘટક mounted માનવામાં આવે જ્યારે:

  - તેના તમામ synchronous child ઘટકો mounted થઈ ગયા હોય (async ઘટકો અથવા `<Suspense>` trees અંદરના ઘટકો સામેલ નથી).

  - તેનું પોતાનું DOM tree create થયું હોય અને parent container માં insert થયું હોય. નોંધ કરો કે તે ફક્ત ગેરંટી આપે કે ઘટકનું DOM tree in-document છે જો application ના root container પણ in-document હોય.

  આ hook સામાન્ય રીતે side effects perform કરવા માટે ઉપયોગ થાય જેમને ઘટકના rendered DOM ની access જોઈએ, અથવા [server-rendered application](/guide/scaling-up/ssr) માં DOM-related code ને client સુધી limit કરવા.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## beforeUpdate {#beforeupdate}

Reactive state change ને કારણે ઘટક તેનું DOM tree update કરવાના હોય તેની ઠીક પહેલા call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  Vue DOM update કરે તે પહેલા DOM state access કરવા આ hook ઉપયોગ કરી શકાય. આ hook અંદર component state modify કરવું safe છે.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## updated {#updated}

Reactive state change ને કારણે ઘટકે DOM tree update કર્યા પછી call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  Parent ઘટકનો updated hook તેના child ઘટકો પછી call થાય છે.

  આ hook ઘટકના કોઈપણ DOM update પછી call થાય, જે વિવિધ state changes ને કારણે થઈ શકે. ચોક્કસ state change પછી updated DOM access કરવાની જરૂર હોય, તો [nextTick()](/api/general#nexttick) ઉપયોગ કરો.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

  :::warning
  Updated hook માં component state mutate ન કરો - આ infinite update loop તરફ દોરી શકે!
  :::

## beforeUnmount {#beforeunmount}

ઘટક instance unmount થવાના હોય તેની ઠીક પહેલા call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  જ્યારે આ hook call થાય, ત્યારે ઘટક instance હજુ સંપૂર્ણ functional છે.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## unmounted {#unmounted}

ઘટક unmounted થયા પછી call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **વિગત (Details)**

  ઘટક unmounted માનવામાં આવે જ્યારે:

  - તેના તમામ child ઘટકો unmounted થઈ ગયા હોય.

  - તેના તમામ associated reactive effects (render effect અને `setup()` દરમિયાન created computed / watchers) stop થઈ ગયા હોય.

  Manually created side effects જેમ timers, DOM event listeners અથવા server connections clean up કરવા આ hook ઉપયોગ કરો.

  **આ hook server-side rendering દરમિયાન call થતો નથી.**

## errorCaptured {#errorcaptured}

Descendant ઘટકમાંથી propagate થતા error capture થાય ત્યારે call થાય છે.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
  ```

- **વિગત (Details)**

  નીચેના sources માંથી errors capture કરી શકાય:

  - ઘટક renders
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

  User ને error state display કરવા `errorCaptured()` માં component state modify કરી શકો. જો કે, error state original content render ન કરે જેણે error cause કર્યો; નહીંતર ઘટક infinite render loop માં throw થશે.

  Hook error ને further propagate થતા રોકવા `false` return કરી શકે. Error propagation details નીચે જુઓ.

  **Error Propagation Rules**

  - ડિફોલ્ટ રૂપે, તમામ errors application-level [`app.config.errorHandler`](/api/application#app-config-errorhandler) ને મોકલવામાં આવે જો define થયેલો હોય, જેથી આ errors single place માં analytics service ને report કરી શકાય.

  - જો ઘટકના inheritance chain અથવા parent chain પર multiple `errorCaptured` hooks exist કરે, તો તે બધા same error પર bottom to top ક્રમમાં invoke થશે. આ native DOM events ની bubbling mechanism ને similar છે.

  - જો `errorCaptured` hook પોતે error throw કરે, તો આ error અને original captured error બંને `app.config.errorHandler` ને મોકલવામાં આવે.

  - `errorCaptured` hook error ને further propagate થતા રોકવા `false` return કરી શકે. આ essentially "આ error handle થઈ ગયો અને ignore થવો જોઈએ" કહે છે. આ error માટે કોઈ additional `errorCaptured` hooks કે `app.config.errorHandler` invoke થતા અટકાવશે.

  **Error Capturing Caveats**
  
  - Async `setup()` function (top-level `await` સાથે) ધરાવતા ઘટકોમાં Vue **હંમેશા** ઘટક template render કરવાનો પ્રયાસ કરશે, ભલે `setup()` error throw કરે. આ likely વધુ errors cause કરશે કારણ render દરમિયાન ઘટકનું template failed `setup()` context ની non-existing properties access કરવાનો પ્રયાસ કરી શકે. આવા ઘટકોમાં errors capture કરતી વખતે, failed async `setup()` (તેઓ હંમેશા પ્રથમ આવશે) અને failed render process બંનેમાંથી errors handle કરવા તૈયાર રહો.

  - <sup class="vt-badge" data-text="SSR only"></sup> `<Suspense>` ની deep અંદર parent ઘટકમાં errored child ઘટક replace કરવાથી SSR માં hydration mismatches થશે. તેના બદલે, child `setup()` માંથી possibly throw થઈ શકે તેવા logic ને separate function માં separate કરવાનો અને parent ઘટકના `setup()` માં execute કરવાનો પ્રયાસ કરો, જ્યાં તમે safely execution process ને `try/catch` કરી શકો અને actual child ઘટક render કરતા પહેલા જરૂર હોય તો replacement કરી શકો.

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

ઘટકના render effect દ્વારા reactive dependency track થાય ત્યારે call થાય છે.

**આ hook ફક્ત development-mode માં છે અને server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **આ પણ જુઓ** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

Reactive dependency ઘટકના render effect ને re-run trigger કરે ત્યારે call થાય છે.

**આ hook ફક્ત development-mode માં છે અને server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

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

## activated {#activated}

[`<KeepAlive>`](/api/built-in-components#keepalive) દ્વારા cached tree ના ભાગ તરીકે DOM માં ઘટક instance insert થયા પછી call થાય છે.

**આ hook server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **આ પણ જુઓ** [ગાઇડ - Cached Instance નો Lifecycle](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

[`<KeepAlive>`](/api/built-in-components#keepalive) દ્વારા cached tree ના ભાગ તરીકે DOM માંથી ઘટક instance removed થયા પછી call થાય છે.

**આ hook server-side rendering દરમિયાન call થતો નથી.**

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **આ પણ જુઓ** [ગાઇડ - Cached Instance નો Lifecycle](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" /> {#serverprefetch}

Server પર ઘટક instance render થવાના હોય તે પહેલા resolve થવા માટે async function.

- **ટાઇપ (Type)**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **વિગત (Details)**

  જો hook Promise return કરે, તો server renderer ઘટક render કરતા પહેલા Promise resolve થાય ત્યાં સુધી wait કરશે.

  આ hook ફક્ત server-side rendering દરમિયાન call થાય અને server-only data fetching perform કરવા ઉપયોગ કરી શકાય.

- **ઉદાહરણ (Example)**

  ```js
  export default {
    data() {
      return {
        data: null
      }
    },
    async serverPrefetch() {
      // ઘટક initial request ના ભાગ તરીકે render થાય
      // server પર data pre-fetch કરો કારણ client કરતા ઝડપી છે
      this.data = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.data) {
        // જો mount પર data null છે, તેનો અર્થ ઘટક
        // client પર dynamically render થયો. Client-side
        // fetch perform કરો.
        this.data = await fetchOnClient(/* ... */)
      }
    }
  }
  ```

- **આ પણ જુઓ** [Server-Side Rendering](/guide/scaling-up/ssr)
