var _compData = function(me, Root) {
	this.loadVideos = function() {
		//var spin_id = Root.overLay.spinOn();
		console.log('===call load loadVideos');
		Root.lib.setSpinAnchor(me, 'AA', true);
		// me.list = [];
		me.setState({updated : new Date().getTime()});
		$.get('/api/platoplan/demoAPI.api?code=videoList', function(data, status){
			console.log(data);
		});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(20);
				Root.lib.setSpinAnchor(me, 'AA', false)
			//	Root.overLay.spinOff(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)
	},
	this.loadMyinventions = function() {
		//var spin_id = Root.overLay.spinOn();
		console.log('===call load loadMyinventions');
		Root.lib.setSpinAnchor(me, 'AB', true);
		//me.list = [];
		me.setState({updated : new Date().getTime()});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(20);
				Root.lib.setSpinAnchor(me, 'AB', false)
				console.log('===call load loadVideos done');
			//	Root.overLay.spinOff(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)
	}		

	
};

