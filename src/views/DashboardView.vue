<template>
  <div>
    <NavBar/>
    <AlertMsg/>
    <div class="container-fluid">
      <div class="row">
        <SideBar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue';
import AlertMsg from '@/components/AlertMessage.vue'

export default {
  name: 'DashboardView',
  components: {
    SideBar,
    NavBar,
    AlertMsg,
  }
};
</script>
