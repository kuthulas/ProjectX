/**
 * @fileOverview supplementaldocs.js
 * documentation of implicit objects/events that don't fit inline
 */
//
// Extra documentation for cwic.js that can't be inlined
// Put into a separate file to prevent clutter in cwic.js

// OBJECTS

// using virtual namespace for documentation purposes
// useful for objects that can are re-used and need to be cross-referenced
// also jsdoc support documenting nested anonymous virtual objects as return objects

/**
 * Object returned from about method
 * @name aboutObject
 * @namespace
 * @property {Object} javascript JavaScript properties
 * @property {String} javascript:version JavaScript version
 * @property {Object} jquery jQuery properties
 * @property {String} jquery:version jQuery version
 * @property {Object|null} plugin Plugin properties
 * @property {String} plugin:version Plugin version
 * @property {Object} states cwic states
 * @property {String} states:system Current system state (e.g. "eReady")
 * @property {Object} capabilities Capabilities
 * @property {Boolean} capabilities:video Support for video calls
 * @property {Object} upgrade Advice about possible upgrade
 * @property {String} upgrade:javascript Can be 'mandatory' or 'recommended' depending on plugin version (undefined if not relevant)
 * @property {String} upgrade:plugin Can be 'mandatory' or 'recommended' depending on javascript version (undefined if not relevant)
 */
/**
 * @name device
 * @namespace
 * @property {String} name
 * @property {String} description
 * @property {String} model
 * @property {String} modelDescription
 * @property {Boolean} isSoftPhone true if the device is a software phone
 * @property {Boolean} isDeskPhone true if the device is a hardware (desk) phone
 * @property {String[]} lineDNs Array of line DNs associated with this device (may be initially blank until connected to the device)
 * @property {String} serviceState One of <ul><li>"eUnknown"</li><li>"eInService"</li><li>"eOutOfService"</li></ul>
 * @property {Number} [inService] Numeric representation of serviceState
 * @property {Number} [serviceCause] Numeric code to represent cause for current service state
 * @property {Boolean} [isPrivate] Privacy state
 * @property {Boolean} [isDND] DND state
 * @property {Number} [DNDType] DND type
 * @property {line[]} [lines] Lines associated with the device (may be initially blank until connected to the device)
 * @property {Boolean} exists The device exists and can be used
 */

/**
 * @name line
 * @namespace
 *
 * @property {linecapability[]} capabilities List of capabilities, not yet implemented
 * @property {String} directoryNumber DN of the line as represented in the directory
 * @property {String} externalNumber Externally reachable DN of the line
 * @property {String} name
 * @property {String} label
 * @property {Boolean} exists true if the line exists
 * @property {Boolean} registered true if the line is currently registered
 */

/**
 * @name call
 * @namespace
 * @property {Number} id
 * @property {Number} callId Same as id
 * @property {Boolean} exists true if the call exists
 * @property {Boolean} audioMuted Audio is muted
 * @property {Boolean} videoMuted Video is muted
 * @property {} callState one of <ul><li>"OffHook" - receiver lifted in CTI control mode, or preparing to make a call in either mode.</li><li>"OnHook" - call is ended or about to go OffHook. If !capabilities.canOriginateCall, then call is ended.</li><li>"Ringout" - remote party is ringing.</li><li>"Ringin" - incoming call.</li><li>"Proceed" - if already on a call in CTI mode and there's an incoming call it may be in "Proceed" state.</li><li>"Connected" - call is connected.</li><li>"Hold" - call is held.</li><li>"RemHold" - call is held on a shared-line device.</li><li>"Resume" - n/a.</li><li>"Busy" - remote line busy.</li><li>"Reorder" - call failed.</li><li>"Conference"</li><li>"Dialing" - dialing number.</li><li>"RemInUse" - call on a shared-line device.</li><li>"HoldRevert"</li><li>"Whisper"</li><li>"Parked"</li><li>"ParkRevert"</li><li>"ParkRetrieved"</li><li>"Preservation" - call is in preservation mode.</li><li>"WaitingForDigits"</li><li>"Spoof_Ringout"</li></ul>
 * @property {Number} numericState - Numeric representation of callState - subject to change, do not use
 * @property {String} callType One of <ul><li>"None"</li><li>"Incoming"</li><li>"Outgoing"</li><li>"Forwarded"</li></ul>
 * @property {String} calledPartyDirectoryNumber The translated directory number of the called party
 * @property {String} calledPartyNumber The number of the called party
 * @property {String} calledPartyName The name of the called party
 * @property {String} callingPartyDirectoryNumber The translated directory number of the calling party
 * @property {String} callingPartyNumber The number of the calling party
 * @property {String} callingPartyName The name of the calling party
 * @property {Number} lineId Not yet implemented
 * @property {String} mediaState Not implemented
 * @property {String} videoDirection One of <ul><li>"Inactive"</li><li>"SendRecv"</li><li>"SendOnly"</li><li>"RecvOnly"</li></ul>
 * @property {Boolean} isConference true if the call is a conference call
 * @property {Number} maxParticipants Maximum number of participants on a conference call.  This parameter is not set if the call is not a conference
 * @property {callcapability[]} capabilities A map with capability name as key and true as value.  They indicate operations you can perform on the call and should be used to control enabling/disabling/state/access to parts of the UI. Important capabilities are:
 * <ul>
 * <li>canAnswerCall - call can be answered</li>
 * <li>canHold - call can be Held</li>
 * <li>canResume - call can be Resumed</li>
 * <li>canEndCall - call can be Ended</li>
 * <li>canSendDigit - can send a DTMF digit to the call</li>
 * <li>canDirectTransfer - can tranfer call</li>
 * <li>canJoinAcrossLine - can join this call with another call on the same line with this capability also set</li>
 * <li>canImmediateDivert - can iDivert (e.g. to voicemail)</li>
 * <li>canUpdateVideoCapability - can update the videoDirection on the call. See {@link $.fn.cwic-updateConversation} examples.</li>
 * <li>canMuteAudio - can mute audio on the call</li>
 * <li>canUnmuteAudio - can unmute audio on the call</li>
 * <li>canMuteVideo - can mute video on the call</li>
 * <li>canUnmuteVideo - can unmute video on the call</li>
 * </ul>
 * @property {participant[]} participants All other participants on the call
 * @property {participant[]} localParticipant Local participant (your line info)
 */

