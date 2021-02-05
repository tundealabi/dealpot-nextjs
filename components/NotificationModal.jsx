import { Button, Modal } from "react-bootstrap";
import { clearAllNotification } from "../lib/utils/notification-helper";

const NotificationModal = ({show, onHide, notifications, userId}) => {
    // console.log("notifications",notifications)
    const handleNotification = () => {
        clearAllNotification(userId);
        onHide();
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
            
                {notifications.length ?
                <> 
                <Modal.Body>
                <ul className="list-unstyled">
                {
                    notifications.map((notification,index)=> (
                    <li key={index} className="media">
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