<template>
    <div class="container">
      
      <div class="list">
        <p class="lt-title"><span class="require">*</span>年龄限制：</p>
        <div class="rg-container">
          <p><el-radio v-model="sign.limit" class='block-radio add-radio' label="0">无限制</el-radio></p>
          <p><el-radio v-model="sign.limit" class='block-radio add-radio' label="1">
          建议
          <el-select 
          v-model="sign.advise.minAge" 
          class="small-input add-select no-circle" 
          placeholder="选择年龄">
            <el-option v-for="item in age" :key="item.value" :value="item.label"></el-option>
          </el-select>
          到
          <el-select 
          v-model="sign.advise.maxAge" 
          class="small-input add-select no-circle" 
          placeholder="选择年龄">
            <el-option v-for="item in age" :key="item.value" :value="item.label"></el-option>
          </el-select>
          周岁
          </el-radio></p>
          <p class="sub-tip">报名时不校验</p>
          <p><el-radio v-model="sign.limit" class='block-radio add-radio' label="2">
          强制
          <el-select 
          v-model="sign.force.minAge" 
          class="small-input add-select no-circle" 
          placeholder="选择年龄">
            <el-option v-for="item in age" :key="item.value" :value="item.label"></el-option>
          </el-select>
          到
          <el-select 
          v-model="sign.force.maxAge" 
          class="small-input add-select no-circle" 
          placeholder="选择年龄">
            <el-option v-for="item in age" :key="item.value" :value="item.label"></el-option>
          </el-select>
          周岁
          </el-radio></p>
          <p class="sub-tip">报名时进行校验</p>
        </div>
      </div>
      
      <div class="list">
        <p class="lt-title">其他限制：</p>
        <div class="rg-container">
          <el-input 
          type='textarea'
          :rows="5"
          v-model='sign.other' 
          class="add-textarea no-circle" 
          placeholder="若有其他限制，请输入"></el-input>
          <p class="sub-tip">限0-100字符</p>
        </div>
      </div>

      <div class="list">
        <p class="lt-title"><span class="require">*</span>退款方式：</p>
        <div class="rg-container">
          <p><el-radio v-model="sign.refund" class='block-radio add-radio' label="0">未参加可随时退款</el-radio></p>
          <p><el-radio v-model="sign.refund" class='block-radio add-radio' label="1">
          至少在活动开始前
          <input class="hideinput" maxlength="3" type="text" />
          天
          <input class="hideinput" maxlength="2" type="text" />
          小时退款(共X小时)
          </el-radio></p>
          <p class="sub-tip">限填>0的数字</p>
          <p><el-radio v-model="sign.refund" class='block-radio add-radio' label="2">不可退款</el-radio></p>
        </div>
      </div>
      
      <div class="list">
        <p class="lt-title">报名须知：</p>
        <div class="rg-container">
          <el-input 
          type='textarea'
          :rows="8"
          v-model='sign.notice' 
          class="add-textarea no-circle" 
          placeholder="请输入报名须知"></el-input>
          <p class="sub-tip">限0-300字符</p>
        </div>
      </div>
      
      <div class="list">
        <p class="lt-title">报名信息：</p>
        <div class="rg-container">
         <p class="sub-tip">用户报名时需要填写的参与用户信息，请勿勾</p> 
         <p class="sub-tip">基本信息：</p> 
         <p>
           <el-checkbox-group 
            v-model="checkedInfo"
            :min="1">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
         </p>
         <p class="sub-tip">其他信息：</p> 
         <p>
           <el-checkbox-group 
            v-model="otherInfo">
            <el-checkbox v-for="othercity in othercities" :label="othercity" :key="othercity">{{othercity}}</el-checkbox>
          </el-checkbox-group>
         </p>
         <p class="sub-tip">紧急联系人信息：</p> 
         <p>
           <el-checkbox-group 
            v-model="urgentInfo">
            <el-checkbox v-for="urgentInfocity in urgentInfocities" :label="urgentInfocity" :key="urgentInfocity">{{urgentInfocity}}</el-checkbox>
          </el-checkbox-group>
         </p>
         
        </div>
      </div>

      <div class="list">
        <p class="lt-title"><span class="require">*</span>报名信息人数：</p>
        <div class="rg-container">
          <p><el-radio v-model="sign.refund" class='block-radio add-radio' label="0">只需联络人信息（如报名团队的队长信息，亲子活动的家长信息等)</el-radio></p>
          <p><el-radio v-model="sign.refund" class='block-radio add-radio' label="1">
            需要每一个参与人的信息，即填写人数与票面人数一致
          </el-radio></p>
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
          checkedInfo:['手机号'],
          cities:['手机号','姓名','身份证号'],
          otherInfo:[],
          othercities:['联系地址','年龄','健康状态','收入水平'],
          urgentInfo:[],
          urgentInfocities:['紧急联系人姓名','紧急联系人手机号'],
          sign:{
            advise:{},
            force:{},
          },
          age:[
            {value:3,label:3},
            {value:10,label:10},
            {value:18,label:18},
            {value:20,label:20},
            {value:50,label:50},
            {value:60,label:60},
          ]
        }
      },
      methods:{
        next(){
          this.$router.push({name:'ActivityPro4'})
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
    width: 100px;
    height: 30px;
  }
  .add-button{
    border-radius: 2px;
    background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
  }
  
  .sub-tip{
    font-size:12px;
    color: #999;
    // line-height: 30px;
    line-height: 36px;
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
