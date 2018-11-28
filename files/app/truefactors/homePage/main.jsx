React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	infoBox : function(data, classCFG) {
		var _infoBox = Root.commUI.infoBox;
		return <_infoBox data={data} class={classCFG} />
	},
        render: function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row ">
			  {me.infoBox('Home Page', {type: 'success'})}
			</div>
		</div>)
        }
})
