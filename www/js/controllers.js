angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};
     $scope.com ={}
      $scope.addCom = function(eve){
        alert("imran")
      }
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
      $scope.imran = function(){
        alert("hello")
      }
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('AppCtrl', function($scope) {
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true;

})

    .controller("AddCompany",function($scope,FirebaseService,ionicDatePicker,$ionicPopup,$filter,$state){
        //$scope.investment = ($scope.Company.price)*($scope.Company.share);
        var ipObj1 = {
            callback : function (val) {
                return $scope.Company.vest = val;
            },
            //disabledDates: [
            //    new Date(2016, 2, 16),
            //    new Date(2015, 3, 16),
            //    new Date(2015, 4, 16),
            //    new Date(2015, 5, 16),
            //    new Date('Wednesday, August 12, 2015'),
            //    new Date("08-16-2016"),
            //    new Date(1439676000000)
            //],
            //from: new Date(2016, 1, 1), //Optional
            //to: new Date(2018, 10, 30), //Optional
            // inputDate: new Date(),      //Optional
            //mondayFirst: false,          //Optional
            //disableWeekdays: [0],       //Optional
            //closeOnSelect: false,       //Optional
            //templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.Company = {'name':'',acq:"",vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        $scope.$watchGroup(['Company.price','Company.share'], function () {
            return $scope.Company.Invest = $scope.Company.price*$scope.Company.share  });
        $scope.$watchGroup(['Company.share','Company.fmv'], function () {
            return $scope.Company.value = $scope.Company.share * $scope.Company.fmv  });
        $scope.$watchGroup(['Company.saleipo','Company.imp'], function () {
            return $scope.Company.vali = Math.round($scope.Company.saleipo * ($scope.Company.imp/100))  });
        $scope.$watchGroup(['Company.ipo','Company.share'], function () {
            return $scope.Company.imp = $scope.Company.ipo * $scope.Company.share});
        $scope.$watchGroup(['Company.Invest','$scope.value'], function () {
            var total = 0
            if($scope.Company.Invest > 0){
                total = 0
                 total = Math.round((($scope.Company.value / $scope.Company.Invest)-1)*100)
                return $scope.Company.up = Math.abs(total)
            }else{
                return $scope.Company.up = 0}});
        $scope.$watch('Company.vest', function (newValue) {
            $scope.Company.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');
        });
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucessfull!',
                template: 'Data saved sucessfully'
            });

            alertPopup.then(function(res) {
                $state.go("app.shares")
            })
        }
        $scope.addcompany = function(eve){
            FirebaseService.addCompany($scope.Company)
            console.log($scope.Company)
            $scope.showAlert()}})



 .controller("ShowCompany",function(FirebaseService,$scope,ionicDatePicker,$ionicPopup,$ionicListDelegate){
                 $scope.companies = FirebaseService.getCompany();
                $scope.moveItem = function(iq, fromIndex, toIndex) {
                    $scope.companies.splice(fromIndex, 1);
                   $scope.companies.splice(toIndex, 0, iq);
                    };
               $scope.delete = function(index) {
               FirebaseService.removeCompany(index)
               };
        $scope.movie = ""
         $scope.edit = function (iq) {
            $ionicListDelegate.closeOptionButtons();
        }
           })
        .controller("viewCtrl",function($scope,FirebaseService,$stateParams, dataService){
         $scope.iqq = dataService.getProductAt($stateParams.companyid);
         $scope.date = function () {
            var date =  new Date($scope.iqq.vest);
            date.setDate(date.getDate() + 1);
            return date
        }





    }
)
    .controller("optionCtrl",function($scope,FirebaseService2,ionicDatePicker,$ionicPopup,$filter,$state){
        //$scope.investment = ($scope.Company.price)*($scope.Company.share);
        var ipObj1 = {
            callback : function (val) {
                return $scope.option.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016, 8, 1), //Optional
            to: new Date(2025, 8, 1), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.option = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        $scope.$watchGroup(['option.fmv','option.share','option.price'], function () {
            return $scope.option.value = Math.abs(($scope.option.fmv * $scope.option.share) -($scope.option.share * $scope.option.price))  });
        $scope.$watchGroup(['option.value','option.saleipo'], function () {
            return $scope.option.vali = Math.round($scope.option.imp * ($scope.option.saleipo/100))});
        $scope.$watchGroup(['option.ipo','option.share','option.price'], function () {
            return $scope.option.imp = Math.abs(($scope.option.ipo* $scope.option.share)-($scope.option.share*$scope.option.price))});

        $scope.$watchGroup(['option.price ','option.fmv'], function () {
            if($scope.option.price > 0){
                var total = 0;
                total = Math.abs((($scope.option.fmv/$scope.option.price)-1)*100)
                return $scope.option.up = Math.round(total)
            }else{
                return $scope.option.up = 0
            }});
        $scope.$watch('option.vest', function (newValue) {
            $scope.option.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');});
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucessfull!',
                template: 'Data saved sucessfully'
            });

            alertPopup.then(function(res) {
              $state.go("app.options")
            })
        }

        $scope.addOption = function(eve){
            FirebaseService2.addOption($scope.option)
            $scope.showAlert()}})
    .controller("warants",function($scope,FirebaseService3,ionicDatePicker,$ionicPopup,$filter,$state){
        var ipObj1 = {
            callback : function (val) {
                return $scope.warants.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016, 8, 1), //Optional
            to: new Date(2025, 8, 1), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.warants = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        $scope.$watchGroup(['warants.price','warants.share'], function () {
            return $scope.warants.Invest = $scope.warants.price*$scope.warants.share});
        $scope.$watchGroup(['warants.share','warants.fmv'], function () {
            return $scope.warants.value = $scope.warants.share * $scope.warants.fmv});
        $scope.$watchGroup(['warants.saleipo','warants.imp'], function () {
            return $scope.warants.vali = Math.round($scope.warants.saleipo * ($scope.warants.imp/100))});
        $scope.$watchGroup(['warants.ipo','warants.share'], function () {
            return $scope.warants.imp = $scope.warants.ipo * $scope.warants.share});
        $scope.$watchGroup(['warants.value','warants.Invest'], function () {
            if($scope.warants.Invest > 0){
                var total = 0
                total = Math.abs((($scope.warants.value/$scope.warants.Invest)-1)*100)
                return $scope.warants.up = Math.round(total)
            }else{
                return $scope.warants.up = 0
            }});
        $scope.$watch('warants.vest', function (newValue) {
            $scope.warants.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');});
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucessfull!',
                template: 'Data saved sucessfully'
            });

            alertPopup.then(function(res) {
                $state.go("app.warrants")
            })
        }
        $scope.addwarant = function(eve){
            FirebaseService3.addwarant($scope.warants)
            $scope.showAlert()}})
    .controller("convertible",function($scope,FirebaseService4,ionicDatePicker,$ionicPopup,$filter,$state){
        //$scope.investment = ($scope.Company.price)*($scope.Company.share);
        var ipObj1 = {
            callback : function (val) {
                return $scope.cno.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016,2, 7), //Optional
            to: new Date(2025, 12, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.cno = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        //$scope.$watchGroup(['cno.price','cno.share'], function () {
        //    return $scope.cno.Invest = $scope.cno.price*$scope.cno.share  });
        $scope.$watchGroup(['cno.share','cno.fmv'], function () {
            return $scope.cno.value = $scope.cno.share * $scope.cno.fmv });
        $scope.$watchGroup(['cno.saleipo','cno.imp'], function () {
            return $scope.cno.vali = Math.round($scope.cno.saleipo * ($scope.cno.imp/100)) });
        $scope.$watchGroup(['cno.ipo','cno.share'], function () {
            return $scope.cno.imp = $scope.cno.ipo * $scope.cno.share })
        $scope.$watchGroup(['cno.value','cno.Invest'], function () {
            if($scope.cno.Invest > 0){
                var total = 0
                total = Math.abs((($scope.cno.value/$scope.cno.Invest)-1)*100)
                return $scope.cno.up = Math.round(total)
            }else{
                return $scope.cno.up = 0
            } })
        $scope.$watch('cno.vest', function (newValue) {
            $scope.cno.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');});
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Sucessfull!',
                template: 'Data saved sucessfully'
            });

            alertPopup.then(function(res) {
                $state.go("app.convertible")
            })
        }
        $scope.addcn = function(eve){
            FirebaseService4.addcn($scope.cno)
            $scope.showAlert()}})
    .controller("showoption",function(FirebaseService2,$scope,$ionicListDelegate){
        $scope.option = FirebaseService2.getOption();
        $scope.moveItem = function(iq, fromIndex, toIndex) {
            $scope.option.splice(fromIndex, 1);
            $scope.option.splice(toIndex, 0, iq);
        };
        $scope.delete = function(index) {
            FirebaseService2.removeOption(index)
        };
        $scope.movie= ""
        $scope.edit = function (iq) {
            $ionicListDelegate.closeOptionButtons();
        }
        $scope.date = function () {
            var date =  new Date($scope.option.vest);
            date.setDate(date.getDate() + 1);
            return date
        }
    })
    .controller("showwarant",function(FirebaseService3,$scope,$ionicListDelegate){
        $scope.warant = FirebaseService3.getwarant();
        $scope.moveItem = function(iq, fromIndex, toIndex) {
            $scope.warant.splice(fromIndex, 1);
            $scope.warant.splice(toIndex, 0, iq);
        };
        $scope.movie = ""
        $scope.delete = function(index) {
            FirebaseService3.removewarant(index)
        };
        $scope.edit = function (iq) {
            $ionicListDelegate.closeOptionButtons();
            console.log(iq)
        }
        $scope.date = function () {
            var date =  new Date($scope.warant.vest);
            date.setDate(date.getDate() + 1);
            return date
        }
    })
    .controller("cnshow",function(FirebaseService4,$scope,$ionicListDelegate){
        $scope.movie = ""
        $scope.cn = FirebaseService4.getcn();
        $scope.moveItem = function(iq, fromIndex, toIndex) {
            $scope.cn.splice(fromIndex, 1);
            $scope.cn.splice(toIndex, 0, iq);
        };

        $scope.delete = function(index) {
            FirebaseService4.removecn(index)
        };
        $scope.edit = function (iq) {
            $ionicListDelegate.closeOptionButtons();
        }
        $scope.date = function () {
            var date =  new Date($scope.cno.vest);
            date.setDate(date.getDate() + 1);
            return date
        }
    })

    .controller("viewCtrl",function($scope,FirebaseService,$stateParams, dataService){
        $scope.iqq = dataService.getProductAt($stateParams.companyid);
        $scope.date = function () {
            var date =  new Date($scope.iqq.vest);
            date.setDate(date.getDate() + 1);
            return date
        }})
    .controller("viewopt",function($scope,FirebaseService2,$stateParams, dataService1){
        $scope.abc = dataService1.getProductAt($stateParams.companyid);
        $scope.date = function () {
            var date =  new Date($scope.abc.vest);
            date.setDate(date.getDate() + 1);
            return date
        }})
    .controller("viewwarant",function($scope,FirebaseService3,$stateParams, dataService2){
        $scope.cba = dataService2.getProductAt($stateParams.companyid);
        $scope.date = function () {
            var date =  new Date($scope.cba.vest);
            date.setDate(date.getDate() + 1);
            return date
        }
    })
    .controller("viewCn",function($scope,FirebaseService4,$stateParams, dataService3){
        $scope.qwa = dataService3.getProductAt($stateParams.companyid);
        $scope.date = function () {
            var date =  new Date($scope.qwa.vest);
            date.setDate(date.getDate() + 1);
            return date
        }
    })
    .controller("editController",function( $scope,$stateParams,FirebaseService,ionicDatePicker,$state,$filter){
        $scope.share = FirebaseService.getCompany();
        var index = $stateParams.index
        $scope.ida = $scope.share[index]
         $scope.no = $scope.ida.$id
        console.log($scope.Company)
        var ipObj1 = {
            callback : function (val) {
                return $scope.Company.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2025, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.Company = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
           //$scope.invest = parseInt($scope.Company.price*$scope.Company.share)
        $scope.$watchGroup(['Company.price','Company.share'], function () {
            return $scope.Company.Invest = $scope.Company.price*$scope.Company.share  });
        $scope.$watchGroup(['Company.share','Company.fmv'], function () {
            return $scope.Company.value = $scope.Company.share * $scope.Company.fmv  });
        $scope.$watchGroup(['Company.saleipo','Company.imp'], function () {
            return $scope.Company.vali = Math.round($scope.Company.saleipo * ($scope.Company.imp/100))  });
        $scope.$watchGroup(['Company.ipo','Company.share'], function () {
            return $scope.Company.imp = $scope.Company.ipo * $scope.Company.share});
        $scope.$watchGroup(['Company.Invest','$scope.value'], function () {
            var total = 0
            if($scope.Company.Invest > 0){

                total = Math.round((($scope.Company.value / $scope.Company.Invest)-1)*100)
                return $scope.Company.up = Math.abs(total)
            }else{
                return $scope.Company.up = 0}});
             $scope.listCanSwipe = false
            $scope.Company = $scope.ida
            $scope.$watch('Company.vest', function (newValue) {
            $scope.Company.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');
        });
            $scope.addCom = function(eve){
                //$state.transitionTo("app.shares-show", null, {'reload':true});
            $state.go("app.shares-show")

            $scope.id = $stateParams.index;
                $scope.data = $scope.Company
                delete $scope.data.$id
                delete $scope.data.$priority
            FirebaseService.updateCompany($scope.data,$scope.id,$scope.no)
            }
            })
    .controller("editOptions",function($scope,$stateParams,FirebaseService2,ionicDatePicker,$state,$filter){
        $scope.opti = FirebaseService2.getOption();
        var index = $stateParams.index
        $scope.qwe = $scope.opti[index]
        $scope.no = $scope.qwe.$id
         var ipObj1 = {
            callback : function (val) {
                return $scope.option.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2025, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.option = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        //$scope.$watchGroup(['option.price','option.share'], function () {
        //    return $scope.option.Invest = $scope.option.price*$scope.option.share  });
        $scope.$watchGroup(['option.fmv','option.share','option.price'], function () {
            return $scope.option.value = Math.abs(($scope.option.fmv * $scope.option.share) -($scope.option.share * $scope.option.price))  });
        $scope.$watchGroup(['option.value','option.saleipo'], function () {
            return $scope.option.vali = Math.round($scope.option.imp * ($scope.option.saleipo/100))});
        $scope.$watchGroup(['option.ipo','option.share','option.price'], function () {
            return $scope.option.imp = Math.abs(($scope.option.ipo* $scope.option.share)-($scope.option.share*$scope.option.price))});
        $scope.$watchGroup(['option.price ','option.fmv'], function () {
            if($scope.option.price > 0){
                var total = 0;
                total = Math.abs((($scope.option.fmv/$scope.option.price)-1)*100)
                return $scope.option.up = Math.round(total)
            }else{
                return $scope.option.up = 0
            }});
            $scope.option = $scope.qwe
            $scope.$watch('option.vest', function (newValue) {
                $scope.option.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');});
            $scope.addOpti = function(eve){
                $scope.data = $scope.option
                delete $scope.data.$id
                delete $scope.data.$priority
                delete $scope.data.$$hashKey
            $state.go("app.options-show")
            $scope.id = $stateParams.index;
            FirebaseService2.updateOption($scope.data,$scope.id,$scope.no)
        }
    })
    .controller("editConvert",function($scope,FirebaseService4,ionicDatePicker,$stateParams,$ionicPopup,$state,$filter){
        $scope.conve = FirebaseService4.getcn();
        var index = $stateParams.index
        $scope.asd = $scope.conve[index]
        $scope.no = $scope.asd.$id

        var ipObj1 = {
            callback : function (val) {
                return $scope.cno.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2025, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.cno = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        $scope.$watchGroup(['cno.price','cno.share'], function () {
            return $scope.cno.Invest = $scope.cno.price*$scope.cno.share  });
        $scope.$watchGroup(['cno.share','cno.fmv'], function () {
            return $scope.cno.value = $scope.cno.share * $scope.cno.fmv });
        $scope.$watchGroup(['cno.saleipo','cno.imp'], function () {
            return $scope.cno.vali = Math.round($scope.cno.saleipo * ($scope.cno.imp/100)) });
        $scope.$watchGroup(['cno.ipo','cno.share'], function () {
            return $scope.cno.imp = $scope.cno.ipo * $scope.cno.share })
        $scope.$watchGroup(['cno.value','cno.Invest'], function () {
            if($scope.cno.Invest > 0){
                var total = 0
                total = Math.abs((($scope.cno.value/$scope.cno.Invest)-1)*100)
                return $scope.cno.up = Math.round(total)
            }else{
                return $scope.cno.up = 0
            } })
           $scope.cno = $scope.asd
                   $scope.$watch('cno.vest', function (newValue) {
            $scope.cno.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');});

        $scope.addConv= function(eve){
            $scope.data = $scope.cno
            delete $scope.data.$id
            delete $scope.data.$priority
            delete $scope.data.$$hashKey
            $state.go("app.convertible-show")
            $scope.id = $stateParams.index;
            FirebaseService4.updatecn($scope.data,$scope.id,$scope.no)
        }
    })

    .controller("editWarant",function($scope,$stateParams,ionicDatePicker,FirebaseService3,$state,$filter){
        $scope.wari = FirebaseService3.getwarant();
        var index = $stateParams.index
        $scope.zxc = $scope.wari[index]
        $scope.no = $scope.wari.$id
        var ipObj1 = {
            callback : function (val) {
                return $scope.warants.vest = val;
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2025, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional

        };
        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.warants = {'name':'',vest:'',share:'',price:'',fmv:'',ipo:'',saleipo:'',Invest:'',value:'',vali:'',imp:'',up:''};
        $scope.$watchGroup(['warants.price','warants.share'], function () {
            return $scope.warants.Invest = $scope.warants.price*$scope.warants.share});
        $scope.$watchGroup(['warants.share','warants.fmv'], function () {
            return $scope.warants.value = $scope.warants.share * $scope.warants.fmv});
        $scope.$watchGroup(['warants.saleipo','warants.imp'], function () {
            return $scope.warants.vali = Math.round($scope.warants.saleipo * ($scope.warants.imp/100))});
        $scope.$watchGroup(['warants.ipo','warants.share'], function () {
            return $scope.warants.imp = $scope.warants.ipo * $scope.warants.share});
        $scope.$watchGroup(['warants.value','warants.Invest'], function () {
            if($scope.warants.Invest > 0){
                var total = 0
                total = Math.abs((($scope.warants.value/$scope.warants.Invest)-1)*100)
                return $scope.warants.up = Math.round(total)
            }else{
                return $scope.warants.up = 0
            }});
        $scope.warants = $scope.zxc
        $scope.$watch('warants.vest', function (newValue) {
            $scope.warants.vest = $filter('date')(newValue, 'MMMM dd, yyyy ');});


        $scope.addwar = function(eve){
            $scope.data = $scope.warants
            delete $scope.data.$id
            delete $scope.data.$priority
            delete $scope.data.$$hashKey

            $state.go("app.warrants-show")
            $scope.id = $stateParams.index;
            FirebaseService3.updatewarant($scope.data,$scope.id,$scope.no)
        }
    })
.controller("summaryCtrl",function($scope,FirebaseService,FirebaseService2,FirebaseService3,FirebaseService4){
        $scope.summary ={capitaltotal:'',currentValaution:'',FutureValuation:'',FutureBest:''}
        $scope.share = FirebaseService.getCompany();
        $scope.share.$loaded().then(function(notes) {
                var total = 0
                 for(var i = 0; i < notes.length; i++) {
                     var product = notes[i].Invest;
                     total += product;}
                     $scope.sharetotal = parseInt(total)
         });
        $scope.option = FirebaseService2.getOption();
        $scope.option.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].Invest;
                total += product;}
            $scope.optionTotal = parseInt(total)
        });
        $scope.warrant = FirebaseService3.getwarant();
        $scope.warrant.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].Invest;
                total += product;}
            $scope.warrantTotal = parseInt(total)
        });
        $scope.cn = FirebaseService4.getcn();
        $scope.cn.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].share;
                total += product;}
            $scope.cnTotal = parseInt(total)
        });
        $scope.capitalDeployment = function(){
            return $scope.summary.capitaltotal = parseInt($scope.sharetotal + $scope.optionTotal + $scope.warrantTotal +  $scope.cnTotal)}

        $scope.share = FirebaseService.getCompany();
        $scope.share.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].value;
                total += product;}
            $scope.sharevalue = total
        });
        $scope.option = FirebaseService2.getOption();
        $scope.option.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].value;
                total += product;}
            $scope.optionvalue = total
        });
        $scope.warrant = FirebaseService3.getwarant();
        $scope.warrant.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].value;
                total += product;}
            $scope.warrantvalue = total
        });
        $scope.cn = FirebaseService4.getcn();
        $scope.cn.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].value;
                total += product;}
            $scope.cnvalue = parseInt(total)
        });
        $scope.CurrentValuation = function(){
            return $scope.summary.currentValaution = $scope.sharevalue + $scope.optionvalue + $scope.warrantvalue +  $scope.cnvalue}

        $scope.share = FirebaseService.getCompany();
        $scope.share.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].imp;
                total += product;}
            $scope.shareimp = total
        });
        $scope.option = FirebaseService2.getOption();
        $scope.option.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].imp;
                total += product;}
            $scope.optionimp = total
        });
        $scope.warrant = FirebaseService3.getwarant();
        $scope.warrant.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].imp;
                total += product;}
            $scope.warrantimp = total
        });
        $scope.cn = FirebaseService4.getcn();
        $scope.cn.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].imp;
                total += product;}
            $scope.cnvimp = parseInt(total)
        });
        $scope.FutureValuation = function(){
            return $scope.summary.FutureValuation = $scope.shareimp + $scope.optionimp + $scope.warrantimp +  $scope.cnvimp}
        $scope.share = FirebaseService.getCompany();
        $scope.share.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].vali;
                total += product;}
            $scope.sharevali = total
        });
        $scope.option = FirebaseService2.getOption();
        $scope.option.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].vali;
                total += product;}
            $scope.optionvali = total
        });
        $scope.warrant = FirebaseService3.getwarant();
        $scope.warrant.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].vali;
                total += product;}
            $scope.warrantvali = total
        });
        $scope.cn = FirebaseService4.getcn();
        $scope.cn.$loaded().then(function(notes) {
            var total = 0
            for(var i = 0; i < notes.length; i++) {
                var product = notes[i].vali;
                total += product;}
            $scope.cnvvali = parseInt(total)
        });
        $scope.FutureBest = function(){
            return $scope.summary.FutureBest = $scope.sharevali + $scope.optionvali + $scope.warrantvali +  $scope.cnvvali}
        $scope.return1 = function () {
         return Math.round($scope.summary.currentValaution / $scope.summary.capitaltotal)
                 }
        $scope.return2 = function(){
            return Math.round($scope.summary.FutureValuation / $scope.summary.capitaltotal)
        }
        $scope.return3 = function(){
            return Math.round($scope.summary.FutureValuation / $scope.summary.capitaltotal)
        }
        $scope.return4 = function(){
            return Math.round($scope.summary.FutureBest / $scope.summary.capitaltotal)
        }
    })