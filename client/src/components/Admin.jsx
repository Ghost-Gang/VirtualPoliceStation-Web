import React, { useEffect, useRef, useState } from 'react'
import '../css/vps-chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faPaperPlane, faBars } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { Modal } from 'react-bootstrap'
import $ from 'jquery'

function Admin(props) {
    // console.log(props);
    const [uid, setUid] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        // console.log('loadmessage called');
        loadUsers();
    }, []);

    firebase.auth().onAuthStateChanged(u => {
        // console.log(u);
        setUid(u.uid);
        // console.log(uid);
    });

    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            firebase.database().ref('messages').on('value', users => {
                // console.log(users.val());
                let userArray = Object.keys(users.val());
                // const userDetails = [];
                // userArray.forEach(user => {
                //     firebase.firestore().collection('User-Details').doc(user).get().then(doc => {
                //         // userDetails.push({
                //         //     email: doc.data().Email,
                //         //     name: doc.data().FName + doc.data().LName,
                //         //     uid: user
                //         // })
                //         userDetails.push(user);
                //     })
                // })
                // setUsers(userDetails);
                setUsers(userArray);
            })
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(users[0]);
    console.log(users[0]);
    console.log(users.length);



    const [oldMsgs, setOldMsgs] = useState([]);
    const loadMessages = async (uid) => {
        try {
            firebase.database().ref('messages').child(uid).on('value', chats => {
                // console.log(chats.exists());
                // console.log(chats.val());
                if (chats.val() != null) {
                    const values = Object.values(chats.val());
                    setOldMsgs(values);
                    document.getElementById('messages').scrollTo(0, 1000000);
                }
            })
        }
        catch (error) {
            console.log(error.message);
        }
        // console.log(uid);

    }
    // console.log(oldMsgs);
    const [cUser, setCUser] = useState('');
    const formRef = useRef(null);
    const [msg, setMsg] = useState('');
    const saveMsg = (e) => {
        e.preventDefault();
        formRef.current.reset();
        document.getElementById('messages').scrollTo(0, 1000000);
        firebase.database().ref('messages').child(cUser).push({
            uid: 'admin',
            message: msg,
            time: new Date().toLocaleString('en-IN', { hourCycle: 'h24' })
        }, (err) => {
            if (err) console.log(err.message);
            else {

                console.log('saved');
            }
        });
    }

    // save img
    const saveImg = e => {
        e.preventDefault()
        let file = e.target.files[0]
        if (!file.type.match('image.*')) {
            window.alert('choose image')
            // addToast('Only select images you FOOL', { appearance: 'error', autoDismiss: true });
        } else {
            firebase.storage().ref(file.name).put(file).then(async (fileSnapshot) => {
                const url = await fileSnapshot.ref.getDownloadURL();
                console.log(url, "url");
                return firebase.database().ref('messages').child(cUser).push({
                    uid: 'admin',
                    url: url,
                    time: new Date().toLocaleString('en-IN', { hourCycle: 'h24' })
                }, (err) => {
                    if (err) console.log(err.message);
                    else {
                        // $('#txtMessage').val('');
                        document.getElementById('txtMessage').value = '';
                        // formRef.current.reset();
                        document.getElementById('messages').scrollTo(0, 1000000);
                        // $("#messages").animate({ scrollTop: 100 }, "slow");
                        console.log('saved');
                    }
                });
            }).catch(err => {
                // addToast(err.message_, { appearance: 'error', autoDismiss: true });
                console.log(err.message)
            })
        }
    };
    // loadMessages(uid);
    function btnClick(cUserId) {
        handleClose();
        console.log(cUserId);
        console.log('btnclick called');
        setCUser(cUserId);
        loadMessages(cUserId);
        handleClose();
    }

    return (
        <div className="container-fluid chatbox py-3">
            <div className="row">
                <div className="col-md-4 pr-2 d-none d-md-block">
                    <div className="card">
                        <div className="card-header">
                            <input type="text" placeholder="search" className="form-control" />
                        </div>
                        <div className="card-body" style={{ padding: "10px" }}>
                            {users && users.map(user => <LItem key={user} user={user} btnClick={btnClick} />)}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8 pl-md-0 mx-auto">
                    <div className="card chat-card">
                        <div className="card-header">
                            <div className="form-row">
                                <div className="col-9 col-sm-10 pt-1">
                                    <div className="name">Admin</div>
                                </div>
                                <div className="col pt-1 d-md-none">
                                    <FontAwesomeIcon icon={faBars} style={{ cursor: 'pointer' }} onClick={handleShow} />
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <input type="text" placeholder="search" className="form-control" />
                                    </Modal.Header>
                                    <div className="card-body" style={{ padding: "10px" }}>
                                        {users && users.map(user => <LItem key={user} user={user} btnClick={btnClick} />)}
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className="card-body" id="messages">
                            {/* <!-- Sent messages --> */}
                            {oldMsgs && oldMsgs.map(message => message.uid == 'admin' ?
                                <AdminMessage key={Math.random()} message={message} /> :
                                <UserMessage key={Math.random()} message={message} />)}
                        </div>
                        {/* <!-- Type messages --> */}
                        <div className="card-footer px-2 px-sm-3">
                            <form ref={formRef} className="form-row" id="sendMessageForm" onSubmit={saveMsg}>
                                {/* <!-- File input --> */}
                                <div className="px-2 pt-2">
                                    <p><FontAwesomeIcon icon={faPaperclip} style={{ cursor: 'pointer' }} onClick={() => $('#img').trigger('click')} /><input className="d-none" type="file" id="img" accept="image/*" onChange={saveImg} /></p>
                                </div>
                                {/* <!-- Message input --> */}
                                <div className="col-9 col-sm-10">
                                    <input className="form-control mr-sm-2" type="text" id="txtMessage" placeholder="Message..." aria-label="Message" onChange={(e) => setMsg(e.target.value)} />
                                </div>
                                {/* <!-- Send Button --> */}
                                <div className="col" style={{ paddingTop: "3px" }}>
                                    <button className="btn-outline-primary btn-sm m-0 px-2 py-1">
                                        <FontAwesomeIcon icon={faPaperPlane} onClick={saveMsg} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );

}

