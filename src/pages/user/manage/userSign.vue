<template>
    <div>
      <div class="filter">
        <ul class="left-ctl">
          <li class="filter-line">

            <span class="filter-text">活动名称</span><el-input class="small-input active-input no-circle" placeholder="请输入活动名称"></el-input>

            <span class="filter-text">订单编号</span><el-input class="small-input active-input no-circle" placeholder="请输入订单编号"></el-input>

            <el-select v-model="userFilter.orderStatus" class="small-input active-select no-circle"  placeholder="订单状态">
              <el-option v-for="item in userList.orderStatus" :key="item.value" :value="item.label"></el-option>
            </el-select>
            <br>

            <span class="filter-text">订单生成时间</span><el-date-picker
              class='small-picker no-circle filter-create-time'
              prefix-icon='x'
              v-model="userFilter.createTime"
              type="datetime"
              format='yyyy/MM/dd HH'
              time-arrow-control
              placeholder="请选择订单生成时间">
            </el-date-picker>
          </li>
          <li class="filter-line clearfix">
            <span class="filter-text">用户ID</span><el-input class="small-input active-input no-circle" placeholder="请输入用户ID"></el-input>

            <span class="filter-text">用户姓名</span><el-input class="small-input active-input no-circle" placeholder="请输入用户姓名"></el-input>

            <span class="filter-text">票种名称</span><el-input class="small-input active-input no-circle" placeholder="请输入票种名称"></el-input>
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
          <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
          <el-table-column prop="userName" label="用户姓名" width="100"></el-table-column>
          <el-table-column prop="code" label="订单号" width="100"></el-table-column>
          <el-table-column label="订单状态" width="90">
            <template slot-scope="scope">
              <p v-if='scope.row.orderStatus===0' style="color: #4A90E2">待参与</p>
              <p v-if='scope.row.orderStatus===1' style="color: #F5A623">待支付</p>
              <p v-if='scope.row.orderStatus===2' style="color: #B1B1B1">已取消</p>
            </template>
          </el-table-column>
          <el-table-column prop="activityName" label="活动名称" width="180"></el-table-column>
          <el-table-column prop="code" label="票种名称" width="100"></el-table-column>
          <el-table-column label="支付金额" width="100">
            <template slot-scope="scope">
              <p style="font-weight: bold;font-size: 14px;color:#666;">{{scope.row.cost}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="订单生成时间" width="130"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <p @click="handleDetail(scope.row.id)" class="small-ope pointer" style="color: #4A90E2">查看详情</p>
              <p @click="handleReview(scope.row.id)" class="small-ope pointer" style="color: #2BA728"> 查看参加者 </p>
              <p @click="handleRefund(scope.row.id)" class="small-ope pointer" style="color: #D0021B">退款</p>
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
          userList:{
            orderStatus:[
              {value:'0',label:'报名成功'},
              {value:'1',label:'报名失败'},
              {value:'2',label:'待支付'},
              {value:'3',label:'支付处理中'},
              {value:'4',label:'退款处理中'},
              {value:'5',label:'退款成功'},
              {value:'6',label:'退款失败'},
              {value:'7',label:'已取消'},
            ],
          },
          userFilter:{},
          dataList:[
            {
              id:'1001',
              userName:'胡胡胡',
              code:'100258621',
              orderStatus:0,
              activityName:'杭州电视台少儿频道·亲子参观体验团',
              ticket:'上午美术课+午餐+下午音乐课',
              cost:'199.9',
              createTime:'218-01-20 20:30',
            },
          ]
        }
      },
      components:{ Page },
      methods:{
        handleDetail(id){},
        handleReview(id){},
        handleRefund(id){},
        handlePage(){},
      }
    }
</script>

<style scoped lang="less">
  .filter{
    overflow: hidden;
  }
  .left-ctl{
    float: left;
    width: 780px;
  }
  .filter-line{
    padding: 10px 0;
  }
  .filter-text{
    font-size: 14px;
    line-height: 30px;
    display: inline-block;
    min-width: 58px;
    text-align: right;
    vertical-align: bottom;
    &:not(:first-child){
      margin-left: 20px;
    };
  }
  .filter-create-time{
    width: 180px;
    height: 30px;
    margin-left: 10px;
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
