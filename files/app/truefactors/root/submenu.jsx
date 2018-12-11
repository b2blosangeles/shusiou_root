var _subMenu = React.createClass({
    getInitialState: function() {
	var me = this;
	me.roles = Root.global.roles; 
	return {_auth : localStorage.getItem('_auth')}
    },
    clickOption : function(v, e) {
	var me = this; 
	if ((e) && e.target) {
		Root.commUI.animation.transfer($(e.target));
	}
	if (!v) {
		me.props.parent.setState({menuOption : null})
	} else {
		me.props.parent.setState({ menuOption : v})   
	}
    },
    render: function() {
          var me = this;
	  var menu = (!me.props.parent.state.role) ? [] : (!Root.global.menuTree[me.props.parent.state.role]) 
	  	? [] : Root.global.menuTree[me.props.parent.state.role];
	  var captions = Root.global.menuItems
	  
	  var publicMenu = (!menu.length) ? Root.global.menuTree._publicMenu : [];  
	    
          return  (
            <div className="secondMenu container-fluid" style={{'height' : '2.5em', color:'#fff'}}>
		<div className="container">
			<div className="row">
				<div className="col-sm-12 text-left site-logo pt-0">
					<ul className="nav">						
					{menu.map(function(m){ 	
						return (me.props.parent.state.menuOption !== m) ?
								(<span>
									<li className="nav-item">
										<a className="nav-link active" 
										onClick={me.clickOption.bind(me, m)}
										href={'#'+me.props.parent.state.role}>{captions[m]}</a>
									</li></span>)
								:
								(<span>
									<li className="nav-item">
										<a className="nav-link disabled" 
										href="JavaScript: void(0)">
										<span style={{color:'yellow'}}>
											{captions[m]}</span></a>
									</li></span>)
							})}
						
					{publicMenu.map(function(m){ 	
						return (me.props.parent.state.menuOption !== m) ?
								(<span>
									<li className="nav-item">
										<a className="nav-link active" 
										onClick={me.clickOption.bind(me, m)}
										href="JavaScript: void(0)">{captions[m]}</a>
									</li></span>)
								:
								(<span>
									<li className="nav-item">
										<a className="nav-link disabled" 
										href="JavaScript: void(0)">
										<span style={{color:'yellow'}}>
											{captions[m]}</span></a>
									</li></span>)
							})}
						<div>=bbb=</divn>
						
					</ul>	
					<span>==
					{(!me.state._auth) ? (<div className="form-inline">
						<a className="nav-link" 
							onClick={Root.auth.doAuth.bind(me)}
						href="JavaScript: void(0)">Login</a>
						</div>)
						:
						(<div className="form-inline pull-right">
						<span>({Root.auth.state.info})
						<a className="nav-link" 
							onClick={Root.auth.doAuth.bind(me)}
						href="JavaScript: void(0)">Logoff</a></span>
						</div>)

						}
					</span>
				</div>
			</div>
		</div>
            </div>          
          )
	}          
});
