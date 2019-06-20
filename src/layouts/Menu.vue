<template>
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <h3 class="logo">
            <img src="../assets/img/Vue.png">
            <span>{{logoText}}</span>
        </h3>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.path]">
            <template v-for="item in menu">
                <a-sub-menu v-if="item.children.length !== 0" :key="item.router">
                    <template slot="title">
                        <a-icon :type="item.icon"/>
                        <span>{{item.name}}</span>
                    </template>
                    <a-menu-item v-for="child in item.children" @click="skip(child.router)" :key="child.router">
                        <span>{{child.name}}</span>
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item v-else :key="item.router" @click="skip(item.router)">
                    <a-icon :type="item.icon"/>
                    <span>{{item.name}}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script>
    export default {
        props: ["collapsed"],
        data() {
            return {
                logoText: "I LOVE YOU",
                menu: localStorage.menu ? JSON.parse(localStorage.menu) : []
            }
        },
        methods: {
            skip(e) {
                this.$router.push(e)
            }
        },
        watch: {
            collapsed: {
                handler(newName, oldName) {
                    if (newName) {
                        this.logoText = "";
                    } else {
                        this.common.sleep(200).then(() => {
                            this.logoText = "I LOVE YOU"
                        });
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #components-layout-demo-custom-trigger .logo {
        height: 28px;
        margin: 16px;
        color: #fff;
        padding-left: 10px;
        line-height: 28px;
        font-size: 20px;
    }
    #components-layout-demo-custom-trigger .logo img {
        margin-top: -6px;
        margin-right: 10px;
    }
</style>
