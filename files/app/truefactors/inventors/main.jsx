React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	myVideos : function() {
		var me = this;
		var list = Root.lib.getNumberList(10);
		return  (
			<div className="container">
				<div className="row ">
				{Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : 'Test', 
						setting : {
							type: 'success'
						}
					})}
				</div>
				<div className="row ">
					{list.map(function(m) {
						return Root.commUI.show({
							code: 'cellBox', 
							parent : me, 
							data : '<b>v' + m + '</b>', 
							setting : {
								noshadow :true,
								type: 'success'
							}
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
