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
					{Object.keys(me.roles).map(function(idx){
					  return <li key={idx}>{idx}={me.roles[Object.keys(me.roles)[idx]]}</li>
					  	<button className="btn btn-success btn-large" 
						onClick={me.pickMenu.bind(me, Object.keys(me.roles)[idx])}>
						  {me.roles[Object.keys(me.roles)[idx]]}</button>
					})}

					<button className="btn btn-success btn-large" 
					onClick={me.pickMenu.bind(me, 'inventors')}>
					{me.roles.inventors}</button>

					<button className="btn btn-success btn-large" 
					onClick={me.pickMenu.bind(me, 'investors')}>
					{me.roles.investors}</button>
				</div>
                         </div>	  
                    </div>          
          )
	}          
});
