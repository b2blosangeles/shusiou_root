React.createClass({
        getInitialState: function() {
		var me = this;
		me.compData = new _compData(me, Root);
		me.compView = new _compView(me, Root);
		me.compContents = _compContents;
		me.list = [];
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		me.compData.loadVideos();
	},
	componentWillUnmount : function() {
		var me = this;
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'publicSearch' || !me.props.parent.state.menuOption) {
			return me.compView.publicSearch();
		} else {
			return (<span>
				{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : 'Error :' + me.props.parent.state.menuOption +' document does not exist!', 
					setting : {
						type: 'danger',
						noshadow : true,
						style: {'min-height' : '2em'}
					}
				})}
				
				</span>)
		} 	
	},
        render: function() {
		var me = this;
		return Root.commUI.show({
				code: 'infoBox', 
				parent : me, 
				data : me.showBody(), 
				setting : {
					type : 'light',
					noshadow : true,
					style : {'min-height' : '40em'},
					class : 'documentPageBody p-3'
				  }
			})
        }
})
