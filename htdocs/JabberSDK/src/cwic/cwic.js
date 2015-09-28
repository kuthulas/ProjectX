/**
 * @fileOverview cwic.js
 * CWIC is a jQuery plugin to access the Cisco Web Communicator<br>
 * Audio and Video media require the CWC browser plugin to be installed <br>
 */

/*
    CWIC is a jQuery plugin to access the Cisco Web Communicator

    CWIC uses jQuery features such as:<ul>
    <li>'cwic' namespacing: jQuery.cwic();</li>
    <li>custom events (.cwic namespace): conversationStart.cwic</li>
    <li>attach data with the 'cwic' key: ui.data('cwic', conversation)</li>
    </ul>

    Audio and Video media require the CWC browser plugin to be installed

*/
/**
 * Global window namespace
 * @name window
 * @namespace
 */
/*global jQuery window ActiveXObject _triggerError _reset _registerSystemCallbacks _registerCallChangeCallbacks _triggerConversationEvent unregisterPhone shutdown _log*/
(function( $ )
/** @scope $.fn.cwic */
{

    // a global reference to the CWC native plugin API
    var _plugin = null;
    /** cwic global settings, they can be overridden by passing options to init
     * @namespace
     */
    var settings = {
        /** A function to implement base64 encoding required for HTTP Basic authentication against the {@link $.fn.cwic-settings.node} service.<br>
         * This function is required if attempting authentication against the node service using some versions of Internet Explorer.<br>
         * If not provided cwic will attempt to use window.btoa which is not available on all browsers.
         * @type Function=null
         * @function
         * @param {String} Input buffer to encode.
         * @return {String} Base64 encoded string.
         */
        encodeBase64: null,
        /** The handler to be called when the API is ready.<br>
         * The values in the defaults parameter can be used when invoking registerPhone
         * The API is ready when:<ul>
         *      <li>The document (DOM) is ready.</li>
         *      <li>The CWC plugin was found and could be loaded.</li></ul>
         * @type Function=null
         * @param {Object} defaults An object containing default values retrieved from URL query parameters user and/or cucm <i>e.g: http://myserver/phone?user=foo&cucm=1.2.3.4 </i><br>
         * @param {Boolean} registered Phone registration status - true if the phone is already registered (can be used when using SDK in multiple browser tabs), false otherwise
         * @param {String} mode The phone's current call control mode - "SoftPhone" or "DeskPhone"
         */
        ready: null,
        /** use ccmcip when authenticating
         * @type Boolean=true
         */
        useCcmcip: true,
        /** device prefix to use for default device prediction algorithm
         * @type String='ecp'
         */
        devicePrefix: 'ecp',
        /** callback function to predict softphone device name<br>
         * default implementation is to concatenate settings.devicePrefix + options.username
         * @name $.fn.cwic-settings.predictDevice
         * @type Function=null
         * @function
         * @param {Object} options
         * @param {String} options.username
         */
        /** A flag to indicate to cwic that it should log more messages.
         * @type Boolean=false
         */
        verbose: false,
        /** Handler to be called when cwic needs to log information.<br>
         * Default is to use console.log if available, otherwise do nothing.
         * @function
         * @param {String} msg the message
         * @param {Object} [context] the context of the message
         * @type Function
         */
        log: function(/** String */msg, /** Object */context) {
            if (typeof console !== "undefined" && console.log) {
                console.log(msg);
                if (context) {
                    console.log(context);
                }
            }
        },
        /** The handler to be called if the API could not be initialized.<br>
         * The basic properties of the error object are listed, however more may be added based on the context of the error.<br>
         * If the triggered error originated from a caught exception, the original error properties are included in the error parameter.<br>
         * An error with code 1 (PluginNotAvailable) can have an extra 'pluginDisabled' property set to true.<br>
         * @type Function
         * @param {Object} error see {@link $.fn.cwic-errorMap}
         * @param {String} [error.message] message associated with the error.
         * @param {Number} error.code code associated with the error
         */
        error: function(/** Object */error) {
            _log("Error: ",error);
        },
        /** The node address: host name or IP address.<br>
         * cwic can use some network services hosted on a web server (the node). By default, this server is the host that serves the web application based on cwic.<br>
         * The node deployment is optional – it provides advanced features such as directory integration. See additional documentation in the 'node' folder. <br>
         * @type String=''
         */
        node: '' // to access node.cwc services, can be cross-domain (JSONP)
        /**
         * Allows the application to extend the default error map.<br>
         * This parameter is a map of error id to {@link $.fn.cwic-errorMapEntry}
         * It may also be a map of error id to String
         * By default error messages (String) are associated to error codes (map keys, Numbers).<br>
         * The application can define new error codes, or associate a different message/object to a pre-defined error code. <br>
         *   Default error map: {@link $.fn.cwic-errorMap}<br>
         * @name $.fn.cwic-settings.errorMap
         * @type $.fn.cwic-errorMapEntry{}
         */
    };

    // jsdoc does not seem to like enumerating properties (fields) of objects it already considers as properties (fields).
    /** cwic error object
     * @name $.fn.cwic-errorMapEntry
     * @namespace
     * @property {Number} code a unique error code
     * @property {String} message the message associated with the error
     * @property {Any} [propertyName] Additional properties that will be passed back when an error is raised.
     */
    /**
     * The error map used to build errors triggered by cwic. <br>
     * Keys are error codes (numbers), values objects associated to codes. <br>
     * By default the error object contains a single 'message' property. <br>
     * The error map can be customized via the init function. <br>
     * @namespace
     */
    var errorMap = {
        /** 0: unknown error or exception
         * @type $.fn.cwic-errorMapEntry
         */
        Unknown  :                { code:   0, message: "Unknown error" },
        /** 1: plugin not available (not installed, not enabled or unable to load)
         * @type $.fn.cwic-errorMapEntry
         */
        PluginNotAvailable :      { code:   1, message: "Plugin not available" },
        /** 2: browser not supported
         * @type $.fn.cwic-errorMapEntry
         */
        BrowserNotSupported :     { code:   2, message: "Browser not supported" },
        /** 3: invalid arguments
         * @type $.fn.cwic-errorMapEntry
         */
        InvalidArguments :        { code:   3, message: "Invalid arguments" },
        /** 4: invalid state for operation (e.g. startconversation when phone is not registered)
         * @type $.fn.cwic-errorMapEntry
         */
        InvalidState :            { code:   4, message: "Invalid State" },
        /** 5: plugin returned an error
         * @type $.fn.cwic-errorMapEntry
         */
        NativePluginError:        { code:   5, message: "Native plugin error" },
        /** 6: operation not supported
         * @type $.fn.cwic-errorMapEntry
         */
		OperationNotSupported:	  { code:   6, message: "Operation not supported" },
        /** 7: no call manager specified
         * @type $.fn.cwic-errorMapEntry
         */
        ReleaseMismatch :         { code:   7, message: "Release mismatch" },
        /** 10: release mismatch
         * @type $.fn.cwic-errorMapEntry
         */
        NoCallManagerConfigured : { code:  10, message: "No CUCM found" },
        /** 11: no devices found for supplied credentials
         * @type $.fn.cwic-errorMapEntry
         */
        NoDevicesFound :          { code:  11, message: "No devices found" },
        /** 12: no softphone (CSF) devices found for supplied credentials
         * @type $.fn.cwic-errorMapEntry
         */
        NoCsfDevicesFound :       { code:  12, message: "No CSF device found" },
        /** 13: other phone configuration error
         * @type $.fn.cwic-errorMapEntry
         */
        PhoneConfigGenError :     { code:  13, message: "Phone configuration error" },
        /** 14: SIP profile error
         * @type $.fn.cwic-errorMapEntry
         */
        SipProfileGenError :      { code:  14, message: "Sip profile error" },
        /** 15: configuration not set e.g. missing TFTP/CTI/CCMCIP addresses
         * @type $.fn.cwic-errorMapEntry
         */
        ConfigNotSet :            { code:  15, message: "Configuration not set" },
        /** 16: could not fetch phone configuration
         * @type $.fn.cwic-errorMapEntry
         */
        TftpFetchError :          { code:  16, message: "TFTP fetch error" },
        /** 18: already logged in in another process (browser or window in internet explorer)
         * @type $.fn.cwic-errorMapEntry
         */
        LoggedInElseWhere :       { code:  18, message: "Already logged in" },
        /** 19: authentication failed - invalid username or password for configured server
         * @type $.fn.cwic-errorMapEntry
         */
        AuthenticationFailure :   { code:  19, message: "Authentication failed" },
        /** 20: other login error
         * @type $.fn.cwic-errorMapEntry
         */
        LoginError:               { code:  20, message: "Login Error"},
        /** 21: no username and/or password supplied
         * @type $.fn.cwic-errorMapEntry
         */
        NoCredentialsConfigured:  { code:  21, message: "No credentials configured"},
        /** 30: error performing call control operation
         * @type $.fn.cwic-errorMapEntry
         */
        CallControlError:         { code:  30, message: "Call control error"},
        /** 40: error modifying video association (e.g. removing non-attached window or adding non-existing window)
         * @type $.fn.cwic-errorMapEntry
         */
        VideoWindowError:         { code:  40, message: "Video window error"},
        /** 999: no error (success)
         * @type $.fn.cwic-errorMapEntry
         */
        NoError:                  { code: 999, message: "No Error"}
    };

    var errorMapAlias = {
        // ApiReturnCodeEnum
            Ok:                     'NoError',
            eNoError:               'NoError',
            eInvalidCallId:         'InvalidArguments',
            eCreateCallFailed:      'CallControlError',
            eNoActiveDevice:        'PhoneConfigGenError',
            eTftpNotConfigured:     'ConfigNotSet',
            eCallOperationFailed:   'CallControlError',
            eLoggedInLock:          'LoggedInElseWhere',
            eLogoutFailed:          'LoginError',
            eCcmcipNotConfigured:   'ConfigNotSet',
            eWindowAlreadyExists:   'VideoWindowError',
            eInvalidState:          'InvalidState',
            eCtiNotConfigured:      'ConfigNotSet',
            eNoPhoneMode:           'InvalidArgument',
            eNoWindowExists:        'VideoWindowError',
            eInvalidArgument:       'InvalidArguments',
        // ConnectionFailureCodeEnum
            //eNoError,
            eUnknownFailure:                    'LoginError',
            //eInvalidState,
            eUnsupportedPhoneMode:              'LoginError',
            eNoAuthServersConfigured:           'NoCallManagerConfigured',
            eNoCredentialsConfigured:           'NoCredentialsConfigured',
            eAuthCouldNotConnect:               'LoginError',
            eAuthServerCertificateRejected:     'LoginError',
            eCredentialsRejected:               'LoginError',
            eAuthResponseEmpty:                 'LoginError',
            eAuthResponseInvalid:               'LoginError',
            eNoTftpServersConfigured:           'NoCallManagerConfigured',
            eNoDeviceNameConfigured:            'LoginError',
            eLineMustNotBeConfigured:           'LoginError',
            eNoLocalIpConfigured:               'LoginError',
            eTftpCouldNotConnect:               'TftpFetchError',
            eTftpFileNotFound:                  'TftpFetchError',
            eTftpFileEmpty:                     'TftpFetchError',
            eTftpFileInvalid:                   'TftpFetchError',
            eRequireAuthenticationString:       'LoginError',
            eCapfEnrolmentFailed:               'LoginError',
            eRequireSecureCachePath:            'LoginError',
            eRequireSecurityLibrary:            'LoginError',
            eStorageError:                      'LoginError',
            eSecurityLibraryError:              'LoginError',
            eCapfEnrolmentRequired:             'LoginError',
            eNoCtiServersConfigured:            'LoginError',
            eDeviceNotInService:                'LoginError',
        // AuthenticationFailureCode
            //eNoError:                           '',
            eNoServersConfigured:               'NoCallManagerConfigured',
            //eNoCredentialsConfigured:           'NoCredentialsConfigured',
            eCouldNotConnect:                   'LoginError',
            eServerCertificateRejected:         'LoginError',
            //eCredentialsRejected:               'LoginError',
            eResponseEmpty:                     'LoginError',
            eResponseInvalid:                   'LoginError',
			eOperationNotSupported:				'OperationNotSupported'

    };
    var getError = function(key,backupkey) {
        var errorMapKey = 'Unknown';
        if(errorMapAlias[key]) {
            errorMapKey = errorMapAlias[key];
        } else if(errorMap[key]) {
            errorMapKey = key;
        } else if(backupkey && errorMapAlias[backupkey]) {
            errorMapKey = errorMapAlias[backupkey];
        } else if(backupkey && errorMap[backupkey]) {
            errorMapKey = backupkey;
        }
        return errorMap[errorMapKey];
    };
    /**
     * Registration object with properties of the currently logged in session <br>
     * expanded below in _getRegistrationObject() and authenticateCcmcip() <br>
     * @type Object
     * @private
     */
    var registration = {
            devices: {} // map of available devices (key is device name)
    };

    var registering = {
        registeringPhone : false,
        switchingMode: false,
        successCb : null,
        errorCb : null,
        CUCM : [],
        password : '',
        unregisterCb : null
    };

    var videowindows = {};
    /**
     * an internal function to log messages
     * @param (Boolean) [isVerbose] indicates if msg should be logged in verbose mode only (configurable by the application)  <br>
     * @param (String) msg the message to be logged (to console.log by default, configurable by the application)  <br>
     * @param (Object) [context] a context to be logged <br>
    */
    function _log() {
        var isVerbose = typeof arguments[0] === "boolean" ? arguments[0] : false;
        var msg = typeof arguments[0] === "string" ? arguments[0] : arguments[1];
        var context = typeof arguments[1] === "object" ? arguments[1] : arguments[2];

        if ((!isVerbose || (isVerbose && settings.verbose)) && $.isFunction(settings.log)) {
            settings.log('[cwic] ' + msg, context);
        }
    }

    // Helper function to check if plugin is still available.
    // Related to DE3975. The CK advanced editor causes the overflow CSS attribute to change, which in turn
    // removes and replaces the plugin during the reflow losing all state.
    var _doesPluginExist = function() {
        var ret = true;
        try {
            var fnref = _plugin.api.getCall;
        } catch(e) {
            ret = false;
        }
        return ret;
    };

    // support unit tests for IE ($.browser.jasmine means we're running unit tests).
    // should be more transparent than this, but tell that to internet explorer - you can't override attachEvent...
    var _addListener = function(obj,type,handler) {
        try {
            if($.browser.jasmine) {
                obj._addListener(type,handler,false);
            } else if(document.attachEvent) {
                obj.attachEvent("on" + type, handler);
            } else {
                obj.addEventListener(type, handler, false);
            }
        }
        catch(e) {
        }
    };
    var _removeListener = function(obj,type,handler) {
        try {
            if($.browser.jasmine) {
                return;
                //obj._removeListener(type,handler,false);
            } else if(document.attachEvent) {
                obj.detachEvent("on" + type, handler);
            } else {
                obj.removeEventListener(type, handler, false);
            }
        } catch(e) {
        }
    };

    var rebootIfBroken = function(callback) {
        var pluginExists = _doesPluginExist();
        if(!pluginExists) {
            _log("Plugin has been unloaded. Restarting....");
            _plugin = null;
            callback();
        }
        return pluginExists;
    };

    /**
     * predict a device based on username
     * @param {Object} options
     * @type {String}
     */
    function _predictDevice(options) {
        if($.isFunction(settings.predictDevice)) {
            return settings.predictDevice(options);
        } else {
			return (options.username)? settings.devicePrefix+options.username : '';
        }
    }
    /**
     * encode a string into base64
     * @param {String} str
     * @type {String}
     */
    function _encodeBase64(str) {
        // application encoding
        if ($.isFunction(settings.encodeBase64)) {
            return settings.encodeBase64(str);
        }

        // btoa exists on Mozilla
        if ($.isFunction(window.btoa)) {
            return window.btoa(str);
        }

        // IE ?
        _log('error: cannot encode base64');

        return '';
    }

    /**
     * manages asynchronous loading/resetting of windowhandles for local preview windows
     * @private
     */
    var previewwindows = {
        // windows: map keyed by document->pluginId, value is:
        //      plugin: the plugin object (JSAPI/DOM)
        //      windowhandle: last known windowhandle
        windows: [],
        windowobjects: [],
        getWindowId: function(args) {
            var win = args.window;
            var windowid = this.windowobjects.indexOf(win);
            if(windowid === -1 && !args.readOnly) {
                this.windowobjects.push(win);
                windowid = this.windowobjects.indexOf(win);
            }
            return windowid;
        },
        /**
         * adds a video plugin as a preview window
         * @param {Object} args
         * @param {String|Object} args.plugin id of the video plugin or the plugin object itself
         * @param {Object} args.window the parent window for this plugin (for popup support)
         * @private
         */
        add: function(args) {
            if(!args) {
                return;
            }
            if(!args.window) {
                args.window = window;
            }
            var windowid = this.getWindowId({window:args.window});
            if(!this.windows[windowid]) {
                this.windows[windowid]= {};
            }
            if(typeof args.plugin === "string") {
                this.windows[windowid][args.plugin] = {
                    windowhandle: null,
                    plugin: null,
                    used: false
                };
            } else if(args.plugin && args.plugin.id) {
                this.windows[windowid][args.plugin.id] = {
                   windowhandle: args.plugin.windowhandle,
                   plugin: args.plugin,
                   used:true
                };
                _plugin.api.addPreviewWindow({windowhandle: args.plugin.windowhandle});
            }
        },
        /**
         * updates all preview Windows or the specific one passed in
         * @param {Object} [args]
         * @param {Object} args.window the parent window for this plugin (for popup support)
         * @param {Object} args.plugin
         * @private
         */
        update: function(args) {
            var win;
            // Add any queued preview windows if they've been loaded (i.e. have a windowhandle now) since being added
            if(!args || !args.plugin || !args.plugin.id) {
                for(win in this.windows) {
                    if(this.windows.hasOwnProperty(win)) {
                        for(var pluginId in this.windows[win]) {
                            if(this.windows[win].hasOwnProperty(pluginId)) {
                                if(!this.windows[win][pluginId].plugin) {
                                    this.windows[win][pluginId].plugin = this.windowobjects[win].document.getElementById(pluginId);
                                }
                                if(this.windows[win][pluginId].plugin && this.windows[win][pluginId].plugin.windowhandle) {
                                    this.windows[win][pluginId].windowhandle = this.windows[win][pluginId].plugin.windowhandle;
                                    _plugin.api.addPreviewWindow({windowhandle: this.windows[win][pluginId].windowhandle});
                                    this.windows[win][pluginId].used = true;
                                }
                            }
                        }
                    }
                }
                return;
            }
            // Check if the window handle has changed since last update
            // If so, remove the old one, add the new one.
            if(!args.window) {
                args.window = window;
            }
            var windowid = this.getWindowId({window: args.window, readonly: true});
            if(windowid === -1 || !this.windows[windowid] || !this.windows[windowid][args.plugin.id]) {
                return;
            }
            if(this.windows[windowid][args.plugin.id].windowhandle !== args.plugin.windowhandle) {
                if(this.windows[windowid][args.plugin.id].windowhandle) {
                    _plugin.api.removePreviewWindow({windowhandle: this.windows[windowid][args.plugin.id].windowhandle});
                }
                this.windows[windowid][args.plugin.id].windowhandle = args.plugin.windowhandle;
                if(args.plugin.windowhandle) {
                    _plugin.api.addPreviewWindow({windowhandle: this.windows[windowid][args.plugin.id].windowhandle});
                }
            }
        },
        /**
         * removes a plugin object from the list of preview windows
         * @param {Object} args
         * @param {String|Object} args.plugin
         * @param {Object} args.window the parent window for this plugin (for popup support)
         * @private
         */
        remove: function(args) {
            if(!args) {
                return;
            }
            if(!args.window) {
                args.window = window;
            }
            var windowid = this.getWindowId({window:args.window, readOnly: true});
            if(windowid === -1 || !this.windows[windowid]) {
                return;
            }
            if(typeof args.plugin === "string" && windowid >=0 && this.windows[windowid] && this.windows[windowid][args.plugin]) {
                if(this.windows[windowid][args.plugin].windowhandle) {
                    _plugin.api.removePreviewWindow({windowhandle: this.windows[windowid][args.plugin].windowhandle});
                }
                delete this.windows[windowid][args.plugin];
            }
            if(args.plugin && args.plugin.id) {
                _plugin.api.removePreviewWindow({windowhandle: args.plugin.windowhandle});
                delete this.windows[windowid][args.plugin.id];
            }
        },
        dump: function() {
            _log("Dumping Preview Windows...");
            for(var win in this.windows) {
                if(this.windows.hasOwnProperty(win)) {
                    _log("  window: "+this.windowobjects[win].document.location.pathname);
                    for(var pluginId in this.windows[win]) {
                        if(this.windows[win].hasOwnProperty(pluginId)) {
                            _log("    ID: " + pluginId + ", windowhandle: " + this.windows[win][pluginId].windowhandle + ", used: "+this.windows[win][pluginId].used);
                        }
                    }
                }
            }
        }
    };
    /**
     * manages asynchronous loading/resetting of windowhandles for remote video objects related to calls
     * and adds the window to the call if it's async loaded after the id has been added to the call
     *
     * @private
     */
    var videowindowsbycall = {
        // calls: map keyed by callId
        //        each element is a map keyed by window and pluginId, containing:
        //        plugin: the plugin object (JSAPI/DOM)
        //        windowhandle: the last known windowhandle added for this plugin id
        calls: {},
        windowobjects: [],
        getWindowId: function(args) {
            var win = args.window;
            var windowid = this.windowobjects.indexOf(win);
            if(windowid === -1 && !args.readOnly) {
                this.windowobjects.push(win);
                windowid = this.windowobjects.indexOf(win);
            }
            return windowid;
        },
        /**
         * adds a video plugin to a call, adding the call to the map if it doesn't exist
         * @param {Object} args
         * @param {String|Number} args.callId
         * @param {String|Object} args.plugin id of the video plugin or the plugin object itself
         * @param {Object} args.window the parent window for this plugin (for popup support)
         * @private
         */
        add: function(args) {
            var windowid;
            if(!args) {
                return;
            }
            if(!args.callId) {
                return;
            }
            if(!args.window) {
                args.window = window;
            }
            if(!this.calls[args.callId]) {
                this.calls[args.callId] = [];
            }
            windowid = this.getWindowId({window:args.window});
            if(!this.calls[args.callId][windowid]) {
                this.calls[args.callId][windowid] = {};
            }
            if(typeof args.plugin === "string") {
                this.calls[args.callId][windowid][args.plugin] = {
                    windowhandle: null,
                    plugin: null,
                    used: false
                };
            } else if(args.plugin && args.plugin.id) {
                this.calls[args.callId][windowid][args.plugin.id] = {
                   windowhandle: args.plugin.windowhandle,
                   plugin: args.plugin,
                   used:true
                };
                _plugin.api.addWindowToCall({callId: args.callId, windowhandle: args.plugin.windowhandle});
            }
        },
        /**
         * removes a plugin object from a call
         * @param {Object} args
         * @param {String|Number} args.callId
         * @param {String|Object} args.plugin
         * @param {Object} args.window the parent window for this plugin (for popup support)
         * @private
         */
        remove: function(args) {
            var windowid;
            if(!args) {
                return;
            }
            if(!args.callId) {
                return;
            }
            if(!this.calls[args.callId]) {
                return;
            }
            if(!args.window) {
                args.window = window;
            }
            windowid = this.getWindowId({window:args.window, readOnly: true});
            if(windowid === -1 || !this.calls[args.callId][windowid]) {
                return;
            }
            if(typeof args.plugin === "string" && this.calls[args.callId][windowid][args.plugin]) {
                if(this.calls[args.callId][windowid][args.plugin].windowhandle) {
                    _plugin.api.removeWindowFromCall({callId: args.callId, windowhandle: this.calls[args.callId][windowid][args.plugin].windowhandle});
                }
                delete this.calls[args.callId][windowid][args.plugin];
            }
            if(args.plugin && args.plugin.id) {
                _plugin.api.removeWindowFromCall({callId: args.callId, windowhandle: args.plugin.windowhandle});
                delete this.calls[args.callId][windowid][args.plugin.id];
            }
        },
        /**
         * updates all remote video plugins associated with a callid or the specific one passed in
         * @param {Object} args
         * @param {String|Number} args.callId
         * @param {Object} [args.plugin]
         * @param {Object} args.window the parent window for this plugin (for popup support)
         * @private
         */
        update: function(args) {
            if(!args) {
                return;
            }
            var win;
            // Add any queued windows to the call if they've been loaded (i.e. have a windowhandle now) since being added
            if(!args.plugin || !args.plugin.id) {
                if(args.callId) {
                    if(!this.calls[args.callId]) {
                        for(win in this.calls[args.callId]) {
                            if(this.calls[args.callId].hasOwnProperty(win)) {
                                for(var pluginId in this.calls[args.callId][win]) {
                                    if(this.calls[args.callId][win].hasOwnProperty(pluginId)) {
                                        if(!this.calls[args.callId][win][pluginId].plugin) {
                                            this.calls[args.callId][win][pluginId].plugin = this.windowobjects[win].document.getElementById(pluginId);
                                        }
                                        if(this.calls[args.callId][win][pluginId].plugin && this.calls[args.callId][win][pluginId].plugin.windowhandle) {
                                            this.calls[args.callId][win][pluginId].windowhandle = this.calls[args.callId][win][pluginId].plugin.windowhandle;
                                            _plugin.api.addWindowToCall({callId: args.callId, windowhandle: this.calls[args.callId][win][pluginId].windowhandle});
                                            this.calls[args.callId][win][pluginId].used = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return;
            }
            // Check if the window handle has changed since last update
            // If so, remove the old one, add the new one.
            if(!args.window) {
                args.window = window;
            }
            win = this.getWindowId({window:args.window, readOnly:true});
            if(win === -1) {
                return;
            }
            for(var call in this.calls) {
                if(this.calls.hasOwnProperty(call)) {
                    if(this.calls[call][win] && this.calls[call][win][args.plugin.id]) {
                        if(this.calls[call][win][args.plugin.id].windowhandle !== args.plugin.windowhandle) {
                            if(this.calls[call][win][args.plugin.id].windowhandle) {
                                _plugin.api.removeWindowFromCall({callId: call, windowhandle: this.calls[call][win][args.plugin.id].windowhandle});
                            }
                            this.calls[call][win][args.plugin.id].windowhandle = args.plugin.windowhandle;
                            if(args.plugin.windowhandle) {
                                _plugin.api.addWindowToCall({callId: call, windowhandle: this.calls[call][win][args.plugin.id].windowhandle});
                            }
                        }
                    }
                }
            }
        },
        /**
         * currently unused
         * @param {Object} args
         * @param {String|Number} args.callId
         * @private
         */
        addCall: function(args) {
            if(args.callId) {
                if(this.calls[args.callId]) {
                    return;
                } else {
                    this.calls[args.callId] = [];
                }
            }
        },
        /**
         * delete a callId from the map, removing all window handles and clearing up
         * @param {Object} args
         * @param {String|Number} args.callId
         * @private
         */
        deleteCall: function(args) {
            if(args.callId) {
                if(this.calls[args.callId]) {
                    for(var win in this.calls[args.callId]) {
                        if(this.calls[args.callId].hasOwnProperty(win)) {
                            for(var plugin in this.calls[args.callId][win]) {
                                if(this.calls[args.callId][win].hasOwnProperty(plugin)) {
                                    if(this.calls[args.callId][win][plugin].windowhandle) {
                                        _plugin.api.removeWindowFromCall({callId: args.callId, windowhandle: this.calls[args.callId][win][plugin].windowhandle});
                                    }
                                }
                            }
                        }
                    }
                    delete this.calls[args.callId];
                }
            }
        },
        dump: function() {
            _log("Dumping Video Windows...");
            for(var call in this.calls) {
                if(this.calls.hasOwnProperty(call)) {
                    _log("  callId: "+call);
                    for(var win in this.calls[call]) {
                        if(this.calls[call].hasOwnProperty(win)) {
                            _log("    window: "+this.windowobjects[win].document.location.pathname);
                            for(var pluginId in this.calls[call][win]) {
                                if(this.calls[call][win].hasOwnProperty(pluginId)) {
                                    _log("      ID: " + pluginId + ", windowhandle: " + this.calls[call][win][pluginId].windowhandle + ", used: "+this.calls[call][win][pluginId].used);
                                }
                            }
                        }
                    }
                }
            }
        }

    };

    var videowindowloadedcallbacks = {
        windowobjects: [],
        getWindowId: function(args) {
            var win = args.window;
            var windowid = this.windowobjects.indexOf(win);
            if(windowid === -1 && !args.readOnly) {
                this.windowobjects.push(win);
                windowid = this.windowobjects.indexOf(win);
                this.callbacks[windowid] = {};
            }
            return windowid;
        },
        callbacks: []
    };

    /**
     * called when a video plugin object is loaded or the window handle for a video plugin object changes
     * @param pluginobject the DOM element (sort-of - not so much on IE) of the plugin object
     * @param windowhandle the window handle of the plugin object - passed here because dereferencing it from the plugin object on IE sometimes causes a reference error (even checking typeof on it)
     * @private
     */
    var windowhandleupdated = function(pluginobject,windowhandle, win) {
        if(!win) {
            win = window;
        }
        _log("Updating plugin " + " on " + win.document.location.pathname + " windowhandle: " + windowhandle, pluginobject);
        var element;
        if(windowhandle && windowhandle !== "00000000") {
        // updated window handle may be either a preview or a remote window - update both, updates will ignore if not already stored...
            var windowid = videowindowloadedcallbacks.getWindowId({window:win});
            var updated = false;
            for(var vidpluginid in videowindowloadedcallbacks.callbacks[windowid]) {
                if(videowindowloadedcallbacks.callbacks[windowid].hasOwnProperty(vidpluginid)) {
                    try {
                        updated = true;
                        element = win.document.getElementById(vidpluginid);
                        previewwindows.update({"window": win, plugin: element, windowhandle: windowhandle});
                        videowindowsbycall.update({"window":win, plugin: element, windowhandle: windowhandle});
                        if(element && element.windowhandle && pluginobject.windowhandle && element.windowhandle === pluginobject.windowhandle) {
                            var onloaded = videowindowloadedcallbacks.callbacks[windowid][vidpluginid];
                            if(!videowindowloadedcallbacks.callbacks[windowid][vidpluginid].wascalled) {
                                if(onloaded) {
                                    onloaded.callback(vidpluginid);
                                }
                                videowindowloadedcallbacks.callbacks[windowid][vidpluginid].wascalled = true;
                            }
                        }
                    }
                    catch(e) {
                        _log("Warning: internal window handle update error", e);
                        if(console.trace) console.trace();
                        // IE throws an exception, ff/chrome leaves windowhandle undefined on not fully instantiated plugins
                    }
                }
            }
        }
        //previewwindows.dump();
        //videowindowsbycall.dump();
    };
    var windowHandleUpdaters = {
        windowobjects: [],
        windowHandleUpdaters: [],
        _getWindowId: function(args) {
            var win = args.window;
            var windowid = this.windowobjects.indexOf(win);
            if(windowid === -1 && !args.readOnly) {
                this.windowobjects.push(win);
                windowid = this.windowobjects.indexOf(win);
            }
            return windowid;
        },
        get: function(win) {
            var windowId = this._getWindowId({window:win});
            if(!this.windowHandleUpdaters[windowId]) {
                this.windowHandleUpdaters[windowId] = function(pluginobject,windowhandle) {
                    return(windowhandleupdated(pluginobject,windowhandle,win));
                };
            }
            return this.windowHandleUpdaters[windowId];
        }
    };
    /**
     * global(window) level function object to handle video plugin object onLoad
     * @returns undefined
     */
    window._cwic_onVideoPluginLoaded = function(videopluginobject) {
        try {
            windowhandleupdated(videopluginobject, videopluginobject.windowhandle, window);
            _log("_window updated");
        }
        catch(e) {
            // IE throws an exception when dereferencing a property on an invisible (display: none) object
        }
        _removeListener(videopluginobject,'windowhandleupdated',windowHandleUpdaters.get(window));
        _addListener(videopluginobject,'windowhandleupdated',windowHandleUpdaters.get(window));
    };
    /**
     * global(window) level function to handle video plugins loaded in iframe/popup window
     * Should be called from video object onLoad handler {@link $.fn.cwic-createVideoWindow}<br>
     * Example onLoad function in iframe.html
     * @example
     * function onvideoPluginLoaded(obj) {
     *     window.parent._cwic_onPopupVideoPluginLoaded(obj, window);
     * }
     * @returns undefined
     * @param  {JSAPI} videopluginobject video plugin object (DOM Element)
     * @param  {DOMWindow} win iframe or popup window
     * @public
     */
    window._cwic_onPopupVideoPluginLoaded = function(videopluginobject, win) {
        try {
            windowhandleupdated(videopluginobject, videopluginobject.windowhandle, win);
            _log("popup _window updated: " + win.document.location.pathname);
        }
        catch(e) {
            // IE throws an exception when dereferencing a property on an invisible (display: none) object
        }
        _removeListener(videopluginobject,'windowhandleupdated',windowHandleUpdaters.get(win));
        _addListener(videopluginobject,'windowhandleupdated',windowHandleUpdaters.get(win));
    };

    /**
     * Wait for the document to be ready, and try to load the plugin object.<br>
     * If cwic was successfully initialized, call the options.ready handler, <br>
     * passing some stored properties (possibly empty), <br>
     * otherwise call the options.error handler<br>
     * @param {Object} options Is a set of key/value pairs to configure the phone registration.  See {@link $.fn.cwic-settings} for options.
     * @example
     * jQuery('#phone').cwic('init', {
     *   ready: function(defaults) {
     *     console.log('phone is ready');
     *   },
     *   error: function(status) {
     *     console.log('phone cannot be initialized : ' + status);
     *   },
     *   log: function(msg, exception) {
     *     console.log(msg); if (exception) { console.log(exception); }
     *   },
     *   errorMap: {
     *     // localized message for error code #17
     *     17 : { message: 'Nom d'utilisateur ou mot de passe incorrect' }
     *   },
     *   node: 'http://mynode.com:8080',
     *   predictDevice: function(args) {
     *       return settings.devicePrefix+args.username;
     *   }
     *   encodeBase64: function(str) {
     *     encoded = myBase64Implementation(str);
     *     return encoded;
     *   }
     *});
     */
    function init(options) {
        _log(true, 'init', arguments);

        var $this = this;

        // the application can replace/extend the default error map
        if (typeof options.errorMap !== "undefined") {
            // extend the default errorMap
            $.each(options.errorMap, function(key, info) {

                if (typeof info === "string") {
                    errorMap[key] = $.extend({}, errorMap[key], { message: info });
                }
                else if (typeof info === "object") {
                    errorMap[key] = $.extend({}, errorMap[key], info);
                }
                else {
                    _log('ignoring invalid custom error [key=' + key +']', info);
                }
            });
        }

        // extend the default settings with options
        $.extend(settings, options);

        // this function is called by the browser after the cwic plugin object is loaded
        // see the <param> of the inserted plugin <object>
        /**
         * Phone Object onLoad handler
         * @returns undefined
         */
        window._cwic_onPluginLoaded = function() {
            var error;
            try {
                var cwcObject = document.getElementById('cwc-plugin'); // re-select object

                if (cwcObject) {
                    // plugin is available, update global reference
                    _plugin = {};

                    _plugin.api = cwcObject;
                    _plugin.version = _plugin.api.version;
                 }

                 if (_plugin !== null) {
                    _log("initialized plugin version " + _plugin.version.plugin + " (ecc " + _plugin.version.ecc + ")");

                    var defaults = {},s,m,phoneRegistered=false;

                    s = $(location).get(0).search;
                    if ((m = (/user=(.*?)($|&)/i).exec(s))) { defaults.user = m[1]; }
                    if ((m = (/cucm=(.*?)($|&)/i).exec(s))) { defaults.cucm = m[1]; }

                    // automatically shutdown when the window unloads
                    $(window).unload(function() { shutdown(); });

                    var currState = _plugin.api.connectionStatus;
                    if(currState === 'eReady') {
                        phoneRegistered=true;
                    }
                    _registerSystemCallbacks($this);
                    _registerCallChangeCallbacks($this);

					var phoneMode = _plugin.api.mode;
                    if ($.isFunction(settings.ready)) { settings.ready(defaults,phoneRegistered,phoneMode); }
                    if(phoneRegistered) {
                        var calls = _plugin.api.getCalls();
                        for(var i=0;i<calls.calls.length;i++) {
                            _triggerConversationEvent($this, calls.calls[i], 'state');
                        }
                    }

                    return;
                }
                else {
                    error = errorMap.PluginNotAvailable;
                }
            }
            catch (e) {
                if(console && console.trace) {
                    console.trace();
                }
                _plugin = null;
                error = $.extend({}, errorMap.PluginNotAvailable, e);
            }

            // TODO: Remove hardcoded string
            _triggerError($this, settings.error, 'cannot initialize Cisco Web Communicator', error);

        }; // _cwic_onPluginLoaded

        $(document.body).ready(function() {

            if (_plugin === null) {
                // create plugin object and attach to DOM body

                try {
                	// try to load the ActiveX/NPAPI plugin, throw an error if it fails
                	
                    if (!$.browser.jasmine) {
                        if ($.browser.msie && parseInt($.browser.version, 10) >= 7) {
                            // Internet Explorer 7+
                            try {
    	                        var pluginExists = new ActiveXObject("CiscoSystems.CWCVideoCall");
        	                    // no exception, plugin is available
        	                    // how to check plugin is enabled in IE ?
            	                pluginExists = null;
                			}
                			catch(dummy_e) {
                				// exception, plugin is not available
                				try {
                					// check if previous release is installed
	                				var previousPluginExists = new ActiveXObject("ActivexPlugin.WebPhonePlugin.1");
                					// no exception. previous plugin is available
                					previousPluginExists = null;
                					throw getError('ReleaseMismatch');
                				}
                				catch(ppe) {
                					// no previous plugin, ignore silently
                				}
                			
                				throw getError('PluginNotAvailable');
                			}
                        }

                        else if ($.browser.mozilla || $.browser.webkit) {
                            // Mozilla/Webkit
                            // check plugin availability through MIME types
                            var pluginMimeType = navigator.mimeTypes["application/x-ciscowebcommunicator"];
                            if (typeof pluginMimeType === "undefined") {
                            	// plugin not available, check if any previous release is installed
                            	pluginMimeType = navigator.mimeTypes["application/x-ciscowebphone"];
                            	if (typeof pluginMimeType !== "undefined") {
                            		// previous plugin is available
                            		throw getError('ReleaseMismatch');
                            	}
                            	
                                throw getError('PluginNotAvailable');
                            }
                            
                            if (pluginMimeType.enabledPlugin === null) {
	                            // additional flag indicating the plugin is installed but disabled
                            	var err = getError('PluginNotAvailable');
                            	err.pluginDisabled = true;
                            	throw err;
                            }
                        }

                        else {
                            throw getError('BrowserNotSupported');
                        }

                        $(document.body).append('<object id="cwc-plugin" width="0" height="0" type="application/x-ciscowebcommunicator"><param name="onload" value="_cwic_onPluginLoaded"></object>');
                    }
                }
                catch (e) {
                    _plugin = null;
	                _triggerError($this, settings.error, e);
                }
            }

        }); // document ready

        return $this;
    } // end of init

    var videopluginid = 1;
    /**
     * Update the global registration object with information from the native plugin
     */
    function _updateRegistration(state) {
        //registration.mode = _plugin.api.mode;

        // get the available devices returned by the plugin
        var ret = _plugin.api.getAvailableDevices();
        var devices = ret.devices;

        // merge device information returned by the plugin
        $.each($.makeArray(devices), function(i, device) {
            if (device.name){
                var deviceName = $.trim(device.name);
                registration.devices[deviceName] = $.extend({}, registration.devices[deviceName], device);
                // associate an array of lines to each device
                //registration.devices[deviceName].lines = _plugin.api.getAvailableLines(deviceName);
            }
        });

        var pluginDevice = '';//_plugin.api.PreferredDevice;
        if (pluginDevice !== '') {
            $.extend(registration.device, { name: pluginDevice });
        }

		// add device and line info except during logout
		if (state != 'eIdle') {
			registration.device = $.extend({}, _plugin.api.device);

			registration.line = $.extend(registration.line, _plugin.api.line);
		}
    }

    /**
     * Creates an object that can be passed to startConversation, addPreviewWindow or updateConversation('addRemoteVideoWindow').
     * The object is inserted into the element defined by the jQuery context - e.g. jQuery('#placeholder').cwic('createVideoWindow') inserts the videowindow under jQuery('#placeholder')
     * @example $('#videocontainer').cwic('createVideoWindow',{id: 'videoplugin',success: function(pluginid) {$('#conversation').cwic('updateConversation',{'addRemoteVideoWindow': pluginid});}});
     * @param {Object} [settings] Settings to use when creating the video render object
     * @param {String} [settings.id = generated] The DOM id of the element to be created
     * @param {Function} [settings.success] Called when the object is loaded and ready for use plugin id is passed as a parameter
     * @param {Function} [onload] Optional, not recommended for video windows created in the same window as the main phone plugin.
     * <br>Mandatory in popup windows or iframes, must call parent or opener {@link window._cwic_onPopupVideoPluginLoaded} in the onLoad handler.
     * <br>Single parameter is the videoplugin object that must be passed to the parent handler.
     * <br>
     * <br>NOTE: If video isn't supported on the platform, this function will just 'do nothing' and the success() callback will never be called.
     */
    function createVideoWindow(settings) {
        var $this = this;
        var videoSupportedByPlugin = ((!_plugin || !_plugin.api) ? undefined : _plugin.api.supportsVideo);
        if(videoSupportedByPlugin) {
            settings = settings || {};
            settings.window = settings.window || window;
            /* TODO: Remotely inject function into other window if possible
            if(settings.window !== window && !settings.window._cwic_onVideoPluginLoaded) {
                settings.window._cwic_onVideoPluginLoaded = _cwic_onVideoPluginLoaded;
            } */
            var mimetype = "application/x-cisco-cwc-videocall";
            var onload = settings.onload || "_cwic_onVideoPluginLoaded";
            var callback = settings.success;// || videopluginloaded;
            var id = settings.id || '_cwic_vw'+videopluginid;
            videopluginid++;
            var windowid = videowindowloadedcallbacks.getWindowId({window:settings.window});
            videowindowloadedcallbacks.callbacks[windowid][id] = {callback: callback, wascalled: false};
            var elemtext='<object type="'+mimetype+'" id="'+id+'"><param name="onload" value="'+onload+'"></param></object>';
            //jQuery(settings.window.document.getElementById($this.selector)).append(elemtext);
            jQuery($this).append(elemtext);
        }
        return $this;
    }
    /**
     * Assign a video window object to preview (self view)
     * @param {Object} args arguments object
     * @param {DOMWindow} [args.window] DOM Window that contains the plugin Object defaults to current window
     * @param {String|PluginObject} args.previewWindow id or DOM element of preview window
     */
    function addPreviewWindow(args) {
        var $this = this;
        args.window = args.window || window;
        if(args.previewWindow) {
            previewwindows.add({plugin: args.previewWindow, "window": args.window});
            //previewwindows.dump();
        }
        return $this;
    }
    /**
     * Remove a video window object from preview (self view)
     * @example
     * $('#phone').cwic('removePreviewWindow',{previewWindow: 'previewVideoObjectID'});
     * $('#phone').cwic('removePreviewWindow',{previewWindow: previewVideoObject, window: iFramePinPWindow});
     * @param {Object} args arguments object
     * @param {DOMWindow} [args.window] DOM Window that contains the plugin Object defaults to current window
     * @param {String|Object} args.previewWindow id or DOM element of preview window
     */
    function removePreviewWindow(args) {
        var $this = this;
        args.window = args.window || window;
        if(args.previewWindow) {
            previewwindows.remove({plugin: args.previewWindow, "window": args.window});
            //previewwindows.dump();
        }
        return $this;
    }
    /**
     * Shuts down the API<br>
     * <ul><li>Unregisters the phone</li>
     * <li>Unbinds all cwic events handlers</li>
     * <li>Clears all cwic data</li>
     * <li>Releases the CWC browser plugin instance</li></ul>
     * @example
     *  jQuery(window).unload(function() { <br>
     *      jQuery('#phone').cwic('shutdown'); <br>
     *  }); <br>
     */
    function shutdown() {
        _log(true, 'shutdown', arguments);

        unregisterPhone();

        // unbind all cwic events handlers
        $(document).unbind('.cwic');

        // clear callbacks and logout if needed
        _reset();

        try {
            // release the plugin instance
            if (_plugin && _plugin.api && typeof _plugin.api.releaseInstance !== "undefined") {
                _plugin.api.releaseInstance();
            }
        }
        catch(e) {
        }

        //$('#cwc-plugin').remove();
        _plugin = null;

        }

    /**
     * @private
     */
    function _triggerAuthenticationResult($this, result) {
        _log(true, 'authenticationResult '+result);
        if(result === "eNoError") {
            if(registering.authenticatedCallback) {
                registering.authenticatedCallback();
            }
        } else {
            if(registering.authenticatedCallback) {
                registering.authenticatedCallback = null;
                delete registering.authenticatedCallback;
            }
            _triggerError($this,registering.errorCb,getError(result,'LoginError'),result, {registration: registration});
        }
    }
    /**
     * @private
     */
    function _triggerProviderEvent($this,state) {
        _log(true, 'providerState ' + state);

        var event = $.Event('system.cwic');
        event.phone = { status: state };

        // update global registration and add it to the system event
        _updateRegistration(state);
        event.phone.registration = registration;

        //providerStates.push(state);

        if (state === 'eReady') {
            // check providerState contains 'AwaitingIpAddress' while RecoveryPending,
            // otherwise not really ready
            /*
            if ($.inArray('RecoveryPending', providerStates) != -1 &&
                $.inArray('AwaitingIpAddress', providerStates) == -1) {
                return;
            }
            */

            // clear provider state history
            //providerStates = [];

            // call success callback only if registering phone
            if (registering.registeringPhone || registering.switchingMode) {
                registering.registeringPhone = false;
                registering.switchingMode = false;

                // finish registering

                if (registering.successCb) {
                    registering.successCb($.extend({}, registration, {
                        cucm: $.makeArray(registering.CUCM),
                        password: registering.password,
                        successfulCucm: {
                            tftp: _plugin.api.successfulTftpAddress,
                            cti: _plugin.api.successfulCtiAddress
                        }
                    }));
                }
                else {
                    _log('warning: no registerPhone success callback');
                }
            }

            event.phone.ready = true;
            $this.trigger(event);
            var calls = _plugin.api.getCalls();
            for(var i=0;i<calls.calls.length;i++) {
                _triggerConversationEvent($this, calls.calls[i], 'state');
            }
        }
        else if (state === 'eIdle') {
            if(registering.unregisterCb) {
                registering.unregisterCb();
            }
            $this.trigger(event);
        }
        else {
            $this.trigger(event);
        }
    } // end of _triggerProviderEvent

    function _registerSystemCallbacks($this) {
        _addListener(_plugin.api,"connectionstatuschange",function(_state) {
            _triggerProviderEvent($this,_state);
        });
        _addListener(_plugin.api,"connectionfailure",function(_status) {
            var errorKey = getError(_status, 'LoginError');
            _log(true, _status,errorKey);
            _triggerError($this, registering.errorCb, errorKey, _status, { registration: registration });
        });
        _addListener(_plugin.api,"authenticationresult",function(result) {
            _triggerAuthenticationResult($this,result);
        });
         _addListener(_plugin.api,"authenticationstatuschange",function(result) {
            _log(true, 'authenticationStatus '+result);
            //_triggerAuthenticationResult($this,result);
        });
         _addListener(_plugin.api,"callcontrolmodechange",function(result) {
			if(result.phoneMode !== 'eNoMode') {
				registration.mode = result.phoneMode;
				_triggerProviderEvent($this, 'ePhoneModeChanged');
			}
            _log(true, 'callcontrolmodechange. Mode: ' + result.phoneMode + ', deviceName: ' + result.deviceName + ', DN: ' + result.lineDN );
        });


    }
    function _registerCallChangeCallbacks($this) {
        // subscribe to call updates

        _addListener(_plugin.api,"callstatechange",function(call) {
            _triggerConversationEvent($this,call,'state');
        });

        _addListener(_plugin.api, "videoresolutionchange", function(params) {
            _log(true, 'video resolution change detected for call ' + params.callId +
                 '. Height: ' + params.height +
                 ', width: ' + params.width, params);

            // trigger a conversation event with a 'videoResolution' property
            _triggerConversationEvent($this, {
                callId: params.callId,
                videoResolution: {
                    width: params.width,
                    height: params.height
                }
            },
            'render');
        });
    }

    /**
     * Switch mode on a session that's already authorised <br>
     * @example
     * $('#phone').cwic('switchMode',{
     *     success: function(registration) { console.log("Phone is in "+registration.mode+" mode"); },
     *     error: function(err) { console.log("Error: "+error.message+" while switching mode"); },
     *     mode: "DeskPhone",
     *     device: "SEP01234567"
     *     });
     * @param options
     * @param {Function} [options.progress] A handler called when the mode switch has passed pre-conditions.<br>If specified, the handler is called when the switchMode operation starts.
     * @param {Function} [options.success] A handler called when mode switch complete with registration as a parameter
     * @param {Function} [options.error] A handler called when the mode switch fails on pre-conditions.
     * @param {Function} [options.mode] The new mode 'SoftPhone'/'DeskPhone'. defaults to SoftPhone
     * @param {Function} [options.device] Name of the device (e.g. SEP012345678, CSFUSER) to control. defaults to picking first available
     * @param {Function} [options.line] Phone number of a line valid for the specified device (e.g. '0000'). defaults to picking first available
     */
    function switchPhoneMode(options) {
        var ret;
        var $this = this;
        registering.successCb = $.isFunction(options.success) ? options.success : null;
        registering.errorCb = $.isFunction(options.error) ? options.error : null;
        registering.switchingMode = true;

        //TODO: {phoneMode: registration.mode, deviceName: _predictDevice({username: registration.user}),lineDN: ""}
        var mode = options.mode || 'SoftPhone';
        var device = options.device || (options.mode === 'SoftPhone'? _predictDevice({username: registration.user}) : '');
        var linedn = options.line || '';
        _log('About to call switchMode with mode: ' + mode + ', deviceName: ' + device + ', lineDn: ' + linedn);
        ret = _plugin.api.switchMode({phoneMode: mode, deviceName: device, lineDN: linedn});

        if (ret.error) {
            if(options.error && $.isFunction(options.error)) {
                _triggerError($this, options.error, getError(ret), {message: ret});
            }
        } else {
            if (options.progress && $.isFunction(options.progress)) {
                options.progress({message: ret});
            }
        }

        return this;
    }

    /**
     * Register phone to CUCM (SIP register)
     * @param args A map with:
     * @param {String} args.user The CUCM end user name (required)
     * @param {String|Object} args.password String - clear password. Object - {encrypted: encoded password, cipher:"cucm"}
     * @param {boolean} [args.authenticate] A flag to specify if user should be authenticated against CUCM (optional).
     * If the user is already authenticated then the application has the option to bypass this additional authentication against CUCM. Authentication can be made against the CCMCIP interface of CUCM (HTTP Basic).
     * This additional authentication requires a server-side component to be deployed (see the node parameters of the init function).
     * @param {String|Object|Array} args.cucm The list of CUCM(s) to attempt to register with (required).<br>
     * If String, it will be used as both the CCMCIP and TFTP address.<br>
     * If Array, a list of String or Object as described above.
     * @param {String[]} args.cucm.tftp TFTP addresses
     * @param {String[]} [args.cucm.ccmcip] CCMCIP address (will use tftp values if not present).
     * @param {String} [args.mode]  Register the phone in this mode.  Available modes are "SoftPhone" or "DeskPhone".Default of intelligent guess is applied after a device is selected.<br>
     * @param {Function} [args.devicesAvailable(devices)] Callback called after successful authentication.
     * If this callback is not specified, cwic applies the default device selection algorithm.  An array of {@link device} objects is passed so the application can select the device.<br>
     * Return one of:<ul><li>device object to register with that device</li><li>null to fall back to default selection algorithm</li><li>false to stop registration (raises an error).</li></ul>
     * @param {Function} [args.error(err)] Callback called if the registration fails.
     * @param {Boolean} args.useCcmcip Authenticate using ccmcip (overrides settings if present).
     * @param {Function} [args.success(registration)] Callback called when registration succeeds. A {@link registration} object is passed to the callback:
     * registerPhone examples <br>
     * @example
     * // *************************************
     * // register with lab CUCM in default mode (SoftPhone)
     * jQuery('#phone').cwic('registerPhone', {
     *     user: 'fbar',
     *     password: 'secret', // clear password
     *     cucm: '1.2.3.4',
     *     success: function(registration) {
     *         console.log('registered in mode ' + registration.mode);
     *         console.log('registered with device ' + registration.device.name);
     *     }
     * });
     * @example
     * // *************************************
     * // register with Alpha CUCM in DeskPhone mode
     * jQuery('#phone').cwic('registerPhone', {
     *     user: 'fbar',
     *     password: {
     *         encoded: 'GJH$&*"@$%$^BLKJ==',
     *         cipher: 'cucm'
     *     },
     *     mode: 'DeskPhone',
     *     cucm: '1.2.3.4',
     *     success: function(registration) {
     *         console.log('registered in mode ' + registration.mode);
     *         console.log('registered with device ' + registration.device.name);
     *     }
     * );
     * @example
     * // *************************************
     * // register with Alpha CUCM in SoftPhone mode, select ECP{user} device
     * jQuery('#phone').cwic('registerPhone', {
     *     user: 'tvanier',
     *     password: {
     *         encoded: 'GJH$&*"@$%$^BLKJ==',
     *         cipher: 'cucm'
     *     },
     *     mode: 'SoftPhone',
     *     cucm: {
     *         ccmcip: ['1.2.3.4'],
     *         tftp: ['1.2.3.5']
     *     },
     *     devicesAvailable: function(devices) {
     *         for (var i = 0; i &lt; devices.length; i++) {
     *             var device = devices[i];
     *             if (device.name.match(/^ECP/i)) {
     *                 return device;
     *             } // starts with 'ECP'
     *         }
     *         return false; // stop registration if no ECP{user} device found
     *     },
     *     success: function(registration) {
     *         console.log('registered in mode ' + registration.mode);
     *         console.log('registered with device ' + registration.device.name);
     *     },
     *     error: function(status) {
     *         console.log('cannot register phone: ' + status);
     *     }
     * );
     */
    function registerPhone(args) {
        _log(true, 'registerPhone', arguments);

        var $this = this;

        // flag to indicate cwic is in the process of registering a phone
        registering.registeringPhone = true;

        // reset global registration object
        registration = {
            user: args.user,
            mode: args.mode || "SoftPhone",
            devices: {},
            authenticate: typeof args.authenticate === 'boolean' ? args.authenticate : false
        };

        // validate password and make it an object
        var password = args.password;
        var clearPassword = '';

        var devicesAvailableCb = $.isFunction(args.devicesAvailable) ? args.devicesAvailable : null;

        registering.successCb = $.isFunction(args.success) ? args.success : null;
        registering.errorCb = $.isFunction(args.error) ? args.error : null;
        registering.CUCM = args.cucm;
        registration.useCcmcip = false;
        if(typeof args.useCcmcip !== "undefined") {
            registration.useCcmcip = args.useCcmcip;
        } else {
            registration.useCcmcip = args.useCcmcip;
        }

        if (!_plugin) {
            //TODO: remove hardcoded string
            return _triggerError($this, registering.errorCb, errorMap.PluginNotAvailable, 'Plugin is not available or has not been initialized', { registration: registration });
        }

        if (typeof password === "string") {
            // clear password, encrypt it
            password = { cipher: 'cucm', encrypted: _plugin.api.encryptCucmPassword(args.password) };
            if (registration.authenticate) { clearPassword = args.password; }
        } else if (typeof password !== "object" || (password.cipher !== "cucm" && password.cipher !== "base64"))  {
            return _triggerError($this, registering.errorCb, errorMap.InvalidArguments, 'invalid password (type ' + typeof password + ')', { registration: registration });
        }

        // make preferredDevice a string (possibly empty)
        var preferredDevice = args.device || _plugin.api.PreferredDevice;
        if (typeof preferredDevice === "object") {
            preferredDevice = (preferredDevice.name ? preferredDevice.name : '');
        }

        // make preferredLine a string (possibly empty)
        var preferredLine = args.line || _plugin.api.PreferredLine;
        if (typeof preferredLine === "object") {
            preferredLine = (preferredLine.directoryNumber ? preferredLine.directoryNumber : '');
        }

        // build an array of strings (CUCM addresses)
        var cucm = [];
        var ccmcip = [];

        $.each($.makeArray(args.cucm), function(i, elem) {
            if (typeof elem === "string") {
                // cucm string can be 'lab call manager 1.2.3.4'
                var a = elem.split(' ');
                cucm.push(a[a.length-1]);
            }
            else if (typeof elem === "object") {
                if ($.isArray(elem.ccmcip)) { ccmcip = elem.ccmcip; }
                if ($.isArray(elem.tftp)) { cucm = elem.tftp; }

                if (!$.isArray(elem.ccmcip) && !$.isArray(elem.tftp)) {
                    _log('registerPhone: no ccmcip and tftp properties for cucm');
                }
            }
            else {
                _log('registerPhone: ignoring cucm argument of type ' + typeof elem);
            }
        });

        _log('registerPhone: ' + cucm.length + ' cucm addresses');
        _log(true, cucm);

        _log("registerPhone of user=" + registration.user +
             ' (authenticate=' + registration.authenticate + ') in mode="' + registration.mode + '"');

        // reset first
        //_reset();

        if (!registration.user || registration.user === '') {
            return _triggerError($this, registering.errorCb, errorMap.InvalidArguments, 'Missing user name', { registration: registration });
        }

        if (!$.isArray(cucm) || cucm.length < 1) {
            return _triggerError($this, registering.errorCb, errorMap.NoCallManagerConfigured, 'Missing CUCM address', { registration: registration });
        }

        if (!registration.mode.match(/^(SoftPhone|DeskPhone)$/)) {
            return _triggerError($this, registering.errorCb, errorMap.InvalidArguments, 'Invalid phone mode "' + registration.mode + '"', { registration: registration });
        }

        //_plugin.api.PreferredPhoneMode = registration.mode;


        _plugin.api.TftpAddressList = cucm;
        _plugin.api.CtiAddressList = cucm;
        _plugin.api.CcmcipAddressList = (ccmcip.length > 0)? ccmcip : cucm;

        // keep track of previous states
        //var providerStates = [];


        // is the plugin already ready ?
        var currState = _plugin.api.connectionStatus;
        if (currState === 'eReady') {
            _triggerProviderEvent($this,currState);
        }
        registering.password = password;
        if (!registration.authenticate || registration.mode === "DeskPhone") {

            if (registration.mode === "DeskPhone" && (!preferredDevice || !preferredDevice.match(/^\s*SEP/i))) {
                preferredDevice = '';
                preferredLine = '';
            }

            //_plugin.api.PreferredDevice = preferredDevice;
            //_plugin.api.PreferredLine = preferredLine;

            if(currState !== 'eReady') {
                // CUCM user password is encrypted
                var ret = "Did nothing";
                if(password.encrypted) {
                    registering.authenticatedCallback = function() {
                        /*
                         * name
                         * description
                         * model
                         * modelDescription
                         * isSoftPhone
                         * isDeskPhone
                         * lineDNs[]
                         * serviceState
                         */
                        var ret = _plugin.api.getAvailableDevices();
                        var _devices = ret.devices;
                        _updateRegistration(currState);
                        if(devicesAvailableCb) {
                            devicesAvailableCb(_devices,registration.mode,function(phoneMode,deviceName,lineDN) {
                                var res = _plugin.api.connect({phoneMode: phoneMode, deviceName: deviceName, lineDN: lineDN});
                                if(res.error) {
                                    var error = getError(res.error);//errorMap[res.error] ? errorMap[res.error] : errorMap.LoginError;
                                    return _triggerError($this, registering.errorCb, error, res.error, { registration: registration });
                                }
                            });
                        } else {
                            var deviceName = "";
                            // If user has specified a device, use it to connect....
                            if(preferredDevice) {
                                deviceName = preferredDevice;
                            } else { //....otherwise, use the first available one
                                for(var i=0;i<_devices.length;i++) {
                                    if(registration.mode==="SoftPhone" && _devices[i].isSoftPhone) {
                                        deviceName = _devices[i].name;
                                        break;
                                    }
                                    if(registration.mode==="DeskPhone" && _devices[i].isDeskPhone) {
                                        deviceName = _devices[i].name;
                                        break;
                                    }
                                }
                            }
                            var res = _plugin.api.connect({phoneMode: registration.mode, deviceName: deviceName, lineDN: ''});
                            if(res.error) {
                                var error = getError(res.error);//errorMap[res.error] ? errorMap[res.error] : errorMap.LoginError;
                                return _triggerError($this, registering.errorCb, error, res.error, { registration: registration });
                            }
                        }

                        registering.authenticatedCallback = null;
                        delete registering.authenticatedCallback;
                    };
                    ret = _plugin.api.authenticate({username:registration.user, password:password.encrypted, useCcmcip: settings.useCcmcip});
                } else {
                    ret = _plugin.api.connect({phoneMode: registration.mode, deviceName: _predictDevice({username: registration.user}),lineDN: ""});
                }
                if(ret.error) {
                    var error = getError(ret.error);//errorMap[ret['Error']] ? errorMap[ret['Error']] : errorMap.LoginError;
                    return _triggerError($this, registering.errorCb, error, ret.error, { registration: registration });
                }
            }
        }
        else {
            // need to authenticate against CUCM here until the plugin supports it

            // to be called for each CUCM address until success
            var cucmAddresses = [].concat(cucm);

            var authenticateCcmcip = function() {

                var cucmAddress = cucmAddresses.shift();

                if (typeof cucmAddress === "undefined") {
                    _triggerError($this, registering.errorCb, errorMap.NoCucmFound, 'cannot register phone', { registration: registration });
                    return;
                }

                _log(true, 'authenticate against CUCM "' + cucmAddress + '"');

                $.ajax({
                    url: settings.node + '/phoneconfig/devices' + '?ccmcip=' + cucmAddress,
                    beforeSend : function(req) {
                        var auth = 'Basic ' + _encodeBase64(registration.user + ':' + clearPassword);
                        req.setRequestHeader('Authorization', auth);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        _log(true, 'CCMCIP failure with CUCM "' + cucmAddress + '" : ' + textStatus, errorThrown);
                        authenticateCcmcip(); // try next CUCM address
                    },
                    success: function(devices) {
                        registration.cucm = {
                            ccmcip: [cucmAddress],
                            tftp: [cucmAddress]
                        };

                        var selectedDevice = null;
                        var defaultDevice = null;

                        // default device selection algorithm
                        $.each(devices, function(i, device) {

                            _log(true, 'device=' + device.name + ' model="' + device.model + '"');

                            if (typeof device.name === "undefined" || typeof device.model === "undefined") {
                                // ignore this device and continue
                                return;
                            }

                            if (device.model.match(/^\s*Cisco\s+Unified\s+Client\s+Services\s+Framework\s*$/i)) {
                                device.csf = true;

                                // in SoftPhone mode, select a CSF device only
                                if (registration.mode === "SoftPhone") {
                                    if (device.name === preferredDevice) {
                                        selectedDevice = device;
                                    }

                                    // select a device whose name starts with ECP in priority, first CSF device otherwise
                                    if (device.name.match(/^ECP/i) || !defaultDevice) {
                                        defaultDevice = device;
                                    }
                                }
                            }

                            if (device.name.match(/^\s*SEP/i)) {
                                device.deskphone = true;

                                if (registration.mode === "DeskPhone") {
                                    if (device.name === preferredDevice) {
                                        selectedDevice = device;
                                    }

                                    // in DeskPhone mode, select first device whose name starts with SEP
                                    if (!defaultDevice) {
                                        defaultDevice = device;
                                    }
                                }
                            }

                            registration.devices[$.trim(device.name)] =
                                $.extend({}, registration.devices[$.trim(device.name)], device);
                        });

                        _log(true, 'default device is ' + (defaultDevice === null ? defaultDevice : defaultDevice.name));

                        if (devicesAvailableCb) {
                            // application wants to select device by itself
                            selectedDevice = devicesAvailableCb(devices, registration.mode);

                            // false means stop registering (null means use default selection)
                            if (selectedDevice === false) {
                                _log('registration interrupted');
                                return;
                            }
                        }

                        if (selectedDevice === null) {
                            selectedDevice = defaultDevice;
                        }

                        if (!selectedDevice) {
                            // TODO: remove hardcoded string
                            return _triggerError($this, registering.errorCb, errorMap.NoDevicesFound, 'no device found', { registration: registration });
                        }

                        if ((registration.mode !== "SoftPhone" && selectedDevice.csf) ||
                            (registration.mode !== "DeskPhone" && selectedDevice.deskphone)) {
                            // TODO: remove hardcoded string, convert error string to map of mode, deviceName
                            return _triggerError($this, registering.errorCb, errorMap.NoDevicesFound,
                                'cannot register in ' + registration.mode + ' mode with device "' + selectedDevice.name + '"', { registration: registration });
                         }

                        _log('selected device is "' + selectedDevice.name +'"');

                        _plugin.api.PreferredDevice = selectedDevice.name;

                        registration.device = selectedDevice;

                        _plugin.api.connect({phoneMode: registration.mode, deviceName: _plugin.api.PreferredDevice, lineDN: ''})
                    } // success
                }); // $.ajax

            }; // function authenticate

            authenticateCcmcip();
        }

        return $this;
    } // end of registerPhone

    /** <br>
     * Unregisters a phone from CUCM:<ul>
     * <li>Ends any active call if this is the last instance or forceLogout is set to true.</li>
     * <li>Unbinds all cwic event handlers</li>
     * <li>In softphone mode, SIP unregisters, in deskphone mode, closes the CTI connection.</li>
     * <li>Calls the optional complete handler (always called)</li></ul>
     * @param args Is a set of key/value pairs to configure the phone unregistration.
     * @param {function} [args.complete] Callback called when unregistration is complete.<br>
     * If specified, the handler is always called, even if the phone was not registered first, or if the unregistrations caused errors.
     * @param {boolean} args.forceLogout: If true, end the phone session even if registered in other instances.
     * unregisterPhone examples
     * @example
     * // *************************************
     * // unregister phone
     * jQuery('#phone')
     *     .unbind('.cwic')             // optional, done by unregisterPhone
     *     .cwic('unregisterPhone', {
     *         complete: function() {
     *             console.log('phone is unregistered');
     *         }
     * });
     */
    function unregisterPhone() {
        _log(true, 'unregisterPhone', arguments);

        var $this = this;


        if(typeof arguments[0] === "object" && typeof arguments[0].forceLogout !== 'undefined' && arguments[0].forceLogout) {
            _plugin.api.logout();

            // reset global registration object
            registration = {devices:{}};
        }

        _reset();

        if (typeof arguments[0] === "object" && typeof arguments[0].complete !== "undefined") {
            // call complete callback
            var complete = arguments[0].complete;
            registering.unregisterCb = function() {
                complete();
                registering.unregisterCb = null;
            };
        }

        return $this;
    }

    function _reset() {
        // clear all cwic data
        $('.cwic-data').removeData('cwic');

        // unbind/unregister event callbacks ?
    }

    function _triggerConversationEvent($this, conversation, topic) {
        var conversationId = conversation.callId;
        var conversationState = conversation.callState;


        // determine participant name and number
        var participant = {};
        // TODO: handle "Forwarded" and possibly "None"
        if (conversation.callType === "Outgoing") {
            participant.name = conversation.calledPartyName;
            participant.recipient =
                conversation.calledPartyDirectoryNumber !== "" ? conversation.calledPartyDirectoryNumber : conversation.calledPartyNumber;
        }

        if (conversation.callType === "Incoming") {
            participant.name = conversation.callingPartyName;
            participant.recipient =
                conversation.callingPartyDirectoryNumber !== "" ? conversation.callingPartyDirectoryNumber : conversation.callingPartyNumber;
        }

        // select the conversation container with class cwic-conversation-{conversationId}
        var container = $('.cwic-conversation-' + conversationId);

        // if no container, select the outgoing conversation (see startConversation)
        if (container.length === 0) {
            container = $('.cwic-conversation-outgoing');

            // in deskphone mode, container may not exist yet if conversation was initiated from deskphone
            //if (container.length == 0 && conversation.callType == "Outgoing") {
                //container = $('<div>').addClass('cwic-conversation-outgoing');
            //}
        }

        // at this point container may be empty, which means the conversation is incoming

        var data = container.data('cwic') || {};

        _log(true, 'conversation id=' + conversationId + ' state=' + conversation.callState || data.state,conversation);

        // extend conversation
        conversation = $.extend({}, data, conversation, {
            id: conversationId,
            state: conversationState || data.state,
            media: 'audio',
            participant: $.extend(data.participant, participant)
        });

        /* ECC call states and old skittles/webphone states
            OnHook : Disconnected
            OffHook : Created
            Ringout : RemotePartyAlerting
            Ringin : Alerting
            Proceed : Ringin on Deskphone while on a call amongst others
            Connected : Connected
            Hold : Held
            RemHold : "Passive Held"
            Resume : ?
            Busy : n/a (connected)
            Reorder : Failed
            Conference : n/a
            Dialing : Dialing
            RemInUse : "Passive not held"
            HoldRevert : n/a
            Whisper : n/a
            Parked : n/a
            ParkRevert : n/a
            ParkRetrieved : n/a
            Preservation : n/a
            WaitingForDigits : na/ ? Overlapdial capability ?
            Spoof_Ringout : n/a
        */
        // check for an incoming call - based on the following arcane conditions:
        // Empty container and one of the following:
        // *  Incoming/Created = ringing
        // *  Incoming/Proceed = ringing (cti mode, already on a call)
        // *  Ringin = ringing
        if ((((conversation.state === "Proceed" || conversation.state === "Created") && conversation.callType==="Incoming")|| conversation.state === "Ringin") && container.length === 0) {
            // new container for incoming call, application is supposed to attach it to the DOM
            container = $('<div>').addClass('cwic-data cwic-conversation cwic-conversation-' + conversationId).data('cwic', conversation);
            $this.trigger('conversationIncoming.cwic', [conversation, container]);
            return;
        }

        // If we can originate a call, onHook does not mean the call has ended - it means it's just about to start
        else if ((conversation.state === "OnHook" && !conversation.capabilities.canOriginateCall) || !conversation.exists) {
            videowindowsbycall.deleteCall({callId: conversationId});
            if (container.length === 0) {
                _log('warning: no container for ended conversation ' + conversationId);
                $this.trigger('conversationEnd.cwic', [conversation]);
                return;
            }

            container
                .removeData('cwic')
                .removeClass('cwic-data cwic-conversation cwic-conversation-' + conversation.id)
                .trigger('conversationEnd.cwic', [conversation]);
            return;
        }

        else {
            if (conversation.state === "OffHook" || conversation.state === "Connected") {

                // store media connection time
                if (typeof conversation.connect === "undefined" && conversation.state === "Connected") {
                    if (container.length === 0) {
                        container = $('<div>').addClass('cwic-conversation cwic-conversation-' + conversationId);
                    }
                    $.extend(conversation, { connect: new Date() });
                    container.data('cwic', conversation);
                }

                // store start time and trigger start event only once
                if (typeof conversation.start === "undefined") {
                    if (container.length === 0) {
                        container = $('<div>');
                    }
                    $.extend(conversation, { start: new Date() });
                    container.data('cwic', conversation);

                    container
                        .removeClass('cwic-conversation-outgoing')
                        .addClass('cwic-conversation cwic-conversation-' + conversationId)
                        .data('cwic', conversation);

                    $this.trigger('conversationStart.cwic', [conversation, container]);
                    return;
                }
            }

            if (container.length === 0) {
                // if we've just switched to deskphone mode and there's already a call, create a container div
                // or if we've just opened a new tab, we also need to trigger a conversation start for an ongoing call
                container = $('<div>').data('cwic',conversation).addClass('cwic-conversation cwic-conversation-' + conversationId);
                if(conversation.exists) {
                    $this.trigger('conversationStart.cwic', [conversation, container]);
                    return;
                } else {
                    $this.trigger('conversationUpdate.cwic', [conversation, container]); // trigger update event
                    return;
                }
                _log('warning: no container for updated conversation ' + conversationId);
            } else {
                container.data('cwic',conversation);
            }

            videowindowsbycall.update({callId: conversationId});
            container.trigger('conversationUpdate.cwic', [conversation, container]); // trigger update event
        }

    } // function _triggerConversationEvent

    /**
    * _triggerError(target, [callback], [code], [data]) <br>
    * <br>
    * - target (Object): a jQuery selection where to trigger the event error from <br>
    * - callback (Function): an optional callback to be called call with the error. if specifed, prevents the generic error event to be triggered <br>
    * - code (Number): an optional cwic error code (defaults to 0 – Unknown) <br>
    * - data (String, Object): some optional error data, if String, used as error message. if Object, used to extend the error. <br>
    * <br>
    * cwic builds an error object with the following properties: <br>
    *  code: a pre-defined error code <br>
    *  message: the error message (optional) <br>
    *  any other data passed to _triggerError or set to errorMap (see the init function) <br>
    *  <br>
    * When an error event is triggered, the event object is extended with the error properties. <br>
    * <br>
    */
    function _triggerError() {
        var $this = arguments[0]; // target (first mandatory argument)
        var errorCb = null;

        // the default error
        var error = $.extend({ details: [] }, errorMap.Unknown);

        // extend error from arguments
        for (var i=1; i<arguments.length; i++) {
            var arg = arguments[i];

            // is the argument a specific error callback ?
            if ($.isFunction(arg)) { errorCb = arg; }

            else if (typeof arg === "string") { error.details.push(arg); }

            else if (typeof arg === "object") { $.extend(error, arg); }

        } // for

        _log(error.message, error);

        // if specific error callback, call it
        if (errorCb) {
            errorCb(error);
        }
        else {
            // if no specific error callback, raise generic error event
            var event = $.Event('error.cwic');
            $.extend(event, error);
            $this.trigger(event);
        }

        return $this;
    }

    /**
     * @param {Object} [conversation] Can be a new object to start a new conversation or an existing conversation which you wish to answer
     * @param {String} [conversation.id] Unique identifier of the conversation.
     * @param {Object|Array} conversation.participant Conversation participants, does not include the local user.  May be asingle participant Object or an array of participant Objects.
     * @param {String} conversation.participant.recipient The phone number or jabber id of the participant.
     * @param {String} [conversation.participant.name] The participant name.
     * @param {String} [conversation.participant.photosrc] A suitable value for the src attribute of an <img> element.
     * @param {String} [conversation.media] Media used to start the conversation.Contains the media used to join participants: audio, video or chat.<br>
     * If not specified, depends on all participant's recipients: if phone number, default media is "audio", if jabber id, default media is "chat".
     * @param {String} [conversation.state] Current state of the conversation. Can be OffHook, Ringing, Connected, OnHook, Reorder.
     * @param {Date} [conversation.start] Start time. Defined on resolution update only.
     * @param {Date} [conversation.connect] Media connection time. Defined on resolution update only.
     * @param {Object} [conversation.videoResolution] Resolution of the video conversation, contains width and height properties. Defined on resolution update only.
     * @param {String|Object} [conversation.container] The HTML element which contains the conversation (optional). Conversation events are triggered on this element.
     * If String, specifies a jQuery selector If Object, specifies a jQuery wrapper of matched elements(s).
     * By default container is $(this), that is the first element of the matched set startConversation is called on.
     * @param {String} [conversation.subject] The subject of the conversation to start.
     * @param {Function} [conversation.error(status)] A function to be called if the conversation cannot be started (optional). An error status (String) is passed.
     * @param {String} [conversation.videoDirection] The video media direction: 'Inactive' or undefined (audio only by default), 'SendOnly', 'RecvOnly' or 'SendRecv'.
     * @param {Object} [conversation.remoteVideoWindow] The video object (must be of mime type application/x-cisco-cwc-videocall).
     * @param {DOMWindow} [conversation.window] DOM window that contains the remoteVideoWindow (default to this DOM window) required if specifying a video object on another window (popup/iframe).
     * @description Start a conversation with a participant.
     * <br>If conversation contain both an id and a state property, cwic assumes you want to answer that incoming conversation, in this case starting the passed conversation means accepting(answering) it.
     * @example
     * // start an audio conversation with element #foo as container
     * jQuery('#phone').cwic('startConversation', {
     *   participant: {
     *     recipient: '1234'
     *   },
     *   container: '#foo'
     * });
     * // start an audio conversation with a contact (call work phone number)
     * jQuery('#conversation').cwic('startConversation', {
     *   participant: {
     *     recipient: '1234',
     *     displayName: 'Foo Bar',
     *     screenName: ' fbar',
     *     phoneNumbers: {
     *       work: '1234',
     *       mobile: '5678'
     *     }
     *   }
     * });
     * // start a room chat (ad-hoc)
     * jQuery('#conversation').cwic('startConversation', {
     *   participant: [
     *     'thomas@domain.com', 'niall@domain.com', 'david@domain.com',
     *     'martin@domain.com', 'jing@domain.com'
     *   ],
     *   media: 'chat',
     *   subject: 'The Cisco Jabber SDK looks great !',
     *   error: function(status) {
     *     console.log('chat cannot be started: ' + status);
     *   }
     * });
     * // answer an incoming conversation (input has an id property)
     * // see another example about the conversationIncoming event
     * jQuery('#conversation').cwic('startConversation', {
     *   participant: {
     *     recipient: '1234'
     *   },
     *   id: '612',
     *   state: 'Ringin'
     * });
     * // answer an incoming conversation with video
     * jQuery('#conversation').cwic('startConversation',
     *   jQuery.extend(conversation,{
     *   videoDirection: (sendingVideo ? 'SendRecv':''),
     *   remoteVideoWindow: 'remoteVideoWindow',  // pass id
     *   id: callId
     * }));
     * // answer an incoming conversation with video object hosted in popoutwindow
     * jQuery('#conversation').cwic('startConversation',
     *   jQuery.extend(conversation,{
     *   videoDirection: (sendingVideo ? 'SendRecv':''),
     *   remoteVideoWindow: $('#remoteVideoWindow', popoutwindow.document)[0] // pass object setting jQuery context to popoutwindow's document
     *   window: popoutwindow,
     *   id: callId
     * });
     * // answer an incoming conversation without video
     * jQuery('#callcontainer').cwic('startConversation', conversation);
    */
    function startConversation() {
        _log(true, 'startConversation', arguments);

        var $this = this;

        var callsettings = arguments[0] || $this.data('cwic') || {};
        var windowhandle,videoDirection;

        if ($this.length === 0) {
            // TODO: remove hardcoded string
            return _triggerError($this, callsettings.error, errorMap.InvalidArguments, 'cannot start conversation with empty selection');
        }

        // container is the jQuery wrapper of the video container
        var container = $this;
        if      (typeof callsettings.container === "string") { container = $(callsettings.container); }
        else if (typeof callsettings.container === "object") { container = callsettings.container; }
        container = container.first();

        if (typeof callsettings.id !== "undefined") {
            // start an incoming conversation
            container.addClass('cwic-data cwic-conversation cwic-conversation-' + callsettings.id).data('cwic', callsettings);

            if (arguments.length >= 1 ) {
                videoDirection = callsettings.videoDirection;
                if(callsettings.remoteVideoWindow) {
                    videowindowsbycall.add({callId: callsettings.id, plugin: callsettings.remoteVideoWindow});
                    if(callsettings.remoteVideoWindow.windowhandle) {
                        windowhandle = callsettings.remoteVideoWindow.windowhandle;
                    }
                }
            } else {
                videoDirection = "";
            }

            var answerObject = {
                callId: callsettings.id,
                videoDirection: videoDirection
            };
            if(windowhandle) {
                answerObject.windowhandle = windowhandle;
            }
            _plugin.api.answer(answerObject);
        }
        else {
            // start an outgoing conversation
            var participant = callsettings.participant || {};

            if (typeof participant === "string") {
                participant = { recipient: participant };
            }

            if (typeof participant.recipient === "undefined") {
                // TODO: remove hardcoded string
                return _triggerError($this, callsettings.error, errorMap.InvalidArguments, 'cannot start conversation: undefined or empty recipient');
            }

            container.addClass('cwic-data cwic-conversation cwic-conversation-outgoing').data('cwic', { participant: participant });
            //var call = _plugin.api.getCall({ callId: -1 });

            //if(_hasCapability(call,'OverlapDial')) {
                //_plugin.api.overlapDial(participant.recipient);
            //} else {
                if (container.is(':hidden')) {
                    _log(true, 'startConversation - warning: container is hidden');
                }

                // for now use jQuery dimensions and offset utilities
                // TO DO: offset() does not work with hidden elements, and does not support margins/borders, see http://api.jquery.com/offset/
                //var containerOffset = container.offset();
                //var top = settings.top || containerOffset.top;
                //var left = settings.left || containerOffset.left;
                //var width = settings.width || container.width();
                //var height = settings.height || container.height();

                //_log(true, 'startConversation container top=' + top + ' left=' + left + ' width=' + width + ' height=' + height);

                var originateObject = {
                    recipient: participant.recipient,
                    videoDirection: callsettings.videoDirection
                };
                if(callsettings.remoteVideoWindow && callsettings.remoteVideoWindow.windowhandle) {
                    originateObject.windowhandle = callsettings.remoteVideoWindow.windowhandle;
                }

                var res = _plugin.api.originate(originateObject);

                if (res.error) {
                    _log(true, 'originate result', res);
                    // TODO: remove hardcoded string
                    _triggerError($this, callsettings.error, 'cannot start conversation', { nativeError: res.error });
                }
                if(res.callId && res.callId >=1) {
                    if(callsettings.remoteVideoWindow) {
                        callsettings.window = callsettings.window || window;
                        videowindowsbycall.add({callId: res.callId, plugin: callsettings.remoteVideoWindow, window: callsettings.window});
                    }
                }
            //}
        }

        return $this;
    }

    /**
    * @description Ends a conversation. <br>
    * @param{boolean} iDivert: If it is a true, the conversation is diverted to the default recipient *(voicemail for example, sometimes referred as "iDivert", configured by the admin).
    * Triggers a conversationEnd event.
    * @param{String|Object} id A conversation identifier (String) or an Object containing an id property.<br>
    *  endConversation examples <br>
    *  @example
    *  // typeof input is string
    * jQuery('#phone').cwic('endConversation', '1234');
    *  // or
    * jQuery('#phone').cwic('updateConversation', conversation.id);
    *  // typeof input is object
    * jQuery('#phone').cwic('endConversation', conversation);
    *  // let cwic find the conversation data attached to #conversation
    * jQuery('#conversation').cwic('endConversation');
    *  // DIVERT
    * jQuery('#phone').cwic('endConversation', true, '1234');
    * jQuery('#myconversation').cwic('endConversation', true);
    *
    */
    function endConversation() {
        _log(true, 'endConversation', arguments);

        var $this = this;

        if ($this.length === 0) { return $this; }

        var iDivert = null;
        var conversation = null;
        var conversationId = null;

        if (arguments.length === 0) {
            conversation = $this.data('cwic');
            if(!conversation) {
                // TODO: remove hardcoded string
                return _triggerError($this, 'cannot end conversation: no conversation exists for this element');
            }
            conversationId = conversation.id;
        }
        else if (arguments.length === 1) {
            iDivert = typeof arguments[0] === "boolean" ? arguments[0] : null;
            conversation = typeof arguments[0] === "object" ? arguments[0] : $this.data('cwic');
            conversationId = typeof arguments[0] === "string" ? arguments[0] : conversation.id;
        }
        else if (arguments.length === 2) {
            iDivert = typeof arguments[0] === "boolean" ? arguments[0] : null;
            conversation = typeof arguments[1] === "object" ? arguments[1] : $this.data('cwic');
            conversationId = typeof arguments[1] === "string" ? arguments[1] : conversation.id;
        }

        if (!conversationId) {
            // TODO: remove hardcoded string
            return _triggerError($this, errorMap.InvalidArguments, 'cannot end conversation: undefined or empty conversation id');
        }

        if (iDivert) {
            // need to check capabilities first
            conversation = conversation || $('.cwic-conversation-' + conversationId).data('cwic');

            if (!conversation) {
                // TODO: remove hardcoded string
                return _triggerError($this, 'cannot iDivert - undefined conversation');
            }

            if(!conversation.capabilities || !conversation.capabilities.canImmediateDivert) {
                // TODO: remove hardcoded string
                return _triggerError($this, errorMap.MissingCapability, 'cannot iDivert - missing capability', { conversation: conversation });
            }

            _log(true, 'iDivert conversation', conversation);

            _plugin.api.iDivert({ callId: conversationId });
        }
        else {
            _log(true, 'end conversation', conversation);
            _plugin.api.endCall({ callId: conversationId });
        }

        return $this;
    }
    /**
    * @description Updates an existing conversation.<br>
    * This function controls the call allowing the following operations<ul>
    * <li>hold call</li>
    * <li>resume call</li>
    * <li>mute call</li>
    * <li>unmute call</li>
    * <li>mute audio only</li>
    * <li>mute video only</li>
    * <li>unmute audio only</li>
    * <li>unmute video only</li>
    * <li>add video window for remote sender</li>
    * <li>remove video window for remote sender</li>
    * <li>update video preference on a call video escalate/de-escalate</li>
    * <li>conference two calls together</li>
    * <li>transfer a call</li>
    * </ul>
    * @param {String|Object} update Update a started conversation. update can be: <br>
    * A String: hold, resume, mute, unmute, muteAudio, muteVideo, unmuteAudio, unmuteVideo.<br>
    * An Object: contains one or more writable conversation properties to update e.g. videoDirection.<br>
    * Triggers a conversationUpdate event.
    * @param {String|Object} id A conversation identifier (String) or Object containing an id property <br>
    * @example
    * // typeof input is string—HOLD/RESUME
    * jQuery('#phone').cwic('updateConversation', 'hold', '1234')
    * jQuery('body').cwic('updateConversation', 'hold', conversation.id);
    * jQuery('#myid').cwic('updateConversation', 'hold', conversation);
    *   // typeof input is object
    * jQuery('#conversation').cwic('updateConversation', 'hold');
    *   // resume the same conversation,
    *   // let cwic find the conversation data attached to #conversation
    * jQuery('#conversation').cwic('updateConversation', 'resume');
    *   // MUTE/UNMUTE
    *   // typeof input is string
    * jQuery('#phone').cwic('updateConversation', 'mute', '1234');
    * jQuery('body').cwic('updateConversation', 'mute', conversation.id);
    * jQuery('#myid').cwic('updateConversation', 'mute', conversation);
    *   // typeof input is object <br>
    * jQuery('#conversation').cwic('updateConversation', 'mute');
    *   // unmute the same conversation,
    *   // let cwic find the conversation data attached to #conversation
    * jQuery('#conversation').cwic('updateConversation', 'unmute');
    *
    *  // add/remove video object in this (default) DOMWindow
    * jQuery('#conversation').cwic('updateConversation',
    *               { 'addRemoteVideoWindow':videoObject });
    * jQuery('#conversation').cwic('updateConversation',
    *               { 'removeRemoteVideoWindow':videoObject });
    * // add/remove video object from another DOMWindow
    * jQuery('#conversation').cwic('updateConversation',
    *               { 'addRemoteVideoWindow':videoObject, window:popupWindow });
    * jQuery('#conversation').cwic('updateConversation',
    *               { 'removeRemoteVideoWindow':videoObject, window:popupWindow });
	*
	* // Escalate to video
    * jQuery('#conversation').cwic('updateConversation', {'videoDirection': 'SendRecv'}); // implied source call is call associated with conversation div
    * jQuery('#phone').cwic('updateConversation', {'videoDirection': 'SendRecv'}, conversation.id}); // source call id passed
    * jQuery('#phone').cwic('updateConversation', {'videoDirection': 'SendRecv'}, conversation}); // source call passed
	* // De-escalate from video
    * jQuery('#conversation').cwic('updateConversation', {'videoDirection': 'Inactive'}); // implied source call is call associated with conversation div
    * jQuery('#phone').cwic('updateConversation', {'videoDirection': 'Inactive'}, conversation.id}); // source call id passed
    * jQuery('#phone').cwic('updateConversation', {'videoDirection': 'Inactive'}, conversation}); // source call passed
	*
    * // Transfer call to target callid
    * jQuery('#conversation').cwic('updateConversation', {'transferCall':callId}); // implied source call is call associated with conversation div
    * jQuery('#phone').cwic('updateConversation', {'transferCall':callId}, conversation.id}); // source call id passed
    * jQuery('#phone').cwic('updateConversation', {'transferCall':callId}, conversation}); // source call passed
	*
    * // Join target callId to source call
    * jQuery('#conversation').cwic('updateConversation', {'joinCall':callId}); // implied source call is call associated with conversation div
    * jQuery('#phone').cwic('updateConversation', {'joinCall':callId}, conversation.id}); // source call id passed
    * jQuery('#phone').cwic('updateConversation', {'joinCall':callId}, conversation}); // source call passed
    */
    function updateConversation() {
        _log(true, 'updateConversation', arguments);

        var $this = this;
        if ($this.length === 0) { return $this; }

        // mandatory first argument
        var update = arguments[0];

        // find conversation information
        var conversation = null;
        var conversationId = null;
        if (typeof arguments[1] === "object") {
            conversation = arguments[1];
            conversationId = conversation.id;
        }
        else if (typeof arguments[1] === "undefined") {
            conversation = $this.data('cwic'); // attached conversation object
            if (typeof conversation === "object") { conversationId = conversation.id; }
        }
        else {
            conversationId = arguments[1];
            conversation = $('.cwic-conversation-' + conversationId).data('cwic') || $this.data('cwic');
        }

        if (!conversationId || !conversation) {
            // TODO: remove hardcoded string
            return _triggerError($this, errorMap.InvalidArguments, 'cannot update conversation: undefined or empty conversation id');
        }

        var nativeResult = {};
        if (typeof update === "string") {
            if (update.match(/^hold$/i)) {
                nativeResult = _plugin.api.hold({ callId: conversationId });
            }
            else if (update.match(/^resume$/i)) {
                nativeResult = _plugin.api.resume({ callId: conversationId });
            }
            else if (update.match(/^mute$/i)) {
                nativeResult = _plugin.api.mute({ callId: conversationId });
            }
            else if (update.match(/^unmute$/i)) {
                nativeResult = _plugin.api.unmute({ callId: conversationId });
            }
            else if (update.match(/^muteAudio$/i)) {
                nativeResult = _plugin.api.mute({ callId: conversationId, muteAudio: true });
            }
            else if (update.match(/^muteVideo$/i)) {
                nativeResult = _plugin.api.mute({ callId: conversationId, muteVideo: true });
            }
            else if (update.match(/^unmuteAudio$/i)) {
                nativeResult = _plugin.api.unmute({ callId: conversationId, unmuteAudio: true });
            }
            else if (update.match(/^unmuteVideo$/i)) {
                nativeResult = _plugin.api.unmute({ callId: conversationId, unmuteVideo: true });
            }
            else {
                // TODO: remove hardcoded string
                return _triggerError($this, errorMap.InvalidArguments, 'wrong arguments (update conversation) - '+update, arguments);
            }

            if (nativeResult.error) {
                return _triggerError($this, getError(nativeResult.error), nativeResult.error);
            }
        }
        else if (typeof update === "object") {
            var foundWritable = false;

            if (update.transferCall) {
                foundWritable = true;
                nativeResult = _plugin.api.transferCall({ callId: conversationId, transferCallId: update.transferCall});
                if (nativeResult.error) {
                    return _triggerError($this, getError(nativeResult.error,'NativePluginError'),'transferCall',nativeResult);
                }
            }
            if (update.joinCall) {
                foundWritable = true;
                nativeResult = _plugin.api.joinCalls({ joinCallId: conversationId, callId: update.joinCall});
                if (nativeResult.error) {
                    return _triggerError($this, getError(nativeResult.error,'NativePluginError'),'joinCall',nativeResult);
                }
            }
            if (update.videoDirection) {
                foundWritable = true;
                nativeResult = _plugin.api.setVideoDirection({ callId: conversationId, videoDirection: update.videoDirection });
                if (nativeResult.error) {
                    // TODO: remove hardcoded string
                    return _triggerError($this, errorMap.NativePluginError, 'videoDirection', nativeResult.error);
                }
            }
            if(update.addRemoteVideoWindow) {
                foundWritable = true;
                videowindowsbycall.add({callId: conversationId, plugin: update.addRemoteVideoWindow, "window": update.window});
                //videowindowsbycall.dump();
            }
            if(update.removeRemoteVideoWindow) {
                foundWritable = true;
                videowindowsbycall.remove({callId: conversationId, plugin: update.addRemoteVideoWindow, "window": update.window});
                //videowindowsbycall.dump();
            }
            if (!foundWritable) {
                return _triggerError($this, errorMap.InvalidArguments, 'wrong arguments (update conversation)', arguments);
            }
        }
        else {
            return _triggerError($this, errorMap.InvalidArguments, 'wrong arguments (update conversation)', arguments);
        }

        return $this;
    }
    /**
    * Sends digit (String) as Dual-Tone Multi-Frequency (DTMF)
    * @example
    *  // SEND DTMF EXAMPLE
    * jQuery('#phone').cwic('sendDTMF', '5', '1234');
    * jQuery('#mydiv').cwic('sendDTMF', '3', conversation.id);
    * jQuery('body').cwic('sendDTMF', '7', conversation);
    * jQuery('#conversation').cwic('sendDTMF', '1');
    * @param {String} digit Dual-Tone Multi-Frequency (DTMF) digit to send.  Does not trigger any event.
    * @param {String|Object} [id] a {String} conversation identifier or an {Object} containing an id property
    */
    function sendDTMF() {
        _log(true, 'sendDTMF'); // don't send dtmf digits to logger

        var $this = this;
        var digit = null;
        var conversation = $this.data('cwic');
        var conversationId = conversation ? conversation.id : null;

        // inspect arguments
        if (arguments.length > 0) {
            digit = typeof arguments[0] === "string" ? arguments[0] : null;

            if (arguments.length > 1) {
                if (typeof arguments[1] === "object") {
                    conversation = arguments[1];
                    conversationId = conversation.id;
                }
                else if (typeof arguments[1] === "string") {
                    conversationId = arguments[1];
                }
            }
        }

        if (typeof digit !== "string" || !conversationId) {
            return _triggerError($this, errorMap.InvalidArguments, 'wrong arguments (sendDTMF)', arguments);
        }

        var nativeResult = _plugin.api.sendDTMF({
            callId: conversationId,
            digit: digit
        });

        if (nativeResult.error) {
                return _triggerError($this, errorMap.NativePluginError, nativeResult.error);
        }

        return $this;
    }

/**
 * Versions, states and capabilities
 * @returns {aboutObject}
 */
    function about() {
        _log(true, 'about', arguments);

        /*
        Versioning scheme: Release.Major.Minor.Revision

		Release should be for major feature releases (e.g. video)
		Major for an API-breaking ship within a release (or additional APIs that won't work without error checking on previous plugins).
		Minor for non API-breaking builds - e.g. bug fix releases that strongly recommend updating the plugin
		Revision for unique build tracking.
        */

        var ab = {
             javascript: {
                 version: '2.0.0.60598'
             },
             jquery: {
                 version: $.fn.jquery
             },
             plugin: (_plugin === null) ? null : { version: _plugin.version },
             states: {
                 system: (!_plugin || !_plugin.api) ? 'unknown' : _plugin.api.connectionStatus
             },
             capabilities: {
                 video: ((!_plugin || !_plugin.api) ? undefined : _plugin.api.supportsVideo)
            },
            upgrade: {}
         };
		
		var m = ab.javascript.version.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
        if (m) {
        	ab.javascript.release = m[1];
        	ab.javascript.major = m[2];
        	ab.javascript.minor = m[3];
        	ab.javascript.revision = m[4];
        }
        
        if (ab.plugin) {
        	m = ab.plugin.version.plugin.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
        	if (m) {
        		ab.plugin.release = m[1];
        		ab.plugin.major = m[2];
        		ab.plugin.minor = m[3];
        		ab.plugin.revision = m[4];
        	}
        	
        	// compare javascript and plugin versions to advise about upgrade
        	if (ab.javascript.release > ab.plugin.release) {
        		// release mismatch, upgrade plugin
        		ab.upgrade.plugin = 'mandatory';
        	}
        	else if (ab.javascript.release < ab.plugin.release) {
        		// release mismatch, upgrade javascript
        		ab.upgrade.javascript = 'mandatory';
        	}
        	else if (ab.javascript.release == ab.plugin.release) {
        		// same release, compare major
        		if      (ab.javascript.major >  ab.plugin.major) { ab.upgrade.plugin = 'mandatory'; }
        		else if (ab.javascript.major <  ab.plugin.major) { ab.upgrade.javascript = 'mandatory'; }
        		else if (ab.javascript.major == ab.plugin.major) {
        			// same release.major, compare minor
        			if      (ab.javascript.minor >  ab.plugin.minor) { ab.upgrade.plugin ='recommended'; }
        			else if (ab.javascript.minor <  ab.plugin.minor) { ab.upgrade.javascript = 'recommended'; }
        		}
        	}
        }
        else {
        	// no plugin available
        	ab.upgrade.plugin = 'mandatory';
        }
        
        return ab;
    }

    function getInstanceId() {
        _log(true, 'getInstanceId');
        return _plugin.api.instanceId;
    }

    // a map with all exposed methods
    var methods = {
        about: about,
        init : init,
        shutdown: shutdown,
        rebootIfBroken: rebootIfBroken,
        registerPhone: registerPhone,
        switchPhoneMode: switchPhoneMode,
        unregisterPhone: unregisterPhone,
        startConversation: startConversation,
        updateConversation: updateConversation,
        endConversation: endConversation,
        createVideoWindow: createVideoWindow,
        addPreviewWindow: addPreviewWindow,
        removePreviewWindow: removePreviewWindow,
        sendDTMF: sendDTMF,
        getInstanceId: getInstanceId
    };

  // the jQuery plugin
  /**
   * @description
   * CWIC is a jQuery plugin to access the Cisco Web Communicator<br>
   * Audio and Video media require the CWC browser plugin to be installed <br>
   * <h3>Fields overview</h3>
   * <h3>Methods overview</h3>
   * All cwic methods are called in the following manner<br>
   * <pre class="code">$('#selector').cwic('method',parameters)</pre><br>
   * <h3>Events overview</h3>
   * All events are part of the cwic namespace.  For example:
   * <ul>
   * <li>conversationStart.cwic</li>
   * <li>system.cwic</li>
   * <li>error.cwic</li>
   * </ul>
   * <h4>Example conversation events:</h4>
   * These are conversation-related events that can be triggered by the SDK.<br>
   * The event handlers are passed the conversation properties as a single object. For example:<br>
   * @example
   * // start an audio conversation with phone a number and bind to conversation events
   * jQuery('#conversation')
   *   .cwic('startConversation', '+1 234 567')  // container defaults to $(this)
   *   .bind('conversationStart.cwic', function(event, conversation, container) {
   *      console.log('conversation has just started');
   *      // container is jQuery('#conversation')
   *    })
   *    .bind('conversationUpdate.cwic', function(event, conversation) {
   *      console.log('conversation has just been updated');
   *    })
   *    .bind('conversationEnd.cwic', function(event, conversation) {
   *      console.log('conversation has just ended');
   *    });
   * @example
   * // listen for incoming conversation
   * jQuery('#phone')
   *   .bind('conversationIncoming.cwic', function(event, conversation, container) {
   *     console.log('incoming conversation with id ' + conversation.id);
   *     // attach the "toast" container to the DOM and bind to events
   *     container
   *       .appendTo('#phone')
   *       .bind('conversationUpdate.cwic', function(event, conversation) {
   *         // update on incoming conversation
   *       })
   *       .bind('conversationEnd.cwic', function(event, conversation) {
   *         // incoming conversation has ended
   *         container.remove();
   *       });
   *     // suppose UI has a button with id 'answer'
   *     jQuery('#answer').click(function() {
   *       // answer the incoming conversation
   *       // conversation has an id property, so startConversation accepts it
   *       // use element #conversation as container
   *       jQuery('#conversation').cwic('startConversation', conversation);
   *       // remove incoming container
   *       container.remove();
   *     });
   *   });
   * @class
   * @static
   * @param {String} method The name of the method to call
   * @param {Variable} arguments trailing arguments are passed to the specific call see methods below
   */
  $.fn.cwic = function( method ) {

    try {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
        else {
            throw method + ': no such method on jQuery.cwic';
        }
    }
    catch(e) {
        if(typeof console !== "undefined" && console.trace) {
            console.trace();
        }
        _triggerError(this, e);
    }
  };
}(jQuery));
