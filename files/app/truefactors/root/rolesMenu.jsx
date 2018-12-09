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
		    <div className="container">
			<div className="row bg-top-bar">
				<div className="col-sm-12 text-left">
					{/*me.props.parent.copyRightSection()*/}
					<div className="container-fluid">
					<div className="row">
						<div className="col-sm-3 text-left site-logo pt-3">
							<img  className="mt-2" src="/app/truefactors/imgs/platoplan_logo.png" height="72"/>
							{/*--- https://flamingtext.com/net-fu/dynamic.cgi?script=colored2-logo&text=Inventions&fontname=porky%27s ---*/}
						</div>
						<div className="col-sm-9 text-right pt-3 mt-3">
							{Object.keys(me.roles).map(function(idx){
							  return (me.props.parent.state.role === idx) ? 
							(<a href={'#/'} onClick={me.props.parent.changeRole.bind(me, '')}
								className="btn btn-large rounded p-3 m-2 role-checked">
								<b>{me.roles[idx].caption}</b></a>)
								:
							  	(<a href={'#/' + idx} onClick={me.props.parent.changeRole.bind(me, idx)}
								className="btn btn-large rounded p-3 m-2 role-unchecked">
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
