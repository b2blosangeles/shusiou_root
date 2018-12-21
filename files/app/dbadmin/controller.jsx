React.createClass({
        getInitialState: function() {
	        var me = this;
                me.result = {};
		me.tables = [];
		me.dbs = [];
	        return {currentDB : ''}    
        },
	componentDidMount : function() {
		var me = this;
		me.callQuery('SHOW TABLES', me.showTables);
		me.callQuery('SHOW DATABASES', me.showDBs);		
	},
       selectDB : function(db) {
	    var me = this;
	    me.setState({currentDB : db});
	    setTimeout(function() {
		 me.callQuery('SHOW TABLES', me.showTables);    
		    });
        },	
       selectTable : function(tbl) {
	    	var me = this; 
		$('#SQL').val("SELECT * FROM `" + tbl + "`");
	     	me.submitQuery();
        },
       showDBs : function(data) {
	    var me = this; 
	    me.dbs = [];
	    for (var i = 0; i< data.length; i++) {
		 for (var key in data[i]) {   
		 	me.dbs.push( data[i][key])
			 break;
		 }
	    }
	    me.setState({updated: new Date().getTime()});
        },	
       showTables : function(data) {
	    var me = this; 
	    me.tables = [];
	    for (var i = 0; i< data.length; i++) {
		 for (var key in data[i]) {   
		 	me.tables.push( data[i][key])
			 break;
		 }
	    }
	    me.setState({updated: new Date().getTime()});   
        },
        callQuery : function(query, cbk) {
	    var me = this;
            $.ajax({
                url: '/api/platoplan/dbengine.api',
                dataType: 'json',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data: {query : query, db : me.state.currentDB},
                success: function( data, textStatus, jQxhr ){
			cbk(data.data.data); 
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });                
        },	
        submitQuery : function() {
	    var me = this;
		var query = false, cbk = false;
            $.ajax({
                url: '/api/platoplan/dbengine.api',
                dataType: 'json',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data: {query : ((query) ? query : $('#SQL').val()), db : me.state.currentDB},
                success: function( data, textStatus, jQxhr ){
		    if (typeof cbk === 'function') {
			   cbk(data.data); 
		    } else {
                    	me.result = data.data;
                    	me.setState({updated: new Date().getTime()});
		    }
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });                
        },
	showData : function(data) {
		var fields = (!data || !data.length) ? [] : Object.keys(data[0]);
		return (!data || !data.length) ?  (<span></span>) :
		(<div className="pre-scrollable bg-light" style={{"min-height":"28em"}}>
		<table className="table alert-warning pre-scrollable">
		  <thead><tr>
			{fields.map(
				function(field) {
					return (<th scope="col">{field}</th>)
				}
			)}
		    </tr></thead>
		  <tbody>
		{data.map(
			function(rec) {
			return (<tr>
			{fields.map(
				function(field) {
					return (<th scope="col" className="bg-white">{rec[field]}</th>)
			})}</tr>)
			}
		)}
		  </tbody>
		</table></div>)
	},	
        render : function() {
        	var me = this;
                return  (<div className="container-fluid mt-2">
                          <div className="row shadow" style={{'margin-left':'3em', 'margin-right':'3em'}}>
                              <div className="col-sm-12" style={{'margin':'0px', 'padding':'2px'}}> 
				<div className="card p-3 w-100 alert-success">
				<h3 className="inline-block">Mysql Observer</h3> (v1.0)
				</div>	
                              </div>
                          </div>				
                          <div className="row shadow"  style={{'margin-left':'3em', 'margin-right':'3em'}}>
				<div className="col-sm-2" style={{'margin':'0px', 'padding':'2px'}}>
					<div className="card p-2 w-100 alert-info" style={{"min-height":"40em"}}>
						<div className="btn-group d-flex w-100 mt-2">
						  <button type="button" className="btn btn-info  w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							  {(me.state.currentDB) ? me.state.currentDB : 'Select Database'}
						  </button>
						  <div className="dropdown-menu">
							{me.dbs.map(
							function(db) {
								return (<a className="dropdown-item" href="JavaScript:void(0)"
										onClick={me.selectDB.bind(me, db)}>{db}</a>)
							})}
						  </div>
						</div>
						<div className="pre-scrollable mt-2 mb-5 p-2 alert-warning"
							style={{"min-height":"32em"}}>
						{me.tables.map(
						function(item) {
							return (<div className="pt-1" ><a className="" href="JavaScript:void(0)"
								onClick={me.selectTable.bind(me, item)}>{item}</a></div>)
						}
						)} 
						</div>
					</div>
				</div>	 
                              <div className="col-sm-10"  style={{'margin':'0px', 'padding':'2px'}}>
				   <div className="card p-2 w-100 alert-secondary" style={{"min-height":"40em"}}>
					   <textarea id="SQL" className="form-control" rows="3"></textarea>
					   <div className="container mt-1 mb-1">
						   <div className="row" style={{'margin':'0px', 'padding':'0px'}}>
							   <div className="col-sm-11">&nbsp;</div>
							   <div className="col-sm-1">
					   			<button className="btn btn-info d-flex border border-default float-right" 
						   		onClick={me.submitQuery.bind(me)} type="submit">submit</button>
							   </div>
						   </div>	   
					   </div>   
					   {me.showData(me.result.data)}  
				   </div>
                              </div>
                          </div>                                
                      </div>)
              }
})
