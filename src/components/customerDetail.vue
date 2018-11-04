<template>
<div>
    <el-row class="row">
        <el-col :span="12"><div>名称:<span>{{customer.NAME}}</span></div></el-col>
        <el-col :span="12"><div>手机号:<span>{{customer.PHONE}}</span></div></el-col>
    </el-row>
  
    <el-row class="row">
        <el-col :span="12"><div>性别:<span>{{customer.SEX}}</span></div></el-col>
        <el-col :span="12"><div>年龄:<span>{{customer.AGE}}</span></div></el-col>
    </el-row>
        <el-row class="row">
        <el-col :span="12"><div>房产:<span>{{customer.Property}}</span></div></el-col>
        <el-col :span="12"><div>汽车情况:<span>{{customer.car}}</span></div></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="12"><div>户籍:<span>{{customer.census}}</span></div></el-col>
        <el-col :span="12"><div>社保信息:<span>{{customer.Social_security}}</span></div></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="12"><div>地址:<span>{{customer.address}}</span></div></el-col>
        <el-col :span="12"><div>婚姻状况:<span>{{customer.hunyin}}</span></div></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="12"><div>银行流水:<span>{{customer.bank_flow}}</span></div></el-col>
        <el-col :span="12"><div>征信状况:<span>{{customer.Credit}}</span></div></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="12"><div>负债:<span>{{customer.owing}}</span></div></el-col>
    </el-row>
  

</div>

  
</template>
<script>
export default {
    props:{
        "customer":[Object]
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