import restify from 'restify';
import fs from 'fs';

function googlerespond(req, res, next) {
  console.log(req.body);
  res.send('ok');
  next();
}


var server = restify.createServer({
  certificate: fs.readFileSync('./cert.pem'),
  key: fs.readFileSync('./key.pem'),
  passphrase: 'qwerty'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.post('/google/callback', googlerespond);
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

