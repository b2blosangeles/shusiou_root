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
                })
};
