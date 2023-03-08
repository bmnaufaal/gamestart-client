<script>
import GameCard from '../components/GameCard.vue'
import Loading from '../components/Loading.vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useMyGameStore } from '../../stores/mygame'

export default {
  name: 'MyGamePage',
  computed: {
    ...mapState(useMyGameStore, ['mygames', 'loading'])
  },
  methods: {
    ...mapActions(useMyGameStore, ['fetchMyGames']),
    openDetailPage(id) {
      this.$router.push(`/game/${id}`)
    }
  },
  created() {
    this.fetchMyGames()
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
            <h3 class="fw-bold">My Games</h3>
          </div>
        </div>

        <Loading v-if="loading" />
        <div class="d-flex flex-wrap justify-content-center text-center mt-3">
          <GameCard
            v-for="(game, index) in mygames"
            :key="game.id"
            :game="game"
            @click.prevent="openDetailPage(game.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
