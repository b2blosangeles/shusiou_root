React.createClass({
        getInitialState: function() {
		var me = this;
          	return {lanhg: 'en'}
        },
	showBody : function() {
		var me = this;
		var list = Object.keys(Root.global.langs);
		return (<div className="container">
			<div className="row p-1 pt-5">	
				<div className="col-sm-12 p-2">
					Change language:	
				</div>
			</div>
			<div className="row p-1 pt-3">	
				{list.map(function(m) {
					return (<div className="col-sm-2 m-3 
						border border-info roundered text-center role-unchecked">
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
