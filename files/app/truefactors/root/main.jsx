React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
          	return {role: '', menuOption:''}
        },
        showBody : function() {
                var me = this;
		
		if (me.state.role === 'inventor') {
			return Root.lib.asyncModule({
				setting:{	extend: {
							includes : [],
							main : 'https://dev.shusiou.win/app/truefactors/inventors/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'
					},
				data : '',
				parent : me
			})
		}		
		
		if (me.state.role === 'investor') {
			return Root.lib.asyncModule({
				setting:{	extend: {
							includes : [],
							main : 'https://dev.shusiou.win/app/truefactors/errPage/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'
					},
				data : '',
				parent : me
			})
		} 
		return Root.lib.asyncModule({
			setting:{	extend: {
						includes : [],
						main : 'https://dev.shusiou.win/app/truefactors/homePage/main.jsx'
					}, 
					master: '//master1_dev.shusiou.win/api/JSXhub.api'
				},
			data : '',
			parent : me
		})	
        }, 
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>
			 {Root.commUI.show({code: 'spinner', parent: me})}
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
