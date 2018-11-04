<template>
  <div class="app-container">
        <div class="filter-container">
        <el-input placeholder="请输入手机号" v-model="listQuery.PHONE" style="width: 200px;" class="filter-item" />
        <el-input placeholder="请输入姓名" v-model="listQuery.NAME" style="width: 200px;" class="filter-item" />
          <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
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
      <el-table-column align="center" label="名称" width="100">
        <template slot-scope="scope">
          {{ scope.row.NAME}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号码" width="120">
        <template slot-scope="scope">
          {{ scope.row.PHONE }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="100">
        <template slot-scope="scope">
          {{ scope.row.SEX }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="年龄" width="80">
        <template slot-scope="scope">
          {{ scope.row.AGE }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号码" width="120">
        <template slot-scope="scope">
          {{ scope.row.ID_CARD_NO }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="房产情况" width="100">
        <template slot-scope="scope">
          {{ scope.row.Property }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="有无汽车" width="100">
        <template slot-scope="scope">
          {{ scope.row.car }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="户籍情况" width="100">
        <template slot-scope="scope">
          {{ scope.row.census }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="社保信息" width="100">
        <template slot-scope="scope">
          {{ scope.row.Social_security }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="地址" width="100">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="婚姻状况" width="100">
        <template slot-scope="scope">
          {{ scope.row.hunyin }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="负债信息" width="100">
        <template slot-scope="scope">
          {{ scope.row.owing }}
        </template>
      </el-table-column>
     </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

<el-dialog title="客户资料" :visible.sync="dialogVisible" >
  <el-row class="row">
    <el-col :span="12"><div>客户名称:<span>{{form.NAME}}</span></div></el-col>
    <el-col :span="12"><div>手机号:<span>{{form.PHONE}}</span></div></el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12"><div>性别:<span>{{form.SEX}}</span></div></el-col>
    <el-col :span="12"><div>年龄:<span>{{form.AGE}}</span></div></el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12"><div>身份证号码:<span>{{form.ID_CARD_NO}}</span></div></el-col>
  </el-row>
  <el-row class="row">
        <el-col :span="24"><div>房产:<span>{{form.PropertyTypename}}</span></div></el-col>
  </el-row>
  <el-row>
            <el-col :span="8"><div><img v-bind:src=form.Property style="width:100%"></img></div></el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12"><div>汽车:<span>{{form.carTypeName}}</span></div></el-col>
  </el-row>
    <el-row>
            <el-col :span="8"><div><img v-bind:src=form.car style="width:100%"></img></div></el-col>
  </el-row>


  <el-row class="row">
    <el-col :span="12"><div>户籍情况:<span>{{form.censusTypeName}}</span></div></el-col>
    <el-col :span="12"><div>社保情况:<span>{{form.Social_securityTypeName}}</span></div></el-col>
  </el-row>

  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/customer";

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
        limit: 10
      },
      total: 100
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

