module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    parser: 'babel-eslint',
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
        sourceType: 'module',
    },
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        node: true,
        browser: true,
    },
    rules: {
        "no-console": "off"
    }
}
