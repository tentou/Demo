var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith');

//gulp.spritesmith用法
gulp.task('sprite', function () {
    var spriteData = gulp.src('static/sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        padding: 4
    }));
    return spriteData.pipe(gulp.dest('path/to/output/'));
});
