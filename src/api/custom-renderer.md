# કસ્ટમ રેન્ડરર API (Custom Renderer API) {#custom-renderer-api}

## createRenderer() {#createrenderer}

કસ્ટમ રેન્ડરર બનાવે છે. પ્લેટફોર્મ-વિશિષ્ટ node creation અને manipulation APIs પ્રદાન કરીને, તમે non-DOM environments ને ટાર્ગેટ કરવા માટે Vue ના core runtime નો લાભ લઈ શકો.

- **ટાઇપ (Type)**

  ```ts
  function createRenderer<HostNode, HostElement>(
    options: RendererOptions<HostNode, HostElement>
  ): Renderer<HostElement>

  interface Renderer<HostElement> {
    render: RootRenderFunction<HostElement>
    createApp: CreateAppFunction<HostElement>
  }

  interface RendererOptions<HostNode, HostElement> {
    patchProp(
      el: HostElement,
      key: string,
      prevValue: any,
      nextValue: any,
      namespace?: ElementNamespace,
      parentComponent?: ComponentInternalInstance | null,
    ): void
    insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
    remove(el: HostNode): void
    createElement(
      type: string,
      namespace?: ElementNamespace,
      isCustomizedBuiltIn?: string,
      vnodeProps?: (VNodeProps & { [key: string]: any }) | null,
    ): HostElement
    createText(text: string): HostNode
    createComment(text: string): HostNode
    setText(node: HostNode, text: string): void
    setElementText(node: HostElement, text: string): void
    parentNode(node: HostNode): HostElement | null
    nextSibling(node: HostNode): HostNode | null
    querySelector?(selector: string): HostElement | null
    setScopeId?(el: HostElement, id: string): void
    cloneNode?(node: HostNode): HostNode
    insertStaticContent?(
      content: string,
      parent: HostElement,
      anchor: HostNode | null,
      namespace: ElementNamespace,
      start?: HostNode | null,
      end?: HostNode | null,
    ): [HostNode, HostNode]
  }
  ```

- **ઉદાહરણ (Example)**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` એ low-level API છે
  // `createApp` એપ ઇન્સ્ટન્સ રિટર્ન કરે છે
  export { render, createApp }

  // Vue core APIs ફરીથી export કરો
  export * from '@vue/runtime-core'
  ```

  Vue નો પોતાનો `@vue/runtime-dom` એ [આ જ API ઉપયોગ કરીને implement કરવામાં આવ્યો છે](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). સરળ implementation માટે, [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts) તપાસો જે Vue ના પોતાના unit testing માટેનું private package છે.
