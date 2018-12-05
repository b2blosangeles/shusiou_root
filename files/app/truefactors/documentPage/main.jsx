React.createClass({
        getInitialState : function() {
		var me = this;
		me.compContents = _compContents;
		console.log('----me.compContents--->>');
		console.log(me.compContents);
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
		console.log('----me.props.data--->');
		console.log(me.props.data);
		switch (me.props.data) {
			case 'about' : 
				return (<_about/>)
				break;
			case 'contact' :
				return (<_contact/>)
				break;
			case 'homePage' :
				return (<_homePage/>)
				break;
			default :
				return (<span>No {me.props.data} document</span>)		
		}
	},
        render : function() {
          var me = this;	
          return  (<span>
		  {Root.commUI.show({
			code: 'infoBox', 
			parent : me, 
			data : me.showContent(), 
			setting : {
				type : 'light',
				noshadow : true,
				style : {'min-height' : '40em'},
				class : 'documentPageBody p-3'
			}
		})}
		</span>)
	}
})
