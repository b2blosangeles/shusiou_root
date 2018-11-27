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
                        var classType = (!me.props.class || !me.props.class.type) ? 'info' : me.props.class.type;
                        var class = (me.props.class.type) ?
                                    'border ' +
                                    'border-' + classType + ' alert-' + classType + ' ' +
                                    'rounded p-2 m-1 mx-3';
                        return (
                            <div className="col-sm-12 p-1">
                                <div className={class} 
                                    style={{'min-height' : '2em'}}>
                                    {me.props.data}
                                </div>
                            </div>                        
                        )
                    }
                })
};
