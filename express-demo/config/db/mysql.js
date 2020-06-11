//mysql配置
module.exports = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    //database: 'userdb',
    connectTimeout: 1000 * 10,
    port:3306,
    multipleStatements: true
  }
}
