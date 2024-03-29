// Types
import type { KeyboardEventHandler } from "react";

// React
import { useRef } from "react";
// Recoil
import { useRecoilValue } from "recoil";
import { A_User, A_Game } from "@/store";

// i18n
import { useTranslation } from "react-i18next";

// Hooks
import { useCreation, useSafeState, useUpdateEffect } from "ahooks";

// Icon
import { BiArrowBack } from "react-icons/bi";
// Antd Component
import { Input, message as AntdMessage } from "antd";
// Custom Component
import { Button } from "@/components/common";
import { ChatMessage } from "@/components/page-component/games-page";

// Scoped style
import classes from "./style.module.scss";

// Props
interface ChatBlockProps {
  className?: string;
  onSendMessage: (message: string) => void;
}

export default function ChatBlock({
  className,
  onSendMessage,
}: ChatBlockProps) {
  const { t } = useTranslation();
  const user = useRecoilValue(A_User);
  const game = useRecoilValue(A_Game);
  const [inputMessage, setInputMessage] = useSafeState("");
  const chatListRef = useRef<HTMLDivElement>(null);

  const isMyRoom = useCreation(
    () => game.currentRoom?.homeowner === user.id,
    [game.currentRoom, user.id]
  );

  const sendMessage = () => {
    if (inputMessage.trim() === "") {
      AntdMessage.warning("Empty content!");
      return;
    }
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  // 更新聊天窗口的滚动条位置
  useUpdateEffect(() => {
    if (game.messageList.length > 0 && chatListRef.current) {
      const $messages = chatListRef.current.children;
      $messages[$messages.length - 1].scrollIntoView({ behavior: "smooth" });
    }
  }, [game.messageList]);

  const handlePressEnter: KeyboardEventHandler<HTMLTextAreaElement> = ({
    ctrlKey,
  }) => {
    if (ctrlKey) {
      // @ts-ignore
      sendMessage();
    }
  };

  if (!game.currentRoom) {
    return <></>;
  }

  return (
    <section className={`${classes.chatBlock} ${className}`}>
      <div className="head">
        <Button>
          <BiArrowBack />
        </Button>
        <span className="room-name">{game.currentRoom.name}</span>
      </div>

      <div ref={chatListRef} className="chat">
        {game.messageList.map((message) => (
          <ChatMessage
            key={message.messageId}
            isMyRoom={isMyRoom}
            message={message}
          />
        ))}
      </div>

      <div className="enter" data-helptext={t("GamesPage__Chat__sendMessage")}>
        <Input.TextArea
          showCount
          rows={3}
          maxLength={128}
          value={inputMessage}
          placeholder={t("GamesPage__Chat__inputMessage") as string}
          onChange={({ target: { value } }) =>
            setInputMessage(value as any as string)
          }
          onPressEnter={handlePressEnter}
        />
        <Input
          value={inputMessage}
          placeholder={t("GamesPage__Chat__inputMessage") as string}
          onChange={({ target: { value } }) => setInputMessage(value)}
          onPressEnter={sendMessage}
        />
      </div>
    </section>
  );
}
