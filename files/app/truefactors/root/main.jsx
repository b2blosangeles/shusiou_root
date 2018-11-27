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
							main : 'https://dev.shusiou.win/app/truefactors/adbox/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
					data={{role: me.state.role, v : me.state.v, sk:v}}
					parent={me} />
	},
	asyncSalesForce : function() {
		var me = this;
		return 	<_asyncModule plugin={{extend: {
				includes : [],
				main : 'https://dev.shusiou.win/app/truefactors/salesForce/main.jsx'
			}, 
			master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
			data={{}} parent={me} />
	},
        init : function(code) {
                var me = this;
		me.roles = Root.global.roles;
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
	videoBox : function() {
		var videoBox = Root.commUI.videoBox;
		return <videoBox/>
	},
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_secondMenu parent={me}/>

			<div className="container">
			<div className="row ">
				<div className="col-sm-12 p-1">
				<div className="alert-secondary rounded p-2 mt-1"
					style={{'min-height' : '32em'}}
					>
					<div className="container">
					<div className="row ">
						<div className="col-sm-3 p-1 pull-left">
						<div className="border border-secondary alert-light 
								rounded p-2 m-1" 
							style={{'min-height' : '8em'}}>
							{me.asyncAdbox('2')}
						</div>
						</div>

						<div className="col-sm-3 p-1 pull-left">
						<div className="border border-secondary alert-light 
								rounded p-2 m-1" 
							style={{'min-height' : '8em'}}>
							{me.asyncAdbox('2')}
						</div>
						</div>

						<div className="col-sm-3 p-1 pull-left">
						<div className="border border-secondary alert-light 
								rounded p-2 m-1" 
							style={{'min-height' : '8em'}}>
							{me.asyncAdbox('2')}
						</div>
						</div>

						<div className="col-sm-3 p-1 pull-left">
						<div className="border border-secondary alert-light 
								rounded p-2 m-1" 
							style={{'min-height' : '8em'}}>
							{me.asyncAdbox('2')}
						</div>
						</div>
						
						<div className="col-sm-3 p-1 pull-left">
						<div className="border border-secondary alert-light 
								rounded p-2 m-1" 
							style={{'min-height' : '8em'}}>
							{me.asyncAdbox('2')}
						</div>
						</div>

						<div className="col-sm-3 p-1 pull-left">
						<div className="border border-secondary alert-light 
								rounded p-2 m-1" 
							style={{'min-height' : '8em'}}>
							{me.asyncAdbox('2')}
						</div>
						</div>
						<hr/>
						{me.videoBox()}
					</div>
					</div>
				</div>
				</div>
			</div>
			</div>
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1">
						<div className="border border-warning alert-warning rounded p-2" 
							style={{'min-height' : '6em'}}>
							{me.asyncAdbox('1')}
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1">
						<div className="alert-secondary p-2" 
							style={{'min-height' : '12em'}}>
							{me.asyncSalesForce()}
						</div>
					</div>
				</div>
			</div>			  
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12 p-1">
						<div className="border border-secondary bg-secondary 
								text-center rounded-bottom p-2" 
							style={{'min-height' : '2em', 'color' : '#fff'}}>
							&#169; {new Date().getFullYear()} Polo Alto Project
						</div>
					</div>
				</div>
			</div>
		</span>
          )
        }
})
