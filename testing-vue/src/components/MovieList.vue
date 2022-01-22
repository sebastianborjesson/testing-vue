<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import MovieListItem from "./MovieListItem.vue";


const store = useStore();

const movies = computed(() => store.getters.filterMoviesBySearch);

</script>

<template>
<ul class="gap-4">
    <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
</ul>
</template>

<style scoped>
.grid-responsive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>