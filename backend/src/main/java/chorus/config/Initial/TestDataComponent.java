package chorus.config.Initial;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import chorus.domain.db.entity.contents.Area;
import chorus.domain.db.entity.contents.Sheet;
import chorus.domain.db.entity.security.AreaAccessAuthority;
import chorus.domain.db.entity.security.User;
import chorus.repository.contents.AreaRepository;
import chorus.repository.security.AreaAccessAuthorityRepository;
import chorus.repository.security.UserRepository;
import chorus.security.AuthorityType;
import chorus.service.contents.SheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class TestDataComponent {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private AreaAccessAuthorityRepository areaAccessAuthorityRepository;

    @Autowired
    private SheetService sheetService;

    @Transactional
    public void createTestData() throws IOException {
        createTestUser();
        createTestArea();
    }

    private void createTestUser() {
        List<User> users = new ArrayList<>();
        User user;

        for (int i = 0; i < 5; i++) {
            user = new User();
            user.setName("user" + String.valueOf(i));
            user.setPassword(passwordEncoder.encode("pass"));
            user.setAuthority(AuthorityType.ROLE_USER);
            users.add(user);
        }

        userRepository.save(users);
    }

    private void createTestArea() throws IOException {
        List<Area> areas = new ArrayList<>();
        Area area;
        for (int i = 0; i < 5; i++) {
            area = new Area();
            area.setName("area" + String.valueOf(i));
            areas.add(area);
        }
        areaRepository.save(areas);

        for (int i = 0; i < 5; i++) {
            sheetService.createNewSheet("area" + String.valueOf(i), Sheet.ROOT_ID, "", "", UUID.randomUUID().toString());
        }

        List<AreaAccessAuthority> authorities = new ArrayList<>();
        AreaAccessAuthority authority;

        for (int i = 0; i < 5; i++) {
            authority = new AreaAccessAuthority();
            authority.setUserName("user" + String.valueOf(i));
            authority.setAreaName("area" + String.valueOf(i));
            authorities.add(authority);
        }
        authority = new AreaAccessAuthority();
        authority.setUserName("user0");
        authority.setAreaName("area1");
        authorities.add(authority);
        authority = new AreaAccessAuthority();
        authority.setUserName("user1");
        authority.setAreaName("area2");
        authorities.add(authority);

        areaAccessAuthorityRepository.save(authorities);
    }

}
