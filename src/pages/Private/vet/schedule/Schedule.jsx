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
import { getScheduleByVetId } from "../../../../services/vetService";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import CSS của react-big-calendar

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const Schedule = ({ localizer = mLocalizer, ...props }) => {
  const dispatch = useDispatch();

  const veterinarianId = useSelector((state) => state.users.data.result.userId);
  const scheduleOfVet = useSelector((state) => state.vet.data);

  const [events, setEvents] = useState([]);
  // const [popupInfo, setPopupInfo] = useState(null); // State cho pop-up

  useEffect(() => {
    dispatch(getScheduleByVetId(veterinarianId));
  }, [dispatch, veterinarianId]);

  // Hàm để xác định ngày có sẵn từ dữ liệu lịch trình
  const getAvailableDays = (schedule) => {
    return schedule.map((item) => item.availableDate);
  };

  // Hàm để tạo ra danh sách các ngày trong năm mà bác sĩ có sẵn
  const getAvailableDatesInYear = (year, availableDays, schedule) => {
    const events = [];
    const startDate = moment().year(year).startOf("year");
    const endDate = moment().year(year).endOf("year");

    for (
      let m = startDate;
      m.isBefore(endDate) || m.isSame(endDate, "day");
      m.add(1, "days")
    ) {
      const currentDay = m.format("dddd");

      if (availableDays.includes(currentDay)) {
        // Tìm tất cả các lịch trình tương ứng với ngày hiện tại
        const schedulesForDate = schedule.filter(
          (item) => item.availableDate === currentDay
        );

        schedulesForDate.forEach((scheduleForDate) => {
          const title = scheduleForDate ? (
            <p>
              Slot {scheduleForDate.slot}: {""}
              {scheduleForDate.startTime.slice(0, 5)} - {""}
              {scheduleForDate.endTime.slice(0, 5)}
            </p>
          ) : (
            "No Title"
          );

          events.push({
            title: title,
            start: m.toDate(),
            end: m.toDate(),
            resource: scheduleForDate,
          });
        });
      }
    }
    return events;
  };

  useEffect(() => {
    if (scheduleOfVet && scheduleOfVet.length > 0) {
      // Khi dữ liệu đã tải xong, tạo danh sách events
      const availableDays = getAvailableDays(scheduleOfVet);
      const currentYear = new Date().getFullYear();

      // Tạo sự kiện cho năm hiện tại
      const generatedEvents = getAvailableDatesInYear(
        currentYear,
        availableDays,
        scheduleOfVet
      );

      // Tạo sự kiện cho năm mới
      const nextYearGeneratedEvents = getAvailableDatesInYear(
        currentYear + 1,
        availableDays,
        scheduleOfVet
      );

      // Kết hợp các sự kiện từ năm hiện tại và năm mới
      setEvents([...generatedEvents, ...nextYearGeneratedEvents]);
    }
  }, [scheduleOfVet]);

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      max: moment().endOf("day").toDate(),
      views: ["month"],
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
            // popup // Hiển thị pop-up khi click vào "+X more"
            // eventPropGetter={(event) => ({
            //   style: { display: "block" }, // Hiển thị tất cả các sự kiện
            // })}
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
