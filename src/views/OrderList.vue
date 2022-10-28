<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應負金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td></td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagination
      :pagination="pagination"
      @getProducts="getOrders"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/MultiplePages.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination:{},
    };
  },
  methods: {
    getOrders() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/orders`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log("ooo", response);
        vm.orders = response.data.orders;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
