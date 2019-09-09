<template>
  <div class="movie_body" ref="movie_body">
    <!-- 数据未请求完成时显示的组件 -->
    <Loading v-if="isLoading"></Loading>
    <!-- 数据请求完成后显示的组件 -->
    <Bscroll v-else :handleToscoll="handleToscoll" :handleToend="handleToend">
      <ul>
        <li class="mesg">{{ mesg }}</li>
        <li v-for="item in nowplay" :key="item.id">
          <div class="pic_show" @tap="todetails(item.id)">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2 @tap="todetails(item.id)">{{ item.nm }}</h2>
            <p>
              观众评
              <span class="grade">{{ item.sc }}</span>
            </p>
            <p>{{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Bscroll>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "Nowplaying",
  data() {
    return {
      nowplay: null,
      mesg: "",
	  isLoading: true,
	  ifcity:-1
    };
  },
  methods: {
    todetails(moiveId) {
      this.$router.push({path:'/movie/detail/'+moiveId})
    },
    handleToscoll(pos) {
      if (pos.y > 30) {
        this.mesg = "正在更新";
      }
    },
    handleToend(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieOnInfoList?cityId=1").then(res => {
          this.nowplay = res.data.data.movieList;
          this.mesg = "更新成功";
          setTimeout(() => {
            this.mesg = "";
          }, 1000);
        });
      }
    }
  },
  activated() {
	let ctid = this.$store.state.id
    if (this.ifcity === ctid) {
      return //id相等时 就不执行下面的ajax
    } 
    this.isLoading = true
    this.axios.get("/api/movieOnInfoList?cityId="+ctid).then(res => {
      this.nowplay = res.data.data.movieList;
      this.isLoading = !this.isLoading;
      //需要等页面数据渲染完过后再执行 Bscroll()
      // this.$nextTick(() =>{
      // let scroll = new Bscroll(this.$refs.movie_body,{
      // 		//添加tap事件 该事件只是点击才能触发 点击滑动不会触发
      // 		tap:true,
      // 		//配置触发下拉功能
      // 		probeType:1
      // 	})
      // 	scroll.on('scroll',(pos)=> {
      // 		//下拉刷新功能
      // 		if(pos.y > 30){
      //            this.mesg = "正在更新"
      // 		}
      // 	})
      // 	scroll.on('touchEnd',()=> {
      // 		//滑动或点击松开的时候触发的
      // 		this.axios.get('/api/movieOnInfoList?cityId=1')
      //     .then((res) =>{
      // 	  this.nowplay = res.data.data.movieList
      // 	  this.mesg = "更新成功"
      // 	  setTimeout(()=>{
      //            this.mesg = ""
      // 	  },1000)

      //      })
      // 	})
      //})
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
.movie_body .mesg {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
