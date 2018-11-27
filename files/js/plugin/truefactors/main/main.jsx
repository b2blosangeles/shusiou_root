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
			<_rolesMenu parent={me}/>
			<_secondMenu parent={me}/>

			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1">
						<div className="row border border-secondary rounded-bottom p-2 mt-1" 
							style={{'min-height' : '28em'}}>
							{me.showBody()}
						</div>
					</div>
				</div>
			</div>			  
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-3 p-1">
						<div className="row border border-secondary alert-info 
								rounded-bottom p-2 pull-left" 
							style={{'min-height' : '8em', 'margin-right' : '2px'}}>
							{me.asyncAdbox('2')}
						</div>
					</div>
					<div className="col-sm-3 p-1">
						<div className="row border border-secondary alert-info 
								rounded-bottom p-2" 
							style={{'min-height' : '8em', 
								'margin-right' : '2px',
							        'margin-left' : '2px'}}>
							{me.asyncAdbox('2')}
						</div>
					</div>
					<div className="col-sm-3 p-1">
						<div className="row border border-secondary alert-info 
								rounded-bottom p-2" 
							style={{'min-height' : '8em', 
								'margin-right' : '2px',
							        'margin-left' : '2px'}}>
							{me.asyncAdbox('2')}
						</div>
					</div>
					<div className="col-sm-3 p-1">
						<div className="row border border-secondary alert-info 
								rounded-bottom p-2 pull-right" 
							style={{'min-height' : '8em', 'margin-left' : '2px'}}>
							{me.asyncAdbox('32')}
						</div>
					</div>
				</div>
			</div>
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1">
						<div className="row border border-secondary alert-success rounded-bottom p-2" 
							style={{'min-height' : '6em'}}>
							{me.asyncAdbox('1')}
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1">
						<div className="row border border-secondary alert-warning rounded-bottom p-2" 
							style={{'min-height' : '6em'}}>
							{me.asyncSalesForce()}
						</div>
					</div>
				</div>
			</div>			  
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1 bg-secondary">
						<div className="row border border-secondary alert-secondary rounded-bottom p-2" 
							style={{'min-height' : '2em'}}>
							&#169; {new Date().getFullYear()} Polo Alto Project
						</div>
						
						{/*<div className="bg-secondary p-2" 
							style={{'min-height' : '2em', 'align' : 'center', 'color' : '#fff'}}>
							&#169; {new Date().getFullYear()} Polo Alto Project
						</div>*/}
					</div>
				</div>
			</div>
		</span>
          )
        }
})
