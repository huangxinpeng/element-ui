<template>
    <div class="container">
      <div class="section" v-for="(item,index) in activity" :key="index">
        <h3 class="section-title">票种{{index+1}}
          <span class="rt-button pointer"  @click='ifShow(index)'>{{item.statusShow?'收起':'展开'}}&nbsp;<i class="el-icon-arrow-up if-show" :class='item.statusShow?"":"rollback"'></i></span>
          <i @click="del(index)" v-if="activity.length>=2" class="iconfont icon-shanchu shanchu-activity"></i>
        </h3>

        <el-collapse-transition>
        <div class="section-inner" v-show="item.statusShow">

          <div class="list">
            <p class="lt-title"><span class="require">*</span>票种名称：</p>
            <div class="rg-container">
              <el-input 
              v-model='item.ticketType.acName'
              class="small-input add-input no-circle" 
              placeholder="请输入票种名称"></el-input>
              <p class="sub-tip">限2-50字符</p>
            </div>
          </div>

          <div class="list">
            <p class="lt-title">票种描述：</p>
            <div class="rg-container">
              <el-input 
              type='textarea'
              :rows="5"
              v-model='item.ticketType.acdescribe' 
              class="add-textarea no-circle" 
              placeholder="请输入票种描述"></el-input>
              <p class="sub-tip">限0-100字符</p>
            </div>
          </div>

          <div class="list">
            <p class="lt-title"><span class="require">*</span>票面人数：</p>
            <div class="rg-container">
              <el-input 
              v-model='item.ticketType.acNumber'
              class="small-input add-input add-input-short no-circle"></el-input>
              <span class="line-text">人</span>
              <p class="sub-tip">单张票对应的参与人数，限>0的整数</p>
            </div>
          </div>
          
          <div class="list">
            <p class="lt-title"><span class="require">*</span>票面价格：</p>
            <div class="rg-container">
              <el-input 
              v-model='item.ticketType.acmoney'
              class="small-input add-input add-input-short no-circle"></el-input>
              <span class="line-text">元</span>
              <p class="sub-tip">单张票的价格，限数字，精确到0.1元</p>
            </div>
          </div>

          <div class="list">
            <p class="lt-title"><span class="require">*</span>活动日历：</p>
                <div class="rg-container">
              <div class="inner-date-block" v-for="(calendarList,indx) in item.ticketType.accalendar" :key="indx">
                <div class="list">
                  <p class="lt-title">活动日期：
                  </p>
                  <i @click="deldata(index,indx)" v-if="activity[index].ticketType.accalendar.length>1" class="iconfont icon-shanchu shanchu-data"></i>
                  <div class="rg-container">
                    <el-date-picker
                    v-model="calendarList.acDataStarp"
                    type="daterange"
                    range-separator=""
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                  </div>
                </div>
                <div v-for="(acTimeList,idx) in calendarList.acTime" :key = "idx" >
                  <div class="list" >
                    <p class="lt-title">活动时间：</p>
                    <div class="rg-container">
                      <el-time-select
                        v-model="acTimeList.acTime_starpTime"
                        class='small-input no-circle add-time'
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30',
                          maxTime: acTimeList.acTime_endTime
                        }"
                        prefix-icon=' '
                        placeholder="选择时间">
                      </el-time-select>
                      <span class="line-text">至</span>
                      <el-time-select
                        v-model="acTimeList.acTime_endTime"
                        class='small-input no-circle add-time'
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30',
                          minTime: acTimeList.acTime_starpTime
                        }"
                        prefix-icon=' '
                        placeholder="选择时间">
                      </el-time-select>
                      <span class="line-addMore pointer"   @click="addTime(index,indx)"><i class="el-icon-plus"></i> 添加时间</span>
                      <i  @click="delTime(index,indx,idx)" v-if="activity[index].ticketType.accalendar[indx].acTime.length>1"  class="iconfont icon-shanchu shanchu-time"></i>
                    </div>
                    
                  </div>

                  <div class="list">
                    <p class="lt-title">单场库存：</p>
                    <div class="rg-container">
                      <el-input 
                      v-model='acTimeList.actime_number'
                      class="small-input add-input add-input-short no-circle"></el-input>
                      <span class="line-text">份</span>
                    </div>
                  </div>
               </div>
              </div>
              <div class="date-button pointer" @click="addData(index)">
                <p><i class="el-icon-plus"></i> 添加日期</p>
              </div>
            </div>
          </div>
          
        </div>
        </el-collapse-transition>
      </div>

      <div class="out-dark" v-if="activity.length<10">
        <div class="date-button pointer"  @click="addAcType">
          <p><i class="el-icon-plus"></i> 添加票种</p>
        </div>
        <p class="sub-tip">最多可以添加10个票种</p>
      </div>      

      <div class="list">
        <div class="rg-container">
          <div>
            <el-button type='primary' class='foot-button black-button'>存为草稿</el-button>
            <el-button type='primary' class='foot-button blue-button'>预览</el-button>
            <el-button type='primary' class='foot-button'>下一步</el-button>
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
          activity:[
            {
              statusShow:'true',//   折叠开关
              ticketType:{
                acName:'票种名称',//票种名称
                acdescribe:'票种描述',//票种描述
                acNumber:'票面人数',//票面人数
                acmoney:'票价',//票价
                //活动日历
                accalendar:[
                  {
                    acDataStarp:'',//活动日期
                    // 活动时间
                    acTime:[
                      {
                        acTime_starpTime:'',//开始时间
                        acTime_endTime:'',//结束时间
                        actime_number:''
                      }
                    ],
                  }
                ],
              }
            },
          ],
          copyAcitvity:''
        }
      },
      methods:{
        ifShow(i){
          //折叠开关
          this.activity[i].statusShow=!this.activity[i].statusShow
        },
        
        addData(i){
          //添加日期
         this.activity[i].ticketType.accalendar.push({
                    acDataStarp:'',//活动日期
                    // 活动时间
                    acTime:[
                      {
                        acTime_starpTime:'',//开始时间
                        acTime_endTime:'',//结束时间
                        actime_number:''
                      }
                    ],
                })
        },
        deldata(i,j){
          //删除日期
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
              }).then(() => {
                this.activity[i].ticketType.accalendar.splice(j,1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
        },
        addAcType(){
          //添加票种
          if(this.activity.length>=10)return false 
          this.activity.push(this.copyAcitvity)
          // this.activity.push({
          //     statusShow:'true',//   折叠开关
          //     ticketType:{
          //       acName:'',//票种名称
          //       acdescribe:'',//票种描述
          //       acNumber:'',//票面人数
          //       acmoney:'',//票价
          //       //活动日历
          //       accalendar:[
          //         {
          //           acDataStarp:'',//活动日期
          //           // 活动时间
          //           acTime:[
          //             {
          //               acTime_starpTime:'',//开始时间
          //               acTime_endTime:'',//结束时间
          //               actime_number:''
          //             }
          //           ],
          //         }
          //       ],
          //     }
          //   })
        },
        del(i){
          //删除票种
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
        }).then(() => {
           this.activity.splice(i,1)
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
           this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        },
        addTime(i,j){
          //添加时间
          this.activity[i].ticketType.accalendar[j].acTime.push({
                        acTime_starpTime:'11',//开始时间
                        acTime_endTime:'12',//结束时间
                        actime_number:''
          })
        },
        delTime(i,j,n){
          //删除时间
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
           this.activity[i].ticketType.accalendar[j].acTime.splice(n,1)
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
           this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        }
      },
      mounted(){
        this.copyAcitvity=this.activity[0]
      }
    }
