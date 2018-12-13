
React.createClass({
        getInitialState: function() {
		var me = this;
		__asyncOId = (!__asyncOId || __asyncOId > 1000000) ? 1 : (__asyncOId + 1);
          	return {authReady : false}
        },
	getAuth : function() {
		var me = this;
		var _oId = __asyncOId + '-' + new Date().getTime();
		return (
			<_asyncModule plugin={{
			extend: {
					contents : {},
					includes : [],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/_classAuth.jsx',
					cacheTime : 1000,
					callback : function() {
						if (!me.state.authReady) me.setState({authReady:true});
					}
				}, 
				master: '/api/DVCHub.api'
				
			}} 
			parent={me} objId={'Auth' + _oId} />		
		)
	},
        render: function() {
        	var me = this;
		
		var _oId = __asyncOId + '-' + new Date().getTime();
		return  (
		<span>
			{me.getAuth()}
			{(!me.state.loadAuth) ?	'Loading ...' :
			(<span><_asyncModule plugin={{
			extend: {
					contents : {},
					includes : [],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/_classOverLay.jsx'
				}, 
				master: '/api/DVCHub.api'
				
			}} 
			parent={me} objId={'A' + _oId} />
				
			<_asyncModule plugin={{
				extend: {
					contents : {},   
					includes : [
						'https://dev.shusiou.win/app/truefactors/root/compModule.jsx',
						'https://dev.shusiou.win/app/truefactors/_routerController.jsx',
						'https://dev.shusiou.win/app/truefactors/root/copyrightSection.jsx',
						'https://dev.shusiou.win/app/truefactors/root/rolesMenu.jsx',
						'https://dev.shusiou.win/app/truefactors/root/submenu.jsx'
					 ],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/root/controller.jsx',
					cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'
				}} 
				parent={me} objId={'B' + _oId} /></span>)}
							
		</span>
		)
        }
})
