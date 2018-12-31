var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	return {}
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
	  var role = me.props.parent.state.role;
	  var animationTransfer = me.props.parent.animationTransfer;
	  var langs = ['en', 'cn'];
	  var uuid = localStorage.getItem('UUID');
          return  (
		<div className="copyright_section">
			<div className="container-fluid px-1">
			<div className="row">
				<div className="col-sm-4 text-left">
					{(!Root.auth.state._auth) ? (<span>
						<a onClick={me.clickOption.bind(me, 'login')}
						href="JavaScript: void(0)">Login</a>
						&nbsp;&nbsp;&nbsp;
						<a onClick={me.clickOption.bind(me, 'registration')}
						href="JavaScript: void(0)">Registration</a>
						</span>)
						:
						(<span>[User Name:{Root.auth.state._auth.username}]&nbsp;
						<a onClick={Root.auth.logoff.bind(me)}
						href="JavaScript: void(0)">Logoff</a>
						</span>)
					}
					{/*&nbsp;&nbsp;&nbsp;[{uuid}]*/}
				</div>
				<div className="col-sm-8 text-right">
					<span className="pull-right">
					&#169; {new Date().getFullYear()} Plato Plan
					&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={'#/'} onClick={animationTransfer}>Home</a>
					&nbsp;&nbsp;|&nbsp;&nbsp;							
					<a href={'#/NDA'} onClick={animationTransfer}>NDA</a>
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
							{Root.global.langs[me.props.parent.state.lang]} (<a href={'#/language'}  onClick={animationTransfer}>
							Change Language</a>)
						</span>
					</span> 					
				</div>
			</div></div>
		</div>
	)}          
});
