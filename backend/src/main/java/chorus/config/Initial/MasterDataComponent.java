package chorus.config.Initial;

import java.util.List;

import chorus.domain.db.entity.contents.Area;
import chorus.domain.db.entity.contents.Sheet;
import chorus.domain.db.entity.security.User;
import chorus.domain.db.entity.system.ChorusVersion;
import chorus.repository.config.ChorusVersionRepository;
import chorus.repository.contents.AreaRepository;
import chorus.repository.contents.SheetRepository;
import chorus.repository.security.UserRepository;
import chorus.security.AuthorityType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
public class MasterDataComponent {

    @Autowired
    private ChorusVersionRepository chorusVersionRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private SheetRepository sheetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void createMasterData() {
        List<ChorusVersion> versions = chorusVersionRepository.findAll();
        if (!versions.isEmpty()) {
            return;
        }

        log.info("create master data.");

        createChorusVersion();
        createAdminUser();
        createMetaData();
    }

    private void createChorusVersion() {
//        ChorusVersion version = new ChorusVersion();
//        version.setVersion(buildProperties.getVersion());
//        chorusVersionRepository.save(version);
    }

    private void createAdminUser() {
        User user = new User();
        user.setName("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        user.setAuthority(AuthorityType.ROLE_ADMIN);
        userRepository.save(user);
    }

    private void createMetaData() {
        Area metaArea = new Area();
        metaArea.setName("");
        areaRepository.save(metaArea);

        Sheet metaSheet = new Sheet();
        metaSheet.setId(-1L);
        metaSheet.setName("");
        metaSheet.setAreaName("");
        metaSheet.setParentSheetId(-1L);
        metaSheet.setPersistenceLocation("__SYSTEM_DATA__");
        sheetRepository.save(metaSheet);
    }

}
