try {
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
			if ((Root) && (Root.overLay === true)) {
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
				(<span>{Root.commUI.show({code: 'spinner', parent: me})}
					{Root.commUI.show({code: 'popup',  data: 'me.popupBody()', parent: me})}
				</span>)                   
			)}
		})
} catch (err) {
	console.log(err.message);
}

