React.createClass({
        getInitialState: function() {
		var me = this;
		me.list = [];
		me.compData = new _compData(me, Root);
          	return {}
        },
	componentDidMount : function() {
		var me = this;
		
		if (me.props.parent.state.menuOption === 'myVideos' || !me.props.parent.state.menuOption) {
			me.compData.loadVideos();
			// me.loadData();
		}
	},
	componentWillUnmount : function() {
		var me = this;
	},
	spinAnchor : function() {
		var me = this;
		me.setState({spinAnchor:
			     {A : new Date().getTime()}, updated : new Date().getTime()
			    });
		console.log(me.state.spinAnchor);
	},
	popupBody : function() {
		var me = this;
		return (<span>{Root.commUI.show({
					code: 'popUpFrame', 
					parent : me, 
					data : (<button type="button" className="btn btn-warning" 
							onClick={Root.overLay.closePopup.bind(me)}>Popup Window</button>), 
					setting : {
						type: 'light'
					  }
					})}</span>)	
	},
	myVideos : function() {
		var me = this;
		var btnLoad = (
		<span>	
			<button type="button" className="btn btn-info" onClick={me.compData.loadVideos.bind(me)}>Load Data</button>
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
							data : me.compData.showImage(m), 
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
			return (<span>--<a href="JavaScript:void(0)" onClick={me.spinAnchor.bind(me)}>uuuu</a>--<hr/>
					..{me.state.updated}..
					<hr/>
					<span>
					{Root.lib.spinAnchor('A', '', me)}
					No update AA 
					</span>
				</span>)
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
