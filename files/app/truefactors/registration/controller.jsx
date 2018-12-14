React.createClass({
        getInitialState: function() {
		var me = this;
                if  (localStorage.getItem('_auth')) {
                        window.location.href='#/';
                }
		return {}
        },        
        sendFrom : function () {
          var me = this;
          return  (<span>
			  <img src="http://dev.platoplan.com/api/platoplan/qr.api"/>
            	</span>)        
        },
        render: function() {
                var me = this;
                return Root.commUI.show({
                                code: 'infoBox', 
                                parent : me, 
                                data : me.sendFrom(), 
                                setting : {
                                        type : 'light',
                                        noshadow : true,
                                        style : {'min-height' : '40em'},
                                        class : 'documentPageBody p-3'
                                  }
                        })
        }
})
