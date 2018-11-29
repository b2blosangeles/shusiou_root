React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
          	return {role: '', menuOption:'', spinner: true}
        },
	componentDidMount : function() {
		var me = this;
		Root.lib.setSpinner(me, true);
		setTimeout(function() {
				Root.lib.setSpinner(me, false);
			}, 1000);
	},
	loadContentPage : function(data) {
		var me = this;
		return Root.lib.asyncModule({
			setting:{	extend: {
						includes : [
							'https://dev.shusiou.win/app/truefactors/documentPage/homePage.jsx',
							'https://dev.shusiou.win/app/truefactors/documentPage/about.jsx',
							'https://dev.shusiou.win/app/truefactors/documentPage/contact.jsx'
						],
						main : 'https://dev.shusiou.win/app/truefactors/documentPage/main.jsx'
					}, 
					master: '//master1_dev.shusiou.win/api/JSXhub.api'
				},
			data : data,
			parent : me
		})	
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
		
		if (me.state.menuOption) {
			return me.loadContentPage(me.state.menuOption);
		} 
		return me.loadContentPage('homePage');	
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
			<div className="footer">{/* &#169; {new Date().getFullYear()} Plato Plan */}
				<div className="container">
					<div className="row">
						<ul className="nav nav-right">
							<li>&#169; {new Date().getFullYear()} Plato Plan</li>
							<li><a>Privacy</a></li>
							<li><a>Terms</a></li>
						</ul>
					</div>
				</div>
			</div>
		</span>
          )
        }
})
