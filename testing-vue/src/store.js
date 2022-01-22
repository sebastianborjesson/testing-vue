import { createStore } from "vuex";
import { apiAddMovieToUserFavourites, apiFetchAllMovies, apiFetchMovieById, apiFetchUserFavouriteMovies } from "./api/movies";
import { apiUserLoginRegister } from "./api/users";


const initUser = () => {
    const storedUser = localStorage.getItem("movies-user");
    if(!storedUser) {
        return null;
    }
    return JSON.parse(storedUser);
}

export default createStore({
    state: {
        user: initUser(),
        movies: [],
        searchText: "",
        userFavourites: [],
        currentMovie: null,
    },
    getters: {
        filterMoviesBySearch: (state) => {
            return state.movies.filter((movie) => {
                return movie.title
                .toLowerCase()
                .includes(state.searchText.toLowerCase());
            })
        },
        movieById: (state) => (movieId) => {
            return state.movies.find(movie => movie.id === movieId);
        },
        hasMovies: (state) => state.movies.length > 0
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        },
        setMovies: (state, movies) => {
            state.movies = movies;
        },
        setCurrentMovie: (state, movie) => {
            state.currentMovie = movie;
        },
        setSearchText: (state, text) => {
            state.searchText = text;
        },
        setUserFavourites: (state, favourites) => {
            state.userFavourites = favourites;
        },
        addUserFavourites: (state, movie) => {
            state.userFavourites.push(movie); 
        },
        addToUserFavourites: (state, movieId) => {
            const movie = state.movies.find(movie => movie.id === movieId)
            state.userFavourites.push(movie); 
        },
        setMovieAsFavourite: (state, movieIdToFavourite) => {
            const movie = state.movies.find(movie => movie.id === movieIdToFavourite)
            if(!movie) return;
            movie.isFavourite = true;
        },
     },
    actions: {
        async loginRegister({ commit }, { userName, password, action }) {
            try {
                if(action !== "login" && action !== "register") {
                    throw new Error("loginRegister: Unknown action provided" + action);
                } 

                const [ error, user ] = await apiUserLoginRegister(
                    action, 
                    userName.value, 
                    password.value
                );
                
                if (error !== null) {
                    throw new Error(error);
                }
                
                commit("setUser", user);
                localStorage.setItem("movies-user", JSON.stringify(user));

                return null;
                
            } catch (error) {
                return error.message; 
                
            }
        },
        async fetchAllMovies({ commit, state }) {
            
            if(state.movies.length !== 0) {
                return Promise.resolve(null)
            }

            const [ error, movies ] = await apiFetchAllMovies();

            if(error !== null) {
                return error;
            }

            commit("setMovies", movies);
            return null;
        },
        async fetchUserFavourites({ commit, state }) {
            if(state.userFavourites.length !== 0) {
                return Promise.resolve(null);
            }
            
            const [ error, movies ] = await apiFetchUserFavouriteMovies(state.user.id);

            if(error !== null) {
                return error;
            }
            for (const movie of movies) {
                commit("setMovieAsFavourite", movie.id);
            }
            commit("setUserFavourites", movies);
            return null;
        },
        async addMovieToFavourites({ commit, state, getters }, movieId) {
            const [ error ] = await apiAddMovieToUserFavourites(movieId, state.user.id);
            
            if(error !== null) {
                return error;
            }

            const movie = getters.movieById(movieId);
            commit("addUserFavourites", movie);
            commit("setMovieAsFavourite", movieId);

            return null;
        },
        async fetchMovieById({ commit, state }, movieId) {
            if(state.currentMovie !== null && state.currentMovie.id === movieId) {
                return Promise.resolve(null);
            }
            
            const [ error, movie ] = await apiFetchMovieById(movieId);

            if(error !== null) {
                return error;
            }

            commit("setCurrentMovie", movie);
            Promise.resolve(null);
        },
        async logout({ state, commit }) {
            localStorage.clear();
            commit("setUser", null);
            commit("setMovies", []);
            commit("setUserFavourites", []);
            commit("setSearchText", "");
            return Promise.resolve();
        },
    }
})