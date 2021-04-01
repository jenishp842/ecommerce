import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { staticLabel } from '../../constants/Constants.js';
import cal from "../../assets/img/cal.png";

const DateFilter = (props) => {
  const [disable, setDisable] = useState(true)
  const { startDateTab, endDateTab, handleChanges } = props;
  const { reports } = staticLabel;
  const { reportFrom, reportTo } = reports;
  console.log(startDateTab)
  return (
    <div className="pl-5 dateinput d-flex align-items-center date-filter-wrapper">
      <h3 className="mx-2">{reportFrom}</h3>
      <div style={{ minWidth: '150px' }}>
        <DatePicker
          value={startDateTab}
          onChange={(date) => {
            {handleChanges(date, endDateTab);setDisable(false)}
          }
          }
          dateFormat="dd-MM-yyyy"
          className={
            "text-center dull py-1 px-2 f-14 f-m form-control w-100 datetimepicker1"
          }
          selected={startDateTab}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="MM/DD/YYYY"
          selectsStart
        />
      </div>
      <button
        class="border-0 mr-1 event-none"
        disabled
      >
        <img src={cal} />
      </button>
      <h3 className="mr-2 ml-4">{reportTo}</h3>
      <div style={{ minWidth: '150px' }}>
        <DatePicker
          value={endDateTab}
          onChange={(date) => {
            handleChanges(startDateTab, date)
          }}
          dateFormat="dd-MM-yyyy"
          className={
            "text-center dull py-1 px-2 f-14 f-m form-control w-100 datetimepicker2"
          }
          selected={endDateTab}
          minDate={startDateTab}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="DD/MM/YYYY"
          selectsEnd
          disabled={disable}
          
        />
      </div>
      <button className="border-0 mr-1 event-none" disabled>
        <img src={cal} />
      </button>
    </div >
  );
};

export default DateFilter;