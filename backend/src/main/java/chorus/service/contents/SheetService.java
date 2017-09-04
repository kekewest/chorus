package chorus.service.contents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chorus.config.Initial.HomeDirectoryComponent;
import chorus.repository.security.AreaAccessAuthorityRepository;
import chorus.repository.security.UserRepository;

@Service
public class SheetService {

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AreaAccessAuthorityRepository areaAccessAuthorityRepository;

//    public Document getDocuments(String username, String groupName, String parentDocId) {
//
//    }

}
