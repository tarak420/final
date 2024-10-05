// src/components/NotificationContainer.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../../features/notifications/notificationSlice';


const Notification = ({ message, id, type }) => {
  const dispatch = useDispatch();

  // Automatically remove the notification after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  return (
    <div className={`notification ${type} p-4 mb-2 rounded shadow-lg bg-gray-200 text-green-700 text-[16px]`}>
      <span>{message}</span>
      <button onClick={() => dispatch(removeNotification(id))} className="ml-4">
        ✕
      </button>
    </div>
  );
};

const NotificationContainer = () => {
  const notifications = useSelector((state) => state.notifications.notifications);

  return (
    <div className="fixed top-[10em] right-0 p-6  z-[2000]">
      {notifications.map((notif) => (
        <Notification key={notif.id} {...notif} />
      ))}
    </div>
  );
};

export default NotificationContainer;
