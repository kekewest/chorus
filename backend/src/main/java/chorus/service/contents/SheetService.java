package chorus.service.contents;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import chorus.config.Initial.HomeDirectoryComponent;
import chorus.domain.db.entity.contents.Sheet;
import chorus.domain.db.entity.security.AreaAccessAuthority;
import chorus.repository.contents.SheetRepository;
import chorus.repository.security.AreaAccessAuthorityRepository;
import chorus.repository.security.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SheetService {

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SheetRepository sheetRepository;

    @Autowired
    private AreaAccessAuthorityRepository areaAccessAuthorityRepository;

    public List<Sheet> getSheets(String userName, String areaName, Long parentSheetId) {
        checkAllowedSheet(userName, areaName, parentSheetId);
        return sheetRepository.findByAreaNameAndParentSheetId(areaName, parentSheetId);
    }

    public Sheet createNewSheet(String userName, String areaName, Long parentSheetId,
        String sheetName, String sheetBody) throws IOException {
        String persistenceLocation = UUID.randomUUID().toString();

        Sheet sheet;
        try {
            sheet = createNewSheet(userName, areaName, parentSheetId, sheetName, sheetBody, persistenceLocation);
        } catch (Exception e) {
            if (homeDirectoryComponent.existsFile(persistenceLocation)) {
                homeDirectoryComponent.removeFile(persistenceLocation);
            }
            throw e;
        }

        return sheet;
    }

    @Transactional
    private Sheet createNewSheet(String userName, String areaName, Long parentSheetId,
        String sheetName, String sheetBody, String persistenceLocation) throws IOException {
        if (parentSheetId == null) {
            checkAllowedArea(userName, areaName);
        } else {
            checkAllowedSheet(userName, areaName, parentSheetId);
        }
        Sheet newSheet = new Sheet();
        newSheet.setName(sheetName);
        newSheet.setAreaName(areaName);
        if (parentSheetId != null) {
            newSheet.setParentSheetId(parentSheetId);
        }
        newSheet.setPersistenceLocation(persistenceLocation);
        sheetRepository.save(newSheet);
        homeDirectoryComponent.updateFile(persistenceLocation, sheetBody);
        return newSheet;
    }

    protected void checkAllowedArea(String userName, String areaName) {
        AreaAccessAuthority.PK pk = new AreaAccessAuthority.PK(userName, areaName);
        AreaAccessAuthority authority = areaAccessAuthorityRepository.findOne(pk);
        if (authority == null) {
            throw new AccessDeniedException("Access Denied.");
        }
    }

    protected void checkAllowedSheet(String userName, String areaName, Long sheetId) {
        Sheet sheet = sheetRepository.findAllowedSheet(userName, areaName, sheetId);
        if (sheet == null) {
            throw new AccessDeniedException("Access Denied.");
        }
    }

}
