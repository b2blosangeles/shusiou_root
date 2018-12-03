var _commUI = {
	show : function(cfg) {
		var me = this, _CommUI = me[cfg.code];
		return (!_CommUI) ? (<span>No cfg.code</span>) : <_CommUI data={cfg.data} setting={cfg.setting} parent={cfg.parent} /> 
	},
	infoBox : React.createClass({
		    render : function () { 
			var me = this;
			var classType = (!me.props.setting || !me.props.setting.type) ? 'info' : me.props.setting.type;
			var shadow = (!me.props.setting || !me.props.setting.noshadow) ? ' shadow ' : '';
			var className = shadow + 
				   ((!me.props.setting || !me.props.setting.class) ? 
				    ('border border-' + classType + ' alert-' + classType) : me.props.setting.class + ' ') +
				    ((!me.props.setting || !me.props.setting.rounded) ? '' : ' rounded') +
				    ' p-2 m-1';
			var style = (!me.props.setting || !me.props.setting.style) ? {'min-height' : '2em'} : me.props.setting.style;
			return (
				<div className={className} style={style} >
				    {(typeof me.props.data === 'string' && me.props.data !== '') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
				    : me.props.data}
				</div>                     
			)
		    }
		}),	
	pageFrame :  React.createClass({
		render : function () {
			var me = this;
			return (<div className="container">
				<div className="row documentPageFrame mt-3 mb-5 p-1">
					<div className="col-sm-12 p-1">
					    {(typeof me.props.data === 'string') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
					    : me.props.data}						
					</div>
				</div>
			</div>)}
		}),
	popUpFrame :  React.createClass({
		render :  function() {
			var me = this;
				
			var classType = (!me.props.setting || !me.props.setting.type) ? 'light' : me.props.setting.type;
			var className = ' shadow rounded border ' + 
				   ((!me.props.setting || !me.props.setting.class) ? 
				    (' border-secondary alert-' + classType) : me.props.setting.class + ' ') +
				    ' p-2';
			var style = (!me.props.setting || !me.props.setting.style) ? {'min-height' : '28em'} : me.props.setting.style;
			return (
				<div className={className} style={style} >
					<button type="button" className="btn btn-danger" 
							onClick={me.props.parent.closePopup.bind(me)}>Popup Window</button>
				    {(typeof me.props.data === 'string' && me.props.data !== '') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
				    : me.props.data}
				</div>)}                     	
		})
	
};
