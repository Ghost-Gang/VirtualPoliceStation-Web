var chatKey = '';

function getUser() {
    auth.onAuthStateChanged(user => {
        if (user) {
            setUserName(user);
        }
    });
}

function populateFriendList() {
    document.getElementById('lstFriend').innerHTML = `<div class="text-center"><span class="spinner-border text-primary" style="height:3rem;width:3rem;"></span></div>`;
    db.collection('User-Details').get().then(function (querySnapshot) {
        var lst = '';
        querySnapshot.forEach(function (doc) {
            var emailId = doc.data();
            var fullName = emailId.FName + ' ' + emailId.LName;
            if (emailId.Email !== auth.currentUser.email) {
                lst += `<li class="list-group-item list-group-item-action" onclick="startChat('${emailId.Email}','${fullName}')">
                            <div class="row">
                                <div class="col-2">
                                    <img src="images/profile_placeholder.png" class="profile-pic" alt="">
                                </div>
                                <div class="col-10" style="cursor: pointer;">
                                    <div class="name">${fullName}</div>
                                </div>
                            </div>
                        </li>`;
            }
        });
        document.getElementById('lstFriend').innerHTML = lst;
    });
}

function friendList() {
    document.getElementById('friendList').innerHTML = `<div class="text-center"><span class="spinner-border text-primary" style="height:3rem;width:3rem;"></span></div>`;
    db.collection('User-Details').get().then(function (querySnapshot) {
        var list = '';
        list = `<li class="list-group-item">
                    <input type="text" placeholder="search" class="form-control">
               </li>`;
        querySnapshot.forEach(function (doc) {
            var emailId = doc.data();
            var fullName = emailId.FName + ' ' + emailId.LName;
            if (emailId.Email !== auth.currentUser.email) {
                list += `<li class="list-group-item list-group-item-action" data-dismiss="modal" onclick="startChat('${emailId.Email}','${fullName}')">
                            <div class="row">
                                <div class="col-2">
                                    <img src="images/profile_placeholder.png" class="profile-pic" alt="">
                                </div>
                                <div class="col-10" style="cursor: pointer;">
                                    <div class="name">${fullName}</div>
                                </div>
                            </div>
                        </li>`;
            }
        });
        document.getElementById('friendList').innerHTML = list;
    });
}

function startChat(friendEmail, friendName) {
    document.getElementById('messages').innerHTML = `<div class="text-center"><span class="spinner-border text-primary" style="height:3rem;width:3rem;"></span></div>`;
    var friendList = { friendId: friendEmail, userId: auth.currentUser.email };
    var check = false;
    db.collection("friend_List").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var USER = doc.data();
            if ((USER.friendId === friendList.friendId && USER.userId === friendList.userId) || (USER.friendId === friendList.userId && USER.userId === friendList.friendId)) {
                check = true;
                chatKey = doc.id;
            }
        });

        if (check === false) {
            db.collection('friend_List').add(friendList).then(doc => {
                chatKey = doc.id;
            }).catch(error => {
                if (error) alert(error);
            });
        }

        loadMessages(chatKey);
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
    document.getElementById('friendName').innerHTML = friendName;
}

function getUserName() {
    return auth.currentUser.displayName;
}

function setUserName(user) {
    document.getElementById('userName').innerHTML = user.displayName;
}

document.addEventListener('keydown', function (key) {
    if (key.which === 13) {
        if (document.getElementById('txtMessage').value) {
            sendMessage();
        }

    }
});

function sendMessage() {
    var messageContent = document.getElementById('txtMessage').value;
    if (messageContent) {
        var chatMessage = {
            message: messageContent,
            time: new Date().toLocaleString(),
            whichUser: auth.currentUser.email
        }
        db.collection('User-Details').doc('messages').collection(chatKey).doc().set(chatMessage).catch(function (error) {
            console.log(error);
        });
        document.getElementById('messages').scrollTo(0, 500000);
        document.getElementById('txtMessage').value = '';
        document.getElementById('txtMessage').focus();
    }
}

function loadMessages(chatK) {
    document.getElementById('messages').innerHTML = '';
    var query = db.collection('User-Details').doc('messages').collection(chatK).orderBy('time', 'asc');
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                deleteMessage(change.doc.id);
            } else {
                var chatM = change.doc.data();
                displayMessage(chatM.time, chatM.whichUser, chatM.message);
            }
        });
    });
}

function displayMessage(time, user, text) {
    var chatTime = time.split(',');
    if (user === auth.currentUser.email) {
        var messageTemplate = `<div class="row no-gutters justify-content-end">
                                    <div class="col-11 col-md-6 mr-2">
                                    <p class="sent"><span class="time float-right"><small>${chatTime[1]}</small></span><br> ${text}</p>
                                    </div>
                                </div>`;
        document.getElementById('messages').innerHTML += messageTemplate;
        document.getElementById('messages').scrollTo(0, 500000);
    }
    else {
        var messageTemplate = `<div class="row no-gutters">
                                    <div class="col-11 col-md-6 mr-2">
                                        <p class="receive"><span class="time float-right"><small>${chatTime[1]}</small></span><br> ${text}</p>
                                    </div>
                                </div>`;
        document.getElementById('messages').innerHTML += messageTemplate;
        document.getElementById('messages').scrollTo(0, 500000);
    }
}

// function deleteMessage() {
//     db.collection("messages").delete().then(function () {
//         console.log("Document successfully deleted!");
//         document.getElementById('sent').innerHTML = 'This message is deleted';
//     }).catch(function (error) {
//         console.error("Error removing document: ", error);
//     });
// }

getUser();
populateFriendList();


