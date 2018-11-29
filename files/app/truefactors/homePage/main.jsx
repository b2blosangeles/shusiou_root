React.createClass({
        getInitialState: function() {
		var me = this;
          	return {}
        },
        render: function() {
          var me = this;
          return  (
		<div className="container">
			<div className="row">
			{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : (<span><span className="overlay_cover"></span>
							<span className="overlay_loading"><span className="spinner"></span></span>
							Home <hr/> a Page</span>), 
					setting : {
						type: 'success',
						style: {'min-height' : '28em'}
						  }
				})}
			</div>
		</div>)
        }
})
