React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	showBody : function() {
		var me = this;
		var list = Object.keys(Root.global.langs);
		return (<div className="container">
			<div className="row p-1 pt-5 m-3">	
				{list.map(function(m) {
					<div className="col-sm-1 p-1">{Root.global.langs[m]}==</div>
				}
			</div>
		</div>)	
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
