<template>
    <div class="outer">
      <h3 class="title">评价管理</h3>
        <div class="inner">
          <router-view/>
        </div>
      </div>
    </div>
</template>

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
    width: 100%;
    background-color: #fff;
    border: 1px solid #DEDEDE;
    border-radius: 2px ;
    padding: 30px;
  }

</style>
