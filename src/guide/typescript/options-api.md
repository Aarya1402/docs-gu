# ઓપ્શન્સ (Options) API સાથે TypeScript {#typescript-with-options-api}

> આ પેજ ધારે છે કે તમે [Vue સાથે TypeScript નો ઉપયોગ કરવો](./overview) વિશેનું વિહંગાવલોકન પહેલેથી જ વાંચ્યું છે.

:::tip
જોકે Vue ઓપ્શન્સ API સાથે TypeScript વપરાશને સપોર્ટ કરે છે, પરંતુ કોમ્પોઝિશન (Composition) API દ્વારા TypeScript સાથે Vue નો ઉપયોગ કરવાની ભલામણ કરવામાં આવે છે કારણ કે તે વધુ સરળ, વધુ કાર્યક્ષમ અને વધુ મજબૂત ટાઇપ ઇન્ફરન્સ આપે છે.
:::

## ઘટક પ્રોપ્સ (Props) ના ટાઇપ્સ {#typing-component-props}

ઓપ્શન્સ API માં પ્રોપ્સ માટે ટાઇપ ઇન્ફરન્સ માટે ઘટકને `defineComponent()` સાથે લપેટી લેવાની જરૂર છે. તેની સાથે, Vue `props` ઓપ્શનના આધારે પ્રોપ્સ માટેના પ્રકારોનું અનુમાન કરવામાં સક્ષમ છે, જેમાં `required: true` અને `default` જેવા વધારાના ઓપ્શન્સને ધ્યાનમાં લેવામાં આવે છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // ટાઇપ ઇન્ફરન્સ સક્ષમ છે
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // પ્રકાર: string | undefined
    this.id // પ્રકાર: number | string | undefined
    this.msg // પ્રકાર: string
    this.metadata // પ્રકાર: any
  }
})
```

જોકે, રનટાઇમ `props` ઓપ્શન્સ માત્ર પ્રોપના પ્રકાર તરીકે કન્સ્ટ્રક્ટર ફંક્શન્સ (constructor functions) ના ઉપયોગને સપોર્ટ કરે છે - નેસ્ટેડ પ્રોપર્ટીઝવાળા ઓબ્જેક્ટ્સ અથવા ફંક્શન કોલ સિગ્નેચર્સ જેવા જટિલ ટાઇપ્સને નિર્દિષ્ટ કરવાની કોઈ રીત નથી.

જટિલ પ્રોપ્સ ટાઇપ્સને એનોટેટ કરવા માટે, અમે `PropType` યુટિલિટી ટાઇપનો ઉપયોગ કરી શકીએ છીએ:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // `Object` ને વધુ ચોક્કસ પ્રકાર પૂરો પાડો
      type: Object as PropType<Book>,
      required: true
    },
    // ફંક્શન્સને પણ એનોટેટ કરી શકે છે
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // TS Error: string પ્રકારનો આર્ગ્યુમેન્ટ
    // number પ્રકારના પેરામીટરને અસાઇન કરી શકાતો નથી
    this.callback?.('123')
  }
})
```

### ચેતવણીઓ (Caveats) {#caveats}

જો તમારું TypeScript વર્ઝન `૪.૭` કરતા ઓછું હોય, તો તમારે `validator` અને `default` પ્રોપ ઓપ્શન્સ માટે ફંક્શન વેલ્યુઝનો ઉપયોગ કરતી વખતે સાવચેત રહેવું પડશે - એરો ફંક્શન્સ (arrow functions) નો ઉપયોગ કરવાની ખાતરી કરો:

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // જો તમારું TypeScript વર્ઝન ૪.૭ કરતા ઓછું હોય તો એરો ફંક્શન્સ વાપરવાની ખાતરી કરો
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

