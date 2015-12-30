var BasicAjax = function(initConfig) {

	var payload = {
		url:initConfig.url,
		success:initConfig.successCallback || $.noop,
		error:initConfig.errorCallback || $.noop,
		type:'POST',
		dataType:'json',
		data:JSON.stringify(initConfig.data),
		processData:false,
		contentType:'application/json'
	};

	var send = function(type) {
		payload.type = type;
		$.ajax(payload);
	};

	return {
		get:function() {
			send('GET');
		},
		post:function() {
			send('POST');
		},
		put:function() {
			send('PUT');
		}
	};
};