</script>

<style scoped lang="less">
  .container{
    width: 640px;
    margin-left: 36px;
  }
  .section{
    border: 1px solid #DEDEDE;
    margin-bottom: 20px;
  }
  .section-title{
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #4A4A4A;
    background-color: #F5F5F9;
    padding: 0 10px;
    .rt-button{
      // float: right;
      margin-left: 15px;
      font-size:12px;
      color: #666;
    }
    .if-show{
      transition: all 0.5s;
      &.rollback{
        transform: rotate(180deg);
      }
    }
  }
  .section-inner{
    padding: 0 28px;
    border-top: 1px solid #dedede;
  }
  .list{
    width: 100%;
    padding: 10px 0;
    padding-left: 82px;
    position: relative;
  }
  .lt-title{
    color: #333;
    font-size: 14px;
    line-height: 36px;
    width: 80px;
    text-align: right;
    margin-top: 10px;
    position: absolute;
    top: 0;
    left: 0;
    .require{
      color: #D0021B;
      padding: 0 2px;
    }
  }
  .rg-container{
    width: 100%;
  }

  .add-input{
    height: 36px;
  }
  .add-select{
    width: 100%;
    height: 36px;
  }
  .add-radio{
    line-height: 36px;
  }
  .add-input-short{
    width: 100px;
  }
  .add-input-middle{
    width: 230px;
  }
  .add-button{
    border-radius: 2px;
    background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
  }
  .inner-date-block{
    border: 1px solid #dedede;
  }
  .add-time{
    width: 100px;
    height: 36px;
  }
  .line-addMore{
    color: #F45050;
    font-size: 14px;
    line-height: 36px;
  }
  .sub-tip{
    font-size:12px;
    color: #666;
    line-height: 30px;
  }
  .line-tip{
    font-size:14px;
    color: #333;
    line-height: 30px;
  }
  .line-text{
    font-size: 14px;
    padding: 0 4px;
  }

  .date-button{
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    color: #4A4A4A;
    margin:20px 0 10px;
    border: 1px dashed #DEDEDE;
    &:hover{
      border-color:#999;
    }
  }
  .out-dark{
    margin-bottom: 50px;
    .date-button{
      border-color: #4A4A4A;
      margin-bottom: 0;
      &:hover{
        border-color:#000;
      }
    }
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
    &.blue-button{
      border-color:#4A90E2;
      background-color: #4A90E2;
    }
  }
  .shanchu-activity,.shanchu-time,.shanchu-data{
    float: right;
    cursor: pointer;
  }
  .shanchu-time{
    position: absolute;
    bottom:-7px;
    right: 20px;
  }
  .shanchu-data{
    position:absolute;
    right: 20px;
    top: 15px;
  }

</style>
