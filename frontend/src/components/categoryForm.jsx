const CategoryForm = ({ value, setValue, handleSubmit, buttonText = 'Submit', handleDelete }) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="focus:border-pink-600 focus:border-1  focus:shadow-slate-500 focus:shadow-sm h-5 px-2 mb-4 mt-2 py-5 border rounded w-full bg-black text-white"
          placeholder="Write Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          {/* Submit Button */}
          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>

          {/* Delete Button */}
          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete} // Use onClick instead of onSubmit for a button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
