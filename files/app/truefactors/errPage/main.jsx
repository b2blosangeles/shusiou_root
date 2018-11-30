React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	showContent : function() {
		var me = this;
		return (me.props.data)? me.props.data : '';
	},
        render: function() {
          	var me = this;
		return  (
		<div className="container">
			<div className="row">
				<div className="col-sm-12 p-1">
				{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : me.showContent(), 
					setting : {
						type: 'danger',
						style: {'min-height' : '28em'}
					}
				})}
				</div>
			</div>
		</div>)
        }
})
