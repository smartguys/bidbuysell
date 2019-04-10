module.exports = () => {
	const json = { users: [],
				   applications: [],
				   friendslist: [],
				   vips: [],
				   administrators: [],
				   messagethreads: [],
				   messages: [],
				   feedbacks: [],
				   warnings: [],
				   finalloginusers: [],
				   disabledusers: [],	
				   blockedpersons: [],
				   suspendedusers: [],
				   appeals: [],
				   taboowords: [],
				   complaints: [],
				   justifiedcomplaints: []
				 };

	// NOTE: You probably don't want to change these numbers
	// NOTE: NUMUSERS >= 100 and 0mod10 please
	// NOTE: NUMMSG <= NUMUSERS/2 for this to work
	const NUMUSERS = 100;
	const NUMMSG = 20;
	const WORDS = ["coca cola", "cheese", "egg", "goats", "mei", "floss", "osu"];

	// USER ROLES MOD10
	// 1 - administrator
	// 2 - vip
	// 3 - applying
	// 4 - reviewing
	// 5 - being reviewed
	// 6 - warned
	// 7 - final login
	// 8 - disabled
	// 9 - suspended

	// USER ROLES MOD20
	// 6 - warned (twice)
	// 8 - appealing (disabled)

	// ---------------------------------------------------

	// Create NUMUSERS users
	for (let i = 0; i < NUMUSERS; i++) {
		json.users.push({ id: i, 
						  displayname: `user${i}`,
						  passwordhash: `pw${i}`,
						  name: `Firstname ${i} Lastname`,
						  address: `${i} Fake Street`,
						  phone: (18882220000+i).toString(),
						  creditcard: (1000200030004000+i).toString()
						});
	}

	// Create NUMUSERS/10 applications
	// 3mod10 = applying
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = 10*i + 3;
		json.applications.push({ id: i,
								 user: j,
								 date: (9000+i).toString()+"-02-14 12:12:12"
							   });
	}

	// Create NUMUSERS/10 friendships
	// NOTE: all friendships have the lower uid first
	// For testing purposes, user19 has two friends
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j1 = 4*i + 3;
		let j2 = 7*i + 5;
		json.friendslist.push({ frienda: j1,
								friendb: j2
							  });
	}

	// Create NUMUSERS/10 vips
	// 2mod10 = vip
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = parseInt(NUMUSERS/10)*i + 2;
		json.vips.push({ id: j
					   });
	}

	// Create NUMUSERS/10 admins
	// 1mod10 = admin
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = 10*i + 1;
		json.administrators.push({ id: j
						 		 });
	}

	// Create NUMMSG message threads
	for (let i = 0; i < NUMMSG; i++) {
		json.messagethreads.push({ id: i
						 		 });
	}

	// Create NUMMSG*10 messages, 10 per thread
	for (let i = 0; i < NUMMSG*10; i++) {
		// choose which two users have the message thread
		let thread = parseInt(i/10);
		let j1 = thread;
		let j2 = thread+NUMMSG;
		json.messages.push({ id: i,
							 thread: thread,
							 sender: j1,
							 receiver: j2,
							 date: (9000+i).toString()+"-12-31 23:59:59",
							 content: `I am user ${j1} messaging user ${j2}.`
						   });
	}

	// Create NUMUSERS/10 feedback items
	// 4mod10 reviewing 5mod10
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j1 = 10*i + 4;
		let j2 = 10*i + 5;
		json.feedbacks.push({ id: i,
							  profile: j2,
							  reviewer: j1,
							  grade: i,
							  date: (9000+i).toString()+"-10-31 12:34:56",
							  content: `I am user ${j1} reviewing user ${j2}, I give them a ${i}.`					 	
				 		});
	}

	// Create 1.5 * NUMUSERS/10 warnings
	// 6mod10 users will be warned once
	// 6mod20 users will be warned once more
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = 10*i + 6;
		json.warnings.push({ id: i,
							 user: j,
							 date: (9000+i).toString()+"-01-01 09:10:11"
				 		   });
	}
	for (let i = 0; i < NUMUSERS/20; i++) {
		let j1 = i + NUMUSERS/10;
		let j2 = 20*i + 6;
		json.warnings.push({ id: j1,
							 user: j2,
							 date: (9000+j1).toString()+"-01-01 09:10:11"
				 		   });
	}

	// Create NUMUSERS/10 final login users
	// 7mod10 = final login
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = 10*i + 7;
		json.finalloginusers.push({ id: j
						 		  });
	}

	// Create NUMUSERS/10 disabled users
	// 8mod10 = disabled
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = 10*i + 8;
		json.disabledusers.push({ id: j
						 		});
	}

	// Create NUMUSERS/10 suspended users
	// 9mod10 = suspended
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j = 10*i + 9;
		json.suspendedusers.push({ id: j,
								   date: (9000+j).toString()+"-07-04 01:12:35"
						 		 });
	}

	// Create NUMUSERS/20 appealing disabled users
	// 8mod20 = suspended, appealing
	for (let i = 0; i < NUMUSERS/20; i++) {
		let j = 20*i + 8;
		json.appeals.push({ id: j,
							date: (9000+j).toString()+"-04-19 04:19:59",
							content: `sorry lol ${j}`
						  });
	}

	// Create some banned words
	// For the sake of testing these will not be random
	for (let i = 0; i < WORDS.length; i++) {
		json.taboowords.push({ word: WORDS[i]
							 });
	}

	// Create NUMUSERS/10 complaints
	// Yes, this is the same code as friendships
	for (let i = 0; i < NUMUSERS/10; i++) {
		let j1 = 4*i + 3;
		let j2 = 7*i + 5;
		json.complaints.push({ id: i,
							   plaintiff: j1,
							   defendant: j2,
							   date: (9000+i).toString()+"-12-25 03:04:05",
							   content: `I am user ${j1} complaining about user ${j2}.`
							 });
	}

	// Every other complaint is justified
	for (let i = 0; i < NUMUSERS/20; i++) {
		let j = 2*i;
		json.justifiedcomplaints.push({ complaint: j
									  });
	}

	return json;
}