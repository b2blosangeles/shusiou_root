React.createClass({
        getInitialState: function() {
		var me = this;
          	return {lang: 'en'}
        },
	showBody : function() {
		var me = this;
		var list = Object.keys(Root.global.langs);
		return (<div className="container">
			<div className="row p-1 pt-4 m-2">	
				<div className="col-sm-12 p-3">
					Change language:	
				</div>
			</div>
			<div className="row p-2 pt-3 m-2">	
				{list.map(function(m) {
					return (<div 
						className={'col-sm-2 m-2 mt-3 border border-info roundered text-center ' + 
							((m == me.state.lang) ? 'role-checked' : 'role-unchecked') }>
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
