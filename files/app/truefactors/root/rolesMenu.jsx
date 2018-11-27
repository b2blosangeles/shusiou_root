var _rolesMenu = React.createClass({
    getInitialState: function() {
		var me = this;
		me.roles = _global.roles;
          	return {}
    },
    pickMenu : function(code) {
	    var me = this;
            var parent = me.props.parent;
            parent.setState({role: code});
    },
    render: function() {
          var me = this;
          return  (
                    <div className="container">
                        <div className="row">
				<div className="col-sm-3 text-left site-logo pt-2">
					<img src="/app/truefactors/imgs/inventions.png"/>
					{/*--- https://flamingtext.com/net-fu/dynamic.cgi?script=colored2-logo&text=Inventions&fontname=porky%27s ---*/}
				</div>
				<div className="col-sm-9 text-right">
					{Object.keys(me.roles).map(function(idx){
					  return <button className="border border-success btn-large rounded" 
						onClick={me.pickMenu.bind(me, idx)}>
						{me.roles[idx]}</button>
					})}
				</div>
                         </div>
                    </div>)
	}          
});
