import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function example() {
  const [min, setMin] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourSelector);
  const onMinChange = (event: React.FormEvent<HTMLInputElement>) => {
    // string 형식 앞에 +를해주면 number 형으로 변환
    setMin(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHour(+event.currentTarget.value);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="minutes"
        value={min}
        onChange={onMinChange}
      />
      <input
        type="number"
        placeholder="hours"
        value={hour}
        onChange={onHoursChange}
      />
    </div>
  );
}

export default example;
