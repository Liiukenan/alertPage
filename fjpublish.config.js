module.exports = {
  modules: [
    {
      name: "测试环境",
      env: "build",
      ssh: {
        host: "54.222.180.211",
        username: "ubuntu",
        //rc版本的user选项和userName选项请在未来统一配置为username
        //privateKey为认证在服务器的公钥对应的私钥地址，请灵活变通
        privateKey: require("fs").readFileSync(
          "/Users/liukenan/.ssh/id_rsa"
        ) //mac用户举例
      },
      buildCommand: "build",
      localPath: "build",
      remotePath: "/data/www/alertPage"
    }
  ]
};
// fjpublish env -s

// fjpublish env -s --nobackup
