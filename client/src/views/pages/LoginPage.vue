<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useLoginStore } from '../../stores/login'

export default {
  name: 'LoginPage',
  computed: {
    ...mapState(useLoginStore, ['inputLogin'])
  },
  methods: {
    ...mapActions(useLoginStore, ['handleLogin'])
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div class="card-img-left d-none d-md-flex"></div>
          <div class="card-body p-4 p-sm-5 bg-dark text-white">
            <h5 class="card-title text-center mb-5 fw-light fs-5 fw-bold text-uppercase">Login</h5>
            <form @submit.prevent="handleLogin">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control bg-dark text-white"
                  id="floatingInputUsername"
                  placeholder="Email"
                  required
                  autofocus
                  v-model="inputLogin.email"
                />
                <label for="floatingInputUsername">Email</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control bg-dark text-white"
                  id="floatingInputEmail"
                  placeholder="Password"
                  required
                  v-model="inputLogin.password"
                />
                <label for="floatingInputEmail">Password</label>
              </div>

              <div class="d-grid mb-2">
                <button class="btn btn-lg btn-light btn-login fw-bold text-uppercase" type="submit">
                  Login
                </button>
              </div>

              <hr class="my-4" />
              <div class="text-center mb-3">
                <GoogleLogin :callback="callback" />
              </div>

              <p class="text-center">Dont have an account?</p>
              <div class="d-grid mb-2">
                <router-link
                  :to="{ name: 'register' }"
                  class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                  >Register</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
