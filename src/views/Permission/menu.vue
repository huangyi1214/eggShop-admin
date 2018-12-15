<template>
  <div class="app-container">
        <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="CreateProduct">新增</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width:100%">
      
            <el-table-column align="center" label="编号" width="160">
        <template slot-scope="scope">
          {{ scope.row.NAME}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="200">
        <template slot-scope="scope">
         {{ scope.row.TITLE}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updatemenu(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="menudelete(scope.row.ID)">删除</el-button>
        </template>
      </el-table-column>
      

     </el-table>
    <!-- <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div> -->

<el-dialog title="菜单管理" :visible.sync="dialogVisible" >
  
      <el-form>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="编号">
              <input type="text" v-model="form.NAME" placeholder="请输入编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称">
              <input type="text" v-model="form.TITLE" placeholder="请输入名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        
        
      </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button v-if="form.ID==''" type="primary" @click="menucreate()">确 定</el-button>
    <el-button v-else type="primary" @click="menuupdate()">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { menucreate , menuupdate , menudelete , menuquery } from "@/api/Permission";




export default {
  
  
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      form: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      table: {
        actions: "操作"
      }
    };
  },
  created() {
    this.fetchData();
  },
    
    
  methods: {
    fetchData() {
      this.listLoading = true;
      menuquery(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

    menucreate(){
        let self=this;
        menucreate(this.form).then(response => {
            console.log("response.data:" + JSON.stringify(response.data));
            self.fetchData();
            self.dialogVisible=false;
        });
    },

    menuupdate(){
        let self=this;
        menuupdate(this.form).then(response => {
            console.log("response.data:" + JSON.stringify(response.data));
            self.fetchData();
            self.dialogVisible=false;
        });
    },
    
    menudelete(ID){
        let self=this;
        menudelete({ID:ID}).then(response => {
            console.log("response.data:" + JSON.stringify(response.data));
            self.fetchData();
            self.dialogVisible=false;
        });
    },
    updatemenu(row){
        this.form=Object.assign(row,{});
        this.dialogVisible=true;
    },
    CreateProduct() {
      this.form = {
        ID: "",
        NAME: "",
        TITLE: ""
      };
      this.dialogVisible = true;
    },
    
    
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

