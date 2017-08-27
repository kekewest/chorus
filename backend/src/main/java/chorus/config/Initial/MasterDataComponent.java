package chorus.config.Initial;

import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import chorus.domain.db.node.config.ChorusVersion;
import chorus.domain.db.node.security.Authority;
import chorus.domain.db.node.security.User;
import chorus.repository.config.ChorusVersionRepository;
import chorus.repository.security.AuthorityRepository;
import chorus.repository.security.UserRepository;
import chorus.security.AuthorityType;

@Slf4j
@Component
public class MasterDataComponent {

    @Autowired
    private ChorusVersionRepository chorusVersionRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void createMasterData() {
        List<ChorusVersion> versions = new ArrayList<>();
        CollectionUtils.addAll(versions, chorusVersionRepository.findAll());
        if (!versions.isEmpty()) {
            return;
        }

        log.info("create master data.");

        createChorusVersion();
        createAuthorities();
        createAdminUser();
    }

    private void createChorusVersion() {
        ChorusVersion version = new ChorusVersion();
//        version.setVersion(buildProperties.getVersion());
        chorusVersionRepository.save(version);
    }

    private void createAuthorities() {
        List<Authority> authorities = new ArrayList<>();

        for (AuthorityType authorityType : AuthorityType.values()) {
            Authority authority = new Authority();
            authority.setAuthorityType(authorityType);
            authorities.add(authority);
        }

        authorityRepository.save(authorities);
    }

    private void createAdminUser() {
        User user = new User();
        user.setName("admin");
        user.setPassword("admin");
        user.addAuthorities(authorityRepository.findByAuthorityType(AuthorityType.ROLE_ADMIN));
        userRepository.save(user);
    }

}
