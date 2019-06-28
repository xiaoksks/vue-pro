import Mock from "mockjs";

let debug = 1;
if (debug) {
    Mock.mock(/login/, {
        id: "@string(30)",
        "userName|1": ["张三", "李四", "王五", "路人甲", "路人乙", "路人丙", "路人丁"],
        msg: "success",
        status: "YQ-000"
    });
    Mock.mock(/getMenu/, {
        data: {
            menu: [
                {
                    name: "综合表格",
                    router: "/table",
                    icon: "table",
                    children: []
                },
                {
                    name: "绘图",
                    router: "/konva",
                    icon: "gateway",
                    children: []
                },
                {
                    name: "FontAwesome",
                    router: "/fontawesome",
                    icon: "crown",
                    children: []
                },
                {
                    name: "饿了么UI",
                    router: "/elementUI",
                    icon: "ie",
                    children: []
                },
                {
                    name: "导航测试",
                    router: "/",
                    icon: "experiment",
                    children: [{
                        name: "导航测试1",
                        router: "/testMenu1",
                        icon: "experiment",
                    },{
                        name: "导航测试2",
                        router: "/testMenu2",
                        icon: "experiment",
                    }]
                }
            ]
        },
        msg: "Success",
        status: "YQ-000"
    });
}
