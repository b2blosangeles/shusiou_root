React.createClass({
	routeMatrix:function() {
		var me = this;
		var my_role = ((me.state.userInfo) && (me.state.userInfo.roles)) ? 
		    me.state.userInfo.roles : [];

		me.matrix = [
			{route:'tutor/my_curriculums', role:['teacher'], auth:true, component:My_curriculums},
			{route:'tutor/my_curriculum/:opt/', role:['teacher'],  auth:true, component:MyCurriculumById},
			{route:'tutor/my_curriculum/:opt/:id', role:['teacher'],  auth:true, component:MyCurriculumById},
			{route:'tutor/my_videos', role:['teacher'],  auth:true, component:My_videos},

			{route:'public_courses', role:['*'], component:PublicCourses},
			{route:'student/my_courses', role:['learner'],  auth:true, component:Mycourse},
			{route:'student/my_course/:id', role:['*'],  auth:true, component:Mycoursebyid},

			{route:'dashboard', role:['*'],  auth:false, component:MyDashboard},

			{route:'Signin', role:['*'], auth:false, component:Signin},
			{route:'Signup', role:['*'], auth:false, component:Signup},
			{route:'Doc/:code', role:['*'], auth:false, component:DocviewPage},
			{route:'/', role:['*'], auth:false, component:Ad},
			{route:'*', role:['*'], auth:false, component:ErrorPage}
		];			
		return (
			<span>
			{me.matrix.map(function(m){ 
				let permission = {
					role : m.role,
					auth : m.auth
				} 						
				return(<Route path={m.route} env={me} permission={permission} component={m.component} />)	
			})};
			</span>	
		);
	},	
	render: function() {
		var me = this;
		

		
		return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me}/>
				{/*me.routeMatrix()*/}NBNBNB
			</ReactRouter.Router>)  
		/* return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me} component={Ad}/>
				{me.routeMatrix()}
			</ReactRouter.Router>) */
	}
})