આ TypeScript ને આ ફંક્શન્સની અંદર `this` ના પ્રકારનું અનુમાન કરવાથી અટકાવે છે, જે કમનસીબે ટાઇપ ઇન્ફરન્સ નિષ્ફળ થવાનું કારણ બની શકે છે. તે અગાઉની [ડિઝાઇન મર્યાદા](https://github.com/microsoft/TypeScript/issues/38845) હતી, અને હવે [TypeScript 4.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#improved-function-inference-in-objects-and-methods) માં સુધારો કરવામાં આવ્યો છે.

## ઘટક એમિટ્સ (Emits) ના ટાઇપ્સ {#typing-component-emits}

અમે `emits` વિકલ્પના ઓબ્જેક્ટ સિન્ટેક્સનો ઉપયોગ કરીને એમિત કરેલી ઇવેન્ટ માટે અપેક્ષિત પેલોડ ટાઇપ જાહેર કરી શકીએ છીએ. ઉપરાંત, જ્યારે બોલાવવામાં આવે ત્યારે બધી બિન-જાહેર કરાયેલ એમિટેડ ઇવેન્ટ્સ ટાઇપ એરર ફેંકશે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // રનટાઇમ વેલિડેશન કરો
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // ટાઇપ એરર!
      })

      this.$emit('non-declared-event') // ટાઇપ એરર!
    }
  }
})
```

## કોમ્પ્યુટેડ પ્રોપર્ટીઝના ટાઇપ્સ (Typing Computed Properties) {#typing-computed-properties}

કોમ્પ્યુટેડ પ્રોપર્ટી તેની રીટર્ન વેલ્યુના આધારે તેના પ્રકારનો અંદાજ મેળવે છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'નમસ્તે!'
    }
  },
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // પ્રકાર: string
  }
})
```

