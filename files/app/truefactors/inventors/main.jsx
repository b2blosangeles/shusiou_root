React.createClass({
        getInitialState: function() {
		var me = this;
		me.list = [];
		me.compData = new _compData(me, Root);
		me.compView = new _compView(me, Root);
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			me.compData.loadVideos();
			// me.loadData();
		}
	},
	componentWillUnmount : function() {
		var me = this;
	},
	myVideos : function() {
		var me = this;
		return me.compView.showVideos();
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			return me.myVideos();
		} else {
			return (<span>No document</span>)
		}	
	},
        render: function() {
		var me = this;
		return (<span>{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : me.showBody(), 
					setting : {
						type : 'light',
						noshadow : true,
						style : {'min-height' : '40em'},
						class : 'documentPageBody p-3'
					  }
				})}
			</span>)
        }
})
