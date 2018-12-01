var loadVideos = function(me) {
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

}
