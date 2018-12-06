React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
          	return {role: '', menuOption:'', spinner: true, route:''}
        },
	
	componentDidMount : function() {
		var me = this;
	},
	changeContentPage : function(v, e) {
		var me = this; 
		
		if ((e) && e.target) {
			Root.commUI.animation.transfer($(e.target));
		}
		
		if (!v) {
			me.setState({ role : null, menuOption : null})
		} else {
			me.setState({ menuOption : v})   
		}
	},
	animationTransfer : function(e) {
		var me = this; 
		if ((e) && e.target) {
			Root.commUI.animation.transfer($(e.target));
		}
	},
	loadContentPage : function(menuItem) {
		var me = this;
		return Root.lib.asyncModule({
			setting:{	extend: {
						contents : {
							terms : 'https://dev.shusiou.win/app/truefactors/contents/terms.text',
							faq: 'https://dev.shusiou.win/app/truefactors/contents/faq.text',
							privacy : 'https://dev.shusiou.win/app/truefactors/contents/privacy.text',
							howToStart : 'https://dev.shusiou.win/app/truefactors/contents/howToStart.txt'
						},
						includes : [
							'https://dev.shusiou.win/app/truefactors/documentPage/homePage.jsx',
							'https://dev.shusiou.win/app/truefactors/documentPage/about.jsx',
							'https://dev.shusiou.win/app/truefactors/documentPage/contact.jsx'
						],
						controller : 'https://dev.shusiou.win/app/truefactors/documentPage/controller.jsx'
					}, 
					master: '//master1_dev.shusiou.win/api/DVCHub.api'
				},
			data : menuItem,
			parent : me
		})	
	},
        showBody : function() {
                var me = this;
		if ((me.state.role) && (Root.global.menuTree[me.state.role]) && 
		    Root.global.menuTree[me.state.role].indexOf(me.state.menuOption) !== -1) {
			if (me.state.role === 'inventor') {
			    Root.global.menuTree[me.state.role].indexOf(me.state.menuOption) !== -1) {
				return Root.lib.asyncModule({
					setting:{	extend: {
								includes : [
									'https://dev.shusiou.win/app/truefactors/inventors/data.jsx',
									'https://dev.shusiou.win/app/truefactors/inventors/view.jsx'	
								],
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
								contents : {
								},					
								includes : [
									'https://dev.shusiou.win/app/truefactors/investors/data.jsx',
									'https://dev.shusiou.win/app/truefactors/investors/view.jsx'	
								],
								controller : 'https://dev.shusiou.win/app/truefactors/investors/controller.jsx'
							}, 
							master: '//master1_dev.shusiou.win/api/DVCHub.api'
						},
					data : '',
					parent : me
				})
			} 
		} else {
			return me.loadContentPage(me.state.menuOption);	
		}
		
        }, 
	showPageFrame : function(data) {
		var me = this;
		return Root.commUI.show({
				code: 'pageFrame', 
				parent : me, 
				data : data, 
				setting : {
					type : 'light',
					noshadow : true,
					style : {'min-height' : '40em'},
					class : 'documentPageBody p-3'
				}
			})
	},
	copyRightSection : function() {
		var me = this;
		// onClick={/*me.changeContentPage.bind(me,  m.code)*/}
		return (
			<div className="copyright_section">
				<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 text-right">
						<span className="pull-right">
						&#169; {new Date().getFullYear()} Plato Plan
						&nbsp;&nbsp;|&nbsp;&nbsp;
						<a href="#/privacy" onClick={me.animationTransfer}>Privacy</a>
						&nbsp;&nbsp;|&nbsp;&nbsp;
						<a href="#/terms" onClick={me.animationTransfer}>Terms</a>
						</span>
						
						<span className="pull-left">
							{Root.global.menuTree.common.map(function(m) {
							return(<span>
							  &nbsp;&nbsp;|&nbsp;&nbsp;
							  <a href={'#/' + m}  onClick={me.animationTransfer}>
								  {Root.global.menuItems[m]}</a>
							</span>)
							})}
						</span>
					</div>
				</div></div>
			</div>
		)
	},
	routeRule : function() {
		var me = this;
		return {
			'_default' : function(path) {
				var path_a = path.split('/');
				if (path_a[0]) me.setState({ role : path_a[0]});
				if (path_a[1]) me.setState({ menuOption : path_a[1]});
				else {
					me.setState({ menuOption : null});
				}
			}			
		}
	},
        render: function() {
          var me = this;
          return  (
		<span>
			<_routerControl routeRule={me.routeRule()} />
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>
			{me.showPageFrame(me.showBody())}
			{me.copyRightSection()}
		</span>
          )
        }
})
