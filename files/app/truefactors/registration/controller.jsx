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
          return  (
            <span>
                <form action="#">
                  <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
                    <hr/>

                    <p>By creating an account you agree to our <a href="#/NDA">CONFIDENTIALITY AGREEMENT</a>.</p>
                    <div>CONFIDENTIALITY AGREEMENT</div>      
                         
                    <button type="submit" className="registerbtn">Register</button>
                  </div>

                  <div className="container signin">
                    <p>Already have an account? <a href="JavaScript : void(0)" onClick={Root.auth.signIn.bind(me, Root)}>Sign in</a>.</p>
                  </div>
                </form>
            </span>
          )        
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
