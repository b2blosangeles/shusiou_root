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
		if (!me.state.role) return (<span/>);
		else {
			switch (me.state.role) {
				case 'inventor' :  return (<_sectionInventors/>);
				case 'investor' : return (<_sectionInvestors/>);
				default :
					return 'Error: undefined section <' + me.state.role + '/>';
			}
		}
        }, 
        render: function() {
          var me = this;
          return  (
		<span>
			<_rolesMenu parent={me}/>
	
			<div className="container">
				<div className="row border border-primary">
					<div className="border border-primary">
						Test
					</div>
					<div className="jumbotron mt-1 border-success" style={{'background-color':'#ffffff'}}>
						{me.showBody()}
					</div>
				</div>			  
			</div> 
			<div className="container">
				<div className="row text-right" style={{'padding-right':'1em'}}>
					Copyright &#169; {new Date().getFullYear()}
				</div>
			</div>
		</span>
          )
        }
})
