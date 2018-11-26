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
			<span>  
			<_rolesMenu parent={me}/>
			<div className="bg-secondary container-fluid" style={{'min-height' : '3em'}}></div>
			<span/>  
			<div className="container">
				<div className="row border border-secondary rounded-bottom p-2 mt-2" 
					style={{'min-height' : '20em'}}>
					{me.showBody()}
				</div>			  
			</div> 
			<div className="container">
				<div className="float-sm-right">Copyright &#169; {new Date().getFullYear()}</div>
			</div>
		</span>
          )
        }
})
