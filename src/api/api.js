import Axios from 'axios'

export default class API {
    constructor(url) {
        this.url = url
        this.statesQueue = []

        this.initStates = []
        this.loadStates()
    }

    request (url, route, params, callback) {
        Axios.get(url + route + params).then(res => {
            callback(res)
        })
    }

    angle (id, angle, callback) {
        let route = "/command?XC_FNC=SendSC"
        let params = "&type=IN&data=" + ("0" + id).slice(-2) + "004" + angle
        this.request(this.url, route, params, (res) => {
            callback(res)
        })
    }

    opening (id, percentage, callback) {
        let route = "/command?XC_FNC=SendSC"
        let params = "&type=IN&data=" + ("0" + id).slice(-2) + "18" + percentage
        this.request(this.url, route, params, (res) => {
            callback(res)
        })
    }

    state (id, callback) {
        let route = "/command?XC_FNC=ingetstate"
        let params = "&adr=" + id
        this.request(this.url, route, params, (res) => {
            callback(res)
        })
    }

    loadStates () {
        let route = "/command?XC_FNC=GetStates"
        let params = ""
        this.request(this.url, route, params, (res) => {
            if (res.data.includes("{XC_SUC}")) {
                this.initStates = JSON.parse(res.data.replace("{XC_SUC}", ""))
                if (this.statesQueue.length !== 0) {
                    this.statesQueue.forEach(state => {
                        state.callback(this.extractState(state.id))
                    })
                }
            }
        })
    }

    extractState (id) {
        return this.initStates.filter(value => parseInt(value.adr) === id && value.type === "IN")
    }

    getState (id, callback) {
        if (this.initStates.length === 0) {
            this.statesQueue.push({
                id: id,
                callback: callback
            })
        } else {
            callback(this.extractState(id))
        }
    }
}