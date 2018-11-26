var _secondMenu = React.createClass({
    getInitialState: function() {
		        var me = this;
		        me.roles = _global.roles;
          	return {}
    },
    render: function() {
          var me = this;
          return  (
            <div className="secondMenu bg-secondary container-fluid" style={{'height' : '2.5em', color:'#fff'}}>
		<div className="container">
			<div className="row">
				<div className="col-sm-8 text-left site-logo pt-0">
					<ul className="nav">
						<li className="nav-item">
							<a className="nav-link active" href="#">Active</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Link</a>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" href="#">
								<span style={{color:'eee'}}>Disabled</span></a>
						</li>
					</ul>
				</div>
				<div className="col-sm-4 text-left site-logo pt-0">
					<div className="float-sm-right pt-2">&#169; {new Date().getFullYear()} Polo Alto Project</div>
				</div>
			</div>
		</div>
            </div>          
          )
	}          
});
