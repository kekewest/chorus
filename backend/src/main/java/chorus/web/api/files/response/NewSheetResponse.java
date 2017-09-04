package chorus.web.api.files.response;

import java.io.Serializable;

import lombok.Data;


@Data
public class NewSheetResponse implements Serializable {

    SheetResponse sheetResponse;

}
