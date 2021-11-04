<template>
    <nuxt-link :to="postLink" class="post-preview">
      <article>
        <div class="post-thumbnail"
        :style="{backgroundImage: 'url(' + thumbnail + ')' }"></div>
        <div class="post-content">
          <h1>{{ title }}</h1>
          <p>{{ previewText }}</p>
            <ul class="room-infos-list">
              <li class="room-infos-elem">Capacite: {{ capacity }} personnes</li>
              <li class="room-infos-elem">Equipements: {{ getEquipments() }}</li>
              <li class="room-infos-elem">Disponibilite: {{ free ? "Libre" : "Occupee"}}</li>
            </ul>
        </div>
      </article>
    </nuxt-link>
</template>

<script>
export default {
    name: 'PostPreview',
    props: {
        id: {
            type: String,
            required: true
        },
        isAdmin: {
          type: Boolean,
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
        free: {
          type: Boolean,
          required: true
        },
        equipments: {
          type: Array,
          required: true
        }
    },
    methods: {
      getEquipments() {
        return ""
        let equipmentsStr = null;

        if (!this.equipments.length)
          return "Pas d'equipement"
        for (let i = 0; i < this.equipments.length; i++) {
          equipmentsStr = (!equipmentsStr) ? this.equipments[i] : equipmentsStr + ', ' + this.equipments[i] 
        }
        return equipmentsStr;
      }
    },
    computed: {
      postLink() {
        return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
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

.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a.active .post-content {
  background-color: #ccc;
}
</style>