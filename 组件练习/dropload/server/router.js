/**
 * Created by zhangpeng on 2016/1/8.
 */
module.exports = function (app) {
    app.set('views','./Dropload/client/pages');
    app.get('/dropload', function (req, res) {
        res.render('index')
    })
}