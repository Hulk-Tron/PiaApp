angular.module('starter', ['ionic','firebase','ionic-datepicker','ngRoute'])
    .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
    inputDate: new Date(),
    setLabel: 'Set',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S" ],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        yearsList: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        templateType: 'popup',
        from: new Date(2016, 1, 1),
        to: new Date(2025, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: [6]
      };
      ionicDatePickerProvider.configDatePicker(datePickerObj);
    })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.shares', {
    url: '/shares',
    views: {
      'menuContent': {
        templateUrl: 'templates/shares.html'
      }
    }
  })
    .state('app.shares-add', {
    url: '/shares-add',
    views: {
      'menuContent': {
        templateUrl: 'templates/shares-add.html',
        controller:'AddCompany'
      }


    }
  })
    .state('app.shares-show', {
    url: '/shares-show',
    views: {
      'menuContent': {
        templateUrl: 'templates/shares-show.html',
        controller:"ShowCompany"
      }

    }
  })
      .state('app.shares-edit', {
          url: '/shares-edit/:index',
          views: {
              'menuContent': {
                  templateUrl: 'templates/shares-add-edit.html',
                  controller:"editController"
              }

          }
      })
      .state('app.convertible-edit', {
          url: '/convertible-edit/:index',
          views: {
              'menuContent': {
                  templateUrl: 'templates/convertible-add-edit.html',
                  controller:"editConvert"
              }

          }
      })
      .state('app.options-edit', {
          url: '/options-edit/:index',
          views: {
              'menuContent': {
                  templateUrl: 'templates/options-add-edit.html',
                  controller:"editOptions"
              }

          }
      })
      .state('app.warants-edit', {
          url: '/warants-edit/:index',
          views: {
              'menuContent': {
                  templateUrl: 'templates/warants-add-edit.html',
                  controller:"editWarant"
              }

          }
      })
  .state('app.options', {
      url: '/options',
      views: {
        'menuContent': {
          templateUrl: 'templates/options.html'
        }
      }
    })
      .state('app.options-add', {
    url: '/options-add',
    views: {
      'menuContent': {
        templateUrl: 'templates/options-add.html',
        controller:"optionCtrl"
      }

    }
  })
    .state('app.options-show', {
    url: '/options-show',
    views: {
      'menuContent': {
        templateUrl: 'templates/options-show.html',
        controller : 'showoption'
      }

    }
  })

  .state('app.warrants', {
      url: '/warrants',
      views: {
        'menuContent': {
          templateUrl: 'templates/warrants.html'
        }
      }
    })
        .state('app.warrants-add', {
    url: '/warrants-add',
    views: {
      'menuContent': {
        templateUrl: 'templates/warrants-add.html',
        controller: 'warants'
      }

    }
  })
    .state('app.warrants-show', {
    url: '/warrants-show',
    views: {
      'menuContent': {
        templateUrl: 'templates/warrants-show.html',
        controller:"showwarant"
      }

    }
  })

    .state('app.convertible', {
      url: '/convertible',
      views: {
        'menuContent': {
          templateUrl: 'templates/convertible.html'
        }
      }
    })
      .state('app.convertible-add', {
    url: '/convertible-add',
    views: {
      'menuContent': {
        templateUrl: 'templates/convertible-add.html',
        controller: 'convertible'
      }

    }
  })
    .state('app.convertible-show', {
    url: '/convertible-show',
    views: {
      'menuContent': {
        templateUrl: 'templates/convertible-show.html',
        controller: "cnshow"
      }

    }
  })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'summaryCtrl'
        }
      }
    })
      .state('app.single-view', {
        url: '/single-view/:companyid',
        views: {
          'menuContent': {
            templateUrl: 'templates/single-view.html',
            controller:"viewCtrl"
          }
        }
      })

      .state('app.single-view1', {
      url: '/single-view1/:companyid',
      views: {
        'menuContent': {
          templateUrl: 'templates/single-view1.html',
          controller:"viewopt"
        }
      }
    })
      .state('app.single-view2', {
        url: '/single-view2/:companyid',
        views: {
          'menuContent': {
            templateUrl: 'templates/single-view2.html',
            controller:"viewwarant"
          }
        }
      })
      .state('app.single-view3', {
        url: '/single-view3/:companyid',
        views: {
          'menuContent': {
            templateUrl: 'templates/single-view3.html',
            controller:"viewCn"
          }
        }
      })
    .state('app.summary-details', {
      url: '/summary-details',
      views: {
        'menuContent': {
          templateUrl: 'templates/summary-details.html',
            controller:"summaryCtrl"
        }
      }
    })
      .state('app.summary-details1', {
          url: '/summary-details1',
          views: {
              'menuContent': {
                  templateUrl: 'templates/summary-details1.html',
                  controller:"summaryCtrl"
              }
          }
      })
      .state('app.summary-details2', {
          url: '/summary-details2',
          views: {
              'menuContent': {
                  templateUrl: 'templates/summary-details2.html',
                  controller:"summaryCtrl"
              }
          }
      })
      .state('app.summary-details3', {
          url: '/summary-details3',
          views: {
              'menuContent': {
                  templateUrl: 'templates/summary-details3.html',
                  controller:"summaryCtrl"
              }
          }
      })
  $urlRouterProvider.otherwise('/app/home');
})
  .service('FirebaseService', function ($firebaseArray,$state) {
  var service = this;
  var ref = new Firebase('https://amber-fire-4722.firebaseio.com/Share');
  var Company = $firebaseArray(ref);
  service.getCompany = function () {
    return Company;
  };
  service.addCompany = function (company) {
    Company.$add(company);
  };
  service.updateCompany = function (contestant,index,no) {
          var use =  Company[index].$id;
          var abc = new Firebase('https://amber-fire-4722.firebaseio.com/Share/'+ no);
          var child = $firebaseArray(abc)
          abc.update(contestant).then(function(ref) {
          console.log("Saved !");

       }, function (error) {
          console.log("Error:", error);
      });
  };
  service.removeCompany = function (contestant) {
    Company.$remove(contestant);
  };
})
    .service("dataService",function(FirebaseService,filterFilter){
      var companies = FirebaseService.getCompany()
      this.getProductAt = function(index) {
        var companies = FirebaseService.getCompany()
       return companies[index]};})
   .service('FirebaseService2', function ($firebaseArray) {
    var service = this;
    var ref = new Firebase('https://amber-fire-4722.firebaseio.com/Option');
    var Options = $firebaseArray(ref);
    service.getOption = function () {
    return Options;};
    service.addOption = function (option) {
    Options.$add(option);};

    service.updateOption = function (option,index,no) {
        var use =  Options[index].$id;
        var abc = new Firebase('https://amber-fire-4722.firebaseio.com/Option/' + no);
        var child = $firebaseArray(abc)
        abc.update(option).then(function(abc) {
            console.log("Saved !");
        }, function (error) {
            console.log("Error:", error);
        });
};
    service.removeOption = function(Option) {
    Options.$remove(Option);};})
   .service('FirebaseService3', function ($firebaseArray) {
    var service = this;
    var ref = new Firebase('https://amber-fire-4722.firebaseio.com/warants');
    var warants = $firebaseArray(ref);
    service.getwarant = function () {
    return warants;};
    service.addwarant = function (warant) {
    warants.$add(warant);};
    service.updatewarant = function (warant,index,no) {
        var use =  warants[index].$id;
        var abc = new Firebase('https://amber-fire-4722.firebaseio.com/warants/' + no);
        var child = $firebaseArray(abc)
        abc.update(warant).then(function(abc) {
            console.log("Saved !");
        }, function (error) {
            console.log("Error:", error);
        });
    };
    service.removewarant = function (warant) {
    warants.$remove(warant);};})
    .service('FirebaseService4', function ($firebaseArray) {
    var service = this;
    var ref = new Firebase('https://amber-fire-4722.firebaseio.com/covertiable_notes');
    var cn = $firebaseArray(ref);
    service.getcn = function () {
    return cn;};
    service.addcn = function (cno) {
    cn.$add(cno);};
    service.updatecn = function (cno,index,no) {
        var use =  cn[index].$id
        var abc = new Firebase('https://amber-fire-4722.firebaseio.com/covertiable_notes/' + no);
        var child = $firebaseArray(abc)
        abc.update(cno).then(function(abc) {
            console.log("Saved !");
        }, function (error) {
            console.log("Error:", error);
        });
    };
      service.removecn = function (cno) {
       cn.$remove(cno);};})
    .service("dataService1",function(FirebaseService2,filterFilter){
      var option = FirebaseService2.getOption()
      this.getProductAt = function(index) {
        var option = FirebaseService2.getOption()
        return option[index]};})
    .service("dataService2",function(FirebaseService3,filterFilter){
      var warant = FirebaseService3.getwarant()
      this.getProductAt = function(index) {
        var warant = FirebaseService3.getwarant()
        return warant[index]};})
    .service("dataService3",function(FirebaseService4,filterFilter){
      var cn = FirebaseService4.getcn()
      this.getProductAt = function(index) {
        var cn = FirebaseService4.getcn()
        return cn[index]};})
