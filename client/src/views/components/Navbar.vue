<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useLoginStore } from '../../stores/login'

export default {
  name: 'Navbar',
  computed: {
    ...mapWritableState(useLoginStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useLoginStore, ['handleLogout'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLoggedIn = true
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><BootstrapIcon icon="joystick" /> MyGames App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Wishlist</a>
          </li>
        </ul>
      </div>
      <router-link :to="{ name: 'login' }" class="btn btn-light" v-if="!isLoggedIn"
        >Login</router-link
      >
      <!-- <router-link
        :to="{ name: 'login' }"
        class="btn btn-light"
        v-if="isLoggedIn"
        @click.prevent="handleLogout"
        >Logout</router-link
      > -->
      <!-- User -->
      <ul class="navbar-nav ml-auto" v-if="isLoggedIn">
        <li class="nav-item">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Username
          </a>

          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <a class="dropdown-item dropdown" href="#"> Profile </a>
            <a class="dropdown-item" href="#" @click.prevent="handleLogout"> Logout </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
