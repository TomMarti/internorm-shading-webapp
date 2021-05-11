<template>
  <div>
    <h3>{{ name }}</h3>
    <label>Ouverture</label><br/>
    <input @change="moveStore()" type="range" min="0" max="100" v-model="percentage" class="slider"><br/>
    <label>Angle</label><br/>
    <input @change="openStore()" type="range" min="0" max="15" v-model="opercentage" class="slider"><br/>
    <button @click="refreshState()">Refresh</button>
  </div>
</template>

<script>
export default {
  name: "Store",
  data () {
    return {
      percentage: 0,
      opercentage: 0,
      getStateValue: 0
    }
  },
  props: ['id', 'name', 'api'],
  methods: {
    moveStore () {
      let position = Number(this.percentage).toString(16).toUpperCase()
      this.api.opening(this.id, position, (res) => {console.log(res)})
    },
    openStore () {
      let position = Number(this.opercentage).toString(16).toUpperCase()
      this.api.angle(this.id, position, (res) => {console.log(res)})
    },
    refreshState () {
      try {
        this.api.state(this.id, (response => {
          if (response.data.includes("{XC_SUC}")) {
            response = response.data.replace("{XC_SUC}", "")
            response = JSON.parse(response).state
            let b2 = Math.round(parseInt("0x" + response.substring(18, 20)) / 3.75)
            let b3 = parseInt("0x" + response.substring(26, 28))
            console.log("angle: " + b2 + " position: " + b3)
            this.percentage = b3
            this.opercentage = b2
          } else {
            console.log("Retry")
          }
        }))
      } catch (e) { console.log("error")}
    },
    getState() {
      this.api.getState(this.id, (res) => {
        // 2 précédent la ouverture
        // 2 dernier digit percentage
        let state = res[0].state

        this.getStateValue = state
        this.opercentage = Math.round(parseInt("0x" + state.substring(2, 4)) / 3.75)
        this.percentage = parseInt("0x" + state.substring(4, 6))
      })
    }
  },
  mounted () {
    this.getState()
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  padding: 10px 20px;
}
</style>
