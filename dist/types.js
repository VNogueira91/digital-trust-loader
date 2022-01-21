"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoaderVault = exports.LoaderSystem = exports.LoaderStage = exports.LoaderMode = exports.LoaderBrowser = exports.LoaderAgent = exports.EnclaveTypes = void 0;
var LoaderMode;
exports.LoaderMode = LoaderMode;

(function (LoaderMode) {
  LoaderMode["DEV_AUTO"] = "dev-autologin";
  LoaderMode["AUTO"] = "autologin";
  LoaderMode["EXTERNAL_AUTO"] = "external-autologin";
  LoaderMode["MOBILE_AUTO"] = "mobile-autologin";
  LoaderMode["SECURE"] = "secure";
  LoaderMode["DEV_SECURE"] = "dev-secure";
})(LoaderMode || (exports.LoaderMode = LoaderMode = {}));

var LoaderSystem;
exports.LoaderSystem = LoaderSystem;

(function (LoaderSystem) {
  LoaderSystem["iOS"] = "iOS";
  LoaderSystem["ANDROID"] = "Android";
  LoaderSystem["ANY"] = "any";
})(LoaderSystem || (exports.LoaderSystem = LoaderSystem = {}));

var LoaderBrowser;
exports.LoaderBrowser = LoaderBrowser;

(function (LoaderBrowser) {
  LoaderBrowser["CHROME"] = "Chrome";
  LoaderBrowser["FIREFOX"] = "Firefox";
  LoaderBrowser["ANY"] = "any";
})(LoaderBrowser || (exports.LoaderBrowser = LoaderBrowser = {}));

var LoaderStage;
exports.LoaderStage = LoaderStage;

(function (LoaderStage) {
  LoaderStage["DEVELOPMENT"] = "development";
  LoaderStage["RELEASE"] = "release";
})(LoaderStage || (exports.LoaderStage = LoaderStage = {}));

var LoaderVault;
exports.LoaderVault = LoaderVault;

(function (LoaderVault) {
  LoaderVault["SERVER"] = "server";
  LoaderVault["BROWSER"] = "browser";
})(LoaderVault || (exports.LoaderVault = LoaderVault = {}));

var LoaderAgent;
exports.LoaderAgent = LoaderAgent;

(function (LoaderAgent) {
  LoaderAgent["MOBILE"] = "mobile";
  LoaderAgent["BROWSER"] = "browser";
})(LoaderAgent || (exports.LoaderAgent = LoaderAgent = {}));

var EnclaveTypes;
exports.EnclaveTypes = EnclaveTypes;

