<template>
  <div ref="root">
    <div id="map-container">
      <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="8"
        map-type-id="roadmap"
        style="width: 60vw; height: 90vh;"
        ref="mapRef"
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
          styles: gmapStyle
        }"
      />
    </div>
    <div id="card-container">
      <div>
        <div style="text-align: center">
          <span class="back-btn" v-if="selectedCountry" @click="goBack">back</span>
          <h1>
            {{
              this.selectedCountry
              ? (
                  this.selectedCity
                  ? this.selectedCity : this.selectedCountry
                ) : 'Countries'
            }}:
          </h1>
        <p>(hover or click to view short or detailed info)</p>
        </div>
        <div v-if="!selectedCountry" class="scrollable-list">
          <div v-for="country in countries" :key="country.name" class="list-item-container" @click="select(0, country)" @mouseover="focusedCountry = country">
            <p :class="{ 'list-item-hover': focusedCountry && country.name == focusedCountry.name, 'list-item': true }">
              - {{ country.name }}
            </p>
            <div v-show="focusedCountry && focusedCountry.name == country.name" class="list-item-detail">
              <p>{{ focusedCountry && getPlaceInfo(focusedCountry) }}</p>
            </div>
          </div>
        </div>
        <div v-else-if="!selectedCity" class="scrollable-list" ref="city-scroll">
          <div v-for="city in filteredCities" :ref="city.name" :key="city.name" class="list-item-container" @click="select(1, city)" @mouseover="focusedCity = city">
            <p :class="{ 'list-item-hover': focusedCity && city.name == focusedCity.name, 'list-item': true }">
              - {{ city.name }}
            </p>
            <div v-show="focusedCity && focusedCity.name == city.name" class="list-item-detail">
              <p>{{ focusedCity && getPlaceInfo(focusedCity) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="scrollable-list">
          <div v-for="venue in filteredVenues" :key="venue.name" @mouseover="focusedVenue = venue">
            <p :class="{ 'list-item-hover': focusedVenue && venue.name == focusedVenue.name, 'list-item': true }">
              - {{ venue.info.name }}
            </p>
            <div v-show="focusedVenue && focusedVenue.name == venue.name" class="list-item-detail">
              <VenueDetailCard :venue="focusedVenue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from './Chart.vue';
import { gmapApi } from 'vue2-google-maps';

import VenueDetailCard from './VenueDetailCard.vue';
import GMAP_CUSTOM_STYLE from '../gmap.style';

import venueDetails from '../../json/venueDetails.json';

export default {
  components: {
    Chart,
    VenueDetailCard
  },
  props: ['focusVenue'],
  data() {
    return {
      gmap: null,
      gmapStyle: GMAP_CUSTOM_STYLE,
      countries: [],
      cities: [],
      venues: [],
      filteredCities: [],
      filteredVenues: [],
      selectedCountry: null,
      selectedCity: null,
      focusedCountry: null,
      focusedCity: null,
      focusedVenue: null,
      placeInfo: new Map(),
      countryInfo: new Map(),
    };
  },
  computed: {
    google: gmapApi
  },
  watch: {
    focusVenue: {
      handler: function(venueName) {
        // forcefully find and focus venue with `venueName`
        for (let cityKey in venueDetails) {
          for (let venueKey in venueDetails[cityKey]) {
            const venue = venueDetails[cityKey][venueKey];
            if (venueKey == venueName) {
              // Sometimes you just got to do that...
              this.selectedCountry = venue.country;
              window.scrollTo({
                left: 0,
                top: this.$refs['root'].offsetTop - 58,
                behavior: 'smooth'
              });
              setTimeout(() => {
                this.selectedCity = venue.city;
                setTimeout(() => {
                  this.focusedVenue = { name: venue.name, info: venue };
                }, 100);
              }, 100);
            }
          }
        }
      }
    },
    selectedCountry: {
      handler: function(newVal) {
        if (newVal === null)
          return this.generateAndFitBounds(this.countries.map(c => c.marker));
        this.countrySelected();
      },
    },
    selectedCity: {
      handler: function(newVal) {
        if (newVal === null) return this.countrySelected();
        this.citySelected();
      }
    },
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.gmap = map;

      // prepare markers to show cities
      Object.keys(venueDetails).forEach(cityKey => {
        const city = venueDetails[cityKey];
        const venues = Object.keys(city);

        if (!this.cities.find(c => cityKey == c.name)) {
          const cityMarker = new google.maps.Marker({
            position: new google.maps.LatLng(city.latitude, city.longitude),
            map: null
          });
          cityMarker.addListener('click', () => {
            this.selectedCity = cityKey;
          });
          cityMarker.addListener('mouseover', () => {
            this.focusedCity = this.cities.find(c => c.name == cityKey);
            this.$refs['city-scroll'].scrollTo(
              0,
              this.$refs[this.focusedCity.name][0].offsetTop -
                this.$refs['city-scroll'].offsetTop -
                60
            );
          });
          this.cities.push({
            name: cityKey,
            marker: cityMarker,
            country: city[Object.keys(city)[0]].country
          });
        }

        venues.forEach(venueKey => {
          if (venueKey == 'latitude' || venueKey == 'longitude') return;

          // create and add country marker if doesn't already exists
          if (!this.countries.find(c => city[venueKey].country === c.name)) {
            const countryMarker = new google.maps.Marker({
              position: new google.maps.LatLng(
                city[venueKey].countryLat,
                city[venueKey].countryLong
              ),
              map: null
            });
            countryMarker.addListener('click', () => {
              this.selectedCountry = city[venueKey].country;
            });
            countryMarker.addListener('mouseover', () => {
              this.focusedCountry = this.countries.find(
                c => c.name == city[venueKey].country
              );
            });
            this.countries.push({
              name: city[venueKey].country,
              marker: countryMarker
            });
          }

          // create and add venue marker
          const venueCircle = new google.maps.Circle({
            strokeColor: '#AAF00A',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#84FB4C',
            fillOpacity: 0.35,
            center: new google.maps.LatLng(
              city[venueKey].latitude,
              city[venueKey].longitude
            ),
            radius: 800
          });
          const labelWindow = new google.maps.InfoWindow({
            content: city[venueKey].name,
            position: venueCircle.getCenter()
          });
          labelWindow.addListener('closeclick', () => {
            this.selectedCity = null;
          });
          venueCircle.addListener('mouseover', () => {
            this.focusedVenue = {
              name: city[venueKey].name,
              info: city[venueKey]
            };
          });
          this.venues.push({
            name: city[venueKey].name,
            marker: venueCircle,
            info: city[venueKey],
            label: labelWindow
          });
        });
      });

      this.generateAndFitBounds(this.countries.map(c => c.marker));
    });
  },
  methods: {
    generateAndFitBounds(markers, zoom) {
      const bounds = new google.maps.LatLngBounds();
      for (const m of markers) {
        m.setMap(this.gmap);
        bounds.extend(m.position || m.center);
      }
      this.$refs.mapRef.$mapObject.fitBounds(bounds);

      if (zoom != null && markers.length < 2) this.gmap.setZoom(zoom);
    },
    select(category, value) {
      switch (category) {
        case 0: {
          return (this.selectedCountry = value.name);
        }
        case 1: {
          return (this.selectedCity = value.name);
        }
      }
    },
    countrySelected() {
      this.countries.forEach(c => c.marker.setMap(null));
      this.hideAllVenues();

      this.filteredCities = this.cities.filter(
        c => c.country == this.selectedCountry
      );
      this.generateAndFitBounds(this.filteredCities.map(c => c.marker));
    },
    citySelected() {
      this.cities.forEach(c => c.marker.setMap(null));
      this.hideAllVenues();

      this.filteredVenues = this.venues.filter(
        v => v.info.city === this.selectedCity
      );
      this.generateAndFitBounds(this.filteredVenues.map(v => v.marker), 14);
      this.filteredVenues.forEach(v => v.label.open(this.gmap));
    },
    getPlaceInfo(place) {
      if (this.placeInfo.has(place.name)) return this.placeInfo.get(place.name);
      const venues = this.venues.filter(
        v => v.info.city === place.name || v.info.country === place.name
      );
      this.placeInfo.set(
        place.name,
        `${venues.reduce(
          (r, v) => r + v.info.matchesPlayed,
          0
        )} matche(s) played in ${venues.length} venue(s)`
      );
      return this.placeInfo.get(place.name);
    },
    hideAllVenues() {
      this.venues.forEach(v => {
        v.marker.setMap(null);
        v.label.close();
      });
    },
    goBack() {
      if (this.selectedCity) this.selectedCity = null;
      else if (this.selectedCountry) this.selectedCountry = null;
    }
  }
};
</script>

