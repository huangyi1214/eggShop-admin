<template>
  <div class="app-container">
        <div class="filter-container">
        <el-input placeholder="请输入手机号" v-model="listQuery.PHONE" style="width: 200px;" class="filter-item" />
        <el-input placeholder="请输入姓名" v-model="listQuery.NAME" style="width: 200px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox> -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width:100%">
      
            <el-table-column align="center" label="订单号" width="100">
        <template slot-scope="scope">
          {{ scope.row.order_num}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.customername }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="信贷经理名称" width="160">
        <template slot-scope="scope">
          {{ scope.row.managername }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.statusname }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.CREATE_TIME }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="信贷类型" width="160">
        <template slot-scope="scope">
          {{ scope.row.POST }}
        </template>
      </el-table-column>

     </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

<el-dialog title="信贷经理资料" :visible.sync="dialogVisible" >
  <el-row class="row">
    <el-col :span="12"><div>名称:<span>{{form.NAME}}</span></div></el-col>
    <el-col :span="12"><div>手机号:<span>{{form.PHONE}}</span></div></el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12"><div>身份证号码:<span>{{form.ID_CARD_NO}}</span></div></el-col>
    <el-col :span="12"><div>身份证有效期:<span>{{form.VALIDITY}}</span></div></el-col>
  </el-row>
  <el-row class="row">
        <el-col :span="12"><div>信贷类型:<span>{{form.busnessname}}</span></div></el-col>
        <el-col :span="12"><div>公司名称:<span>{{form.COMPANY_NAME}}</span></div></el-col>
  </el-row>
  <el-row class="row">
      <el-col>身份证图片</el-col>
  </el-row>
  <el-row :gutter="20" class="row">
            <el-col :span="8"><div><img v-bind:src=form.ID_PHOTO style="width:100%"></img></div></el-col>
            <el-col :span="8"><div><img v-bind:src=form.ID_PHOTO_Negative style="width:100%"></img></div></el-col>
  </el-row>
  <el-row class="row">
      <el-col>工作证</el-col>
  </el-row>
    <el-row>
            <el-col :span="8"><div><img v-bind:src=form.WORK_PERMIT style="width:100%"></img></div></el-col>
  </el-row>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getList, getType } from "@/api/manager";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      form: {},
      listQuery: {
        PHONE: "",
        NAME: "",
        page: 1,
        limit: 10,
        busnessType: ""
      },
      total: 0,
      table: {
        actions: "操作"
      },
      busnessTypes: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.total = response.count.count;
      });
      getType().then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        this.busnessTypes = response.data;
      });
    },
    showDetail(row) {
      this.form = Object.assign(row, {});
      this.dialogVisible = true;
      console.log("row:" + JSON.stringify(row));
    },
    dialogFormVisible() {
      this.dialogVisible = false;
    },
    handleFilter() {
      console.log("query:" + JSON.stringify(this.listQuery));
      this.fetchData();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
    }
  }
};
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

