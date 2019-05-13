// USER AUTHENTICATION
function login(userid, password) {
    const user = getUser(userid);
    if (user.password == password) {
        setUserSessionToken({
            "user": userid,
            "type": userid.type,
            "token": generateToken(userid)
        }
        )
        return ({
            success: true,
            message: "Logged in"
        })
    }
    else {
        return ({
            success: false,
            message: "Invalid credentials"
        })
    }
}

function checkSession(token) {
    if (!token.expired) {
        return ({
            success: true,
            message: "vaid token"
        })
    }
    else {
        deleteToken(token)
        return ({
            success: false,
            message: "invalid token"
        })
    }
}

// Users:

function isAdmin(userID) {
	return // if userID is in Administrators where Administrators.ID = userID
}

function hash(text) {
	// return our hashing function applied to text
}

function submitApplication(name, displayname, phone, email, address, password, creditcard) {
    if(checkBlacklist(name)) {
        // error: name is blacklisted and barred from submititng an application
    }
	// create Applications record with (name, displayname, phone, email, address, hash(password), creditcard, currDate())
}

function getApplications() {
	return // All application records
}

function getApplication(applicationID) {
	return // Application where Application.ID = applicationID
}

function approveApplication(applicationID, adminID) {
	if(!isAdmin(adminID)) {
		// erorr: user of 'adminID' is not actually an Administrator	
	}
	app = getApplication(applicationID)
	// create Users record with (...app)
}

// MESSAGES:

function getUserThreads(userID) {
	threads = // get Thread from ThreadMembers where Member = userID
	return threads
}

function isThreadMember(userID, threadID) {
	return // if userID is in ThreadMembers where Thread = threadID
}

function createThread(userID) {
	threadID = // create a Threads record
	// create a ThreadMemers record with (threadID, userID)
}

function addThreadMember(threadID, userID, newID) {
	if (isThreadMember(userID, threadID)
		// create ThreadMembers record with (threadID, newID)
	} else {
		// error: userID not allowed to add members to this thread
	}
} 

function getUserThreadMessages(userdID, threadID) {
	if (isThreadMember(userID, threadID)
		messages = // ThreadMessages where Thread = threadID
	} else {
		// error: userID not allowed to view the messages in this thread
		return null;
	}
	return messages
}

function sendMessageInThread(senderID, threadID, content) {
	if (isThreadMember(threadID, senderID)) {
		// create ThreadMessages record with (threadID, senderID, currDate(), content)
	} else {
		// error: userID not allowed to send a messge in this thread
	}
}

// FRIENDS:

function getFriends(userID) {
	friends = // join two queries from Friends:
		// FriendB where FriendA = userID
		// FriendA where FriendB = userID
	return friends
}

function areFriends(userA_ID, userB_ID) {
	if (userB_ID < userA_ID) {
		userA_ID, userB_ID = userB_ID, userA_ID // swap values so that userA < userB
	}
	return // if record exists where FriendA = userA_ID and FriendB = userB_ID
}

