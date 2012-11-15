var fs = require('fs');

eval(fs.readFileSync('lib/beautify/beautify.js','utf8'));
eval(fs.readFileSync('lib/beautify/beautify-html.js','utf8'));
eval(fs.readFileSync('lib/beautify/dom_handler.js','utf8'));

var arguments = process.argv.splice(2),
	stdin = undefined,
	url = undefined,
	path = undefined;


// Getting flags variable
arguments.forEach(function(arg) {
  if (arg == "—p" || arg == "—-path"){
    path = arguments[2][1];
  }

  if ((arg == "—u") || (arg == "--url")){
    url = arguments[2][1];
  }
})


if ( url !== undefined ){
    http = require('http');

    http.get(url, function(res) {
        var res_data = '';
        res.on('data', function(chunk) { res_data += chunk; });
        res.on('end', function() {
           return traverse_dom(res_data);
        });
    }).on('error', function(e) {
        return console.log(e.message);
    });
} 


if ( path !== undefined ) {
    fs.readFile(path, 'utf8', function (err,data) {
        if (err) { return console.log(err); }
		return traverse_dom(res_data);
    });
}

if (arguments.length == 0){
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function (chunk) {
	  stdin = chunk;
	});

	process.stdin.on('end', function () {
	  return traverse_dom(stdin);
	});
}