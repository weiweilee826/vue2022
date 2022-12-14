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
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.create_at }}</td>
          <td>{{ order.email }}</td>
          <td v-html="order.product"></td>
          <td>{{ order.total }}</td>
          <td v-if="order.is_paid">已付款</td>
          <td v-else>未付款</td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagination :pagination="pagination" @getProducts="getOrders"></Pagination>
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
      products: "",
      isLoading: false,
      orders: [],
      pagination: {},
    };
  },
  methods: {
    getOrders() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/orders`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        for (let order of response.data.orders) {
          let myorder = {};
          myorder.id = order.id;
          myorder.create_at = order.create_at;
          myorder.email = order.user.email;
          myorder.is_paid = order.is_paid;
          myorder.total = order.total;

          let str = "";
          for (let product of Object.values(order.products)) {
            str += product.product.title + " 數量: " + product.qty + "<br>";
          }
          myorder.product = str;
          this.orders.push(myorder);
        }
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
