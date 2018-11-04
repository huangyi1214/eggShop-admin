<template>
<div>
      <el-row class="row">
    <el-col :span="12"><div>名称:<span>{{manage.NAME}}</span></div></el-col>
    <el-col :span="12"><div>手机号:<span>{{manage.PHONE}}</span></div></el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12"><div>身份证号码:<span>{{manage.ID_CARD_NO}}</span></div></el-col>
    <el-col :span="12"><div>身份证有效期:<span>{{manage.VALIDITY}}</span></div></el-col>
  </el-row>
  <el-row class="row">
        <el-col :span="12"><div>信贷类型:<span>{{manage.busnessname}}</span></div></el-col>
        <el-col :span="12"><div>公司名称:<span>{{manage.COMPANY_NAME}}</span></div></el-col>
  </el-row>
  <el-row class="row">
      <el-col>身份证图片</el-col>
  </el-row>
  <el-row :gutter="20" class="row">
            <el-col :span="8"><div><img v-bind:src=manage.ID_PHOTO style="width:100%"></img></div></el-col>
            <el-col :span="8"><div><img v-bind:src=manage.ID_PHOTO_Negative style="width:100%"></img></div></el-col>
  </el-row>
  <el-row class="row">
      <el-col>工作证</el-col>
  </el-row>
    <el-row>
            <el-col :span="8"><div><img v-bind:src=manage.WORK_PERMIT style="width:100%"></img></div></el-col>
  </el-row>

</div>

  
</template>
<script>
export default {
    props:{
        "manage":[Object]
    }
}
</script>

<style>
.row {
  margin-bottom: 10px;
}
.row div {
  font-weight: bold;
}
.row div span {
  font-weight: initial;
}
</style>