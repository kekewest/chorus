package chorus.web.api.files.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Ls implements Serializable {

    Node currentNode;

    List<Node> childNodes = new ArrayList<>();

}
