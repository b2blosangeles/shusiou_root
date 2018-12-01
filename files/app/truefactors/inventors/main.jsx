React.createClass({
        getInitialState: function() {
		var me = this;
		me.list = [];
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		console.log(_load);
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			me.loadData();
		}
	},
	componentWillUnmount : function() {
		var me = this;
	},
	loadData : function() {
		var me = this;
		var spin_id = Root.overLay.spinOn();
		me.list = [];
		me.setState({updated : new Date().getTime()});
		setTimeout(
			function() {
				me.list = Root.lib.getNumberList(18);
				Root.overLay.spinOff(spin_id);
				console.log(spin_id);
				me.setState({updated : new Date().getTime()});
			},1000
		)	
	},
	popupBody : function() {
		var me = this;
		return (<span>{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : (<button type="button" className="btn btn-warning" 
							onClick={Root.overLay.closePopup.bind(me)}>Popup Window</button>), 
					setting : {
						type: 'light',
						rounded : true,
						style: {'min-height' : '18em'}
						
					  }
					})}</span>)	
	},
	myVideos : function() {
		var me = this;
		var btnLoad = (
		<span>	
			<button type="button" className="btn btn-info" onClick={me.loadData.bind(me)}>Load Data</button>
			&nbsp;
			<button type="button" className="btn btn-info" onClick={Root.overLay.popup.bind(me, me.popupBody())}>Popup Window</button>
		</span>
		)
		
		return  (
			<div className="container">
				<div className="row ">
					<div className="col-sm-12 p-1">	
					{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : btnLoad, 
							setting : {
								class : ' alert-secondary text-right ',
								noshadow :  true,
								rounded : true,
								style : {'min-height' : '2em'}
							}
						})}
					</div>
				</div>
				<div className="row mt-2">				
					{me.list.map(function(m) {
					return (<div className="col-sm-3 p-1">
						{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : '<b>v' + m + '</b>', 
							setting : {
								noshadow :false,
								type: 'light',
								style : {'min-height' : '9em'}
							}
						})}
						</div>)
					})}							
				</div>
			</div>)			
	},
	showBody : function() {
		var me = this;
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			return me.myVideos();
		} else {
			return (<span>No update</span>)
		}	
	},
        render: function() {
		var me = this;
		return (<span>{Root.commUI.show({
					code: 'infoBox', 
					parent : me, 
					data : me.showBody(), 
					setting : {
						type : 'light',
						noshadow : true,
						style : {'min-height' : '40em'},
						class : 'documentPageBody p-3'
					  }
				})}
			</span>)
        }
})
