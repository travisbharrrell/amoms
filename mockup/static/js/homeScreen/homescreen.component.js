var homescreen = angular.module('ams', []);

homescreen.component('homeScreen', {
    templateUrl: '/static/js/homeScreen/homescreen.template.html',
    controller: function () {
        var ctrl = this;
        ctrl.loggedIn = true;
        ctrl.passwordForm = false;
        ctrl.showPatientDetailScreen = false;
        ctrl.showUserDetailScreen = false;
        ctrl.showRxDetailScreen = false;
        ctrl.sideBarDisplayValues = [true, false, false, false];
        ctrl.contentLabel = "";
        ctrl.selectedItem = {};
        ctrl.showRx = false;
        ctrl.apptStarted = false;
        ctrl.editMode = false; 
        ctrl.patientFilter = {last: ''};
        ctrl.loggedInUser = {};
        ctrl.logInUsername = '';

        ctrl.showLogIn = function () {
            return !ctrl.loggedIn && !ctrl.passwordForm;
        };

        ctrl.showPasswordForm = function () {
            return !ctrl.loggedIn && ctrl.passwordForm;
        };

        ctrl.logIn = function () {
            if (ctrl.logInUsername.toUpperCase() === 'Practitioner'.toUpperCase()) {
                ctrl.loggedInUser = ctrl.users[1];
                ctrl.loggedIn = true;
                ctrl.passwordForm = false;
            } else if (ctrl.logInUsername.toUpperCase() === 'Receptionist'.toUpperCase()) {
                ctrl.loggedInUser = ctrl.users[0];
                ctrl.loggedIn = true;
                ctrl.passwordForm = false;
            } else if (ctrl.logInUsername.toUpperCase() === 'Admin'.toUpperCase()) {
                ctrl.loggedInUser = ctrl.users[2];
                ctrl.loggedIn = true;
                ctrl.passwordForm = false;
            } else {
                alert('Invalid Password/Username!');
            }
        };

        ctrl.goToPasswordForm = function () {
            ctrl.loggedIn = false;
            ctrl.passwordForm = true;
        };

        ctrl.goBackToUsers = function () {
            ctrl.selectedItem = {};
            ctrl.showUserDetailScreen = false;
        };

        ctrl.showPatientDetails = function (patient) {
            if (!patient) {
                ctrl.selectedItem = {
                    "name": '',
                    "middle": "",
                    "last": "",
                    "dob": "",
                    "sex": "",
                    "email": "",
                    "phone": "",
                    "address": "",
                    "occupation": "",
                    "recommendation": "",
                    "married": "",
                    "fileKey": 0,
                    "numKids": 0
                };
                ctrl.editMode = true;    
            } else {
                ctrl.selectedItem = patient;
            }
            ctrl.showPatientDetailScreen = true;
        };

        ctrl.showRxHistory = function () {
            ctrl.showRx = true;
            ctrl.showPatientDetailScreen = false;
        };

        ctrl.showUserDetail = function (user) {
            if (!user) {
                ctrl.selectedItem = {
                    username: '',
                    privLevel: '',
                    practType: '',
                    name: '',
                    dob: '',
                    startDate: '',
                    rfc: '',
                    cedula: '',
                    address: '',
                    shifts: {
                        M: {work: false, times: null},
                        T: {work: false, times: null},
                        W: {work: false, times: null},
                        R: {work: false, times: null},
                        F: {work: false, times: null},
                        St: {work: false, times: null},
                        Sn: {work: false, times: null}
                    },
                    apptLength: null,
                    phone: '',
                    active: false
                };

                ctrl.editMode = true;
            } else {
                ctrl.selectedItem = user;
                ctrl.editMode = false;
            }

            ctrl.showUserDetailScreen = true;
        };

        ctrl.savePatientDetails = function () {
            if (ctrl.editMode) {
                var existingPatient = ctrl.patients.some(function (patient) {
                    return patient.fileKey === ctrl.selectedItem.fileKey;
                });

                if (!existingPatient) {
                    ctrl.patients.push(ctrl.selectedItem);
                }
            }

            ctrl.editMode = !ctrl.editMode;
        };

        ctrl.showRxDetail = function (rx) {
            if (!rx) {
                ctrl.selectedItem = {
                    date: new Date(),
                    treatment: "",
                    pract: ctrl.loggedInUser.name
                };
                ctrl.editMode = true;
            } else {
                ctrl.selectedItem = rx;
            }

            ctrl.showRx = false;
            ctrl.showRxDetailScreen = true;
        };

        ctrl.goToPatients = function () {
            ctrl.showRx = false;
            ctrl.showPatientDetailScreen = false;
            ctrl.editMode = false;
        };

        ctrl.goBackToRx = function () {
            ctrl.showRxDetailScreen = false;
            ctrl.showRx = true;
            ctrl.editMode = false;
        };

        ctrl.saveRx = function () {
            ctrl.prescriptions.push(ctrl.selectedItem);
            ctrl.goBackToRx();
        };

        ctrl.getApptBtnLabel = function () {
            return ctrl.apptStarted ? 'End Appointment' : 'Start Appointment';  
        };

        ctrl.toggleAppt = function () {
            ctrl.apptStarted = !ctrl.apptStarted;
        };

        ctrl.getPatientName = function () {
            return ctrl.selectedItem.name + ' '
                + ctrl.selectedItem.middle + ' '
                + ctrl.selectedItem.last;
        };

        ctrl.saveNewUser = function () {
            ctrl.selectedItem.username = ctrl.selectedItem.name.toUpperCase();
            ctrl.users.push(ctrl.selectedItem);
            ctrl.showUserDetailScreen = false;
            ctrl.selectedItem = {};
        };

        ctrl.showPatients = function () {
            ctrl.contentLabel = "Patients";
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[0] === true;
        };

        ctrl.showReports = function () {
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[1] === true;
        };

        ctrl.showSchedule = function () {
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[2] === true;
        };
        
        ctrl.showAdmin = function () {
            return ctrl.loggedIn && ctrl.sideBarDisplayValues[3] === true;
        };
        
        ctrl.sideBarItems = [
            {
                name: 'Patients', 
                router: function (displayValues) {
                    ctrl.selectedItem = {};
                    displayValues[0] = true;
                    displayValues[1] = false;
                    displayValues[2] = false;
                    displayValues[3] = false;
                }
            },
            {
                name: 'Reports', 
                router: function (displayValues) {
                    ctrl.selectedItem = {};
                    displayValues[0] = false;
                    displayValues[1] = true;
                    displayValues[2] = false;
                    displayValues[3] = false;
                }
            },
            {
                name: 'Schedule', 
                router: function (displayValues) {
                    ctrl.selectedItem = {};
                    displayValues[0] = false;
                    displayValues[1] = false;
                    displayValues[2] = true;
                    displayValues[3] = false;
                }
            },
            {
                name: 'Admin', 
                router: function (displayValues) {
                    ctrl.selectedItem = {};
                    displayValues[0] = false;
                    displayValues[1] = false;
                    displayValues[2] = false;
                    displayValues[3] = true;
                }
            }
        ];

        ctrl.patients = [
            {
                "name": "Shari",
                "middle": "Lisa",
                "last": "Talley",
                "dob": "May 12, 1983",
                "sex": "female",
                "email": "lisatalley@uberlux.com",
                "phone": "+1 (938) 490-2271",
                "address": "750 Conklin Avenue, Coinjock, Virgin Islands, 2281",
                "occupation": "Teacher",
                "recommendation": "Dr Christensen",
                "married": "Widowed",
                "fileKey": 694,
                "numKids": 2
            },
            {
                "name": "Brown",
                "middle": "Griffin",
                "last": "Fowler",
                "dob": "June 11, 1993",
                "sex": "male",
                "email": "griffinfowler@uberlux.com",
                "phone": "+1 (937) 441-2403",
                "address": "472 Amboy Street, Leland, New Hampshire, 6459",
                "occupation": "Banker",
                "recommendation": "Dr Odom",
                "married": "Single",
                "fileKey": 609,
                "numKids": 2
            },
            {
                "name": "Jacobson",
                "middle": "Fuentes",
                "last": "Ferguson",
                "dob": "November 30, 1987",
                "sex": "male",
                "email": "fuentesferguson@uberlux.com",
                "phone": "+1 (906) 446-3308",
                "address": "278 Verona Place, Robinson, Kansas, 9329",
                "occupation": "Banker",
                "recommendation": "Dr Wade",
                "married": "Widowed",
                "fileKey": 255,
                "numKids": 4
            },
            {
                "name": "Carter",
                "middle": "Wells",
                "last": "Young",
                "dob": "May 08, 1988",
                "sex": "male",
                "email": "wellsyoung@uberlux.com",
                "phone": "+1 (831) 533-3788",
                "address": "782 Ridgewood Avenue, Kirk, West Virginia, 7596",
                "occupation": "Driver",
                "recommendation": "Dr Hardy",
                "married": "Single",
                "fileKey": 282,
                "numKids": 5
            },
            {
                "name": "Grant",
                "middle": "Shana",
                "last": "Roy",
                "dob": "September 10, 1985",
                "sex": "female",
                "email": "shanaroy@uberlux.com",
                "phone": "+1 (949) 466-2831",
                "address": "327 Nolans Lane, Veyo, Georgia, 2170",
                "occupation": "Driver",
                "recommendation": "Dr Tyson",
                "married": "Single",
                "fileKey": 517,
                "numKids": 4
            },
            {
                "name": "Osborn",
                "middle": "Vance",
                "last": "Kramer",
                "dob": "June 08, 1972",
                "sex": "male",
                "email": "vancekramer@uberlux.com",
                "phone": "+1 (990) 446-3752",
                "address": "803 Pitkin Avenue, Sylvanite, Mississippi, 9183",
                "occupation": "Worker",
                "recommendation": "Dr Glover",
                "married": "Widowed",
                "fileKey": 662,
                "numKids": 0
            },
            {
                "name": "Tracey",
                "middle": "Morin",
                "last": "Ward",
                "dob": "October 12, 1987",
                "sex": "male",
                "email": "morinward@uberlux.com",
                "phone": "+1 (840) 403-2894",
                "address": "418 Bushwick Avenue, Starks, Montana, 3866",
                "occupation": "Worker",
                "recommendation": "Dr Mueller",
                "married": "Single",
                "fileKey": 529,
                "numKids": 5
            },
            {
                "name": "Tasha",
                "middle": "Perez",
                "last": "Ford",
                "dob": "March 27, 2005",
                "sex": "male",
                "email": "perezford@uberlux.com",
                "phone": "+1 (898) 449-2344",
                "address": "168 Sackett Street, Bison, Massachusetts, 765",
                "occupation": "Driver",
                "recommendation": "Dr Donovan",
                "married": "Single",
                "fileKey": 264,
                "numKids": 4
            },
            {
                "name": "Rene",
                "middle": "Bette",
                "last": "Bartlett",
                "dob": "August 23, 1979",
                "sex": "female",
                "email": "bettebartlett@uberlux.com",
                "phone": "+1 (926) 403-3802",
                "address": "636 Clinton Avenue, Matheny, Louisiana, 7024",
                "occupation": "Driver",
                "recommendation": "Dr Chan",
                "married": "Divorced",
                "fileKey": 606,
                "numKids": 4
            },
            {
                "name": "Lacey",
                "middle": "Spencer",
                "last": "Franco",
                "dob": "August 13, 1974",
                "sex": "male",
                "email": "spencerfranco@uberlux.com",
                "phone": "+1 (870) 585-3853",
                "address": "481 Bevy Court, Choctaw, Hawaii, 3248",
                "occupation": "Driver",
                "recommendation": "Dr Villarreal",
                "married": "Widowed",
                "fileKey": 12,
                "numKids": 2
            },
            {
                "name": "Laurel",
                "middle": "Mcintosh",
                "last": "Hale",
                "dob": "May 02, 2001",
                "sex": "male",
                "email": "mcintoshhale@uberlux.com",
                "phone": "+1 (896) 457-3288",
                "address": "257 Grafton Street, Wildwood, Michigan, 3124",
                "occupation": "Teacher",
                "recommendation": "Dr Burton",
                "married": "Single",
                "fileKey": 966,
                "numKids": 1
            },
            {
                "name": "Lee",
                "middle": "Della",
                "last": "Tran",
                "dob": "March 12, 1984",
                "sex": "female",
                "email": "dellatran@uberlux.com",
                "phone": "+1 (820) 521-2715",
                "address": "437 Bowery Street, Wheatfields, Guam, 2394",
                "occupation": "Banker",
                "recommendation": "Dr Strickland",
                "married": "Married",
                "fileKey": 750,
                "numKids": 0
            },
            {
                "name": "Lelia",
                "middle": "Hutchinson",
                "last": "Ball",
                "dob": "August 03, 1972",
                "sex": "male",
                "email": "hutchinsonball@uberlux.com",
                "phone": "+1 (827) 555-3490",
                "address": "979 Whitney Avenue, Roderfield, New York, 5599",
                "occupation": "Worker",
                "recommendation": "Dr Herman",
                "married": "Widowed",
                "fileKey": 71,
                "numKids": 4
            },
            {
                "name": "Kellie",
                "middle": "Robinson",
                "last": "Moreno",
                "dob": "October 02, 1990",
                "sex": "male",
                "email": "robinsonmoreno@uberlux.com",
                "phone": "+1 (854) 439-2432",
                "address": "365 Varanda Place, Curtice, Louisiana, 2218",
                "occupation": "Banker",
                "recommendation": "Dr Santana",
                "married": "Divorced",
                "fileKey": 835,
                "numKids": 1
            },
            {
                "name": "Hannah",
                "middle": "Coleen",
                "last": "Lowery",
                "dob": "December 23, 1974",
                "sex": "female",
                "email": "coleenlowery@uberlux.com",
                "phone": "+1 (841) 468-3885",
                "address": "599 Bedford Place, Richford, Oklahoma, 2090",
                "occupation": "Banker",
                "recommendation": "Dr Conley",
                "married": "Married",
                "fileKey": 898,
                "numKids": 4
            },
            {
                "name": "Tamera",
                "middle": "Herman",
                "last": "Barnett",
                "dob": "December 22, 1993",
                "sex": "male",
                "email": "hermanbarnett@uberlux.com",
                "phone": "+1 (979) 530-2085",
                "address": "187 Christopher Avenue, Homeworth, Federated States Of Micronesia, 6556",
                "occupation": "Driver",
                "recommendation": "Dr Baker",
                "married": "Married",
                "fileKey": 773,
                "numKids": 2
            },
            {
                "name": "Huffman",
                "middle": "Ferguson",
                "last": "Bates",
                "dob": "April 05, 2001",
                "sex": "male",
                "email": "fergusonbates@uberlux.com",
                "phone": "+1 (858) 515-3730",
                "address": "337 Coleridge Street, Longbranch, Nebraska, 3108",
                "occupation": "Worker",
                "recommendation": "Dr Nixon",
                "married": "Divorced",
                "fileKey": 340,
                "numKids": 6
            }
        ];
        
        ctrl.appointments = [
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Shari Talley",
                "patientPhone":"7705551212",
                "datetime":"2016-12-04T10:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Brown Fowler",
                "patientPhone":"7705552212",
                "datetime":"2016-12-04T11:00:00",
                "state":"M"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Carter Young",
                "patientPhone":"7705553212",
                "datetime":"2016-12-04T12:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Jacobson Ferguson",
                "patientPhone":"7705554212",
                "datetime":"2016-12-04T13:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Grant Roy",
                "patientPhone":"7705555212",
                "datetime":"2016-12-04T14:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Osorn Kramer",
                "patientPhone":"7705556212",
                "datetime":"2016-12-05T10:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Tracey Ward",
                "patientPhone":"7705557212",
                "datetime":"2016-12-05T11:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Tasha Ford",
                "patientPhone":"7705558212",
                "datetime":"2016-12-05T13:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Rene Bartlett",
                "patientPhone":"7705559212",
                "datetime":"2016-12-05T14:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Lacey Franco",
                "patientPhone":"7705551211",
                "datetime":"2016-12-06T10:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Laurel Hale",
                "patientPhone":"7705551213",
                "datetime":"2016-12-06T11:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Lee Tran",
                "patientPhone":"7705551214",
                "datetime":"2016-12-06T13:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Lelia Ball",
                "patientPhone":"7705551215",
                "datetime":"2016-12-06T14:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Kellie Moreno",
                "patientPhone":"7705551216",
                "datetime":"2016-12-06T15:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Hannah Lowery",
                "patientPhone":"7705551217",
                "datetime":"2016-12-06T16:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Tamera Barnett",
                "patientPhone":"7705551218",
                "datetime":"2016-12-05T10:00:00",
                "state":"C"
            },
            {
                "practitioner":"Nutritionist Guy",
                "patient":"Huffman Bates",
                "patientPhone":"7705551219",
                "datetime":"2016-12-01T10:00:00",
                "state":"M"
            }
        ];

        ctrl.filterFutureAppt = function(appointment)
        {
            return (new Date(appointment.datetime)) > (new Date());
        }
        
        ctrl.filterMissedAppt = function(appointment)
        {
            var now = new Date();
            var lastWeek = (new Date()).setDate(now.getDate() - 7);
            var apptDate = new Date(appointment.datetime);
            
            return (appointment.state == 'M' && lastWeek < apptDate && apptDate <= now);
        }
        
        ctrl.medicalEvents = [
            {
                "date": "October 24, 1974",
                "event": "Proident ea ad consectetur aliquip occaecat quis reprehenderit amet irure est laboris."
            },
            {
                "date": "December 09, 1979",
                "event": "Sit ut in id laborum sunt ut dolor cillum ex veniam."
            },
            {
                "date": "November 03, 1974",
                "event": "Reprehenderit ut reprehenderit labore magna incididunt tempor tempor non occaecat cupidatat duis."
            },
            {
                "date": "December 31, 1987",
                "event": "Occaecat officia excepteur eiusmod nulla consequat ex dolore sunt."
            }
        ];

        ctrl.medicalNotes = [
            {
                "date": "May 21, 1973",
                "recordingDr": "Dr Rodriguez Brock",
                "note": "Occaecat aliqua ex cupidatat dolor proident officia voluptate sunt tempor nostrud quis adipisicing sunt."
            },
            {
                "date": "June 27, 1981",
                "recordingDr": "Dr Kelsey Jacobs",
                "note": "Lorem aliqua qui pariatur est et labore elit fugiat sit tempor fugiat."
            },
            {
                "date": "August 05, 2016",
                "recordingDr": "Dr Sosa Whitehead",
                "note": "Tempor deserunt deserunt duis sint dolor ullamco reprehenderit sint exercitation amet."
            }
        ];

        ctrl.users = [
            {
                username: 'Receptionist',
                privLevel: 'Receptionist',
                practType: null,
                name: 'Receptionist One',
                dob: 'August 05, 1970',
                startDate: 'September 10, 2006',
                rfc: '213123123123',
                cedula: null,
                address: '123 Sydney Blvd Marcus, Ga',
                shifts: {
                    M: {work: true, times: '8a-5p'},
                    T: {work: true, times: '8a-5p'},
                    W: {work: true, times: '8a-5p'},
                    R: {work: true, times: '8a-5p'},
                    F: {work: true, times: '8a-5p'},
                    St: {work: false, times: null},
                    Sn: {work: false, times: null}
                },
                apptLength: null,
                phone: '123-345-1234',
                active: true
            },
            {
                username: 'Practitioner',
                privLevel: 'Practitioner',
                practType: 'Nutritionist',
                name: 'Nutritionist Guy',
                dob: 'January 09, 1988',
                startDate: 'May 10, 2014',
                rfc: '213123123123',
                cedula: '12312312312312',
                address: '600 Walker Way Marcus, Ga',
                shifts: {
                    M: {work: true, times: '8a-5p'},
                    T: {work: false, times: null},
                    W: {work: true, times: '8a-5p'},
                    R: {work: false, times: null},
                    F: {work: true, times: '8a-5p'},
                    St: {work: false, times: null},
                    Sn: {work: false, times: null}
                },
                apptLength: null,
                phone: '312-313-1234',
                active: true
            },
            {
                username: 'Admin',
                privLevel: 'Admin',
                practType: null,
                name: 'Admin One',
                dob: 'July 24, 1988',
                startDate: 'September 10, 2006',
                rfc: '213123123123',
                cedula: '12312312312312',
                address: '10 Peachtree St Atlanta, Ga',
                shifts: {
                    M: {work: true, times: '8a-5p'},
                    T: {work: true, times: '8a-5p'},
                    W: {work: true, times: '8a-5p'},
                    R: {work: true, times: '8a-5p'},
                    F: {work: true, times: '8a-5p'},
                    St: {work: false, times: null},
                    Sn: {work: false, times: null}
                },
                apptLength: null,
                phone: '123-345-1234',
                active: true
            }
        ];

        ctrl.prescriptions = [
            {
                "date": "01 June, 2007",
                "treatment": "Dolore ex cillum nisi Lorem eu proident est dolore adipisicing ut adipisicing.",
                "pract": "Dr Brooks"
            },
            {
                "date": "08 October, 1999",
                "treatment": "Culpa ea veniam adipisicing ut nulla est aute consectetur dolor duis eiusmod irure esse voluptate.",
                "pract": "Dr Petty"
            },
            {
                "date": "20 December, 2004",
                "treatment": "Lorem culpa aliquip quis cillum dolore consequat incididunt et amet exercitation do tempor.",
                "pract": "Dr Hopper"
            },
            {
                "date": "25 February, 2000",
                "treatment": "Sit consequat qui cupidatat sint.",
                "pract": "Dr Hensley"
            },
            {
                "date": "27 July, 2000",
                "treatment": "Deserunt reprehenderit sunt laborum tempor est amet dolore pariatur reprehenderit nisi anim tempor.",
                "pract": "Dr Lindsey"
            },
            {
                "date": "26 December, 2002",
                "treatment": "Fugiat esse sunt culpa proident.",
                "pract": "Dr Delgado"
            },
            {
                "date": "12 April, 2001",
                "treatment": "Elit est qui adipisicing ea non cillum magna eiusmod sint.",
                "pract": "Dr Rowe"
            }
        ];

        ctrl.loggedInUser = ctrl.users[1];
    }
});