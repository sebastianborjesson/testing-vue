<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps(["movie"]);

const store = useStore();
const isLoading = ref(false);

const onFavouriteClick = async () => {
    isLoading.value = true;
    await store.dispatch("addMovieToFavourites", props.movie.id);
    isLoading.value = false;
}
</script>
<template>
    <button class="bg-transparent pd-3 w-11 h-11 text-sm" 
        :disabled="isLoading"
        @click="onFavouriteClick">
        <span class="material-icons" v-show="movie.isFavourite">favorite</span>
        <span class="material-icons" v-show="!movie.isFavourite">favorite_border</span>
                
    </button>
</template>

<style>

</style>