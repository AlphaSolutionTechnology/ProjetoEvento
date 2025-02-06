import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

const AlertToast = ({ open, message, type, onClose }) => {
  if (!open) return null;

  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <AlertTriangle className="text-red-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 right-4 flex items-center gap-3 p-4 rounded-xl shadow-lg 
            ${type === "success" ? "bg-green-50" : type === "error" ? "bg-red-50" : "bg-yellow-50"}
            border ${type === "success" ? "border-green-400" : type === "error" ? "border-red-400" : "border-yellow-400"}
          `}
        >
          {icons[type]}
          <span className="text-sm">{message}</span>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-500 hover:text-black" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToast;
