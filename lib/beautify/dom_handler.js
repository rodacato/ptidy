var jsdom = require("jsdom"),
	opts = {
        'indent_size': 4,
        'indent_char': ' ',
        'max_char': 78,
        'brace_style': 'expand',
        'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u']
      };


function traverse_dom(html){
    jsdom.env({
      html: html,
      scripts: ["http://code.jquery.com/jquery.js"],
      done: function (errors, window) {
        var $ = window.$,
            scripts = $('script').get(),
            void_scripts = [],
            app_runner_scripts = [];

        for (var i=0; i < scripts.length; i++) {
            // Getting scripts without id and src
            if ($(scripts[i]).attr('src') == '' && $(scripts[i]).attr('id') == ''){
                void_scripts.push( $(scripts[i]).html() );
                $(scripts[i]).remove();
            }
        }

        // Remove domjs scripts injection
        $("script.jsdom").remove();

        script_to_append = window.document.createElement('script');
        script_to_append.className = 'cleaned';
        script_to_append.innerHTML = void_scripts.join('\n');
        window.document.head.appendChild(script_to_append);

        html = [window.document.doctype, '<html xmlns="http://www.w3.org/1999/xhtml">', window.document.documentElement.innerHTML, '</html>']
        console.log(style_html(html.join('\n'), opts));
      }
    });

}