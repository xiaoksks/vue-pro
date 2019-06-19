<template>
    <a-row style="height: 100%;">
        <a-col :span="5" style="height: 100%;">
            <h2>树</h2>
            <a-tree
                    :loadData="onLoadData"
                    :treeData="treeData"
            >
            </a-tree>
        </a-col>
        <a-col :span="19" style="height: 100%">
            <h2>表格</h2>
            <div style="margin-bottom: 10px;">
                <a-button type="primary" @click="remove(record.id)">
                    <a-icon type="plus"/>
                    添加
                </a-button>
            </div>
            <a-table bordered rowKey="id" :dataSource="dataSource" :columns="columns" :pagination="pagination"
                     @change="aaa">
                <span slot="operation" slot-scope="text,record">
                    <a-button type="danger" size="small" @click="remove(record.id)">删除</a-button>
                </span>
            </a-table>
            <br/>
        </a-col>
    </a-row>
</template>

<script>
    export default {
        data() {
            return {
                treeData: [
                    {
                        title: '树1',
                        key: '0',
                    },
                    {title: '树2', key: '1'},
                    {title: '树3', key: '2', isLeaf: true},
                ],
                dataSource: [{
                    id: '0',
                    name: '张三',
                    age: '123',
                }, {
                    id: '1',
                    name: '李四',
                    age: '321',
                }],
                pagination: {
                    total: 4,
                    pageSize: 2,
                },
                columns: [{
                    title: '姓名',
                    dataIndex: 'name',
                    width: '500px',
                }, {
                    title: '年龄',
                    dataIndex: 'age',
                    width: '500px',
                }, {
                    title: '操作',
                    dataIndex: 'operation',
                    align: "center",
                    scopedSlots: {customRender: 'operation'},
                }],
            }
        },
        methods: {
            onLoadData(treeNode) {
                return new Promise((resolve) => {
                    if (treeNode.dataRef.children) {
                        resolve()
                        return
                    }
                    setTimeout(() => {
                        treeNode.dataRef.children = [
                            {title: '子1', key: `${treeNode.eventKey}-0`},
                            {title: '子2', key: `${treeNode.eventKey}-1`},
                        ]
                        this.treeData = [...this.treeData]
                        resolve()
                    }, 1000)
                })
            },
            aaa(pagination, filters, sorter) {
                if (pagination.current == 1) {
                    this.dataSource = [{
                        id: '0',
                        name: '张三',
                        age: '123',
                    }, {
                        id: '1',
                        name: '李四',
                        age: '321',
                    }]
                } else {
                    this.dataSource = [{
                        id: '2',
                        name: '王五',
                        age: '333',
                    }, {
                        id: '3',
                        name: '赵六',
                        age: '322221',
                    }]
                }

            },
            remove(id) {
                const dataSource = [...this.dataSource]
                this.dataSource = dataSource.filter(item => item.id !== id)
            }
        }
    }
</script>

<style>
    span.ant-tree-node-content-wrapper {
        width: 90%;
        height: 35px !important;
        line-height: 35px !important;
    }

    span.ant-tree-switcher {
        height: 35px !important;
        line-height: 35px !important;
    }

    .ant-tree-switcher-loading-icon {
        height: 35px !important;
        line-height: 35px !important;
    }
</style>
