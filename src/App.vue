<template>
  <div id="app">
    <h1>Gestion des stores</h1>
    <store-groupe v-for="groupe in config.groupes" :key="groupe.id" :api="api" :name="groupe.name" :stores="groupe.stores"></store-groupe>
    <div>
      <input style="display: none;" type="number" v-model="toTest" />
      <button style="display: none;"  @click="sendToTest">Send message</button>
    </div>
  </div>
</template>

<script>
import data from "./assets/config.json"
import StoreGroupe from "@/components/StoreGroupe";
import API from "@/api/api";
export default {
  name: 'App',
  data () {
    return {
      config: data,
      api: new API(data.url),
      toTest: 31
    }
  },
  components: {
    StoreGroupe
  },
  methods: {
    sendToTest () {
      let val = Number(100).toString(16).toUpperCase()
      this.api.opening(Number(this.toTest), val, (res) => {console.log(res)})
    }
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
