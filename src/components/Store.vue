<template>
<div>
  <h3>{{ name }}</h3>
  <label>Ouverture</label><br/>
  <input @change="moveStore()" type="range" min="0" max="100" v-model="percentage" class="slider"><br/>
  <label>Angle</label><br/>
  <input @change="openStore()" type="range" min="0" max="15" v-model="opercentage" class="slider">
</div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "Store",
  data () {
    return {
      percentage: 0,
      opercentage: 0,
    }
  },
  props: ['id', 'name', 'url'],
  methods: {
    moveStore () {
      let position = Number(this.percentage).toString(16).toUpperCase()
      position = ("0" + position).slice(-2)
      Axios.get(this.url + "/command?XC_FNC=SendSC&type=IN&data=" + (("0" + this.id).slice(-2)) + "18" + position)
    },
    openStore () {
      let position = Number(this.opercentage).toString(16).toUpperCase()
      console.log(position)
      Axios.get(this.url + "/command?XC_FNC=SendSC&type=IN&data=" + (("0" + this.id).slice(-2)) + "004" + position)
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  padding: 10px 20px;
}
</style>
