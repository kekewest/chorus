package chorus.web.api.files.response;

import java.io.Serializable;

import chorus.domain.db.entity.contents.Sheet;
import lombok.Data;


@Data
public class NewSheetResponse implements Serializable {

    private SheetResponse sheetResponse;

    public NewSheetResponse(Sheet sheet) {
        this.sheetResponse = new SheetResponse(sheet);
    }

}
