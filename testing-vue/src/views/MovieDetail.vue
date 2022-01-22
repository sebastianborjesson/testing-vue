<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NavBar from '../components/NavBar.vue';

const route = useRoute();
const store = useStore();
onMounted(async() => {
    await store.dispatch("fetchMovieById", route.params.movieId);
})
</script>

<template>

</template>

<style scoped>

</style>