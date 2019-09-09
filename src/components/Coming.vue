<template>
  <div class="movie_body">
    <!-- 数据未请求完成时显示的组件 -->
    <Loading v-if="isLoading"></Loading>
    <!-- 数据请求完成后显示的组件 -->
    <Bscroll v-else>
      <ul>
        <li v-for="item in comings" :key="item.id">
          <div @tap="todetails(item.id)" class="pic_show">
            <img :src="item.img |setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2 @tap="todetails(item.id)">{{ item.nm }}</h2>
            <p>
              <span class="person">{{ item.wish }}</span> 人想看
            </p>
            <p>{{ item.star }}</p>
            <p>{{ item.rt }}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </Bscroll>
  </div>
</template>

<script>
export default {
  name: "Coming",
  props:['moiveId'],
  data() {
    return {
      comings: [],
      isLoading: true
    };
  },
  methods:{
    todetails(moiveId){
       this.$router.push({path:'/movie/detail/'+moiveId})
    }
  },
  activated() {
    let ctid = this.$store.state.id;
    if (this.ifcity === ctid) {
      return; //id相等时 就不执行下面的ajax
    }
    this.isLoading = true;
    this.axios.get("/api/movieComingList?cityId=" + ctid).then(res => {
      let msg = res.data.msg;
      if (msg === "ok") {
        this.comings = res.data.data.comingList;
        this.isLoading = !this.isLoading;
      }
    });
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
