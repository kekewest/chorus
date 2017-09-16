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
@MessageMapping("shared-edit")
public class SharedEditController {

    @Autowired
    private SheetEditUsersService sheetEditUsersService;

    @Autowired
    private EditCommandService editCommandService;

    @Autowired
    private SheetStoreService sheetStoreService;

    @MessageMapping("join/{nodeId}")
    public void join(@DestinationVariable String nodeId, Message<String> message) throws MessagingException, JsonProcessingException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        sheetEditUsersService.join(
                nodeId,
                sha.getSessionId(),
                sha.getUser().getName());
    }

    @MessageMapping("request-sheet/{nodeId}")
    public void requestSheet(@DestinationVariable String nodeId, Message<String> message) throws IOException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        sheetStoreService.requestSheet(nodeId, sha.getUser().getName());
    }

    @MessageMapping("provide-sheet/{nodeId}")
    public void provideSheet(@DestinationVariable String nodeId, Message<String> message) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        sheetStoreService.provideSheet(
                nodeId,
                sha.getFirstNativeHeader("requestUser"),
                message.getPayload(),
                sha.getUser().getName());
    }

    @MessageMapping("send-edit-command/{nodeId}")
    public void sendEditCommand(@DestinationVariable String nodeId, Message<String> message) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        editCommandService.broadcastEditCommand(
                nodeId,
                sha.getFirstNativeHeader("commandName"),
                message.getPayload());
    }

}
