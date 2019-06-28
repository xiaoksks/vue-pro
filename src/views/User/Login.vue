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
        <vue-particles
                color="#fff"
                :particleOpacity="0.7"
                :particlesNumber="30"
                shapeType="star"
                :particleSize="5"
                linesColor="#fff"
                :linesWidth="2"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >
        </vue-particles>
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
                                url: "/api/login",
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
        position: relative;
        overflow: hidden;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../../assets/img/moon.jpeg');
        background-size: contain;

        #particles-js {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }

    .login-wrap {
        width: 370px;
        border-radius: 5px;
        padding: 20px;
        z-index: 3;
        margin-right: -60%;
        background: rgba(216, 220, 229, 0.5);

        .el-form-item {
            margin-bottom: 25px !important;
        }

        h3 {
            text-align: center;
            color: #ebedef;
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
