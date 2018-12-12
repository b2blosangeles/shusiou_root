React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	getInitialState: function() {
		var me = this;
		return {_auth :  localStorage.getItem('_auth'), info:'how are you'};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootAuth = me;
	},
	componentDidUpdate : function(prevProps, prevState) {
		var me = this;
		if (prevState._auth !== me.state._auth) {
			location.reload();
		}
	},
	signIn : function(Root) {
		var me = this;
		var popupSetting = {
			type : 'light', 
			// style : {'min-height' : '12em', 'border' : '3px solid #666 !important'},
			closeIcon : true,
			data : (<span>
				<button type="button" className="btn btn-warning"  
					onClick={Root.overLay.closePopup.bind(me)}>close Popup Window</button>
				</span>)
		};
		Root.overLay.popup(popupSetting);		
	},	
	doAuth : function() {
		var me = this;
		var v = (me.state._auth) ? '' : new Date().getTime();
		localStorage.setItem('_auth', v);
		me.setState({_auth : v});
	},	
	render: function() {
		var me = this;
		return (<span></span>)                   
	}
})
