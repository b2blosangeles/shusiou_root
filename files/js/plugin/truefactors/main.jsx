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
			<_secondMenu parent={me}/>
			  
			<div className="container">
				<div className="row border border-secondary rounded-bottom p-2 mt-1" 
					style={{'min-height' : '36em'}}>
					{me.showBody()}
				</div>			  
			</div>

			<div className="container">
				<div className="row border border-secondary alert-success rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					{me.showBody()}
				</div>			  
			</div>
			  
			{/*<div className="container">
				<div className="float-sm-right">Copyright &#169; {new Date().getFullYear()}</div>
			</div>*/}
			<_asyncModule plugin={
						includes : ['/files/js/module/addSharedVideo/test.jsx'],
						main : '/files/js/module/addSharedVideo/main.jsx'
					}, 
					master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
					code="upload_video" parent={me} />
		</span>
          )
        }
})
