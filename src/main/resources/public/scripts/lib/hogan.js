/*global require: false, provide: false, Hogan: false */
/*jslint browser: true, regexp: true */
(function (context) {
    "use strict";

    var $script = require("scriptjs");

    $script('lib/hogan-2.0.0', 'hogan');

    $script.ready('hogan', function () {
        provide('hogan', Hogan);
    });
}());
