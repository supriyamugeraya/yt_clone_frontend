const CustomButton = ({ buttonName, onClick, type = "button" }) => {
  return (
    <>
      <button
        type={type}
        className="bg-[#222222] text-white w-full rounded-md text-center py-[4px] text-[22px]"
        onClick={onClick}
      >
        {buttonName}
      </button>
    </>
  );
};
export { CustomButton };