કેટલાક કિસ્સાઓમાં, તમે કોમ્પ્યુટેડ પ્રોપર્ટીના પ્રકારને તેનું અમલીકરણ યોગ્ય છે તેની ખાતરી કરવા માટે સ્પષ્ટપણે એનોટેટ કરી શકો છો:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'નમસ્તે!'
    }
  },
  computed: {
    // સ્પષ્ટપણે રિટર્ન ટાઇપ એનોટેટ કરો
    greeting(): string {
      return this.message + '!'
    },

    // રાઈટેબલ કોમ્પ્યુટેડ પ્રોપર્ટીને એનોટેટ કરવી
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

કેટલાક એજ કિસ્સાઓમાં સ્પષ્ટ એનોટેશન્સની પણ જરૂર પડી શકે છે જ્યાં TypeScript સર્ક્યુલર ઇન્ફરન્સ લૂપ્સને કારણે કોમ્પ્યુટેડ પ્રોપર્ટીના પ્રકારનું અનુમાન કરવામાં નિષ્ફળ જાય છે.

## ઇવેન્ટ હેન્ડલર્સના ટાઇપ્સ {#typing-event-handlers}

જ્યારે નેટિવ DOM ઇવેન્ટ્સ સાથે કામ કરો ત્યારે હેન્ડલરને જે આર્ગ્યુમેન્ટ મોકલીએ છીએ તેને ટાઇપ કરવું મદદરૂપ બની રહે છે. ચાલો આ ઉદાહરણ જોઈએ:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` માં સ્પષ્ટપણે `any` ટાઇપ છે
      console.log(event.target.value)
    }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

ટાઇપ એનોટેશન વિના, `event` આર્ગ્યુમેન્ટમાં હજુ પણ `any` ટાઇપ હશે. જો `tsconfig.json` માં `"strict": true` અથવા `"noImplicitAny": true` વપરાયેલ હોય તો આના પરિણામે TS ભૂલ પણ આવશે. તેથી ઇવેન્ટ હેન્ડલર્સના આર્ગ્યુમેન્ટને સ્પષ્ટપણે એનોટેટ કરવાની ભલામણ કરવામાં આવે છે. વધારામાં, `event` ની પ્રોપર્ટીઝ એક્સેસ કરતી વખતે તમારે ટાઇપ એસર્શન્સનો ઉપયોગ કરવાની જરૂર પડી શકે છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event: Event) {
      console.log((event.target as HTMLInputElement).value)
    }
  }
})
```

## ગ્લોબલ પ્રોપર્ટીઝમાં વધારો કરવો (Augmenting Global Properties) {#augmenting-global-properties}

કેટલાક પ્લગિન્સ [`app.config.globalProperties`](/api/application#app-config-globalproperties) દ્વારા તમામ ઘટક ઇન્સ્ટન્સ માટે વૈશ્વિક સ્તરે ઉપલબ્ધ પ્રોપર્ટીઝ ઇન્સ્ટોલ કરે છે. ઉદાહરણ તરીકે, અમે ડેટા-ફેચિંગ માટે `this.$http` અથવા આંતરરાષ્ટ્રીયકરણ (internationalization) માટે `this.$translate` ઇન્સ્ટોલ કરી શકીએ છીએ. આને TypeScript સાથે સારી રીતે કામ કરવા માટે, Vue [TypeScript module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) દ્વારા સંવર્ધન કરવા માટે રચાયેલ `ComponentCustomProperties` ઇન્ટરફેસ એક્સપોઝ કરે છે:

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

આ પણ જુઓ:

- [ઘટક પ્રકાર એક્સ્ટેંશન માટે TypeScript યુનિટ ટેસ્ટ્સ](https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx)

### ટાઇપ ઓગમેન્ટેશન પ્લેસમેન્ટ (Type Augmentation Placement) {#type-augmentation-placement}

અમે આ ટાઇપ ઓગમેન્ટેશનને `.ts` ફાઇલમાં અથવા પ્રોજેક્ટ-વ્યાપી `*.d.ts` ફાઇલમાં મૂકી શકીએ છીએ. કોઈપણ રીતે, ખાતરી કરો કે તે `tsconfig.json` માં શામેલ છે. લાઇબ્રેરી / પ્લગિન લેખકો માટે, આ ફાઇલ `package.json` માં `types` પ્રોપર્ટીમાં સ્પષ્ટ હોવી જોઈએ.

મોડ્યુલ ઓગમેન્ટેશનનો લાભ લેવા માટે, તમારે ખાતરી કરવાની જરૂર છે કે ઓગમેન્ટેશન [TypeScript મોડ્યુલ](https://www.typescriptlang.org/docs/handbook/modules.html) માં મૂકવામાં આવ્યું છે. એટલે કે, ફાઇલમાં ઓછામાં ઓછું એક ટોપ-લેવલ `import` અથવા `export` હોવું જરૂરી છે, ભલે તે માત્ર `export {}` હોય. જો ઓગમેન્ટેશન મોડ્યુલની બહાર મૂકવામાં આવે છે, તો તે ઓરિજીનલ ટાઇપ્સમાં વધારો કરવાને બદલે તેને ઓવરરાઇટ કરશે!

```ts
// કામ કરતું નથી, ઓરિજીનલ ટાઇપ્સ ઓવરરાઇટ કરે છે.
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

```ts
// યોગ્ય રીતે કામ કરે છે
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

## કસ્ટમ ઓપ્શન્સમાં વધારો કરવો (Augmenting Custom Options) {#augmenting-custom-options}

કેટલાક પ્લગિન્સ, ઉદાહરણ તરીકે `vue-router`, કસ્ટમ કમ્પોનન્ટ ઓપ્શન્સ જેમ કે `beforeRouteEnter` માટે સપોર્ટ પૂરો પાડે છે:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})
```

યોગ્ય ટાઇપ ઓગમેન્ટેશન વિના, આ હૂકના આર્ગ્યુમેન્ટ્સમાં ગર્ભિત રીતે `any` ટાઇપ હશે. અમે આ કસ્ટમ ઓપ્શન્સને સપોર્ટ કરવા માટે `ComponentCustomOptions` ઇન્ટરફેસને વધારી શકીએ છીએ:

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

હવે `beforeRouteEnter` ઓપ્શન યોગ્ય રીતે ટાઇપ થશે. નોંધ લો કે આ ફક્ત એક ઉદાહરણ છે - `vue-router` જેવી સારી રીતે ટાઇપ કરેલી લાઇબ્રેરીઓએ આ ઓગમેન્ટેશન્સ તેમની પોતાની ટાઇપ ડેફિનેશનમાં આપમેળે કરવા જોઈએ.

આ ઓગમેન્ટેશનનું પ્લેસમેન્ટ ગ્લોબલ પ્રોપર્ટી ઓગમેન્ટેશન જેવા [સમાન નિયમો](#type-augmentation-placement) ને આધીન છે.

આ પણ જુઓ:

- [ઘટક પ્રકાર એક્સ્ટેંશન માટે TypeScript યુનિટ ટેસ્ટ્સ](https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx)

## ગ્લોબલ કસ્ટમ ડાયરેક્ટિવ્સના ટાઇપ્સ {#typing-global-custom-directives}

જુઓ: [ગ્લોબલ કસ્ટમ ડાયરેક્ટિવ્સના ટાઇપ્સ](/guide/typescript/composition-api#typing-global-custom-directives) <sup class="vt-badge ts" />
