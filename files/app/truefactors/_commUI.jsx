var _commUI = {
    videoBox : React.createClass({
                    render : function () { 
                        var me = this;
                        return (
                            <div className="col-sm-3 p-1">
                            <div className="shadow-sm border border-secondary alert-light p-2 m-1" 
                                style={{'min-height' : '8em'}}>
                                {me.props.data}
                            </div>
                            </div>                        
                        )
                    }
                })
};
