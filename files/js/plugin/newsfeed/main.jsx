React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = {};
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		me.init();
        }, 
        init : function(code) {
                var me = this;
		me.roles = _global.roles;
		me.setState({role: ''});
        },
        showBody : function() {
                var me = this;
		switch (me.state.role) {
			case 'inventors' : 
				return (<_sectionA1/>);
				break;
			case 'inventors' :
				return (<_sectionA1/>);
				break;
			default : 
				return '';
		}
        }, 
        pickMenu : function(code) {
                var me = this;
                me.setState({role: code});
        },
        render: function() {
          var me = this;
          return  (
                    <div className="container">
                        <div className="row">
				<div className="col-sm-12"></div>
                        </div>
                        <div className="row">
				<div className="col-sm-1">
					<button className="btn btn-success btn-large" 
						onClick={me.pickMenu.bind(me, 'inventors')}>
						{me.roles.inventors}</button>
				</div>
				<div className="col-sm-8"></div>
				<div className="col-sm-1">
					<button className="btn btn-success btn-large" 
						onClick={me.pickMenu.bind(me, 'investors')}>
						{me.roles.investors}</button>
				</div>
                         </div>			  
                        <div className="row">
				<div className="jumbotron mt-1">{/*me.showBody()*/}</div>
                         </div>			  
                    </div>          
          )
        }
})
