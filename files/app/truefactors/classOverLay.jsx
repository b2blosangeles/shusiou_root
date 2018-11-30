React.createClass({
	getInitialState: function() {
		var me = this;
		me.popupSetting = '';

		return {};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootOverLay = me;
	//	Root.overlay = me;
		console.log('componentDidMount--26->');
	},
	componentDidUpdate : function() {
		var me = this;
		console.log('componentDidUpdate--->');
	},
	showSpinner : function() {
		var me = this;
		return (me.state._spinner) ? (<span><span className="overlay_sping_cover"></span>   
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
	spin : function(s) {
		var me = this;
		me.setState({_spinner : (s) ? true : false})
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

