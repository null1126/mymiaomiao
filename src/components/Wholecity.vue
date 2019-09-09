<template>
  <div class="cinema_body">
    <!-- 数据未请求完成时显示的组件 -->
    <Loading v-if="isLoading"></Loading>
    <!-- 数据请求完成后显示的组件 -->
    <Bscroll v-else>
      <ul>
        <li v-for="item in cinemasLists" :key="item.id">
          <div>
            <span>{{ item.nm}}</span>
            <span class="q">
              <span class="price">{{ item.sellPrice }}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{ item.addr}}</span>
            <span>{{ item.distance}}</span>
          </div>
          <div class="card">
            <div
              :class="key| filterClass"
              v-for="(itemcard,key) in item.tag"
              v-if="itemcard === 1"
              :key="key"
            >{{ key | filterkey }}</div>
          </div>
        </li>
      </ul>
    </Bscroll>
  </div>
</template>

<script>
export default {
  name: "Wholecity",
  data() {
    return {
      cinemasLists: null,
      isLoading: true,
      ifcity:-1
    };
  },
  activated() {   
    let ctid = this.$store.state.id
    if (this.ifcity === ctid) {
      return //id相等时 就不执行下面的ajax
    } 
    this.isLoading = true
    this.axios.get(`/api/cinemaList?cityId=${ctid}`).then(res => {
      let msg = res.data.msg;
      if (msg === "ok") {
        this.cinemasLists = res.data.data.cinemas;
        this.isLoading = false;
        this.ifcity = ctid
      }
    });
  },
  filters: {
    //将相应的单词转化为文字
    filterkey(key) {
      let card = [
        { key: "allowRefund", value: "退款" },
        { key: "endorse", value: "改签" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ];
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return " ";
    },
    //过滤两个类样式
    filterClass(key) {
      let card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" }
      ];
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return " ";
    }
  }
};
</script>

<style scoped>
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
