<template>
  <div>
    <b-container>
      <b-card>
        <h3 class="text-md-left pl-5 text-uppercase font-weight-bold">
          Reservar
        </h3>
        <b-form @submit.prevent="addReservation">
          <b-row class="my-1 pl-md-5 pt-3">
            <b-col sm="4" class="text-left pr-3">
              <label>Nombre</label>
              <b-form-input
                placeholder="Apellido y Nombre"
                type="text"
                size="sm"
                class="mb-2"
                v-model="name"
              ></b-form-input>
            </b-col>
            <b-col sm="2" class="text-left pr-md-3 pl-md-1">
              <label>Fecha</label>
              <b-input-group size="sm">
                <b-form-datepicker
                  placeholder="dd/mm/yyyy"
                  v-model="date"
                  id="datepicker"
                  class="mb-2"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                  :min="min"
                ></b-form-datepicker>
              </b-input-group>
            </b-col>
            <b-col sm="2" class="text-left pr-md-4 pl-md-3">
              <label>Desde</label>
              <b-input-group size="sm">
                <b-form-timepicker
                  v-model="timeStart"
                  id="timepickerIn"
                  class="mb-2"
                  placeholder="hh:mm"
                  locale="en"
                  :hour12="false"
                  :minutes-step="15"
                ></b-form-timepicker>
              </b-input-group>
            </b-col>
            <b-col sm="2" class="text-left pr-md-4 pl-md-2">
              <label>Hasta</label>
              <b-input-group size="sm">
                <b-form-timepicker
                  v-model="timeEnd"
                  id="timepickerOut"
                  class="mb-2"
                  placeholder="hh:mm"
                  :hour12="false"
                  :minutes-step="15"
                ></b-form-timepicker>
              </b-input-group>
            </b-col>
            <b-button
              size="sm"
              variant="info"
              type="submit"
              class="mb-2 mt-auto col-md-1"
              >Guardar</b-button
            >
          </b-row>
        </b-form>

        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="danger"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>{{ error }}</p>
          <b-progress
            variant="danger"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
          ></b-progress>
        </b-alert>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      name: null,
      date: null,
      timeStart: null,
      timeEnd: null,
      id: null,
      min: new Date(),
      error: null,
      dismissSecs: 8,
      dismissCountDown: 0,
    };
  },
  methods: {
    ...mapActions(["saveReservation"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    addReservation(event) {
      let currentTime = moment().format("LT");
      let currentTimeFormat24h = moment(currentTime, "h:mm A").format("HH:mm");
      let currentDay = moment().format('L');
      if (this.timeStart < currentTimeFormat24h && moment(this.date).format('MM/DD/YYYY') == currentDay) {
        this.error = `La hora elegida 'Desde: ${this.timeStart}' ya paso!!`;
        this.dismissCountDown = this.dismissSecs;
        return;
      } else if (!this.name || !this.date || !this.timeStart || !this.timeEnd) {
        this.error = "Complete todos los campos";
        this.dismissCountDown = this.dismissSecs;
        return;
      } else if (this.timeStart >= this.timeEnd) {
        this.error =
          `El campo 'Desde: ${this.timeStart}' no puede ser mayor o igual al campo 'Hasta: ${this.timeEnd}'`;
        this.dismissCountDown = this.dismissSecs;
        return;
      }
      this.saveReservation({
        name: this.name,
        date: this.date,
        start: this.timeStart,
        end: this.timeEnd,
        id: Math.floor(Math.random() * (0, 1000)),
        state: "green",
      });
      this.name = null;
      this.date = null;
      this.timeEnd = null;
      this.timeStart = null;
      this.error = null;
    },
  },
};
</script>

<style  scoped>
.b-form-group {
  padding: 0px;
  margin: 0px;
}
.card {
    box-shadow: 0px 7px 10px -8px rgba(0, 0, 0, 0.25);
}
.card h3 {
  color: #077041;
}
button{
  background: #42b983
}
button:hover{
  background: #158553
}
</style>