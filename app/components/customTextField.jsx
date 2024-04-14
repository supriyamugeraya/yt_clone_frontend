import { FaEnvelope } from "react-icons/fa6";
const CustomTextField = ({
  label,
  type,
  placeholder,
  icon,
  isRequired = false,
  value,
  name,
  onValueChange,
}) => {
  return (
    <>
      <div className="flex flex-row space-x-1 py-2 border-b-2 border-black items-center w-full">
        <div className="flex flex-col space-y-1 w-full ">
          <label htmlFor="">{label}</label>
          <input
            name={name}
            value={value}
            onChange={(e) => onValueChange(e) ?? null}
            required={isRequired}
            type={type}
            placeholder={placeholder}
            className="outline-none border-none bg-transparent w-full placeholder:text-slate-200"
          />
        </div>
        {icon}
      </div>
    </>
  );
};
export { CustomTextField };
