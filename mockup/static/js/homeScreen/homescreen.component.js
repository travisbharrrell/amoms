var homescreen = angular.module('ams', []);

homescreen.component('homeScreen', {
    templateUrl: '/static/js/homeScreen/homescreen.template.html',
    controller: function () {
        var ctrl = this;
        ctrl.loggedIn = false;
        ctrl.passwordForm = false;
        ctrl.sideBarDisplayValues = [true, false, false, false];
        ctrl.contentLabel = "";

        ctrl.loggedInUser = 'Doctor Rockso';

        ctrl.showLogIn = function () {
            return !ctrl.loggedIn && !ctrl.passwordForm;
        };

        ctrl.showPasswordForm = function () {
            return !ctrl.loggedIn && ctrl.passwordForm;
        };

        ctrl.logIn = function () {
            ctrl.loggedIn = true;
            ctrl.passwordForm = false;
        };

        ctrl.goToPasswordForm = function () {
            ctrl.loggedIn = false;
            ctrl.passwordForm = true;
        };

        ctrl.showPatients = function () {
            ctrl.contentLabel = "Patients";
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[0] === true;
        };

        ctrl.showSchedule = function () {
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[1] === true;
        };

        ctrl.showReports = function () {
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[2] === true;
        };

        ctrl.showAdmin = function () {
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[3] === true;
        };
        
        ctrl.sideBarItems = [
            {
                name: 'Patients', 
                router: function (displayValues) {
                    displayValues[0] = true;
                    displayValues[1] = false;
                    displayValues[2] = false;
                    displayValues[3] = false;
                }
            },
            {
                name: 'Reports', 
                router: function (displayValues) {
                    displayValues[0] = false;
                    displayValues[1] = true;
                    displayValues[2] = false;
                    displayValues[3] = false;
                }
            },
            {
                name: 'Schedule', 
                router: function (displayValues) {
                    displayValues[0] = false;
                    displayValues[1] = false;
                    displayValues[2] = true;
                    displayValues[3] = false;
                }
            },
            {
                name: 'Admin', 
                router: function (displayValues) {
                    displayValues[0] = false;
                    displayValues[1] = false;
                    displayValues[2] = false;
                    displayValues[3] = true;
                }
            }
        ];

        ctrl.patients = [
            {
                name: 'Tom',
                middle: 'Jim',
                last: '2',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '3',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '4',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '5',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '6',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '7',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '8',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '9',
            },
            {
                name: 'Tom',
                middle: 'Jim',
                last: '10',
            },
        ]
    }
});