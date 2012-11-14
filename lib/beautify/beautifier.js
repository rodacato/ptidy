var fs = require('fs'),
    jsdom = require("jsdom");

eval(fs.readFileSync('lib/beautify/beautify.js','utf8'));
eval(fs.readFileSync('lib/beautify/beautify-html.js','utf8'));

var arguments = process.argv.splice(2),
    opts = {
        'indent_size': 4,
        'indent_char': ' ',
        'max_char': 78,
        'brace_style': 'expand',
        'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u']
      };

if ( /^http/i.test(arguments[0]) ){
    http = require('http');

    http.get(arguments[0], function(res) {
        var res_data = '';
        res.on('data', function(chunk) { res_data += chunk; });
        res.on('end', function() {
            jsdom.env(
              res_data,
              ["http://code.jquery.com/jquery.js"],
              function(errors, window) {
                  var generic_scripts = window.$("script:not('[id]'):not('[src]')"),
                      result_generic_scripts = generic_scripts.map(function(i,val){ return window.$(val).html(); }).get().join('\n');

                  // Cleaning script tags
                  generic_scripts.remove();

                  // Remove domjs jquer injection
                  window.$("script.jsdom").remove();

                  window.$('<script type="text/javascript" chartset="utf-8">').html(result_generic_scripts).appendTo('head');
                  console.log(style_html(window.$('html').html(), opts));
              }
            );
        });
    }).on('error', function(e) {
        return console.log(e.message);
    });
} else {
    fs.readFile(arguments[0], 'utf8', function (err,data) {
        if (err) { return console.log(err); }
        console.log(style_html(data, opts));
    });
}