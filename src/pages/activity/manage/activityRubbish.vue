<template>
    <div>
      <div class="filter">
        <ul class="left-ctl">
          <li class="filter-line">
            <span class="filter-text">活动名称</span><el-input class="small-input active-input no-circle" placeholder="请输入活动名称"></el-input>
            <el-select v-model="activityFilter.type" class="small-input active-select no-circle"  placeholder="活动类型">
              <el-option v-for="item in activityList.type" :key="item.value" :value="item.label"></el-option>
            </el-select>
            <el-select v-model="activityFilter.status" class="small-input active-select no-circle"  placeholder="活动状态">
              <el-option v-for="item in activityList.status" :key="item.value" :value="item.label"></el-option>
            </el-select>
            <el-select v-model="activityFilter.enroll" class="small-input active-select no-circle"  placeholder="报名状态">
              <el-option v-for="item in activityList.enroll" :key="item.value" :value="item.label"></el-option>
            </el-select>
          </li>
          <li class="filter-line clearfix">
            <p class="date-block">
              <span class="filter-text">报名时间</span>
              <el-date-picker
                v-model="activityFilter.enrollTime_b"
                class="small-picker no-circle active-date"
                type="date"
                placeholder="请选择日期"
                prefix-icon=" "
                :picker-options="etb">
              </el-date-picker>
              <span class="filter-text">至</span>
              <el-date-picker
                v-model="activityFilter.enrollTime_e"
                class="small-picker no-circle active-date"
                type="date"
                placeholder="请选择日期"
                prefix-icon=" "
                :picker-options="ete">
              </el-date-picker>
            </p>
            <p class="date-block">
              <span class="filter-text">活动时间</span>
              <el-date-picker
                v-model="activityFilter.activityTime_b"
                class="small-picker no-circle active-date"
                type="date"
                placeholder="请选择日期"
                prefix-icon=" "
                :picker-options="atb">
              </el-date-picker>
              <span class="filter-text">至</span>
              <el-date-picker
                v-model="activityFilter.activityTime_e"
                class="small-picker no-circle active-date"
                type="date"
                placeholder="请选择日期"
                prefix-icon=" "
                :picker-options="ate">
              </el-date-picker>
            </p>
          </li>
        </ul>
        <div class="right-operate">
          <div>
            <el-button type="primary" class="ope-button">查询</el-button>
            <el-button type="primary" class="ope-button">导出</el-button>
          </div>
        </div>
      </div>

      <div>
        <el-table
          :data="dataList"
          class="table"
          stripe
          style="width: 100%"
          header-row-class-name="table-head"
          header-cell-class-name="table-head-cell"
          empty-text="暂无数据">
          <el-table-column prop="id" label="活动ID" width="70"></el-table-column>
          <el-table-column prop="name" label="活动名称" width="250"></el-table-column>
          <el-table-column label="活动类型" width="90">
            <template slot-scope="scope">
              <p v-for="i in scope.row.type">{{i}}</p>
            </template>
          </el-table-column>
          <el-table-column label="报名费用(元)" width="110">
            <template slot-scope="scope">
              <p style="font-weight: bold;font-size: 16px;">{{scope.row.cost}}</p>
            </template>
          </el-table-column>
          <el-table-column label="有效订单(笔)" width="110">
            <template slot-scope="scope">
              <p style="font-weight: bold;">{{scope.row.effect}}</p>
              <p class="pointer" style="color: #f45050;">票种明细</p>
            </template>
          </el-table-column>
          <el-table-column label="活动状态" width="100">
            <template slot-scope="scope">
              <p v-if="scope.row.status==1" style="color: #4A90E2">已上线</p>
              <template v-if="scope.row.status==2">
                <p style="color: #D0021B">审核已驳回</p>
                <p class="pointer" style="color: #f45050;">原因</p>
              </template>
              <p v-if="scope.row.status==3" style="color: #B1B1B1">已下线</p>
              <p v-if="scope.row.status==4" style="color: #2BA728">审核中</p>
              <p v-if="scope.row.status==5">待提交审核</p>
            </template>
          </el-table-column>
          <el-table-column prop="sign" label="报名状态" width="90">
            <template slot-scope="scope">
              <p v-if="scope.row.sign==1">报名未开始</p>
              <p v-else>--</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <p @click="handleModify(scope.row.id)" class="small-ope pointer" style="color: #4A90E2">修改</p>
              <p @click="handleReview(scope.row.id)" class="small-ope pointer" style="color: #2BA728">预览</p>
              <p @click="handlePause(scope.row.id)" class="small-ope pointer" style="color: #F5A623">暂停报名</p>
              <p @click="handleOffline(scope.row.id)" class="small-ope pointer" style="color: #B1B1B1">下线</p>
              <p @click="handleDelete(scope.row.id)" class="small-ope pointer" style="color: #D0021B">删除</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-page">
        <Page :currentPage="2" :total="35" @pageChange="handlePage"></Page>
      </div>
    </div>
