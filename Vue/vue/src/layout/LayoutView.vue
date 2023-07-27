<template>
  <div id="layout">
     <Header/>

    <div class="body">
      <Aside/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'

export default {
    name: 'Layout',
    components: {
        Header,
        Aside
    }
}
</script>

<style scoped>
.body {
  display: flex;
}
.body router-view {
  flex: 1;
}
</style>