var _secondMenu = React.createClass({
    getInitialState: function() {
		        var me = this;
		        me.roles = _global.roles;
          	return {}
    },
    render: function() {
          var me = this;
          return  (
            <div className="bg-secondary container-fluid" style={{'min-height' : '2.5em', color:'#fff'}}>
              <div className="container">
                <div className="float-sm-right pt-2">&#169; {new Date().getFullYear()} Polo Alto Project</div>
              </div>			
            </div>          
          )
	}          
});
