<template>
  <div class="app-container">
        <div class="filter-container">
        <el-input placeholder="请输入手机号" v-model="listQuery.PHONE" style="width: 200px;" class="filter-item" />
        <el-input placeholder="请输入姓名" v-model="listQuery.NAME" style="width: 200px;" class="filter-item" />
        <el-select v-model="listQuery.busnessType" clearable style="width: 400px" class="filter-item">
          <el-option v-for="item in busnessTypes" :key="item.ID" :label="item.name" :value="item.ID"/>
        </el-select>
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
      <el-table-column align="center" label="手机号码" width="200">
        <template slot-scope="scope">
          {{ scope.row.PHONE }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号码" width="160">
        <template slot-scope="scope">
          {{ scope.row.ID_CARD_NO }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证有效期" width="120">
        <template slot-scope="scope">
          {{ scope.row.VALIDITY }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="信贷类型" width="160">
        <template slot-scope="scope">
          {{ scope.row.busnessname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职位" width="160">
        <template slot-scope="scope">
          {{ scope.row.POST }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
          <el-button v-if="scope.row.IsAdmin" type="primary" size="mini" @click="setIsadmin(scope.row)">取消管理员</el-button>
          <el-button v-else type="primary" size="mini" @click="setIsadmin(scope.row)">设为管理员</el-button>

          <el-button v-if="scope.row.Isinternal" type="primary" size="mini" @click="setIsinternal(scope.row)">取消员工资格</el-button>
          <el-button v-else type="primary" size="mini" @click="setIsinternal(scope.row)">设为员工</el-button>

        </template>
      </el-table-column>

     </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

<el-dialog title="信贷经理资料" :visible.sync="dialogVisible" >


  <managerdetail :manage=form />
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getList, getType,  setIsadmin, setIsinternal } from "@/api/manager";
import managerdetail from "@/components/managerDetail"

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
  components:{managerdetail},
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
        busnessType:""
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
          console.log('response.data:'+JSON.stringify(response.data))
        this.busnessTypes = response.data;
      });
    },
    showDetail(row) {
      this.form = Object.assign(row, {});
      this.dialogVisible = true;
      console.log("row:" + JSON.stringify(row));
    },
    setIsadmin(row) {
      let self=this;
      console.log('row:'+JSON.stringify(row));
      setIsadmin({IsAdmin:row.IsAdmin,userID:row.userID}).then(response => {

          row.IsAdmin=row.IsAdmin==1?0:1;
      });
    },
    setIsinternal(row) {
      let self=this;
      console.log('row:'+JSON.stringify(row));
      setIsinternal({Isinternal:row.Isinternal,userID:row.userID}).then(response => {

          row.Isinternal=row.Isinternal==1?0:1;
      });
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

