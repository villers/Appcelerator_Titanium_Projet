"use strict";

/*
 * recupére les parametre de l'activité
 */
$.params = arguments[0] || {};

/*
 * chargement des libs
 */
var App = require('core');
var Request = require('http');

/*
 * configure le nom de l'activité
 */
App.globalWindow.title = $.params.text;

if (Ti.App.Properties.hasProperty('login'))
    $.login.value = Ti.App.Properties.getString('login');
if (Ti.App.Properties.hasProperty('password'))
    $.password.value = Ti.App.Properties.getString('password');

function doLogin() {
    var query = {
        url: 'https://intra.epitech.eu/user/'+ $.login.value +'/?format=json',
        type: 'POST',
        format: 'JSONP',
        data: {
            login: $.login.value,
            password: $.password.value
        },
        success: function(json) {
            Ti.App.Properties.setString('login', $.login.value);
            Ti.App.Properties.setString('password', $.password.value);

            App.Navigator.open('dashboard', {
                data: json,
                text: 'Dashboard'
            });
        },
        failure: function(json) {
            if (Ti.App.Properties.hasProperty('login'))
                $.login.value = Ti.App.Properties.removeProperty('login');
            else
                $.login.value = '';

            if (Ti.App.Properties.hasProperty('password'))
                $.password.value = Ti.App.Properties.removeProperty('password');
            else
                $.password.value = '';

            $.error.setText('Erreur de connexion');
        }
    };
    Request(query);
}