<style scoped>
#map-container {
  margin: 20px;
  display: inline-block;
}
#card-container {
  display: inline-block;
  position: absolute;
  margin: 18px;
}

#card-container > div {
  background: white;
  padding: 20px;
  width: 32vw;
  height: 90vh;
  border-radius: 14px;
  box-shadow: 1px 1px 4px 2px black;
}

.list-item {
  cursor: pointer;
  transition: transform 0.3s;
  padding: 4px;
}

.list-item:hover {
  transform: translateX(8px);
  transform: scale(1.02, 1.02);
  font-weight: 500;
  background: lightgrey;
}

.list-item-container {
  cursor: pointer;
}

.list-item-hover {
  transform: translateX(8px);
  transform: scale(1.02, 1.02);
  font-weight: 500;
  background: lightgrey;
}

.list-item-detail {
  color: darkcyan;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
}

.venue-detail {
  font-size: 20px;
  color: darkcyan;
  vertical-align: middle;
  padding: 12px;
}

.scrollable-list {
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 72vh;
}

.scrollable-list::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
}

.scrollable-list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.4);
  /* -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5); */
}

.back-btn {
  position: absolute;
  left: 0px;
  margin-top: 4px;
  margin-left: 22px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  transform: rotate(360deg);
}
</style>

<style>
.vue-map {
  border-radius: 20px !important;
}
a[href^="http://maps.google.com/maps"] {
  display: none !important;
}
a[href^="https://maps.google.com/maps"] {
  display: none !important;
}

.gmnoprint a,
.gmnoprint span,
.gm-style-cc {
  display: none;
}
.gmnoprint div {
  background: none !important;
}
</style>
