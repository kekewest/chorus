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

    private ConcurrentHashMap<String, AtomicLong> commandCounts = new ConcurrentHashMap<>();

    public void startEditCount(String nodeId) {
        commandCounts.put(nodeId, new AtomicLong());
    }

    public void endEditCount(String nodeId) {
        commandCounts.remove(nodeId);
    }

    public void broadcastEditCommand(String nodeId, String commandName, String commandJsonStr) {
        long count = commandCounts.get(nodeId).incrementAndGet();
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "invokeEditCommand");
        headers.put("commandName", commandName);
        headers.put("commandCount", String.valueOf(count));
        simpMessagingTemplate.convertAndSend(
                "/topic/shared-edit/" + nodeId, commandJsonStr, headers);
    }

}
