<template>
<div>
  <h2 :class="{'open' : open}" @click="openClose"><span>{{ name }}</span><span>{{ sigle }}</span></h2>
  <store v-show="open" v-for="store in stores" :key="store.id" :id="store.id" :name="store.name" :url="url"></store>
</div>
</template>

<script>
import Store from "@/components/Store";
export default {
  name: "StoreGroupe",
  props: ['name', 'stores', 'url'],
  components: {
    Store
  },
  data () {
    return {
      open: false,
      sigle: "+"
    }
  },
  methods: {
    openClose () {
      this.open = !this.open
      this.sigle = this.open ? "-" : "+"
    }
  }
}
</script>

<style scoped>
div {
  background-color: #fefefe;
  margin: 20px 0 0 0;
}
h2 {
  margin: 0;
  background-color: #fefefe;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
h2.open {
  border-bottom: solid 1px #2c3e50;
}
</style>