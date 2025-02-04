// src/components/notification/NotificationItem.jsx
function NotificationItem({ notification, onConfirm, onDeny }) {
    return (
      <div className="flex p-4 border-b hover:bg-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full">
            {notification.name?.charAt(0) || "?"}
          </div>
          <div className="flex-1">
            <p className="font-semibold">
              {notification.name?.split(" ")[0] || "Desconhecido"}
            </p>
            <p className="text-sm text-gray-600">
              {notification.name?.split(" ")[1] || ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-1 text-white bg-blue-500 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                onConfirm(notification.userId);
              }}
            >
              Aceitar
            </button>
            <button
              className="px-4 py-1 text-white bg-red-500 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                onDeny(notification.userId);
              }}
            >
              Negar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotificationItem;
  