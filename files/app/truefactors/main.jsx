
React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        }, 
        render: function() {
        	var me = this;
		__asyncObjId = (!__asyncObjId || __asyncObjId > 1000000) ? 1 : (__asyncObjId + 1);
		var _objId = __asyncObjId + '-' + new Date().getTime();
		return  (
			<_asyncModule plugin={{
			extend: {
				  includes : [
					'https://dev.shusiou.win/app/truefactors/root/rolesMenu.jsx',
					'https://dev.shusiou.win/app/truefactors/root/submenu.jsx',

					'https://dev.shusiou.win/app/truefactors/root/sectionInventors.jsx',
					'https://dev.shusiou.win/app/truefactors/root/sectionInvestors.jsx'
					 ],
				   loadingInfo : 'Loading ...',
				   main : 'https://dev.shusiou.win/app/truefactors/root/main.jsx',
				   cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
		parent={me} objId={_objId} />
		)
        }
})
