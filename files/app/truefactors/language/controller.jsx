React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	showBody : function() {
		var me = this;
		var list = Object.keys(Root.global.langs);
		return (<div className="container">
			<div className="row p-1 pt-5">	
				<div className="col-sm-12>
					Select language:	
				</div>
			</div>
			<div className="row p-1 pt-5">	
				{list.map(function(m) {
					return (<div className="col-sm-2 p-1 m-3 
						border border-info roundered text-center role-checked">
							{Root.global.langs[m]}
						</div>)
				})}
				{list.map(function(m) {
					return (<div className="col-sm-2 p-1 m-3 
						border border-info roundered text-center role-checked">
							{Root.global.langs[m]}
						</div>)
				})}
				{list.map(function(m) {
					return (<div className="col-sm-2 p-1 m-3 
						border border-info roundered text-center role-checked">
							{Root.global.langs[m]}
						</div>)
				})}
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
