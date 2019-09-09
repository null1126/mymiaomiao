<template>
  <div id="main">
     <Header title="我的喵喵"></Header>
     <div id="content">
     <router-view />         
  </div>
   <Tabbar></Tabbar>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'
import Login  from '@/components/Login'

export default {
  name: 'Mine',
  components: {
    Header,
    Tabbar,
    Login
  }
}

</script>

<style scoped>

#content .login_body{  width:100%;}

</style>
