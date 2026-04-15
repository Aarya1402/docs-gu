<script setup>
import { ref, onMounted } from 'vue'
import { data } from './errors.data.ts'
import ErrorsTable from './ErrorsTable.vue'

const highlight = ref()
onMounted(() => {
  highlight.value = location.hash.slice(1)
})
</script>

# પ્રોડક્શન એરર કોડ સંદર્ભ (Production Error Code Reference) {#error-reference}

## રનટાઇમ એરર્સ (Runtime Errors) {#runtime-errors}

પ્રોડક્શન બિલ્ડ્સમાં, નીચેની એરર હેન્ડલર APIs ને પાસ કરવામાં આવેલ ત્રીજો આર્ગ્યુમેન્ટ સંપૂર્ણ માહિતી સ્ટ્રિંગને બદલે ટૂંકો કોડ હશે:

- [`app.config.errorHandler`](/api/application#app-config-errorhandler)
- [`onErrorCaptured`](/api/composition-api-lifecycle#onerrorcaptured) (Composition API)
- [`errorCaptured`](/api/options-lifecycle#errorcaptured) (Options API)

નીચેનું ટેબલ કોડ્સને તેમની મૂળ પૂર્ણ માહિતી સ્ટ્રિંગ્સ સાથે મેપ કરે છે.

<ErrorsTable kind="runtime" :errors="data.runtime" :highlight="highlight" />

## કમ્પાઇલર એરર્સ (Compiler Errors) {#compiler-errors}

નીચેનું ટેબલ પ્રોડક્શન કમ્પાઇલર એરર કોડ્સનું તેમના મૂળ સંદેશાઓ સાથે મેપિંગ પૂરું પાડે છે.

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
