var homescreen = angular.module('ams', []);

homescreen.component('homeScreen', {
    templateUrl: '/static/js/homeScreen/homescreen.template.html',
    controller: function () {
        this.messages = {
            hello: 'HELLO WORLD'
        }
    }
});