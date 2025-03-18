import React from "react";
import { motion } from "framer-motion";
import AlertToast from "../components/alert/AlertToast";
import AuthHeader from "../components/auth/AuthHeader";
import AuthForm from "../components/auth/AuthForm";
import AuthToggle from "../components/auth/AuthToggle";
import GoogleSignIn from "../components/auth/GoogleSignIn";
import useAuthForm from "../hooks/useAuthForm";

const LoginPage = () => {
  const {
    isLogin,
    setIsLogin,
    formData,
    handleChange,
    handleLogin,
    handleRegister,
    loading,
    toastMessage,
    setToastMessage,
    setFormData,
  } = useAuthForm();

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900 overflow-hidden">
      <AuthHeader 
        isLogin={isLogin} 
        setIsLogin={setIsLogin}
        setToastMessage={setToastMessage}
        setFormData={setFormData}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-11/12 sm:w-3/4 lg:w-1/3 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-2xl border border-white/10"
      >
        <AuthForm
          isLogin={isLogin}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={isLogin ? handleLogin : handleRegister}
          loading={loading}
        />

        <AuthToggle
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setToastMessage={setToastMessage}
        />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400">ou</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center"
        >
          <GoogleSignIn />
        </motion.div>
      </motion.div>

      {toastMessage && (
        <AlertToast
          open={!!toastMessage}
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default LoginPage;