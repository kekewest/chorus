package chorus.service.contents;

import chorus.exception.ChorusException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SheetNotFoundException extends ChorusException {

    private String sheetId;

}
