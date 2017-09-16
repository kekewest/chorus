package chorus.web.websocket.api.shared.edit;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import chorus.service.shared.edit.EditCommandService;
import chorus.service.shared.edit.SpreadSheetEditUsersService;
import chorus.service.shared.edit.SpreadSheetStoreService;

@Controller
@MessageMapping("shared-edit")
public class SharedEditController {

    @Autowired
    private SpreadSheetEditUsersService spreadSheetEditUsersService;

    @Autowired
    private EditCommandService editCommandService;

    @Autowired
    private SpreadSheetStoreService spreadSheetStoreService;

    @MessageMapping("join/{nodeId}")
    public void join(@DestinationVariable String nodeId, Message<String> message) throws MessagingException, JsonProcessingException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        spreadSheetEditUsersService.join(
                nodeId,
                sha.getSessionId(),
                sha.getUser().getName());
    }

    @MessageMapping("request-spreadsheet/{nodeId}")
    public void requestSpreatSheet(@DestinationVariable String nodeId, Message<String> message) throws IOException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        spreadSheetStoreService.requestSpreadSheet(nodeId, sha.getUser().getName());
    }

    @MessageMapping("provide-spreadsheet/{nodeId}")
    public void provideSpreadSheet(@DestinationVariable String nodeId, Message<String> message) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        spreadSheetStoreService.provideSpreadSheet(
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
