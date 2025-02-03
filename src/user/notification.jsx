import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "./header/backHeader";

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "primary",
      title: "Message Title Here",
      description: "Message description here Message description here Message description here Message description here Message description here Message description here",
      info: "Any Info Text",
      date: "20 Jan, 2020 at 10:30 PM",
    },
    {
      id: 2,
      type: "info",
      title: "Message Title Here",
      description: "Message description here Message description here Message description here Message description here Message description here Message description here",
      info: "Any Info Text",
      date: "20 Jan, 2020 at 10:30 PM",
    },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container notification-section mt-3">
      <BackHeader handleBack={handleBack} title="Notification" />
      <div className="card border-0">
        <div className="card-body rounded">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="d-md-flex d-sm-block justify-content-between align-items-start mb-3"
              >
                <span
                  className="message-close"
                  onClick={() => handleRemoveNotification(notification.id)}
                >
                  <i className="bi bi-x-square fs-2"></i>
                </span>
                <div className="mx-4">
                  <a className={`btn btn-${notification.type} text-white py-1 mb-2`}>Message Type</a>
                  <h3>{notification.title}</h3>
                  <p>{notification.description}</p>
                  <h6 className="text-danger">{notification.info}</h6>
                </div>
                <h6 className="date">
                  <i className="bi bi-clock"></i> {notification.date}
                </h6>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h4>No notifications available</h4>
              <p>You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;