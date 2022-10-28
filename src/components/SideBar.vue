<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/admin/products">
            <span data-feather="file-text"></span>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/order_list">
            <span data-feather="file-text"></span>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon">
            <span data-feather="file-text"></span>
            優惠券
          </router-link>
        </li>
      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>模擬功能</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/customer_order">
            <span data-feather="file-text"></span>
            模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
};
</script>
