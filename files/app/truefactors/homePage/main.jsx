eact.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
	videoBox : function(v) {
		var _videoBox = Root.commUI.videoBox;
		return <_videoBox data={v} />
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
			  {me.infoBox('Test', {type: 'info'})}
			</div>
		</div>)
        }
})
