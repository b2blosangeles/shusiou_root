try {
	var __overLay = {};
	var _overLay = React.createClass({
		getInitialState: function() {
			var me = this;
			me.loading = [];
			return {RootReady : false};
		},
		componentDidMount : function() {
			var me = this;
			console.log('componentDidMount--->');
		},
		componentDidUpdate : function() {
			var me = this;
			console.log('componentDidUpdate--->');
			if (Root) {
				//if ((Root) && (!Root.overLay)) {
				__overLay = me;
				console.log('Parking overLay');
				Root.overLay = me;
				me.setState({RootReady : true})
			}
		},
		test : function() {
			alert('test');
		},
		render: function() {
			var me = this;
			return ((!Root ||!Root.overLay) ? (<span/>):
				(<span>
					Overlay ready ===
					{Root.commUI.show({code: 'spinner', parent: me})}
					{Root.commUI.show({code: 'popup',  data: 'me.popupBody()', parent: me})}
				</span>)                   
			)}
		})
} catch (err) {
	console.log(err.message);
}

