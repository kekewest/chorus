package chorus.config.Initial;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import chorus.domain.db.entity.config.ChorusVersion;
import chorus.domain.db.entity.security.User;
import chorus.repository.config.ChorusVersionRepository;
import chorus.repository.security.UserRepository;
import chorus.security.AuthorityType;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MasterDataComponent {

    @Autowired
    private ChorusVersionRepository chorusVersionRepository;

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

}
