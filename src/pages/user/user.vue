<template>
    <div class="outer">
      <h3 class="title">用户管理</h3>
      <div class="">
        <el-tabs type="border-card" class="max-tab"  v-model="name" @tab-click="handleClick">
          <el-tab-pane name="UserSign" label="报名用户管理"></el-tab-pane>
          <el-tab-pane name="UserPart" label="参与用户管理"></el-tab-pane>
          <div class="inner">
            <router-view/>
          </div>
        </el-tabs>
      </div>
    </div>
</template>

<script>
    export default {
      name: "",
      data(){
        return {
          name:'',
        }
      },
      methods:{
        handleClick(tab){
          this.$router.push({name:tab.name})
        }
      },
      mounted(){
        const re = /^\/\w+\/\w+/
        let array = this.$route.path.match(re)
        if(array) {
          let routeName = array[0].split('/')[2]
          this.name = routeName
        }
      }
    }
</script>

<style scoped lang="less">
  .outer{
    padding: 20px;
  }
  .title{
    color: #4a4a4a;
    font-size: 14px;
    line-height: 2;
  }
  .main{
    width: 100%;
    background-color: #fff;
    border: 1px solid #DEDEDE;
    border-radius: 2px ;
  }
  .inner{
    padding: 5px;
  }


</style>
