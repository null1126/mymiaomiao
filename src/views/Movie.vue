<template>
  <div id="main">
    <Header title="宗伟小电影"></Header>
    <div id="content">
      <div class="movie_menu">
        <router-link to="/movie/city" tag="div" class="city_name">
          <span>{{ this.$store.state.nm }}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link to="/movie/nowplaying" tag="div" class="hot_item">正在热映</router-link>
          <router-link to="/movie/coming" tag="div" class="hot_item">即将上映</router-link>
        </div>
        <router-link to="/movie/search" tag="div" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <!-- 将数据缓存，以免重复加载 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Tabbar></Tabbar>
    <router-view name='detail'></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import { messageBox } from "@/components/JS";
export default {
  name: "Movie",
  components: {
    Header,
    Tabbar
  },
  mounted() {
    setTimeout(() =>{
      this.axios.get("/api/getLocation").then(res => {
      let msg = res.data.msg;
      if (msg === "ok") {
        if (this.$store.state.id == res.data.data.id) {
          return
        }
        messageBox({
          title: "自动定位",
          content: res.data.data.nm,
          cancel: "取消",
          ok: "切换",
          landleOk() {
            console.log(2);
            window.localStorage.setItem('nmkey',res.data.data.nm)
            window.localStorage.setItem('idkey',res.data.data.id)
            window.location.reload()
          }
        });
      }
    });
    },2000)
  }
};
</script>

<style scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>
