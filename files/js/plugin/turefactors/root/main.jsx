
React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        }, 
        render: function() {
          var me = this;
          return  (
		<_asyncModule plugin={{
			extend: {
				  includes : [
					'https://dev.shusiou.win/js/plugin/truefactors/main/_global.jsx',
					  
					'https://dev.shusiou.win/js/plugin/truefactors/main/rolesMenu.jsx',
					'https://dev.shusiou.win/js/plugin/truefactors/main/secondMenu.jsx',

					'https://dev.shusiou.win/js/plugin/truefactors/main/sectionInventors.jsx',
					'https://dev.shusiou.win/js/plugin/truefactors/main/sectionInvestors.jsx'
					 ],
				   loadingInfo : 'Loading ...',
				   main : 'https://dev.shusiou.win/js/plugin/truefactors/main.jsx',
                         	   cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
		code="sectionInventors" root={me} />
          )
        }
})
