
/**
 * Helper object that manages UI-related multi call handling.
 */
var multiCallContainer = function(callPrefix, parentId) {
    var calls = {};
    var activeCall = null;
    var selectedCallId = null;

    var methods = {

        /**
         * Add a call to the collection and to the list on-screen.
         *
         * @return true if the call didn't already exist, false otherwise
         */
        addCall: function(conversation, container) {
            var callIsNew = false;
            if(!(calls[conversation.callId])) {
                // no call or old call is not connected or not (Ringout || OffHook && canEndCall) and new one is something more active
                // entirely too complicated of a condition, but that's asynchronous multiple calls for you
                if(!selectedCallId || !calls[selectedCallId] || (calls[selectedCallId].callState !== "Ringout" && calls[selectedCallId].callState !== 'Connected' && (calls[selectedCallId].callState !== 'OffHook' || !calls[selectedCallId].capabilities.canEndCall) && (conversation.callState === 'Ringin' || conversation.callState === 'Ringout' || conversation.callState === 'OffHook'))) {
                    selectedCallId = conversation.callId;
                    $('ul#calllist li').removeClass('selected');
                 }
                var $calls = $('#' + parentId);
                $calls.append($('<li' +(selectedCallId === conversation.callId ? ' class="selected"' : '') + ' id="' + callPrefix + '_' + conversation.callId + '"><span class="controls"><button type="button" class="answerbtn">Answer</button> <button type="button" class="divertbtn">iDivert</button></span><span class="name"></span><span class="state"></span>'));//<b>' + conversation.participant.name + ':</b> ' + conversation.participant.recipient + '</li>'));
                //$calls[0].scrollTop = $calls[0].scrollHeight;
                $newCall = $('#'+callPrefix+'_'+conversation.callId);
                $newCall.find('.answerbtn').click(incomingAnswerClick);
                $newCall.find('.divertbtn').click(incomingDivertClick);
                $newCall.bind('conversationUpdate.cwic',handleConversationUpdate)
                        .bind('conversationEnd.cwic', handleConversationEnd);
                callIsNew = true;
                $('#switchmodebtn').attr('disabled',true);
            }
            calls[conversation.callId] = conversation;
            methods.updateCall(conversation, container);
            return callIsNew;
        },

        getCall: function(callid) {
            return calls[callid];
        },
        getCalls: function() {
            return calls;
        },
        removeCall: function(callid) {
            if(calls[callid]) {
                delete calls[callid];
                var $remove = $('#' + callPrefix + '_' + callid);
                $remove.find('.answerbtn').unbind();
                $remove.find('.divertbtn').unbind();
                $remove.unbind().remove();
            }
            selectedCallId = null;
            for(var call in calls) {
                if(calls.hasOwnProperty(call)) {
                    selectedCallId = calls[call].id;
                }
            }
            methods.setSelectedCall(selectedCallId);
            if(!selectedCallId) {
                $('#switchmodebtn').removeAttr('disabled');
                $('#callcontainer').hide();
            }
        },

        removeAll: function() {
            for(var call in calls) {
                if(calls.hasOwnProperty(call)) {
                    methods.removeCall(calls[call].id);
                }
            }
            selectedCallId = null;
            $('#switchmodebtn').attr('disabled',true);
            $('#callcontainer').hide();
        },

        updateCall: function(conversation,container) {
            var $update = $('#' + callPrefix + '_' + conversation.callId);
            var name = '';
            var title = '';
            var state = '';
            if(container) {
                var $container = $(container);
                var classes = getCwicClasses($container);
                var oldclasses = getCwicClasses($update);
                $container.removeClass(classes);
                $update.data('cwic',$container.data('cwic')).removeClass(oldclasses).addClass(classes);
            }
            if(conversation.callState === 'Reorder') {
                name = conversation.calledPartyNumber;
                state = 'Call Failed';
            } else {
                state = conversation.callState;
                if (conversation.isConference) {
                    name = 'Conference';
                    for(var i=0;i<conversation.participants.length;i++) {
                        title += (i>0 ? ', ' : '') + conversation.participants.name;
                    }
                }
                else if (conversation.callType === "Outgoing") {
                    name = conversation.calledPartyName;
                    title = conversation.calledPartyDirectoryNumber;
                }
                else if (conversation.callType === "Incoming") {
                    name = conversation.callingPartyName;
                    title = conversation.callingPartyDirectoryNumber;
                }
            }
            if(conversation.capabilities.canImmediateDivert || conversation.capabilities.canAnswerCall) {
                $update.find('.divertbtn').attr('disabled', !conversation.capabilities.canImmediateDivert);
                $update.find('.answerbtn').attr('disabled', !conversation.capabilities.canAnswerCall);
                $update.find('.controls').show();
            } else {
                $update.find('.controls').hide();
            }
            $update.find('.name').text(name).attr('title',title);
            //console.log("new state for call list: " + state);
            $update.find('.state').text(state).attr('class', 'state ' + conversation.callState);
            if(!selectedCallId) {
                methods.setSelectedCall(conversation.callId);
            }
        },

        getSelectedCall: function() {
            return calls[selectedCallId];
        },

        getCallDiv: function(callId) {
            if(!callId) {
                callId = selectedCallId;
            }
            return $('#'+callPrefix+'_'+callId);
        },
        setSelectedCall: function(callid) {
            selectedCallId = callid;
            $('#calllist li').removeClass('selected');
            $('#'+callPrefix+'_'+callid).addClass('selected');
            updateConversationInfo(calls[selectedCallId], '#callcontainer');
        },

		isCallListEmpty:function(){
			if ($('#calllist').children().size()) {
                return false;
			}
			return true;
		},

		setCallMap:function(conversation){
			calls[conversation.callId] = conversation;
		},

		getCallMap: function(conversationId) {
            return calls[conversationId];
        },

        callListClick: function(e) {
            if((e.target.id !== "calllist")) {
                var el = $(e.target);
                while(el.length && el[0].id.indexOf(callPrefix)) {
                    el = el.parent();
                }
                if(el.length) {
                    var selectedCallid = el[0].id.replace(callPrefix+"_","");
                    methods.setSelectedCall(selectedCallid);
                    settings.log('selected call id:' + selectedCallid);
                    var call = methods.getSelectedCall();
                    settings.log('selected call:',call);
                    methods.updateCall(call);
                }
            }
        }
    };

    return methods;
};

