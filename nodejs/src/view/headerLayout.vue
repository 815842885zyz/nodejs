<template>
  <div class="header-content">
    <div class="header-left">凯泰铭LOGO</div>
    <div class="header-moddle">
      <div class="menu-item active">精准估价</div>
      <div class="menu-item">数据管理</div>
      <div class="menu-item">权限管理</div>
      <div class="menu-item">人员管理</div>
    </div>
    <div class="header-right">
      <span>O(∩_∩)O哈哈~</span>
      <span class="logout-btn">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerLayout',
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style scoped>
.header-content{
  display: flex;
}
.header-left{
  width: 200px;
}
.header-moddle{
  flex: 1;
  display: flex;
}
.header-moddle .menu-item{
  font-size: 15px;
  padding: 0px 2px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  margin-right: 40px;
}
.header-moddle .menu-item.active::before{
  content: '';
  position: absolute;
  left: 0;
  bottom: 16px;
  height: 1px;
  background: #ffffff;
  width: 100%;
  border-radius: 2px;
}
.header-right{
  width: 200px;
  text-align: right;
}
.logout-btn{
  margin-left: 10px;
}
</style>
