React.createClass({
        getInitialState: function() {
		var me = this;
		me.roles = Root.global.roles;
		me.compModule = new _compModule(me, Root);
          	return {role: '', menuOption:null, spinner: true, route:''}
        },

	changeContentPage : function(v, e) {
		var me = this; 
		if ((e) && e.target) {
			Root.commUI.animation.transfer($(e.target));
		}
		me.setState({ menuOption : (!v) ? '' : v})
	},
	animationTransfer : function(e) {
		var me = this; 
		if ((e) && e.target) {
			Root.commUI.animation.transfer($(e.target));
		}
	},
        showBody : function() {
                var me = this;
		
		if (me.state.menuOption === 'language')  {
			return me.compModule.loadLanguage();	
		} else {
			if ((me.state.role) && (Root.global.menuTree[me.state.role]) && 
			    Root.global.menuTree[me.state.role].indexOf(me.state.menuOption) !== -1 && 
			    Root.global.menuTree._publicMenu.indexOf(me.state.menuOption) === -1 
			   ) {
				if (me.state.role === 'inventor')  return me.compModule.loadInventor();
				if (me.state.role === 'investor')  return me.compModule.loadInvestor();
			} else if (me.state.menuOption !==  null) {	
				return me.compModule.loadContentPage(me.state.menuOption);
			}
		}
        }, 
	showPageFrame : function(data) {
		var me = this;
		return Root.commUI.show({
				code: 'pageFrame', 
				parent : me, 
				data : data, 
				setting : {
					type : 'light',
					noshadow : true,
					style : {'min-height' : '40em'},
					class : 'documentPageBody p-3'
				}
			})
	},

	changeRole : function(v, e) {
		var me = this;
		e.preventDefault();
		me.setState({ role : v}, function() {
			window.location.href = '#'+ v;
		});
	},

	changeCore : function(v, e) {
		var me = this;
		e.preventDefault();
		me.setState({ core : v}, function() {
			window.location.href = '#/'+ v;
		});
	},
	routeRule : function() {
		var me = this;
		return {
			'_default' : function(path) {
				var path_a = path.split('/');
				var v = {};
				if (path_a[0])  v.role  = path_a[0];
				
				// else v.menuOption = '';
				if (path_a[1]) v.menuOption = path_a[1];
				else {
					if (!path_a[0]) {
						var def_path = '';
					} else {
						var def_path = (!Root.global.menuTree[path_a[0]] ||
						    !Root.global.menuTree[path_a[0]].length) ? 
							Root.global.menuTree._publicMenu[0] :
							Root.global.menuTree[path_a[0]][0];
					}
					v.menuOption = def_path;
				}
				
				me.setState(v, function(){
					// console.log(me.state);
				});
			}			
		}
	},	
        render: function() {
          var me = this;
          return  (
		<span>
			<_routerControl routeRule={me.routeRule()} />
			<_rolesMenu parent={me}/>
			<_subMenu parent={me}/>
			{me.showPageFrame(me.showBody())}
			<_copyrightSection parent={me}/>
		</span>
          )
        }
})
