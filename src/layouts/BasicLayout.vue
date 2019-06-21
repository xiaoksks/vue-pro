<template>
    <a-layout>
        <Menu :collapsed="collapsed" :selectedMenu.sync="selectedMenu"/>
        <a-layout>
            <Header :collapsed.sync="collapsed" :selectedMenu="selectedMenu"/>
            <a-layout-content :style="{ margin: '24px 16px', minHeight: '280px',padding: '24px', background:'#fff'}">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="textAlign: center;font-size: 18px;padding:0 50px 16px 50px;">
                On The Moon ©2019 自动化登月科技有限公司
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    import Header from "./Header";
    import Menu from "./Menu";

    export default {
        data() {
            return {
                collapsed: false,
                selectedMenu:null
            }
        },
        components: {
            Header,
            Menu,
        }
    }
</script>
<style >

</style>

