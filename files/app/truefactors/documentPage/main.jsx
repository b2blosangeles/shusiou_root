React.createClass({
        getInitialState : function() {
		var me = this;
          	return {}
        },
	componentDidMount : function() {
		var me = this;
	},
	componentWillUnmount : function() {
		var me = this;
	},
        render : function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row">
			{Root.commUI.show({
					code: 'documentPage', 
					parent : me, 
					data : (<span>{me.props.data}</span>), 
					setting : {
						type : 'light',
						noshadow : true,
						style : {'min-height' : '58em'},
						class : ' border border-warning '
					}
				})}
			</div>
		</div>)
        }
})
