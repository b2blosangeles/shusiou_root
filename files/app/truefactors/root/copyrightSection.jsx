var _copyrightSection = React.createClass({
    getInitialState: function() {
	var me = this;
	return {_auth : localStorage.getItem('_auth')}
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
				<div className="col-sm-2 text-left">
					{(!me.state._auth) ? (
						<a onClick={me.clickOption.bind(me, 'login')}
						href="JavaScript: void(0)">Login</a>)
						:
						(<span>
						<a>
						[{(!Root.auth || !Root.auth.state) ? '' : Root.auth.state.info}]</a>
						&nbsp;
						<a onClick={Root.auth.doAuth.bind(me)}
						href="JavaScript: void(0)">Logoff</a>
						</span>)
					}
					=={uuid}
					{/*(!me.state._auth) ? (
						<a onClick={Root.auth.signIn.bind(me, Root)}
						href="JavaScript: void(0)">Login</a>)
						:
						(<span>
						<a>
						[{(!Root.auth || !Root.auth.state) ? '' : Root.auth.state.info}]</a>
						&nbsp;
						<a onClick={Root.auth.doAuth.bind(me)}
						href="JavaScript: void(0)">Logoff</a>
						</span>)
					*/}
				</div>
				<div className="col-sm-10 text-right">
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
