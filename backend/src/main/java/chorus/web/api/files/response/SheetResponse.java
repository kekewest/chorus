package chorus.web.api.files.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SheetResponse implements Serializable {

    private String name;

    private String id;

    private LocalDateTime updateDateTime;

    private LocalDateTime createDateTime;

}