var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	me.roles = Root.global.roles;
	return {}
    },
    render: function() {
          var me = this;
	    /*
	  var menu = (!me.props.parent.state.role) ? [] : (!Root.global.menuTree[me.props.parent.state.role]) 
	  	? [] : Root.global.menuTree[me.props.parent.state.role];
	  var captions = Root.global.menuItems
	  
	  var publicMenu = (!menu.length) ? Root.global.menuTree._publicMenu : [];
	  */
          return  (
		<div className="copyright_section">
			<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 text-left">
					<a href={'#' + me.state.role + '/'} onClick={me.animationTransfer}>English</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + me.state.role + '/privacy'} onClick={me.animationTransfer}>Chinese</a>					
				</div>
				<div className="col-sm-9 text-right">
					<span className="pull-right">
					&#169; {new Date().getFullYear()} Plato Plan
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={'#' + me.state.role + '/'} onClick={me.animationTransfer}>Home</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#' + me.state.role + '/privacy'} onClick={me.animationTransfer}>Privacy</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href={'#' + me.state.role + '/terms'} onClick={me.animationTransfer}>Terms</a>
					</span>

					<span className="pull-left">
						{Root.global.menuTree.common.map(function(m) {
						return(<span>
						  &nbsp;&nbsp;|&nbsp;&nbsp;
						  <a href={'#' + me.state.role + '/' + m}  onClick={me.animationTransfer}>
							  {Root.global.menuItems[m]}</a>
						</span>)
						})}
					</span>					
				</div>
			</div></div>
		</div>
	)}          
});
