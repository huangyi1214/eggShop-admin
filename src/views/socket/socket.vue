<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入信息" v-model="message" style="width: 200px;" class="filter-item"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="sendmessage">发送定位</el-button>
      <el-input
        
        placeholder="请输入token"
        v-model="token"
        style="width: 200px;"
        class="filter-item"
      />

      <el-button
       
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="oauth"
      >身份认证</el-button>

      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox>-->
    </div>

    <div class="pagination-container">
      <!-- <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/> -->
    </div>
    <div><img src="http://127.0.0.1:8090/getqrcode">
    </div>

    <el-dialog title :visible.sync="dialogVisible">
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList, getType,  setIsadmin, setIsinternal } from "@/api/manager";
// import managerdetail from "@/components/managerDetail"

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
      message:'',
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
      busnessTypes: [],
      iscreateroom:true,
      room:undefined,
      token:undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        if(route.query && route.query.room)
        {
            console.log('room:'+route.query.room);
            this.iscreateroom=false;
            this.room=route.query.room;
            this.$socket.emit('joinroom', this.room);
        }
        else
        {
            this.iscreateroom=true;
        }
      },
      immediate: true
    }
  },
  sockets:{
    connect: function(){
      console.log('socket connected')
      this.$socket.emit('authentication',{token:'f6b21e8ff1da1a6560de951fdba915d1'});
    
    },
  
  disconnect:function(){
      console.log('断开连接');
  },
    timing: function(val){
      console.log(val);
    },
    message:function(val){
        console.log(val);
    },
    order:function(val){
      console.log('order'+JSON.stringify(val));
    },
    authenticated:function(data){
      console.log(JSON.stringify(data));
    },
    positionresult:function(data){
      console.log('定位结果:'+JSON.stringify(data));
    },
    oauthresult:function(data)
    {
      console.log('认证结果:'+JSON.stringify(data));
    }
  },
  created() {
    this.fetchData();
      this.$socket.emit('connect', '');
      if(this.$route.query.room){
          console.log('room:'+this.$route.query.room);
      }
  },
  methods: {
    fetchData() {
        this.listLoading = false;
    //   this.listLoading = true;
    //   getList(this.listQuery).then(response => {
    //     this.list = response.data;
    //     this.listLoading = false;
    //     this.total = response.count.count;
    //   });
    //   getType().then(response => {
    //       console.log('response.data:'+JSON.stringify(response.data))
    //     this.busnessTypes = response.data;
    //   });
    },
    showDetail(row) {
    //   this.form = Object.assign(row, {});
    //   this.dialogVisible = true;
    //   console.log("row:" + JSON.stringify(row));
    },
    
    
    dialogFormVisible() {
      this.dialogVisible = false;
    },
    handleFilter() {
      console.log("query:" + JSON.stringify(this.listQuery));
      this.fetchData();
    },
    oauth(){
        this.$socket.emit('oauth', {token:this.token});
    },
    sendmessage(){
      console.log('上报定位信息');
        this.$socket.emit('findmanger', {longitude:166.489356,latitude:39.926224,busnessType:1});
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

