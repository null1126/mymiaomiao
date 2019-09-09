<template>
    <div class="wrapper" ref="wrapper">
     <slot></slot>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    name:'Bscroll',
    props:{
      handleToscoll:{
          type:Function,
          default:function(){}
      },
      handleToend:{
          type:Function,
          default:function(){}
      }
    },
    mounted(){
        //this.$nextTick(() =>{
        let scroll = new Bscroll(this.$refs.wrapper,{
		 		//添加tap事件 该事件只是点击才能触发 点击滑动不会触发
		 		tap:true,
		 		//配置触发下拉功能
				probeType:1
        })

        this.scroll =scroll

        scroll.on('scroll',(pos)=>{
          this.handleToscoll(pos)
        })
        scroll.on('touchEnd',(pos)=>{
          this.handleToend(pos)
        })
    //})
    },
    methods:{
      //点击字母跳到指定城市
      toScrollTop(y){
        this.scroll.scrollTo(0,y)
      }
    }
}
</script>

<style scoped>
.wrapper{height: 100%;}
</style>