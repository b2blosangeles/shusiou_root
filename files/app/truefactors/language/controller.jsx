React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	showBody : function() {
		var me = this;
		var list = Root.global.langs;
		return (<div className="container">
			<div className="row">
				<div className="col-sm-12 p-1">	
					{list.map(function(m) {
						<div className="col-sm-1 p-1">{m}==</div>
					}
				</div>
			</row>
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
