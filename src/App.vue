<template>
  <div id="app">
    <h1>Gestion de ces ****** de store</h1>
    <store-groupe v-for="groupe in config.groupes" :key="groupe.id" :url="config.url" :name="groupe.name" :stores="groupe.stores"></store-groupe>
  </div>
</template>

<script>
import Axios from 'axios'
import StoreGroupe from "@/components/StoreGroupe";
export default {
  name: 'App',
  data () {
    return {
      config: {}
    }
  },
  components: {
    StoreGroupe
  },
  mounted() {
    Axios.get('http://localhost:2020/groups').then(data => {
      console.log(data)
      this.config = data.data
    })
  }
}
</script>

<style>
html {
  background-color: #eee;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
