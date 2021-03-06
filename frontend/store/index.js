import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedRooms: []
        },
        mutations: {
            setRooms(state, rooms) {
                state.loadedRooms = rooms;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get('http://localhost:3001/api/rooms/')
                    .then(res => {
                        const roomsArray = []
                        for (let i = 0; i < res.data.rooms.length; i++) {
                            roomsArray.push({...res.data.rooms[i], id: i})
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