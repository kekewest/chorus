package chorus.service.shared.edit;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.Data;
import lombok.Getter;
import lombok.Synchronized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Service
public class SheetEditUsersService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private EditCommandService editCommandService;

    private ObjectWriter writer;

    private ConcurrentHashMap<Long, EditUsers> usersMap = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, HashSet<Long>> edittingSheetIdsMap = new ConcurrentHashMap<>();


    @PostConstruct
    public void init() {
        ObjectMapper mapper = new ObjectMapper();
        writer = mapper.writerFor(new TypeReference<Map<String, EditUser>>() {});
    }

    @Synchronized
    public void join(Long sheetId, String sessionId, String userName) throws MessagingException, JsonProcessingException {
        EditUser user = new EditUser();
        user.setSessionId(sessionId);
        user.setUserName(userName);

        EditUsers users = usersMap.get(sheetId);
        if (users == null) {
            users = new EditUsers();
            usersMap.put(sheetId, users);
            editCommandService.startEditCount(sheetId);
        }
        users.addUser(user);

        HashSet<Long> edittingSheetIds = edittingSheetIdsMap.get(user.getSessionId());
        if (edittingSheetIds == null) {
            edittingSheetIds = new HashSet<>();
            edittingSheetIdsMap.put(user.getSessionId(), edittingSheetIds);
        }
        edittingSheetIds.add(sheetId);

        broadcastEditUsers(sheetId, users);
    }

    @Synchronized
    public void leave(String sessionId) throws MessagingException, JsonProcessingException {
        HashSet<Long> edittingSheetIds = edittingSheetIdsMap.get(sessionId);
        if (edittingSheetIds == null) {
            return;
        }

        for (Long sheetId : edittingSheetIds) {
            EditUsers users = usersMap.get(sheetId);
            if (users == null) {
                continue;
            }
            users.removeUser(sessionId);
            if (users.size() == 0) {
                usersMap.remove(sheetId);
                editCommandService.endEditCount(sheetId);
            }
            broadcastEditUsers(sheetId, users);
        }

        edittingSheetIdsMap.remove(sessionId);
    }

    @EventListener
    public void onSessionDisconnect(SessionDisconnectEvent event) throws MessagingException, JsonProcessingException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        leave(sha.getSessionId());
    }

    @Synchronized
    public int getUserCount(Long sheetId) {
        EditUsers users = usersMap.get(sheetId);
        if (users == null) {
            return 0;
        }
        return users.size();
    }

    @Synchronized
    public Set<String> getUserNames(Long sheetId) {
        EditUsers users = usersMap.get(sheetId);
        if (users == null) {
            return null;
        }
        return users.getUserNames();
    }

    private void broadcastEditUsers(Long sheetId, EditUsers editUsers) throws MessagingException, JsonProcessingException {
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "updateEditUsers");
        simpMessagingTemplate.convertAndSend("/topic/concurrent-edit/control/" + String.valueOf(sheetId), writer.writeValueAsString(editUsers.getUserMap()), headers);
    }


    @Data
    private static class EditUser {

        private String sessionId;

        private String userName;

    }


    private static class EditUsers {

        @Getter
        private ConcurrentHashMap<String, EditUser> userMap = new ConcurrentHashMap<>();

        public void addUser(EditUser user) {
            userMap.put(user.getSessionId(), user);
        }

        public void removeUser(String sessionId) {
            userMap.remove(sessionId);
        }

        public int size() {
            return userMap.size();
        }

        public Set<String> getUserNames() {
            HashSet<String> userNames = new HashSet<>();
            userMap.forEach((String key, EditUser user) -> {
                if (key != null) {
                    userNames.add(user.getUserName());
                }
            });
            return userNames;
        }

    }

}
