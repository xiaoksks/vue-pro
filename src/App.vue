<template>
    <a-locale-provider :locale="locale">
        <div id="app">
            <router-view></router-view>
        </div>
    </a-locale-provider>
</template>

<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        name: 'app',
        data() {
            return {
                locale: zhCN,
            }
        },
    }
</script>

<style lang="scss">
    /*引入全局样式*/
    @import "assets/scss/global.scss";
</style>
