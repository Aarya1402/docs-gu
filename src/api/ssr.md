# Server-Side Rendering API {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **`vue/server-renderer` માંથી Exported**

- **ટાઇપ (Type)**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **ઉદાહરણ (Example)**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### SSR Context {#ssr-context}

  તમે optional context object પાસ કરી શકો, જેનો ઉપયોગ render દરમિયાન વધારાનો data record કરવા માટે થઈ શકે, ઉદાહરણ તરીકે [Teleports ના content ને access કરવું](/guide/scaling-up/ssr#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  આ page પરના મોટાભાગના અન્ય SSR APIs પણ વૈકલ્પિક રીતે context object accept કરે. Context object ને component code માં [useSSRContext](#usessrcontext) helper દ્વારા access કરી શકાય.

- **આ પણ જુઓ** [ગાઇડ - Server-Side Rendering](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

Input ને [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) તરીકે render કરે છે.

- **`vue/server-renderer` માંથી Exported**

- **ટાઇપ (Type)**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **ઉદાહરણ (Example)**

  ```js
  // Node.js http handler અંદર
  renderToNodeStream(app).pipe(res)
  ```

  :::tip નોંધ
  આ method `vue/server-renderer` ના ESM build માં supported નથી, જે Node.js environments થી decoupled છે. તેના બદલે [`pipeToNodeWritable`](#pipetonodewritable) ઉપયોગ કરો.
  :::

## pipeToNodeWritable() {#pipetonodewritable}

Render કરો અને existed [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) instance ને pipe કરો.

- **`vue/server-renderer` માંથી Exported**

- **ટાઇપ (Type)**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **ઉદાહરણ (Example)**

  ```js
  // Node.js http handler અંદર
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

Input ને [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) તરીકે render કરે છે.

- **`vue/server-renderer` માંથી Exported**

- **ટાઇપ (Type)**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **ઉદાહરણ (Example)**

  ```js
  // ReadableStream support ધરાવતા environment અંદર
  return new Response(renderToWebStream(app))
  ```

  :::tip નોંધ
  Global scope માં `ReadableStream` constructor expose ન કરતા environments માં, [`pipeToWebWritable()`](#pipetowebwritable) ઉપયોગ કરવો જોઈએ.
  :::

## pipeToWebWritable() {#pipetowebwritable}

Render કરો અને existed [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) instance ને pipe કરો.

- **`vue/server-renderer` માંથી Exported**

- **ટાઇપ (Type)**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **ઉદાહરણ (Example)**

  આ સામાન્ય રીતે [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream) સાથે combination માં ઉપયોગ થાય છે:

  ```js
  // TransformStream CloudFlare workers જેવા environments માં ઉપલબ્ધ છે.
  // Node.js માં, TransformStream ને 'stream/web' માંથી explicitly import કરવું જરૂરી
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

Simple readable interface ઉપયોગ કરીને streaming mode માં input render કરે છે.

- **`vue/server-renderer` માંથી Exported**

- **ટાઇપ (Type)**

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // done
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encountered
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

Runtime API જેનો ઉપયોગ `renderToString()` અથવા અન્ય server render APIs ને pass કરેલો context object retrieve કરવા માટે થાય છે.

- **ટાઇપ (Type)**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **ઉદાહરણ (Example)**

  Retrieved context ને અંતિમ HTML render કરવા માટે જરૂરી information (દા.ત. head metadata) attach કરવા ઉપયોગ કરી શકાય.

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // ખાતરી કરો કે ફક્ત SSR દરમિયાન જ call કરો
  // https://vite.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...context ને properties attach કરો
  }
  </script>
  ```

## data-allow-mismatch <sup class="vt-badge" data-text="3.5+" /> {#data-allow-mismatch}

ખાસ attribute જેનો ઉપયોગ [hydration mismatch](/guide/scaling-up/ssr#hydration-mismatch) warnings ને suppress કરવા માટે થઈ શકે.

- **ઉદાહરણ (Example)**

  ```html
  <div data-allow-mismatch="text">{{ data.toLocaleString() }}</div>
  ```

  Value allowed mismatch ને specific type સુધી limit કરી શકે. Allowed values:

  - `text`
  - `children` (ફક્ત direct children માટે mismatch allow કરે)
  - `class`
  - `style`
  - `attribute`

  જો value provide ન કરવામાં આવે, તો તમામ types ના mismatches allow થશે.
