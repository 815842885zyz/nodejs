<template>
  <div class="form-container">
    <p class="page-title">
      <span>筛选条件</span>
    </p>
    <div class="form-content-div">
      <el-tabs style="margin: 15px" v-model="isSingleSearch" @tab-click="handleClick">
        <el-tab-pane label="单个查询" name="1"></el-tab-pane>
        <el-tab-pane label="批量查询" name="2"></el-tab-pane>
      </el-tabs>

      <div v-if="isSingleSearch == 1" class="form-content">
        <el-form class="form-el" ref="form" :model="form" label-width="80px">
          <el-form-item label="车辆用途" prop="carType">
            <el-radio-group v-model="form.carType">
              <el-radio label="passenger">乘用车</el-radio>
              <el-radio label="business">商用车</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="VIN" prop="vin">
            <el-input v-model="form.vin" placeholder="VIN"></el-input>
          </el-form-item>
          <el-form-item label="公告号" v-if="form.carType == 'business'" prop="modelCode">
            <el-input v-model="form.modelCode" placeholder="公告号"></el-input>
          </el-form-item>
          <el-form-item label="上牌日期" prop="registerDate">
            <el-date-picker type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期" v-model="form.registerDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="公里数" class="hasUnit" prop="mileage">
            <el-input v-model="form.mileage" placeholder="公里数"></el-input>
            <span class="unit">公里</span>
          </el-form-item>
          <el-form-item label="地区" prop="area">
            <el-input v-model="form.area" placeholder="地区"></el-input>
          </el-form-item>
          <el-form-item label="用途" prop="useNature">
            <el-select v-model="form.useNature" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(todo, index) in yongtuArray" :key="index" :label="todo.name" :value="todo.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="过户次数" prop="transferNumber">
            <el-select v-model="form.transferNumber" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(todo, index) in guoshucishu" :key="index" :label="todo.name" :value="todo.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="footer-content">
            <el-button style="padding-left: 40px;padding-right: 40px;background: #6699cc; border-color: #6699cc" type="primary" @click="onSubmit">  查询  </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="isSingleSearch != 1" class="form-content">
        <el-form  ref="form" class="form-el" :model="batchForm" label-width="80px">
          <el-form-item label="车辆用途" prop="carType">
            <el-radio-group v-model="batchForm.carType">
              <el-radio label="passenger">乘用车</el-radio>
              <el-radio label="business">商用车</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上传文件" prop="carType">
            <el-upload
                    class="upload-demo"
                    drag
                    :before-upload="beforeUpload"
                    :action="fileUploadUrl"
                    accept=".txt"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只支持.txt格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item class="footer-content">
            <el-button style="padding-left: 40px;padding-right: 40px;background: #6699cc; border-color: #6699cc"
                       type="primary"
                       @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "home-page",
  data() {
    return {
      activeName: 'second',
      isSingleSearch: '1',
      batchForm: {
        carType: 'passenger', // 乘用车：passenger；商用车：business；
        fileUrl: ''
      },
      form: {
        carType: 'passenger', // 乘用车：passenger；商用车：business；
        vin: '',
        registerDate: '', // 注册日期
        area: '', // 行驶区域
        mileage: '', // 里程数
        useNature: '', // 使用性质
        transferNumber: '', // 过户次数
        modelCode: '', // 公告号
      },
      rules: {
        cheliangyongtu: [{ required: true, message: '请输入车辆用途', trigger: 'blur' },],
        VIN: [{ required: true, message: '请输入VIN', trigger: 'blur' }],
        gonggaohao: [{ required: false, message: '请输入公告号', trigger: 'blur' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        area: [{ type: 'array', required: true, message: '请输入地区', trigger: 'blur' }],
        gonglishu: [{ required: true, message: '请输入公里数', trigger: 'blur' }],
        yongtu: [],
        cishu: [],
      },
      // 用途
      yongtuArray: [
        {name: '公户', value: 1},
        {name: '个人', value: 2},
        {name: '营运', value: 3},
        {name: '非营运', value: 4},
        {name: '租赁', value: 5}
      ],
      // 过户次数
      guoshucishu: [
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '5', value: 5},
        {name: '6次及以上', value: 6}
      ],
      fileUploadUrl: 'http://182.48.105.123:8185/dfsservice/api/fastdfs/uploadfile/'
    }
  },
  created() {
  },
  mounted() {
    // this.getResult();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log(this.form);
      const param = {
        isSingleSearch: this.isSingleSearch,
        batchForm: this.batchForm,
        form: this.form,
      };
      localStorage.setItem('searchParams', JSON.stringify(param));
      this.$router.push('/result');
      // this.getResult();
    },
    getResult () {
      const url = this.$url.getBackendApiUrl('/api/vehicle-car-loan/carloan/single/check')
      this.$http.post(url, this.form).then(res => {
        console.log(res);
      })
    },
    onSubmitBatch() {
      console.log(this.batchForm);
      this.getResultBatch();
    },
    getResultBatch () {
      const url = this.$url.getBackendApiUrl('/api/vehicle-car-loan/carloan/batch/check')
      this.$http.post(url, this.batchForm).then(res => {
        console.log(res);
      })
    },
    beforeUpload(file) {
      console.log();
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          // this.fileUploadUrl = process.env.VUE_APP_FILE_UPLOAD_URL;
          resolve();
        });
      })
    },
    handleChange(file, fileList) {
      const status = file.status;
      console.log(file);
      if (status === 'success') {
        this.batchForm.fileUrl = this.saveFileInfo(file);
        console.log(this.batchForm);
        this.$message.success('上传成功');
      } else if (status === 'error') {
        this.$message.error('上传失败');
      }
    },
    // 获取上传到文件服务器之后返回的文件地址
    saveFileInfo(file) {
      let fileUrl = null;
      let uploadFile = file.response.responseBody;
      for (let i in uploadFile) {
        fileUrl = uploadFile[i];
      }
      return fileUrl;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      if (file.status == 'success') {
        this.batchForm.fileUrl = '';
      }
    },
  }
}
</script>

<style scoped>
.form-container{
  /*background: #fff;*/

/*  border: 1px solid #ccc;
  border-radius: 6px;*/
  height: 100%;
}
.page-title{
  text-align: left;
  border-bottom: 1px dashed #fff;
  color: #fff;
  padding: 4px 2px;
  font-size: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.form-content-div{
  border: 1px solid #ccc;
  border-radius: 6px;
  /*display: flex;*/
  /*justify-content: center;*/
  background: #fff;
}
.hand{
  cursor: pointer;
}
.form-content{
  /*background: #fff;*/
  /*width: 700px;*/
  /*margin-top: 30px;*/
  display: flex;
  justify-content: center;
}
.form-content .form-el{
  width: 700px;
  margin-top: 30px;
}
.footer-content{
  margin-top: 50px;
  text-align: center !important;
}
.el-form-item{
  text-align: left;
}
.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}
.hasUnit{
  position: relative;
}
.hasUnit .unit{
  position: absolute;
  right: -50px;
}
</style>
