<template>
    <div class="container">
      
      <div class="list">
        <p class="lt-title"><span class="require">*</span>活动地点：</p>
        <div class="rg-container">
          <el-input v-model='activity.area' class="small-input add-input no-circle" placeholder="请输入活动地点"></el-input>
          <p class="sub-tip">活动举办地点，可以为城市，区域，或某个地点名称，限2-10字符</p>
          <el-input v-model='activity.detail' class="small-input add-input no-circle" placeholder="详细地址"></el-input>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>报名开始时间：</p>
        <div class="rg-container">
          <el-date-picker
            v-model="activity.startDate"
            type="date"
            class='small-input no-circle start-date'
            prefix-icon=' '
            placeholder="请选择日期">
          </el-date-picker>
          <el-time-picker
            v-model="activity.startTime"
            arrow-control
            :picker-options="{
              selectableRange: '8:30:00 - 20:30:00'
            }"
            class='small-input no-circle start-time'
            prefix-icon=' '
            placeholder="请选择时间">
          </el-time-picker>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>预定截止时间：</p>
        <div class="rg-container">
          <p><el-radio v-model="activity.endTime" class='block-radio add-radio' label="1">活动开始前均可购买</el-radio></p>
          <p><el-radio v-model="activity.endTime" class='block-radio add-radio' label="2">
            活动开始前
          <input class="hideinput" maxlength="3" type="text" />
          天
          <input class="hideinput" maxlength="2" type="text" />
          小时可购买</el-radio></p>
          <p class="sub-tip">限大于0的整数</p>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>开启评论：</p>
        <div class="rg-container">
          <el-radio v-model="activity.comment" class='block-radio add-radio' label="1">是</el-radio>
          <el-radio v-model="activity.comment" class='block-radio add-radio' label="0">否</el-radio>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>主办方名称：</p>
        <div class="rg-container">
          <el-input v-model='activity.name' class="small-input add-input no-circle" placeholder="请输入主办方名称"></el-input>
          <p class="sub-tip">限3-100字符</p>
        </div>
      </div>
      <div class="list">
        <p class="lt-title"><span class="require">*</span>联系电话：</p>
        <div class="rg-container">
          <el-input v-model='activity.phone' class="small-input add-input no-circle" placeholder="请输入联系电话"></el-input>
          <p class="sub-tip">请输入有效的固话或手机号码，以便用户咨询</p>
        </div>
      </div>
      
      <div class="list">
        <div class="rg-container">
          <div>
            <el-button type='primary' class='foot-button black-button'>存为草稿</el-button>
            <el-button type='primary' class='foot-button' @click='next'>下一步</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "",
      data(){
        return {
          activity:{},
        }
      },
      methods:{
        next(){
          this.$router.push({name:'ActivityPro3'})
        },
      }
    }
</script>

<style scoped lang="less">
  .container{
    width: 620px;
  }
  .list{
    width: 100%;
    padding: 10px 0 20px;
    padding-left: 120px;
    position: relative;
  }
  .lt-title{
    color: #333;
    font-size: 14px;
    line-height: 36px;
    width: 120px;
    text-align: right;
    margin-top: 10px;
    position: absolute;
    top: 0;
    left: -10px;
    .require{
      color: #D0021B;
      padding: 0 2px;
    }
  }
  .rg-container{
    width: 100%;
  }

  .add-input,.start-date{
    height: 36px;
  }
  .start-date,.start-time{
    width: 130px;
    height: 36px;
    margin-right: 10px;
  }
  .add-radio{
    line-height: 36px;
  }
  .add-select{
    width: 100%;
    height: 36px;
  }
  .add-button{
    border-radius: 2px;
    background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
  }
  
  .sub-tip{
    font-size:12px;
    color: #999;
    line-height: 30px;
  }

  .foot-button{
    border-radius: 2px;
    width: 120px;
    height: 50px;
    background-color:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
    &.black-button{
      border-color:#4A4A4A;
      background-color: #4A4A4A;
    }
  }
  .hideinput{
    width: 26px;
    border: none;
    text-align: center;
    border-bottom:1px solid #666666;
  }
</style>
