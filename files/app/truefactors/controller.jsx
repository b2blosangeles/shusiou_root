
React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        render: function() {
        	var me = this;
		__asyncOId = (!__asyncOId || __asyncOId > 1000000) ? 1 : (__asyncOId + 1);
		var _oId = __asyncOId + '-' + new Date().getTime();
		

		
		return  (
		<span>				
			<_asyncModule plugin={{
			extend: {
					contents : {},
					includes : [],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/classOverLay.jsx',
					cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api',
				key : '/classOverLay'
				
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
				master: '//master1_dev.shusiou.win/api/DVCHub.api',
				key : 'root'
				}} 
				parent={me} objId={'B' + _oId} />
							
		</span>
		)
        }
})