var caxlHelper = function( jidDomain, url, incomingMsgCallback, settings ) {
    var client = null;
    var bindingUrl = url || "http://gwydlvm151:9080/hub20/alphahttpbinding";
    var domain = jidDomain || "alpha-cup.cisco.com";
    var cachedJids = {};
    var phone_number_stripper_regex = /\s*\([0-9]*\)\s*/;

    var messageReceivedHandler = function(evt) {
        var message = evt.data;
        var body = message.getBody();
        if (body) {
            //TODO: Figure out what to do here - maybe call out to function registered by sample page to do UI work
            //$('#IMcontainer').show();
            var remoteJid = message.getFrom().substring(0, message.getFrom().indexOf('/'));
            incomingMsgCallback(remoteJid, message);
            //addMessage(message.getFrom().substring(0, message.getFrom().indexOf('/')) , body, 'me');
            settings.log('IM was received!');
        }
    };

    var methods = {
        //TODO: Maybe this code should be called in 'constructor' i.e. at the top of this class
        init: function () {
            client = new jabberwerx.Client();
            settings.log(client);
            jabberwerx._config.httpBindingURL = bindingUrl;
            jabberwerx._config.unsecureAllowed = true;
            jabberwerx._config.persistDuration = 0;
            //Receive IM
            client.event("messageReceived").bind(messageReceivedHandler);
        },

        /**
         * Connect to CAXL - returns true if successful, false otherwise
         */
        connect: function(username, pwd) {
            var ret = false;
            var jid = username + '@' + domain;
            try {
                client.connect(jid, pwd);
                ret = true;
            }
            catch(ex){
                settings.log("Cannot connect to IM server. Reason: " + ex.message);
            }
            return ret;
        },

        /**
         * Retrieve a Jabber ID for the conversation's participant.
         *
         * resultCallback is a function that takes a single parameter, which is
         *
         */
        resolveJabberId: function(conv, resultCallback) {
            if(conv.participant.name) {
                var phoneNumPos = (conv.participant.name).search(phone_number_stripper_regex);
                var participant_name = (phoneNumPos === -1)? conv.participant.name : (conv.participant.name).substring(0, phoneNumPos);
                if(cachedJids[participant_name]) {
                    resultCallback(cachedJids[participant_name]);
                } else {
                    var photo = "yes";
                    var contactLookupUrl = settings.contactLookupJsonpHost || 'http://webcommunicator-dev';
                    if(participant_name) {
                        //TODO: Replace JSONP with CORS
                        jQuery.ajax({
                            url: contactLookupUrl + '/quickcontact/name/' + participant_name + '?photo=' + photo,

                            success: function(result) {
                                if(result.error) {
                                    resultCallback(null);
                                } else {
                                    var contacts = result.data || [];
                                    jQuery.each(contacts, function(i, contact) {
                                        if (contact.phoneNumbers.work === conv.participant.recipient) {
                                            resultCallback(cachedJids[participant_name] = contact.jabberId || contact.screenName + '@' + domain);
                                            return false;
                                        }
                                    });
                                }
                            },

                            error: function(failure) {
                                resultCallback(null);
                            },

                            dataType: 'jsonp'
                        });
                    }
                }
            }
        },


        /**
         * Send msg to remotejid. Returns true if it worked, false otherwise
         */
        sendMessage: function(remotejid, msg) {
            var ret = false;
            if (msg === '') {
                return ret;
            }
            else {
                try{
                    client.sendMessage(remotejid, msg);
                    ret = true;
                }
                catch(ex){
                    if(typeof console !== "undefined" && console.trace) {
                        console.trace();
                    }
                    settings.log("Cannot send IM. Reason: " + ex.message);
                }
                /*
                $('#IMcontainer .IMsender').focus();
                addMessage(remotejid, msg, 'client');
                $('#IMsender').val("");
                */
            }
            return ret;
        }
    };

    //TODO: Do some of this stuff:-
    /*client.event('clientStatusChanged').bind(function(evt) {
                            settings.log(evt.data.next);
                            if (evt.data.next == jabberwerx.Client.status_connected) {
                                sendMessage(client,remoteJid);
                                settings.log('IM has sent!');
                            }
                            });*/

    return methods;
};
