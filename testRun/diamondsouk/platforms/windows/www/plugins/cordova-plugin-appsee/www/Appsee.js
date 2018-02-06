﻿cordova.define("cordova-plugin-appsee.Appsee", function(require, exports, module) {
/**
 * Appsee.js
 *
 * Cordova Appsee plugin.
 *
 * Author: Yoni Douek
 */

var exec = require('cordova/exec');

var Appsee = function() {};

Appsee.start = function(key, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "start", [key]);
};

Appsee.stop = function(successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "stop", []);
};

Appsee.pause = function(successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "pause", []);
};

Appsee.resume = function(successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "resume", []);
};

Appsee.addEvent = function(eventName, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "addEvent", [eventName]);
};

// Properties should be json: { id:"123", price: 200, location: "Jeruslem"}
Appsee.addEventWithProperties = function(eventName, properties, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "addEventWithProperties", [eventName, properties]);
};

Appsee.startScreen = function(screenName, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "startScreen", [screenName]);
};

Appsee.setUserId = function(userId, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "setUserId", [userId]);
};

Appsee.setLocation = function(latitude, longitude, horizontalAccuracy, verticalAccuracy, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "setLocation", [latitude, longitude, horizontalAccuracy, verticalAccuracy]);
};

Appsee.setLocationDescription = function(locationDescription, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "setLocationDescription", [locationDescription]);
};

// Should be used with a callback: Appsee.generate3rdPartyID("Adobe", true, function(id) { // Use id });
Appsee.generate3rdPartyID = function(systemName, isPersistent, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "generate3rdPartyID", [systemName, isPersistent]);
};

Appsee.set3rdPartyID = function(externalId, systemName, isPersistent, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "set3rdPartyID", [externalId, systemName, isPersistent]);
};

Appsee.setOptOutStatus = function(status, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "setOptOutStatus", [status]);
};

// Should be used with a callback: Appsee.getOptOutStatus(function(isOptOut) { // Use isOptOut });
Appsee.getOptOutStatus = function(successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "getOptOutStatus", []);
};

Appsee.setDebug = function(log, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "setDebug", [log]);
};

Appsee.finishSession = function(verifyBackground, upload, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "finishSession", [verifyBackground, upload]);
};

Appsee.forceNewSession = function(log, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "forceNewSession", []);
};

Appsee.addScreenAction = function(actionName, successCallback, errorCallback)
{
	return exec(successCallback, errorCallback, "Appsee", "addScreenAction", [actionName]);
};

module.exports = Appsee;

});
