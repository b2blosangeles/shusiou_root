var rolesMenu = React.createClass({
    /*
    getInitialState: function() {
		var me = this;
		me.roles = {};
          	return {}
    },
    */
    pickMenu : function(code) {
            var parent = this.prop.parent;
            parent.setState({role: code});
    },
    render: function() {
          var me = this;
          return  (
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                              <button className="btn btn-success btn-large" 
                                onClick={me.pickMenu.bind(me, 'inventors')}>
                                {me.roles.inventors}</button>
                            </div>
                            <div className="col-sm-8"></div>
                            <div className="col-sm-2">
                              <button className="btn btn-success btn-large pull-right" 
                                onClick={me.pickMenu.bind(me, 'investors')}>
                                {me.roles.investors}</button>
                            </div>
                         </div>	  
                    </div>          
          )
	}          
});
