React.createClass({
        render: function() {
        	var me = this;
                return  (<div className="container px-1">
                          <div className="row">
                              <div className="col-sm-1">
                                Tables<hr/>
                              </div>
                              <div className="col-sm-11">
                                   <textarea className="form-control" rows="4"></textarea>
                                   <button className="btn btn-default" type="submit">submit</button>
                              </div>
                          </div>
                           <div className="row">
                              <div className="col-sm-3">
                              </div>
                              <div className="col-sm-9">
                              </div>
                          </div>
                      </div>)
              }
})
