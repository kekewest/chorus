package chorus.service.shared.edit;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import chorus.config.Initial.HomeDirectoryComponent;
import chorus.domain.db.entity.contents.Sheet;
import chorus.service.contents.SheetService;
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

    @Autowired
    private SheetService sheetService;

    public void requestSheet(Long sheetId, String requestUserName) throws IOException {
        int userCount = sheetEditUsersService.getUserCount(sheetId);
        if (userCount == 0) {
            return;
        } else if (userCount == 1) {
            provideSheet(sheetId, requestUserName);
        } else {
            sheetService.getAllowedSheet(requestUserName, sheetId); // check authentication.

            Set<String> userNames = sheetEditUsersService.getUserNames(sheetId);
            userNames.remove(requestUserName);
            int requestNum = RandomUtils.nextInt(0, userNames.size());

            Map<String, Object> headers = new HashMap<>();
            headers.put("event", "requestSheet");
            headers.put("requestUser", requestUserName);

            simpMessagingTemplate.convertAndSendToUser(
                    (String) userNames.toArray()[requestNum],
                    "/topic/concurrent-edit/control/" + String.valueOf(sheetId),
                    "{}",
                    headers);
        }
    }

    private void provideSheet(Long sheetId, String userName) throws IOException {
        Sheet sheet = sheetService.getAllowedSheet(userName, sheetId);
        String sheetBody = homeDirectoryComponent.getFile(sheet.getPersistenceLocation());
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "provideSheet");

        simpMessagingTemplate.convertAndSendToUser(
                userName,
                "/topic/concurrent-edit/control/" + String.valueOf(sheetId),
                sheetBody,
                headers);
    }

    public void provideSheet(Long sheetId, String requestUserName, String sheet, String fromUserName) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("event", "provideSheet");
        headers.put("fromUser", fromUserName);

        simpMessagingTemplate.convertAndSendToUser(
                requestUserName,
                "/topic/concurrent-edit/control/" + String.valueOf(sheetId),
                sheet,
                headers);
    }

}
