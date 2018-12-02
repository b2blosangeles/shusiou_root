React.createClass({
	getInitialState: function() {
		var me = this;
		me.popupSetting = '';
		me.spinPool={};
		me.sno = 0;
		return {_spinStatus : false};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootOverLay = me;
		setInterval(me.scanSpin, 500);
	},
	componentDidUpdate : function() {
		var me = this;
	},
	getSno : function() {
		var me = this;
		me.sno = (!me.sno || me.sno > 1000000) ? 1 : (me.sno + 1);
		return 'SNO-' + me.sno + '-' + new Date().getTime();
	},
	scanSpin : function() {
		var me = this, tm = new Date().getTime();
		for (var v in me.spinPool) {
			if ((tm - me.spinPool[v].end) > 0) {
				delete me.spinPool[v];
			}
		}
		for (var v in me.spinPool) {
			if ((tm - me.spinPool[v].start) > 0) {
				me.setState({_spinStatus: true});
				return true;
			}
		}
		if (me.state._spinStatus !== false) me.setState({_spinStatus : false});
	},
	showSpinner : function() {
		var me = this;
		return (me.state._spinStatus) ? (<span><span className="overlay_spin_cover"></span>   
			<span className="overlay_spin_page"><span className="spinner"></span></span>
		    </span>) : (<span></span>)
	},
	showPopup : function() {
		var me = this;
		var v = me.popupSetting;
		return (me.state._popup) ? (<span><span className="overlay_popup_cover"></span>   
			<span className="overlay_popup_page">
				<div className="container">
				<div className="row ">
						<div className="col-sm-12">
						{(typeof v === 'string') ? 
						(<span dangerouslySetInnerHTML={{__html: v}}/>)
						: v}
						</div>
				</div>
				</div>				
			</span>
			</span>) : (<span></span>)
	},
	spinOn : function(setting) {
		var me = this, tm = new Date().getTime();
		if (!setting) var setting = {};
		var code = me.getSno();
		var s = tm + ((setting.delay) ?  setting.delay : 0)
		var e = s + ((setting.max) ?  setting.max : (600 * 1000))
		me.spinPool[code] = {start : s, end : e};
		// console.log(me.spinPool);
		return code;
	},
	spinOff : function(code) {
		var me = this;
		delete me.spinPool[code];
	},		
	popup : function(setting) {
		var me = this;
		me.popupSetting = setting;
		me.setState({_popup : true})
	},
	closePopup : function() {
		var me = this;
		me.popupSetting = null;
		me.setState({_popup : false})
	},	
	render: function() {
		var me = this;
		return (<span>
				{me.showSpinner()}
				{me.showPopup()}
			</span>)                   
	}
})
