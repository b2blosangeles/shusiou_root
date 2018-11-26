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
				<div className="row border border-primary rounded-top p-2" 
					style={{'min-height' : '10em'}}>
					{me.showBody()}
				</div>			  
			</div> 
<div className="container">
<div className="float-sm-right">Float right on small screens or wider</div><br>
<div className="float-md-right">Float right on medium screens or wider</div><br>
<div className="float-lg-right">Float right on large screens or wider</div><br>
<div className="float-xl-right">Float right on extra large screens or wider</div><br>
<div className="float-none">Float none</div>
</div>
			  
			<div className="container">

					<p className="pull-right">
					Copyright &#169; {new Date().getFullYear()}
					</p>
			</div>
		</span>
          )
        }
})
