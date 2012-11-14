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

            jsdom.env({
              html: res_data,
              scripts: ["http://code.jquery.com/jquery.js"],
              done: function (errors, window) {
                var $ = window.$;

                scripts = $('script').get();

                var void_scripts = [],
                    app_runner_scripts = [];
                for (var i=0; i < scripts.length; i++) {
                    // Getting scripts without id and src
                    if ($(scripts[i]).attr('src') == '' && $(scripts[i]).attr('id') == ''){
                        void_scripts.push( $(scripts[i]).html() );
                        $(scripts[i]).remove();
                    }

                    // Getting app runner scripts
                   // if ($(scripts[i]).hasClass('app-runner') == true){
                    //     app_runner_scripts.push( $(scripts[i]).html() );
                    //     $(scripts[i]).remove();
                    // }
                }

                // Remove domjs scripts injection
                $("script.jsdom").remove();

                script_to_append = window.document.createElement('script');
                script_to_append.className = 'cleaned';
                script_to_append.innerHTML = void_scripts.join('\n');
                window.document.head.appendChild(script_to_append);

                // script_to_append = window.document.createElement('script');
                // script_to_append.className = 'app-runner';
                // script_to_append.innerHTML = app_runner_scripts.join('\n');
                // window.document.head.appendChild(script_to_append);

                console.log(style_html($('html').html(), opts));
              }
            });

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
