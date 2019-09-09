<template>
    <div class="messagebox">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <div>
        <div v-if=" cancel " @touchstart = 'landleCancel'>{{ cancel }}</div>
        <div v-if=" ok " @touchstart = 'landleOk'>{{ ok }}</div>
      </div>
    </div>
</template>
<script>
export default {
    name:'MessageBox'
}
</script>
<style scoped>
  .messagebox{width: 200px;height: 120px;border-radius: 5px;position: absolute;left: 50%;top:50%;margin: -60px 0 0 -100px; background:white;box-shadow: 3px 3px 3px 3px #ccc;}
  .messagebox h2{text-align: center;line-height: 40px;font-size: 18px}
  .messagebox p{font-size: 20px; line-height: 30px;text-align: center}
  .messagebox>div{width: 100%;display:flex;position: absolute ;border-top:1px #ccc solid ;bottom: 0; line-height: 30px ;}
  .messagebox>div div{flex:1;border-right: 1px solid;text-align: center;line-height: 30px}
  .messagebox>div div:last-child{border: none}
</style>
