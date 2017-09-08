package chorus.web.api.files.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import chorus.domain.db.entity.contents.Sheet;
import lombok.Data;

@Data
public class LsResponse implements Serializable {

    private List<SheetResponse> childSheetResponse;

    public LsResponse(List<Sheet> sheets) {
        this.childSheetResponse = new ArrayList<>();
        for (Sheet sheet : sheets) {
            this.childSheetResponse.add(new SheetResponse(sheet));
        }
    }

}
