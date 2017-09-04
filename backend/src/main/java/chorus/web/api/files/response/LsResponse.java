package chorus.web.api.files.response;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class LsResponse implements Serializable {

    SheetResponse sheetResponse;

    List<SheetResponse> childSheetResponse;

}
