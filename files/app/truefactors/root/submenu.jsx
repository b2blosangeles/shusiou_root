var _subMenu = React.createClass({
    getInitialState: function() {
	var me = this;
	me.roles = Root.global.roles;
	
	return {}
    },
    clickOption : function(v) {
	var me = this; 
	if (!v) {
		me.props.parent.setState({ role : null, menuOption : null})
	} else {
		me.props.parent.setState({ menuOption : v})   
	}
    },
    render: function() {
          var me = this;
	  var menu = (!me.props.parent.state.role) ? [] : Root.global.menuTree[me.props.parent.state.role];
	  var common = (me.props.parent.state.role) ? [] : Root.global.menuTree.common;
          return  (
            <div className="secondMenu container-fluid" style={{'height' : '2.5em', color:'#fff'}}>
		<div className="container">
			<div className="row">
				<div className="col-sm-12 text-left site-logo pt-0">
					<ul className="nav">
					{(me.props.parent.state.menuOption !== '') ?
						(<span>
						<li className="nav-item">
							<a className="nav-link active" 
								onClick={me.clickOption.bind(me, '')}
								href="JavaScript: void(0)">Home</a>
						</li></span>)
						:
						(<span>
							<li className="nav-item">
								<a className="nav-link disabled" 
								href="JavaScript: void(0)">
								<span style={{color:'yellow'}}>
									Home</span></a>
							</li></span>)}
						
					{menu.map(function(m){ 	
						return (me.props.parent.state.menuOption !== m.code) ?
								(<span>
									<li className="nav-item">
										<a className="nav-link active" 
											onClick={me.clickOption.bind(me, m.code)}
											href="JavaScript: void(0)">{m.caption}</a>
									</li></span>)
								:
								(<span>
									<li className="nav-item">
										<a className="nav-link disabled" 
										href="JavaScript: void(0)">
										<span style={{color:'yellow'}}>
											{m.caption}</span></a>
									</li></span>)
							})}
					
					{common.map(function(m){ 	
						return (me.props.parent.state.menuOption !== m.code) ?
								(<span>
									<li className="nav-item">
										<a className="nav-link active" 
											onClick={me.clickOption.bind(me, m.code)}
											href="JavaScript: void(0)">{m.caption}</a>
									</li></span>)
								:
								(<span>
									<li className="nav-item">
										<a className="nav-link disabled" 
										href="JavaScript: void(0)">
										<span style={{color:'yellow'}}>
											{m.caption}</span></a>
									</li></span>)
							})}
					</ul>					
				</div>
			</div>
		</div>
            </div>          
          )
	}          
});
