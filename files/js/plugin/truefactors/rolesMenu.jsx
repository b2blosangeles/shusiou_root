var _rolesMenu = React.createClass({
    getInitialState: function() {
		var me = this;
		me.roles = _global.roles;
          	return {}
    },
    pickMenu : function(code) {
            var parent = this.props.parent;
            parent.setState({role: code});
    },
    render: function() {
          var me = this;
          return  (
                    <div className="container">
                        <div className="row">
				<div className="col-sm-12 text-right">
					<h3 className="pull-left">Polo Alto Project</h3>
					{Object.keys(me.roles).map(function(idx){
					  return <button className="btn btn-success btn-large" 
						onClick={me.pickMenu.bind(me, idx)}>
						{me.roles[idx]}</button>
					})}
				</div>
                         </div>	  
                    </div>          
          )
	}          
});
