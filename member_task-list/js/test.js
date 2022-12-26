import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0,
      hi:{
        a:'1',
        b:'2'
      }
    }
  }
})

app.mount('#app')