<template>
    <div class="outer">
      <h3 class="title">添加/编辑活动</h3>
      <div class="inner">
        <div class="progress clearfix">
          <ul class="pro-tab clearfix">
            <li class="tab-list arrow" :class='isActive==1?"active":""'>
              <p @click='clickTab(1)'>1、活动详情</p><i class="blank arrow"></i>
            </li>
            <li class="tab-list arrow" :class='isActive==2?"active":""'>
              <p @click='clickTab(2)'>2、活动属性</p><i class="blank arrow"></i>
            </li>
            <li class="tab-list arrow" :class='isActive==3?"active":""'>
              <p @click='clickTab(3)'>3、报名须知</p><i class="blank arrow"></i>
            </li>
            <li class="tab-list arrow" :class='isActive==4?"active":""'>
              <p @click='clickTab(4)'>4、票种设置</p><i class="blank arrow"></i>
            </li>
          </ul>
        </div>
        <div class="view">
          <router-view/>
        </div>
        
      </div>
    </div>
</template>

<script>
    export default {
      name: "",
      data(){
        return {
          isActive:1,
        }
      },
      methods:{
        clickTab(n){
          this.isActive = n
          this.$router.push({name:`ActivityPro${n}`})
        },
        checkTab(){
          const re = /^\/\w+\/\w+\/\w+/
          let array = this.$route.path.match(re)
          if(array) {
            let routeName = array[0].split('/')[3]
            let routeIndex = routeName.match(/\d/)[0]
            this.isActive = routeIndex
          }
        }
      },
      mounted(){
        this.checkTab()
      },
      watch:{
        $route (val){
          this.checkTab()
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
  .inner{
    border: 1px solid #dedede;
    background-color: #fff;
    border-radius: 2px;
  }
  .view{
    // height: 650px;
    // overflow: auto;
    padding: 20px;
  }


  .progress{
    padding: 30px;
    text-align: center;
  }
  .pro-tab{
    border-radius: 4px;
    display: inline-block;
    margin-left: -20px;
    .tab-list{
      width: 190px;
      height: 60px;
      font-size:18px;
      line-height: 60px;
      text-align: center;
      color: #666;
      background-color: #F2F3F7;
      float:left;
      position: relative;
      &>p{
        cursor: pointer;
        position: relative;
        z-index: 99;
      }
      &.active{
        background-color: #f45050;
        color: #fff;
      }
      &:not(:first-child){
        margin-left: 10px;
        padding-left: 30px;
      }
      .blank{
        width: 10px;
        height: 100%;
        background-color: #fff;
        position: absolute;
        top: 0;
        right: -10px;
        z-index: 9;
      }
    }
  }

  .arrow{
    position: relative;
    &:after{
      content:'';
      display: block;
      position: absolute;
      top: 0;
      right: -70px;
      width: 0;
      height: 0;
      border: 30px solid rgba(0,0,0,0);
      border-left:40px solid #fff;
      z-index: 19;
    }
    &.tab-list:after{
      border-left-color: #F2F3F7;
    }
    &.tab-list.active:after{
      border-left-color: #f45050;
    }
  }


</style>
