<script setup>
import MovieFavouriteButton from './MovieFavouriteButton.vue';

    defineProps({
        movie: {
            type: Object,
            required: true
        }
    });
    
</script>
<template>
<li class="shadow rounded flex mb-3 overflow-hidden">
    <aside class="mr-3">

        <img :src="movie.cover" :alt="movie.title" class="block min-w-100">
    </aside>
    <div class="p-3 flex-col w-full">
        <header class="flex items-center justify-between">
            <p class="flex items-center">
                <span class="material-icons text-yellow-600">star</span>
                <span class="font-bold">{{movie.rating}}</span>
            </p>
            <MovieFavouriteButton :movie="movie" />
        </header>
        <p class="block text-2xl ">{{ movie.title }}</p>
        <p>{{ movie.description }}</p>
        <footer class="flex justify-end mt-auto">
            <router-link :to="`/movies/${movie.id}`" class="border border-blue-400 px-3 rounded text-blue-600">
                View more...
            </router-link>
        </footer>
    </div>
</li>


</template>
<style scoped>
.min-w-100 {
    min-width: 100px;
}
</style>