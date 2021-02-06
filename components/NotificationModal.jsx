import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { clearAllNotification } from "../lib/utils/notification-helper";

const NotificationModal = ({show, onHide, notifications, userId}) => {
    const [ notificationContent, setNotificationContent ] = useState([]);
    const [ notificationIsupdated, setNotificationIsUpdated ] = useState(false);
    useEffect(()=>{
        if( !notificationIsupdated ){
            setNotificationContent(notifications)
          }
          if(notificationIsupdated && !notifications.length){
            setNotificationIsUpdated(false);
          }
    },[ notifications ])
    const handleNotification = () => {
        clearAllNotification(userId).then(result => {
            if(result.data.message){
                setNotificationContent([]);
                setNotificationIsUpdated(true);
            }
        })
        
        // onHide();
    }
    return (
            <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Notification
            </Modal.Title>
            </Modal.Header>
            
                {notificationContent.length ?
                <> 
                <Modal.Body>
                <ul className="list-unstyled">
                {
                    notificationContent.map((notification,index)=> (
                    <li key={index} className="media border-bottom">
                        <img src={notification.img} alt="product image" className="mr-3" style={{width:"10%"}}/>
                        <div className="media-body">
                            {notification.message}
                        </div>
                    </li>
                ))
                }
            </ul>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleNotification}>Clear all notifications</Button>
            </Modal.Footer>
            </>
              :
              <Modal.Body>
              <h3>You don't have any notification</h3>
              </Modal.Body>
            }  
        </Modal>
    )
}

export default NotificationModal;