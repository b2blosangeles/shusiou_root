React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
          	return {role: '', menuOption:''}
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
		if (me.state.role === 'investor') {
			return me.asyncModule(
				{	extend: {
						includes : [],
						main : 'https://dev.shusiou.win/app/truefactors/homePage/main.jsx'
					}, 
					master: '//master1_dev.shusiou.win/api/JSXhub.api'
				}, ''
			)
		}		
		return 222
        }, 
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>
			  
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
