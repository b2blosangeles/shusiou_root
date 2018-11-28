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
	asyncModule : function(setting, data) {
		var me = this;
		return <_asyncModule plugin={setting} data={data} parent={me} />
	},
        showBody : function() {
                var me = this;
		if (me.state.role === 'inventor' && me.state.menuOption === 'myVideos') {
			return me.asyncModule(
				{	extend: {
						includes : [],
						main : 'https://dev.shusiou.win/app/truefactors/myVideos/main.jsx'
					}, 
					master: '//master1_dev.shusiou.win/api/JSXhub.api'
				}, ''
			)
		}
		return <span>--</span>
        }, 
	infoBox : function(data, classCFG) {
		var _infoBox = Root.commUI.infoBox;
		return <_infoBox data={data} class={classCFG} />
	},
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>

			<div className="container">
				<div className="row">
					<div className="col-sm-12 mt-2">
					<div className="row">
						{me.infoBox(me.asyncSalesForce(), {type: 'success'})}
					</div>
					</div>
				</div>
			</div>			  
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12" style={{'min-height' : '32em'}}>
						{me.showBody()}
					</div>
				</div>
			</div>
			  
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<div className="row ">
						<div className="col-sm-12 p-1">
							<div className="shadow border border-secondary bg-secondary 
									text-center align-bottom rounded p-1 m-1 mx-3" 
								style={{'height' : '2.25em', 'color' : '#fff'}}>
								&#169; {new Date().getFullYear()} Polo Alto Project
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</span>
          )
        }
})
