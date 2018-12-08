React.createClass({
        getInitialState: function() {
		var me = this;
          	return {lang : (me.state.lang) ? me.state.lang : 'en'}
		//return {lang : (me.props.parent.state.lang) ? me.props.parent.state.lang : 'en'}
        },
	
	switchLang : function(lang) {
		var me = this;
		me.setState({lang : lang});
		setTimeout(function() {
			me.props.parent.setState({_updated : new Date().getTime()});
		});
	},
	showBody : function() {
		var me = this;
		var list = Object.keys(Root.global.langs);
		return (<div className="container">
			<div className="row p-1 pt-4 m-2">	
				<div className="col-sm-12 p-3 text-secondary">
					Change language:	
				</div>
			</div>
			<div className="row p-2 pt-3 m-2">	
				{list.map(function(m) {
					return (<a href={'#/language'}
						className={'col-sm-2 m-2 mt-3 p-3 border border-secondary rounded text-center text-secondary ' + 
							((m == me.state.lang) ? 'role-checked' : 'role-unchecked') }
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
