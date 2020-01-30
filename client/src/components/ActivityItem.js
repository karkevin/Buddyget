import React from "react";

export default function ActivityItem(props) {
  const { description } = props.log;
  const date = new Date(props.log.date);

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-6 xs:text-lg">{description}</p>
      <p className="self-center xs:text-lg">{`${date.getUTCMonth() +
        1}/${date.getUTCDate()}`}</p>
    </div>
  );
}
