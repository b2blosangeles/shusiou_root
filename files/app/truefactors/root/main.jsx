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
	__asyncOId = (!__asyncOId || __asyncOId > 1000000) ? 1 : (__asyncOId + 1);
		var _oId = __asyncOId + '-' + new Date().getTime();
          return  (
		<span>
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>

			<_asyncModule plugin={{
			extend: {
				  includes : [],
				   loadingInfo : '', // 'Loading ...',
				   main : 'https://dev.shusiou.win/app/truefactors/classOverLay.jsx',
				   cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
			parent={me} objId={_oId} />  
			  
			{me.showPageFrame(me.showBody())}
			  
			<div className="footer">&#169; {new Date().getFullYear()} Plato Plan
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="JavaScript:void(0)" onClick={me.changeContentPage.bind(me, 'privacy')}>Privacy</a>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="JavaScript:void(0)" onClick={me.changeContentPage.bind(me, 'terms')}>Terms</a>
			</div>
		</span>
          )
        }
})
