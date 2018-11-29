React.createClass({
        getInitialState: function() {
		var me = this;
		me.list = [];
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		Root.lib.setSpinner(me, true);
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(10);
				Root.lib.setSpinner(me, false);
				me.setState({updated : new Date().getTime()});
			}, 1000
		)
	},
	componentWillUnmount : function() {
		var me = this;
	},
	myVideos : function() {
		var me = this;
		return  (
			<div className="container">
				<div className="row ">
				{Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : 'Test', 
						setting : {
							noshadow :true,
							type: 'success'
						}
					})}
				</div>
				<div className="row ">
					 {Root.commUI.show({code: 'spinner', parent: me})}
					
					{me.list.map(function(m) {
						return Root.commUI.show({
							code: 'cellBox', 
							parent : me, 
							data : '<b>v' + m + '</b>', 
							setting : {
								noshadow :true,
								type: 'success'
							}
						});
					})}							
				</div>
			</div>)			
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myVideos') {
			return me.myVideos();
		} else {
			return (<span>No update</span>)
		}	
	},
        render: function() {
		var me = this;
		return (<div className="container">
				<div className="row ">
				  {Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : me.showBody(), 
						setting : {
							type: 'success',
							style: {'min-height' : '28em'}
						  }
					})}
				</div>
			</div>)
        }
})
