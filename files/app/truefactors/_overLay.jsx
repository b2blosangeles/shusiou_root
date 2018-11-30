try {

	var _classOverLay = React.createClass({
		getInitialState: function() {
			var me = this;
			me.loading = [];
			
			return {RootReady : 'A'};
		},
		componentDidMount : function() {
			var me = this;
			window.__rootOverLay = me;
			console.log('componentDidMount--2->');
			me.setState({RootReady : 'B'})
		},
		componentDidUpdate : function() {
			var me = this;
			console.log('componentDidUpdate--->');
			//if (!Root) {
				//if ((Root) && (!Root.overLay)) {
				
			//	console.log('Parking overLay');
				//Root.overLay = me;
			//	me.setState({RootReady : true})
			//}
		},
		test : function() {
			alert('test');
			// || !Root.overLay
		},
		render: function() {
			var me = this;
			return ((typeof Root === 'undefined' ) ? (<span>No ROOT--{me.state.RootReady}</span>):
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

