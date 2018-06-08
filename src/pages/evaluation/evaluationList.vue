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
          <el-table-column prop="id" label="活动ID" width="150"></el-table-column>
          <el-table-column prop="name" label="活动名称" width="280"></el-table-column>
          <el-table-column label="活动类型" width="160">
            <template slot-scope="scope">
              <p v-for="i in scope.row.type">{{i}}</p>
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
          <el-table-column label="评价">
            <template slot-scope="scope">
              <p class="small-ope pointer">{{scope.row.star}}星</p>
              <p class="small-ope pointer" style="color: #F45050">{{scope.row.length}}条</p>
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
              type:['亲子类','教育类'],
              status:1,
              star:3.5,
              length:120,
            },{
              id:'1001',
              name:'杭州电视台少儿频道·亲子参观体验团',
              type:['亲子类'],
              status:2,
              star:4,
              length:180,
            },{
              id:'1001',
              name:'杭州电视台少儿频道·亲子参观体验团',
              type:['亲子类'],
              status:3,
              star:4,
              length:180,
            },{
              id:'1001',
              name:'杭州电视台少儿频道·亲子参观体验团',
              type:['亲子类'],
              status:4,
              star:4,
              length:180,
            }
          ]
        }
      },
      components:{ Page },
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
    width: 500px;
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
