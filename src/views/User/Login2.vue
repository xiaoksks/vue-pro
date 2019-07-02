<template>
    <div class="bg">
        <div class="login-wrap animated flipInY">
            <h3>欢迎使用自动化登月系统</h3>
            <a-form :form="form" @submit="login">
                <a-form-item>
                    <a-input v-decorator="decorator.userName" placeholder="用户名">
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input v-decorator="decorator.password" type="password" placeholder="密码">
                        <a-icon slot="prefix" type="lock" tyle="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,}]">
                        记住密码
                    </a-checkbox>
                    <a href="" @click.prevent="openMsg">
                        忘记密码
                    </a>
                    <a-button type="primary" html-type="submit">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                decorator: {
                    userName: ['userName', {rules: [{required: true, message: '请输入用户名!'}]}],
                    password: ['password', {rules: [{required: true, message: '请输入密码!'}]}]
                }
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        methods: {
            login(e) {
                e.preventDefault();
                this.form.validateFields(
                    (err, values) => {
                        if (!err) {
                            this.$axios({
                                url: "/login",
                                method: "POST",
                                data: {
                                    userName: values.userName,
                                    password: values.password
                                }
                            }).then(res => {
                                if (res.data.msg == "success") {
                                    $cookies.set("token",res.data.id,0);
                                    $cookies.set("userName",res.data.userName,0);
                                    this.getMenu();
                                } else {
                                    alert("用户名或密码错误！")
                                    return false;
                                }
                            });
                        }
                    },
                );
            },
            getMenu() {
                this.$axios({
                    url: "getMenu",
                    method: "GET"
                }).then(res => {
                    // 提取菜单数组，交给本地存储
                    let menu = res.data.data.menu;
                    $cookies.set("menu",JSON.stringify(menu),0);
                    this.$router.push("/table")
                });
            },
            openMsg() {
                this.$message.warning('你咋不忘记自己的名字？');
            }
        },
    }
</script>

<style>
    @import "../../assets/scss/animate.min.css";
</style>
<style lang="scss">
    .bg {
        overflow: hidden;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../../assets/img/moon.jpeg');
        background-size: cover;
        background-position: center center;
        &::before {
            background-color: rgba(0, 0, 0, 0.4);
            position: absolute;
            z-index: 0;
            width: 100%;
            height: 100%;
            display: block;
            left: 0;
            top: 0;
            content: "";
        }
    }
    .login-wrap {
        width: 310px;
        padding: 30px;
        z-index: 3;
        position: relative;
        .el-form-item {
            margin-bottom: 25px !important;
        }
        h3 {
            text-align: center;
            color: #ebedef;
            margin-top: 0px;
            margin-bottom: 15px;
            font-size: 22px;
            span {
                color: #8c99e0;
            }
        }
        p {
            text-align: center;
            color: #fff;
            margin: 0;
        }
        form {
            margin-top: 25px;
            .el-form-item {
                margin-bottom: 15px;
            }
        }
        a {
            text-decoration: none;
            color: #1f2d3d;
        }
        button {
            width: 100%;
            font-weight: 600;
            border: none;
            border-radius: 0;
        }
    }
</style>
