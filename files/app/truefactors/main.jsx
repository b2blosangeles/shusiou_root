
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
		<span><_overLay/><hr/>
			<_asyncModule plugin={{
			extend: {
				  includes : [
					'https://dev.shusiou.win/app/truefactors/root/rolesMenu.jsx',
					'https://dev.shusiou.win/app/truefactors/root/submenu.jsx'
					 ],
				   loadingInfo : '', // 'Loading ...',
				   main : 'https://dev.shusiou.win/app/truefactors/root/main.jsx',
				   cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
				parent={me} objId={_oId} />
		</span>
		)
        }
})
