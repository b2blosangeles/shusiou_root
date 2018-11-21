React.createClass({
        getInitialState: function() {
          var me = this;
          return {}
        },
        componentDidMount:function() {
               var me = this;
               me.init();
        },        
        init : function() {
                var me = this;
        },
        render: function() {
          var me = this;
          return  (
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-2">
                              One of three columns
                            </div>
                            <div class="col-sm-2">
                              One of three columns
                            </div>
                            <div class="col-sm-2">
                              One of three columns
                            </div>
                         </div>
                    </div>          
          )
        }
})