function addFriend(userID, friendID) {
	if(!areFriends(userID, friendID){
		if (friendID < userID) {
			userID, friendID = friendID, userID // swap values so that userID < friendID
		}
		// create Friends record with (userID, friendD)
	}
}

// LISTINGS:

function getUserListings(userID) {
    return // Listings where Listing.SellerID = userID
}

function getPedingListings() {
	listings = // Listings where Approved = false
	return listings
}

function getApprovedListings() {
    return // Listings where Approved = true
}

function approveListing(listingID) {
    // set Approved = true for the Listing at listingID
    // set status = 'active' for the Listing at lsitingID
}

function denyListing(listingID) {
	// delete the Listing record at listingID
}

function createListing(sellerID, name, description, priceLow, priceHigh, isAuction, friendDiscount, endTime) {
	if(!isAuction) {
		assert(priceLow = priceHigh)
	}
	// crate Listing record with (sellerID, name, description, priceLow, priceHigh, isAuction, friendDiscount, endTime, Status='active')
}

function getActiveListings() {
	return // get all listings with Status = 'active'
}

function getListing(listingID) {
	return // Listing where ID = listingID 
}

function getBidsOfListing(listingID) {
	bids = // get Bids where Listing = listingID
	return bids
}

function getBid(bidID) {
	return // Bid where ID = bidID
}

function submitBuyIntent(userID, listingID) {
	listing = getListing(listingID)
	if (listing.status != 'active') {
		// error: listing is no longer active	
	}
	if (lsiting.isAuction) {
		// error: listing is an acution and cannot have 'buy intents'
	}
	bids = getBidsOfListing(listingID)
	bidderIDs = /* userIDs of bids*/
	if(userID is in bidderIDs) {
		// erorr: user already submitted a 'buy intent'	
	}
	// create Bids record with (userID, listing.priceHigh, 	currDate())
}

function submitBid(userID, listingID, bidAmount) {
	listing = getListing(listingID)
	if (listing.status != 'active') {
		// error: listing is no longer active	
	}
	if (!lsiting.isAuction) {
		// error: listing is a fixed-price and cannot have 'bids'
	}
	// create Bids record with (listingID, userID, bidAmount, currDate())
}

function getTransactions() {
	return // get all Transactions
}

function submitTransaction(bidID) {
	bid = getBid(bidID)
	listing = getListing(bid.listingID)
	buyerID = bid.userID
	sellerID = listing.sellerID
    listing.status = 'ended'
    price = areFriends(listing.sellerID, buyerID) ? bid.Price : bid.Price * (1 + bid.friendDiscount)
	// create Transaction record with (listingID, bidID, price, sellerID, buyerID, currDate())
}

function getBidderIDsOfListing(listingID) {
	bids = getBidsOfListing(listingID)
	bidderIDs = // unique userIDs in bids
	return bidderIDs
}

function userSelectPurchaser(userID, buyerID, listingID){
	listing = getListing(listingID)
	if(listing.status != 'active') {
		// error: listing is not active	
	}
	if(listing.isAuction){
		// error: lsiting is an auction and cannot 
	}
	bidderIDs = getBidderIDsOfListing(listingID)
	if(buyerID not in bidderIDs) {
		// error: buyerID is not among this bidders of this listing	
	}
	bidID = // Bid.ID where UserID = bidderID
	submitTransaction(bidID)
}

function endAuction(listingID) {
	listing = getListing(listingID)
	if(listing.status != 'active') {
		// error: listing is not active	
	}
	if(!listing.isAuction){
		// error: lsiting is not an auction
	}
	bids = getBidsOfListing(listingID)
	if(bids.length == 0) {
		listing.status = 'ended'
	} else if (bids.length == 1) {
		submitTransaction(bidID)
	} else {
		sortedBids = // sort bids by price descending
		chosenBid = sortedBids[1]
		submitTransaction(bidID)
    }
    
    function createNotification(userID, name) {
        // create record in Notifications with (userID, name)
    }

    function getUserNotifications(userID) {
        notifications = // get Notifications where Notification.UserID = userID
        return notifications
    }

    function checkUserNotifications(userID) {
        notifications = getUserNotifications(userID)
        names = // names in notifications
        listings = // Listings where Listings.name ~ names
        return listings
    }

// FEEDBACK:

    function submitFeedback(profileID, reviewerID, rating, content) {
        // create Feedback record with (profileID, reviewerID, rating, content, currDate())
    }

    function getUserFeedback(userID) {
        return // Feedback where Feedback.ProfileID = userID
    }

    function submitComplaint(plaintiffID, defendantID, content){
        // create new Complaint Record with (plaintiffID, defendantID, content, currDate(), justified=false)
    }

    function getComplaints() {
        return // all records in Complaints
    }

    function getUnjustified Complaints() {
        return // Complaints where justified = false
    }

    function getJustifiedComplaints() {
        return // Complaints where justified = true
    }

    fucntion countUserJustifiedComplaints(userdID) {
        return // count Complaints where DefendantID = userID and Justified = true
    }

    function justifyComplaint(complaintID) {
        // set Complaint.Justified = true where ID = complaintID
        userID = // Complaint.DefendantID where ID = complaintID
        count = countUserJustifiedComplaints(userID)
        if(count >= 2) {
            submitWarning(userID);
        }
    }

    function submitWarning(userID){
        // create Warning record with (userID, currDate())
        count = countUserWarnings(userID)
        if(count >= 2){
            suspendUser(userID)
        }
    }

    function countUserWarnings(userID) {
        return // count Warnings where Warnings.UserID = userID
    }

    function suspendUser(userID) {
        // create Suspended record with (userID, currDate())
    }

    function isSuspended(userID) {
        return // if userID is in Suspended.ID
    }

    function submitAppeal(userID, content) {
        if(!isSuspended()) {
            // error: user is not suspended
        }
        // create Aplea record with (userID, content, currDate())
    }

    function getAppeals() {
        return // all Appeal records
    }

    function approveApeal(appealID) {
        userID = // userID from Appeals where ID = appealID
        // delete record from Suspended where Suspended.USerID = userID 
    }

    function denyAppeal(appealID) {
        userID = // userID from Appeals where ID = appealID
        banUser(userID)
    }

    function banUser(userID) {
        name = getUSer(userID).name
        blacklistName(name)
        // elete User record where Users.ID =  userID
    }

    fucntion blacklistName(name) {
        // add name to BlackListedNames table with (name)
    }

    function checkBlacklist(name) {
        return // if name is in BlacklistNames
    }
}
















