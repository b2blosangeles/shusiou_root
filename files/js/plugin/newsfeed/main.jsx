React.createClass({
        getInitialState: function() {
		var me = this;
		me.menu = [];
		me.options = {};
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		me.init();
        }, 
        init : function(code) {
                var me = this;
 		me.menu = _global.menu;
		me.options = _global.options;
		me.setState({option: ''});
        },
        showBody : function(code) {
                var me = this;
        }, 
        pickMenu : function(code) {
                var me = this;
                me.setState({option: code});
        },
        render: function() {
          var me = this;
	  
          return  (
                    <div className="container">
                        <div className="row">
				<div className="col-sm-12">
                                </div>
                        </div>
                        <div className="row">
				<div className="col-sm-1">
					<button className="btn btn-success btn-lg" onClick={me.pickMenu.bind(me, 'inventors')}>
						{me.options.inventors}</button>
				</div>
				<div className="col-sm-8"></div>
				<div className="col-sm-1">
					<button className="btn btn-success btn-lg" onClick={me.pickMenu.bind(me, 'inventors')}>
						{me.options.investors}</button>
				</div>
                         </div>			  
                        <div className="row">
				<div className="jumbotron mt-1">
                            	{me.menu.map(function(m){
					if (m.code === me.state.option) {
						return (<_sectionA1/>)						
					}
				})}
                                </div>
                         </div>			  
                    </div>          
          )
        }
})
