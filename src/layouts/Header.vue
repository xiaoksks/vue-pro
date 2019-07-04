<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="isCollapse ? 'menu-unfold' : 'menu-fold'" @click="trigger"/>
        <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item>
                <a-icon type="home"/>
                <span>首页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-if="selectedMenu != null && selectedMenu.parent != null">
                <a-icon :type="selectedMenu.parent.icon"/>
                <span>{{selectedMenu.parent.title}}</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-if="selectedMenu != null">
                <a-icon :type="selectedMenu.icon"/>
                <span>{{selectedMenu.title}}</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="header">
            <a-dropdown>
                <a>
                    <a-avatar :size="50" :src="require('../assets/img/user.jpg')"/>
                    <span>{{username}}</span>
                    <a-icon style="margin-left: 10px;font-size: 16px;" type="caret-down"/>
                </a>
                <a-menu slot="overlay" style="top:25px;width: 150px;">
                    <a-menu-item key="1" @click="logout">
                        <a-icon type="logout"/>
                        退出
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script>
    export default {
        computed: {
            isCollapse() {
                return this.$store.state.isCollapse
            },
            selectedMenu() {
                return this.$store.state.selectedMenu
            }
        },
        data() {
            return {
                username: $cookies.get("username") || ''
            }
        },
        methods: {
            trigger() {
                this.$store.commit('collapse')
            },
            logout() {
                this.$router.push("/login");
                $cookies.remove("token");
            }
        }
    };
</script>

<style scoped lang="scss">
    .header {
        float: right;
        margin-right: 30px;
    }

    a {
        text-decoration: none;
        color: #000;
    }

    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }
    .breadcrumb {
        display: inline-block;
        line-height: 64px;
        font-size: 18px;
        i {
            font-size: 18px;
        }
    }
    .ant-breadcrumb {
        color: rgba(0, 0, 0, 0.65) !important;
    }

    .trigger:hover {
        color: #1890ff;
    }
</style>