/**
 * @name participant
 * @namespace
 * @property {} name
 * @property {} [number] Untranslated number for other participant
 * @property {} [translatedNumber] Number translated using available CUCM dial rules - only available on other participant in this release
 * @property {} [directoryNumber] Local line number as represented in CUCM directory
 * @property {} [externalNumber] Local line number as reachable from an external number (CUCM external representation)
 */

/**
 * @name registration
 * @namespace
 * @property {Boolean} authenticate The original authenticate argument passed to registerPhone
 * @property {String} user The CUCM end user name
 * @property {String} mode One of <ul><li>"SoftPhone"</li><li>"DeskPhone"</li></ul>
 * @property {Boolean} useCcmcip
 * @property {device{}} devices Map keyed by device name of all devices available to authenticated user
 * @property {device} device The selected device
 * @property {line} line The selected line
 * @property {String|Object} password Cleartext password or encrypted password Object
 * @property {String} [password.encrpyted] Encrypted password
 * @property {String} [password.cipher] Cipher used to encrypt password
 * @property {String|Array|Object} cucm Original cucm parameter
 * @property {String|Array} [cucm.ccmcip] ccmcip addresses to attempt connection with
 * @property {String|Array} [cucm.tftp] tftp addresses to attempt connection with
 * @property {Object} successfulCucm
 * @property {String} [successfulCucm.cti] Address of successful cti connection
 * @property {String} [successfulCucm.tftp] Address of  successful tftp connection
 * Object representing CUCM registration.  Many properties are set in the initial call to {@link $.fn.cwic-registerPhone}
 */

// EVENTS

/**
 * A conversation has just started.Note the conversation may not be connected yet, for example it is in the Alerting state.The conversation container is passed as an extra event data.
 * @name $.fn.cwic#conversationStart
 * @event
 * @param event
 * @param {call} conversation
 * @param {DomNode} container
 */
/**
 * One or more properties of a conversation have changed, e.g. state, participant.
 * @name $.fn.cwic#conversationUpdate
 * @event
 * @param event
 * @param {call} conversation
 * @param {jQueryNodeArray} container
 */
/**
 * A conversation has ended.  The conversation was terminated by the local user, all participants left the conversation, or an error occurred (media failure for example).
 * @name $.fn.cwic#conversationEnd
 * @event
 * @param event
 * @param {call} conversation
 */
/**
 * A new conversation is being received, but is not started yet.  The newly created conversation container is passed as an extra event data.<br>
 * The application is responsible for attaching the container to the DOM, and managing the container lifetime.<br>
 * In the case the new conversation is accepted by calling startConversation, a conversationStart event is triggered afterwards.<br>
 * @name $.fn.cwic#conversationIncoming
 * @event
 * @param event
 * @param {call} conversation
 * @param {jQueryNodeArray} container
 */
/**
 * Called when the phone changes state.
 * @name $.fn.cwic#system
 * @event
 * @param {Object} event
 * @param {Object} event.phone
 * @param {String} event.phone.status One of <ul><li>"eIdle"</li><li>"eFetchingDeviceConfig"</li><li>"eRegistering"</li><li>"eReady"</li><li>"eRecoveryPending"</li><li>"eAwaitingIpAddress"</li><li>"eConnectedButNoDeviceReady"</li></ul>
 * @param {Boolean} event.phone.ready true if phone is ready (status "eReady"), false if it is logged out or in the process of registering or recovering
 * @param {registration} event.phone.registration An updated copy of the registration object passed to {@link $.fn.cwic-registerPhone}
 */
/**
 * @name $.fn.cwic#error
 * @event
 * @param event
 */

