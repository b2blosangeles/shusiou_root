var _compModule = function(me, Root) {
	
    this.loadInventor = function() {
	return Root.lib.asyncModuleA({
		setting:{	extend: {
					includes : [
						'https://dev.shusiou.win/app/truefactors/inventors/data.jsx',
						'https://dev.shusiou.win/app/truefactors/inventors/view.jsx'	
					],
					controller : 'https://dev.shusiou.win/app/truefactors/inventors/main.jsx'
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'
			},
		data : '',
		parent : me
	})()
    }
    
    this.loadInvestor = function() {
	return Root.lib.asyncModuleA({
		setting:{	extend: {
					contents : {
					},					
					includes : [
						'https://dev.shusiou.win/app/truefactors/investors/data.jsx',
						'https://dev.shusiou.win/app/truefactors/investors/view.jsx'	
					],
					controller : 'https://dev.shusiou.win/app/truefactors/investors/controller.jsx'
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'
			},
		data : '',
		parent : me
	})()
    }
    this.loadLanguage = function() {
	    console.log('load==>AAAA' + 'https://dev.shusiou.win/app/truefactors/language/controller.jsx');
	return Root.lib.asyncModuleA({
		setting:{	extend: {
					contents : {
					},					
					includes : [
					],
					controller : 'https://dev.shusiou.win/app/truefactors/language/controller.jsx'
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api',
			 	key : 'language'
			},
		data : '',
		parent : me
	})()
    }   
    
};
