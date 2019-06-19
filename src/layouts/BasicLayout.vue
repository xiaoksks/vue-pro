<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <Menu v-bind:collapsed="collapsed"/>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"/>
                <Header/>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    import Header from "./Header";
    import Menu from "./Menu";

    export default {
        data() {
            return {
                collapsed: false
            }
        },
        components: {
            Header,
            Menu,
        }
    }
</script>
<style>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }
</style>

