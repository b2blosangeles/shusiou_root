React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        render: function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row">
			{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : (<span>{Root.lib.spinner()}
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
