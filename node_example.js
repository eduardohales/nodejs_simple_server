const http = require('http');

function fib(n) {
    if(n > 1){
        return fib(n-1) + fib(n-2)
    } else {
        return n;
    }
}

const server = http.createServer(function (request, response) {
    let url = request.url;
    let data = url.split('?');

    if(data[0] === '/suma') {
        var suma = 0;
        var input = data[1].split('&');
        input.forEach(function(numero) {
            var splitted = numero.split('=')[1];
            if(isNumeric(splitted)) {
                //Ok, it's a number
                var number = Number(splitted);
                suma += number
            } else {
                //It's not a number, so we show an error message and sends to the client
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
            }
        });
        //If everithing was OK, we send code 200 response, using json format
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({result: suma}))
    }

    if(data[0] === '/mult') {
        var mult = 1;
        var input = data[1].split('&');
        input.forEach(function (numero) {
            var splitted = numero.split('=')[1];
            if (isNumeric(splitted)) {
                //Ok, it's a number
                var number = Number(splitted);
                mult *= number;
            } else {
                //It's not a number, so we show an error message and sends to the client
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({result: 'error, el input debe ser numerico'}))
            }
        });
        //If everithing was OK, we send code 200 response, using json format
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({result: mult}))
    }

    if(data[0] === '/fibonacci') {
        var mult = 1;
        var input = data[1].split('&')[0];
        var fibonacci;
        console.log(input)
        var splitted = input.split('=')[1];
        if (isNumeric(splitted)) {
            //Ok, it's a number
            var number = Number(splitted);
            fibonacci = fib(number);
        } else {
            //It's not a number, so we show an error message and sends to the client
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({result: 'error, el input debe ser numerico'}))
        }
        //If everithing was OK, we send code 200 response, using json format
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({result: fibonacci}))
    }
});

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
    //isNaN returns false if the input is a number, true otherwise
    return !isNaN(num)
}

server.listen(8080);