import Axios from 'axios'

export default class API {
    constructor(url) {
        this.url = url
        this.statesQueue = []
        this.doStateRequest()
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
        this.statesQueue.push(
            {
                route: route,
                params: params,
                callback: callback
            }
        )
    }

    stateRequest (request, statesQueue, url) {
        if (statesQueue.length > 0) {
            let state = statesQueue.pop(0)
            request(url, state.route, state.params, state.callback).then(res => {
                state.callback(res)
            })
        }
    }

    doStateRequest () {
        setInterval(this.stateRequest, 500, this.request, this.statesQueue, this.url)
    }
}