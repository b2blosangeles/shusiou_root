React.createClass({
        getInitialState: function() {
		var me = this;
		me.list = [];
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		me.loadData();
	},
	componentWillUnmount : function() {
		var me = this;
	},
	loadData : function() {
		var me = this;
		Root.lib.setSpinner(me, true);
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(10);
				Root.lib.setSpinner(me, false);
				me.setState({updated : new Date().getTime()});
			}, 1000
		)	
	},
	popupBody : function() {
		var me = this;
		return (
			<div className="container">
				<div className="row ">
				  {Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : (<button type="button" className="btn btn-warning" 
								onClick={me.closePopup.bind(me)}>Popup Window</button>), 
						setting : {
							type: 'info',
							style: {'min-height' : '18em'}
						  }
					})}
				</div>
			</div>)
	},
	popup : function() {
		var me = this;
		Root.lib.setPopup(me, true);	
	},
	closePopup : function() {
		var me = this;
		Root.lib.setPopup(me, false);	
	},
	
	myVideos : function() {
		var me = this;
		var btnLoad = (
		<span>	
			<button type="button" className="btn btn-warning" onClick={me.loadData.bind(me)}>Load Data</button>
			&nbsp;
			<button type="button" className="btn btn-warning" onClick={me.popup.bind(me)}>Popup Window</button>
		</span>
		)
		return  (
			<div className="container">
				<div className="row ">
				{Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : btnLoad, 
						setting : {
							type : 'light',
							noshadow : true,
							style : {'min-height' : '40em'},
							class : 'documentPageBody p-3'
						}
					})}
				</div>
				<div className="row ">
					{Root.commUI.show({code: 'spinner', parent: me})}
					{Root.commUI.show({ data: me.popupBody(),code: 'popup', parent: me})}
					
					{me.list.map(function(m) {
						return Root.commUI.show({
							code: 'cellBox', 
							parent : me, 
							data : '<b>v' + m + '</b>', 
							setting : {
								noshadow :true,
								type: 'success'
							}
						});
					})}							
				</div>
			</div>)			
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myVideos') {
			return me.myVideos();
		} else {
			return (<span>No update</span>)
		}	
	},
        render: function() {
		var me = this;
		return (<div className="container">
				<div className="row ">
				  {Root.commUI.show({
						code: 'infoBox', 
						parent : me, 
						data : me.showBody(), 
						setting : {
							type: 'success',
							style: {'min-height' : '28em'}
						  }
					})}
				</div>
			</div>)
        }
})
