var _Menu = React.createClass({
    getInitialState: function() {
	var me = this;
	me.roles = Root.global.roles;
	
	return {}
    },
    render: function() {
          var me = this;
	  var menu = (!me.props.parent.state.role) ? [] : Root.global.menuTree[me.props.parent.state.role];
          return  (
            <div className="secondMenu container-fluid" style={{'height' : '2.5em', color:'#fff'}}>
		<div className="container">
			<div className="row">
				<div className="col-sm-12 text-left site-logo pt-0">
					<ul className="nav">
					{menu.map(function(m){ return(<span>
						<li className="nav-item">
							<a className="nav-link active" href="JavaScript: void(0)">{m.caption}</a>
						</li></span>)
					})}

						{/*<li className="nav-item">
						<a className="nav-link" href="#">Link</a>
					</li>
					<li className="nav-item">
						<a className="nav-link disabled" href="#">
							<span style={{color:'yellow'}}>Disabled</span></a>
					</li>*/}
					</ul>
				</div>
				{/*<div className="col-sm-4 text-left site-logo pt-0">
					<div className="float-sm-right pt-2">&#169; {new Date().getFullYear()} Polo Alto Project</div>
				</div>*/}
			</div>
		</div>
            </div>          
          )
	}          
});
