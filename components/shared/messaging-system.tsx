import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, MessageFormValues } from "@/lib/validations";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageDate?: Date;
  unreadCount: number;
}

interface MessagingSystemProps {
  conversations: Conversation[];
  messages: Message[];
  currentUserId: string;
  currentConversationId?: string;
  onSendMessage: (message: MessageFormValues) => void;
  onSelectConversation: (conversationId: string) => void;
}

export function MessagingSystem({
  conversations,
  messages,
  currentUserId,
  currentConversationId,
  onSendMessage,
  onSelectConversation,
}: MessagingSystemProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
      receiverId: currentConversationId ? conversations.find(c => c.id === currentConversationId)?.participantId : "",
    },
  });

  const filteredConversations = conversations.filter((conversation) =>
    conversation.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async (data: MessageFormValues) => {
    try {
      await onSendMessage(data);
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[500px] overflow-hidden rounded-lg border">
      {/* Conversation List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <ScrollArea className="h-[calc(100%-65px)]">
          <div className="space-y-1 p-2">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center space-x-4 p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                    currentConversationId === conversation.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <Avatar>
                    <AvatarImage src={conversation.participantAvatar} />
                    <AvatarFallback>{getInitials(conversation.participantName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium truncate">{conversation.participantName}</h4>
                      {conversation.lastMessageDate && (
                        <span className="text-xs text-gray-500">
                          {new Date(conversation.lastMessageDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {conversation.lastMessage && (
                      <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                    )}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No conversations found</div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {currentConversationId ? (
          <>
            {/* Message Header */}
            <div className="p-4 border-b flex items-center space-x-3">
              <Avatar>
                <AvatarImage 
                  src={conversations.find(c => c.id === currentConversationId)?.participantAvatar} 
                />
                <AvatarFallback>
                  {getInitials(conversations.find(c => c.id === currentConversationId)?.participantName || "")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {conversations.find(c => c.id === currentConversationId)?.participantName}
                </h3>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === currentUserId ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex items-end space-x-2">
                        {message.senderId !== currentUserId && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.senderAvatar} />
                            <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                          </Avatar>
                        )}
                        <Card className={`max-w-md ${
                          message.senderId === currentUserId ? "bg-blue-500 text-white" : ""
                        }`}>
                          <CardContent className="p-3">
                            <p>{message.content}</p>
                            <div className={`text-xs mt-1 ${
                              message.senderId === currentUserId ? "text-blue-100" : "text-gray-500"
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                              {message.senderId === currentUserId && (
                                <span className="ml-2">
                                  {message.read ? "Read" : "Delivered"}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSubmit(handleSendMessage)} className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  {...register("content")}
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting}>
                  Send
                </Button>
              </div>
              {errors.content && (
                <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
              )}
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
