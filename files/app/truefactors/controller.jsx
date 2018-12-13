
React.createClass({
        getInitialState: function() {
		var me = this;
          	return {authReady : false, overLayReady : false}
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
	getOverLay : function() {
		var me = this;
		var _oId = __asyncOId + '-' + new Date().getTime();
		return (
			<_asyncModule plugin={{
			extend: {
					contents : {},
					includes : [],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/_classOverLay.jsx',
					callback : function() {
						if (!me.state.overLayReady) me.setState({overLayReady:true});
					}
				}, 
				master: '/api/DVCHub.api'
				
			}} 
			parent={me} objId={'A' + _oId} />		
		)
	},	
        render: function() {
        	var me = this;
		var _oId = __asyncOId + '-' + new Date().getTime();
		return  (
		<span>
			{me.getAuth()}
			{me.getOverLay()}
			{(!me.state.authReady || !me.state.overLayReady) ? 'Loading ...' :
			(<_asyncModule plugin={{
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
				parent={me} objId={'B' + _oId} />)}
							
		</span>
		)
        }
})
