var _rolesMenu = React.createClass({
    getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
          	return {}
    },
    pickMenu : function(code) {
	    var me = this;
            var parent = me.props.parent;
            parent.setState({role: code, menuOption: null});
    },
    render: function() {
          var me = this;
          return  (
                    <div className="container-fluid">
                        <div className="row bg-top-bar">
				<div className="col-sm-12 text-left">
					<div className="container">
					<div className="row">
						<div className="col-sm-3 text-left site-logo pt-2">
							<img src="/app/truefactors/imgs/platoplan_logo.png" height="72"/>
							{/*--- https://flamingtext.com/net-fu/dynamic.cgi?script=colored2-logo&text=Inventions&fontname=porky%27s ---*/}
						</div>
						<div className="col-sm-9 text-right pt-2">
							{Object.keys(me.roles).map(function(idx){
							  return <button className="border border-success btn-large rounded"
								style={{
									'background-image' : 
									'url(//dev.shusiou.win/app/truefactors/imgs/check_bg.png)',
									'background-size': 'cover',
								  	'background-repeat':   'no-repeat',
    									'background-position': 'center center'
								  }}
								onClick={me.pickMenu.bind(me, idx)}>
								{me.roles[idx].caption}</button>
							})}
						</div>
					</div>
					</div>
				</div>
                         </div>
                    </div>)
	}          
});
