import React from "react";
import Email from "../../Email/email";
import "../../allmail.css";

const AllMail = (props) => { 

    const [importantEmail, setImportantEmails] = React.useState([])
    const [inboxEmail, setInboxEmails] = React.useState([])
    const [archivedEmail, setArchivedEmails] = React.useState([])

    React.useEffect( () => {
        try{
            props.setView_name("AllMail")}
        catch{}
        fetch("https://127.0.0.1:8000/emails/important", {
            method:"POST",
            body: JSON.stringify({
                email:props.user.username,
                password:props.user.password
        })
    } ).then(
        response => response.json()
        ).then(response => setImportantEmails(response))
    }, [])

    React.useEffect( () => {
        fetch("https://127.0.0.1:8000/emails/inbox", {
            method:"POST",
            body: JSON.stringify({
                email:props.user.username,
                password:props.user.password
        })
    } ).then(
        response => response.json()
        ).then(response => setInboxEmails(response))
    }, [])

    React.useEffect( () => {
        fetch("https://127.0.0.1:8000/emails/archive", {
            method:"POST",
            body: JSON.stringify({
                email:props.user.username,
                password:props.user.password
        })
    } ).then(
        response => response.json()
        ).then(response => setArchivedEmails(response))
    }, [])

    const important_email_list = importantEmail.map(email=>{
        return (
            <div onClick={()=>props.changeview(<Email raiseCompose={props.raiseCompose} setView_name={props.setView_name} email={email} changeview={props.changeview} back={<AllMail setView_name={props.setView_name} raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user}/>} />)} style={{backgroundColor:email.read?"#dedede":"white", borderColor:"yellow"}} id={email.id} className="email_rep">
                <div className="email_info_rep">
                    <div className="email_sender_rep">
                        {email.sender}
                    </div>
                    <div className="email_sent_time_rep">
                        {email.timestamp.split(",")[1]}
                    </div>
                </div>
                <div className="email_info_2_rep">
                    <div className="email_body_rep">
                        <span id="email_subject_rep">{email.subject}:</span> {email.body}
                    </div>
                    <div className="email_sent_date_rep">
                        {email.timestamp.split(",")[0]}
                    </div>
                </div>
                
            </div>
        )}
    )

    const inbox_email_list = inboxEmail.map(email=>{
        return (
            <div onClick={()=>props.changeview(<Email raiseCompose={props.raiseCompose} setView_name={props.setView_name} email={email} changeview={props.changeview} back={<AllMail setView_name={props.setView_name} raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user}/>} />)} style={{backgroundColor:email.read?"#dedede":"white"}} id={email.id} className="email_rep">
                <div className="email_info_rep">
                    <div className="email_sender_rep">
                        {email.sender}
                    </div>
                    <div className="email_sent_time_rep">
                        {email.timestamp.split(",")[1]}
                    </div>
                </div>
                <div className="email_info_2_rep">
                    <div className="email_body_rep">
                        <span id="email_subject_rep">{email.subject}:</span> {email.body}
                    </div>
                    <div className="email_sent_date_rep">
                        {email.timestamp.split(",")[0]}
                    </div>
                </div>
                
            </div>
        )}
    )

    const archived_email_list = archivedEmail.map(email=>{
        return (
            <div onClick={()=>props.changeview(<Email raiseCompose={props.raiseCompose} setView_name={props.setView_name} email={email} changeview={props.changeview} back={<AllMail setView_name={props.setView_name} raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user}/>} />)} style={{backgroundColor:email.read?"#dedede":"white", borderColor:"green"}} id={email.id} className="email_rep">
                <div className="email_info_rep">
                    <div className="email_sender_rep">
                        {email.sender}
                    </div>
                    <div className="email_sent_time_rep">
                        {email.timestamp.split(",")[1]}
                    </div>
                </div>
                <div className="email_info_2_rep">
                    <div className="email_body_rep">
                        <span id="email_subject_rep">{email.subject}:</span> {email.body}
                    </div>
                    <div className="email_sent_date_rep">
                        {email.timestamp.split(",")[0]}
                    </div>
                </div>
                
            </div>
        )}
    )

    function name_search () {
    
        var input, filter;
        input = document.querySelector("#name_search");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".email_sender_rep").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.parentElement.style.display="";
            }
            else {
                name.parentElement.parentElement.style.display="none";
            }
        } )
    }

    function subject_search () {
    
        var input, filter;
        input = document.querySelector("#subject_search");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".email_body_rep").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.parentElement.style.display="";
            }
            else {
                name.parentElement.parentElement.style.display="none";
            }
        } )
    }

    return(
        <div className="mails">
            <div className="mailbox_name">
                All mail
            </div>
            <div id="search">
                <div className="left_div">
                    Search:                        
                </div>
                <div className="right_div">
                    <div className="searchbar">
                        <input type="text" onChange={name_search} id="name_search" name="name_search" autoComplete="off" autoSave="off" placeholder="&#x1F50E;&#xFE0E;Search for name"/>
                    </div>
                    <hr/>
                    <div className="searchbar">
                        <input type="text" onChange={subject_search} id="subject_search" name="subject_search" autoComplete="off" autoSave="off" placeholder="&#x1F50E;&#xFE0E;Search for content"/>
                    </div>
                </div> 
            </div>
            <div id="allmail">
                <div id="left_mail">
                    <div id="important_email">
                        <div className="mailbox_name">
                            Important Mails
                        </div>
                        <div className="email_list">
                            {important_email_list}
                        </div>
                    </div>
                </div>
                <div id="right_mail">
                    <div id="inbox_email">
                        <div className="mailbox_name">
                            Inbox Mails
                        </div>
                        <div className="email_list">
                            {inbox_email_list}
                        </div>
                    </div>
                    <div id="archived_email">
                        <div className="mailbox_name">
                            Archived Mails
                        </div>
                        <div className="email_list">
                            {archived_email_list}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllMail