// Generated on 2014-07-20 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  var modRewrite = require('connect-modrewrite');

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    konga: {
      deployDest: 'dist/'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js', 'app/docs/inner/**/*.js'],
        tasks: ['newer:jshint:all', 'concat:util', 'ngdocs'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      docs: {
        files: ['<%= yeoman.app %>/docs/**/*'],
        tasks: ['ngdocs'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      css: {
        files: ['<%= yeoman.app %>/styles/**/*.css'],
        tasks: ['concat:css'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      html: {
        files: ['<%= yeoman.app %>/views/**/*.html'],
        tasks: ['ngtemplates'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['serve']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9010,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              // modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.gif|\\.jpg|\\.jpeg|\\.ttf|\\.eot|\\.woff|\\.less|\\.ico$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/static',
                connect.static('./static')
              ),
              connect.static('./dist'),
              connect().use(
                '/docs',
                connect.static('./docs')
              ),
              connect().use(
                '/images',
                connect.static('./app/images')
              ),
              connect.static(appConfig.app),
              function (req, res, next) {
                // res.setHeader('Access-Control-Allow-Credentials', true);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                // a console.log('foo'); here is helpful to see if it runs
                return next();
              }
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        // reporter: require('jshint-stylish')
        reporter: require('jshint-html-reporter'),
        reporterOutput: 'jshint-report.html'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/*.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      docs: {
        files: [{
          dot: true,
          src: 'docs'
        }]
      },
      server: '.tmp',
      deploy: {
        files: [{
          dot: true,
          src: [
            '<%= konga.deployDest %>{,*/}*',
            '!<%= konga.deployDest %>WEB-INF', // For Java webapps
            '!<%= konga.deployDest %>WEB-INF/{,*/}*' // For Java webapps
          ]
        }],
        options: {
          force: true
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/docs/docs.html'],
        ignorePath:  /\.\.\//,
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/{{filePath}}" type="text/javascript"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          //'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    useminPrepare: {
      html: '<%= yeoman.app %>/docs/docs.html',
      options: {
        dest: 'lib',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              // js: ['concat'], //, 'uglifyjs'
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.app %>/docs/docs.html'],
      // js: ['dist/scripts/{,*/}*.js'],
      css: ['<%= yeoman.app %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.app %>','<%= yeoman.app %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          'lib/konga.js': [
            'lib/konga.js'

          ],
          'lib/vendor.js': [
            'lib/vendor.js'
          ],
          'docs/js/vendor.js': [
            'docs/js/vendor.js'
          ]
        },
        options: {
          banner: '/* konga v1.2.0 - Released under MIT license - http://konga.io/ */',
          mangle: false,
          screwIE8: true
        }
      }
    },
    concat: {
      css: {
        src: ['app/styles/*.css', 'app/styles/custom/*.css'],
        dest: 'lib/konga.css'
      },
      scss: {
        src: ['app/styles/*.css', 'app/styles/custom/*.css'],
        dest: 'lib/konga.scss'
      },
      app4doc: {
        src: ['app/scripts/**/*.js', 'dist/scripts/config.js', 'dist/scripts/views.js'],
        dest: 'app/docs/app-scripts.js'
      },
      lib: {
        src: ['app/scripts/**/*.js', 'dist/scripts/config.js', 'dist/scripts/views.js'],
        dest: 'lib/konga.js'        
      },
      lib_vendor: {
        options: {
          banner: '/* Konga vendor file. Including non npm-managed dependencies */'
        },
        src: ['bower_components/angular-dialog-service/dialogs.min.js'],
        dest: 'lib/konga.vendor.js'
      },
      vendor_css: {
        dest: 'lib/vendor.css',
        src: [
          'bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/angular-dialog-service/dialogs.min.css',
          'bower_components/angular-motion/dist/angular-motion.css',
          'bower_components/fullcalendar/dist/fullcalendar.css',
          'bower_components/angular-ui-tree/dist/angular-ui-tree.min.css'
        ]
      },
      vendor_js: {
        dest: 'lib/vendor.js',
        src: [
          'bower_components/es5-shim/es5-shim.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'bower_components/moment/moment.js',
          'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-translate/angular-translate.js',
          'bower_components/angular-dialog-service/dialogs.min.js',
          'bower_components/angular-dialog-service/dialogs-default-translations.min.js',
          'bower_components/angular-file-upload/angular-file-upload.min.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-strap/dist/angular-strap.js',
          'bower_components/angular-strap/dist/angular-strap.tpl.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
          'bower_components/fullcalendar/dist/fullcalendar.js',
          'bower_components/angular-ui-calendar/src/calendar.js',
          'bower_components/jquery-ui/jquery-ui.js',
          'bower_components/angular-ui-sortable/sortable.js',
          'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
          'bower_components/json3/lib/json3.js',
          'bower_components/ng-file-upload/angular-file-upload.js'
        ]
       },
       vendor_doc: {
        dest: 'docs/js/vendor.js',
        src: [
          'bower_components/es5-shim/es5-shim.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'bower_components/moment/moment.js',
          'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-translate/angular-translate.js',
          'bower_components/angular-dialog-service/dialogs.min.js',
          'bower_components/angular-dialog-service/dialogs-default-translations.min.js',
          'bower_components/angular-file-upload/angular-file-upload.min.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-strap/dist/angular-strap.js',
          'bower_components/angular-strap/dist/angular-strap.tpl.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
          'bower_components/fullcalendar/dist/fullcalendar.js',
          'bower_components/angular-ui-calendar/src/calendar.js',
          'bower_components/jquery-ui/jquery-ui.js',
          'bower_components/angular-ui-sortable/sortable.js',
          'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
          'bower_components/json3/lib/json3.js',
          'bower_components/ng-file-upload/angular-file-upload.js'
        ]
       }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '*.jsp',
            'app.js',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'locale/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/ionicons/fonts/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      bower_fonts: {
        expand: true,
        flatten: true,
        cwd: 'bower_components',
        src: '**/fonts/*.{ttf,woff,svg}',
        dest: 'dist/fonts/'
      },

      deploy: {
        expand: true,
        cwd: 'dist',
        src: [
          '**/styles/**',
          '{,*/}*',
          'config.js'
        ],
        dest: '<%= konga.deployDest %>'
      },
      index: {
        expand: true,
        cwd: 'app',
        src: ['index.html'],
        dest: 'dist'
      },
      deployIndex: {
        expand: true,
        cwd: 'dist',
        src: ['**/index-html'],
        dest: '<%= konga.deployDest %>'
      },
      deployApp: {
        expand: true,
        cwd: 'app',
        src: [
        	'**/images/**',
        	'**/locale/**',
        	'**/scripts/**',
        	'**/styles/**',
        	'**/404.html',
        	'**/.htaccess',
        	'**/robots.txt',
        	'**/favicon.ico',

        ],
        dest: '<%= konga.deployDest %>'
      },
      deployVendor: {
        expand: true,
        src: 'bower_components/**',
        dest: '<%= konga.deployDest %>'
      },
      vendor4doc: {
        cwd: 'dist/scripts/',
        expand: true,
        src: 'vendor.js',
        dest: 'docs/'
      },
      cloud_deployment: {
        files: [
          {
            src: 'app.yaml',
            dest: 'docs/'
          },
          {
            expand: true,
            cwd: 'app',
            src: '**/images/**',
            dest: 'docs/'
          },
          {
            expand: true,
            src: 'static/**',
            dest: 'docs'
          }
        ]
      }
    },

    rename: {
      deployIndex: {
        src: '<%= konga.deployDest %>index.html',
        dest: '<%= konga.deployDest %>index.jsp'
      }
    },

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
        dest: '<%= yeoman.dist %>/scripts/config.js',
      },
      all: {
        constants: {
          i18n: {
            es: grunt.file.readJSON('app/locale/messages_es.json'),
            en: grunt.file.readJSON('app/locale/messages_en.json'),
            fr: grunt.file.readJSON('app/locale/messages_fr.json'),
          }
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      dist: [
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    ngtemplates: {
      'konga': {
        cwd: 'app/',
        src: 'views/**/**.html',
        dest: 'dist/scripts/views.js',
        options:  {
          url:    function(url) { return '/konga/' + url; }
        }
      }
    },

    ngdocs: {
      options: {
        html5Mode: false,
        title: 'Konga - The web-form generator',
        startPage: '/home',
        template: 'app/docs/docs.html',
        bestMatch: true,
        analytics: {
          account: 'UA-68065842-1'
        },
        scripts: [
          'lib/konga.js',
          'app/docs/scripts/template-overrides.js'
        ],
        styles: [
          'app/docs/styles/template-overrides.css',
          'lib/konga.css',
          'lib/vendor.css'

        ],
        image: 'http://konga.io/images/konga-logo-white.png',
        imageLink: '/'
      },
      home: {
        title: 'Home',
        src: [
          'app/docs/static/home.js'
        ]
      },
      'quick-start': {
        title: 'Quick Start',
        src: [
          'app/docs/static/quick-start/**/*.js'
        ]
      },
      'learning-series': {
        api: true,
        title: 'Learning Series',
        src: [
          'app/docs/static/resources/**/*.js'
        ]
      },
      api: {
        title: 'API Reference',
        src: [
          'app/docs/static/api-reference/**/*.js',
          'app/scripts/**/*.js'
        ]
      },
    },
    replace: {
      strict: {
        src: ['lib/konga.js'],             // source files array (supports minimatch)
        dest: 'lib/konga.js',             // destination directory or file
        replacements: [
          {
            from: '\'use strict\';',
            to: ''
          }
        ]
      }
    },
    mocha: {
      test: {
        src: ['test/spec/**/*.js'],
      },
    }
  });

  grunt.registerTask('compile', 'Compile the sources for deployment on an environment', function(target) {
  	grunt.task.run([
  		'clean:server',
		  'clean:dist',
		  'ngconstant',
		  'ngtemplates',
		  'copy:bower_fonts',
      'concat:css',
      'concat:scss',
      'concat:app4doc',
      'concat:vendor_css',
      'concat:vendor_js',
		  'ngdocs',
		  'wiredep',
		  'autoprefixer',
      'concat:vendor_doc'
  	]);
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['bngld', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'compile:development',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', 'Compile then start a connect web server', function (target) {

    var tasks = ['mocha'];
    if(target !== 'unit') {
      tasks = tasks.concat([
        'clean:server',
        'autoprefixer',
        'connect:test',
      ]);
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:bower_fonts',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('minify-vendor', [
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'cssmin:generated',
    'usemin'
  ]);


  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('lib', [
    'clean:deploy',
    'compile:deploy',
    'copy:index',
    'copy:deployApp',
    'copy:deploy', 
    'copy:deployIndex',
    'concat:vendor_css',
    'concat:vendor_js',
    'concat:lib',
    'concat:lib_vendor',
    'replace:strict',
    'uglify',
    'copy:cloud_deployment'
  ]);

  grunt.registerTask('doc', [
    'concat:app4doc',
    'copy:vendor4doc',
    'ngdocs'
  ]);

  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-daemon');
};