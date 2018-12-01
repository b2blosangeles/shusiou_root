var _compData = function(me, Root) {
	this.loadVideos = function() {
		var spin_id = Root.overLay.spinOn();
		me.list = [];
		me.setState({updated : new Date().getTime()});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(18);
				Root.overLay.spinOff(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)
	},
	this.showImage = function(i) {
		var list = [
		'https://i.ytimg.com/an_webp/vjhiERkfvG4/mqdefault_6s.webp?du=3000&sqp=CK7xh-AF&rs=AOn4CLCo8EFruYbRz8rnnQ8RZua389qa2Q',
		'https://i.ytimg.com/an_webp/8D3cIyccqFE/mqdefault_6s.webp?du=3000&sqp=CObWh-AF&rs=AOn4CLDY0t8XlfkYFOWv8g5fOmGICQbt9g',
		'https://i.ytimg.com/an_webp/CzaJ7pnGbXU/mqdefault_6s.webp?du=3000&sqp=CNWFiOAF&rs=AOn4CLAVa7n070yp6wBGJW53bYtH7tiSpA',
		'https://i.ytimg.com/an_webp/Pnhxz0learg/mqdefault_6s.webp?du=3000&sqp=CLDWh-AF&rs=AOn4CLDCw3tdtyN_DOjtijoCMkSQe47AnQ',
		'https://i.ytimg.com/an_webp/Dmmi-dQFz_8/mqdefault_6s.webp?du=3000&sqp=CK3ph-AF&rs=AOn4CLD9Sr0pTvw6dCx-w7hSwX3LcVdQqQ',
		'https://i.ytimg.com/an_webp/aeXAOzV6wyk/mqdefault_6s.webp?du=3000&sqp=CI_yh-AF&rs=AOn4CLDyZOEny1mWEPlrmXoElCpI1K0jKA',
		'https://i.ytimg.com/an_webp/4vzKlaD_ih4/mqdefault_6s.webp?du=3000&sqp=COr4h-AF&rs=AOn4CLCN-7CovoE6_oITag-_qjMWm-1m5Q',
		'https://i.ytimg.com/an_webp/sXtekwuT8R0/mqdefault_6s.webp?du=3000&sqp=CIjYiOAF&rs=AOn4CLBrBr497j3ZoL70r-y9K3beP_yRSA',
		'https://i.ytimg.com/an_webp/QEQAt1l2_VA/mqdefault_6s.webp?du=3000&sqp=CLC9iOAF&rs=AOn4CLDbmxH1gK8ZL03L6OMm7aREywbjgQ',
		'https://i.ytimg.com/an_webp/Yirc35yIjfc/mqdefault_6s.webp?du=3000&sqp=CPioiOAF&rs=AOn4CLA-4Q37yLoTRlVDAz9GL2OxQ9R49Q',
		'https://i.ytimg.com/an_webp/m-PJmmvyP10/mqdefault_6s.webp?du=3000&sqp=CJagiOAF&rs=AOn4CLCynaAM6JFByFl_49SCRtsB_NOq7g',
		'https://i.ytimg.com/an_webp/IYKU4nVL9AY/mqdefault_6s.webp?du=3000&sqp=CLquiOAF&rs=AOn4CLDAUJNJfSozySxlUchWCPuvnAZozA',
		'https://i.ytimg.com/an_webp/GeZnp4DvAqc/mqdefault_6s.webp?du=3000&sqp=CIDZiOAF&rs=AOn4CLB1b2-Crq9bJfapSW16NJILdTPq-A'
		]
		var item = list[Math.floor(Math.random()*list.length)];
		return '<img class="w-100" src="' + ((list[i]) ? list[i] : item) + '"/>';
	}
	
};

