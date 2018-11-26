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
  <h1>Vertical Align</h1>
  <p>Change the alignment of elements with the align classes (only works on inline, inline-block, inline-table and table cell elements):</p>
  <span className="align-baseline">baseline</span>
  <span className="align-top">top</span>
  <span className="align-middle">middle</span>
  <span className="align-text-right">bottom</span>
  <span className="align-text-top">text-top</span>
  <span class=Name"align-text-bottom">text-bottom</span>
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
