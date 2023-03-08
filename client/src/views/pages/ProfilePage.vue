<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '../../stores/user'

export default {
  name: 'ProfilePage',
  computed: {
    ...mapState(useUserStore, ['userData'])
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUserData'])
  },
  created() {
    this.fetchUserData()
  }
}
</script>

<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card border-light">
          <div
            class="rounded-top text-white d-flex flex-row"
            style="background-color: #000; height: 200px"
          >
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
              <img
                :src="userData.profilePicture"
                alt="userData.name"
                class="img-fluid img-thumbnail mt-5 mb-2"
                style="width: 150px; z-index: 1;"
              />
            </div>

            <div class="ms-3" style="margin-top: 130px">
              <h5 class="fw-bold">{{ userData.name }}</h5>
              <p>{{ userData.role }}</p>
            </div>
          </div>

          <div class="card-body p-4 text-black">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style="background-color: #f8f9fa">
                <p class="font-italic mb-1">Web Developer</p>
                <p class="font-italic mb-1">Lives in New York</p>
                <p class="font-italic mb-0">Photographer</p>
              </div>
              <button class="btn btn-outline-dark mt-3" data-mdb-ripple-color="dark">
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
