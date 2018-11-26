React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		if (me.props.data.sk === '2') {
		setInterval(
			function() {
				me.setState({tm:new Date().getTime()})
			}, 3000
		)}
        },		
        componentDidUpdate:function() {
               var me = this;
        },	
        render: function() {
          var me = this;
		if (me.props.data.sk === '1')
			  return  (
				<span>

					adx {new Date().getTime()} --> {Root.lib.test('adx')} ***> {me.props.data.role} || {me.props.data.v}
					  || {me.props.data.sk}
					  <hr/>
					  {me.state.tm}
				</span>
			  )
		else if (me.props.data.sk === '2')
			return  (
				<span>

					solution 2 <hr/>{me.state.tm}
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
