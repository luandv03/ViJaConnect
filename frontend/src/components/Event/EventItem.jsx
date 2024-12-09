// eslint-disable-next-line react/prop-types
const EventItem = ({ event }) => {
  // eslint-disable-next-line react/prop-types
  const { name, date, banner } = event;

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 mb-5">
      {/* Header: Tên và ngày */}
      <div className="flex flex-col mb-3">
        <span className="text-lg font-medium text-gray-800">{name}</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>

      {/* Banner */}
      <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-md">
        {/* <span className="text-gray-500 text-sm">イベントバナー</span> */}
        <img src={banner} alt="event banner" className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Footer: Nút */}
      <div className="mt-2 text-right">
        <button className="text-sm text-blue-500 hover:underline">
          もっと見る...
        </button>
      </div>
    </div>
  );
};

export default EventItem;
