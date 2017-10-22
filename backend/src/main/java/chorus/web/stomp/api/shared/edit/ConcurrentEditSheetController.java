package chorus.web.stomp.api.shared.edit;

import java.io.IOException;

import chorus.service.shared.edit.EditCommandService;
import chorus.service.shared.edit.SheetEditUsersService;
import chorus.service.shared.edit.SheetStoreService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("concurrent-edit")
public class ConcurrentEditSheetController {

    @Autowired
    private SheetEditUsersService sheetEditUsersService;

    @Autowired
    private EditCommandService editCommandService;

    @Autowired
    private SheetStoreService sheetStoreService;

    @MessageMapping("join/{sheetId}")
    public void join(@DestinationVariable Long sheetId, Message<String> message) throws MessagingException, JsonProcessingException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        sheetEditUsersService.join(
                sheetId,
                sha.getSessionId(),
                sha.getUser().getName());
    }

    @MessageMapping("request-sheet/{sheetId}")
    public void requestSheet(@DestinationVariable Long sheetId, Message<String> message) throws IOException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        sheetStoreService.requestSheet(sheetId, sha.getUser().getName());
    }

    @MessageMapping("provide-sheet/{sheetId}")
    public void provideSheet(@DestinationVariable Long sheetId, Message<String> message) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        sheetStoreService.provideSheet(
                sheetId,
                sha.getFirstNativeHeader("requestUser"),
                message.getPayload(),
                sha.getUser().getName());
    }

    @MessageMapping("send-edit-command/{sheetId}")
    public void sendEditCommand(@DestinationVariable Long sheetId, Message<String> message) {
        editCommandService.broadcastEditCommand(
                sheetId,
                message.getPayload());
    }

}
