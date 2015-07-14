"use strict";"use scrict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),PedalController=function(){function e(t){_classCallCheck(this,e),this.controllerListenners=new Array,this.realMultistompListenners=new Array,this.realChange=!1,this.started=!1,this.pedal=t,this.connection=new MidiConnection(t,t.getPedalType()),this.connection.setListenner(this),this.pedal.addListenner(this),this.controllerListenners.add(new Log("Controller")),this.realMultistompListenners.add(new Log("Real Multistomp"))}return _createClass(e,[{key:"on",value:function(){this.started||(this.started=!0,this.connection.start(),this.connection.send(this.pedal.start()),this.realChange=!1)}},{key:"off",value:function(){started||(this.started=!1,this.connection.stop())}},{key:"hasStarted",value:function(){return this.started}},{key:"multistomp",value:function(){return this.pedal}},{key:"nextPatch",value:function(){this.pedal.nextPatch()}},{key:"beforePatch",value:function(){this.pedal.beforePatch()}},{key:"toPatch",value:function(e){this.pedal.toPatch(e)}},{key:"toogleEffect",value:function(e){this.pedal.currentPatch().effects().get(e).toggle()}},{key:"hasActived",value:function(e){return this.pedal.currentPatch().effects().get(e).hasActived()}},{key:"activeEffect",value:function(e){this.pedal.currentPatch().effects().get(e).active()}},{key:"disableEffect",value:function(e){this.pedal.currentPatch().effects().get(e).disable()}},{key:"setEffectParam",value:function(e,t,n){this.pedal.currentPatch().effects().get(e).params().get(t).setValue(n)}},{key:"getAmountEffects",value:function(){return this.pedal.currentPatch().effects().size()}},{key:"addListenner",value:function(e){this.pedal.addListenner(e)}},{key:"toString",value:function(){var e="State: ";return e+=started?"On":"Off",e+="\n",e+this.pedal.toString()}},{key:"onChange",value:function(e){return this.realChange?void(this.realChange=!1):(this.connection.send(e),void this.notify(this.controllerListenners,e))}},{key:"update",value:function(e){this.realChange=!0;var t=new MultistompChanger(this);e.forEach(function(e){return t.attempt(e)}),this.notify(realMultistompListenners,e)}},{key:"notify",value:function(e,t){var n=!0,s=!1,i=void 0;try{for(var a,r=e[Symbol.iterator]();!(n=(a=r.next()).done);n=!0)listenner=a.value,listenner.onChange(t)}catch(o){s=!0,i=o}finally{try{!n&&r["return"]&&r["return"]()}finally{if(s)throw i}}}},{key:"sendMessage",value:function(e){this.connection.send(e)}},{key:"send",value:function(e){this.connection.send(e),this.realChange=!0}}]),e}(),MidiConnection=function(){function e(t,n){_classCallCheck(this,e),this.listenner=Optional.empty(),this.multistomp=t,this.sender=new MidiSender(n),this.reader=new MidiReader(n),this.reader.setListenner(this),this.encoder=MessageEncoderFactory.For(n),this.decoder=MessageDecoderFactory.For(n)}return _createClass(e,[{key:"start",value:function(){this.sender.start(),this.reader.start()}},{key:"stop",value:function(){this.sender.stop(),this.reader.stop()}},{key:"send",value:function(e){var t=!0,n=!1,s=void 0;try{for(var i,a=this.generateMidiMessages(e)[Symbol.iterator]();!(t=(i=a.next()).done);t=!0)midiMessage=i.value,this.send(midiMessage)}catch(r){n=!0,s=r}finally{try{!t&&a["return"]&&a["return"]()}finally{if(n)throw s}}}},{key:"generateMidiMessages",value:function(e){return encoder.encode(e)}},{key:"send",value:function(e){console.log("MIDI sended: "),console.log(" "+BinarioUtil.byteArrayToHex(e.getMessage())),this.sender.send(e)}},{key:"setListenner",value:function(e){this.listenner=Optional.of(e)}},{key:"onDataReceived",value:function(e){return console.log("MIDI received: "),console.log(" "+BinarioUtil.byteArrayToHex(e.getMessage())),this.decoder.isForThis(e)?(messagesDecoded=this.decoder.decode(e,this.multistomp),void(this.listenner.isPresent()&&this.listenner.get().update(messagesDecoded))):void console.log(" unknown ")}}]),e}();