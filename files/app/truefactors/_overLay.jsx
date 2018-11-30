try {

	var _classOverLay = React.createClass({
		getInitialState: function() {
			var me = this;
			me.loading = [];
			
			return {RootReady : false};
		},
		componentDidMount : function() {
			var me = this;
			window.__rootOverLay = me;
			console.log('componentDidMount--1->');
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
		},
		render: function() {
			var me = this;
		//	var Root = me.props.Root;
			return (<span>NND --- {typeof Root}---</span>)}
			
			return ((typeof Root === 'undefined' || !Root.overLay) ? (<span>No ROOT</span>):
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

