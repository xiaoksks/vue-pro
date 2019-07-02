<template>
    <a-layout-sider width="220px" :trigger="null" collapsible v-model="isCollapse">
        <h3 class="logo">
            <img src="../assets/img/Vue.png">
            <span>{{logoText}}</span>
        </h3>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.path]" :defaultOpenKeys="defaultOpenKeys"
                @select="selectMenu">
            <template v-for="item in menu">
                <a-sub-menu v-if="item.children.length !== 0" :key="item.key">
                    <template slot="title">
                        <a-icon style="font-size: 16px" :type="item.icon"/>
                        <span>{{item.name}}</span>
                    </template>
                    <a-menu-item v-for="child in item.children" :key="child.router">
                        <a-icon style="font-size: 16px" :type="child.icon"/>
                        <span>{{child.name}}</span>
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item v-else :key="item.router">
                    <a-icon style="font-size: 16px" :type="item.icon"/>
                    <span>{{item.name}}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script>
    const logoText = "On The Moon";
    export default {
        computed: {
            isCollapse() {
                return this.$store.state.isCollapse
            }
        },
        data() {
            return {
                logoText: logoText,
                menu:[
                    {
                        name: "综合表格",
                        router: "/table",
                        icon: "table",
                        children: []
                    },
                    {
                        name: "绘图",
                        router: "/konva",
                        icon: "gateway",
                        children: []
                    },
                    {
                        name: "FontAwesome",
                        router: "/fontawesome",
                        icon: "crown",
                        children: []
                    },
                    {
                        name: "饿了么UI",
                        router: "/elementUI",
                        icon: "ie",
                        children: []
                    },
                    {
                        name: "导航测试",
                        key: "menuTest",
                        icon: "experiment",
                        children: [{
                            name: "导航测试1",
                            router: "/testMenu1",
                            icon: "experiment",
                        },{
                            name: "导航测试2",
                            router: "/testMenu2",
                            icon: "experiment",
                        }]
                    }
                ],
                defaultOpenKeys:[],
            }
        },
        methods: {
            selectMenu(item){
                this.$router.push(item.key)
                this.changeSelectedMenu(item.key)
            },
            changeSelectedMenu(key){
                let menu = this.menu;
                for(let i=0;i<menu.length;i++){
                    if(menu[i].children.length ==0){
                        if(this.menu[i].router == key){
                            this.$store.commit('selectedMenu',{
                                icon:this.menu[i].icon,
                                title:this.menu[i].name,
                            })
                            return;
                        }
                    }else{
                        for(let j=0;j<menu[i].children.length;j++){
                            if(this.menu[i].children[j].router == key){
                                this.$store.commit('selectedMenu', {
                                    icon:this.menu[i].children[j].icon,
                                    title:this.menu[i].children[j].name,
                                    parent:{
                                        icon:this.menu[i].icon,
                                        title:this.menu[i].name,
                                    }
                                })
                                this.defaultOpenKeys = [this.menu[i].key]
                                return;
                            }
                        }
                    }
                }
            }
        },
        created(){
            this.changeSelectedMenu(this.$route.path)
        },
        watch: {
            isCollapse: {
                handler(newName, oldName) {
                    if (newName) {
                        this.logoText = "";
                    } else {
                        this.common.sleep(200).then(() => {
                            this.logoText = logoText
                        });
                    }
                }
            },
        }
    }
</script>

<style>
    .logo {
        height: 28px;
        margin: 16px;
        color: #fff;
        line-height: 28px;
        font-size: 20px;
    }
    .logo img {
        margin-top: -6px;
        margin-right: 10px;
    }
    .ant-menu span {
        font-size: 16px;
    }
    .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow:before {
        background: rgba(255, 255, 255, 1) !important;
    }
    .ant-menu-submenu-title:hover .ant-menu-submenu-arrow {
        opacity: 1 !important;
    }
</style>
