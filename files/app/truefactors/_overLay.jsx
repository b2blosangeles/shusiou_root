try {
	var _overLay = React.createClass({
		getInitialState: function() {
			var me = this;
			return {};
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
			}
		},
		render: function() {
			var me = this;
			console.log('Root--->');
			return (!Rooe) ? (<span>Init overlay</span>): 
				(
				<span>_overLay====
					{Root.commUI.show({code: 'spinner', parent: me})}
					{Root.commUI.show({code: 'popup',  data: me.popupBody(), parent: me})}
				</span>                   
			)}
		})
} catch (err) {
	console.log(err.message);
}

