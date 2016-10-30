var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    st = require('st'),
    http = require('http');

gulp.task('server', function (done){
    http.createServer(
        st({path: __dirname + '/app', index: 'index.html', cache: false})
    ).listen(3000, done);
});
