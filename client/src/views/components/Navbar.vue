<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useLoginStore } from '../../stores/login'
import { useUserStore } from '../../stores/user'

export default {
  name: 'Navbar',
  computed: {
    ...mapWritableState(useLoginStore, ['isLoggedIn']),
    ...mapWritableState(useUserStore, ['userData'])
  },
  methods: {
    ...mapActions(useLoginStore, ['handleLogout']),
    ...mapActions(useUserStore, ['fetchUserData'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLoggedIn = true
      this.fetchUserData()
    }
  },
  beforeUpdate() {
    if (localStorage.access_token) {
      this.fetchUserData()
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand fw-bold" href="#"
        ><BootstrapIcon icon="joystick" /> Game<span class="ms-1 badge text-bg-light"
          >Start</span
        ></router-link
      >
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
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" href="#">Wishlist</a>
          </li>
        </ul>
      </div>
      <router-link :to="{ name: 'login' }" class="btn btn-light" v-if="!isLoggedIn"
        >Login</router-link
      >
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
            {{ userData.name }}
          </a>

          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <router-link :to="{ name: 'profile' }" class="dropdown-item dropdown"
              >Profile</router-link
            >
            <a class="dropdown-item" href="#" @click.prevent="handleLogout"> Logout </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
