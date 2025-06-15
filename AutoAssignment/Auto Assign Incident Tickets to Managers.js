(function executeRule(current, previous /*null when async*/ ) {

        //Gets the current time in UTC
        var gdt = new GlideDateTime();
        var gt = gdt.getValue(); // gives us as string 
        var formate_time = gt.split(" ")[1]; // Extracts the time portion from full string
        //4 impulse group sys_ids
        var im_grp = ['887059c5dbe403448f33f4641f96191c', '02dbecd0606e4100a210b5d776ef5ad7', '82dbecd0606e4100a210b5d776ef5ad9', '06dbecd0606e4100a210b5d776ef5adb'];

        //previous ass_grp is not im_grp but current ass_grp is im_grp
        //script run only if the assignment group changes from different group to one of the im_grp, -1(not in the array)
        if (im_grp.indexOf(previous.assignment_group.toString()) === -1 && im_grp.indexOf(current.assignment_group.toString()) !== -1) {

            //works in IST timing (8:30AM to 8:30PM)
            if (((formate_time) > '03:00:00' && (formate_time) < '15:00:00')) {
                //store user sys_ids in array
                var user_sys_ids = [
                    '8db3b22247946d5c4967a03a536d43e3', //satish singh 0
                    '68ad1d65db1b33c8b9b19c16db9619b3', //shekhina 1
                    '1db6511287e7ad501ff696c73cbb35d8' //venkata 2, return to 0
                ];
                //works if user exists
                if (user_sys_ids.length > 0) {
                    //gets the index of the last assigned user
                    var last_assigned = parseInt(gs.getProperty('last.assigned.index', 0), 10);
                    //assigns last assigned value to the ticket and adds in the next line.
                    current.assigned_to = user_sys_ids[last_assigned];

                    last_assigned = (last_assigned + 1) % user_sys_ids.length;
                    //stores the value
                    gs.setProperty('last.assigned.index', last_assigned.toString());
                }
            }
        }
    }

)(current, previous);