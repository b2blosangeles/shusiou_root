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
					data : 'Home <hr/><div className="spinner"></div> Page', 
					setting : {
						type: 'success',
						style: {'min-height' : '28em'}
						  }
				})}
			</div>
		</div>)
        }
})
