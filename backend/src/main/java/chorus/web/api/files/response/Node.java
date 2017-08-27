package chorus.web.api.files.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

import chorus.domain.db.node.files.Directory;
import chorus.domain.db.node.files.File;

@Builder
@Data
public class Node implements Serializable {

    private String name;

    private String nodeId;

    private String type;

    private LocalDateTime updateDateTime;

    private LocalDateTime createDateTime;

    public static Node fromFile(File file) {
        return Node.builder()
                .name(file.getName())
                .nodeId(file.getNodeId())
                .type("file")
                .updateDateTime(file.getUpdateDateTime())
                .createDateTime(file.getCreateDateTime())
                .build();
    }

    public static Node fromDirectory(Directory dir) {
        return Node.builder()
                .name(dir.getName())
                .nodeId(dir.getNodeId())
                .type("directory")
                .updateDateTime(dir.getUpdateDateTime())
                .createDateTime(dir.getCreateDateTime())
                .build();
    }

}