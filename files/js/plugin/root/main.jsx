
React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        }, 
        render: function() {
          var me = this;
          return  (
		<_asyncModule plugin={{extend: {
			includes : [],
			main : 'https://dev.shusiou.win/js/plugin/adbox/main.jsx'
		}, 
		master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
		code="upload_video" parent={me} />
          )
        }
})
