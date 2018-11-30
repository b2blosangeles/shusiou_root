React.createClass({
	getInitialState: function() {
		var me = this;
		me.loading = [];

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
	spinner : function() {
		var me = this;
		return (me.state._spinner) ? (<span><span className="overlay_sping_cover"></span>   
			<span className="overlay_sping_page"><span className="spinner"></span></span>
		    </span>) : (<span></span>)
	},
	popup : function() {
		var me = this;
		return (me.state._popup) ? (<span><span className="overlay_popup_cover"></span>   
			<span className="overlay_popup_page">
				<div className="container">
				<div className="row ">
						<div className="col-sm-12 rounded border border-dark">
						{(typeof me.props.data === 'string' || me.props.data === '') ? 
						(<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
						: me.props.data}
						</div>
				</div>
				</div>				
			</span>
			</span>) : (<span></span>)
	},	
	test : function() {
		var me = this;
		me.setState({_popup : true})
	},
	render: function() {
		var me = this;
		return ((typeof Root === 'undefined' ) ? (<span>No ROOT--{me.state.RootReady}</span>):
			(<span>
				{me.spinner()}
				{/*Root.commUI.show({code: 'spinner', parent: me})*/}
				{Root.commUI.show({code: 'popup',  data: 'me.popupBody()', parent: me})}
			</span>)                   
		)}
})

