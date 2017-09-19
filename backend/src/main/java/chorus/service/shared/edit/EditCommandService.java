package chorus.service.shared.edit;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class EditCommandService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private ConcurrentHashMap<Long, AtomicLong> commandCounts = new ConcurrentHashMap<>();

    public void startEditCount(Long sheetId) {
        commandCounts.put(sheetId, new AtomicLong());
    }

    public void endEditCount(Long sheetId) {
        commandCounts.remove(sheetId);
    }

    public void broadcastEditCommand(Long sheetId, String commandName, String commandJsonStr) {
        long count = commandCounts.get(sheetId).incrementAndGet();
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "invokeEditCommand");
        headers.put("commandName", commandName);
        headers.put("commandCount", String.valueOf(count));
        simpMessagingTemplate.convertAndSend(
                "/topic/concurrent-edit/" + String.valueOf(sheetId), commandJsonStr, headers);
    }

}
