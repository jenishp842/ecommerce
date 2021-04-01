import React, { Component } from "react";
import ndoc from "../assets/img/ndoc.png";
import moment from "moment";

class Notification extends Component {
  render() {
   console.log(this.props.notification)
   const {notification, notificationRoute, seeAll, markAllRead, markRead} = this.props;
    return (
      <>
        <ul className="dropdown-menu dropdown-alerts notification show" style={{maxHeight: '400px',overflow: 'auto'}}>
          <li>
                                  
            <a className="dropdown-item txt-org text-right f-14 f-m mt-3 float-right" onClick={(e) => {markAllRead();e.stopPropagation()}} style={{width: 'auto'}}><u>Mark
              All As Read</u></a>
          </li>
          {notification.list && notification.list.map(e => {
        return <li onClick={() => {notificationRoute(e);markRead(e._id)}}>
         <a className="dropdown-item" style={e.isRead ? {width: 'auto',background: '#eee'}:{width: 'auto',background: '#fff'}}>
           <div className="d-flex">
             <img className="mr-3 nimg" src={ndoc} />
             <div className="f-16 f-m ">
               <span>{e.description}</span><br />
               <span className="text-muted f-14">{moment(e.at).fromNow()}</span>
             </div>
           </div>
         </a>
       </li>
          })}
          <li>
            <div className="text-center link-block">
              <a className="dropdown-item" onClick={seeAll}>
                <strong className="f-16 txt-org"><u>See All</u> </strong>
                {/* <i className="fa fa-angle-right"></i> */}
              </a>
            </div>
          </li>
        </ul>
      </>
    );
  }
}

export default Notification;
