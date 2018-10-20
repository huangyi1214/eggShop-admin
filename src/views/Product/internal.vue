<template>
  <div class="app-container">
        <div class="filter-container">
        <el-input placeholder="请输入姓名" v-model="listQuery.NAME" style="width: 200px;" class="filter-item" />

        </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="CreateProduct">新增</el-button>

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
      <el-table-column align="center" label="子名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.Detail }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最小金额" width="120">
        <template slot-scope="scope">
          {{ scope.row.account_min }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最大金额" width="120">
        <template slot-scope="scope">
          {{ scope.row.account_max }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="120">
        <template slot-scope="scope">
          {{ scope.row.orderID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否可用" width="120">
        <template slot-scope="scope">
            <input type="checkbox" :checked="scope.row.isenable==0 ? false: true" v-on:onclick="enable(scope.row.isenable)" value="scope.row.isenable">
        </template>
      </el-table-column>
      
     </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

<el-dialog title="产品资料" :visible.sync="dialogVisible" >
  <el-form>
    <el-row class="row">
      <el-col :span="12">
        <el-form-item label="产品名称">
          <input type="text" placeholder="请输入产品名称"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="子名称">
          <input type="text" placeholder="请输入子名称"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="12">
        <el-form-item label="最小金额">
          <el-input-number v-model="form.account_min"  :min="0" :max="1000000000000" label="最小金额"></el-input-number>        
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="最大金额">
          <el-input-number v-model="form.account_min"  :min="0" :max="1000000000000" label="最大金额"></el-input-number>        
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
       <el-upload
        action="http://127.0.0.1:8090/uploadfile"
        list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-row>
  </el-form>
  
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/product";
// import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";
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
        NAME: "",
        Detail: "",
        description: "",
        TYPE: "",
        orderID: 0,
        image: "",
        account_min: 0,
        account_max: 0,
        isenable: 1
      },
      listQuery: {
        NAME: "",
        page: 1,
        limit: 10,
        TYPE: 2
      },
      total: 100,
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "",
      uploadurl: "http://127.0.0.1:8090/uploadfile"
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
    CreateProduct() {
      this.dialogVisible = true;
    },
    enable() {
      console.log("change");
    },
    toggleShow() {
      this.show = !this.show;
    },
    imgSuccess(res) {
      console.log(res);
    },
    imgRemove() {
      console.log("imgRemove");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      console.log("uploadDone");
    }
  },
  components: {
    "my-upload": myUpload
  }
};
</script>
<style>
.row {
  /* margin-bottom: 10px; */
}
.row div {
  font-weight: bold;
}
.row div span {
  font-weight: initial;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
}
</style>

