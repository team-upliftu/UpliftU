// src/components/CustomChat.tsx
import React, { useEffect, useState, useRef } from 'react';
import { getMessageLogs, sendMessage } from './api';
import { Box, Button, CircularProgress, Container, TextField, Typography, List, ListItem, ListItemText, Avatar, Paper, Snackbar, Alert } from '@mui/material';
import { useAuthContext } from '../../auth/AuthContext';
import ChatExitButton from './ChatExitButton';

interface User {
  id: number;
  email: string;
  user_name: string;
  is_staff: boolean;
  is_active: boolean;
  profile: string;
  color: string;
}

interface Message {
  id: string;
  gathering: string;
  body: string;
  sender: User;
  created_at: string;
}

interface MessageLog {
  id: string;
  messages: Message[];
}

interface CustomChatProps {
  backgroundColor?: string;
  messageLogBackgroundColor?: string;
  myMessageColor?: string;
  otherMessageColor?: string;
  title?: string;
  handleCloseChat?: () => void;
  isOpen?: boolean;
  gatheringID?: string;
}

const CustomChat: React.FC<CustomChatProps> = ({
  backgroundColor = '#F0F0F0',
  messageLogBackgroundColor = '#FFFFFF',
  myMessageColor = '#DCF8C6',
  otherMessageColor = '#FFF',
  title = 'Chat',
  gatheringID = "00000000-0000-0000-0000-000000000001",
  handleCloseChat,
  isOpen,
}) => {
  
  if (!isOpen) {
    return null;
  }

  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [gatheringId, setGatheringId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]); // UseRef to keep track of current messages

  const fetchMessages = async (id: string) => {
    try {
      const messageLog: MessageLog = await getMessageLogs(id);
      const newMessages = messageLog.messages.filter(msg => !messagesRef.current.some(existingMsg => existingMsg.id === msg.id));

      if (messagesRef.current.length > 0 && newMessages.some(msg => msg.sender.id !== user.id)) {
        setNewMessageAlert(true);
      }

      messagesRef.current = messageLog.messages; // Update the messagesRef with the new messages
      setMessages(messageLog.messages);
    } catch (err) {
      setError('Failed to fetch messages');
    }
  };

  const getGatheringId = async () => {
    return gatheringID;
  }

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const id = await getGatheringId();
        setGatheringId(id);
        await fetchMessages(id);
      } catch (err) {
        setError('Failed to initialize chat');
      } finally {
        setLoading(false);
      }
    };

    initializeChat();

    const interval = setInterval(() => {
      if (gatheringId) {
        fetchMessages(gatheringId);
      }
    }, 5000); // 5秒間隔でメッセージを同期

    return () => clearInterval(interval);
  }, [gatheringId]);

  const handleSendMessage = async () => {
    if (newMessage.length > 1023) {
      setSnackbarOpen(true);
      return;
    }

    if (!newMessage.trim()) return;

    const message = {
      gathering: gatheringId!,
      body: newMessage,
      sender: user.id, // ログイン中のユーザIDを使用
    };

    try {
      const sentMessage = await sendMessage(message);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { ...sentMessage, sender: user }];
        messagesRef.current = updatedMessages; // Update the messagesRef with the new message
        return updatedMessages;
      });
      setNewMessage('');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0); // 自分のメッセージ送信時のみ自動スクロール
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNewMessageAlertClose = () => {
    setNewMessageAlert(false);
  };

  const handleNewMessageAlertClick = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setNewMessageAlert(false);
  };

  if (loading) {
    return (
      <Container style={{ backgroundColor }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ backgroundColor }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: backgroundColor,
        position: "fixed",
        zIndex: 10000,
        fontFamily: 'Helvetica', 
      }}
    >
    <Container style={{ backgroundColor }}>
      <Box my={4}>
        <Box display="flex" justifyContent="center">
        <Typography variant="h4" gutterBottom>
        <div style={{ fontSize: "35px", fontWeight: "bold" }}>{title}</div>
        </Typography>
        <ChatExitButton onClick={handleCloseChat} />
        </Box>

        <Paper style={{ height: '70vh', overflowY: 'auto', padding: '16px', backgroundColor: messageLogBackgroundColor }}>
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                style={{
                  justifyContent: message.sender.id === user.id ? 'flex-end' : 'flex-start',
                  display: 'flex',
                }}
              >
                {message.sender.id !== user.id && (
                  <Avatar style={{ backgroundColor: message.sender.color, marginRight: 8 }}>
                    {message.sender.user_name[0]}
                  </Avatar>
                )}
                <Paper
                  elevation={3}
                  style={{
                    padding: '10px',
                    backgroundColor: message.sender.id === user.id ? myMessageColor : otherMessageColor,
                    maxWidth: '60%',
                  }}
                >
                  <ListItemText
                    primary={
                      <span style={{ whiteSpace: 'pre-wrap' }}>
                        {message.body}
                      </span>
                    }
                    secondary={`${message.sender.user_name} - ${new Date(message.created_at).toLocaleString()}`}
                    style={{ textAlign: message.sender.id === user.id ? 'right' : 'left' }}
                  />
                </Paper>
                {message.sender.id === user.id && (
                  <Avatar style={{ backgroundColor: message.sender.color, marginLeft: 8 }}>
                    {message.sender.user_name[0]}
                  </Avatar>
                )}
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            Send
          </Button>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Message cannot exceed 1023 characters.
        </Alert>
      </Snackbar>
      <Snackbar open={newMessageAlert} autoHideDuration={3000} onClose={handleNewMessageAlertClose} onClick={handleNewMessageAlertClick}>
        <Alert onClose={handleNewMessageAlertClose} severity="info" sx={{ width: '100%' }}>
          New message received.
        </Alert>
      </Snackbar>
    </Container>
    </Box>
  );
};

export default CustomChat;
