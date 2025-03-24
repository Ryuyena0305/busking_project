package busking.admin.socket.handler;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

public class NotificationHandler extends TextWebSocketHandler {

    private static final CopyOnWriteArrayList<WebSocketSession> adminSessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // 관리자의 WebSocket 세션을 저장
        adminSessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        // 세션 종료 시 제거
        adminSessions.remove(session);
    }

    // 클라이언트(사용자)가 버튼 클릭 시 메시지를 받음
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        sendNotificationToAdmins(message.getPayload());
    }

    // 관리자에게 메시지를 전송하는 메서드
    public static void sendNotificationToAdmins(String message) throws IOException {
        for (WebSocketSession session : adminSessions) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(message));
            }
        }
    }
}
