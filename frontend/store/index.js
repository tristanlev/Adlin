import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedRooms: []
        },
        mutations: {
            setRooms(state, rooms) {
                state.loadedRooms = rooms[0].rooms;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get('http://localhost:3001/api/rooms/')
                    .then(res => {
                        const roomsArray = []
                        for (const key in res.data) {
                            console.log(res.data[key])
                            roomsArray.push({ ...res.data[key], id: key})
                        }
                        vuexContext.commit('setRooms', roomsArray)
                    })
            },
            setRooms(vuexContext, rooms) {
                vuexContext.commit('setRooms', rooms)
            }
        },
        getters: {
            loadedRooms(state) {
                return state.loadedRooms
            }
        }
    })
}

export default createStore