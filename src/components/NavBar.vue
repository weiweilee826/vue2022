<template>
  <div>
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <router-link to="/">登出</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>
