<template>
  <div id="app">
    <el-container>
      <el-header class="header-container">
        <headerLayout></headerLayout>
      </el-header>
      <el-main class="main-container">
        <!--        <homePage></homePage>-->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import headerLayout from './view/headerLayout'
  export default {
    name: 'App',
    components: {headerLayout}
  }
</script>
<style scoped>
@import "./static/css/style.css";
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
/*margin-top: 60px;*/
}
.header-container{
background: #6699cc;
height: 200px !important;
line-height: 60px;
text-align: left;
color: #fff;
}
.main-container{
/*border: 1px solid #ccc;*/
/*border-radius: 6px;*/

margin: 20px 100px;
margin-top: -100px;
/*background: #fff;*/
min-height: 300px;
padding: 0;

}
</style>
