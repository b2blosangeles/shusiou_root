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
				{Root.commUI.show('infoBox', me, 'Test', {type: 'success'})}
				</div>
				<div className="row ">
					{list.map(function(m) {
						return Root.commUI.show('cellBox', me, '<b>v' + m + '</b>')
					})}							
				</div>
			</div>)			
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myVideos') {
			return me.myVideos();
		} else {
			<span>No update</span>
		}	
	},
        render: function() {
		var me = this;
		return  me.showBody();
        }
})
