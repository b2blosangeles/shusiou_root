var _rolesMenu = React.createClass({
	getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
		return {}
	},
	clickMenu : function(code, e) {
		var me = this;
		var parent = me.props.parent;
		Root.commUI.animation.transfer($(e.target));
		parent.setState({role: code, menuOption: null});
	},
	render: function() {
	  var me = this;
	  var menuOption = (me.props.parent.state.menuOption) ? me.props.parent.state.menuOption : '';
	  return  (
		    <div className="container-fluid">
			<div className="row bg-top-bar">
				<div className="col-sm-12 text-left">
					{/*me.props.parent.copyRightSection()*/}
					<div className="container">
					<div className="row">
						<div className="col-sm-3 text-left site-logo pt-3">
							<img id="t99" src="/app/truefactors/imgs/platoplan_logo.png" height="72"/>
							{/*--- https://flamingtext.com/net-fu/dynamic.cgi?script=colored2-logo&text=Inventions&fontname=porky%27s ---*/}
						</div>
						<div className="col-sm-9 text-right pt-2 mt-3">
							{Object.keys(me.roles).map(function(idx){
							  return (me.props.parent.state.role === idx) ? 
							(<a href={'#/' + menuOption} 
								className="btn btn-large rounded p-3 m-2 role-checked"
								onClick={me.props.parent.removeRole}>
								<b>{me.roles[idx].caption}</b></a>)
								:
							  	(<a href={'#' + idx + '/' + menuOption } 
								className="btn btn-large rounded p-3 m-2 role-unchecked"
								onClick={me.props.parent.animationTransfer}>
								<b>{me.roles[idx].caption}</b></a>)
							
							})}
						</div>
					</div>
					</div>
				</div>
			 </div>
		    </div>)
	}          
});
