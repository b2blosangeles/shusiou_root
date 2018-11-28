React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	videoBox : function(v) {
		var _videoBox = Root.commUI.videoBox;
		return <_videoBox data={v} />
	},
        render: function() {
          var me = this;
	  var list = Root.lib.getNumberList(10);
          return  (
		<div className="container">
			<div className="row ">
				{list.map(function(m) {
					return me.videoBox('v' + m)
				})}							
			</div>
		</div>)
        }
})
