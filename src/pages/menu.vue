<template>
  <div class="main-bg">
    <div class="top">
      顶部导航栏
    </div>
    <div class="list-bg clearfix">
      <el-col :span="4" class="left-col">
        <el-menu class='left-menu' mode="vertical" router :default-active="name">
          <el-menu-item index="/Home">
            <i class="iconfont icon-xiazai44"></i>
            <span class="menu-item-text" slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/Activity">
            <i class="iconfont icon-huodongzhihang"></i>
            <span class="menu-item-text" slot="title">活动管理</span>
          </el-menu-item>
          <el-menu-item index="/Evaluation">
            <i class="iconfont icon-pingjia"></i>
            <span class="menu-item-text" slot="title">评价管理</span>
          </el-menu-item>
          <el-menu-item index="/User">
            <i class="iconfont icon-msnui-user"></i>
            <span class="menu-item-text" slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/Income">
            <i class="iconfont icon-shouru"></i>
            <span class="menu-item-text" slot="title">活动收入管理</span>
          </el-menu-item>
        </el-menu>

        <div class="fix-outer" v-if="name!=='/Home'" @click='newActivity'>
          <div class="fix-button">
            <p class="add-button"><i class="iconfont icon-tianjia"></i></p>
            <p>发布新活动</p>
          </div>
        </div>
      </el-col>
      <!--<el-col :span="20" class="right-col" :style="`min-height:${getHeight}px`">-->
      <el-col :span="20" class="right-col" style="height:100%">
        <el-scrollbar class="m-scroll" style="height:100%">
          <router-view/>
        </el-scrollbar>
      </el-col>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name:'',
      }
    },
    computed: {
      getHeight() {
        let height = window.innerHeight
        return height
        if (height < 720) {
          return height * 0.92 - 50
        } else {
          return height * 0.92 - 130
        }
      }
    },
    methods:{
      menu(){
        const re = /^\/\w+/
        let array = this.$route.path.match(re)
        if(array) {
          this.name = array[0]
        }else{
          this.name = ''
        }
      },
      newActivity(){
        this.$router.push({name:'ActivityAdd'})
      }
    },
    mounted(){
      this.menu()
    },
    watch:{
      $route:function(value){
        this.menu()
      }
    }
  }
</script>

<style scoped lang="less">
.top{
  height: 80px;
  width: 100%;
  background: #f45050;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  color: #fff;

}
  .main-bg {
    /*padding-bottom: 8vh;*/
    height: 100%;
    position: relative;
  }
  .list-bg {
    width:100%;
    // height: 100%;
    margin: 0 auto;
    background: #fff;
    position: relative;
  }

  .left-col{
    border-right: 1px solid #f2f2f2;
    height: 100%;
    // overflow-y: auto;
  }
  .left-menu{
    border: 0;
    padding:0;
    .menu-item-text{
      margin-left: 5px;
    }
  }
  .fix-outer{
    margin-top: 30px;
    padding: 10px;
    .fix-button{
      width: 120px;
      height: 60px;
      background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
      border-radius: 2px ;
      text-align: center;
      color:#fff;
      margin: 0 auto;
      padding: 8px 0;
      font-size: 14px;
      line-height: 1.6;
      cursor: pointer;
      -webkit-box-shadow: 0 6px 25px #ffbfb8;
      -moz-box-shadow: 0 6px 25px #ffbfb8;
      box-shadow: 0 6px 25px #ffbfb8;
      .add-button .iconfont{
        font-size: 12px;
      }
    }
  }

  .right-col{
    padding: 0;
    border-left: 1px solid #f2f2f2;
    margin-left:-1px;
    background-color: #F5F5F9;
    overflow: hidden;
  }
  .m-scroll{
    height: 100%;
  }




</style>
