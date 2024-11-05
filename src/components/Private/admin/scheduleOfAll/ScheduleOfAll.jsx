import React, { Fragment, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Calendar, DateLocalizer, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllSchedule } from "../../../../services/adminService";

// Tạo 1 object để chuyển đổi ngày/thời gian cho thư viện react-big-calendar
const mLocalizer = momentLocalizer(moment);

// Tạo màu nền cho các ô ngày
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

  // Tạo 1 mảng các ngày trong tuần từ lịch trình có sẵn (scheduleOfVet)
  const getAvailableDays = (schedule) => {
    return schedule.map((item) => item.availableDate);
  };

  const getAvailableDatesInYear = (year, availableDays, schedule) => {
    const events = [];
    const startDate = moment().year(year).startOf("year");
    const endDate = moment().year(year).endOf("year");

    // Duyệt từng ngày trong 1 năm
    for (
      let m = startDate;
      m.isBefore(endDate) || m.isSame(endDate, "day");
      m.add(1, "days")
    ) {
      const currentDay = m.format("dddd");

      // Lọc ra lịch theo ngày hiện tại gồm có vet bên trong
      if (availableDays.includes(currentDay)) {
        const schedulesForDay = schedule.filter(
          (item) => item.availableDate === currentDay
        );

        // Lưu tên vet và đảm bảo nó không bị trùng lặp trong cùng 1 ngày
        const vetNamesForDay = new Set();

        // Duyệt qua lịch của từng vet trong ngày
        schedulesForDay.forEach((scheduleForDate) => {
          scheduleForDate.veterinarianProfiles.forEach((vet) => {
            const vetFullName = `${vet.firstname} ${vet.lastname}`;

            // Kiểm tra xem ten vet có trong mảng events không, nếu không thì thêm vào
            if (!vetNamesForDay.has(vetFullName)) {
              vetNamesForDay.add(vetFullName);

              // Thêm sự kiện vào mảng events
              events.push({
                title: vetFullName,
                start: m.toDate(),
                end: m.toDate(),
                resource: {
                  startTime: scheduleForDate.startTime,
                  endTime: scheduleForDate.endTime,
                  slot: scheduleForDate.slot,
                },
              });
            }
          });
        });
      }
    }
    return events;
  };

  // Tạo events cho năm hiện tại và năm sau
  useEffect(() => {
    if (scheduleOfVet) {
      const availableDays = getAvailableDays(scheduleOfVet);
      const currentYear = new Date().getFullYear();

      const generatedEvents = getAvailableDatesInYear(
        currentYear,
        availableDays,
        scheduleOfVet
      );

      const nextYearGeneratedEvents = getAvailableDatesInYear(
        currentYear + 1,
        availableDays,
        scheduleOfVet
      );

      setEvents([...generatedEvents, ...nextYearGeneratedEvents]);
    }
  }, [scheduleOfVet]);

  // Hiển thị nội dung trong agenda
  const EventAgenda = ({ event }) => {
    const { startTime, endTime, slot } = event.resource;
    return (
      <div>
        {startTime && endTime && slot ? (
          <span>{`Slot: ${slot}: ${startTime} - ${endTime}`}</span>
        ) : (
          "No Time Available"
        )}
      </div>
    );
  };

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      // Tùy chỉnh để thêm nội dung hoặc màu sắc
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
        agenda: {
          time: EventAgenda,
        },
      },

      defaultDate: new Date(),

      max: moment().endOf("day").toDate(),

      // Giới hạn để hiển thị chỉ có month và agenda
      views: ["month", "agenda"],
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
            events={events}
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
