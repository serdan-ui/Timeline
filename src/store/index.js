import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reservations: [
      {
        id:1,
        name: "Teresita Lajud de la Puente",
        date: moment().format("YYYY-MM-DD"),
        start: "18:00",
        end: "20:30",
        state: "orange"
      },
      {
        id:2,
        name: "Nahuel Garay",
        date: moment().format("YYYY-MM-DD"),
        start: "13:00",
        end: "15:45",
        state: "orange"
      },
      {
        id:3,
        name: "Florencia Vallejo",
        date: moment().format("YYYY-MM-DD"),
        start: "08:00",
        end: "12:00",
        state: "orange"
      }
    ]
  },
  mutations: {
    ADD_RESERVATION:(state, reserva) => {
      state.reservations = state.reservations.concat(reserva)
    },
    DELETE_RESERVE:(state,id) => {
      const indexReservation = state.reservations.findIndex(reserva => reserva.id === id)
      state.reservations.splice(indexReservation, 1)
      
    }
  },
  actions: {
    saveReservation({commit}, reserva){
      commit('ADD_RESERVATION', reserva)
    },
    deleteReservetion({commit}, id){
      commit('DELETE_RESERVE', id)
    }
  }
})
