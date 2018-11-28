React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	cellBox : function(v) {
		var _videoBox = Root.commUI.cellBox;
		return <_cellBox data={v} />
	},
	infoBox : function(data, setting) {
		var _infoBox = Root.commUI.infoBox;
		return <_infoBox data={data} setting={setting} />
	},
        render: function() {
          var me = this;
	  var list = Root.lib.getNumberList(10);
          return  (
		<div className="container">
			<div className="row ">
			  {me.infoBox('Test', {type: 'success'})}
			</div>
			<div className="row ">
				{list.map(function(m) {
					return me.cellBox('v' + m)
				})}							
			</div>
		</div>)
        }
})
