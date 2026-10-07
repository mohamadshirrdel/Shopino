const UserProfile = ({ name, roles }) => {
  return (
    <div className="flex-ic gap-1.5">
      <img
        src="/assets/static/user.svg"
        className="size-10 rounded-full"
        alt={name}
      />
      <div className="space-y-0.5 ">
        <p className="text-xs text-slate-700">
          <strong>{name || "کاربر شاپینو"}</strong>
        </p>
        <p className="text-xs text-slate-400 select-none font-light">
          {roles.includes("ADMIN") || roles.includes("SELLER")
            ? "فروشنده"
            : "کاربر"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
