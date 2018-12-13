var _compModule = function(me, Root) {
	
    this.loadInventor = function() {
	return Root.lib.asyncModule({
		setting:{	extend: {
					contents : {
						howToStartInvention : 'https://dev.shusiou.win/app/truefactors/contents/howToStartInvention.txt'
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
						howToStartInvestment : 'https://dev.shusiou.win/app/truefactors/contents/howToStartInvestment.txt'
						
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
    this.public = function() {
	return Root.lib.asyncModule({
		setting:{	extend: {
					contents : {
					},
					includes : [
						'https://dev.shusiou.win/app/truefactors/public/data.jsx',
						'https://dev.shusiou.win/app/truefactors/public/view.jsx'	
					],
					controller : 'https://dev.shusiou.win/app/truefactors/public/controller.jsx'
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
						homePage : 'https://dev.shusiou.win/app/truefactors/contents/homePage.txt',
						NDA : 'https://dev.shusiou.win/app/truefactors/contents/NDA.txt',
						contactUs : 'https://dev.shusiou.win/app/truefactors/contents/contactUs.txt',
						faq: 'https://dev.shusiou.win/app/truefactors/contents/faq.text',
						privacy : 'https://dev.shusiou.win/app/truefactors/contents/privacy.txt',
						howToStart : 'https://dev.shusiou.win/app/truefactors/contents/howToStart.txt'
					},
					includes : [
						'https://dev.shusiou.win/app/truefactors/documentPage/about.jsx'
					],
					controller : 'https://dev.shusiou.win/app/truefactors/documentPage/controller.jsx'

				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'

			},
		data : menuItem,
		parent : me
	})
    },
    this.registrationPage = function(menuItem) {
	return Root.lib.asyncModule({
		setting:{	extend: {
					contents : {},
					includes : [],
					controller : 'https://dev.shusiou.win/app/truefactors/registration/controller.jsx'

				}, 
				master: '//master1_dev.shusiou.win/api/DVCHub.api'

			},
		data : menuItem,
		parent : me
	})
    } 
};
