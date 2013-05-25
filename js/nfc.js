var tourout = tourout || {};

/* Module for NFC originally by Zaneta Szymanska at Samsung */
tourout.nfc = function(callback) {
	var nfcAdapter;
	var nfcTarget;
	var callbacks = {
		onattach : function(){ 
			console.log("attached");
		},
		onreceive : function(message){ 
			console.log("received");
			console.log(message.records[0].text);
			var msg = JSON.parse(message.records[0].text);
		}	
	}; //contains callback functions: onattach, ondetach and onreceive 
	

	var detectTarget = function() {
		var onSuccess = {
			onattach : function sucAttach(target) {
				nfcTarget = target;
				nfcTarget.setReceiveNDEFListener(callbacks.onreceive, err);
				callbacks.onattach();
			},
			ondetach : function() {
				nfcTarget = null;
				callbacks.ondetach();
				nfcTarget.unsetReceiveNDEFListener();
			}
		};

		function err(e) { tizen.logger.err('Target Listen Error: ' + e.message); }

		try { nfcAdapter.setPeerListener(onSuccess, err); }
		catch (e) { tizen.logger.err(e.name + " : " + e.message); }
	};
	
	return {
		init : function(callback) {
			function onPowerOn() {
				detectTarget();
				tizen.logger.info("On Power On"); 
			}
			function onPowerOnFails(e) {
				tizen.logger.err('Power On error: ' + e.name + " : "+ e.message);
			}
			
			try {
				console.log("Try getDefaultAdapter");
				nfcAdapter = tizen.nfc.getDefaultAdapter();
				callbacks = callback; 
				nfcAdapter.setPowered(true, onPowerOn, onPowerOnFails);
				console.log(this.isTargetDetect());
			} catch (e) {
				console.log(e.name + " : " + e.message);
				nfcAdapter = null;
			}
		},
		
		isTargetDetect : function() {
			if (nfcTarget) return true;  
			return false; 
		}, 
		
		sendTextNDEF : function(recordsToSend, callback) {
			var textRecords = [];
			var fileContent = ''; // extra functionality, in case you use only Emulator, not device; content to save in file

			try {
				for (i in recordsToSend) {
					textRecords.push(new tizen.NDEFRecordText(encodeURIComponent(recordsToSend[i]), 'en-US', 'UTF16'));
					fileContent += i + ': '	+ encodeURIComponent(recordsToSend[i]) + '\n';
					console.log("text: " + encodeURIComponent(recordsToSend[i]));
				}
				var ndefMessage = new tizen.NDEFMessage(textRecords);
				nfcTarget.sendNDEF(ndefMessage, callback.success, callback.error);
				console.log("Message: " + JSON.stringify(ndefMessage));
			} catch (e) {
				console.log("Error: " + e.message);
			}
		}			
	};	
}();