var _commUI = {
    videoBox : React.createClass({
                    render : function () { 
                        return (
                            <div className="col-sm-3 p-1">
                            <div className="border border-secondary alert-light rounded p-2 m-1" 
                                style={{'min-height' : '8em'}}>
                                {me.props.data}
                            </div>
                            </div>                        
                        )
                    }
                })
};
