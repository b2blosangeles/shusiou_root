var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	return {}
    },
    render: function() {
          var me = this;
	  var role = me.props.parent.state.role;
          return  (
		<div className="copyright_section">
			<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 text-left">
					<a href={'#' + role + '/'} onClick={me.animationTransfer}>English</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + role + '/privacy'} onClick={me.animationTransfer}>Chinese</a>					
				</div>
				<div className="col-sm-9 text-right">
					<span className="pull-right">
					&#169; {new Date().getFullYear()} Plato Plan
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={'#' + role + '/'} onClick={me.animationTransfer}>Home</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + role + '/privacy'} onClick={me.animationTransfer}>Privacy</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href={'#' + role + '/terms'} onClick={me.animationTransfer}>Terms</a>
					</span>

					<span className="pull-left">
						{Root.global.menuTree.common.map(function(m) {
						return(<span>
						  &nbsp;&nbsp;|&nbsp;&nbsp;
						  <a href={'#' + role + '/' + m}  onClick={me.animationTransfer}>
							  {Root.global.menuItems[m]}</a>
						</span>)
						})}
					</span>					
				</div>
			</div></div>
		</div>
	)}          
});
