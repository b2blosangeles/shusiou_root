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
		console.log('===me.props.parent.state.menuOption===>');
		console.log(me.props.parent.state.menuOption);
		if (me.props.parent.state.menuOption === 'myInventions' || !me.props.parent.state.menuOption) {
			me.compData.loadVideos();
			// me.loadData();
		}  else if (me.props.parent.state.menuOption === 'myVideos') {
			me.compData.loadVideos();
		}
	},
	componentWillUnmount : function() {
		var me = this;
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myInventions' || !me.props.parent.state.menuOption) {
			return me.compView.showVideos();
		} else if (me.props.parent.state.menuOption === 'myVideos') {
			me.compView.showMyinventions()
		} else {
			return (<span>
				{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : 'Error :' + me.props.parent.state.menuOption +' document does not exist!', 
					setting : {
						type: 'danger',
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
