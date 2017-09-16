package chorus.web.http.api.contents.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import chorus.domain.db.entity.contents.Sheet;
import lombok.Data;


@Data
public class SheetResponse implements Serializable {

    private String name;

    private Long id;

    private String updatedBy;

    private LocalDateTime updateDateTime;

    private String createdBy;

    private LocalDateTime createDateTime;

    public SheetResponse(Sheet sheet) {
        this.name = sheet.getName();
        this.id = sheet.getId();
        this.updatedBy = sheet.getUpdatedBy();
        this.updateDateTime = sheet.getUpdateDateTime();
        this.createdBy = sheet.getCreatedBy();
        this.createDateTime = sheet.getCreateDateTime();
    }

}