(function (EnclaveTypes) {
  EnclaveTypes["WALLET"] = "WalletDBEnclave";
})(EnclaveTypes || (exports.EnclaveTypes = EnclaveTypes = {}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIkxvYWRlck1vZGUiLCJMb2FkZXJTeXN0ZW0iLCJMb2FkZXJCcm93c2VyIiwiTG9hZGVyU3RhZ2UiLCJMb2FkZXJWYXVsdCIsIkxvYWRlckFnZW50IiwiRW5jbGF2ZVR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxJQUFJQSxVQUFKOzs7QUFDUCxDQUFDLFVBQVVBLFVBQVYsRUFBc0I7QUFDbkJBLEVBQUFBLFVBQVUsQ0FBQyxVQUFELENBQVYsR0FBeUIsZUFBekI7QUFDQUEsRUFBQUEsVUFBVSxDQUFDLE1BQUQsQ0FBVixHQUFxQixXQUFyQjtBQUNBQSxFQUFBQSxVQUFVLENBQUMsZUFBRCxDQUFWLEdBQThCLG9CQUE5QjtBQUNBQSxFQUFBQSxVQUFVLENBQUMsYUFBRCxDQUFWLEdBQTRCLGtCQUE1QjtBQUNBQSxFQUFBQSxVQUFVLENBQUMsUUFBRCxDQUFWLEdBQXVCLFFBQXZCO0FBQ0FBLEVBQUFBLFVBQVUsQ0FBQyxZQUFELENBQVYsR0FBMkIsWUFBM0I7QUFDSCxDQVBELEVBT0dBLFVBQVUsMEJBQUtBLFVBQVUsR0FBRyxFQUFsQixDQVBiOztBQVFPLElBQUlDLFlBQUo7OztBQUNQLENBQUMsVUFBVUEsWUFBVixFQUF3QjtBQUNyQkEsRUFBQUEsWUFBWSxDQUFDLEtBQUQsQ0FBWixHQUFzQixLQUF0QjtBQUNBQSxFQUFBQSxZQUFZLENBQUMsU0FBRCxDQUFaLEdBQTBCLFNBQTFCO0FBQ0FBLEVBQUFBLFlBQVksQ0FBQyxLQUFELENBQVosR0FBc0IsS0FBdEI7QUFDSCxDQUpELEVBSUdBLFlBQVksNEJBQUtBLFlBQVksR0FBRyxFQUFwQixDQUpmOztBQUtPLElBQUlDLGFBQUo7OztBQUNQLENBQUMsVUFBVUEsYUFBVixFQUF5QjtBQUN0QkEsRUFBQUEsYUFBYSxDQUFDLFFBQUQsQ0FBYixHQUEwQixRQUExQjtBQUNBQSxFQUFBQSxhQUFhLENBQUMsU0FBRCxDQUFiLEdBQTJCLFNBQTNCO0FBQ0FBLEVBQUFBLGFBQWEsQ0FBQyxLQUFELENBQWIsR0FBdUIsS0FBdkI7QUFDSCxDQUpELEVBSUdBLGFBQWEsNkJBQUtBLGFBQWEsR0FBRyxFQUFyQixDQUpoQjs7QUFLTyxJQUFJQyxXQUFKOzs7QUFDUCxDQUFDLFVBQVVBLFdBQVYsRUFBdUI7QUFDcEJBLEVBQUFBLFdBQVcsQ0FBQyxhQUFELENBQVgsR0FBNkIsYUFBN0I7QUFDQUEsRUFBQUEsV0FBVyxDQUFDLFNBQUQsQ0FBWCxHQUF5QixTQUF6QjtBQUNILENBSEQsRUFHR0EsV0FBVywyQkFBS0EsV0FBVyxHQUFHLEVBQW5CLENBSGQ7O0FBSU8sSUFBSUMsV0FBSjs7O0FBQ1AsQ0FBQyxVQUFVQSxXQUFWLEVBQXVCO0FBQ3BCQSxFQUFBQSxXQUFXLENBQUMsUUFBRCxDQUFYLEdBQXdCLFFBQXhCO0FBQ0FBLEVBQUFBLFdBQVcsQ0FBQyxTQUFELENBQVgsR0FBeUIsU0FBekI7QUFDSCxDQUhELEVBR0dBLFdBQVcsMkJBQUtBLFdBQVcsR0FBRyxFQUFuQixDQUhkOztBQUlPLElBQUlDLFdBQUo7OztBQUNQLENBQUMsVUFBVUEsV0FBVixFQUF1QjtBQUNwQkEsRUFBQUEsV0FBVyxDQUFDLFFBQUQsQ0FBWCxHQUF3QixRQUF4QjtBQUNBQSxFQUFBQSxXQUFXLENBQUMsU0FBRCxDQUFYLEdBQXlCLFNBQXpCO0FBQ0gsQ0FIRCxFQUdHQSxXQUFXLDJCQUFLQSxXQUFXLEdBQUcsRUFBbkIsQ0FIZDs7QUFJTyxJQUFJQyxZQUFKOzs7QUFDUCxDQUFDLFVBQVVBLFlBQVYsRUFBd0I7QUFDckJBLEVBQUFBLFlBQVksQ0FBQyxRQUFELENBQVosR0FBeUIsaUJBQXpCO0FBQ0gsQ0FGRCxFQUVHQSxZQUFZLDRCQUFLQSxZQUFZLEdBQUcsRUFBcEIsQ0FGZiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgTG9hZGVyTW9kZTtcbihmdW5jdGlvbiAoTG9hZGVyTW9kZSkge1xuICAgIExvYWRlck1vZGVbXCJERVZfQVVUT1wiXSA9IFwiZGV2LWF1dG9sb2dpblwiO1xuICAgIExvYWRlck1vZGVbXCJBVVRPXCJdID0gXCJhdXRvbG9naW5cIjtcbiAgICBMb2FkZXJNb2RlW1wiRVhURVJOQUxfQVVUT1wiXSA9IFwiZXh0ZXJuYWwtYXV0b2xvZ2luXCI7XG4gICAgTG9hZGVyTW9kZVtcIk1PQklMRV9BVVRPXCJdID0gXCJtb2JpbGUtYXV0b2xvZ2luXCI7XG4gICAgTG9hZGVyTW9kZVtcIlNFQ1VSRVwiXSA9IFwic2VjdXJlXCI7XG4gICAgTG9hZGVyTW9kZVtcIkRFVl9TRUNVUkVcIl0gPSBcImRldi1zZWN1cmVcIjtcbn0pKExvYWRlck1vZGUgfHwgKExvYWRlck1vZGUgPSB7fSkpO1xuZXhwb3J0IHZhciBMb2FkZXJTeXN0ZW07XG4oZnVuY3Rpb24gKExvYWRlclN5c3RlbSkge1xuICAgIExvYWRlclN5c3RlbVtcImlPU1wiXSA9IFwiaU9TXCI7XG4gICAgTG9hZGVyU3lzdGVtW1wiQU5EUk9JRFwiXSA9IFwiQW5kcm9pZFwiO1xuICAgIExvYWRlclN5c3RlbVtcIkFOWVwiXSA9IFwiYW55XCI7XG59KShMb2FkZXJTeXN0ZW0gfHwgKExvYWRlclN5c3RlbSA9IHt9KSk7XG5leHBvcnQgdmFyIExvYWRlckJyb3dzZXI7XG4oZnVuY3Rpb24gKExvYWRlckJyb3dzZXIpIHtcbiAgICBMb2FkZXJCcm93c2VyW1wiQ0hST01FXCJdID0gXCJDaHJvbWVcIjtcbiAgICBMb2FkZXJCcm93c2VyW1wiRklSRUZPWFwiXSA9IFwiRmlyZWZveFwiO1xuICAgIExvYWRlckJyb3dzZXJbXCJBTllcIl0gPSBcImFueVwiO1xufSkoTG9hZGVyQnJvd3NlciB8fCAoTG9hZGVyQnJvd3NlciA9IHt9KSk7XG5leHBvcnQgdmFyIExvYWRlclN0YWdlO1xuKGZ1bmN0aW9uIChMb2FkZXJTdGFnZSkge1xuICAgIExvYWRlclN0YWdlW1wiREVWRUxPUE1FTlRcIl0gPSBcImRldmVsb3BtZW50XCI7XG4gICAgTG9hZGVyU3RhZ2VbXCJSRUxFQVNFXCJdID0gXCJyZWxlYXNlXCI7XG59KShMb2FkZXJTdGFnZSB8fCAoTG9hZGVyU3RhZ2UgPSB7fSkpO1xuZXhwb3J0IHZhciBMb2FkZXJWYXVsdDtcbihmdW5jdGlvbiAoTG9hZGVyVmF1bHQpIHtcbiAgICBMb2FkZXJWYXVsdFtcIlNFUlZFUlwiXSA9IFwic2VydmVyXCI7XG4gICAgTG9hZGVyVmF1bHRbXCJCUk9XU0VSXCJdID0gXCJicm93c2VyXCI7XG59KShMb2FkZXJWYXVsdCB8fCAoTG9hZGVyVmF1bHQgPSB7fSkpO1xuZXhwb3J0IHZhciBMb2FkZXJBZ2VudDtcbihmdW5jdGlvbiAoTG9hZGVyQWdlbnQpIHtcbiAgICBMb2FkZXJBZ2VudFtcIk1PQklMRVwiXSA9IFwibW9iaWxlXCI7XG4gICAgTG9hZGVyQWdlbnRbXCJCUk9XU0VSXCJdID0gXCJicm93c2VyXCI7XG59KShMb2FkZXJBZ2VudCB8fCAoTG9hZGVyQWdlbnQgPSB7fSkpO1xuZXhwb3J0IHZhciBFbmNsYXZlVHlwZXM7XG4oZnVuY3Rpb24gKEVuY2xhdmVUeXBlcykge1xuICAgIEVuY2xhdmVUeXBlc1tcIldBTExFVFwiXSA9IFwiV2FsbGV0REJFbmNsYXZlXCI7XG59KShFbmNsYXZlVHlwZXMgfHwgKEVuY2xhdmVUeXBlcyA9IHt9KSk7Il0sImZpbGUiOiJ0eXBlcy5qcyJ9
