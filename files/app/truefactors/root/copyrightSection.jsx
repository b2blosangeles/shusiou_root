var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	return {}
    },
    render: function() {
          var me = this;
	  var role = me.props.parent.state.role;
	  var animationTransfer = me.props.parent.animationTransfer;
          return  (
		<div className="copyright_section">
			<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 text-left">
					
					<div className="btn-group">
					  <button type="button" className="dropdown-toggle" data-toggle="dropdown">
					    Right-aligned menu
					  </button>
					  <div className="dropdown-menu dropdown-menu-right">
					    <button className="dropdown-item" type="button">Action</button>
					    <button className="dropdown-item" type="button">Another action</button>
					    <button className="dropdown-item" type="button">Something else here</button>
					  </div>
					</div>					
					
					
					
					<a href={'#' + role + '/'} onClick={animationTransfer}>English</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + role + '/privacy'} onClick={animationTransfer}>Chinese</a>					
				</div>
				<div className="col-sm-9 text-right">
					<span className="pull-right">
					&#169; {new Date().getFullYear()} Plato Plan
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={'#' + role + '/'} onClick={animationTransfer}>Home</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + role + '/privacy'} onClick={animationTransfer}>Privacy</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href={'#' + role + '/terms'} onClick={animationTransfer}>Terms</a>
					</span>

					<span className="pull-left">
						{Root.global.menuTree.common.map(function(m) {
						return(<span>
						  &nbsp;&nbsp;|&nbsp;&nbsp;
						  <a href={'#' + role + '/' + m}  onClick={animationTransfer}>
							  {Root.global.menuItems[m]}</a>
						</span>)
						})}
					</span>					
				</div>
			</div></div>
		</div>
	)}          
});
