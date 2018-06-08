<template>
    <div>
      <div class="add-block" @click='newActivity'>
        <p class="add-button-icon"><i class="iconfont icon-tianjia"></i></p>
        <p class="add-button-text">发布新活动</p>
      </div>
      <ul class="view-list">
        <li class="view-item">
          <b class="view-icon"><i class="iconfont icon-huodongzhihang"></i></b>
          <ul class="view-container">
            <li class="view-col">
              <p><span class="view-num">166</span>个</p>
              <h4>全部活动</h4>
            </li>
            <li class="view-col">
              <p><span class="view-num">66</span>个</p>
              <h4>在线活动</h4>
            </li>
          </ul>
        </li>
        <li class="view-item">
          <b class="view-icon"><i class="iconfont icon-wodedingdan"></i></b>
          <ul class="view-container">
            <li class="view-col">
              <p><span class="view-num">166</span>个</p>
              <h4>全部活动</h4>
            </li>
            <li class="view-col">
              <p><span class="view-num">66</span>个</p>
              <h4>在线活动</h4>
            </li>
          </ul>
        </li>
        <li class="view-item">
          <b class="view-icon"><i class="iconfont icon-shouru"></i></b>
          <ul class="view-container">
            <li class="view-col">
              <p><span class="view-num">166</span>个</p>
              <h4>全部活动</h4>
            </li>
            <li class="view-col">
              <p><span class="view-num">66</span>个</p>
              <h4>在线活动</h4>
            </li>
          </ul>
        </li>
      </ul>
      <div class="input-group">
        <el-input class="code-input small-input" placeholder="请输入订单验证码" v-model="input"></el-input>
        <el-button class="code-button" type="primary">验证</el-button>
      </div>
    </div>
</template>

<script>
    import {GetActivityOrderInfo} from '@/ajax/ajax'
    export default {
      name: "",
      data(){
        return {
          input:''
        }
      },
      methods:{
        newActivity(){
          this.$router.push({name:'ActivityAdd'})
        }
      },
      mounted(){
        GetActivityOrderInfo().then((res)=>{
          // console.log(res)
        }).catch((err)=>{
          // console.log(err)
        })
      }
    }
</script>

<style scoped lang="less">
  .add-block{
    margin: 10vh auto 16vh;
    background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
    -webkit-box-shadow: 0 10px 65px #ffbfb8;
    -moz-box-shadow: 0 10px 65px #ffbfb8;
    box-shadow: 0 10px 65px #ffbfb8;
    width: 280px;
    height: 140px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    .add-button-icon .iconfont,.add-button-text{
      color: #fff;
      font-size: 26px;
      line-height: 1.8;
    }
  }
  .view-list{
    width: 100%;
    padding: 0 18px;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
  }
  .view-item{
    width: 300px;
    height: 120px;
    background-color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.05);
    -moz-box-shadow: 0 2px 15px rgba(0,0,0,0.05);
    box-shadow: 0 2px 15px rgba(0,0,0,0.05);
    position: relative;
    .view-icon{
      display: block;
      width: 40px;
      height: 40px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: -26px;
      left: 50%;
      margin-left: -20px;
      color: #F45050;
      text-align: center;
      .iconfont{
        font-size: 16px;
        line-height: 34px;
      }
    }
  }
  .view-container{
    overflow:hidden;
    height: 100%;
    padding: 20px 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    .view-col{
      width: 50%;
      float: left;
      text-align: center;
      p{
        color: #999;
        font-size: 14px;
        .view-num{
          color: #f45050;
          font-size: 18px;
        }
      }
      h4{
        color: #666;
        font-size: 14px;
        margin-top: 6px;
      }
    }
  }
  .input-group{
    margin: 60px 0;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    .code-input,.code-button{
      height: 46px;
      -webkit-box-shadow: 0 1px 10px rgba(0,0,0,0.05);
      -moz-box-shadow: 0 1px 10px rgba(0,0,0,0.05);
      box-shadow: 0 1px 10px rgba(0,0,0,0.05);
    }
    .code-input{
      width: 320px;
    }
    .code-button{
      width: 80px;
      margin-left: 20px;
      font-size: 18px;
    }
  }
</style>
