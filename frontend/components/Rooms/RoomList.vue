<template>
    <section class="room-list">
        <RoomPreview
        v-for="(room, index) in rooms"
        :key="index"
        :id="room.name"
        :title="room.name"
        :previewText="room.description"
        :capacity="room.capacity"
        :equipments="room.equipements"
        thumbnail="https://sonovision.com/wp-content/uploads/sites/2/2018/06/SallesReuPanasonic-1024x576.jpeg"
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