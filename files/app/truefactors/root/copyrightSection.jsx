var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	return {}
    },
    render: function() {
          var me = this;
	  var role = me.props.parent.state.role;
	  var animationTransfer = me.props.parent.animationTransfer;
	  var langs = Root.global.langs;  
	    
          return  (
		<div className="copyright_section">
			<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 text-left">
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
						{Object.keys(langs).map(function(k) {
						return(<span>
						  <a href="JavaScript: void(0)"  onClick={animationTransfer}>
							  {langs[m]}</a>
						  &nbsp;&nbsp;|&nbsp;&nbsp;
						</span>)
						})}
					</span>					
				</div>
			</div></div>
		</div>
	)}          
});
