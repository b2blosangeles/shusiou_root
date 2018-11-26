React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		console.log('---componentDidMount---');
		console.log(me.props);
        }, 
        componentDidUpdate:function() {
               var me = this;
		console.log('---componentDidUpdate---');
        }, 	
        render: function() {
          var me = this;
          return  (
		<span>
			adx {new Date().getTime()} --> {Root.lib.test('adx')} ***> {me.props.info}
		</span>
          )
        }
})
