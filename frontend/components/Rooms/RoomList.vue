<template>
    <section class="room-list">
        <RoomPreview
        v-for="(room, index) in rooms"
        :key="index"
        :id="room.id"
        :is-admin="isAdmin"
        :title="room.name"
        :previewText="room.description"
        :capacity="room.capacity"
        />
    </section>
</template>
<script>

import RoomPreview from '~/components/Rooms/RoomPreview'

export default {
    components: {
        RoomPreview
    },
    props: {
        isAdmin: {
            type: Boolean,
            default: false
        },
        rooms: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.room-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>