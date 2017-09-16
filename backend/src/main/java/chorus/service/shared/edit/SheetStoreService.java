package chorus.service.shared.edit;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import chorus.config.Initial.HomeDirectoryComponent;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class SheetStoreService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private SheetEditUsersService sheetEditUsersService;

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    public void requestSheet(String nodeId, String requestUserName) throws IOException {
        int userCount = sheetEditUsersService.getUserCount(nodeId);
        if (userCount == 0) {
            return;
        } else if (userCount == 1) {
            provideSheet(nodeId, requestUserName);
        } else {
            Set<String> userNames = sheetEditUsersService.getUserNames(nodeId);
            userNames.remove(requestUserName);
            int requestNum = RandomUtils.nextInt(0, userNames.size());

            Map<String, Object> headers = new HashMap<>();
            headers.put("event", "requestSheet");
            headers.put("requestUser", requestUserName);

            simpMessagingTemplate.convertAndSendToUser(
                    (String) userNames.toArray()[requestNum],
                    "/topic/shared-edit/control/" + nodeId,
                    "{}",
                    headers);
        }
    }

    private void provideSheet(String nodeId, String userName) throws IOException {
        String sheet = homeDirectoryComponent.getFile(nodeId);
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "provideSheet");

        simpMessagingTemplate.convertAndSendToUser(
                userName,
                "/topic/shared-edit/control/" + nodeId,
                sheet,
                headers);
    }

    public void provideSheet(String nodeId, String requestUserName, String sheet, String fromUserName) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "provideSheet");
        headers.put("fromUser", fromUserName);

        simpMessagingTemplate.convertAndSendToUser(
                requestUserName,
                "/topic/shared-edit/control/" + nodeId,
                sheet,
                headers);
    }

}
