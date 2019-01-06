React.createClass({
        getInitialState: function() {
		var me = this;
		me.list = [];
		me.compData = new _compData(me, Root);
		me.compViewInvention = new _compViewInvention(me, Root);
		me.compViewVideo = new _compViewVideo(me, Root);
		me.compContents = _compContents;
		me.DigitizeStreamList = Root.lib.getNumberList(20);
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			me.compData.loadVideos();
		}  else if (me.props.parent.state.menuOption === 'myInventions') {
			me.compData.loadMyinventions ();
			
		} else {
		
		}
	},
	setCurrentVideo : function(url) {
		var me = this;
		me.setState({cVideo : url});
	},
	componentWillUnmount : function() {
		var me = this;
		me.setState({cVideo : null, subModule : null});
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myInventions') {
			return me.compViewInvention.showMyinventions();
		}
		
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			if (me.state.cVideo) return me.compViewVideo.showVideoPage(me.state.cVideo); 
			else return me.compViewVideo.showVideos(); 
		}		
		
		if (me.props.parent.state.menuOption === 'howToStartInvention') {
			return me.compContents['howToStartInvention'];
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
