React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        }, 
        render: function() {
          var me = this;
          return  (
		<span>
			adx {new Date().getTime()} --> {Root.test()}
		</span>
          )
        }
})
