<script>
import GameCard from '../components/GameCard.vue'
import Loading from '../components/Loading.vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useGameStore } from '../../stores/game'

export default {
  name: 'GamesPage',
  data() {
    return {
      page: 1,
      size: 10,
      search: ''
    }
  },
  computed: {
    ...mapState(useGameStore, ['games', 'loading'])
  },
  watch: {
    page() {
      this.fetchGames(this.page, this.size, this.search)
    }
  },
  methods: {
    ...mapActions(useGameStore, ['fetchGames']),
    openDetailPage(id) {
      this.$router.push(`/game/${id}`)
    },
    changePage(page) {
      this.page = page
    },
    searchGames() {
      this.page = 1
      this.size = 10
      this.fetchGames(this.page, this.size, this.search)
    }
  },
  created() {
    this.fetchGames(this.page, this.size, this.search)
  },
  components: {
    GameCard,
    Loading
  }
}
</script>

<template>
  <div class="container">
    <div class="card mt-3 bg-black text-white">
      <div class="card-body">
        <div class="card bg-black text-white">
          <div class="card-body">
            <h3 class="fw-bold">Popular Games</h3>
            <form class="d-flex" @submit.prevent="searchGames">
              <input
                class="form-control me-2 bg-dark text-white"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="search"
              />
              <button class="btn btn-light" type="submit">Search</button>
            </form>
          </div>
        </div>

        <Loading v-if="loading" />
        <div class="d-flex flex-wrap justify-content-center text-center mt-3">
          <GameCard
            v-for="(game, index) in games"
            :key="game.id"
            :game="game"
            @click.prevent="openDetailPage(game.id)"
          />
        </div>
        <!-- Pagination  -->
        <nav>
          <ul class="pagination justify-content-center mt-3">
            <li :class="page === 1 || page === 0 ? 'page-item disabled' : 'page-item'">
              <a class="page-link" href="#" @click.prevent="changePage(page - 1)">Previous</a>
            </li>
            <li :class="games.length <= 1 ? 'page-item disabled' : 'page-item'">
              <a class="page-link" href="#" @click.prevent="changePage(page + 1)">Next</a>
            </li>
          </ul>
        </nav>
        <!-- End of pagination -->
      </div>
    </div>
  </div>
</template>
