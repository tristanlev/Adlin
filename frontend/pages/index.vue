<template>
  <div class="home-page">
    <section class="body">
      <div class="search-bar-background">
        <div class="search-bar">
          <div id="search-block" class="capacity-block">
            <h3>Capacite</h3>
            <input type="text" class="capacity-input" placeholder="Nombre de participants ?">
          </div>
          <div id="search-block" class="begin-date-block">
            <h3>Debut</h3>
            <input type="text" class="begin-date-input" placeholder="Quand ?">
          </div>
          <div id="search-block" class="duration-block">
            <h3>Duree</h3>
            <input type="text" class="duration-input" placeholder="Duree ?">
          </div>
          <div id="search-block" class="equipment-block">
            <h3>Equipements</h3>
            <input type="text" class="equipments-input" placeholder="Video proj, camera...">
          </div>
          <div id="search-block" class="search-button-block">
            <button>Search</button>
          </div>
        </div>
      </div>
      <h1>Toutes les sales existantes</h1>
      <RoomList :rooms="loadedRooms"/>
    </section>
  </div>
</template>

<script>

import RoomList from '~/components/Rooms/RoomList'

export default {
  components: {
    RoomList
  },
  computed: {
    loadedRooms() {
      return this.$store.getters.loadedRooms;
    }
  }
}
</script>

<style scoped>

.search-bar input {
  outline: none;
  border: 0;
  font-size: 15px;
  width: 80%;
  background-color: none;

}

.search-bar-background {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: rgb(39, 145, 216);
}

.search-bar {
  background-color: white;
  width: 800px;
  height: 65px; 
  display: flex;
  border-radius: 50px;
}

#search-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 10px 20px 10px 20px; */
}

.capacity-block {
  padding: 10px 0px 10px 0px;
  padding-left: 30px;
  /* flex-grow: 2; */
  width: 30%;
}

.begin-date-block {
  padding: 10px 0px 10px 0px;
  width: 15%;
  /* flex-grow: 1; */
}

.duration-block {
  padding: 10px 0px 10px 0px;
  width: 15%;
  /* flex-grow: 1; */
}

.equipment-block {
  padding: 10px 0px 10px 20px;
  width: 30%;
  /* flex-grow: 2; */
}

.search-button-block {
  padding: 10px 0px 10px 0px;
  width: 10%;
  padding-right: 30px;
  /* flex-grow: 1; */
}

#search-block:hover {
  /* background-color: lightsteelblue;
  border-radius: 50px; */
}

.search-bar h3 {
  font-size: 15px;
  margin: 0 0 3px 0;
}

.search-bar button {
  height: 60%;
}

.body {
  /* height: 100; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  box-sizing: border-box;
  /* background-image: url('~assets/images/background.jpeg'); */
  background-position: center;
  background-size: cover;
}

.body h1 {
  /* position: absolute; */
  /* top: 10%;
  left: 5%; */
  width: 100%;
  font-size: 1.5rem;
  color: black;
  /* background-color: rgb(211, 211, 211); */
  padding: 10px;
  /* border-radius: 10px; */
  /* box-shadow: 3px 3px 3px black; */
  /* box-sizing: border-box; */
  /* border: 1px solid black; */
  /* display: none; */
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}



</style>