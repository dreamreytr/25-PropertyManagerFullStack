'use strict';
angular.module('app').factory('authInterceptorService', function($q, $location, localStorageService) {
    
    var authInterceptorServiceFactory = {};
    
    var _request = function(config) {
        config.headers = config.headers || {};
        
        var authData = localStorageService.get('authorizationData');
        if(authData){
            config.headers.Authorization = 'Bearer ' + authData.token;
        }
            return config;
    }
    
    var _resonseError = function(rejection){
        if(rejection.status === 401){
            $location.path('/login');
        }
        return $q.reject(rejection);
    }
    
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _resonseError;
    
    return authInterceptorServiceFactory;
});