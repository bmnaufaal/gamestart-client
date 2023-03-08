<script>
import GameCard from '../components/GameCard.vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useGameStore } from '../../stores/game'

export default {
  name: 'GamesPage',
  computed: {
    ...mapState(useGameStore, ['games', 'loading'])
  },
  methods: {
    ...mapActions(useGameStore, ['fetchGames'])
  },
  created() {
    this.fetchGames()
  },
  components: {
    GameCard
  }
}
</script>

<template>
  <div class="container">
    <div class="card mt-3 bg-dark text-white">
      <div class="card-body">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <h3>Home Page</h3>
            <div class="d-flex align-items-center" v-if="loading">
              <strong>Loading...</strong>
              <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
            <div class="text-center">
              <GameCard v-for="(game, index) in games" :key="game.id" :game="game" />
            </div>

            <!-- Filter Section -->
            <!-- <select class="form-select" aria-label="Default select example" v-model="selectedGenre">
              <option value="" disabled selected>Filter by genre</option>
              <option value="nofilter">No filter</option>
              <option :value="genre.id" v-for="(genre, index) in genres" :key="genre.id">
                {{ genre.name }}
              </option>
            </select> -->
            <!-- End of filter section -->
          </div>
        </div>

        <!-- <LoadingButton v-if="isLoading" /> -->

        <!-- Movie Card -->
        <!-- <div class="d-flex flex-wrap justify-content-center text-center mt-3">
          <MovieCard v-for="(movie, index) in movies" :key="movie.id" :movie="movie" />
        </div> -->
        <!-- End of movie card -->

        <!-- Pagination  -->
        <!-- <nav>
          <ul class="pagination justify-content-center mt-3">
            <li :class="page === 1 || page === 0 ? 'page-item disabled' : 'page-item'">
              <a class="page-link" href="#" @click.prevent="changePage(page - 1)">Previous</a>
            </li>
            <li
              v-for="(item, index) in maxPages"
              :key="index"
              :class="page === index + 1 ? 'page-item active' : 'page-item'"
            >
              <a class="page-link" href="#" @click.prevent="changePage(index + 1)">{{
                index + 1
              }}</a>
            </li>
            <li :class="page === maxPages || maxPages === 0 ? 'page-item disabled' : 'page-item'">
              <a class="page-link" href="#" @click.prevent="changePage(page + 1)">Next</a>
            </li>
          </ul>
        </nav> -->
        <!-- End of pagination -->
      </div>
    </div>
  </div>
</template>