</template>

<script>
  import Page from '@/components/pagination'
    export default {
      name: "",
      data(){
        return {
          name:'',
          activityList:{
            type:[
              {value:'0',label:'全部'},
              {value:'1',label:'亲子'},
              {value:'2',label:'教育'},
              {value:'3',label:'体育'},
              {value:'4',label:'公益'},
            ],
            status:[
              {value:'0',label:'全部'},
              {value:'1',label:'待提交审核'},
              {value:'2',label:'审核中'},
              {value:'3',label:'审核已驳回'},
              {value:'4',label:'已上线'},
            ],
            enroll:[
              {value:'0',label:'全部'},
              {value:'1',label:'报名未开始'},
              {value:'2',label:'报名进行中'},
              {value:'3',label:'报名已结束'},
            ]
          },
          activityFilter:{
            type:'',
            status:'',
            enroll:'',
            enrollTime_b:'',
            enrollTime_e:'',
            activityTime_b:'',
            activityTime_e:'',
          },
          dataList:[
            {
              id:'1001',
              name:'杭州电视台少儿频道·亲子参观体验团',
              type:['亲子类','教育类'],
              cost:'9.9-199.9',
              effect:'124',
              status:1,
              sign:1,
            },{
              id:'1001',
              name:'杭州电视台少儿频道·亲子参观体验团',
              type:['亲子类'],
              cost:'9.9',
              effect:'12',
              status:2,
              sign:2,
            }
          ]
        }
      },
      components:{ Page },
      computed:{
        etb(){
          let t = this.activityFilter.enrollTime_e
          return {
            disabledDate(time) {
              if(t){
                return time.getTime() < Date.now() || time.getTime() > t;
              }else{
                return time.getTime() < Date.now()
              }
            }
          }
        },
        ete(){
          let t = this.activityFilter.enrollTime_b
          return {
            disabledDate (time) {
              if(t){
                return time.getTime() < Date.now() || time.getTime() < t;
              }else{
                return time.getTime() < Date.now()
              }

            }
          }
        },
        atb(){
          let t = this.activityFilter.activityTime_e
          return {
            disabledDate(time) {
              if(t){
                return time.getTime() < Date.now() || time.getTime() > t;
              }else{
                return time.getTime() < Date.now()
              }
            }
          }
        },
        ate(){
          let t = this.activityFilter.activityTime_b
          return {
            disabledDate (time) {
              if(t){
                return time.getTime() < Date.now() || time.getTime() < t;
              }else{
                return time.getTime() < Date.now()
              }

            }
          }
        },
      },
      methods:{
        handleModify(id){},
        handleReview(id){},
        handlePause(id){},
        handleOffline(id){},
        handleDelete(id){},
        handlePage(info){
          console.log(info.to)
        },
      }
    }
</script>

<style scoped lang="less">
  .filter{
    overflow: hidden;
  }
  .left-ctl{
    float: left;
    width: 700px;
  }
  .filter-line{
    padding: 10px 0;
  }
  .date-block{
    padding-right: 14px;
    float: left;
  }
  .filter-text{
    font-size: 14px;
    line-height: 30px;
    vertical-align: bottom;
  }
  .active-input{
    width: 160px;
    height: 30px;
    margin-left: 6px;
  }
  .active-select{
    width:100px;
    height:30px;
    margin-left: 20px;
    vertical-align: bottom;
  }
  .active-date{
    width: 110px;
    margin: 0 6px;
    vertical-align: bottom;
  }
  .active-date-range{
    width: 220px;
  }


  .right-operate{
    float: left;
    margin-top: 34px;
  }
  .ope-button{
    width:60px;
    height:30px;
    background:linear-gradient(127.4deg,rgba(255,79,90,1),rgba(255,118,86,1));
    border-radius: 2px ;
    font-size:14px;
    padding: 0;
  }

  .el-select-dropdown__item:first-child{
    color: #F45050;
  }

  .table{
    font-size: 14px;
    color: #666;
    text-align: center;
    border: 1px solid #DEDEDE;
    border-bottom: 0;
    margin-top: 10px;
  }
  .table .small-ope{
    font-size: 12px;
  }
  .foot-page{
    border: 1px solid #DEDEDE;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: #FBFBFB;
    height: 40px;
    margin-top: 20px;
  }



</style>
