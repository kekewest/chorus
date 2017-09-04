package chorus.service.contents;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import chorus.domain.db.entity.contents.Area;
import chorus.repository.contents.AreaRepository;

@Service
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    public List<Area> getAllArea(Authentication authentication) {
        return areaRepository.findAllowedAreas(authentication.getName());
    }

}
