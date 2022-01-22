<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.state.user);
const hasMovies = computed(() => store.getters.hasMovies);

const onKeyUp = (event) => {
    store.commit("setSearchText", event.target.value.trim());
}
</script>
<template>
    <nav class="sticky top-0 bg-yellow-500 p-4 mb-3 flex justify-between" >
        <router-link to="/movies" class="font-bold items-center">Vue Movies</router-link>
        <div v-if="hasMovies">
            <input class="rounded px-4 py-1 mr-3" type="text" placeholder="Search a movie...." @keyup="onKeyUp">
            <router-link v-if="user != null" to="/profile">Profile</router-link>
        </div>
    </nav>
</template>