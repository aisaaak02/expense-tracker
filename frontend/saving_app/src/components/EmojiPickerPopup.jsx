import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      {/* Trigger */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-full">
          {icon ? (
            <span className="text-3xl">{icon}</span> // ← render emoji as text
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? "Change Icon" : "Pick icon"}</p>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="relative z-50">
          <div className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 cursor-pointer">
            <button onClick={() => setIsOpen(false)}>
              <LuX />
            </button>
          </div>

          <EmojiPicker
            onEmojiClick={(emojiData) => {
              console.log("Selected emoji:", emojiData);
              setIsOpen(false);
              onSelect(emojiData.emoji); // sets text emoji like "😊"
            }}
            onClickOutside={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
