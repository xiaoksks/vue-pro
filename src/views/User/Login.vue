<template>
    <div class="bg">
        <div class="login-wrap animated flipInY">
            <h3>欢迎使用自动化系统</h3>
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
                                    this.$router.push("/")
                                } else {
                                    alert("用户名或密码错误！")
                                    return false;
                                }
                            });
                        }
                    },
                );
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
        height:100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;
        background-image: url('../../assets/img/city.jpeg');
    }

    .login-wrap {
        position:absolute;
        top:50%;
        left:50%;
        margin:-150px 0 0 -200px;

        width: 370px;
        border-radius: 5px;
        padding: 20px;
        z-index: 3;
        background: rgba(38, 104, 198, 0.55);

        .el-form-item {
            margin-bottom: 25px !important;
        }

        h3 {
            text-align: center;
            color: #fff;
            margin-top: 0px;
            margin-bottom: 5px;

            span {
                color: #fff;
            }
        }

        form {
            margin-top: 25px;

            .el-form-item {
                margin-bottom: 15px;
            }

            span {
                color: #fff;
            }
        }

        a {
            text-decoration: none;
            float: right;
            color: #fff;
        }

        button {
            width: 100%;
            font-weight: 600;
        }
    }
</style>
