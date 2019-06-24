<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="CreateOrder">新增</el-button>
      当前在线人数:{{usercount}}
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox>-->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width:100%"
    >
      <el-table-column align="center" label="订单编号" width="180">
        <template slot-scope="scope">{{ scope.row.ordernum}}</template>
      </el-table-column>
      <el-table-column align="center" label="订单数量" width="120">
        <template slot-scope="scope">{{ scope.row.sendnum }}</template>
      </el-table-column>
      <el-table-column align="center" label="消耗数量" width="120">
        <template slot-scope="scope">{{ scope.row.Consumption }}</template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" width="180">
        <template slot-scope="scope">{{ scope.row.createtime }}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="180">
        <template slot-scope="scope">{{ scope.row.endtime }}</template>
      </el-table-column>
      <el-table-column align="center" label width="240">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="userbuy(scope.row)">抢购</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="订单生成" :visible.sync="dialogVisible">
      <el-form>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="发送数量">
              <input type="text" v-model="form.sendnum" placeholder="请输入数量">
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker v-model="form.createtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker v-model="form.endtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrder, sendOrder, acceptOrder,getonelineusercount } from "@/api/customer";

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
      usercount:0,
      form: {
        sendnum: 100,
        createtime: new Date(),
        endtime: new Date(new Date()+1000*3600)
      },
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
    setInterval(() => {
      getonelineusercount().then(response => {
       console.log(response);
       if(response.code==0){
         this.usercount=response.data;
       }
      });
    }, 5000);
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getOrder(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
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
    CreateOrder() {
      this.dialogVisible = true;
    },
    sendOrder() {
      let self = this;
      sendOrder(this.form).then(response => {
        if (response.code == 0) {
          self.dialogVisible = false;
          self.fetchData();
        }
      });
    },
    userbuy(row) {
      let self = this;
      console.log(row);
      acceptOrder({acceptOrder:row.ordernum}).then(response => {
        console.log(response.code);
        if (response.code == 0) {
          self.dialogVisible = false;
          self.getOrder();
        }
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
</style>

