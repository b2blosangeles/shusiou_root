var _commUI = {
    show : function(cfg) {
        var me = this, _CommUI = me[cfg.code];
	return (!_CommUI) ? (<span>No cfg.code</span>) : <_CommUI data={cfg.data} setting={cfg.setting} parent={cfg.parent} /> 
    },
    cellBox : React.createClass({
                    render : function () { 
                        var me = this;
                        var classType = (!me.props.setting || !me.props.setting.type) ? 'info' : me.props.setting.type;
                        var shadow = (!me.props.setting || !me.props.setting.noshadow) ? ' shadow ' : '';
                        var className = shadow + 
                                    'border border-' + classType + ' alert-' + classType + ' ' +
                                    'rounded p-2 m-1';
			var style = (!me.props.setting || !me.props.setting.style) ? {'min-height' : '9em'} : me.props.setting.style;
                        return (
                            <div className="col-sm-3 p-1">
                                <div className={className} style={style} >
                                     {(typeof me.props.data === 'string') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
                                    : me.props.data}
                                </div>
                            </div>                        
                        )
                    }
                }),
      infoBox : React.createClass({
                    render : function () { 
                        var me = this;
                        var classType = (!me.props.setting || !me.props.setting.type) ? 'info' : me.props.setting.type;
                        var shadow = (!me.props.setting || !me.props.setting.noshadow) ? ' shadow ' : '';
                        var className = shadow + 
                                    'border border-' + classType + ' alert-' + classType + ' ' +
                                    'rounded p-2 m-1';
                        var style = (!me.props.setting || !me.props.setting.style) ? {'min-height' : '2em'} : me.props.setting.style;
                        return (
                            <div className="col-sm-12 p-1">
                                <div className={className} style={style} >
                                    {(typeof me.props.data === 'string') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
                                    : me.props.data}
                                </div>
                            </div>                        
                        )
                    }
                }),
      documentPage : React.createClass({
                    render : function () { 
                        var me = this;
                        var classType = (!me.props.setting || !me.props.setting.type) ? 'info' : me.props.setting.type;
                        var shadow = (!me.props.setting || !me.props.setting.noshadow) ? ' shadow ' : '';
                        var className = shadow + 
                                   ((!me.props.setting || !me.props.setting.class) ? 
				    ('border border-' + classType + ' alert-' + classType + ' ') : me.props.setting.class) + ' ' +
			    	    ((!me.props.setting || !me.props.setting.rounded) ? '' : ' rounded') +
                                    ' p-2 m-1';
                        var style = (!me.props.setting || !me.props.setting.style) ? {'min-height' : '2em'} : me.props.setting.style;
                        return (
                            <div className="col-sm-12 p-1">
                                <div className={className} style={style} >
                                    {(typeof me.props.data === 'string') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
                                    : me.props.data}
                                </div>
                            </div>                        
                        )
                    }
                }),	
	spinner : React.createClass({
                    render : function () { 
                        var me = this;
                        return (me.props.parent.state._spinner) ? (<span><span className="overlay_sping_cover"></span>   
    				<span className="overlay_sping_page"><span className="spinner"></span></span>
                            </span>) : (<span></span>)
                    }
                }),
	popup : React.createClass({
                    render : function () { 
                        var me = this;
                        return (me.props.parent.state._popup) ? (<span><span className="overlay_popup_cover"></span>   
    				<span className="overlay_popup_page">
				{(typeof me.props.data === 'string') ? (<span dangerouslySetInnerHTML={{__html: me.props.data}}/>)
                                    : me.props.data}
				</span>
                            	</span>) : (<span></span>)
                    }
                })	
};
