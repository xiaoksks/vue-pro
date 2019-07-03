<template>
    <a-layout>
        <Menu />
        <a-layout>
            <Header />
            <a-layout-content :style="{ margin: '20px 16px', minHeight: 'auto',padding: '24px', background:'#fff'}">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="textAlign: center;font-size: 18px;padding:0 50px 20px 50px;">
                VUE ©2019 自动化科技有限公司
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    import Header from "./Header";
    import Menu from "./Menu";

    export default {
        components: {
            Header,
            Menu,
        }
    }
</script>
<style >

</style>

