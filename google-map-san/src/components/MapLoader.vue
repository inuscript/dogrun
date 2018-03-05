<template>
  <div>
    <h1>Map</h1>
    <div id="map">
      <div v-if="loadCompleted">
        <slot :google="google"/>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps'
import MapParent from './MapParent'
import InfoItem from "./InfoItem"
import Vue from "vue"

const API_KEY = 'AIzaSyC9VdVBb15bb4-msBd_SqBv0SiofrAAKk0'
GoogleMapsLoader.KEY = API_KEY

export default {
  name: 'HelloWorld',
  data(){
    return {
      google: null
    }
  },
  components: {
    MapParent,
  },
  computed: {
    loadCompleted(){
      return (!!this.google )
    },
    initialPoint () {
      return this.$props.makers[0]
    }
  },
  mounted () {
    GoogleMapsLoader.load((google) => {
      this.$_googleMaps = google.maps
      this.google = google
      this.initializeMap()
    })
    const i = Vue.compile("<div>hello</div>")
    console.log(i.render())
    // console.log(InfoItem)
    // console.log(i)
    
  },
  methods: {
    initializeMap (){
      const mapContainer = this.$el.querySelector('#map')
      this.$_map = new this.google.Map(mapContainer, {
        center: this.initialPoint,
        zoom: 12
      })
    },
    addMaker () {
      return new this._googleMaps.Maker({
        map: this.$_map
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#map {
  height: 500px;
  width: 500px;
}
</style>
