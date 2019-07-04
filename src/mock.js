import Mock from "mockjs";

let debug = 1;
if (debug) {
    Mock.mock(/login/, {
        id: "@string(30)",
        "username|1": ["影魔", "幻影刺客", "邪影芳灵"],
        msg: "success",
        status: "YQ-000"
    });
}
