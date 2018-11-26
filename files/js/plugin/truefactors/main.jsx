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
	asyncModule : function(v) {
		var me = this;
		return <_asyncModule plugin={{extend: {
							includes : [],
							main : 'https://dev.shusiou.win/js/plugin/adbox/main.jsx'
						}, 
						master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
					info={v}
					parent={me} />
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
			{/*<_secondMenu parent={me}/>*/}
			<div className="container">
				<div className="row border border-secondary alert-info rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					{me.asyncModule('123')}
				</div>			  
			</div>
			  
			<div className="container">
				<div className="row border border-secondary alert-success rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					{me.asyncModule('456')}
				</div>			  
			</div>
			<div className="container">
				<div className="row border border-secondary alert-warning rounded-bottom p-2 mt-1" 
					style={{'min-height' : '6em'}}>
					<_asyncModule plugin={{extend: {
								includes : [],
								main : 'https://dev.shusiou.win/js/plugin/salesForce/main.jsx'
							}, 
							master: '//master1_dev.shusiou.win/api/JSXhub.api'}} 
							code="upload_video" parent={me} />
				</div>			  
			</div>			  
			  
			{/*<div className="container">
				<div className="row border border-secondary rounded-bottom p-2 mt-1" 
					style={{'min-height' : '36em'}}>
					{me.showBody()}
				</div>			  
			</div>*/}

			  
			{/*<div className="container">
				<div className="float-sm-right">Copyright &#169; {new Date().getFullYear()}</div>
			</div>*/}

		</span>
          )
        }
})
