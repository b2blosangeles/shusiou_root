React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
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

					solution 2
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
