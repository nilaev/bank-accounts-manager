import React from "react";
import TimelineItem from "../TimelineItem/TimelineItem";

const Timeline: React.FC<any> = ({items}) =>
    items.map(item => <TimelineItem key={item.id} {...item} />);

export default Timeline;
