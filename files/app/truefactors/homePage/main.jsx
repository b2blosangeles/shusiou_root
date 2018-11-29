React.createClass({
        getInitialState: function() {
		var me = this;
          	return {spinner:true}
        },
	componentDidMount : function() {
		var me = this;
		setTimeout(
			function() {
				me.setState({spinner:false});
			}, 6000
		)
	},
        render: function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row">
			{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : (<span>{Root.commUI.show({code: 'spinner', parent: me})}
							Home <hr/> 2 Page</span>), 
					setting : {
						type: 'success',
						style: {'min-height' : '28em'}
						  }
				})}
			</div>
		</div>)
        }
})
