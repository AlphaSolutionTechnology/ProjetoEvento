const AuthToggle = ({ isLogin, setIsLogin, setToastMessage, setFormData }) => {
    return (
      <div className="text-center mt-4">
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setToastMessage(null);
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }}
          className="text-blue-400 cursor-pointer hover:underline transition duration-300"
        >
          {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
        </span>
      </div>
    );
  };
  
  export default AuthToggle;