const Loader = ({ inComp = false }) => {
  return (
    <div
      className={`flex justify-center items-center py-1 ${inComp ? 'max-h-screen' : 'h-screen'}`}>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
    </div>
  );
};

export default Loader;
