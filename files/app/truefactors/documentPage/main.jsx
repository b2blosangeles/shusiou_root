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
	showContent : function() {
		var me = this;
		switch (me.props.data) {
			case 'about' : 
				return (<_about/>)
				break;
			case 'contact' :
				return (<_contact/>)
				break;
			default :
				return (<span>No {me.props.data} document</span>)		
		}
	},
        render : function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row">
			{Root.commUI.show({
					code: 'documentPage', 
					parent : me, 
					data : me.showContent(), 
					setting : {
						type : 'light',
						noshadow : true,
						style : {'min-height' : '48em'},
						class : 'documentPage'
					}
				})}
			</div>
		</div>)
        }
})
