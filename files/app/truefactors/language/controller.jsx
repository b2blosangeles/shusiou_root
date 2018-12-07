React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	showBody : function() {
		var me = this;
		return (<span>Language</span>)	
	},
        render: function() {
		var me = this;
		return Root.commUI.show({
				code: 'infoBox', 
				parent : me, 
				data : me.showBody(), 
				setting : {
					type : 'light',
					noshadow : true,
					style : {'min-height' : '40em'},
					class : 'documentPageBody p-3'
				  }
			})
        }
})
