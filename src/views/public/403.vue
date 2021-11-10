<template>
  <div id="box">
    <div>
      <h1>HTTP 错误 403</h1>
      <h2>状态：拒绝访问 Forbidden</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="less" scoped>
#box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  width: 100%;

  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    h1 {
      display: inline-block;
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      margin: 0px 20px 0px 0px;
      padding: 10px 23px 10px 0px;
      font-size: 24px;
      font-weight: 500;
      vertical-align: top;
    }

    h2 {
      font-size: 14px;
      font-weight: normal;
      line-height: inherit;
      margin: 0px;
      padding: 0px;
    }
  }
}


h1 {
  display: inline-block;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0px 20px 0px 0px;
  padding: 10px 23px 10px 0px;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
}

h2 {
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0px;
  padding: 0px;
}
</style>
