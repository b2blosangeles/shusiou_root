React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	infoBox : function(data, setting) {
		var _infoBox = Root.commUI.infoBox;
		return <_infoBox data={data} setting={setting} />
	},
        render: function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row ">
			  {me.infoBox('Home <br> Page', 
				{
					type: 'success', 
					style: {'min-height' : '36em'}
				})
			}
			</div>
		</div>)
        }
})
