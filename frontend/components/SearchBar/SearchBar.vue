<template>
    <div class="search-bar">
        <div id="search-block" class="capacity-block">
            <h3 class="searchbar-category-title">Capacité</h3>
            <div class="multiselect-wrapper">
                <Multiselect v-model="capacityInput" :options="capacityOptions" placeholder="Nombre"> </Multiselect>
            </div>
        </div>
        <div id="search-block" class="begin-date-block">
            <h3 class="searchbar-category-title">Debut</h3>
            <DatePicker format="DD/MM/YYYY H:i" width="100" v-model="beginInput" id="date1"></DatePicker>
        </div>
        <div id="search-block" class="duration-block">
            <h3 class="searchbar-category-title">Fin</h3>
            <DatePicker format="DD/MM/YYYY H:i" width="100" v-model="endInput" id="date2"></DatePicker>
        </div>
        <div id="search-block" class="equipment-block">
            <h3 class="searchbar-category-title">Equipements</h3>
            <Multiselect v-model="equipmentsInput" :options="equipmentsOptions" :multiple="true" placeholder="Equipements"> </Multiselect>
        </div>
        <div id="search-block" class="search-button-block">
            <button class="adlin-btn" @click="searchSpecificRooms()">Rechercher</button>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            capacityInput: '',
            beginInput: '',
            endInput: '',
            equipmentsInput: '',
            equipmentsOptions: ['TV', 'Retro Projecteur'],
            capacityOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '+15']
        }
    },
    mounted() {
      document.getElementById('date1').children[0].children[0].placeholder = 'Date'
      document.getElementById('date2').children[0].children[0].placeholder = 'Date'
    },
    watch: {
      'capacityInput': function(newVal, oldVal) {
        this.searchSpecificRooms();
      },
      'equipmentsInput': function(newVal, oldVal) {
        this.searchSpecificRooms()
      }
    },
    methods: {
        async searchSpecificRooms() {
            await axios.post('http://localhost:3001/api/rooms/search', {
                capacity: this.$data.capacityInput, 
                beginDate: this.$data.beginInput,
                endDate: this.$data.endInput,
                equipments: this.$data.equipmentsInput
            })
            .then(response => {
                this.$store.commit('setRooms', response.data.rooms);
            })
            .catch(err => {
                console.log(err)
            })
        }
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>

.search-bar {
  display: flex;
  background-color: white;
  min-width: 750px;
  width: 800px;
  border-radius: 50px;
  padding: 8px 30px 8px 30px; 
}

#search-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70px;
}

.capacity-block {
  width: 20%;
}

.begin-date-block {
  width: 20%;
}

.duration-block {
  width: 20%;
}

.equipment-block {
  width: 25%;
}

.search-button-block {
  width: 15%;
}

.searchbar-category-title {
  font-size: 15px;
  margin: 0 0 3px 0;
  color: #35495e;
}


/* For multiselect component */

.multiselect__tags {
  width: 80% !important;
}

.multiselect__select {
  display: none;
}

.multiselect__option--highlight {
  background-color: rgb(39, 145, 216) !important;
}

.multiselect__option--highlight:after {
  background-color: rgb(39, 145, 216) !important;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a !important;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a !important;
}


.multiselect__tag {
  background-color: rgb(39, 145, 216) !important;
}



.multiselect__tag-icon {
  background-color: rgb(39, 145, 216) !important;
}

/* For Calendar component */


.calender-div {
  min-width: 280px !important;
}

.nav-l {
  background-color: rgb(39, 145, 216) !important;
}

.nav-r {
  background-color: rgb(39, 145, 216) !important;
}

.year-month-wrapper {
  background-color: rgb(39, 145, 216) !important;
}
.days {
  color: rgb(39, 145, 216) !important;
}

.activePort {
  background-color: rgb(39, 145, 216) !important;
}
.port:hover {
  color: rgb(39, 145, 216) !important;
}

.okButton {
  color: rgb(39, 145, 216) !important;
}

.active {
  background-color: rgb(39, 145, 216) !important;
}

#tj-datetime-input {
  min-width: 10px;
  outline: none;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  font-size: 15px;
  width: 80%;
  height: 40px;
  background-color: none;
  padding: 0px;
  color: #35495e;
  padding: 0 0 0 5px;
}

#tj-datetime-input::placeholder {
  color: #adadad;
  display: inline-block;
  margin-left: 5px !important;
}

</style>
