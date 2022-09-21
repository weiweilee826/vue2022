<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
// import { inject } from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // setup() {
  //   const axios = inject("axios");
  //   console.log("111", axios);
  // },
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

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
