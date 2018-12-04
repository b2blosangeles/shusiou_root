var _rolesMenu = React.createClass({
	getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
		return {}
	},
	pickMenu : function(event) {
		var me = this;
		me.animation($(event.target), $('.documentPageFrame'));
		alert(event);
		return true;
		var parent = me.props.parent;
		parent.setState({role: code, menuOption: null});
		setTimeout(
			function() {
				me.animation(sobj, $('.documentPageFrame'));
			}
		);
	},
	animation : function(sobj, tobj) {
		//$('div')
			sobj.effect( "transfer", {
		    to: tobj,
		    duration: 100
		  } );
		console.log('-===666===');
		//me.pickMenu.bind(me, idx, this)
	},
	render: function() {
	  var me = this;
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
						<div className="col-sm-9 text-right pt-3 mt-3">
							{Object.keys(me.roles).map(function(idx){
							  return <button className={'btn btn-large rounded ' + 
								((me.props.parent.state.role === idx) ? 
									  'role-checked' : 'role-unchecked')}
								onClick={me.pickMenu}>
								<b>{me.roles[idx].caption}</b></button>
							})}
						</div>
					</div>
					</div>
				</div>
			 </div>
		    </div>)
	}          
});
