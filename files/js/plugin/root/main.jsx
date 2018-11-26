
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
					   'https://dev.shusiou.win/js/plugin/truefactors/_global.jsx',
					   'https://dev.shusiou.win/js/plugin/truefactors/_asyncModule.jsx',

					   'https://dev.shusiou.win/js/plugin/truefactors/rolesMenu.jsx',
					   'https://dev.shusiou.win/js/plugin/truefactors/secondMenu.jsx',

					   'https://dev.shusiou.win/js/plugin/truefactors/sectionInventors.jsx',
					   'https://dev.shusiou.win/js/plugin/truefactors/sectionInvestors.jsx'
					 ],
					main : 'https://dev.shusiou.win/js/plugin/truefactors/main.jsx',
                         		cacheTime : 1000
				}, 
				master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
		code="sectionInventors" parent={me} />
          )
        }
})
