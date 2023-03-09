<script>
export default {
  name: 'GameCard',
  props: ['game'],
  computed: {
    image() {
      return `https://images.igdb.com/igdb/image/upload/t_cover_big/${this.game.cover.image_id}.png`
    },
    rating() {
      return Math.floor(this.game.rating)
    },
    price() {
      return new Intl.NumberFormat('en-ID', { style: 'currency', currency: 'IDR' }).format(
        this.game.price
      )
    }
  }
}
</script>

<template>
  <!-- Game Card -->
  <div class="card mx-2 my-2 bg-dark text-white game-card" style="width: 18rem" v-if="game">
    <img
      class="card-img-top"
      :src="image"
      onerror="this.src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/426517480.jpg?k=d7df6e7d794cf1d72ea8fc2fc7d9a0dd7de4f2d0d0b941c9fdd823874284ed7e&o=&hp=1'"
    />
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-dark text-white">
          <div class="row">
            <h5 class="card-title fw-bold">
              {{ game.name }}
            </h5>
          </div>
          <span class="ms-1 badge text-bg-warning">
            {{ rating }}
          </span>
        </li>
        <li class="list-group-item bg-dark text-white">
          <span
            class="ms-1 badge text-bg-light"
            v-for="(genre, index) in game.genres"
            :key="genre"
            >{{ genre.name }}</span
          >
        </li>
        <li
          class="list-group-item bg-dark text-white overflow-auto"
          style="text-align: justify; text-justify: inter-word; height: 200px"
        >
          {{ game.summary }}
        </li>
      </ul>
    </div>
  </div>
  <!-- End Of Game Card -->
</template>
