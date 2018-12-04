React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
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
		clearInterval(me.watchItv);
		delete me.watchItv;
		
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
		
		var classType = (!v || !v.type) ? 'light' : v.type;
		var className = ((!v || !v.class) ? 
			    (' shadow rounded border border-secondary alert-' + classType) : v.class + ' ') +
			    ' p-2';
		var style = (!v || !v.style) ? {'min-height' : '28em'} : v.style;
		var closeIcon = (!v || !v.closeIcon) ? (<span/>) : (<button type="button" 
				className="close pull-right" onClick={me.closePopup.bind(me)}>
							  <span>&times;</span>
							</button>);
		if (me.state._popup) {

		}
		me.ppp =  (me.state._popup) ? (<span><span className="overlay_popup_cover"></span>   
			<span id={'nnuu'} className="overlay_popup_page" style={{display:'none'}}>
				<div className="container">
				<div className="row ">
					<div className="col-sm-12">
						<div className={className} style={style}>{closeIcon}
						{(typeof v.data === 'string') ? 
						(<span dangerouslySetInnerHTML={{__html: v.data}}/>)
						: v.data}
						</div>
					</div>
				</div>
				</div>				
			</span>
			</span>) : (<span></span>)
		return me.ppp;
	},
	spinOn : function(setting) {
		var me = this, tm = new Date().getTime();
		if (!setting) var setting = {};
		var code = me.getSno();
		var s = tm + ((setting.delay) ?  setting.delay : 0)
		var e = s + ((setting.max) ?  setting.max : (600 * 1000))
		me.spinPool[code] = {start : s, end : e};

		if (!me.watchItv) {
			me.scanSpin();
			me.watchItv = setInterval(me.scanSpin,100); 
		}
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
		$('.overlay_popup_page').hide();
		setTimeout(function() {
			$(me.ppp).slideDown(1000);
			// $('.overlay_popup_page').slideDown(600 );
		});
	},
	closePopup : function() {
		var me = this;
		me.popupSetting = null;
	
		//setTimeout(function() {
			$(me.ppp).slideUp(1000, function() {
				me.setState({_popup : false})
			});
		//});
		
	},	
	render: function() {
		var me = this;
		return (<span>
				{me.showSpinner()}
				{me.showPopup()}
			</span>)                   
	}
})
