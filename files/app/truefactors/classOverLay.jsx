React.createClass({
	getInitialState: function() {
		var me = this;
		me.popupSetting = '';
		me.spinPool={};
		me.sno = 0;
		return {};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootOverLay = me;
	},
	componentDidUpdate : function() {
		var me = this;
	},
	getSno : function() {
		var me = this;
		me.sno = (!me.sno || me.sno > 1000000) ? 1 : (me.sno + 1);
		return 'SNO-' + me.sno + '-' + new Date().getTime();
	},
	showSpinner : function() {
		var me = this;
		return (Object.keys(me.spinPool).length) ? (<span><span className="overlay_sping_cover"></span>   
			<span className="overlay_sping_page"><span className="spinner"></span></span>
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
	spinOn : function() {
		var me = this;
		var code = me.getSno();
		me.spinPool[code] = new Date().getTime();
		me.setState({_update : new Date().getTime()})
		return code;
	},
	spinOff : function(code) {
		var me = this;
		delete me.spinPool[code];
		me.setState({_update : new Date().getTime()})
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
		return ((typeof Root === 'undefined' ) ? (<span>No ROOT--{me.state.RootReady}</span>):
			(<span>
				{me.showSpinner()}
				{me.showPopup()}
			</span>)                   
		)}
})

