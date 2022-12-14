<template>
  <div>
    <loading v-model:active="isLoading" />
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.timestampToDate(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="tempCoupon.due_date"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              更新優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: "",
      },
      due_date: new Date(),
      isNew: false,
      isLoading: false,
      myModal: {},
    };
  },
  watch: {
    // due_date() {
    //   this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    // },
  },
  methods: {
    openCouponModal(isNew, item) {
      this.myModal.show();
      this.isNew = isNew;
      if (isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = Object.assign({}, item);
        // const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        //   .toISOString()
        //   .split("T");
        // console.log(dateAndTime);
        // this.due_date = dateAndTime[0];
        this.due_date = new Date(item.due_date * 1000).toLocaleDateString('en-CA');
      }
    },
    getCoupons() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons`;
      this.$http.get(url, vm.tempProduct).then((response) => {
        vm.coupons = response.data.coupons;
        console.log('123',response);
      });
    },
    updateCoupon() {
      const vm = this;
      if (vm.isNew) {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
        this.$http.post(url, { data: vm.tempCoupon }).then((response) => {
          console.log(response, vm.tempCoupon);
          this.myModal.hide();
          this.getCoupons();
        });
      } else {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
        this.$http.put(url, { data: vm.tempCoupon }).then((response) => {
          console.log(response);
          this.myModal.hide();
          this.getCoupons();
        });
      }
    },
    closeModal() {
      this.myModal.hide();
    },
  },
  mounted() {
    this.myModal = new Modal("#couponModal", {});
  },
  created() {
    this.getCoupons();
  },
};
</script>
