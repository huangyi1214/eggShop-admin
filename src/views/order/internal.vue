<template>
  <div class="app-container">
        <div class="filter-container">
        <el-select v-model="listQuery.busnessType"  clearable style="width: 400px" class="filter-item">
          <el-option v-for="item in busnessTypes" :key="item.ID" :label="item.name" :value="item.ID"/>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
      
            <el-table-column align="center" label="订单号" width="160">
        <template slot-scope="scope">
          {{ scope.row.order_num}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称" width="200">
        <template slot-scope="scope">
         
          <a @click="showcustoner(scope.row)" ref="#"> {{ scope.row.customer }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="信贷经理名称" width="160">
        <template slot-scope="scope">
          <a @click="showmanager(scope.row)" ref="#"> {{ scope.row.manager }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.statusname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="信贷类型" width="120">
        <template slot-scope="scope">
          {{ scope.row.typename }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.CREATE_TIME) | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.MANAGER_ID" type="primary" size="mini" @click="showselectmanager(scope.row)">分配信贷经理</el-button>
          <el-button v-if="scope.row.STATUS==2 || scope.row.STATUS==5" type="primary" size="mini" @click="updateorderstatus(scope.row,3)">放款</el-button>
          <el-button v-if="scope.row.STATUS==2 || scope.row.STATUS==5" type="primary" size="mini" @click="updateorderstatus(scope.row,4)">拒绝</el-button>
          <el-button v-if="scope.row.STATUS==2" type="primary" size="mini" @click="updateorderstatus(scope.row,5)">补充资料</el-button>
        </template>
      </el-table-column>
     </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

<el-dialog title="客户资料" :visible.sync="dialogVisibleCustomer" >
  
  <customerDetail :customer="customer"/>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleCustomer = false">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="信贷经理资料" :visible.sync="dialogVisiblemanager" >
  
  <managerdetail :manage=manager />
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleCustomer = false">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="分配信贷经理" :visible.sync="dialogVisibleselectmanager" >
  
      <el-select
        v-model="managerID"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        >
        <el-option
          v-for="item in manager_select"
          :key="item.userID"
          :label="item.NAME"
          :value="item.userID">
        </el-option>
      </el-select> 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="order_manger()">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { getList , getcustomer , getmanager ,querymanager ,order_assign ,updateorderstatus } from "@/api/order";

import {getType} from "@/api/manager"

import customerDetail from "@/components/customerDetail"
import managerdetail from "@/components/managerDetail"

export default {
  components:{customerDetail,managerdetail},
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
      dialogVisibleCustomer:false,
      dialogVisiblemanager:false,
      dialogVisibleselectmanager:false,
      form: {},
      listQuery: {
        page: 1,
        limit: 10,
        busnessType: '',
        type:2
      },
      total: 0,
      table: {
        actions: "操作"
      },
      busnessTypes: [],
      customer:{},
      manager:{},
      managerID:'',
      manager_select:[]
    };
  },
  created() {
    this.fetchData();
  },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
    },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.total = response.count[0].count;
      });
      getType().then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
         
        this.busnessTypes = Object.assign(response.data,{});
      });
    },
    showcustoner(row) {
      let self = this;
      console.log('row:'+JSON.stringify(row.CUSTOMER_ID));
      getcustomer({NAME:'',PHONE:'',userID:row.CUSTOMER_ID,page:1,limit:10}).then(response => {
              self.customer = Object.assign(response.data[0],{});
              self.dialogVisibleCustomer=true;
              });
    },
    showmanager(row) {
      let self = this;
      console.log('row:'+JSON.stringify(row.MANAGER_ID));
      getmanager({NAME:'',PHONE:'',userID:row.MANAGER_ID,busnessType:'',page:1,limit:10}).then(response => {
              self.manager = Object.assign(response.data[0],{});
              self.dialogVisiblemanager=true;
              });
    },
    showselectmanager(row){
      this.form=Object.assign(row,{});
      this.dialogVisibleselectmanager=true;
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
    },
    //querymanager
    remoteMethod(query){
      let self=this;
      querymanager({query:query}).then(response => {
        self.manager_select = response.data;
        console.log('self.manager_select:'+JSON.stringify(self.manager_select));
      });
    },
    loading(){
      console.log('loading');
    },
    order_manger(){
      console.log(this.managerID);
      order_assign({orderID:this.form.ID,managerID:this.managerID}).then(response => {
              this.dialogVisibleselectmanager=false;
              this.fetchData();
      });
    },
    updateorderstatus(row,status){
      updateorderstatus({orderID:row.ID,STATUS:status}).then(response => {
              this.dialogVisibleselectmanager=false;
              this.fetchData();
      });
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
a{
  text-decoration:underline;
  color: blueviolet;
}
</style>

