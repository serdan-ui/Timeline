<template>
  <div id="app">
    <Navbar />
    <Timeline :items="items" :groups="groups" :options="options"></Timeline>
    <ReservationList />
  </div>
</template>

<script>
// import Calendario from './components/Calendario.vue';
import Navbar from "./components/Navbar.vue";
import ReservationList from "./components/reservationList.vue";
import Timeline from "./components/Timeline.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    ReservationList,
    Timeline,
  },
  data() {
    return {
      groups: [
        {
          id: 0,
          content: "grupo 0",
        },
      ],
      options: {
        //stack: false,
        orientation: {
          axis: "top",
          item: "top",
        },
         minHeight:'150px',
        zoomMax: 87600900, // 10,000 years is maximum possible
        zoomMin: 10000000, // 10ms
      },
    };
  },
  computed: {
    ...mapState(["reservations"]),
    items() {
      return this.reservations.map((reserva) => {
        return {
          id: reserva.id,
          start: reserva.date + " " + reserva.start,
          end: reserva.date + " " + reserva.end,
          group: 0,
          className: reserva.state,
        };
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}
tr {
   line-height: 5vh;
   min-height: 7vh;
   height: 7vh;
}
th {
   line-height: 7vh;
   min-height: 7vh;
   height: 7vh;
   border: none !important;
   color: #4b4b4bbe;
}
tr td:first-child{
 font-weight: bold;
}
</style>
