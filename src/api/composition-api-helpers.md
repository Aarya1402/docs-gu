# Composition API: હેલ્પર્સ (Helpers) {#composition-api-helpers}

## useAttrs() {#useattrs}

[Setup Context](/api/composition-api-setup#setup-context) માંથી `attrs` ઓબ્જેક્ટ રિટર્ન કરે છે, જેમાં વર્તમાન ઘટકના [fallthrough attributes](/guide/components/attrs#fallthrough-attributes) સામેલ છે. `<script setup>` માં ઉપયોગ કરવા માટે ડિઝાઇન કરવામાં આવ્યું છે જ્યાં setup context ઓબ્જેક્ટ ઉપલબ્ધ નથી.

- **ટાઇપ (Type)**

  ```ts
  function useAttrs(): Record<string, unknown>
  ```

## useSlots() {#useslots}

[Setup Context](/api/composition-api-setup#setup-context) માંથી `slots` ઓબ્જેક્ટ રિટર્ન કરે છે, જેમાં parent દ્વારા પાસ કરેલા slots callable functions તરીકે સામેલ છે જે Virtual DOM nodes રિટર્ન કરે છે. `<script setup>` માં ઉપયોગ કરવા માટે ડિઝાઇન કરવામાં આવ્યું છે જ્યાં setup context ઓબ્જેક્ટ ઉપલબ્ધ નથી.

TypeScript ઉપયોગ કરતા હોવ તો, [`defineSlots()`](/api/sfc-script-setup#defineslots) ને પ્રાધાન્ય આપવું જોઈએ.

- **ટાઇપ (Type)**

  ```ts
  function useSlots(): Record<string, (...args: any[]) => VNode[]>
  ```

## useModel() {#usemodel}

આ અંતર્ગત (underlying) helper છે જે [`defineModel()`](/api/sfc-script-setup#definemodel) ને power કરે છે. `<script setup>` ઉપયોગ કરતા હોવ તો, `defineModel()` ને પ્રાધાન્ય આપવું જોઈએ.

- માત્ર 3.4+ માં ઉપલબ્ધ

- **ટાઇપ (Type)**

  ```ts
  function useModel(
    props: Record<string, any>,
    key: string,
    options?: DefineModelOptions
  ): ModelRef

  type DefineModelOptions<T = any> = {
    get?: (v: T) => any
    set?: (v: T) => any
  }

  type ModelRef<T, M extends PropertyKey = string, G = T, S = T> = Ref<G, S> & [
    ModelRef<T, M, G, S>,
    Record<M, true | undefined>
  ]
  ```

- **ઉદાહરણ (Example)**

  ```js
  export default {
    props: ['count'],
    emits: ['update:count'],
    setup(props) {
      const msg = useModel(props, 'count')
      msg.value = 1
    }
  }
  ```

- **વિગત (Details)**

  `useModel()` non-SFC ઘટકોમાં ઉપયોગ કરી શકાય, દા.ત. raw `setup()` function ઉપયોગ કરતી વખતે. તે પ્રથમ આર્ગ્યુમેન્ટ તરીકે `props` ઓબ્જેક્ટ અને બીજા આર્ગ્યુમેન્ટ તરીકે model name ની અપેક્ષા રાખે છે. ત્રીજા વૈકલ્પિક આર્ગ્યુમેન્ટનો ઉપયોગ પરિણામી model ref માટે custom getter અને setter declare કરવા માટે થઈ શકે. નોંધ કરો કે `defineModel()` થી વિપરીત, props અને emits જાતે declare કરવાની જવાબદારી તમારી છે.

## useTemplateRef() <sup class="vt-badge" data-text="3.5+" /> {#usetemplateref}

shallow ref રિટર્ન કરે છે જેની value matching ref attribute ધરાવતા template element અથવા component સાથે sync થશે.

- **ટાઇપ (Type)**

  ```ts
  function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
  ```

- **ઉદાહરણ (Example)**

  ```vue
  <script setup>
  import { useTemplateRef, onMounted } from 'vue'

  const inputRef = useTemplateRef('input')

  onMounted(() => {
    inputRef.value.focus()
  })
  </script>

  <template>
    <input ref="input" />
  </template>
  ```

- **આ પણ જુઓ**
  - [ગાઇડ - ટેમ્પ્લેટ Refs](/guide/essentials/template-refs)
  - [ગાઇડ - ટેમ્પ્લેટ Refs ટાઇપ કરવા](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [ગાઇડ - ઘટક ટેમ્પ્લેટ Refs ટાઇપ કરવા](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## useId() <sup class="vt-badge" data-text="3.5+" /> {#useid}

accessibility attributes અથવા form elements માટે unique-per-application IDs જનરેટ કરવા માટે ઉપયોગ થાય છે.

- **ટાઇપ (Type)**

  ```ts
  function useId(): string
  ```

- **ઉદાહરણ (Example)**

  ```vue
  <script setup>
  import { useId } from 'vue'

  const id = useId()
  </script>

  <template>
    <form>
      <label :for="id">Name:</label>
      <input :id="id" type="text" />
    </form>
  </template>
  ```

- **વિગત (Details)**

  `useId()` દ્વારા જનરેટ થયેલા IDs unique-per-application છે. form elements અને accessibility attributes માટે IDs જનરેટ કરવા માટે ઉપયોગ કરી શકાય. સમાન ઘટકમાં બહુવિધ calls અલગ IDs જનરેટ કરશે; `useId()` બોલાવતા સમાન ઘટકના બહુવિધ instances ના પણ અલગ IDs હશે.

  `useId()` દ્વારા જનરેટ થયેલા IDs server અને client renders વચ્ચે stable (સ્થિર) હોવાની ખાતરી છે, તેથી તેઓ hydration mismatches તરફ દોર્યા વિના SSR applications માં ઉપયોગ કરી શકાય.

  જો તમારી પાસે એક જ page પર એકથી વધુ Vue application instance હોય, તો તમે [`app.config.idPrefix`](/api/application#app-config-idprefix) દ્વારા દરેક app ને ID prefix આપીને ID conflicts ટાળી શકો.

  :::warning સાવધાની (Caution)
  `useId()` ને `computed()` property અંદર બોલાવવો જોઈએ નહીં કારણ કે તે instance conflicts નું કારણ બની શકે. તેના બદલે, `computed()` ની બહાર ID declare કરો અને computed function માં તેનો reference કરો.
  :::
