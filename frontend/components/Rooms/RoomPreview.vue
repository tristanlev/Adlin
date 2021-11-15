<template>
  <div>
    <div class="room-preview" @click="showModal = true">
        <article>
          <div class="room-thumbnail"
          :style="{backgroundImage: 'url(' + thumbnail + ')', borderRadius: '5px 5px 0 0'}"></div>
          <div class="room-content">
            <h1>{{ title }}</h1>
            <p>{{ previewText }}</p>
              <ul class="room-infos-list">
                <li class="room-infos-elem">Capacite: {{ capacity }} personnes</li>
                <li class="room-infos-elem">Equipements: {{ getEquipments() }}</li>
              </ul>
          </div>
        </article>
      </div>
        <ReservationModal v-if="showModal === true"
          :roomName="title"
          :description="previewText"          
          @closeModal="showModal = false"
        />

  </div>
</template>

<script>

import ReservationModal from '~/components/ReservationModal/ReservationModal'

export default {
  components: {
    ReservationModal
  },
  name: 'RoomPreview',
  data() {
    return {
      showModal: false,
    }
  },
  props: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      previewText: {
        type: String,
        required: true
      },
      thumbnail: {
        type: String,
        required: true
      },
      capacity: {
        type: Number,
        required: true
      },
      equipments: {
        type: Array,
        required: true
      }
    },
    methods: {
      getEquipments() {
        let equipmentsStr = null;

        if (!this.equipments.length)
          return "Pas d'equipement"
        for (let i = 0; i < this.equipments.length; i++) {
          equipmentsStr = (!equipmentsStr) ? this.equipments[i].name : equipmentsStr + ', ' + this.equipments[i].name
        }
        return equipmentsStr;
      },
      changeModalValue() {
        console.log('hello modal')
        this.$refs.modalId.display = "block";
        console.log(this.$refs.modalId);
      }
    }
}
</script>

<style scoped>

.room-infos-list {
  list-style-type: none;
  padding: 0;
}

.room-infos-elem {
  /* display: inline; */
  /* text-align: center; */
  text-align: left;
}

.room-preview {
  cursor: pointer;
  box-shadow: 0 5px 10px #ccc;
  background-color: white;
  width: 90%;
  border-radius: 8px;
}

.room-preview:hover {
  background-color: lightblue;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .room-preview {
    width: 400px;
    margin: 10px;
  }
}

.room-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.room-content {
  padding: 10px;
  text-align: center;
}

a:hover .room-content,
a.active .room-content {
  background-color: #ccc;
}
</style>