const AdminMessage = (props) => {
    console.log(props);
    return props.message.url !== undefined ?
        (<div className="row no-gutters justify-content-end">
            <div className="col-10 col-sm-8 col-md-6 mr-2 my-2 sent">
                <div className="message-content"><img src={props.message.url} alt="uimg" className="img-fluid" /><small className="float-right">{props.message.time}</small></div>
            </div>
        </div>) :
        (<div className="row no-gutters justify-content-end">
            <div className="col-10 col-sm-8 col-md-6 mr-2 my-2 sent">
                <div className="message-content">{props.message.message}<small className="float-right">{props.message.time}</small></div>
            </div>
        </div>);
}
const UserMessage = (props) => {
    return props.message.url !== undefined ?
        (<div className="row no-gutters justify-content-flex-start">
            <div className="col-10 col-sm-8 col-md-6 mr-2 my-2 received">
                <div className="message-content"><img src={props.message.url} alt="uimg" className="img-fluid" /><small className="float-right">{props.message.time}</small></div>
            </div>
        </div>) :
        (<div className="row no-gutters justify-content-flex-start">
            <div className="col-10 col-sm-8 col-md-6 mr-2 my-2 received">
                <div className="message-content">{props.message.message}<small className="float-right">{props.message.time}</small></div>
            </div>
        </div>);
}
const LItem = (props) => {
    console.log(props);
    return (
        <li className="list-group-item list-group-item-action" onClick={() => props.btnClick(props.user)}>
            <div className="col ml-2" style={{ cursor: "pointer" }}>
                <div className="name">{props.user}</div>
            </div>
        </li>
    )
}
export default Admin
