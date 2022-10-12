<template>
  <router-view />
</template>
<script>
export default {
  name: "App",
  created() {
    // const api = `${process.env.VUE_APP_API}/api/${process.env.CUSTOM_PATH}/products`;
    // const api = `${process.env.VUE_APP_API}/api/weiwei2022/products`;
    //   this.$http.get(api).then((response) => {
    //     console.log(response.data);
    //   });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
