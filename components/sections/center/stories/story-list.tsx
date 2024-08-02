import React from "react";
import StoryItem from "./story-item";

function Stories() {
  return (
    <div className="shrink-0 rounded-xl overflow-hidden">
      <ul className="flex gap-3 items-center flex-nowrap overflow-y-hidden overflow-x-auto no-scrollbar">
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
      </ul>
    </div>
  );
}

export default Stories;
