<template>
    <a-layout-sider width="220px" :trigger="null" collapsible v-model="isCollapse">
        <h3 class="logo">
            <img src="../assets/img/Vue.png">
            <span>{{logoText}}</span>
        </h3>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.path]" @select="selectMenu">
            <template v-for="item in menu">
                <a-sub-menu v-if="item.children.length !== 0">
                    <template slot="title">
                        <a-icon style="font-size: 16px" :type="item.icon"/>
                        <span>{{item.name}}</span>
                    </template>
                    <a-menu-item v-for="child in item.children" @click="skip(child.router)" :key="child.router">
                        <a-icon style="font-size: 16px" :type="child.icon"/>
                        <span>{{child.name}}</span>
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item v-else :key="item.router" @click="skip(item.router)">
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
            },
            menu(){
                let menu =  $cookies.get("menu");
                return menu ? JSON.parse(menu) : []
            }
        },
        data() {
            return {
                logoText: logoText
            }
        },
        methods: {
            skip(e) {
                this.$router.push(e)
            },
            selectMenu(item){
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
            }
        }
    }
</script>

<style scoped>
    .logo {
        height: 28px;
        margin: 16px;
        color: #fff;
        padding-left: 8px;
        line-height: 28px;
        font-size: 20px;
    }
    .logo img {
        margin-top: -6px;
        margin-right: 10px;
    }
    .logo img {
        margin-top: -6px;
        margin-right: 10px;
    }
    .ant-menu span{
        font-size: 16px;
    }
</style>
