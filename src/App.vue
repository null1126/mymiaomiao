<template>
     <!-- 将数据缓存，以免重复加载 -->
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style scoped>

</style>
