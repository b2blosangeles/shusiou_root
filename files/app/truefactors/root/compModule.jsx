var _compModule = function(me, Root) {
	
    this.loadInventor = function() {
	return Root.lib.asyncModule({
		setting:{	extend: {
					contents : {
						howToStartInvention : 'https://dev.shusiou.win/app/truefactors/inventors/contents/howToStartInvention.txt
					},
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
	})
    }
    
    this.loadInvestor = function() {
	return Root.lib.asyncModule({
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
	})
    }
    this.loadLanguage = function() {
	return Root.lib.asyncModule({
		setting:{	extend: {
					contents : {
					},					
					includes : [
					],
					controller : 'https://dev.shusiou.win/app/truefactors/language/controller.jsx'
				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'
			},
		data : '',
		parent : me
	})
    }   
    this.loadContentPage = function(menuItem) {
	return Root.lib.asyncModule({
		setting:{	extend: {
					contents : {
						terms : 'https://dev.shusiou.win/app/truefactors/contents/terms.text',
						faq: 'https://dev.shusiou.win/app/truefactors/contents/faq.text',
						privacy : 'https://dev.shusiou.win/app/truefactors/contents/privacy.text',
						howToStart : 'https://dev.shusiou.win/app/truefactors/contents/howToStart.txt'
					},
					includes : [
						'https://dev.shusiou.win/app/truefactors/documentPage/homePage.jsx',
						'https://dev.shusiou.win/app/truefactors/documentPage/about.jsx',
						'https://dev.shusiou.win/app/truefactors/documentPage/contact.jsx'
					],
					controller : 'https://dev.shusiou.win/app/truefactors/documentPage/controller.jsx'

				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'

			},
		data : menuItem,
		parent : me
	})
    }      
};
