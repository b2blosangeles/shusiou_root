var _commUI = {
    videoBox : React.createClass({
                    render : function () { 
                        var me = this;
                        return (
                            <div className="col-sm-3 p-1">
                                <div className="shadow border border-secondary bg-cellBox rounded p-2 m-1" 
                                    style={{'min-height' : '9em'}}>
                                    {me.props.data}
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
                                <div className={className} 
                                    style={style} dangerouslySetInnerHTML={{__html: me.props.data}}>
                                    {/*me.props.data*/}
                                </div>
                            </div>                        
                        )
                    }
                })
};
