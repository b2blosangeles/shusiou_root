var _compData = function(me, Root) {
	this.loadVideos = function() {
		//var spin_id = Root.overLay.spinOn();
		Root.lib.setSpinAnchor(me, 'AA', true);
		//me.list = [];
		me.setState({updated : new Date().getTime()});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(18);
				Root.lib.setSpinAnchor(me, 'AA', false)
			//	Root.overLay.spinOff(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)
	}
	
};
