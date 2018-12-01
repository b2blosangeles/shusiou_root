var _compData = function(me, Root) {
	this.loadVideos = function(me, Root) {
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
		'https://i.ytimg.com/an_webp/Dmmi-dQFz_8/mqdefault_6s.webp?du=3000&sqp=CK3ph-AF&rs=AOn4CLD9Sr0pTvw6dCx-w7hSwX3LcVdQqQ'
		]
		var item = list[Math.floor(Math.random()*list.length)];
		return '<img class="w-100" src="' + ((list[i]) ? list[i] : item) + '"/>';
	}
	
};

