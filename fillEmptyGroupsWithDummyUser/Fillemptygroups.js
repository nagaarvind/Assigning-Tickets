(function executeRule(current, previous /*null when async*/) {
	//count groups associated to deleted group
	// (function executeRule(current, previous /*null when async*/) {
	//count groups associated to deleted group
	
	var noUser = new GlideRecord('sys_user');
	noUser.get('user_name', 'dummy.user');	
	
	if(current.operation() == 'delete'){

		var grMember = new GlideRecord('sys_user_grmember');
		grMember.addQuery('group', current.group);
		grMember.query(); 

		if(!grMember.next()){

			var newMember = new GlideRecord('sys_user_grmember');
			newMember.initialize(); 
			newMember.group = current.group; 
			newMember.user = '67d3f8791ba0de1028cc1132b24bcb0f'; 
			newMember.insert(); 

			gs.addInfoMessage(current.group.getDisplayValue() + ' is empty. Filling group with dummy user.');

		}
	}
	
	if(current.operation() == 'insert' && current.user != '67d3f8791ba0de1028cc1132b24bcb0f'){

		var noMember = new GlideRecord('sys_user_grmember');
		noMember.addEncodedQuery('group=' + current.group + '^user=' + '67d3f8791ba0de1028cc1132b24bcb0f');
		noMember.deleteMultiple(); 
		
		gs.addInfoMessage('Removing dummy user.');
	}
	

})(current, previous);
	
