<script>
export default {
  name: 'RegisterPage'
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div class="card-body p-4 p-sm-5 bg-dark text-white">
            <h5 class="card-title text-center mb-5 fw-light fs-5 fw-bold text-uppercase">
              Register
            </h5>
            <form>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control bg-dark text-white"
                  id="floatingInputUsername"
                  placeholder="Email"
                  required
                  autofocus
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
                />
                <label for="floatingInputEmail">Password</label>
              </div>

              <div class="d-grid mb-2">
                <button class="btn btn-lg btn-light btn-login fw-bold text-uppercase" type="submit">
                  Register
                </button>
              </div>

              <hr class="my-4" />
              <p class="text-center">Already have an account?</p>
              <div class="d-grid mb-2">
                <router-link
                  :to="{ name: 'login' }"
                  class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                  >Back to login
                </router-link>
              </div>
            </form>
          </div>
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
