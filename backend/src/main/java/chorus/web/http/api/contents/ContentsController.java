package chorus.web.http.api.contents;

import java.io.IOException;
import java.util.List;

import chorus.domain.db.entity.contents.Area;
import chorus.domain.db.entity.contents.Sheet;
import chorus.service.contents.AreaService;
import chorus.service.contents.SheetService;
import chorus.web.http.api.contents.response.AllAreas;
import chorus.web.http.api.contents.response.LsResponse;
import chorus.web.http.api.contents.response.NewSheetResponse;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/contents")
@PreAuthorize("isAuthenticated()")
public class ContentsController {

    @Autowired
    private SheetService sheetService;

    @Autowired
    private AreaService areaService;

    @GetMapping("/all-areas")
    public AllAreas getAllAreas(Authentication authentication) {
        List<Area> areas = areaService.getAllArea(authentication);

        return new AllAreas(areas);
    }

    @GetMapping("/ls")
    public LsResponse ls(Authentication authentication,
            @RequestParam @NotEmpty String areaName,
            @RequestParam Long parentSheetId) {
        List<Sheet> sheets = sheetService.getSheets(authentication.getName(), areaName, parentSheetId);
        return new LsResponse(sheets);
    }

    @PutMapping("/new-sheet")
    public NewSheetResponse newSheet(Authentication authentication,
            @RequestParam @NotEmpty String areaName,
            @RequestParam Long parentSheetId,
            @RequestParam @NotEmpty String sheetName,
            @RequestBody @NotEmpty String sheetBody) throws IOException {
        Sheet sheet = sheetService.createNewSheet(authentication.getName(), areaName, parentSheetId, sheetName, sheetBody);
        return new NewSheetResponse(sheet);
    }

}
