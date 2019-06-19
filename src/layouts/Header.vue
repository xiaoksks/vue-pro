<template>
    <div class="header">
        <a-dropdown>
            <a>
                <a-avatar :size="50" :src="require('../assets/img/user.jpg')"/>
                <span>{{userName}}</span>
            </a>
            <a-menu slot="overlay" style="top:25px;width: 150px;">
                <a-menu-item key="1" @click="logout">
                    <a-icon type="logout"/>
                    退出
                </a-menu-item>
            </a-menu>
        </a-dropdown>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: localStorage.userName || ''
            }
        },
        methods: {
            logout(){
                delete localStorage.token;
                this.$router.push("/login")
            }
        }
    };
</script>

<style scoped>
    .header {
        float: right;
        margin-right: 30px;
    }

    a {
        text-decoration: none;
        color: #000;
    }
</style>
