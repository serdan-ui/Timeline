<template>
  <b-container>
    <h3 class="text-left pl-md-4 pt-5 pb-2">Agenda de Reservas</h3>
    <div class="icons" inline>
            <p>
                <b-icon icon="app" class="rounded iconGreen"></b-icon>Mi Reserva Actual
            </p>
            <p>
                <b-icon icon="app" class="rounded iconYellow"></b-icon>Reservado
            </p>
            <p>
                <b-icon icon="app" class="rounded iconWhite"></b-icon>Disponible
            </p>
        </div>
    <b-row >
      <b-col sm="1">
        <b-icon icon="chevron-left" id="moveLeft"  @click="moveLeft()" class=" mb-2 mt-5">arrow_back</b-icon>
      </b-col>
      <b-col sm="10" id="visualization">
        <input
          style="display: none"
          id="sliderZoom"
          type="range"
          class="range"
          name="a"
          min="-1"
          max="1"
          step="0.1"
          value="0"
          @input="zoom()"
        />
      </b-col>
      <b-col sm="1">
        <b-icon icon="chevron-right" id="moveRight"  @click="moveRight()" class=" mb-2 mt-5">arrow_forward</b-icon>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
        timeline: null,
        dataset: null
    };
  },
  props: {
    items: {
      type: Array,
      default: [],
    },
    options: {
      type: Object,
      default: {},
    },
    groups: {
      type: Array,
      default: [],
    },
  },
  methods: {
    move(percentage) {
      var range = this.timeline.getWindow();
      var interval = range.end - range.start;
      this.timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end: range.end.valueOf() - interval * percentage,
      });
    },
    moveLeft() {
      this.move(0.2);
    },
    moveRight() {
      this.move(-0.2);
    },
    zoom(e) {
      var value = this.value;
      if (value < 0) {
        var start = moment().year(moment().year() - 100000), // to adjust with options
          end = moment().year(moment().year() + 1);
        this.timeline.zoomOut(-value);
        if (value === "-1") this.timeline.setWindow(start, end);
      } else if (value > 0) {
        var start = moment(),
          end = moment(moment().utc() + 10);
        this.timeline.zoomIn(value);
        if (value === "1") this.timeline.setWindow(start, end);
      } else {
        this.timeline.fit(this.dataset.getIds());
        this.value = 0;
      }
    },
  },
  mounted: function () {
    var container = document.getElementById("visualization");
    this.dataset = new vis.DataSet(this.items);

    this.timeline = new vis.Timeline(container, this.dataset, this.options);
  },
  created() {
    this.timeline = null;
  },
  watch: {
    items: {
      deep: true,
      handler(items) {
        this.dataset = new vis.DataSet(items);
        this.timeline.setItems(this.dataset);
      },
    },
  },
};
</script>

<style >
#visualization {
    position: relative;
}
.range {
    margin: -12px 12px 0 0;
    background: #333;
}

label,
input {
    vertical-align: middle;
    padding: 0px;
    margin: 0px;
    height: 20px;
    margin-top: -12px;
    margin-right: 12px;
}
.vis-item.orange {
    background-color: #fff38c;
    border-color: #fff38c;
    opacity: 0.7;
}
.vis-item.vis-selected.orange {
    background-color: #fff38c;
    border-color: #fff38c;
    opacity: 0.7;
}

.vis-item.green {
    background-color: #5df39b;
    border-color: #4df392;
    opacity: 0.7;
}

.vis-item.vis-selected.green {
    background-color: #4df392;
    border-color: #4df392;
    opacity: 0.7;
}
.icons {
    display: flex;
    flex-direction: row-reverse;
}
.iconGreen {
    background: #42b983;
    margin-left: 30px;
    margin-right: 5px;
}
.iconYellow {
    background: #fff38c;
    margin-left: 30px;
    margin-right: 5px;
}
.iconWhite {
    margin-right: 5px;
}
</style>