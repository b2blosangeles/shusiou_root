React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		if (me.props.data.sk === '1') {
		setInterval(
			function() {
				me.setState({tm:new Date().getTime()})
			}, 3000
		)}
        },		
        componentDidUpdate:function() {
               var me = this;
		console.log('---TA componentDidUpdate---');
        },	
        render: function() {
          var me = this;
		if (me.props.data.sk === '1')
			  return  (
				<span>

					adx {new Date().getTime()} --> {Root.lib.test('adx')} ***> {me.props.data.role} || {me.props.data.v}
					  || {me.props.data.sk}
				</span>
			  )
		else if (me.props.data.sk === '2')
			return  (
				<span>

					solution 2 {me.state.tm}
				</span>
			  )
		else 
			return  (
				<span>

					solution 3
				</span>
			  )			
        }
})
