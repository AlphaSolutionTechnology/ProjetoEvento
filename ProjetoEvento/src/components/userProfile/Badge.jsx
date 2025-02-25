function Badge({ title, icon }) {
    return (
      <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
    );
  }
  
  export default Badge;
  