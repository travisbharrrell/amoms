var homescreen = angular.module('ams', []);

homescreen.component('homeScreen', {
    templateUrl: '/static/js/homeScreen/homescreen.template.html',
    controller: function () {
        this.loggedIn = false;
        this.passwordForm = false;
        this.sideBarDisplayValues = [true, false, false, false];

        this.loggedInUser = 'Doctor Rockso';

        this.showLogIn = function () {
            return !this.loggedIn && !this.passwordForm;
        };

        this.showPasswordForm = function () {
            return !this.loggedIn && this.passwordForm;
        };

        this.logIn = function () {
            this.loggedIn = true;
            this.passwordForm = false;
        };

        this.goToPasswordForm = function () {
            this.loggedIn = false;
            this.passwordForm = true;
        };

        this.showPatients = function () {
            return this.loggedIn && this.sideBarDisplayValues[0] === true;
        };

        this.showSchedule = function () {
            return this.loggedIn && this.sideBarDisplayValues[1] === true;
        };

        this.showReports = function () {
            return this.loggedIn && this.sideBarDisplayValues[2] === true;
        };

        this.showAdmin = function () {
            return this.loggedIn && this.sideBarDisplayValues[3] === true;
        };
        
        this.sideBarItems = [
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
    }
});