<template>
  <div class="form-container">
    <p class="page-title">查询结果清单</p>
    <div class="down-load">
      <span class="hand" >下载</span>
    </div>
    <div class="result-container">
      <div class="table-content">
        <el-table
          :data="tableData"
          border
          size="mini"
          max-height="400"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="age"
            label="VIN">
          </el-table-column>
          <el-table-column
            prop="name"
            label="公告号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="销售版本">
          </el-table-column>
          <el-table-column
            prop="name"
            width="120"
            label="评估结果">
            <template slot-scope="scope">
              <span v-if = "scope.row.testResult == 'success'">成功</span>
              <span v-if = "scope.row.testResult == 'failure'">失败</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="操作">
            <template>
              <span class="color-299DE4">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "result-page",
    data() {
      return {
        activeItem: null,
        tableData: [],
        searchParams: {}
      };
    },
    created() {
    },
    mounted() {
      this.getResult();
    },
    methods: {
      // 单个结果
      getResult () {
        const url = this.$url.getBackendApiUrl('/api/server')
        this.$http.get(url).then(res => {
          this.tableData = res.data;
        })
      },
    }
  }
</script>
<style scoped>
  ::v-deep .active-table-cell td{
    background-color: #e8f4ff !important;
  }
  .form-container{
    height: 100%;
  }
  .page-title{
    text-align: left;
    border-bottom: 1px dashed #fff;
    color: #fff;
    padding: 4px 2px;
    font-size: 15px;
  }
  .result-container{
   /* border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;*/
    min-height: 200px;
    margin-top: 10px;
  }
  .down-load{
    color: #fff;
    text-align: right;
    margin-top: 10px;
  }
  .color-299DE4{
    color: #299DE4;
    cursor: pointer;
  }
  .table-content{
    padding: 0 40px;
  }
  .cell-detail-content{
    border: 1px solid #999;
    text-align: left;
    padding: 40px 40px;
    margin-top: 20px;
  }
  .car-name-content{
    display: flex;
    justify-content: space-between;
    /*color: #000;*/
    /*font-size: 16px;*/
    /*font-weight: 600;*/
    margin-bottom: 8px;
  }
  .font-weight-600{
    font-weight: 600;
    font-size: 16px;
    color: #000;
  }
  .font-size-18{
    font-size: 18px;
  }
  .mr30{
    margin-right: 30px;
  }
  .mr5{
    margin-right: 5px;
  }
  .no-weight{
    font-weight: 500;
  }
  .base-info-title{
    margin-top: 20px;
    font-size: 16px;
  }
  .base-table{
    text-align: center;
    width: 100%;
    margin-top: 15px;
  }
  .base-table tr td {
    line-height: 25px;
    font-size: 14px;
  }
  .base-table tr td.title{
    width: 15%;
    text-align: right;
  }
  .base-table tr td.text{
    width: 35%;
    text-align: right;
    text-align: left;
    padding-left: 4%;
    font-size: 15px;
    font-weight: 600;
  }
  .hand{
    cursor: pointer;
  }
</style>

