<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useDetailStore } from '../../stores/detail'

export default {
  name: 'DetailPage',
  computed: {
    ...mapState(useDetailStore, ['game']),
    image() {
      return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${this.game[0].cover.image_id}.png`
    },
    video() {
      return `https://www.youtube.com/embed/${this.game[0].videos[0].video_id}?autoplay=1`
    },
    rating() {
      if (this.game.rating) {
        return Math.floor(this.game.rating)
      } else {
        return '-'
      }
    },
    screenshots() {
      let output = []
      for (let i = 0; i < this.screenshots.length; i++) {
        output.push(
          `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${this.game[0].screenshots[i].image_id}.png`
        )
      }
      return output
    }
  },
  methods: {
    ...mapActions(useDetailStore, ['fetchDetailData', 'buyGame', 'handleAddToWishlist'])
  },
  created() {
    this.fetchDetailData(this.$route.params.id)
  }
}
</script>

<template>
  <div class="container">
    <div class="card mt-3 bg-black text-white">
      <div class="card-body">
        <div class="card bg-black text-white">
          <div class="card-body text-center">
            <h3 class="fw-bold">
              {{ game[0].name
              }}<span class="ms-3 badge text-bg-warning">
                {{ rating }}
              </span>
            </h3>

            <!-- <img class="img-fluid img-thumbnail" :src="image" alt="" /> -->
            <div class="ratio ratio-16x9">
              <iframe allow="autoplay" :src="video" title="YouTube video" allowfullscreen></iframe>
            </div>
            <h4 class="fw-bold">Summary</h4>
            <p>{{ game[0].summary }}</p>

            <h4 class="fw-bold">Genre</h4>
            <div class="mb-3">
              <span
                class="ms-1 badge text-bg-light"
                v-for="(genre, index) in game[0].genres"
                :key="genre"
                >{{ genre.name }}</span
              >
            </div>

            <h4 class="fw-bold">Platform</h4>
            <div class="mb-3">
              <span
                class="ms-1 badge text-bg-light"
                v-for="(platform, index) in game[0].platforms"
                :key="platform"
                >{{ platform.name }}</span
              >
            </div>

            <button class="btn btn-light fw-bold" @click.prevent="buyGame(game[0].id)">Buy</button>
            <button
              class="btn btn-light fw-bold ms-2"
              @click.prevent="handleAddToWishlist(game[0].id)"
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
