React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        }, 
        render: function() {
          var me = this;
          return  (
		<span>
			infopad {new Date().getTime()} --> {Root.lib.test('salesForce')}
		</span>
          )
        }
})
