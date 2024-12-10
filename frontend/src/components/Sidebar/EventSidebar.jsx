const EventSidebar = () => {
  const participants = [
    { id: 1, name: "ゾオンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/66fe0da9a5d64." },
    { id: 2, name: "フさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/64ae1c4903123." },
    { id: 3, name: "キエンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/62f8fc2d728e6." },
    { id: 4, name: "ヒエンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/630839279e38b." },
    { id: 5, name: "ルアンさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/6741fcdd6cafd." },
    { id: 6, name: "バオさん", avatar: "https://schooler.sun-asterisk.com/storage/images/avatar/student/63083b4681ab9." },
  ];

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      {/* Header */}
      <h1 className="text-center text-lg font-semibold bg-white py-2 px-4 rounded-md mb-4">
        参加者リスト ({participants.length})
      </h1>

      {/* Participant List */}
      <ul className="space-y-4">
        {participants.map((participant) => (
          <li key={participant.id} className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0">
              <img src={participant.avatar} alt={participant.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-md font-medium text-gray-700">{participant.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSidebar;
