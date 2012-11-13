var fs = require('fs');

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
        res.on('end', function() { console.log(res_data); });
    }).on('error', function(e) {
        return console.log(e.message);
    });
} else {
    fs.readFile(arguments[0], 'utf8', function (err,data) {
        if (err) { return console.log(err); }
        console.log(style_html(data, opts));
    });
}

