<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="请输入订单号"
        v-model="listQuery.ordernum"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
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
      <el-table-column align="center" label="原订单编号" width="180">
        <template slot-scope="scope">{{ scope.row.ordernum}}</template>
      </el-table-column>
      <el-table-column align="center" label="订购编号" width="180">
        <template slot-scope="scope">{{ scope.row.acceptorder }}</template>
      </el-table-column>
      <el-table-column align="center" label="购买数量" width="120">
        <template slot-scope="scope">{{ scope.row.acceptnum }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单时间" width="180">
        <template slot-scope="scope">{{ scope.row.createtime }}</template>
      </el-table-column>


    </el-table>

  </div>
</template>

<script>
import { getAcceptOrder } from "@/api/customer";

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
      form: {
        sendnum: 0,
        createtime: new Date(),
        endtime: new Date()
      },
      listQuery: {
        ordernum: ""
      },
      total: 100
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.listQuery.ordernum.length > 5) {
        this.listLoading = true;
        getAcceptOrder(this.listQuery).then(response => {
          this.list = response.data;
          this.listLoading = false;
        });
      }
      else{
          this.listLoading=false;
      }
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

