'use strict';
var path = require('path');
var express = require('express');
var app = express();
var i18n = require('i18next');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

i18n.init({
    saveMissing      : true,
    debug            : true,
    detectLngFromPath: 0,
    supportedLngs    : ['en', 'fr'],
    fallbackLng      : 'en'
});

//it is important to put this line before the "view engine" middleware
app.use(i18n.handle);
app.set('view engine', 'jade');
app.set('view cache', false);
app.set('views', __dirname + '/public/views');
app.use(express.static(path.join(__dirname, 'public')));

i18n.registerAppHelper(app);

/*
 * Routes
 */

app.get('/:lang?', function (req, res) {
    res.render('index', {root: __dirname + '/public/views'});
    //res.render('index');
});

/*
 * Start it up
 */
app.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});