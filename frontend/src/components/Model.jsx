const Model = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex z-50 w-full h-full">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
            {/* Modal content */}
            <div className="absolute top-[50%] right-[50%]  bg-black p-4 rounded-lg z-10" style={{top: "40%", left: "30%"}}>
            <button
              className="text-black hover:text-gray-700 font-semibold focus:outline-none w-full" style={{alignItems: "right"}}
              onClick={onClose}
            >
              X
            </button>
            <div>{children}</div> {/* Render children inside the modal */}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
