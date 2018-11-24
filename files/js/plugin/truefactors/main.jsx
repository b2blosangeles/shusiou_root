React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = {};
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		me.init();
        }, 
        init : function(code) {
                var me = this;
		me.roles = _global.roles;
		me.setState({role: ''});
        },
        showBody : function() {
                var me = this;
		switch (me.state.role) {
			case 'inventors' : 
				return (<_sectionInventors/>);
				break;
			case 'investors' :
				return (<_sectionInvestors/>);
				break;
			default : 
				return '';
		}
        }, 
        render: function() {
          var me = this;
          return  (
		<span>
			<div className="container">
				<div className="row"><div className="col-sm-12"></div></div>
			</div>

			<_rolesMenu parent={me}/>
	
			<div className="container">
				<div className="row">
					<div className="jumbotron mt-1">{me.showBody()}</div>
				</div>			  
			</div> 
			<div className="container">
				<div className="row">&#169; {new Date().getFullYear()}</div>
			</div>
		</span>
          )
        }
})
