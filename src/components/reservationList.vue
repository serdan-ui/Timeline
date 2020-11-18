<template>
  <b-container>
    <b-table
      id="reservationsTable"
      :items="reservations"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      small
      class="text-left "
    >
      <template v-slot:cell(id)="data">
          <b-icon @click="eliminar(data.value)" icon="trash"></b-icon>
      </template>
      <template v-slot:cell(startEnd)="data">
        de {{ data.item.start | moment }} a
        {{ data.item.end | moment }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
export default {
  name: "ReservationList",
  data() {
    return {
      sortBy: "name",
      sortDesc: false,
      fields: [
        {
          key: "name",
          sortable: false,
          label: "Nombre",
        },
        {
          key: "startEnd",
          sortable: true,
          label: "Horario",
        },
        {
          key: "id",
          label: "acción",
          sortable: false,
          label: "Acción",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["deleteReservetion"]),
    eliminar(id) {
      this.deleteReservetion(id);
    },
  },
  computed: {
    ...mapState(["reservations"]),
  },
  filters: {
    moment: function (date) {
      return moment(date,"h:mm").format("H:mm");
    }
  },
  mounted() {},
};
</script>

<style scoped>
.b-table{
  margin-top: 8vh;
}
.b-icon{
    cursor: pointer;
}
</style>