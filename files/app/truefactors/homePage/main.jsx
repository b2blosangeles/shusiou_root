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
			  {Root.commUI.show('infoBox', me, 'Home <br> Page', 
				{
					type: 'success', 
					style: {'min-height' : '28em'}
				})
			}
			</div>
		</div>)
        }
})
