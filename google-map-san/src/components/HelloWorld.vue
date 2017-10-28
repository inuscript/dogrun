<style>
#map {
  height: 500px;
  width: 500px;
}
</style>

<template>
  <div>
    <h1>Map</h1>
    <div id="map">

    </div>
  </div>
</template>

<script type="jsx">
import GoogleMapsLoader from 'google-maps'

const API_KEY = "AIzaSyC9VdVBb15bb4-msBd_SqBv0SiofrAAKk0"
GoogleMapsLoader.KEY = API_KEY

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    const mapContainer = this.$el.querySelector("#map")
    GoogleMapsLoader.load((google) => {
      new google.maps.Map(mapContainer, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    })
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
</style>
