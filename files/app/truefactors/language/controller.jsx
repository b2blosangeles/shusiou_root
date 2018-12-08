React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	switchLang : function(lang) {
		var me = this;
	//	me.setState({lang : lang});
		me.props.parent.setState({lang : lang})
	},
	showBody : function() {
		var me = this;
		var list = Object.keys(Root.global.langs);
		return (<div className="container">
			<div className="row p-1 pt-4 m-2">	
				<div className="col-sm-12 p-3 text-info">
					Change language:	
				</div>
			</div>
			<div className="row p-2 pt-3 m-2">	
				{list.map(function(m) {
					return (<a href={'#/language'}
						className={'col-sm-2 m-2 mt-3 p-3 border border-info rounded text-center text-info ' + 
							((m == me.props.parent.state.lang) ? 'role-checked' : 'role-unchecked') }
						onClick={me.switchLang.bind(me, m)}	
						>
							{Root.global.langs[m]}
						</a>)
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
