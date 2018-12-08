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
				<div className="col-sm-12 text-right">
					<span className="pull-right">
					&#169; {new Date().getFullYear()} Plato Plan
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={'#/'} onClick={animationTransfer}>Home</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#/privacy'} onClick={animationTransfer}>Privacy</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href={'#/terms'} onClick={animationTransfer}>Terms</a>
					</span>

					<span className="pull-right">
						{Root.global.menuTree.common.map(function(m) {
						return(<span>
						  &nbsp;&nbsp;|&nbsp;&nbsp;
						  <a href={'#/' + m}  onClick={animationTransfer}>
							  {Root.global.menuItems[m]}</a>
						</span>)
						})}
					</span>	
					<span className="pull-left">
						<span>
							&nbsp;&nbsp;|&nbsp;&nbsp;
							<a href={'#/language'}  onClick={animationTransfer}>
							Change Language</a>
						</span>
					</span> 					
				</div>
			</div></div>
		</div>
	)}          
});
