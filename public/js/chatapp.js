function getUser() {
    auth.onAuthStateChanged(user => {
        if (user) {
            setUserName(user);
            var friendList = { friendId: 'admin79@gmail.com', userId: user.email }
            flag = false;
            db.collection("friend_List").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots\
                    var USER = doc.data();
                    console.log(USER.userId);
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

            // db.collection('friend_List').forEach(doc => {
            //     var USER = doc.val();
            //     console.log(USER.userId);
            //     // if((USER.friendId === friendList.friendId && USER.userId === friendList.userId) || (USER.friendId === friendList.userId && USER.userId === friendList.friendId)){

            //     // }
            // });
            db.collection('friend_List').add(friendList).catch(error => {
                if (error) {
                    alert(error);
                }
                else {

                }
            });
        }
    });
}


























function getUserName() {
    return auth.currentUser.displayName;
}

function setUserName(user) {
    document.getElementById('userName').innerHTML = user.displayName;

}


function sendMessage() {
    var message = document.getElementById('txtMessage').value;
    saveMessage(message);
    document.getElementById('txtMessage').value = '';
    document.getElementById('txtMessage').focus();
}

function saveMessage(messageText) {
    return db.collection('messages').add({
        name: getUserName(),
        text: messageText,
        // profilePicUrl: getProfilePicUrl(),
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        time: new Date().toLocaleString()
    }).catch(function (error) {
        console.error('Error writing new message to Firebase Database', error);
    });
}

function loadMessages() {
    var query = db.collection('messages');
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                deleteMessage(change.doc.id);
            } else {
                var message = change.doc.data();
                displayMessage(message.time, message.name, message.text);
            }
        });
    });
}

function displayMessage(time, name, text) {
    var chatTime = time.split(',');

    var messageTemplate = `<div class="row no-gutters justify-content-end">
                                <div class="col-11 mr-2">
                                     <p class="sent"><small class="mr-3"><em id="senderName">${name}</em><span class="time float-right">${chatTime[1]}</span></small><br> ${text}</p>
                                </div>
                            </div>`;
    document.getElementById('messages').innerHTML += messageTemplate;
    document.getElementById('messages').scrollTo(0, 500000);
}

// function deleteMessage() {
//     db.collection("messages").delete().then(function () {
//         console.log("Document successfully deleted!");
//         document.getElementById('sent').innerHTML = 'This message is deleted';
//     }).catch(function (error) {
//         console.error("Error removing document: ", error);
//     });
// }





// function sendMessage() {
//     var cUser = getUser();
//     var message = `<div class="row no-gutters justify-content-end">
//                         <div class="col-11 mr-2">
//                             <p class="sent"><small class="mr-3"><em id="senderName"></em><span class="time float-right">12.34</span></small><br> ${document.getElementById('txtMessage').value}</p>
//                         </div>
//                     </div>`;
//     message.querySelector('.senderName').textContent = cUser;
//     document.getElementById('messages').innerHTML += message;
//     document.getElementById('txtMessage').value = '';
//     document.getElementById('txtMessage').focus();
//     document.getElementById('messages').scrollTo(0,500000);
// }
getUser();
loadMessages();
//${document.getElementById('senderName').setAttribute(getUser().displayName)}
//${document.getElementById('senderName').innerHTML = cUser}

