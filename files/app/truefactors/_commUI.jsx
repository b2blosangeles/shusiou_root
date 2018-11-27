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
                        return (
                            <div className="col-sm-12 p-1">
                                <div className="shadow border border-secondary alert-warning rounded p-2 m-4" 
                                    style={{'min-height' : '6em'}}>
                                    {me.props.data}
                                </div>
                            </div>                        
                        )
                    }
                })
};
