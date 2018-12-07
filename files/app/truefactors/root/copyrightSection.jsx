var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	return {}
    },
    render: function() {
          var me = this;
	  var role = me.props.parent.state.role;
	  var animationTransfer = me.props.parent.animationTransfer;
	  var langs = ['en', 'cn'];
	  
          return  (
		<div className="copyright_section">
			<div className="container-fluid">
			<div className="row">
				<div className="col-sm-5 text-left">
					<span className="pull-left">
						{langs.map(function(k) {
						return(<span>
						<a href="JavaScript: void(0)"  onClick={animationTransfer}>
						{Root.global.langs[k]}</a>
						&nbsp;&nbsp;|&nbsp;&nbsp;
						</span>)
						})}
						<a href="JavaScript: void(0)"  onClick={animationTransfer}>
						more ..</a>
					</span> 									
				</div>
				<div className="col-sm-7 text-right">
					<span className="pull-right">
					&#169; {new Date().getFullYear()} Plato Plan
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={'#' + role + '/'} onClick={animationTransfer}>Home</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + role + '/privacy'} onClick={animationTransfer}>Privacy</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href={'#' + role + '/terms'} onClick={animationTransfer}>Terms</a>
					</span>

					<span className="pull-right">
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
