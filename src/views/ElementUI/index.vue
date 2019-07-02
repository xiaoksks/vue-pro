<template>
    <div>
        <el-table
                :data="tableData"
                :header-row-style="{color: '#4d4d4d'}"
                :header-cell-style="{background: '#fafafa'}"
                border
        >
            <el-table-column
                    :show-overflow-tooltip="true"
                    prop="date"
                    label="日期"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip="true"
                    prop="name"
                    label="姓名"
                    width="180"
            >
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip="true"
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
        <br/>
        <el-button @click="clickButton">默认按钮</el-button>
        <el-button @click="aaa">默认按钮</el-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        Table
    } from 'element-ui';
    Vue.use(Table);
    export default {
        data() {
            return {
                tableData: []
            }
        },
        mounted(){
            //如果不这样在页面加载完毕之后塞数据，在ie中宽度自适应会错误
          this.tableData = [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
          }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
          }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
          }]
        },
        methods: {
            aaa(){
                alert()
            },
            clickButton() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>
<style>
    .table {
        width: 100%
    }
</style>
