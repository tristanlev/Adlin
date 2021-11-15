<template>
  <div class="home-page">
    <section class="body">
      <div class="search-bar-background">
        <SearchBar/>
      </div>
      <h1 class="room-result-title">Toutes les salles disponibles</h1>
      <RoomList :rooms="loadedRooms"/>
    </section>
  </div>
</template>

<script>

import RoomList from '~/components/Rooms/RoomList'
import SearchBar from '~/components/SearchBar/SearchBar'

export default {
  components: {
    RoomList,
    SearchBar
  },
  computed: {
    loadedRooms() {
      return this.$store.getters.loadedRooms;
    }
  }
}
</script>

<style scoped>

.search-bar-background {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: rgb(39, 145, 216);
}

.room-result-title {
  padding-left: 55px;
  color: #35495e;
}

</style>
