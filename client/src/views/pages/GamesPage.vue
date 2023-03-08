<script>
import GameCard from '../components/GameCard.vue'
import Loading from '../components/Loading.vue'
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
            <h3 class="fw-bold">Home Page</h3>
          </div>
        </div>

        <Loading v-if="loading" />
        <div class="d-flex flex-wrap justify-content-center text-center mt-3">
          <GameCard v-for="(game, index) in games" :key="game.id" :game="game" />
        </div>
      </div>
    </div>
  </div>
</template>
