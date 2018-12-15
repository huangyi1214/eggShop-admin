<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="Createrole">新增</el-button>
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
      <el-table-column align="center" label="名称" width="160">
        <template slot-scope="scope">{{ scope.row.NAME}}</template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="200">
        <template slot-scope="scope">{{ scope.row.descrition}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="360">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updaterole(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="roledelete(scope.row.ID)">删除</el-button>
          <el-button type="primary" size="mini" @click="showuserrole(scope.row)">用户角色关系</el-button>
          <el-button type="primary" size="mini" @click="showrolemenuquery(scope.row.ID)">角色菜单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>-->
    <el-dialog title="角色管理" :visible.sync="dialogVisible">
      <el-form>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="名称">
              <input type="text" v-model="form.NAME" placeholder="请输入名称">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述">
              <input type="text" v-model="form.descrition" placeholder="请输入描述">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="form.ID==''" type="primary" @click="rolecreate()">确 定</el-button>
        <el-button v-else type="primary" @click="roleupdate()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配信贷经理" :visible.sync="dialogVisibleroleuser">
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
          :value="item.userID"
        ></el-option>
      </el-select>
      <span>
        <el-button type="primary" @click="userrolecreate()">添加</el-button>
      </span>

      <el-table
        v-loading="listLoading"
        :data="userlist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="width:100%"
      >
        <el-table-column align="center" label="姓名" width="160">
          <template slot-scope="scope">{{ scope.row.NAME}}</template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="360">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="f_userroledelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleroleuser = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="菜单管理" :visible.sync="dialogVisiblemenu">
      <el-table
        v-loading="listmenuLoading"
        :data="menulist"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="width:100%"
      >
        <el-table-column align="center" label width="60">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.ischeck"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column align="center" label="菜单编号" width="160">
          <template slot-scope="scope">{{ scope.row.menuname}}</template>
        </el-table-column>

        <el-table-column align="center" label="菜单名称" width="160">
          <template slot-scope="scope">{{ scope.row.menutitle}}</template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rolemenuedit()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  rolecreate,
  roleupdate,
  roledelete,
  rolequery,
  userrolecreate,
  userroledelete,
  userrolequery,
  rolemenuquery,
  rolemenuedit,
  queryuserforadmin
} from "@/api/Permission";
import { querymanager } from "@/api/order";

export default {
  data() {
    return {
      list: null,
      userlist: null,
      menulist: null,
      listLoading: true,
      dialogVisible: false,
      dialogVisibleroleuser: false,
      dialogVisiblemenu: false,
      form: {},
      role: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      table: {
        actions: "操作"
      },
      managerID: "",
      manager_select: [],
      selectroleID: null,
      listmenuLoading: false
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.listLoading = true;
      rolequery(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

    rolecreate() {
      let self = this;
      rolecreate(this.form).then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        self.fetchData();
        self.dialogVisible = false;
      });
    },

    roleupdate() {
      let self = this;
      roleupdate(this.form).then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        self.fetchData();
        self.dialogVisible = false;
      });
    },

    roledelete(ID) {
      let self = this;
      roledelete({ ID: ID }).then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        self.fetchData();
        self.dialogVisible = false;
      });
    },
    updaterole(row) {
      this.form = Object.assign(row, {});
      this.dialogVisible = true;
    },
    Createrole() {
      this.form = {
        ID: "",
        NAME: "",
        descrition: ""
      };
      this.dialogVisible = true;
    },

    showuserrole(row) {
      let self = this;
      this.dialogVisibleroleuser = true;
      this.role = Object.assign(row, {});
      this.userrolequery();
    },
    userrolequery() {
      let self = this;
      userrolequery({ id: this.role.ID }).then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        self.userlist = response.data;
      });
    },
    userrolecreate() {
      userrolecreate({ userID: this.managerID, roleID: this.role.ID }).then(
        response => {
          this.userrolequery();
        }
      );
    },
    f_userroledelete(id) {
      console.log("id:" + id);
      userroledelete({ ID: id }).then(response => {
        this.userrolequery();
      });
    },
    showrolemenuquery(ID) {
      //rolemenuquery
      let self = this;
      self.selectroleID = ID;
      rolemenuquery({ roleID: ID }).then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        self.menulist = response.data;
        for (let i = 0; i < self.menulist.length; i++) {
          if (self.menulist[i].ischeck == 1) {
            self.menulist[i].ischeck = true;
          } else {
            self.menulist[i].ischeck = false;
          }
        }
        self.dialogVisiblemenu = true;
      });
    },
    rolemenuedit() {
      this.listmenuLoading = true;
      let self = this;
      for (let i = 0; i < self.menulist.length; i++) {
        if (self.menulist[i].ischeck == true) {
          self.menulist[i].ischeck = 1;
        } else {
          self.menulist[i].ischeck = 0;
        }
      }
      rolemenuedit({
        roleID: self.selectroleID,
        menus: JSON.stringify(self.menulist)
      }).then(response => {
        console.log("response.data:" + JSON.stringify(response.data));
        self.menulist = response.data;
        self.dialogVisiblemenu = false;
        this.listmenuLoading = false;
      });
    },
    remoteMethod(query) {
      let self = this;
      queryuserforadmin({ query: query }).then(response => {
        self.manager_select = response.data;
        console.log(
          "self.manager_select:" + JSON.stringify(self.manager_select)
        );
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
a {
  text-decoration: underline;
  color: blueviolet;
}
</style>

