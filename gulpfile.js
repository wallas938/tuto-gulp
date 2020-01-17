const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
/**
 * 
 *  -- TOP LEVEL FUNCTIONS --
 * gulp.task - Defines tasks -
 * gulp.src - Points to files to use -
 * gulp.dest - Points to folder to output -
 * gulp.watch - Watch files and folders for changes -
 * 
 */

//Configures livereload with nodemon
gulp.task('nodemon', () => {
    nodemon({
        script: 'server.js',
        ext: 'src/*.html src/sass/*.scss src/js/*.js',
        //env: { 'NODE_ENV': 'development' }
    })
})

// Logs Message with gulp
gulp.task('message', async function() {
    return console.log('Gulp is running...')
});

//Copy all html files
gulp.task('copyHtml', async function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('imageMin', async function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

//Minifies JS
gulp.task('jsMin', async function() {
    gulp.src('src/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

//Compiles Sass and implement a case error
gulp.task('sass', async function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass()
            .on('error', () => sass.logError))
        .pipe(gulp.dest('dist/css'))
});

//Combines many files in one file
gulp.task('processJsFiles', async function() {
    gulp.src('src/js/*.js')
        .pipe(uglify()
            .on('error', () => uglify.logError))
        .pipe(concat('main.js')
            .on('error', () => concat.logError))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', gulp.parallel(['processJsFiles']));
    gulp.watch('src/images/*', gulp.parallel(['imageMin']));
    gulp.watch('src/sass/*.scss', gulp.parallel(['sass']));
    gulp.watch('src/*.html', gulp.parallel(['copyHtml']));
});

/*  Make a default task with just the 'gulp' command that will
    launch all declared tasks in the array parameter  */
gulp.task('default', gulp.series(['message', 'processJsFiles', 'copyHtml', 'imageMin', 'sass', 'nodemon']));