package chorus.service.files;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import chorus.exception.ChorusException;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NodeNotFoundException extends ChorusException {

    private String nodeId;

}
