import React, { Fragment, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";

import "react-big-calendar/lib/css/react-big-calendar.css"; // Import CSS của react-big-calendar
import { getAllSchedule } from "../../../../services/adminService";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const Schedule = ({ localizer = mLocalizer, ...props }) => {
  const dispatch = useDispatch();

  const scheduleOfVet = useSelector((state) => state.admin.data.scheduleOfAll);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(getAllSchedule());
  }, [dispatch]);

  // Hàm để xác định ngày có sẵn từ dữ liệu lịch trình
  const getAvailableDays = (schedule) => {
    return schedule.map((item) => item.availableDate);
  };

  // Hàm để tạo ra danh sách các ngày trong năm mà bác sĩ có sẵn
  const getAvailableDatesInYear = (year, availableDays, schedule) => {
    const events = [];
    const startDate = moment().year(year).startOf("year");
    const endDate = moment().year(year).endOf("year");

    for (let m = startDate; m.isBefore(endDate); m.add(1, "days")) {
      const currentDay = m.format("dddd");

      if (availableDays.includes(currentDay)) {
        // Tìm lịch trình tương ứng với ngày hiện tại
        const scheduleForDate = schedule.find(
          (item) => item.availableDate === currentDay
        );

        // Hiển thị mỗi username và giờ làm việc
        const title =
          scheduleForDate && scheduleForDate.veterinarianProfiles ? (
            <div>
              {scheduleForDate.veterinarianProfiles.map((vet) => (
                <div key={vet.username} className="pb-2">
                  <strong>{vet.username}</strong> <br />
                  {/* <span>Start time: {scheduleForDate.startTime}</span> <br />
                  <span>End time: {scheduleForDate.endTime}</span> */}
                </div>
              ))}
            </div>
          ) : (
            "No veterinarian available"
          );

        events.push({
          title: title,
          start: m.toDate(),
          end: m.toDate(),
          resource: scheduleForDate,
        });
      }
    }
    return events;
  };

  useEffect(() => {
    if (scheduleOfVet) {
      // Khi dữ liệu đã tải xong, tạo danh sách events
      const availableDays = getAvailableDays(scheduleOfVet);
      const generatedEvents = getAvailableDatesInYear(
        new Date().getFullYear(),
        availableDays,
        scheduleOfVet
      );
      setEvents(generatedEvents);
    }
  }, [scheduleOfVet]);

  // Tùy chỉnh cách hiển thị event trong chế độ "agenda" để hiển thị giờ
  const EventAgenda = ({ event }) => {
    const startTime = event.resource.startTime;
    const endTime = event.resource.endTime;

    return (
      <div>
        {startTime && endTime ? (
          <span>{`${startTime} - ${endTime}`}</span>
        ) : (
          "No Time Available"
        )}
      </div>
    );
  };

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
        agenda: {
          time: EventAgenda,
        },
      },
      defaultDate: new Date(),
      max: moment().endOf("day").toDate(),
      views: ["month", "agenda"], // Chỉ để lại view "month" và "agenda"
    }),
    []
  );

  return (
    <Fragment>
      <div className="h-full w-full p-5 bg-white" {...props}>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Schedule</h1>
        <div className="h-screen w-full">
          <Calendar
            components={components}
            defaultDate={defaultDate}
            localizer={localizer}
            max={max}
            events={events} // Dữ liệu sự kiện từ các ngày có sẵn
            showMultiDayTimes
            step={60}
            views={views}
            className="h-full w-full bg-gray-50 rounded-lg shadow-inner"
          />
        </div>
      </div>
    </Fragment>
  );
};

Schedule.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

export default Schedule;
