
React.createClass({
        getInitialState: function() {
		var me = this;
		localStorage.clear();

          	return {}
        },
        render: function() {
        	var me = this;
		__asyncOId = (!__asyncOId || __asyncOId > 1000000) ? 1 : (__asyncOId + 1);
		var _oId = __asyncOId + '-' + new Date().getTime();
		

		
		return  (
		<span>				
				{/*<_asyncModule plugin={{
			extend: {
					contents : {},
					includes : [],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/classOverLay.jsx',
					cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'}} 
			parent={me} objId={'A' + _oId} />
				
			<_asyncModule plugin={{
			extend: {
					contents : {},   
					includes : [
						'https://dev.shusiou.win/app/truefactors/root/rolesMenu.jsx',
						'https://dev.shusiou.win/app/truefactors/root/submenu.jsx'
					 ],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/root/controller.jsx',
					cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'}} 
				parent={me} objId={'B' + _oId} />*/}
					
			<_asyncModule plugin={{
			extend: {
					contents : {},
					includes : [],
					loadingInfo : '', // 'Loading ...',
					controller : 'https://dev.shusiou.win/app/truefactors/routerController.jsx',
					cacheTime : 10
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api?tm=' + new Date().getTime()}} 
			parent={me} objId={'C' + _oId} />				
		</span>
		)
        }
})
