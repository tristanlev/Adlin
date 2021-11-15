<template>
<div class="header-container">
  <header class="the-header">
    <div class="logo">
      <nuxt-link to="/">Adlin - Reserver une salle</nuxt-link>
    </div>
  </header>
</div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>


<style scoped>
.header-container {
  width: 100%;
  height: 60px;
}

.the-header {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: rgb(39, 145, 216);
}

.logo {
  margin: 0 30px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

</style>
