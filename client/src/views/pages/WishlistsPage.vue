<script>
import GameCard from '../components/GameCard.vue'
import Loading from '../components/Loading.vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useWishlistStore } from '../../stores/wishlist'

export default {
  name: 'WishlistsPage',
  computed: {
    ...mapState(useWishlistStore, ['wishlists', 'loading'])
  },
  methods: {
    ...mapActions(useWishlistStore, ['fetchWishlists']),
    openDetailPage(id) {
      this.$router.push(`/game/${id}`)
    }
  },
  created() {
    this.fetchWishlists()
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
            <h3 class="fw-bold">My Wishlists</h3>
          </div>
        </div>

        <Loading v-if="loading" />
        <div class="d-flex flex-wrap justify-content-center text-center mt-3" v-if="wishlists">
          <GameCard
            v-for="(game, index) in wishlists"
            :key="game.id"
            :game="game"
            @click.prevent="openDetailPage(game.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
