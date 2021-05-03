import React, { useEffect, useRef, useState } from 'react'
import '../css/vps-chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { auth, database, myFirebase } from './Firebase'
import $ from 'jquery'

function VpsChat() {
    const [uid, setUid] = useState('');
    let [oldMsgs, setOldMsgs] = useState([]);
    const formRef = useRef(null);
    let [msg, setMsg] = useState('');
    // let [newMsgs, setNewMsgs] = useState([]);
    // let [finalMsgs, setFinalMsgs] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(u => {
            setUid(u.uid);
        });
        loadMessages();
        // eslint-disable-next-line
    }, [uid]);

    const loadMessages = async () => {
        if (uid !== "") {
            try {
                await myFirebase.database().ref('messages').child(uid).on('value', chats => {
                    if (chats.val() != null) {
                        const values = Object.values(chats.val());
                        setOldMsgs(values);
                        document.getElementById('messages').scrollTo(0, 1000000);
                        // document.getElementById('view').scrollIntoView();
                    }
                })
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }


    // const loadNewMessages = async () => {
    //     try {
    //         database.ref('messages').child(uid).on('value', chats => {
    //             // console.log(chats.exists());
    //             // console.log(chats.val());
    //             if (chats.val() != null) {
    //                 let values = Object.values(chats.val())
    //                 // console.log("new msgs");
    //                 // setNewMsgs(values);
    //                 // console.log(values, 'values');
    //                 // setFinalMsgs(values.filter(a => !oldMsgs.map(b => b.time).includes(a.time)))
    //                 // console.log(oldMsgs, 'old msgs');
    //                 // c.filter(n => !d.map(k => k.time).includes(n.time))
    //                 // final
    //                 // console.log(values.filter(n => !oldMsgs.map(k => k.time).includes(n.time)), 'check for final msgs')
    //                 // if (oldMsgs.length != 0) {
    //                 setNewMsgs(values.filter(n => !oldMsgs.map(k => k.time).includes(n.time)), 'check for final msgs')
    //                 // }
    //                 document.getElementById('messages').scrollTo(0, 1000000)

    //                 // console.log(newMsgs);
    //             }
    //         })
    //     }
    //     catch (error) {
    //         console.log(error.message);
    //     }
    // }
    // console.log(oldMsgs);
    // console.log(newMsgs);
    // console.log(oldMsgs.filter(n => newMsgs.includes(n)));
    // console.log(newMsgs.filter(n => !oldMsgs.includes(n)));
    // setFinalMsgs(newMsgs.filter(a => !oldMsgs.map(b => b.time).includes(a.time)))

    const saveMsg = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            await database.ref('messages').child(uid).push({
                uid: uid,
                message: msg,
                time: new Date().toLocaleString('en-IN', { hourCycle: 'h24' })
            })
        } catch (err) {
            if (err) console.log(err.message);
            else {
                document.getElementById('messages').scrollTo(0, 1000000);
                // document.getElementById('view').scrollIntoView();
            }
        }
    }

    const saveImg = e => {
        e.preventDefault()
        let file = e.target.files[0]
        if (!file.type.match('image.*')) {
            window.alert('choose image')
            // addToast('Only select images you FOOL', { appearance: 'error', autoDismiss: true });
        } else {
            myFirebase.storage().ref(file.name).put(file).then(async (fileSnapshot) => {
                const url = await fileSnapshot.ref.getDownloadURL();

                return database.ref('messages').child(uid).push({
                    uid: uid,
                    url: url,
                    time: new Date().toLocaleString('en-IN', { hourCycle: 'h24' })
                }, (err) => {
                    if (err) console.log(err.message);
                    else {
                        document.getElementById('txtMessage').value = '';
                        // formRef.current.reset();
                        document.getElementById('messages').scrollTo(0, 1000000);
                        // document.getElementById('view').scrollIntoView();
                        console.log('saved');
                    }
                });
            }).catch(err => {
                // addToast(err.message_, { appearance: 'error', autoDismiss: true });
                console.log(err.message)
            })
        }
    };

    // function saveImg(e) {
    //     console.log(e.target.files[0]);
    //     if (e.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             $('#blah').attr('src', e.target.result);
    //         }
    //         reader.readAsDataURL(e.target.files[0]); // convert to base64 string
    //     }
    // }


    // console.log(newMsgs);
    // console.log(newMsgs.filter(n => !oldMsgs.map(k => k.time).includes(n.time)));


    return (
        <div className="container-fluid chatbox">
            <div className="row">
                <div className="col-12 col-md-7 pl-md-0 mx-auto py-3">
                    <div className="card chat-card">
                        <div className="card-header">
                            <div className="text-center"><h4>Virtual Police Station Admin</h4></div>
                        </div>
                        <div className="card-body" id="messages">
                            {oldMsgs && oldMsgs.map(message => message.uid === 'admin' ?
                                <AdminMessage key={Math.random()} message={message} /> :
                                <UserMessage key={Math.random()} message={message} />)}
                            <span id='view'></span>
                            {/* {newMsgs && newMsgs.filter(n => !oldMsgs.map(k => k.time).includes(n.time)).map(message => message.uid == 'admin' ?
                                <AdminMessage key={Math.random()} message={message} /> :
                                <UserMessage key={Math.random()} message={message} />)} */}
                        </div>
                        {/* <!-- Type messages --> */}
                        <div className="card-footer px-2 px-sm-3">
                            <form ref={formRef} className="form-row" id="sendMessageForm" onSubmit={saveMsg}>
                                <div className="col pt-2 ml-md-1 pr-0">
                                    <FontAwesomeIcon icon={faPaperclip} onClick={() => $('#img').trigger('click')} id='paper-clip' /><input className="d-none" type="file" id="img" accept="image/*" onChange={saveImg} />
                                </div>
                                <div className="col-9 col-sm-10 pl-0">
                                    <input className="form-control mr-sm-2" type="text" value={msg} id="txtMessage" placeholder="Message..." aria-label="Message" onChange={(e) => setMsg(e.target.value)} />
                                </div>
                                <div className="col pt-1">
                                    <FontAwesomeIcon icon={faArrowAltCircleRight} onClick={saveMsg} id='send-arrow' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
const UserMessage = (props) => {
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
const AdminMessage = (props) => {
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

export default VpsChat
