import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../providers/EventProvider";

const EventSidebar = () => {
  const { participants, refreshParticipants } = useEvent();
  const { eventId } = useParams();
  useEffect(() => {
    refreshParticipants(eventId);
}, [eventId, refreshParticipants]);

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      {/* Header */}
      <h1 className="text-center text-lg font-semibold bg-white py-2 px-4 rounded-md mb-4">
        参加者リスト ({participants.length})
      </h1>

      {/* Participant List */}
      <ul className="space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] scrollbar-hide p-4 rounded-lg shadow">
        {participants.map((participant) => (
          <li key={participant._id} className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0">
              <img src={participant.avatar_link} alt={participant.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-md font-medium text-gray-700">{participant.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSidebar;
