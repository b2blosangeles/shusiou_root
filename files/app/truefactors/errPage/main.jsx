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
			  {Root.commUI.show('infoBox', me, 'Error: Empty Module!!!', {
					type: 'danger', 
					style: {'min-height' : '36em'}
				})
			  }   
			</div>
		</div>)
        }
})
