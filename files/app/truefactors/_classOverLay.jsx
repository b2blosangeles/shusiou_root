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
		return (me.state._popup) ? (<span><span className="overlay_popup_cover"></span>   
			<span id={'nnuu'} className="overlay_popup_page">
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
	animationIn : function() {
		// 'puff', 'clip', 'explode', 'fold', 'slide'
		// var Effect_a = ['puff', 'clip', 'fold', 'slide', 'drop'],
		var Effect_a = ['clip', 'fold'],
		    direction_a = ['up', 'down', 'left', 'right'],
		    Effect = Effect_a[Math.floor(Math.random() * Effect_a.length)],
		    direction = direction_a[Math.floor(Math.random() * direction_a.length)];		
		$('.overlay_popup_page').hide().show( Effect,  600 )
	},
	animationOut : function(cbk) {
		// 'puff', 'clip', 'explode', 'fold', 'slide'
		// var Effect_a = ['puff', 'clip', 'fold', 'slide', 'drop'],
		// $('.overlay_popup_page').toggle( Effect,  {direction: direction}, 600 ,
		var Effect_a = ['clip', 'fold'],
		    direction_a = ['up', 'down', 'left', 'right'],
		    Effect = Effect_a[Math.floor(Math.random() * Effect_a.length)],
		    direction = direction_a[Math.floor(Math.random() * direction_a.length)];
		
		$('.overlay_popup_page').toggle( Effect, 600 ,
			function() {
				cbk();
			});
	},
	popup : function(setting) {
		var me = this;
		me.popupSetting = setting;
		me.setState({_popup : true})
		setTimeout(function() { 
			me.animationIn();
		});
	},
	closePopup : function() {
		var me = this;
		me.popupSetting = null;
		me.animationOut(function() {
			me.setState({_popup : false})
		});
	},	
	render: function() {
		var me = this;
		return (<span>
				{me.showSpinner()}
				{me.showPopup()}
			</span>)                   
	}
})