import { IconCalendarMonth, IconMapPinFilled } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { eventService } from "../../services/event.service";
import { formatDate } from "../../helpers/formatDate";

function compareDateTime(inputDate) {
    const currentDate = new Date(); // 🌟 Lấy thời gian hiện tại
    const targetDate = new Date(inputDate); // 🎯 Chuyển string thành Date object

    // 🧮 So sánh timestamp
    const currentTimestamp = Math.floor(currentDate.getTime() / 60000); // 🌟 Đổi ra phút
    const targetTimestamp = Math.floor(targetDate.getTime() / 60000); // 🌟 Đổi ra phút

    if (currentTimestamp <= targetTimestamp) {
        console.log("new");
        return "new"; // 🔵 Trùng thời gian đến phút
    } else if (targetTimestamp < currentTimestamp) {
        console.log("past");
        return "past"; // 🔴 Quá khứ
    }
}

function EventTab({ profile, showEventCancelModal }) {
    const [events, setEvents] = useState([]);

    const handleGetEvents = async () => {
        if (profile?.role_id?.name == "Staff") {
            const res = await eventService.fetchEventsUserJoined(profile?._id);
            console.log(res.data);
            setEvents(res.data);
        } else {
            const res = await eventService.fetchEventsUserCreated(profile?._id);
            setEvents(res.data);
        }
    };

    const handleLeaveEvent = async (eventId) => {
        const res = await eventService.leaveEvent(eventId, profile?._id);

        if (res.status === 200) {
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event._id !== eventId)
            );
        }
    };

    // const handleCancelEvent = async (eventId) => {
    //     const res = await eventService.cancelEvent(eventId);

    //     if (res.status === 200) {
    //         setEvents((prevEvents) =>
    //             prevEvents.filter((event) => event._id !== eventId)
    //         );
    //     }
    // };

    useEffect(() => {
        handleGetEvents();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <div>
                    <button className="p-2 bg-alice-blue flex justify-center items-center rounded-full ">
                        今後の
                    </button>
                </div>
                {events.length > 0 ? (
                    events.filter(
                        (event) =>
                            compareDateTime(event.date) == "new" &&
                            event.status == "active"
                    ).length > 0 ? (
                        events
                            .filter(
                                (event) =>
                                    compareDateTime(event.date) == "new" &&
                                    event.status == "active"
                            )
                            .map((event) => (
                                <div
                                    key={event._id}
                                    className="flex space-x-4 items-center"
                                >
                                    <div className="flex flex-1 flex-col p-2 bg-alice-blue rounded-xl space-y-2">
                                        <div className="flex space-x-2">
                                            <div className="text-center">
                                                <span>{event?.title}</span>
                                            </div>
                                            {/* <div>
                                                <span>{event?.title}</span>
                                            </div> */}
                                        </div>

                                        <div className="flex space-x-2">
                                            <div>
                                                <IconCalendarMonth />
                                            </div>
                                            <div>
                                                <span>
                                                    {event?.date
                                                        ? formatDate(
                                                              event?.date
                                                          )
                                                        : "日付が不明です"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <div>
                                                <IconMapPinFilled />
                                            </div>
                                            <div>
                                                <span>{event?.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {profile?.role_id?.name === "Staff" ? (
                                            <button
                                                className="p-2 bg-alice-blue flex justify-center items-center rounded-full hover:bg-gray-400"
                                                onClick={() =>
                                                    handleLeaveEvent(event._id)
                                                }
                                            >
                                                参加をやめる
                                            </button>
                                        ) : (
                                            <button
                                                className="p-2 bg-alice-blue flex justify-center items-center rounded-full hover:bg-gray-400"
                                                onClick={() =>
                                                    showEventCancelModal(
                                                        event?._id
                                                    )
                                                }
                                            >
                                                キャンセル
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>イベントがありません</div>
                    )
                ) : (
                    <div>イベントがありません</div>
                )}
            </div>

            {/* divider */}
            <div>
                <div className="border-b-2 border-alice-blue"></div>
            </div>

            <div className="space-y-4">
                <div>
                    {profile?.role_id?.name === "Staff" ? (
                        <button className="p-2 bg-alice-blue flex justify-center items-center rounded-full ">
                            参加した
                        </button>
                    ) : (
                        <button className="p-2 bg-alice-blue flex justify-center items-center rounded-full ">
                            作成した
                        </button>
                    )}
                </div>
                {events.length > 0 ? (
                    events.filter(
                        (event) =>
                            compareDateTime(event.date) === "past" ||
                            event.status == "inactive"
                    ).length > 0 ? (
                        events
                            .filter(
                                (event) =>
                                    compareDateTime(event.date) === "past" ||
                                    event.status == "inactive"
                            )
                            .map((event) => (
                                <div
                                    key={event?._id}
                                    className="flex space-x-4 items-center "
                                >
                                    <div className="flex flex-1 flex-col p-2 bg-alice-blue rounded-xl space-y-2">
                                        <div className="flex space-x-2">
                                            <div className="text-center">
                                                <span>{event?.title}</span>
                                            </div>
                                            {/* <div>
                                                <span>{event?.title}</span>
                                            </div> */}
                                        </div>

                                        <div className="flex space-x-2">
                                            <div>
                                                <IconCalendarMonth />
                                            </div>
                                            <div>
                                                <span>
                                                    {event?.date
                                                        ? formatDate(
                                                              event?.date
                                                          )
                                                        : "日付が不明です"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <div>
                                                <IconMapPinFilled />
                                            </div>
                                            <div>
                                                <span>{event?.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div>イベントがありません</div>
                    )
                ) : (
                    <div>イベントがありません</div>
                )}
            </div>
        </div>
    );
}
EventTab.propTypes = {
    profile: PropTypes.shape({
        _id: PropTypes.string,
        role_id: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    showEventCancelModal: PropTypes.func.isRequired,
};

export default EventTab;
