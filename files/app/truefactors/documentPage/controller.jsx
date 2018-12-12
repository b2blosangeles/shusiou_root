React.createClass({
        getInitialState : function() {
		var me = this;
		me.compContents = _compContents;
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
		
		var menuItem = (!me.props.data) ? 'homePage' : me.props.data;
		
		switch (menuItem) {
			case 'about' : 
				return (<_about/>)
				break;			
			case 'contact' :
				return (<_contact/>)
				break;
			default :
				if (me.compContents[menuItem]) {
					return me.compContents[menuItem];
				} else {
					return 	Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : 'Error : document ' +menuItem +' does not exist!', 
						setting : {
							type: 'danger',
							noshadow : true,
							style: {'min-height' : '8em'}
						}
					})		
				}
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
