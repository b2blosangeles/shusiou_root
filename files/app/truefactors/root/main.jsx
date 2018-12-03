React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
          	return {role: '', menuOption:'', spinner: true}
        },
	
	componentDidMount : function() {
		var me = this;
	},
	changeContentPage : function(v) {
		var me = this; 
		if (!v) {
			me.setState({ role : null, menuOption : null})
		} else {
			me.setState({ menuOption : v})   
		}
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
			data : (!data) ? 'homePage' : data,
			parent : me
		})	
	},
        showBody : function() {
                var me = this;
		
		if (me.state.role === 'inventor') {
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
							includes : [],
							main : 'https://dev.shusiou.win/app/truefactors/errPage/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'
					},
				data : '',
				parent : me
			})
		} 
		return me.loadContentPage(me.state.menuOption);	
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
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>


			  
			{me.showPageFrame(me.showBody())}
			  
			<div className="copyright_section">&#169; {new Date().getFullYear()} Plato Plan
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="JavaScript:void(0)" onClick={me.changeContentPage.bind(me, 'privacy')}>Privacy</a>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="JavaScript:void(0)" onClick={me.changeContentPage.bind(me, 'terms')}>Terms</a>
			</div>
		</span>
          )
        }
})
