<template>
  <div class="city_body">
    <div class="city_list">
      <!-- 数据未请求完成时显示的组件 -->
      <Loading v-if="isLoading"></Loading>
      <!-- 数据请求完成后显示的组件 -->
      <Bscroll v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="hots in hotCity" :key="hots.id" @tap="handleTocity(hots.nm,hots.id)">{{hots.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_solt">
            <div v-for="cityLists in cityList" :key="cityLists.index">
              <h2>{{cityLists.index}}</h2>
              <ul>
                <li v-for="lists in cityLists.list" :key="lists.id"  @tap="handleTocity(lists.nm,lists.id)">{{lists.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Bscroll>
    </div>
    <div class="city_index">
      <ul>
        <li
          @touchstart="toIndex(index)"
          v-for="(cityLists,index) in cityList"
          :key="cityLists.index"
        >{{cityLists.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      //保存接收热门城市 渲染到页面
      hotCity: null,
      //保存分类后的城市 渲染到页面
      cityList: null,
      isLoading: true
    };
  },
  mounted() {
    //拿到本地存储的数据
    let hotCity = window.localStorage.getItem("hotcisty");
    let cityList = window.localStorage.getItem("cityList");
    if (hotCity && cityList) {
      this.hotCity = JSON.parse(hotCity);
      this.cityList = JSON.parse(cityList);
      this.isLoading = !this.isLoadin;
    } else {
      this.axios.get("/api/cityList").then(res => {
        let msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = !this.isLoading;
          let citles = res.data.data.cities;
          //把所有城市改造成这样类型 [{index:'A' ,list:[{nm : '阿坝州' ,id:1}]}]
          //接收返回回来的数据
          let { hotCity, cityList } = this.cityClass(citles);
          //将热门城市的数据赋给定义的变量hotCity
          this.hotCity = hotCity;
          //将分类好的城市数据赋给定义的变量cityList
          this.cityList = cityList;

          //将请求的数据缓存到本地
          window.localStorage.setItem("hotCity", JSON.stringify(hotCity));
          window.localStorage.setItem("cityList", JSON.stringify(cityList)); 
        }
      });
    }
  },
  methods: {
    //整理热门城市 和 对城市进行相同首字母分类并排序 的方法
    cityClass(citles) {
      //保存分类排序后的城市
      let cityList = [];
      //保存热门城市
      let hotCity = [];
      /**
       * 整理排序城市
       * //把城市分类成这样类型 [{index:'A' ,list:[{nm : '阿坝州' ,id:1}]}]
       */
      for (let i = 0; i < citles.length; i++) {
        //拿到所有城市的首字母
        let cityIndex = citles[i].py.substring(0, 1).toUpperCase();
        //console.log(cityIndex)
        //判断是否存在当前索引  存在 ：添加城市  不存在：添加索引

        //添加index
        if (pdIndex(cityIndex)) {
          cityList.push({
            index: cityIndex,
            list: [{ nm: citles[i].nm, id: citles[i].id }]
          });
          //累加到index中
        } else {
          //当索引存在 找到相同索引再将list累加到这个索引上
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === cityIndex) {
              cityList[j].list.push({ nm: citles[i].nm, id: citles[i].id });
            }
          }
        }
      }
      /**
       * 整理热门城市
       * 整理成[{isHot:1,nm:"北京",id:1}]
       */
      for (let k = 0; k < citles.length; k++) {
        let hotIndex = citles[k].isHot;
        if (hotIndex === 1) {
          hotCity.push({ isHot: hotIndex, nm: citles[k].nm, id: citles[k].id });
        }
      }

      //对城市分类进行排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      //判断是否存在当前索引 存在返回false 不存在返回true
      function pdIndex(cityIndex) {
        for (let j = 0; j < cityList.length; j++) {
          if (cityList[j].index === cityIndex) {
            return false;
          }
        }
        return true;
      }
      //将结果返回出去
      return {
        hotCity,
        cityList
      };
    },
    //点击当前字母跳转到对应城市 的方法
    toIndex(index) {
      let h2 = this.$refs.city_solt.getElementsByTagName("h2");
      //this.$refs.city_solt.parentNode.scrollTop = h2[index].offsetTop
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
	},
	handleTocity(nm , id){
    this.$store.dispatch('HandleTocity',{nm:nm,id:id})
    window.localStorage.setItem('nmkey',nm)
    window.localStorage.setItem('idkey',id)
    this.$router.push({path:'/movie/wholecity'})
  }
  },
};
</script>

<style>
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}

#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
/* .city_body .city_hot ul{} */
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
/* .city_body .city_sort{} */
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
