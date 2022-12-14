<template>
  <div>
    <loading v-model:active="isLoading" />
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車 table -->
    <div style="width: 40rem" class="mx-auto">
      <table class="table mt-4">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteCart(item.id)"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.product.price }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td>{{ $filters.currencyUSD(countTotal) }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end">折扣價</td>
            <td>{{ $filters.currencyUSD(discount) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入優惠碼"
          aria-describedby="button-addon2"
          v-model="couponCode.data.code"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="useCoupon"
        >
          套用優惠券
        </button>
      </div>

      <form class="text-start">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="InputEmail1"
            aria-describedby="emailHelp"
            placeholder="請輸入email"
            v-model="customrInfo.data.user.email"
          />
        </div>
        <div class="mb-3">
          <label for="inputName" class="form-label">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="請輸入姓名"
            v-model="customrInfo.data.user.name"
          />
        </div>
        <div class="mb-3">
          <label for="inputMobile" class="form-label">收件人電話</label>
          <input
            type="text"
            class="form-control"
            id="inputMobile"
            placeholder="請輸入電話"
            v-model="customrInfo.data.user.tel"
          />
        </div>

        <div class="mb-3">
          <label for="inputAddress" class="form-label">收件人地址</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="請輸入地址"
            v-model="customrInfo.data.user.address"
          />
        </div>

        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            v-model="customrInfo.data.message"
          >
          </textarea>
          <label for="floatingTextarea">留言</label>
        </div>
      </form>
      <button type="button" class="btn btn-danger text-end" @click="sendOrder">
        送出訂單
      </button>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      products: [],
      product: {},
      myModal: {},
      status: {
        loadingItem: "",
      },
      isLoading: false,
      carts: [],
      discount: 0,
      customrInfo: {
        data: {
          user: {
            name: "test",
            email: "test@gmail.com",
            tel: "0912346768",
            address: "kaohsiung",
          },
          message: "123",
        },
      },
      couponCode: {
        data: {
          code: "",
        },
      },
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        vm.myModal.show();
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {
        console.log("a", response);
        vm.status.loadingItem = "";
        vm.getCart();
        this.myModal.hide();
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.carts = response.data.data.carts;
        vm.isLoading = false;
      });
    },
    deleteCart(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then(() => {
        this.getCart();
        this.isLoading = false;
      });
    },
    sendOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      this.$http.post(url, this.customrInfo).then((response) => {
        console.log("b", response);
        this.myModal.hide();
      });
    },
    useCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      this.$http.post(url, this.couponCode).then((response) => {
        console.log("123", response);
        this.discount = response.data.data.final_total;
        this.myModal.hide();
      });
    },
  },
  computed: {
    countTotal() {
      return this.carts.reduce(function (sum, c) {
        return sum + c.qty * c.product.price;
      }, 0);
    },
  },
  mounted() {
    this.myModal = new Modal("#productModal", {});
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
