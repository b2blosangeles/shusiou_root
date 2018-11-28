React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        render: function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row ">
				{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : 'Error: Empty Module!!!', 
					setting : {
						type: 'danger',
						style: {'min-height' : '28em'}
						  }
				})} 
			</div>
		</div>)
        }
})
