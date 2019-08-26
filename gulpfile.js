const {src, dest, series} = require('gulp');

function build(cb) {
    src('dist/**/*').pipe(dest('dist'));
    cb();
};

exports.build = build;
exports.default = series( build );