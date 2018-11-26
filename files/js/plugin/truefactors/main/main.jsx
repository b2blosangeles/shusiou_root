React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = {};
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		me.init();
        },
        componentDidUpdate:function() {
               var me = this;
        },	
	asyncAdbox : function(v) {
		var me = this;
		return <_asyncModule plugin={{extend: {
							includes : [],
							main : 'https://dev.shusiou.win/js/plugin/truefactors/adbox/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
					data={{role: me.state.role, v : me.state.v, sk:v}}
					parent={me} />
	},
	asyncSalesForce : function() {
		var me = this;
		return 	<_asyncModule plugin={{extend: {
				includes : [],
				main : 'https://dev.shusiou.win/js/plugin/truefactors/salesForce/main.jsx'
			}, 
			master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
			data={{}} parent={me} />
	},
	setV : function(v) {
		var me = this;
		me.setState({v: v});
	},
        init : function(code) {
                var me = this;
		me.roles = _global.roles;
		me.setState({role: ''});
        },
        showBody : function() {
                var me = this;
		if (!me.state.role) return (<span/>);
		else {
			switch (me.state.role) {
				case 'inventor' :  return (<_sectionInventors/>);
				case 'investor' : return (<_sectionInvestors/>);
				default :
					return 'Error: undefined section <' + me.state.role + '/>';
			}
		}
        }, 
	
        render: function() {
          var me = this;
          return  (
		<span>
			  <a href="JavaScript:void(0)" onClick={me.setV.bind(me, 'AAA')}>AAA</a>
			   <a href="JavaScript:void(0)" onClick={me.setV.bind(me, 'BBB')}>BBB</a>
			  <_rolesMenu parent={me}/>
			{/*<_secondMenu parent={me}/>*/}
			<div className="container">
				<div className="row border border-secondary alert-info rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					{me.asyncAdbox('2')}
				</div>			  
			</div>
			  
			<div className="container">
				<div className="row border border-secondary alert-success rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					{me.asyncAdbox('1')}
				</div>			  
			</div>
			<div className="container">
				<div className="row border border-secondary alert-warning rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					{me.asyncSalesForce()}
				</div>			  
			</div>			  
			  
			{/*<div className="container">
				<div className="row border border-secondary rounded-bottom p-2 mt-1" 
					style={{'min-height' : '36em'}}>
					{me.showBody()}
				</div>			  
			</div>*/}

			  
			{/*<div className="container">
				<div className="float-sm-right">Copyright &#169; {new Date().getFullYear()}</div>
			</div>*/}

		</span>
          )
        }
})
