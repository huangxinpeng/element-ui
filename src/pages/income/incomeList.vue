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
          <el-table-column prop="id" label="活动ID" width="80" fixed></el-table-column>
          <el-table-column prop="name" label="活动名称" width="200" fixed></el-table-column>
          <el-table-column prop="ticketNme" label="票种名称" width="120"></el-table-column>
          <el-table-column label="票种费用 (元)" width="120">
            <template slot-scope="scope">
              <p class='cell-number'>{{scope.row.price}}</p>
            </template>
          </el-table-column>
          <el-table-column label="成功付款人数 (人)" width="120">
            <template slot-scope="scope">
              <p class='cell-number'>{{scope.row.paid}}</p>
            </template>
          </el-table-column>
          <el-table-column 
          label="活动收入 (元) —含佣金" 
          :render-header='headLabel'
          width="120">
            <template slot-scope="scope">
              <p class='cell-number'>{{scope.row.income}}</p>
            </template>
          </el-table-column>
          <el-table-column label="退款人数 (人)" width="100">
            <template slot-scope="scope">
              <p class='cell-number'>{{scope.row.refundNum}}</p>
            </template>
          </el-table-column>
          <el-table-column label="已退款金额 (元)" width="100">
            <template slot-scope="scope">
              <p class='cell-number'>{{scope.row.refundAmount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="报名状态" width="160">
            <template slot-scope="scope">
              <p v-if="scope.row.sign==1" style="color: #4A90E2">报名进行中</p>
              <p v-if="scope.row.sign==2" style="color: #B1B1B1">已下线</p>
            </template>
          </el-table-column>
          <el-table-column label="活动状态" width="160">
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
        </el-table>
      </div>
      <div class="foot-page">
        <Page :currentPage="2" :total="25" @pageChange="handlePage"></Page>
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
          },
          activityFilter:{
            type:'',
            status:'',
          },
          dataList:[
            {
              id:'1001',
              name:'杭州电视台少儿频道·亲子参观体验团',
              ticketNme:'上午美术课+午餐+下午音乐课 ',
              price:19.8,
              paid:56,
              income:256,
              refundNum:6,
              refundAmount:56,
              sign:1,
              status:1,
            },{
              id:'1003',
              name:'杭州电视台少儿频道·亲子参观体验团',
              ticketNme:'周末票',
              price:19.8,
              paid:56,
              income:256,
              refundNum:6,
              refundAmount:56,
              sign:2,
              status:3,
            }
          ]
        }
      },
      components:{ Page },
      methods:{
        headLabel(h, { column }){
          return h('div', {
            attrs: {
                style: 'display:table-cell;padding-top:4px'
            }
          } , [
              h('p', {
                  attrs: {
                      style: 'line-height:23px'
                  }
              },'活动收入'),
              h('p', {
                  attrs: {
                      style: 'color:#B1B1B1;font-size:12px;line-height:23px'
                  }
              },'—含佣金')
          ]);
        },
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
    width: 750px;
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
    &+.filter-text{
      margin-left: 20px;
    }
  }
  .active-date{
    width: 110px;
    margin: 0 6px;
    vertical-align: bottom;
  }
  .active-date-range{
    width: 220px;
  }


  .cell-number{
    font-weight: bold;
    color: #666;
  }
  .right-operate{
    float: left;
    padding: 10px 0;
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
