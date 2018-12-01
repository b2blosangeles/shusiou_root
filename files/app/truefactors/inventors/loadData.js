var _load = '1234';
var loadVideos = function() {
		var spin_id = Root.overLay.spinOn();
		me.list = [];
		me.setState({updated : new Date().getTime()});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(18);
				Root.overLay.spinOff(spin_id);
				console.log(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)

}
