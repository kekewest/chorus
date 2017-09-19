package chorus.service.contents;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import chorus.config.Initial.HomeDirectoryComponent;
import chorus.domain.db.entity.contents.Sheet;
import chorus.repository.contents.SheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SheetService {

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private SheetRepository sheetRepository;

    public List<Sheet> getSheets(String userName, Long parentSheetId) {
        Sheet parentSheet = getAllowedSheet(userName, parentSheetId);
        return sheetRepository.findByParentSheetId(parentSheet.getId());
    }

    public Sheet createNewSheet(String userName, Long parentSheetId, String sheetName, String sheetBody) throws IOException {
        Sheet parentSheet = getAllowedSheet(userName, parentSheetId);

        String persistenceLocation = UUID.randomUUID().toString();
        Sheet sheet;
        try {
            sheet = createNewSheet(parentSheet.getAreaName(), parentSheet.getId(), sheetName, sheetBody, persistenceLocation);
        } catch (Exception e) {
            if (homeDirectoryComponent.existsFile(persistenceLocation)) {
                homeDirectoryComponent.removeFile(persistenceLocation);
            }
            throw e;
        }

        return sheet;
    }

    @Transactional
    public Sheet createNewSheet(String areaName, Long parentSheetId,
        String sheetName, String sheetBody, String persistenceLocation) throws IOException {

        Sheet newSheet = new Sheet();
        newSheet.setName(sheetName);
        newSheet.setAreaName(areaName);
        newSheet.setParentSheetId(parentSheetId);
        newSheet.setPersistenceLocation(persistenceLocation);
        sheetRepository.save(newSheet);
        homeDirectoryComponent.updateFile(persistenceLocation, sheetBody);
        return newSheet;
    }

    public Sheet getAllowedSheet(String userName, Long sheetId) {
        Sheet sheet = sheetRepository.findAllowedSheet(userName, sheetId);
        if (sheet == null) {
            throw new AccessDeniedException("Access Denied.");
        }
        return sheet;
    }

}
