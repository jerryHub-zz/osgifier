/*global require: false, provide: false, $script: false, $: false */
/*jslint browser: true, regexp: true */
(function (context) {
    "use strict";

    //We get rid of ender
    $.noConflict();

    provide("scriptjs", $script);

    $script.path('/osgifier/public/scripts/');
    $script('lib/jquery.min', 'jquery');

    $script.ready('jquery', function () {
    	$script('lib/bootstrap.min', 'bootstrap');
    	$script('lib/jquery.dataTables.min', 'dataTables');
        provide('jquery', $);
        //We get rid of jquery
        $.noConflict();
    });


}());