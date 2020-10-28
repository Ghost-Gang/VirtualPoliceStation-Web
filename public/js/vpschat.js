var chatKey = '';

function getUser() {
    auth.onAuthStateChanged(user => {
        if (user) {
            setUserName(user);
        }
        return user;
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
                                <div class="col-1">
                                    <img src="img/profile_placeholder.png" class="profile-pic" alt="">
                                </div>
                                <div class="col ml-2" style="cursor: pointer;">
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
                                <div class="col-2 col-sm-1">
                                    <img src="img/profile_placeholder.png" class="profile-pic" alt="">
                                </div>
                                <div class="col ml-sm-1" style="cursor: pointer;">
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

const sendMessageForm = document.getElementById('sendMessageForm');
sendMessageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    var messageContent = document.getElementById('txtMessage').value;
    if (messageContent) {
        var chatMessage = {
            message: messageContent,
            time: new Date().toLocaleString('en-IN', { hourCycle: 'h24' }),
            whichUser: auth.currentUser.email
        }
        db.collection('User-Details').doc('messages').collection(chatKey).add(chatMessage).catch(function (error) {
            console.log(error);
        });
        document.getElementById('messages').scrollTo(0, 1000000);
        document.getElementById('txtMessage').value = '';
        document.getElementById('txtMessage').focus();
        console.log(chatMessage.time);
    }
}

function chooseImage() {
    document.getElementById('img').click();
}

document.getElementById('img').addEventListener('change', onImageSelected);

function onImageSelected(event) {
    event.preventDefault();
    var file = event.target.files[0];
    document.getElementById('sendMessageForm').reset();
    if (!file.type.match("image.*")) {
        alert("Please select image only!!")
    }
    else {
        saveImage(file);
    }
}

// var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function saveImage(file) {
    var chatMessage = {
        imageUrl: '',
        time: new Date().toLocaleString(),
        whichUser: auth.currentUser.email
    }
    db.collection('User-Details').doc('messages').collection(chatKey).add(chatMessage).then(function (docRef) {
        var filePath = chatKey + '/' + docRef.id + '/' + file.name;
        return firebase.storage().ref(filePath).put(file).then(fileSnapshot => {
            return fileSnapshot.ref.getDownloadURL().then(url => {
                return docRef.update({
                    imageUrl: url,
                    storageUrl: fileSnapshot.metadata.fullPath
                });
            });
        });
    }).catch(function (error) {
        console.log(error);
    });
    document.getElementById('messages').scrollTo(0, 1000000);
    document.getElementById('txtMessage').value = '';
    document.getElementById('txtMessage').focus();
}

function loadMessages(chatK) {
    document.getElementById('messages').innerHTML = '';
    var query = db.collection('User-Details').doc('messages').collection(chatK).orderBy('time', 'asc');
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            var chatM = change.doc.data();
            displayMessage(chatM.time, chatM.whichUser, chatM.message, chatM.imageUrl);
        });
    });
}

function displayMessage(time, user, text, imageUrl) {
    var chatTime = time.split(',');
    if (imageUrl) msg = `<img src="${imageUrl}" class="img-fluid">`;
    else msg = text;
    if (user === auth.currentUser.email && msg !== undefined) {
        var messageTemplate = `<div class="row no-gutters justify-content-end">
                                    <div class="col-10 col-sm-8 col-md-6 mr-2 my-2 sent">                                        
                                        <div class="message-content">${msg}<small class="float-right">${chatTime[1]}</small></div>
                                    </div>
                                </div>`;
        document.getElementById('messages').innerHTML += messageTemplate;
    }
    else if (msg !== undefined) {
        var messageTemplate = `<div class="row no-gutters">
                                    <div class="col-10 col-sm-8 col-md-6 mr-2 my-2 receive">                                                                            
                                        <div class="message-content">${msg}<small class="float-right">${chatTime[1]}</small></div>
                                    </div>
                                </div>`;
        document.getElementById('messages').innerHTML += messageTemplate;
    }
    document.getElementById('messages').scrollTo(0, 1000000);
}

getUser();
populateFriendList();

