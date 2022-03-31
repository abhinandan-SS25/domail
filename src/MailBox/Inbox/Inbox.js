import React from 'react';
import SideBar from "./SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import AllMail from "./Views/Allmail/AllMail";
import Compose from "../Compose/Compose";

const Inbox = (props) => {

    const [view, setView] = React.useState(<AllMail user={props.user} />)
    const [view_name, setView_name] = React.useState("AllMail")
    
    return (
        <div id="inbox">
            {props.composeVisible.visible && <Compose user={props.user} raiseCompose={props.setComposeVisible} preBody={props.composeVisible.preBody} preSubject={props.composeVisible.preSubject} preRecipients={props.composeVisible.preRecipients} preImportant={props.composeVisible.preImportant} nosave={props.composeVisible.nosave} nosavename={props.composeVisible.nosavename}/>}
            <TopBar raiseCompose={props.setComposeVisible} changeview={setView} view_name={view_name} setView_name={setView_name} view={view} user={props.user} />
            <div id="emails">
                {view}
            </div>
            <SideBar raiseCompose={props.setComposeVisible} Contacts={props.contacts} contacted={props.contacted} groups={props.groups} profile={props.profile} user={props.user}/>
        </div>
    )
}

export default Inbox