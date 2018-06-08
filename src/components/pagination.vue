<template>
  <div>
    <div class="outer">
      <div class="left-num">当前第 <span class="col">{{currentPage}}</span>/{{pages}}页，每页10条，共{{total}}条</div>
      <div class="right-jump">
        <span class="pg-button" @click="skip('h')">首页</span>
        <span class="pg-button" @click="skip('p')">上一页</span>
        <span class="pg-button" @click="skip('n')">下一页</span>
        <span class="pg-button" @click="skip('l')">尾页</span>
        <input type="text" class="pg-input" v-model="jump">
        <span class="pg-button skip-button" @click="skip()">跳转</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jump: 1,
      eventInfo:''
    }
  },
  props: {
    currentPage:{
      type:Number,
      default: 1
    },
    total:{
      type:Number,
      default: 1
    }
  },
  computed:{
    pages(){
      return Math.ceil(this.total/10)
    }
  },
  methods: {
    skip(info){
      let c = this.currentPage,
        t = Math.ceil(this.total/10)
      if(info==='h'){
        this.eventInfo = 1
      }else if(info==='p'){
        this.eventInfo = c-1 || 1
      }else if(info==='n'){
        this.eventInfo = c+1 >= t ? t : c+1
      }else if(info==='l'){
        this.eventInfo = t
      }else{
        this.eventInfo = this.jump
      }
      this.$emit("pageChange",{to:this.eventInfo})
    },
  }
}
</script>
<style scoped lang="less">
  .outer{
    overflow: hidden;
    height: 40px;
    padding: 0 30px;
  }
  .left-num{
    float: left;
    color: #666;
    font-size: 14px;
    line-height: 38px;
  }
  .right-jump{
    float: right;
    padding-top: 8px;
  }
  .pg-button{
    display: inline-block;
    width: 48px;
    height: 24px;
    line-height: 22px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: #666;
    font-size: 12px;
    text-align: center;
    margin: 0 4px;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    cursor: pointer;
  }
  .pg-button.skip-button{
    color: #fff;
    background-color: #f45050;
  }
  .pg-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline:0;
    width: 48px;
    height: 24px;
    border: 1px solid #dedede;
    font-size: 12px;
    background-color: #fff;
    color: #f45050;
    text-align: center;
  }
  .col{
    color: #f45050;
  }


</style>
