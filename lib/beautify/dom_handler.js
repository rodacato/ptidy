var jsdom = require("jsdom");

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

        html = [window.document.doctype, '<html>', window.document.documentElement.innerHTML, '</html>']
        console.log(style_html(html.join('\n'), opts));
      }
    });

}