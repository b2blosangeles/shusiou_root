var _compData = function(me, Root) {
	this.loadVideos = function() {
		//var spin_id = Root.overLay.spinOn();
		Root.lib.setSpinAnchor(me, 'AA', true);
		//me.list = [];
		me.setState({updated : new Date().getTime()});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(11);
				Root.lib.setSpinAnchor(me, 'AA', false)
			//	Root.overLay.spinOff(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)
	},
	this.showImage = function(i) {
		var list = [
			'/app/truefactors/resource/webp/mqdefault_6s.webp',
			'/app/truefactors/resource/webp/100.webp',
			'/app/truefactors/resource/webp/101.webp',
			'/app/truefactors/resource/webp/102.webp',
			'/app/truefactors/resource/webp/103.webp',
			'/app/truefactors/resource/webp/104.webp',
			'/app/truefactors/resource/webp/105.webp',
			'/app/truefactors/resource/webp/106.webp',
			'/app/truefactors/resource/webp/107.webp',
			'/app/truefactors/resource/webp/108.webp',
			'/app/truefactors/resource/webp/109.webp'
		]
		var item = list[Math.floor(Math.random()*list.length)];
		return '<img class="w-100" src="' + ((list[i]) ? list[i] : item) + '"/>';
	}
	
};

