package chorus.service.shared.edit;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import chorus.config.Initial.HomeDirectoryComponent;

@Service
public class SpreadSheetStoreService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private SpreadSheetEditUsersService spreadSheetEditUsersService;

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    public void requestSpreadSheet(String nodeId, String requestUserName) throws IOException {
        int userCount = spreadSheetEditUsersService.getUserCount(nodeId);
        if (userCount == 0) {
            return;
        } else if (userCount == 1) {
            provideSpreadSheet(nodeId, requestUserName);
        } else {
            Set<String> userNames = spreadSheetEditUsersService.getUserNames(nodeId);
            userNames.remove(requestUserName);
            int requestNum = RandomUtils.nextInt(0, userNames.size());

            Map<String, Object> headers = new HashMap<>();
            headers.put("event", "requestSpreadSheet");
            headers.put("requestUser", requestUserName);

            simpMessagingTemplate.convertAndSendToUser(
                    (String) userNames.toArray()[requestNum],
                    "/topic/shared-edit/control/" + nodeId,
                    "{}",
                    headers);
        }
    }

    private void provideSpreadSheet(String nodeId, String userName) throws IOException {
        String spreadSheet = homeDirectoryComponent.getFile(nodeId);
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "provideSpreadSheet");

        simpMessagingTemplate.convertAndSendToUser(
                userName,
                "/topic/shared-edit/control/" + nodeId,
                spreadSheet,
                headers);
    }

    public void provideSpreadSheet(String nodeId, String requestUserName, String spreadSheet, String fromUserName) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "provideSpreadSheet");
        headers.put("fromUser", fromUserName);

        simpMessagingTemplate.convertAndSendToUser(
                requestUserName,
                "/topic/shared-edit/control/" + nodeId,
                spreadSheet,
                headers);
    }

}
