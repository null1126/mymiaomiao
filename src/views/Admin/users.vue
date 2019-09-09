<template>
  <div>
    <el-table :data="nowTable" style="width: 100%">
      <el-table-column fixed prop="userHead" label="用户头像" width="250">
        <template slot-scope="scope"><img :src="scope.row.userHead" alt=""></template>
      </el-table-column>
      <el-table-column fixed prop="date" label="注册日期" width="250"></el-table-column>
      <el-table-column prop="username" label="姓名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="isAdmin" label="管理员状态" width="150">
        <template slot-scope="scope">{{ scope.row.isAdmin ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.isfreeze ? '已冻结' : '未冻结'}}</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "Users",
  methods: {},
  data() {
    return {
      tableData: [],
      currentPage: 1, //当时展示第几页
      pageSize: 3 //一页展示多少条数据
    };
  },
  computed: {
    nowTable() {
      return (
        this.tableData.slice(
          ( this.currentPage - 1 ) * this.pageSize,
          this.currentPage * this.pageSize
        ) || []
      );
    }
  },
  methods: {
    //修改账号冻结状态
    handleEdit(index, row) {
      this.axios
        .post("/api2/admin/updatefreeze", {
          email: row.email,
          isfreeze: !row.isfreeze
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$alert("账号冻结状态修改成功", "账号冻结", {
              confirmButtonText: "确定",
              callback: action => {
                //改变当前索引的冻结状态
                this.tableData[index].isfreeze = !row.isfreeze;
              }
            });
            return;
          }
          this.$alert("账号冻结状态修改失败", "账号冻结", {
            confirmButtonText: "确定"
          });
        });
    },
    //删除账号操作
    handleDelete(index, row) {
      this.axios
        .post("/api2/admin/deleteuser", {
          email: row.email
        })
        .then(res => {
          if (res.data.status === 0) {
            this.$alert("账号删除成功", "账号删除", {
              confirmButtonText: "确定",
              callback: action => {
                //将当前行删除
                this.tableData.splice(index, 1);
              }
            });
            return;
          }
          this.$alert("账号删除失败", "账号删除", {
            confirmButtonText: "确定"
          });
        });
    }
  },
  mounted() {
    this.axios.get("/api2/admin/userList").then(res => {
      if (res.data.status === 0) {
        this.tableData = res.data.data.userList;
      }
    });
  }
};
</script>
<style scoped>
</style>

